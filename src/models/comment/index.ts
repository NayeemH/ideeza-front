import { IBlogComment } from '@models/blog';
import { IAsyncStates } from '@models/common';

export interface ICommentsStateType {
	comments: IBlogComment[];
	commentList: IAsyncStates;
	replyList: IAsyncStates;
	replyCreate: IAsyncStates;
	commentCreate: IAsyncStates;
	commentEdit: IAsyncStates;
	commentDelete: IAsyncStates;
	commentLike: IAsyncStates;
	newComment: {
		commentId: number | null;
		replyId: number | null;
	};
	count?: number;
}
