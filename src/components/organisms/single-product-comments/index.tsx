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
	createProductReplyAsync,
	deleteProductCommentAsync,
	editProductCommentAsync,
	getProductCommentsAsync,
	getProductRepliesAsync,
	likeProductCommentAsync,
	setProductComments,
	setProductCommentsCount,
} from './reducer';

const SingleProductComments = (props: any) => {
	const { productId, productCreator } = props;
	const dispatch = useAppDispatch();
	const { status } = useSession();
	const router = useRouter();

	// const pageCount = paginateMeta?.pageCount
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

	const comments: IBlogComment[] = useAppSelector((state) => state?.productComments?.comments);
	const numberOfComments: number = useAppSelector((state) => state?.productComments?.count || 0);
	const { commentId: newCommentId, replyId: replyAnimateId } = useAppSelector(
		(state) => state?.productComments?.newComment || null
	);
	const {
		loading: commentListLoading,
		success: commentListSuccess,
		failed: commentListFailed,
	} = useAppSelector((state) => state?.productComments?.commentList);
	const {
		loading: createLoading,
		success: createSuccess,
		failed: createFailed,
	} = useAppSelector((state) => state?.productComments?.commentCreate);
	const commentEditState = useAppSelector((state) => state?.productComments?.commentEdit);
	const commentDeleteState = useAppSelector((state) => state?.productComments?.commentDelete);
	const replyCreateState = useAppSelector((state) => state?.productComments?.replyCreate);
	const replyListState = useAppSelector((state) => state?.productComments?.replyList);

	useEffect(() => {
		if (isInitPageRender) {
			getInitProductComments(currentPage, perPage);
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

	// GetProductComments by Id ----------------
	// Check user Authentication ---------------
	const checkAuth = () => {
		router.query.redirect = 'false';
		router.push(router, undefined, { scroll: false });
		dispatch(openLoginPopup({ ref: '' }));
	};

	// On Click Load More Comment Button ---------------
	const onClickLoadMore = () => {
		getProductComments(currentPage + 1, perPage);
	};

	const getInitProductComments = async (page: number, perPage: number) => {
		const params = `${page ? `?page=${page}` : ''}${perPage ? `&page_size=${perPage}` : ''}`;
		await apiService(
			{
				method: 'get',
				url: `/product/${productId}/comments/${params}`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					const commentsList = data.results;
					dispatch(setProductComments(commentsList));
					dispatch(setProductCommentsCount(data?.count));
					return;
				}
			}
		);
	};
	// 1.1. Get Comments ---------------
	const getProductComments = async (page: number, perPage: number) => {
		const data = { id: Number(productId), page, perPage };
		dispatch(getProductCommentsAsync(data));
	};

	// 1.2. Get Replies ---------------
	const handleGetCommentReplies = (data: IBlogCommentGetDataType) => {
		dispatch(getProductRepliesAsync(data));
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

		const formData = { product: productId, content: commentBoxText };
		dispatch(createProducCommentAsync(formData)).then(() => {
			if (typeof props.onReload === 'function') {
				props.onReload();
			}
		});
	};

	// 2.2. Create New Reply ---------------
	const onSubmitReplyNew = (data: any) => {
		const formData = { product: data.postId, parent: data.parent, content: data.content };
		dispatch(createProductReplyAsync(formData));
	};

	// 3.1. Edit Comment ---------------
	const onSubmitCommentEdit = (data: IBlogCommentSubmitDataType) => {
		dispatch(editProductCommentAsync(data));
	};

	// 3.2. Edit Reply ---------------
	const onSubmitReplyEdit = (data: IBlogCommentSubmitDataType) => {
		dispatch(editProductCommentAsync(data));
	};

	// 4.1. Delete Comment ---------------
	const handleCommentDelete = async (data: IBlogCommentDeleteDataType) => {
		dispatch(deleteProductCommentAsync(data));
	};

	// 4.2. Delete Reply ---------------
	const handleReplyDelete = (data: IBlogCommentDeleteDataType) => {
		dispatch(deleteProductCommentAsync(data));
	};

	// 5.1. & 5.2. Like Comment and Reply ---------------
	const onSubmitLike = (data: IBlogCommentLikePostDataType) => {
		dispatch(likeProductCommentAsync(data));
	};

	return (
		<div className="">
			<UiComments
				comments={comments}
				post={{ id: productId, user: productCreator }}
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

export default SingleProductComments;
