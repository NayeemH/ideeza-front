import { IUser } from '@models/auth';
import { IBlogComment, IBlogCommentDeleteDataType } from '@models/blog';
import { IAsyncStates } from '@models/common';
import UiCommentSingle from '@molecules/ui-comment-single';
import { useEffect, useState } from 'react';

interface IUiCommentRepliesProps {
	replies: IBlogComment[];
	postAuthor?: IUser;
	postId?: number;
	parentId?: number;
	hideReplyCount?: boolean;
	animateId?: number | null;
	onSubmitReplyEdit?: any;
	onSubmitLike?: any;
	handleReplyDelete?: any;
	editState?: IAsyncStates;
	deleteState?: IAsyncStates;
	isMinimal?: boolean;
	commentBodyBg?: string;
}

const UiCommentReplies = (props: IUiCommentRepliesProps) => {
	const {
		replies,
		postAuthor,
		postId,
		parentId,
		animateId,
		onSubmitReplyEdit,
		onSubmitLike,
		handleReplyDelete,
		editState,
		deleteState,
		isMinimal,
		commentBodyBg,
	} = props;

	const [replyList, setReplyList] = useState<IBlogComment[]>([]);

	useEffect(() => {
		setReplyList(replies);
		return () => {
			setReplyList([]);
		};
	}, [replies]);

	// console.log('replyList, replies----', replyList, replies)

	const handleCommentDelete = (data: IBlogCommentDeleteDataType) => {
		handleReplyDelete(data);
	};

	return (
		<>
			{replyList.map((reply: IBlogComment, i: number) => (
				<div key={i}>
					<div
						className={
							isMinimal
								? 'ml-10 pl-3'
								: 'ml-10 pl-10 border-l border-solid border-stone-200'
						}
					>
						<UiCommentSingle
							comment={reply}
							index={i}
							postAuthor={postAuthor}
							postId={postId}
							parentId={parentId}
							animateId={animateId}
							handleCommentDelete={(data: IBlogCommentDeleteDataType) =>
								handleCommentDelete(data)
							}
							onSubmitReplyEdit={onSubmitReplyEdit}
							onSubmitLike={onSubmitLike}
							editState={editState}
							deleteState={deleteState}
							replyCount={0}
							isMinimal={isMinimal}
							commentBodyBg={commentBodyBg}
							isReply
							hideReplyCount
						/>
					</div>
				</div>
			))}
		</>
	);
};

export default UiCommentReplies;
