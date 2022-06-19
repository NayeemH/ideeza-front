import {
	IBlogComment,
	IBlogCommentDeleteDataType,
	IBlogCommentGetDataType,
	IBlogCommentLikePostDataType,
	IBlogCommentSubmitDataType,
} from '@models/blog';
import UiComments from '@molecules/ui-comments';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { toast } from 'react-toastify';
import { openLoginPopup } from 'reducers/login';
import { apiService } from 'utils/request';
import {
	createProducCommentAsync,
	createProjectReplyAsync,
	deleteProjectCommentAsync,
	editProjectCommentAsync,
	getProjectCommentsAsync,
	getProjectRepliesAsync,
	likeProjectCommentAsync,
	setProjectComments,
	setProjectCommentsCount,
} from './reducer';

const SingleProjectComments = (props: any) => {
	const { projectId, projectCreator } = props;
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

	const comments: IBlogComment[] = useAppSelector((state) => state?.projectComments?.comments);
	const numberOfComments: number = useAppSelector((state) => state?.projectComments?.count || 0);
	const { commentId: newCommentId, replyId: replyAnimateId } = useAppSelector(
		(state) => state?.projectComments?.newComment || null
	);
	const {
		loading: commentListLoading,
		success: commentListSuccess,
		failed: commentListFailed,
	} = useAppSelector((state) => state?.projectComments?.commentList);
	const {
		loading: createLoading,
		success: createSuccess,
		failed: createFailed,
	} = useAppSelector((state) => state?.projectComments?.commentCreate);
	const commentEditState = useAppSelector((state) => state?.projectComments?.commentEdit);
	const commentDeleteState = useAppSelector((state) => state?.projectComments?.commentDelete);
	const replyCreateState = useAppSelector((state) => state?.projectComments?.replyCreate);
	const replyListState = useAppSelector((state) => state?.projectComments?.replyList);

	useEffect(() => {
		if (isInitPageRender) {
			getInitProjectComments(currentPage, perPage);
		}
		setIsInitPageRender(false);
	}, [comments, numberOfComments]);

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

	// GetProjectComments by Id ----------------
	// Check user Authentication ---------------
	const checkAuth = () => {
		router.query.redirect = 'false';
		router.push(router, undefined, { scroll: false });
		dispatch(openLoginPopup({ ref: '' }));
	};

	// On Click Load More Comment Button ---------------
	const onClickLoadMore = () => {
		getProjectComments(currentPage + 1, perPage);
	};

	const getInitProjectComments = async (page: number, perPage: number) => {
		const params = `${page ? `?page=${page}` : ''}${perPage ? `&page_size=${perPage}` : ''}`;
		await apiService(
			{
				method: 'get',
				url: `/project/${projectId}/comments/${params}`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					const commentsList = data.results;
					dispatch(setProjectComments(commentsList));
					dispatch(setProjectCommentsCount(data?.count));
					return;
				}
			}
		);
	};
	// 1.1. Get Comments ---------------
	const getProjectComments = async (page: number, perPage: number) => {
		const data = { id: Number(projectId), page, perPage };
		dispatch(getProjectCommentsAsync(data));
	};

	// 1.2. Get Replies ---------------
	const handleGetCommentReplies = (data: IBlogCommentGetDataType) => {
		dispatch(getProjectRepliesAsync(data));
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

		const formData = { project: projectId, content: commentBoxText };
		dispatch(createProducCommentAsync(formData)).then(() => {
			if (typeof props.onCommentSubmitted === 'function') {
				props.onCommentSubmitted();
			}
		});
	};

	// 2.2. Create New Reply ---------------
	const onSubmitReplyNew = (data: any) => {
		const formData = {
			project: data.postId,
			parent: data.parent,
			content: data.content,
		};
		dispatch(createProjectReplyAsync(formData));
	};

	// 3.1. Edit Comment ---------------
	const onSubmitCommentEdit = (data: IBlogCommentSubmitDataType) => {
		dispatch(editProjectCommentAsync(data));
	};

	// 3.2. Edit Reply ---------------
	const onSubmitReplyEdit = (data: IBlogCommentSubmitDataType) => {
		dispatch(editProjectCommentAsync(data));
	};

	// 4.1. Delete Comment ---------------
	const handleCommentDelete = async (data: IBlogCommentDeleteDataType) => {
		dispatch(deleteProjectCommentAsync(data));
	};

	// 4.2. Delete Reply ---------------
	const handleReplyDelete = (data: IBlogCommentDeleteDataType) => {
		dispatch(deleteProjectCommentAsync(data));
	};

	// 5.1. & 5.2. Like Comment and Reply ---------------
	const onSubmitLike = (data: IBlogCommentLikePostDataType) => {
		dispatch(likeProjectCommentAsync(data));
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
				onClickPublishComment={publishComment}
				commentError={commentError}
				commentLoader={commentLoader}
				isScrollTop={isScrollTop}
				commentEditState={commentEditState}
				commentDeleteState={commentDeleteState}
				replyCreateState={replyCreateState}
				replyListState={replyListState}
				className="mt-5 flex flex-col-reverse font-proxima-nova"
				commentListRootClassName="max-h-96 xl:max-h-full overflow-y-auto pr-5"
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

export default SingleProjectComments;
