import {
	IBlogComment,
	IBlogCommentDeleteDataType,
	IBlogCommentGetDataType,
	IBlogCommentLikePostDataType,
	IBlogCommentSubmitDataType,
} from '@models/blog';
import { IAsyncStates } from '@models/common';
import UiComments from '@molecules/ui-comments';
import { useAppDispatch } from 'app/hooks';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { openLoginPopup } from 'reducers/login';
import { apiService, ApiDataType } from 'utils/request';
import { IoMdSend } from 'react-icons/io';
import { NEWSFEED_OBJECT_TYPE } from 'enums/common';

const SingleNewsFeedComments = (props: any) => {
	const {
		projectId,
		projectCreator,
		updatedCommentCount,
		showComments,
		onSuccessCommentCreate,
		objectType,
	} = props;
	const dispatch = useAppDispatch();
	const { status } = useSession();
	const router = useRouter();

	const perPage = 5;
	const replyPerPage = 3;
	const initActionState: IAsyncStates = {
		loading: false,
		success: false,
		failed: false,
	};

	const [pageCount, setPageCount] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [isInitPageRender, setIsInitPageRender] = useState<boolean>(true);
	const [commentBoxText, setCommentBoxText] = useState<string>('');
	const [commentError, setCommentError] = useState<string>('');
	const [commentLoader, setCommentLoader] = useState<boolean>(false);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);
	const [isScrollTop, setIsScrollTop] = useState<boolean>(false);
	const [parentCommentAnimateId, setParentCommentAnimateId] = useState<number | undefined>();
	const [comments, setComments] = useState<IBlogComment[]>([]);
	const [numberOfComments, setNumberOfComments] = useState<number>(0);
	const [newCommentId, setNewCommentId] = useState<number | null>(null);
	const [replyAnimateId, setReplyAnimateId] = useState<number | null>(null);
	const [commentListLoading, setCommentListLoading] = useState<boolean>(false);
	// const [commentListFailed, setCommentListFailed] = useState<boolean>(false)
	const [createLoading, setCreateLoading] = useState<boolean>(false);
	const [createSuccess, setCreateSuccess] = useState<boolean>(false);
	const [createFailed, setCreateFailed] = useState<boolean>(false);
	const [commentEditState, setCommentEditState] = useState<any>(initActionState);
	const [commentDeleteState, setCommentDeleteState] = useState<any>(initActionState);
	const [replyCreateState, setReplyCreateState] = useState<any>(initActionState);
	const [replyListState, setReplyListState] = useState<any>(initActionState);

	useEffect(() => {
		if (isInitPageRender) {
			getProjectComments(currentPage, perPage);
		}
		setIsInitPageRender(false);
	}, [comments, numberOfComments]);

	useEffect(() => {
		setPageCount(numberOfComments > perPage ? Math.ceil(numberOfComments / perPage) : 1);
		updatedCommentCount(numberOfComments);
	}, [numberOfComments]);

	useEffect(() => {
		if (isScrollTop) {
			setTimeout(() => setIsScrollTop(false), 1500);
		}
	}, [isScrollTop]);

	useEffect(() => {
		setCommentLoader(createLoading);
	}, [createLoading]);

	useEffect(() => {
		if (createSuccess) {
			setCommentError('');
			setCommentBoxText('');
			setIsScrollTop(true);
			setParentCommentAnimateId(Number(newCommentId));
		}
	}, [createSuccess]);

	useEffect(() => {
		if (createFailed) {
			toast.error('Error submitting comment');
			setCommentError('Comment is failed to send, please try again.');
		}
	}, [createFailed]);

	useEffect(() => {
		if (commentBoxText) setCommentError('');
	}, [commentBoxText]);

	useEffect(() => setLoadingMore(commentListLoading), [commentListLoading]);

	// useEffect(() => {
	// 	if(commentListFailed) toast.error('Error fetching comments')
	// }, [commentListFailed])

	// Check user Authentication ---------------
	const checkAuth = () => {
		router.query.redirect = 'false';
		router.push(router, undefined, { scroll: false });
		dispatch(openLoginPopup({ ref: '' }));
	};

	// On Click Load More Comment Button ---------------
	const onClickLoadMore = () => {
		getProjectComments(currentPage, perPage);
	};

	// 1.1. Get Comments ---------------
	const getProjectComments = async (page = 0, perPage: number) => {
		page = currentPage + 1;

		setCommentListLoading(true);
		// setCommentListFailed(false)

		const params = `${page ? `?page=${page}` : ''}${perPage ? `&page_size=${perPage}` : ''}`;
		await apiService(
			{
				method: 'get',
				url: `/${NEWSFEED_OBJECT_TYPE[objectType]}/${projectId}/comments/${params}`,
				token: true,
			},
			(res: any, err: any) => {
				if (res) {
					const { data } = res;
					const newCommentsList = res?.data.results;
					const commentList =
						comments?.length > 0
							? [...comments, ...newCommentsList]
							: [...newCommentsList];
					setComments(commentList);
					setNumberOfComments(data?.count);
					setCommentListLoading(false);
					// setCommentListFailed(false)
					setCurrentPage(page);
					return;
				}
				if (err) {
					// setCommentListFailed(true)
					return setCommentListLoading(false);
				}
			}
		);
	};

	// 1.2. Get Replies ---------------
	const handleGetCommentReplies = async (data: IBlogCommentGetDataType) => {
		const { id: parentId, page, perPage } = data;
		setReplyListState({ ...replyListState, loading: true, success: false, failed: false });

		const params = `${page ? `?page=${page}` : ''}${perPage ? `&page_size=${perPage}` : ''}`;

		await apiService(
			{
				method: 'get',
				url: `/${NEWSFEED_OBJECT_TYPE[objectType]}/comment/${parentId}/replies/${params}`,
				token: true,
			},
			(res: any, err: any) => {
				if (res) {
					const newReplies = res?.data?.results;
					const commentList = [...comments];

					const index = commentList.findIndex((item) => item.id === parentId);
					if (index !== -1) {
						if (commentList[index]?.children?.length > 0) {
							commentList[index].children = [
								...commentList[index].children,
								...newReplies,
							];
						} else {
							commentList[index].children = [...newReplies];
						}
					}
					setComments(commentList);
					setReplyListState({
						...replyListState,
						loading: false,
						success: true,
						failed: false,
					});
					return;
				}
				if (err) {
					setReplyListState({
						...replyListState,
						loading: false,
						success: false,
						failed: true,
					});
					// console.log('Error Get Project Comment Replies------', err, err?.data?.response, err?.response)
				}
			}
		);
	};

	// 2.1. Create New Comment ---------------
	const onPressEnterCommentEditor = async (e: any) => {
		if (e.key !== 'Enter') return;
		onSubmitCommentNew();
	};
	const onSubmitCommentNew = async () => {
		if (commentBoxText?.trim().length == 0) {
			return setCommentError('Please write your comment');
		} else setCommentError('');

		setNewCommentId(null);
		setCreateLoading(true);
		setCreateSuccess(false);
		setCreateFailed(false);

		if (status === 'unauthenticated') return checkAuth();

		const formData: any = { content: commentBoxText };
		if (NEWSFEED_OBJECT_TYPE[objectType])
			formData[NEWSFEED_OBJECT_TYPE[objectType]] = projectId;

		await apiService(
			{
				method: 'post',
				url: `/${NEWSFEED_OBJECT_TYPE[objectType]}/comment/add-comment/`,
				data: formData,
				token: true,
			},
			(res: any, err: any) => {
				if (res) {
					const comment = res?.data;
					setComments([comment, ...comments]);
					setNumberOfComments(numberOfComments + 1);
					setNewCommentId(comment.id);
					setCreateLoading(false);
					setCreateSuccess(true);
					onSuccessCommentCreate();
					return setCreateFailed(false);
				}
				if (err) {
					setNewCommentId(null);
					setCreateLoading(false);
					setCreateSuccess(false);
					return setCreateFailed(true);
					// console.log('comment submit error-------', err?.response)
				}
			}
		);
	};

	// 2.2. Create New Reply ---------------
	const onSubmitReplyNew = async (data: any) => {
		const formData: any = { parent: data.parent, content: data.content };
		if (NEWSFEED_OBJECT_TYPE[objectType])
			formData[NEWSFEED_OBJECT_TYPE[objectType]] = data.postId;

		setReplyAnimateId(null);
		setReplyCreateState({ ...replyCreateState, loading: true, success: false, failed: false });

		await apiService(
			{
				method: 'post',
				url: `${NEWSFEED_OBJECT_TYPE[objectType]}/comment/add-comment/`,
				data: formData,
				token: true,
			},
			(res: any, err: any) => {
				if (res) {
					const comment = res?.data;
					const parentId = data?.parent;
					const commentList = [...comments];

					if (comment) {
						const parentIndex = commentList.findIndex((item) => item.id === parentId);
						if (parentIndex !== -1) {
							//TODO:: Updated Comment Reply List Binding after create a reply
							if (commentList[parentIndex]?.children?.length > 0) {
								commentList[parentIndex].children.unshift(comment);
							} else {
								commentList[parentIndex].children = [];
								commentList[parentIndex].children.unshift(comment);
							}
							commentList[parentIndex].replies_count =
								commentList[parentIndex].replies_count + 1;
						}
						setReplyAnimateId(comment.id);
						setComments(commentList);
					}
					return setReplyCreateState({
						...replyCreateState,
						loading: false,
						success: true,
						failed: false,
					});
				}
				if (err) {
					setReplyAnimateId(null);
					setReplyCreateState({
						...replyCreateState,
						loading: false,
						success: false,
						failed: true,
					});
					// console.log('comment submit error-------', err.response)
				}
			}
		);
	};

	// 3.1. Edit Comment ------------------
	const onSubmitCommentEdit = (data: IBlogCommentSubmitDataType) => {
		commentEditCommonMethod(data);
	};

	// 3.2. Edit Reply ------------------
	const onSubmitReplyEdit = (data: IBlogCommentSubmitDataType) => {
		commentEditCommonMethod(data);
	};

	// 3.3. Common Project Comment and Reply Edit method ------------------
	const commentEditCommonMethod = async (data: IBlogCommentSubmitDataType) => {
		const { id, parentId, postId, content, isReply } = data;
		setCommentEditState({ ...commentEditState, loading: true, success: false, failed: false });

		const apiData: ApiDataType = {
			method: 'put',
			url: `${NEWSFEED_OBJECT_TYPE[objectType]}/comment/${id}/`,
			data: {
				// project: postId,
				content: content,
			},
			token: true,
		};
		if (NEWSFEED_OBJECT_TYPE[objectType])
			apiData.data[NEWSFEED_OBJECT_TYPE[objectType]] = postId;

		if (isReply && parentId) apiData.data.parent = parentId;

		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				const comment = res?.data;
				const commentList = [...comments];

				// Comment Edit
				if (!isReply) {
					const commentIndex = commentList.findIndex((item: any) => item.id === id);
					commentList[commentIndex].content = comment.content;
				}

				// Reply Edit
				if (comment && isReply && parentId) {
					const parentIndex = commentList.findIndex((item: any) => item.id === parentId);

					if (parentIndex !== -1) {
						const replies = commentList[parentIndex].children;
						const replyIndex = replies.findIndex((item: any) => item.id === id);
						if (replyIndex !== -1) {
							replies[replyIndex].content = comment.content;
						}
					}
				}

				setComments(commentList);
				setCommentEditState({
					...commentEditState,
					loading: false,
					success: true,
					failed: false,
				});
				return;
			}
			if (err) {
				setCommentEditState({
					...commentEditState,
					loading: false,
					success: false,
					failed: true,
				});
				// console.log('Project Comment/Reply Edit Error------', err)
			}
		});
	};

	// 4.1. Delete Comment ---------------
	const handleCommentDelete = (data: IBlogCommentDeleteDataType) => {
		commentDeleteCommonMethod(data);
	};

	// 4.2. Delete Reply ---------------
	const handleReplyDelete = (data: IBlogCommentDeleteDataType) => {
		commentDeleteCommonMethod(data);
	};

	// 4.3. Common Project Comment and Reply Delete method ---------------
	const commentDeleteCommonMethod = async (data: IBlogCommentDeleteDataType) => {
		setCommentDeleteState({
			...commentDeleteState,
			loading: true,
			success: false,
			failed: false,
		});

		const { id, isReply, parentId } = data;

		const apiData: ApiDataType = {
			method: 'delete',
			url: `/${NEWSFEED_OBJECT_TYPE[objectType]}/comment/${id}/`,
			token: true,
		};
		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				// const comment = res?.data
				let commentList = [...comments];

				if (!isReply) {
					commentList = commentList.filter((item) => item.id !== id);
					setNumberOfComments(numberOfComments - 1);
				}

				if (isReply && parentId) {
					const parentIndex = comments.findIndex((item) => item.id === parentId);
					if (parentIndex !== -1) {
						commentList[parentIndex].children = commentList[
							parentIndex
						].children.filter((item: any) => item.id !== id);
						commentList[parentIndex].replies_count =
							commentList[parentIndex].replies_count - 1;
					}
				}
				setComments(commentList);
				setCommentDeleteState({
					...commentDeleteState,
					loading: false,
					success: true,
					failed: false,
				});
				return;
			}
			if (err) {
				setCommentDeleteState({
					...commentDeleteState,
					loading: false,
					success: false,
					failed: true,
				});
				// console.log('Error Comment/Reply delete------------', err)
			}
		});
	};

	// 5.1. & 5.2. Like Comment and Reply ---------------
	const onSubmitLike = async (data: IBlogCommentLikePostDataType) => {
		const { id, isReply, parentId } = data;

		const apiData: ApiDataType = {
			method: 'post',
			url: `/${NEWSFEED_OBJECT_TYPE[objectType]}/comment/${id}/like/`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				const commentList = [...comments];

				// Like a Comment
				if (!isReply) {
					const index = commentList.findIndex((item) => item.id === id);
					if (index !== -1) {
						commentList[index].likes = Number(commentList[index].likes) + 1;
						commentList[index].is_liked = true;
					}
				}

				// Like a Reply
				if (isReply && parentId) {
					const parentIndex = commentList.findIndex((item) => item.id === parentId);
					if (parentIndex !== -1) {
						const replies = commentList[parentIndex].children;
						const replyIndex = replies.findIndex((item: any) => item.id === id);

						if (replyIndex !== -1) {
							replies[replyIndex].likes = Number(replies[replyIndex].likes) + 1;
							replies[replyIndex].is_liked = true;
						}
					}
				}

				return setComments(commentList);
			}
			// if(err) {
			// console.log('Error Posted comment Like---', err?.response)
			// }
		});
	};

	return (
		<div className="">
			<UiComments
				comments={comments}
				post={{ id: projectId, user: projectCreator }}
				numberOfComments={numberOfComments}
				parentCommentAnimateId={parentCommentAnimateId}
				replyAnimateId={replyAnimateId}
				handleCommentDelete={handleCommentDelete}
				handleReplyDelete={handleReplyDelete}
				replyPerPage={replyPerPage}
				onSubmitCommentEdit={onSubmitCommentEdit}
				onSubmitReplyNew={onSubmitReplyNew}
				onSubmitReplyEdit={onSubmitReplyEdit}
				onSubmitLike={onSubmitLike}
				handleGetCommentReplies={handleGetCommentReplies}
				onClickLoadMore={onClickLoadMore}
				currentPage={currentPage}
				pageCount={pageCount}
				loadingMore={loadingMore}
				commentBoxText={commentBoxText}
				handleChangeCommentBoxText={(e: any) => setCommentBoxText(e.target.value)}
				handleKeyDownCommentBoxText={(e: any) => onPressEnterCommentEditor(e)}
				onClickPublishComment={onSubmitCommentNew}
				commentError={commentError}
				commentLoader={commentLoader}
				isScrollTop={isScrollTop}
				commentEditState={commentEditState}
				commentDeleteState={commentDeleteState}
				replyCreateState={replyCreateState}
				replyListState={replyListState}
				className="mt-0 flex flex-col-reverse"
				commentListRootClassName={
					showComments && comments?.length > 0
						? ' max-h-96 overflow-y-auto px-5 mb-5'
						: 'hidden'
				}
				commentEditorWrapClassName={`${showComments ? '' : 'hidden'}${
					comments?.length > 0 ? ' mb-5' : ''
				} shadow-none py-2 px-3 bg-white rounded-[10px] relative`}
				commentEditorRows={1}
				commentEditorClassName="p-0 bg-transparent tracking-tight font-sans"
				commentEditRootClassName="flex justify-between"
				commentEditorSubmitBtnClassName={`${
					commentBoxText && commentBoxText?.length > 0
						? ''
						: 'pointer-event-none cursor-default'
				} ${createLoading ? 'text-purple-400' : ''} bg-transparent shadow-none p-1`}
				commentEditorSubmitBtnText={
					createLoading ? (
						<span className="text-purple-400">submitting...</span>
					) : (
						<IoMdSend
							className={`${
								commentBoxText && commentBoxText?.length > 0
									? 'text-primary'
									: 'text-purple-400'
							} text-2xl transition-all`}
						/>
					)
				}
				commentEditorMultiline={false}
				commentSingleBodyBg="bg-[#FBFBFB]"
				commentSingleIsMinimal={true}
				commentEditorDisable={createLoading}
				hideCommentCounter
			/>
		</div>
	);
};

SingleNewsFeedComments.defaultProps = {
	showComments: true,
};

export default SingleNewsFeedComments;
