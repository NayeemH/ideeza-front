import { IUser } from '@models/auth';
import { IBlogComment, IBlogCommentDeleteDataType, IBlogCommentSubmitDataType } from '@models/blog';
import UiCommentSingle from '@molecules/ui-comment-single';
import UiCommentReplies from '@molecules/ui-comment-replies';
import UiCommentEditor from '@molecules/ui-comment-editor';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { openLoginPopup } from 'reducers/login';
import { useAppDispatch } from 'app/hooks';
import { toast } from 'react-toastify';
import { Fade } from '@mui/material';
import Button from '@atoms/button';
import { IAsyncStates } from '@models/common';

interface IUiCommentWrapperProps {
	comment: IBlogComment;
	postAuthor: IUser | undefined;
	commentIndex?: number;
	postId: number | undefined;
	parentAnimateId?: number | undefined;
	replyAnimateId: number | null;
	handleCommentDelete?: any;
	handleReplyDelete?: any;
	onSubmitCommentEdit?: any;
	onSubmitReplyNew?: any;
	onSubmitReplyEdit?: any;
	onSubmitLike?: any;
	handleGetCommentReplies?: any;
	replyPerPage: number;
	editState?: IAsyncStates;
	deleteState: IAsyncStates;
	replyListState: IAsyncStates;
	replyCreateState: IAsyncStates;
	isMinimal?: boolean;
	commentBodyBg?: string;
}

