import { IBlogComment } from '@models/blog';
import {
	IPartCommenLikeFormDataType,
	IPartCommentDeleteFormDataType,
	IPartCommentGetDataType,
	IPartCommentSubmitFormDataType,
} from '@models/user-parts';
import UiComments from '@molecules/ui-comments';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PARTS_COMMENT_API_TYPE } from 'enums/common';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { toast } from 'react-toastify';
import { openLoginPopup } from 'reducers/login';
import { apiService } from 'utils/request';
import {
	createPartCommentAsync,
	createPartReplyAsync,
	deletePartCommentAsync,
	editPartCommentAsync,
	getPartCommentsAsync,
	getPartRepliesAsync,
	likePartCommentAsync,
	setPartComments,
	setPartCommentsCount,
} from './reducer';

const SinglePartComments = (props: any) => {
	const {
		partId,
		partType,
		partCreator,
		// onCommentSubmitted
	} = props;
	const dispatch = useAppDispatch();
	const { status } = useSession();
	const router = useRouter();

	const perPage = 5;
	const replyPerPage = 3;

	const [pageCount, setPageCount] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isInitPageRender, setIsInitPageRender] = useState<boolean>(true);
	const [commentBoxText, setCommentBoxText] = useState<string>('');
	const [commentError, setCommentError] = useState<string>('');
	const [commentLoader, setCommentLoader] = useState<boolean>(false);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);
	const [isScrollTop, setIsScrollTop] = useState<boolean>(false);
	const [parentCommentAnimateId, setParentCommentAnimateId] = useState<number | undefined>();

	const comments: IBlogComment[] = useAppSelector((state) => state?.partComments?.comments);
	const numberOfComments: number = useAppSelector((state) => state?.partComments?.count || 0);
	const { commentId: newCommentId, replyId: replyAnimateId } = useAppSelector(
		(state) => state?.partComments?.newComment || null
	);
	const {
		loading: commentListLoading,
		success: commentListSuccess,
		failed: commentListFailed,
	} = useAppSelector((state) => state?.partComments?.commentList);
	const {
		loading: createLoading,
		success: createSuccess,
		failed: createFailed,
	} = useAppSelector((state) => state?.partComments?.commentCreate);
	const commentEditState = useAppSelector((state) => state?.partComments?.commentEdit);
	const commentDeleteState = useAppSelector((state) => state?.partComments?.commentDelete);
	const replyCreateState = useAppSelector((state) => state?.partComments?.replyCreate);
	const replyListState = useAppSelector((state) => state?.partComments?.replyList);

	useEffect(() => {
		if (partType && partId) {
			getInitPartComments(currentPage, perPage);
		}
		setIsInitPageRender(false);
	}, [partId, partType]);

	useEffect(() => {
		setPageCount(numberOfComments > perPage ? Math.ceil(numberOfComments / perPage) : 1);
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

	useEffect(() => setLoadingMore(commentListLoading), [commentListLoading]);

	useEffect(() => {
		if (!isInitPageRender && commentListSuccess) {
			setCurrentPage(currentPage + 1);
		}
	}, [commentListSuccess]);

	useEffect(() => {
		if (commentListFailed) toast.error('Error fetching comments');
	}, [commentListFailed]);

	// GetPartComments by Id ----------------
	// Check user Authentication ---------------
	const checkAuth = () => {
		router.query.redirect = 'false';
		router.push(router, undefined, { scroll: false });
		dispatch(openLoginPopup({ ref: '' }));
	};

	// On Click Load More Comment Button ---------------
	const onClickLoadMore = () => {
		getPartComments(currentPage + 1, perPage);
	};

	const getInitPartComments = async (page: number, perPage: number) => {
		const params = `${page ? `?page=${page}` : ''}${perPage ? `&page_size=${perPage}` : ''}`;
		await apiService(
			{
				method: 'get',
				url:
					partType == 'component'
						? `/component/${partId}/comments/${params}`
						: `/part/${partType}-part/${partId}/comments/${params}`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					const commentsList = data.results;
					dispatch(setPartComments(commentsList));
					dispatch(setPartCommentsCount(data?.count));
					return;
				}
			}
		);
	};
	// 1.1. Get Comments ---------------
	const getPartComments = async (page: number, perPage: number) => {
		const data = { id: Number(partId), type: partType, page, perPage };
		dispatch(getPartCommentsAsync(data));
	};

	// 1.2. Get Replies ---------------
	const handleGetCommentReplies = (data: IPartCommentGetDataType) => {
		// console.log('replies---------', data)
		data.type = partType;
		dispatch(getPartRepliesAsync(data));
	};

	// 2.1. Create New Comment ---------------
	const onPressEnterCommentEditor = async (e: any) => {
		if (e.key !== 'Enter') return;
		publishComment();
	};
	const publishComment = async () => {
		if (commentBoxText?.trim().length == 0) {
			return setCommentError('Please write your comment');
		} else setCommentError('');

		if (status === 'unauthenticated') return checkAuth();

		const formData: IPartCommentSubmitFormDataType = { content: commentBoxText };

		if (PARTS_COMMENT_API_TYPE[partType] === 'code_part') formData.code_part = partId;
		if (PARTS_COMMENT_API_TYPE[partType] === 'electronic_part')
			formData.electronic_part = partId;
		if (PARTS_COMMENT_API_TYPE[partType] === 'cover_part') formData.cover_part = partId;
		if (PARTS_COMMENT_API_TYPE[partType] === 'component') formData.component = partId;

		dispatch(createPartCommentAsync({ type: partType, partId, formData })).then(() => {
			if (typeof props.onCommentSubmitted === 'function') {
				props.onCommentSubmitted();
			}
		});
	};

	// 2.2. Create New Reply ---------------
	const onSubmitReplyNew = (data: any) => {
		const formData: IPartCommentSubmitFormDataType = {
			parent: data.parent,
			content: data.content,
		};

		if (PARTS_COMMENT_API_TYPE[partType] === 'code_part') formData.code_part = partId;
		if (PARTS_COMMENT_API_TYPE[partType] === 'electronic_part')
			formData.electronic_part = partId;
		if (PARTS_COMMENT_API_TYPE[partType] === 'cover_part') formData.cover_part = partId;
		if (PARTS_COMMENT_API_TYPE[partType] === 'component') formData.component = partId;

		dispatch(createPartReplyAsync({ type: partType, partId, formData }));
	};

	// 3.1. Edit Comment ---------------
	const onSubmitCommentEdit = (data: any) => {
		const formData: IPartCommentSubmitFormDataType = {
			id: data?.id,
			isReply: data?.isReply,
			content: data?.content,
		};
		if (data?.parentId) formData.parentId = data?.parentId;
		if (PARTS_COMMENT_API_TYPE[partType] === 'code_part') formData.code_part = partId;
		if (PARTS_COMMENT_API_TYPE[partType] === 'electronic_part')
			formData.electronic_part = partId;
		if (PARTS_COMMENT_API_TYPE[partType] === 'cover_part') formData.cover_part = partId;
		if (PARTS_COMMENT_API_TYPE[partType] === 'component') formData.component = partId;
		dispatch(editPartCommentAsync({ type: partType, partId, formData }));
	};

	// 3.2. Edit Reply ---------------
	const onSubmitReplyEdit = (data: any) => {
		const formData: IPartCommentSubmitFormDataType = {
			id: data?.id,
			isReply: data?.isReply,
			content: data?.content,
		};
		if (data?.parentId) formData.parentId = data?.parentId;
		if (PARTS_COMMENT_API_TYPE[partType] === 'code_part') formData.code_part = partId;
		if (PARTS_COMMENT_API_TYPE[partType] === 'electronic_part')
			formData.electronic_part = partId;
		if (PARTS_COMMENT_API_TYPE[partType] === 'cover_part') formData.cover_part = partId;
		if (PARTS_COMMENT_API_TYPE[partType] === 'component') formData.component = partId;

		dispatch(editPartCommentAsync({ type: partType, partId, formData }));
	};

	// 4.1. Delete Comment ---------------
	const handleCommentDelete = async (data: any) => {
		const formData: IPartCommentDeleteFormDataType = {
			id: data?.id,
			isReply: data?.isReply,
		};
		dispatch(deletePartCommentAsync({ type: partType, formData }));
	};

	// 4.2. Delete Reply ---------------
	const handleReplyDelete = (data: any) => {
		const formData: IPartCommentDeleteFormDataType = {
			id: data?.id,
			isReply: data?.isReply,
			parentId: data?.parentId,
		};
		dispatch(deletePartCommentAsync({ type: partType, formData }));
	};

	// 5.1. & 5.2. Like Comment and Reply ---------------
	const onSubmitLike = (data: any) => {
		const formData: IPartCommenLikeFormDataType = {
			id: data?.id,
			isReply: data?.isReply,
			parentId: data?.parentId,
		};
		dispatch(likePartCommentAsync({ type: partType, formData }));
	};

	return (
		<div className="">
			<UiComments
				comments={comments}
				post={{ id: partId, user: partCreator }}
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
				onClickPublishComment={publishComment}
				commentError={commentError}
				commentLoader={commentLoader}
				isScrollTop={isScrollTop}
				commentEditState={commentEditState}
				commentDeleteState={commentDeleteState}
				replyCreateState={replyCreateState}
				replyListState={replyListState}
				className="mt-5 flex flex-col-reverse font-proxima-nova"
				commentListRootClassName="h-96 overflow-y-auto pr-5"
				commentEditorWrapClassName="shadow-lg py-2 px-3 bg-white rounded-lg mb-5 relative"
				commentEditorRows={1}
				commentEditorClassName="p-0 bg-transparent tracking-tight font-proxima-nova"
				commentEditorMultiline={false}
				commentSingleBodyBg="bg-[#F4F5FC]"
				commentSingleIsMinimal={true}
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
				commentEditorDisable={createLoading}
				hideCommentCounter
			/>
		</div>
	);
};

export default SinglePartComments;
