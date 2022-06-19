import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { AppState } from 'app/store';
import { createBlogPost, getBlogs, IResposeData } from './request';

export interface BlogState {
	loading: boolean;
	success: boolean;
	failed: boolean;
	articleList: IResposeData | undefined;
	data: any;
	perviewData: any;
}

const initialState: BlogState = {
	loading: false,
	articleList: undefined,
	data: undefined,
	success: false,
	failed: false,
	perviewData: {},
};

export const getBlogsAsync = createAsyncThunk('blog/getArticleList', async (payload: any) => {
	const response = await getBlogs(payload);
	// The value we return becomes the `fulfilled` action payload
	return response.data;
});
export const createBlogPostAsync = createAsyncThunk('blog/postArticle', async (payload: any) => {
	const response = await createBlogPost(payload);
	// The value we return becomes the `fulfilled` action payload
	return response.payload;
});

export const blogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {
		reset: (state) => {
			state.success = false;
			state.failed = false;
			state.loading = false;
			state.perviewData = {};
		},
		previewData: (state, action) => {
			state.perviewData = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getBlogsAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getBlogsAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(getBlogsAsync.fulfilled, (state, { payload }) => {
			state.articleList = payload;
			state.loading = false;
		});
		builder.addCase(createBlogPostAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createBlogPostAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(createBlogPostAsync.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.loading = false;
			state.success = true;
		});
	},
});

export const { reset, previewData } = blogSlice.actions;

export const selectTasks = (state: AppState) => state.code;

export default blogSlice.reducer;