const UiCommentWrapper = (props: IUiCommentWrapperProps) => {
	const {
		comment,
		postAuthor,
		commentIndex,
		postId,
		parentAnimateId,
		replyAnimateId,
		handleCommentDelete,
		handleReplyDelete,
		onSubmitCommentEdit,
		onSubmitReplyNew,
		onSubmitReplyEdit,
		onSubmitLike,
		handleGetCommentReplies,
		replyPerPage,
		editState,
		deleteState,
		replyListState,
		replyCreateState,
		isMinimal,
		commentBodyBg,
	} = props;

	// const { loading: deleteLoading } = deleteState
	const {
		loading: replyListLoading,
		success: replyListSucceed,
		failed: replyListFailed,
	} = replyListState;
	const { success: replyCreateSucceed, failed: replyCreateFailed } = replyCreateState;

	const router = useRouter();
	const dispatch = useAppDispatch();
	const { status } = useSession();

	const [showCommentReplies, setShowCommentReplies] = useState<boolean>(false);
	const [replyBoxText, setReplyBoxText] = useState<string>('');
	const [commentError, setCommentError] = useState<string>('');
	const [commentLoader, setCommentLoader] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [loadMore, setLoadMore] = useState<boolean>(false);
	const [pageCount, setPageCount] = useState<any>(0);
	const [isInitPageRender, setIsInitPageRender] = useState<boolean>(true);
	const [replyToggleCount, setReplyToggleCount] = useState<number>(0);
	const [animateId, setAnimateId] = useState<number | null>(null);
	const [isReplyListSync, setIsReplyListSync] = useState<boolean>(false);
	// const [isDeletingId, setIsDeletingId] = useState<number | null>(null)

	useEffect(() => {
		setIsInitPageRender(false);
	}, []);

	useEffect(() => {
		setPageCount(
			comment.replies_count > replyPerPage
				? Math.ceil(comment.replies_count / replyPerPage)
				: 1
		);
	}, [comment.replies_count]);

	// useEffect(() => {
	// 	if(! deleteLoading) {
	// 		setIsDeletingId(null)
	// 	}
	// }, [deleteLoading])

	useEffect(() => {
		if (
			!isInitPageRender &&
			showCommentReplies &&
			replyToggleCount === 1 &&
			comment.replies_count > 0
		) {
			getCommentRepliesById(comment.id, currentPage, replyPerPage);
		}
		setAnimateId(null);
	}, [showCommentReplies]);

	useEffect(() => setLoadMore(replyListLoading), [replyListLoading]);
	useEffect(() => {
		if (replyListFailed) setIsReplyListSync(false);
	}, [replyListFailed]);

	useEffect(() => {
		if (replyListSucceed && isReplyListSync) {
			setCurrentPage(currentPage + 1);
			setReplyToggleCount(2);
			setIsReplyListSync(false);
			// console.log(`2. comment.id: ${comment.id}, pageCount: ${pageCount}, currentPage: ${currentPage}, replyPerPage: ${replyPerPage}`)
		}
	}, [replyListSucceed]);

	useEffect(() => {
		if (replyCreateSucceed && commentLoader) {
			setCommentError('');
			setReplyBoxText('');
			setCommentLoader(false);
			return setAnimateId(replyAnimateId);
		}
	}, [replyCreateSucceed]);

	useEffect(() => {
		if (replyCreateFailed && commentLoader) {
			toast.error('Error submitting comment');
			setCommentError('Comment is failed to send, please try again.');
			setCommentLoader(false);
		}
	}, [replyCreateFailed]);

	const onClickCommentReplyCount = () => {
		setShowCommentReplies(!showCommentReplies);
		setIsReplyListSync(!showCommentReplies);
		setReplyToggleCount(replyToggleCount > 1 ? 2 : replyToggleCount + 1);
	};

	const onClickLoadMoreReplies = () => {
		getCommentRepliesById(comment.id, currentPage, replyPerPage);
		setIsReplyListSync(true);
	};

	const getCommentRepliesById = async (id: any, page = 1, perPage = 5) => {
		handleGetCommentReplies({ id, page, perPage });
	};

	const checkAuth = () => {
		router.query.redirect = 'false';
		router.push(router, undefined, { scroll: false });
		dispatch(openLoginPopup({ ref: '' }));
	};

	const onSubmitReply = async () => {
		if (replyBoxText?.trim().length == 0) {
			return setCommentError('Please write your comment.');
		} else setCommentError('');

		if (status === 'unauthenticated') return checkAuth();
		setCommentLoader(true);

		onSubmitReplyNew({
			postId,
			parent: comment.id,
			content: replyBoxText,
		});
	};

	const handleReplyDeleteModified = (data: IBlogCommentDeleteDataType) => {
		// setIsDeletingId(data?.id)
		handleReplyDelete(data);
	};

	return (
		<div>
			<UiCommentSingle
				index={commentIndex}
				comment={comment}
				postAuthor={postAuthor}
				postId={postId}
				replyCount={comment.replies_count}
				animateId={parentAnimateId}
				handleCommentDelete={(data: IBlogCommentDeleteDataType) =>
					handleCommentDelete(data)
				}
				onClickReplyCount={onClickCommentReplyCount}
				onSubmitCommentEdit={(data: IBlogCommentSubmitDataType) =>
					onSubmitCommentEdit(data)
				}
				onSubmitLike={onSubmitLike}
				editState={editState}
				deleteState={deleteState}
				isMinimal={isMinimal}
				commentBodyBg={commentBodyBg}
			/>
			{showCommentReplies && (
				<div>
					<UiCommentReplies
						replies={
							comment?.children && comment?.children?.length > 0
								? comment?.children
								: []
						} //{replies}
						postAuthor={postAuthor}
						postId={postId}
						parentId={comment.id}
						animateId={animateId}
						onSubmitReplyEdit={(data: IBlogCommentSubmitDataType) =>
							onSubmitReplyEdit(data)
						}
						onSubmitLike={onSubmitLike}
						handleReplyDelete={(data: IBlogCommentDeleteDataType) =>
							handleReplyDeleteModified(data)
						}
						editState={editState}
						deleteState={deleteState}
						isMinimal={isMinimal}
						commentBodyBg={commentBodyBg}
						hideReplyCount
					/>
					{comment.replies_count > 0 &&
						comment.replies_count > comment?.children?.length &&
						currentPage <= pageCount && (
							<Fade in={currentPage <= pageCount}>
								<div
									className={`${
										isMinimal ? 'ml-10 pl-3 my-6' : 'ml-10 mt-4 mb-8'
									} flex items-center justify-start`}
								>
									<Button
										value={'Load more replies'}
										loading={loadMore}
										disabled={loadMore}
										className={
											'font-medium text-primary transform-none font-muli text-base capitalize py-2 px-8 shadow-none border-primary border border-solid'
										}
										type="button"
										onClick={onClickLoadMoreReplies}
									/>
								</div>
							</Fade>
						)}
					<div className={isMinimal ? 'my-6 ml-10 pl-3' : 'my-6 ml-10'}>
						<UiCommentEditor
							handleChange={(e: any) => setReplyBoxText(e?.target?.value)}
							value={replyBoxText}
							rows={1}
							placeholder="Write your reply..."
							submitBtnText={'Reply'}
							onSubmit={onSubmitReply}
							errorText={commentError}
							loading={commentLoader}
							submitBtnClass="text-white flex ml-auto bg-primary transform-none font-muli fnt-t-small rounded font-semibold px-4 py-2 hover:shadow-lg outline-none border-0 mt-4"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

UiCommentWrapper.defaultProps = {
	deleteState: {
		loading: false,
		success: false,
		failed: false,
	},
};

export default UiCommentWrapper;
