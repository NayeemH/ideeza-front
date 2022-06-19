import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	createProjectComment,
	createProjectReply,
	deleteProjectComment,
	editProjectComment,
	getProjectCommentRepliesById,
	getProjectCommentsById,
	likeProjectComment,
} from './api';
import {
	IBlogCommentDeleteDataType,
	IBlogCommentGetDataType,
	IBlogCommentLikePostDataType,
	IBlogCommentSubmitDataType,
} from '@models/blog';
import { ICommentsStateType } from '@models/comment';
import { IAsyncStates } from '@models/common';

const initCommentActionState: IAsyncStates = {
	loading: false,
	success: false,
	failed: false,
};

const initialState: ICommentsStateType = {
	comments: [],
	commentList: initCommentActionState,
	commentCreate: initCommentActionState,
	commentEdit: initCommentActionState,
	commentDelete: initCommentActionState,
	commentLike: initCommentActionState,
	replyCreate: initCommentActionState,
	replyList: initCommentActionState,
	newComment: {
		commentId: null,
		replyId: null,
	},
	count: 0,
};

export const getProjectCommentsAsync = createAsyncThunk(
	'projectComment/getComments',
	async (payload: IBlogCommentGetDataType) => {
		return await getProjectCommentsById(payload.id, payload.page, payload.perPage);
	}
);

export const getProjectRepliesAsync = createAsyncThunk(
	'projectComment/getReplies',
	async (payload: IBlogCommentGetDataType) => {
		return await getProjectCommentRepliesById(payload.id, payload.page, payload.perPage);
	}
);

export const createProducCommentAsync = createAsyncThunk(
	'projectComment/createComment',
	async (payload: any) => {
		return await createProjectComment(payload);
	}
);

export const createProjectReplyAsync = createAsyncThunk(
	'projectComment/createReply',
	async (payload: any) => {
		return await createProjectReply(payload);
	}
);

export const editProjectCommentAsync = createAsyncThunk(
	'projectComment/editComment',
	async (payload: IBlogCommentSubmitDataType) => {
		return await editProjectComment(payload);
	}
);

export const deleteProjectCommentAsync = createAsyncThunk(
	'projectComment/deleteComment',
	async (payload: IBlogCommentDeleteDataType) => {
		return await deleteProjectComment(payload?.id, payload?.isReply, payload?.parentId);
	}
);

export const likeProjectCommentAsync = createAsyncThunk(
	'projectComment/likeComment',
	async (payload: IBlogCommentLikePostDataType) => {
		return await likeProjectComment(payload?.id, payload?.isReply, payload?.parentId);
	}
);

