import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { AppState } from 'app/store';
import { getBlogs, IResposeData } from './request';

export interface BlogState {
	loading: boolean;
	success: boolean;
	failed: boolean;
	data: IResposeData | undefined;
}

const initialState: BlogState = {
	loading: false,
	data: undefined,
	success: false,
	failed: false,
};

export const getBlogsAsync = createAsyncThunk('blog/postCodePart', async (payload: any) => {
	const response = await getBlogs(payload);
	// The value we return becomes the `fulfilled` action payload
	return response.data;
});

export const blogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getBlogsAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getBlogsAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(getBlogsAsync.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.loading = false;
			state.success = true;
		});
	},
});

export const { reset } = blogSlice.actions;

export const selectTasks = (state: AppState) => state.code;

export default blogSlice.reducer;
