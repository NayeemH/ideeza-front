import { INewsFeed } from '@models/news-feed';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AppState } from 'app/store';
import { getNewsFeed } from './request';

export interface DashboardState {
	loading: boolean;
	success: boolean;
	failed: boolean;
	feed: INewsFeed[] | undefined;
}

const initialState: DashboardState = {
	loading: false,
	success: false,
	failed: false,
	feed: undefined,
};

export const getNewsFeedAsync = createAsyncThunk('newsfeed/NewsList', async (payload: any) => {
	const response = await getNewsFeed(payload);
	return response.data;
});

export const newfeedSlice = createSlice({
	name: 'newfeed',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getNewsFeedAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getNewsFeedAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(getNewsFeedAsync.fulfilled, (state, { payload }) => {
			state.feed = payload;
			state.loading = false;
			state.success = true;
		});
	},
});

export const { reset } = newfeedSlice.actions;

export const selectTasks = (state: AppState) => state.code;

export default newfeedSlice.reducer;
