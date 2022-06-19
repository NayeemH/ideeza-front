import Button from '@atoms/button';
import { IBlogComment } from '@models/blog';
import UiCommentCounter from '@molecules/ui-comment-counter';
import UiCommentEditor from '@molecules/ui-comment-editor';
import UiCommentWrapper from '@molecules/ui-comment-wrapper';
import { Grow } from '@mui/material';
import { useEffect, useRef } from 'react';

const UiComments = (props: any) => {
	const {
		comments,
		post,
		numberOfComments,
		parentCommentAnimateId,
		replyAnimateId,
		handleCommentDelete,
		handleReplyDelete,
		onSubmitCommentEdit,
		onSubmitReplyNew,
		onSubmitReplyEdit,
		onSubmitLike,
		handleGetCommentReplies,
		onClickLoadMore,
		currentPage,
		pageCount,
		loadingMore,
		commentBoxText,
		handleChangeCommentBoxText,
		handleKeyDownCommentBoxText,
		onClickPublishComment,
		commentError,
		commentLoader,
		isScrollTop,
		replyPerPage,
		commentEditState,
		commentDeleteState,
		replyListState,
		replyCreateState,
		hideCommentCounter,
		hideCommentSubmitBtn,
		commentEditorSubmitBtnText,
		className,
		commentListRootClassName,
		commentEditorWrapClassName,
		commentEditorRows,
		commentEditorClassName,
		commentEditRootClassName,
		commentEditorSubmitBtnClassName,
		commentEditorMultiline,
		commentSingleIsMinimal,
		commentEditorDisable,
		commentSingleBodyBg,
		buttonPublishContainer,
	} = props;

	const commentsBlockRef: any = useRef(null);

	useEffect(() => {
		if (isScrollTop) scrollTopByRef();
	}, [isScrollTop]);

	const scrollTopByRef = () => {
		if (commentsBlockRef) {
			commentsBlockRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	return (
		<div
			className={className}
			ref={commentsBlockRef}
		>
			{!hideCommentCounter && (
				<div className="mb-6">
					<UiCommentCounter count={numberOfComments} />
				</div>
			)}
			<div className={commentListRootClassName}>
				{comments?.length > 0 && (
					<>
						{comments.map((comment: IBlogComment, index: number) => (
							<UiCommentWrapper
								key={index}
								commentIndex={index}
								comment={comment}
								postAuthor={post?.user}
								postId={post?.id}
								parentAnimateId={parentCommentAnimateId}
								replyAnimateId={replyAnimateId}
								handleCommentDelete={handleCommentDelete}
								handleReplyDelete={handleReplyDelete}
								onSubmitCommentEdit={onSubmitCommentEdit}
								onSubmitReplyNew={onSubmitReplyNew}
								onSubmitReplyEdit={onSubmitReplyEdit}
								onSubmitLike={onSubmitLike}
								handleGetCommentReplies={handleGetCommentReplies}
								replyPerPage={replyPerPage}
								editState={commentEditState}
								deleteState={commentDeleteState}
								replyListState={replyListState}
								replyCreateState={replyCreateState}
								isMinimal={commentSingleIsMinimal}
								commentBodyBg={commentSingleBodyBg}
							/>
						))}
						{currentPage < pageCount && (
							<Grow
								in={currentPage < pageCount}
								timeout={300}
							>
								<div
									className={`${
										commentSingleIsMinimal ? 'mt-8 mb-4' : 'my-8'
									} flex items-center justify-center`}
								>
									<Button
										value={'Load more comments'}
										loading={loadingMore}
										disabled={loadingMore}
										className={
											'font-semibold text-primary transform-none  text-base capitalize py-2 px-8 font-proxima-nova'
										}
										type="button"
										onClick={onClickLoadMore}
										variant="outlined"
									/>
								</div>
							</Grow>
						)}
					</>
				)}
			</div>
			<div className={commentEditorWrapClassName}>
				<UiCommentEditor
					handleChange={handleChangeCommentBoxText}
					handleKeyDown={handleKeyDownCommentBoxText}
					value={commentBoxText}
					rows={commentEditorRows}
					submitBtnText={commentEditorSubmitBtnText}
					onSubmit={onClickPublishComment}
					errorText={commentError}
					loading={commentLoader}
					hideSubmitBtn={hideCommentSubmitBtn}
					inputClasses={commentEditorClassName}
					submitBtnClass={commentEditorSubmitBtnClassName}
					rootClasses={commentEditRootClassName}
					multiline={commentEditorMultiline}
					disableInput={commentEditorDisable}
					buttonPublishContainer={buttonPublishContainer}
				/>
			</div>
		</div>
	);
};

UiComments.defaultProps = {
	hideCommentCounter: false,
	commentEditorMultiline: true,
	className: '',
	commentListRootClassName: '',
	commentEditorWrapClassName: '',
	hideCommentSubmitBtn: false,
	commentEditorRows: 2,
	commentEditorSubmitBtnText: 'Publish',
	commentSingleIsMinimal: false,
	commentEditorDisable: false,
	commentSingleBodyBg: 'bg-white',
	commentEditorClassName:
		'w-full rounded-lg fnt-small tracking-tight font-proxima-nova border border-opacity-40',
	commentEditorSubmitBtnClassName:
		'text-white flex bg-primary transform-none font-muli text-base 2xl:text-xl rounded font-semibold px-16 py-3 hover:shadow-lg outline-none border-0 ml-auto mt-8',
};

export default UiComments;