export const projectCommentsSlice = createSlice({
	name: 'projectComment',
	initialState: initialState,
	reducers: {
		setProjectComments: (state, action) => {
			state.comments = action.payload;
		},
		setProjectCommentsCount: (state, action) => {
			state.count = action.payload;
		},
		resetProjectCommentListState: (state) => {
			state.commentList = initCommentActionState;
		},
		resetProjectReplyListState: (state) => {
			state.replyList = initCommentActionState;
		},
		resetProjectCommentCreateState: (state) => {
			state.commentCreate = initCommentActionState;
		},
		resetProjectCommentEditState: (state) => {
			state.commentEdit = initCommentActionState;
		},
		resetProjectCommentDeleteState: (state) => {
			state.commentDelete = initCommentActionState;
		},
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		// 1. Get Blog Comments ----------------------------------
		builder.addCase(getProjectCommentsAsync.pending, (state) => {
			state.commentList.loading = true;
			state.commentList.success = false;
			state.commentList.failed = false;
		});
		builder.addCase(getProjectCommentsAsync.rejected, (state) => {
			state.commentList.loading = false;
			state.commentList.success = false;
			state.commentList.failed = true;
		});
		builder.addCase(getProjectCommentsAsync.fulfilled, (state, action) => {
			const newComments = action.payload?.results;
			if (newComments) {
				state.comments = [...state.comments, ...newComments];
				state.count = action.payload?.count;
			}
			state.commentList.loading = false;
			state.commentList.success = true;
			state.commentList.failed = false;
		});

		// 2. Get Comment Replies ----------------------------------
		builder.addCase(getProjectRepliesAsync.pending, (state) => {
			state.replyList.loading = true;
			state.replyList.success = false;
			state.replyList.failed = false;
		});
		builder.addCase(getProjectRepliesAsync.rejected, (state) => {
			state.replyList.loading = false;
			state.replyList.success = false;
			state.replyList.failed = true;
		});
		builder.addCase(getProjectRepliesAsync.fulfilled, (state, action) => {
			const newReplies = action.payload?.replies;
			const parentId = action.payload?.parentId;
			const index = state.comments.findIndex((item) => item.id === parentId);

			if (index !== -1) {
				if (state.comments[index]?.children?.length > 0) {
					state.comments[index].children = [
						...state.comments[index].children,
						...newReplies,
					];
				} else {
					state.comments[index].children = [...newReplies];
				}
			}

			state.replyList.loading = false;
			state.replyList.success = true;
			state.replyList.failed = false;
		});

		// 3. Create Blog Comment ----------------------------------
		builder.addCase(createProducCommentAsync.pending, (state) => {
			state.newComment.commentId = null;
			state.commentCreate.loading = true;
			state.commentCreate.success = false;
			state.commentCreate.failed = false;
		});
		builder.addCase(createProducCommentAsync.rejected, (state) => {
			state.newComment.commentId = null;
			state.commentCreate.loading = false;
			state.commentCreate.success = false;
			state.commentCreate.failed = true;
		});
		builder.addCase(createProducCommentAsync.fulfilled, (state, action) => {
			const data = action.payload;
			const comment = data?.comment;

			if (comment) {
				state.comments = [comment, ...state.comments];
				state.count = Number(state.count) + 1;
				state.newComment.commentId = comment.id;
			}
			state.commentCreate.loading = false;
			state.commentCreate.success = true;
			state.commentCreate.failed = false;
		});

		// 4. Create Reply ----------------------------------
		builder.addCase(createProjectReplyAsync.pending, (state) => {
			state.newComment.replyId = null;
			state.replyCreate.loading = true;
			state.replyCreate.success = false;
			state.replyCreate.failed = false;
		});
		builder.addCase(createProjectReplyAsync.rejected, (state) => {
			state.newComment.replyId = null;
			state.replyCreate.loading = false;
			state.replyCreate.success = false;
			state.replyCreate.failed = true;
		});
		builder.addCase(createProjectReplyAsync.fulfilled, (state, action) => {
			const data = action.payload;
			const comment = data?.comment;
			const parentId = data?.parent;
			if (comment) {
				const parentIndex = state.comments.findIndex((item) => item.id === parentId);
				if (parentIndex !== -1) {
					if (state.comments[parentIndex]?.children?.length > 0) {
						state.comments[parentIndex].children.unshift(comment);
					} else {
						state.comments[parentIndex].children = [];
						state.comments[parentIndex].children.unshift(comment);
					}
					state.comments[parentIndex].replies_count =
						state.comments[parentIndex].replies_count + 1;
					state.newComment.replyId = comment.id;
				}
			}
			state.replyCreate.loading = false;
			state.replyCreate.success = true;
			state.replyCreate.failed = false;
		});

		// 5. Edit Blog Comment ----------------------------------
		builder.addCase(editProjectCommentAsync.pending, (state) => {
			state.commentEdit.loading = true;
			state.commentEdit.success = false;
			state.commentEdit.failed = false;
		});
		builder.addCase(editProjectCommentAsync.rejected, (state) => {
			state.commentEdit.loading = false;
			state.commentEdit.success = false;
			state.commentEdit.failed = true;
		});
		builder.addCase(editProjectCommentAsync.fulfilled, (state, action) => {
			const comment = action.payload;

			if (!comment?.isReply) {
				const commentIndex = state.comments.findIndex((item) => item.id === comment.id);
				state.comments[commentIndex].content = comment.content;
			}

			if (comment && comment.isReply && comment.parentId) {
				const parentIndex = state.comments.findIndex(
					(item) => item.id === comment.parentId
				);

				if (parentIndex !== -1) {
					const replies = state.comments[parentIndex].children;
					const replyIndex = replies.findIndex((item: any) => item.id === comment.id);
					replies[replyIndex].content = comment.content;
				}
			}

			state.commentEdit.loading = false;
			state.commentEdit.success = true;
			state.commentEdit.failed = false;
		});

		// 6. Delete Blog Comment ----------------------------------
		builder.addCase(deleteProjectCommentAsync.pending, (state) => {
			state.commentDelete.loading = true;
			state.commentDelete.success = false;
			state.commentDelete.failed = false;
		});
		builder.addCase(deleteProjectCommentAsync.rejected, (state) => {
			state.commentDelete.loading = false;
			state.commentDelete.success = false;
			state.commentDelete.failed = true;
		});
		builder.addCase(deleteProjectCommentAsync.fulfilled, (state, action) => {
			const comment = action.payload;
			if (!comment?.isReply) {
				state.comments = state.comments.filter((item) => item.id !== comment?.id);
				state.count = Number(state.count) - 1;
			}
			if (comment && comment.isReply && comment.parentId) {
				const parentIndex = state.comments.findIndex(
					(item) => item.id === comment.parentId
				);
				if (parentIndex !== -1) {
					state.comments[parentIndex].children = state.comments[
						parentIndex
					].children.filter((item: any) => item.id !== comment?.id);
					state.comments[parentIndex].replies_count =
						state.comments[parentIndex].replies_count - 1;
				}
			}

			state.commentDelete.loading = false;
			state.commentDelete.success = true;
			state.commentDelete.failed = false;
		});

		// 7. Like Blog Comment ----------------------------------
		builder.addCase(likeProjectCommentAsync.pending, (state) => {
			state.commentLike.loading = true;
			state.commentLike.success = false;
			state.commentLike.failed = false;
		});
		builder.addCase(likeProjectCommentAsync.rejected, (state) => {
			state.commentLike.loading = false;
			state.commentLike.success = false;
			state.commentLike.failed = true;
		});
		builder.addCase(likeProjectCommentAsync.fulfilled, (state, action) => {
			const comment = action.payload;
			if (comment?.isSuccess && !comment?.isReply) {
				const index = state.comments.findIndex((item) => item.id === comment?.id);
				if (index !== -1) {
					state.comments[index].likes = Number(state.comments[index].likes) + 1;
					state.comments[index].is_liked = true;
				}
			}
			if (comment?.isSuccess && comment?.isReply && comment?.parentId) {
				const parentIndex = state.comments.findIndex(
					(item) => item.id === comment.parentId
				);
				if (parentIndex !== -1) {
					const replies = state.comments[parentIndex].children;
					const replyIndex = replies.findIndex((item: any) => item.id === comment.id);
					replies[replyIndex].likes = Number(replies[replyIndex].likes) + 1;
					replies[replyIndex].is_liked = true;
				}
			}

			state.commentLike.loading = false;
			state.commentLike.success = true;
			state.commentLike.failed = false;
		});
	},
});

export const {
	setProjectComments,
	setProjectCommentsCount,
	resetProjectCommentListState,
	resetProjectReplyListState,
	resetProjectCommentEditState,
	resetProjectCommentDeleteState,
	reset,
} = projectCommentsSlice.actions;

export default projectCommentsSlice.reducer;
