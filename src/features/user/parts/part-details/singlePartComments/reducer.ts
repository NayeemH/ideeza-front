import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	createPartComment,
	createPartReply,
	deletePartComment,
	editPartComment,
	getPartCommentRepliesById,
	getPartCommentsById,
	likePartComment,
} from './api';
import { ICommentsStateType } from '@models/comment';
import { IAsyncStates } from '@models/common';
import {
	IPartCommentDeleteDataType,
	IPartCommentGetDataType,
	IPartCommentLikeDataType,
	IPartCommentSubmitDataType,
} from '@models/user-parts';

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

export const getPartCommentsAsync = createAsyncThunk(
	'partComment/getComments',
	async (payload: IPartCommentGetDataType) => {
		return await getPartCommentsById(payload.id, payload?.type, payload.page, payload.perPage);
	}
);

export const getPartRepliesAsync = createAsyncThunk(
	'partComment/getReplies',
	async (payload: IPartCommentGetDataType) => {
		return await getPartCommentRepliesById(
			payload.id,
			payload?.type,
			payload.page,
			payload.perPage
		);
	}
);

export const createPartCommentAsync = createAsyncThunk(
	'partComment/createComment',
	async (payload: any) => {
		return await createPartComment(payload?.type, payload?.partId, payload?.formData);
	}
);

export const createPartReplyAsync = createAsyncThunk(
	'partComment/createReply',
	async (payload: any) => {
		return await createPartReply(payload?.type, payload?.partId, payload?.formData);
	}
);

export const editPartCommentAsync = createAsyncThunk(
	'partComment/editComment',
	async (payload: IPartCommentSubmitDataType) => {
		return await editPartComment(payload?.type, payload?.partId, payload?.formData);
	}
);

export const deletePartCommentAsync = createAsyncThunk(
	'partComment/deleteComment',
	async (payload: IPartCommentDeleteDataType) => {
		return await deletePartComment(payload?.type, payload?.formData);
	}
);

export const likePartCommentAsync = createAsyncThunk(
	'partComment/likeComment',
	async (payload: IPartCommentLikeDataType) => {
		return await likePartComment(payload?.type, payload?.formData);
	}
);

export const partCommentsSlice = createSlice({
	name: 'partComment',
	initialState: initialState,
	reducers: {
		setPartComments: (state, action) => {
			state.comments = action.payload;
		},
		setPartCommentsCount: (state, action) => {
			state.count = action.payload;
		},
		resetPartCommentListState: (state) => {
			state.commentList = initCommentActionState;
		},
		resetPartReplyListState: (state) => {
			state.replyList = initCommentActionState;
		},
		resetPartCommentCreateState: (state) => {
			state.commentCreate = initCommentActionState;
		},
		resetPartCommentEditState: (state) => {
			state.commentEdit = initCommentActionState;
		},
		resetPartCommentDeleteState: (state) => {
			state.commentDelete = initCommentActionState;
		},
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		// 1. Get Part Comments ----------------------------------
		builder.addCase(getPartCommentsAsync.pending, (state) => {
			state.commentList.loading = true;
			state.commentList.success = false;
			state.commentList.failed = false;
		});
		builder.addCase(getPartCommentsAsync.rejected, (state) => {
			state.commentList.loading = false;
			state.commentList.success = false;
			state.commentList.failed = true;
		});
		builder.addCase(getPartCommentsAsync.fulfilled, (state, action) => {
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
		builder.addCase(getPartRepliesAsync.pending, (state) => {
			state.replyList.loading = true;
			state.replyList.success = false;
			state.replyList.failed = false;
		});
		builder.addCase(getPartRepliesAsync.rejected, (state) => {
			state.replyList.loading = false;
			state.replyList.success = false;
			state.replyList.failed = true;
		});
		builder.addCase(getPartRepliesAsync.fulfilled, (state, action) => {
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

		// 3. Create Part Comment ----------------------------------
		builder.addCase(createPartCommentAsync.pending, (state) => {
			state.newComment.commentId = null;
			state.commentCreate.loading = true;
			state.commentCreate.success = false;
			state.commentCreate.failed = false;
		});
		builder.addCase(createPartCommentAsync.rejected, (state) => {
			state.newComment.commentId = null;
			state.commentCreate.loading = false;
			state.commentCreate.success = false;
			state.commentCreate.failed = true;
		});
		builder.addCase(createPartCommentAsync.fulfilled, (state, action) => {
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
		builder.addCase(createPartReplyAsync.pending, (state) => {
			state.newComment.replyId = null;
			state.replyCreate.loading = true;
			state.replyCreate.success = false;
			state.replyCreate.failed = false;
		});
		builder.addCase(createPartReplyAsync.rejected, (state) => {
			state.newComment.replyId = null;
			state.replyCreate.loading = false;
			state.replyCreate.success = false;
			state.replyCreate.failed = true;
		});
		builder.addCase(createPartReplyAsync.fulfilled, (state, action) => {
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

		// 5. Edit Part Comment ----------------------------------
		builder.addCase(editPartCommentAsync.pending, (state) => {
			state.commentEdit.loading = true;
			state.commentEdit.success = false;
			state.commentEdit.failed = false;
		});
		builder.addCase(editPartCommentAsync.rejected, (state) => {
			state.commentEdit.loading = false;
			state.commentEdit.success = false;
			state.commentEdit.failed = true;
		});
		builder.addCase(editPartCommentAsync.fulfilled, (state, action) => {
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

		// 6. Delete Part Comment ----------------------------------
		builder.addCase(deletePartCommentAsync.pending, (state) => {
			state.commentDelete.loading = true;
			state.commentDelete.success = false;
			state.commentDelete.failed = false;
		});
		builder.addCase(deletePartCommentAsync.rejected, (state) => {
			state.commentDelete.loading = false;
			state.commentDelete.success = false;
			state.commentDelete.failed = true;
		});
		builder.addCase(deletePartCommentAsync.fulfilled, (state, action) => {
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

		// 7. Like Part Comment ----------------------------------
		builder.addCase(likePartCommentAsync.pending, (state) => {
			state.commentLike.loading = true;
			state.commentLike.success = false;
			state.commentLike.failed = false;
		});
		builder.addCase(likePartCommentAsync.rejected, (state) => {
			state.commentLike.loading = false;
			state.commentLike.success = false;
			state.commentLike.failed = true;
		});
		builder.addCase(likePartCommentAsync.fulfilled, (state, action) => {
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
	setPartComments,
	setPartCommentsCount,
	resetPartCommentListState,
	resetPartReplyListState,
	resetPartCommentEditState,
	resetPartCommentDeleteState,
	reset,
} = partCommentsSlice.actions;

export default partCommentsSlice.reducer;
