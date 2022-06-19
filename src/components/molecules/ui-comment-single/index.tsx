import Button from '@atoms/button';
import Label from '@atoms/label';
import { IUser } from '@models/auth';
import React, { useEffect, useState } from 'react';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { AiTwotoneDelete } from 'react-icons/ai';
import { numerify, timeFromNowFns } from 'utils/utils';
import { USER_AVATAR_PLACEHOLDER } from 'enums/blog';
import UiCommentLike from '@molecules/ui-comment-like';
import UiCommentEditor from '@molecules/ui-comment-editor';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useDetectSelfUser } from 'app/hooks';
import { openLoginPopup } from 'reducers/login';
import { toast } from 'react-toastify';
import { IAsyncStates } from '@models/common';
import IconLabel from '@molecules/icon-label';
import { FaCommentDots } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';

interface IUiCommentSingleProps {
	comment?: any;
	index?: number;
	postId?: number;
	postAuthor?: any;
	parentId?: number;
	onClickReplyCount?: any;
	handleCommentDelete?: any;
	animateId?: number | null;
	animateClass?: string;
	animateDuration?: number;
	onSubmitCommentEdit?: any;
	onSubmitReplyEdit?: any;
	onSubmitLike?: any;
	editState: IAsyncStates;
	deleteState: IAsyncStates;
	hideReplyCount?: boolean;
	isReply?: boolean;
	replyCount: number;
	isMinimal?: boolean;
	commentBodyBg?: string;
}
function UiCommentSingle(props: IUiCommentSingleProps) {
	const {
		comment,
		index,
		postId,
		postAuthor,
		parentId,
		onClickReplyCount,
		handleCommentDelete,
		animateId,
		animateClass,
		animateDuration,
		onSubmitCommentEdit,
		onSubmitReplyEdit,
		onSubmitLike,
		editState,
		deleteState,
		hideReplyCount,
		isReply,
		replyCount,
		isMinimal,
		commentBodyBg,
	} = props;

	const router = useRouter();
	const dispatch = useAppDispatch();
	const { status } = useSession();

	const { loading: editLoading, success: editSucceed, failed: editFailed } = editState;
	const { loading: deleteLoading, success: deleteSucceed, failed: deleteFailed } = deleteState;
	const commenter: IUser | null = comment?.user || null;
	const postAuthorId: number = postAuthor?.id || null;
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const [showEditor, setShowEditor] = useState<boolean>(false);
	const [commentContent, setCommentContent] = useState<string>('');
	const [commentReplyCount, setCommentReplyCount] = useState<number>(0);
	const [commentError, setCommentError] = useState<string>('');
	const [isEditingId, setIsEditingId] = useState<number | null>(null);
	const [isDeletingId, setIsDeletingId] = useState<number | null>(null);
	const [showSeeMorebtn, setShowSeeMorebtn] = useState(true);

	const isSelfUser = useDetectSelfUser(commenter?.id);

	useEffect(() => {
		setCommentContent(comment?.content);

		return () => {
			setCommentContent('');
		};
	}, [comment]);

	useEffect(() => {
		setCommentReplyCount(replyCount);

		return () => {
			setCommentReplyCount(0);
		};
	}, [replyCount]);

	useEffect(() => {
		if (!editLoading) {
			setIsEditingId(null);
		}
	}, [editLoading]);

	useEffect(() => {
		if (editSucceed) {
			setShowEditor(false);
			setCommentError('');
		}
	}, [editSucceed]);

	useEffect(() => {
		if (editFailed && isEditingId === comment.id) {
			toast.error('Error editing comment'); // TODO: Show error message from API
			setCommentError('Comment is failed to send, please try again.');
		}
	}, [editFailed]);

	useEffect(() => {
		if (!deleteLoading) {
			setIsDeletingId(null);
		}
	}, [deleteLoading]);

	useEffect(() => {
		if (deleteSucceed && isDeletingId === comment.id) {
			toast.success('Your comment has been deleted');
		}
	}, [deleteSucceed]);

	useEffect(() => {
		if (deleteFailed) {
			return; // toast.error("Error Deleting comment"); // TODO: Show error message from API
		}
	}, [deleteFailed]);

	useEffect(() => {
		if (animateId) animateComment();
	}, [animateId]);

	const animateComment = () => {
		setIsAnimating(true);
		setTimeout(() => {
			setIsAnimating(false);
		}, animateDuration);
	};

	const checkAuth = () => {
		router.query.redirect = 'false';
		router.push(router, undefined, { scroll: false });
		dispatch(openLoginPopup({ ref: '' }));
	};

	const onSubmitEdit = async () => {
		setIsEditingId(comment.id);
		if (commentContent?.trim().length == 0) {
			return setCommentError('Please write your comment.');
		}
		setCommentError('');
		if (status === 'unauthenticated') return checkAuth();

		const formData = {
			id: comment.id,
			postId,
			parentId,
			content: commentContent,
			isReply,
		};
		if (!isReply) {
			onSubmitCommentEdit(formData);
		} else {
			onSubmitReplyEdit(formData);
		}
	};

	const onClickEdit = () => {
		if (!isSelfUser) {
			return toast.error('Your are not authorized to edit this comment');
		}
		setShowEditor(!showEditor);
	};

	const onCancelEdit = () => {
		setCommentContent(comment?.content);
		setShowEditor(false);
	};

	const onClickDelete = (id: any) => {
		setIsDeletingId(id);
		if (status === 'unauthenticated') return checkAuth();
		if (!isSelfUser) {
			return toast.error('Your are not authorized to delete this comment');
		}
		setShowEditor(false);
		handleCommentDelete({ id, isReply, parentId });
	};

	const ReplyCounter = () => {
		return (
			<span className={`whitespace-nowrap`}>
				{commentReplyCount < 1
					? 'No Replies'
					: commentReplyCount === 1
					? '1 Reply'
					: `${numerify(commentReplyCount)} Replies`}
			</span>
		);
	};
	const CollapsableCommentContent =
		commentContent?.length > 200 ? (
			<>
				{commentContent.slice(0, 200)}{' '}
				{showSeeMorebtn ? (
					<span
						className="text-primary underline text-lg cursor-pointer ml-1"
						onClick={() => setShowSeeMorebtn(false)}
					>
						read more
					</span>
				) : (
					commentContent.slice(200)
				)}
			</>
		) : (
			commentContent
		);

	const rootSpacing = isMinimal ? 6 : 6;

	return (
		<>
			<div
				className={`${
					index === 0 ? `mt-0 mb-${rootSpacing}` : `my-${rootSpacing}`
				} w-full ${animateId == comment.id && isAnimating ? animateClass : ''}`}
				id={`comment-single-id-${comment.id}`}
			>
				<div className="flex items-start w-full">
					<img
						src={commenter?.profile_photo || USER_AVATAR_PLACEHOLDER}
						className={`${isMinimal ? 'w-11 h-11' : 'w-16 h-16'} rounded-full`}
						alt="image"
					/>
					<div
						className={`flex-1 flex flex-col ml-2 py-3 md:px-6 rounded-md ${commentBodyBg}`}
					>
						<div className="">
							{(commenter?.first_name || commenter?.last_name) && (
								<Label
									value={
										<span
											className={
												isMinimal
													? 'flex flex-col md:flex-row md:justify-between items-start'
													: ''
											}
										>
											<span>
												<div className="flex flex-col">
													<div>
														<span
															className={
																isMinimal
																	? 'text-[#333333] font-proxima-nova text-lg font-[400]'
																	: 'text-[#333333] text-[20px] font-normal'
															}
														>
															{`${commenter?.first_name || ''} ${
																commenter?.last_name || ''
															}`}
														</span>
														{postAuthorId === commenter?.id && (
															<span className="ml-7 text-base font-proxima-nova txt-c13-color font-semibold">
																Master
															</span>
														)}
													</div>
													{/* {
                            commenter?.about_me &&
                            <span
                              className={
                                isMinimal
                                  ? "text-[#999999] font-proxima-nova text-sm font-normal"
                                  : "text-c-color"
                              }
                            >
                              {`${getTextExcerpt(commenter?.about_me, 50) || ""}`}
                            </span>
                          } */}
												</div>
											</span>
											{isMinimal && (
												<span className="opacity-75">
													{timeFromNowFns(comment?.created_at)}
												</span>
											)}
										</span>
									}
									className="fnt-s3-mid text-gray-700 font-proxima-nova"
								/>
							)}
							{comment?.created_at && !isMinimal && (
								<Label
									value={timeFromNowFns(comment?.created_at)}
									className="fnt-t-small pt-3 pb-4 txt-c-color font-proxima-nova font-normal"
								/>
							)}
							{showEditor ? (
								<UiCommentEditor
									handleChange={(e: any) => setCommentContent(e?.target?.value)}
									value={commentContent}
									rows={1}
									placeholder={`Edit your ${isReply ? 'reply' : 'comment'}...`}
									submitBtnText={'Edit'}
									onSubmit={onSubmitEdit}
									onCancel={onCancelEdit}
									errorText={commentError}
									loading={editLoading && isEditingId == comment.id}
									hideCancelBtn={false}
									submitBtnClass="text-white flex bg-primary transform-none font-proxima-nova text-[16px] rounded font-semibold px-4 py-2 hover:shadow-lg outline-none border-0 mt-4 shadow-none"
								/>
							) : (
								<>
									{(commentContent && (
										<Label
											value={
												<>
													{CollapsableCommentContent}{' '}
													<span
														className="text-primary underline text-lg cursor-pointer ml-1"
														onClick={() => setShowSeeMorebtn(true)}
													>
														{!showSeeMorebtn && 'read less'}
													</span>
												</>
											}
											className={
												isMinimal
													? 'text-md tracking-tight  text-blue-350 pt-2 text-lg'
													: 'fnt-s3-mid custom-border-color font-proxima-nova font-normal'
											}
										/>
									)) || <></>}
								</>
							)}
						</div>

						<div
							className={`flex lg:flex-row flex-col gap-[20px] lg:gap-0 md:items-center ${
								isMinimal ? 'mt-3' : 'mt-8 -ml-5'
							}`}
						>
							<UiCommentLike
								comment={comment}
								parentId={parentId}
								likeCount={comment?.likes}
								isReply={isReply}
								onSubmitLike={onSubmitLike}
								isMinimal={isMinimal}
								isSelfUser={isSelfUser}
							/>
							{!hideReplyCount && (
								<>
									{isMinimal ? (
										<IconLabel
											mainClass="flex items-center mr-3"
											tooltipProps={{ open: false }}
											labelValue={
												<>
													{' '}
													<span className="text-lg pr-1">•</span>{' '}
													{ReplyCounter()}
												</>
											}
											iconContanerClass="text-lg text-[#ff52be]"
											lableClass={{
												root: 'text-blue-350 tracking-tight text-sm mr-3 ml-2 font-proxima-nova',
											}}
											iconComponent={
												<FaCommentDots
													className={`cursor-pointer ${
														commentReplyCount > 0
															? 'text-primary'
															: 'text-purple-400'
													}`}
												/>
											}
											onClick={onClickReplyCount}
										/>
									) : (
										<div className="md:ml-[40px]">
											<Button
												onClick={onClickReplyCount}
												value={
													<>
														<BsFillChatDotsFill
															className={`text-2xl ${
																commentReplyCount > 0
																	? 'text-primary'
																	: 'text-purple-400'
															}`}
														/>
													</>
												}
												className="bg-transparent p-0 transform-none outline-none"
												type="button"
											/>
											<span
												onClick={onClickReplyCount}
												className={`px-4 pl-0 text-base font-proxima-nova font-semibold cursor-pointer`}
											>
												<ReplyCounter />
											</span>
										</div>
									)}
								</>
							)}
							{isSelfUser && (
								<>
									{isMinimal ? (
										<IconLabel
											tooltipProps={{ open: false }}
											mainClass="flex items-center mr-3"
											iconContanerClass="text-lg"
											lableClass={{
												root: 'text-blue-350 tracking-tight text-sm ml-2 font-proxima-nova',
											}}
											iconComponent={
												<RiEdit2Fill
													className={`cursor-pointer ${
														showEditor
															? 'text-primary'
															: 'text-purple-400'
													}`}
												/>
											}
											onClick={onClickEdit}
										/>
									) : (
										<div className=" ml-5 md:ml-[40px]">
											<Button
												onClick={onClickEdit}
												value={
													<>
														<FaEdit
															className={`text-2xl mr-3 ${
																showEditor
																	? 'text-primary'
																	: 'text-purple-400'
															}`}
														/>
														<span className="capitalize">{'Edit'}</span>
													</>
												}
												className="px-4 text-base font-proxima-nova font-semibold cursor-pointer"
												type="button"
											/>
										</div>
									)}
									{isMinimal ? (
										<div
											className={
												deleteLoading && isDeletingId === comment.id
													? 'cursor-not-allowed pointer-events-none'
													: 'cursor-pointer'
											}
										>
											<IconLabel
												tooltipProps={{ open: false }}
												mainClass="flex items-center mr-3"
												iconContanerClass="text-lg"
												lableClass={{
													root: 'text-blue-350 tracking-tight text-sm ml-2 font-proxima-nova',
												}}
												labelValue={
													<span className="text-lg pl-1">
														{deleteLoading &&
														isDeletingId === comment.id
															? '  Deleting...'
															: ''}
													</span>
												}
												iconComponent={
													<MdDelete
														className={`
                                ${
									deleteLoading && isDeletingId === comment.id
										? 'cursor-not-allowed pointer-events-none'
										: 'cursor-pointer'
								} 
                                ${
									deleteLoading && isDeletingId === comment.id
										? 'text-primary'
										: 'text-purple-400'
								}
                              `}
													/>
												}
												onClick={() => onClickDelete(comment.id)}
											/>
										</div>
									) : (
										<div className=" ml-5 md:ml-[40px]">
											<Button
												onClick={() => onClickDelete(comment.id)}
												disabled={
													deleteLoading && isDeletingId === comment.id
												}
												value={
													<>
														<AiTwotoneDelete
															className={`text-2xl mr-3 ${
																deleteLoading &&
																isDeletingId === comment.id
																	? 'text-primary'
																	: 'text-purple-400'
															}`}
														/>
														<span className="capitalize">
															{deleteLoading &&
															isDeletingId === comment.id
																? 'Deleting...'
																: 'Delete'}
														</span>
													</>
												}
												className="px-4 text-base font-proxima-nova font-semibold cursor-pointer"
												type="button"
											/>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

UiCommentSingle.defaultProps = {
	animateClass: 'animate-bounce',
	animateDuration: 2500,
	isDeletingId: null,
	isReply: false,
	isMinimal: false,
	commentBodyBg: 'bg-white',
	hideReplyCount: false,
	editState: {
		loading: false,
		success: false,
		failed: false,
	},
	deleteState: {
		loading: false,
		success: false,
		failed: false,
	},
};

export default UiCommentSingle;
