import { IProjects } from '@models/projects';
import { IUserActivities } from '@models/user-profile';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { AppState } from 'app/store';
import {
	getActivities,
	getBlogs,
	getFriends,
	getUserProjects,
	getUserSkills,
	IBlogResponseData,
	IFriendsResponseData,
} from './request';

export interface BlogState {
	loading: boolean;
	success: boolean;
	failed: boolean;
	article: IBlogResponseData | undefined;
	activities: IUserActivities[] | undefined;
	friends: IFriendsResponseData | undefined;
	skills: any | undefined;
	projects: IProjects | undefined;
}

const initialState: BlogState = {
	loading: false,
	article: undefined,
	activities: undefined,
	skills: undefined,
	projects: undefined,
	friends: undefined,
	success: false,
	failed: false,
};

export const getUserArticleAsync = createAsyncThunk('user/profileArticle', async (payload: any) => {
	const response = await getBlogs(payload);
	// The value we return becomes the `fulfilled` action payload
	return response.data;
});
export const getUserActivitiesAsync = createAsyncThunk('user/ActivityList', async () => {
	const response = await getActivities();
	// The value we return becomes the `fulfilled` action payload
	return response.data;
});
export const getUserFriendsAsync = createAsyncThunk('user/FriendList', async () => {
	const response = await getFriends();
	// The value we return becomes the `fulfilled` action payload
	return response.data;
});
export const getUserSkillsAsync = createAsyncThunk('user/Skills', async () => {
	const response = await getUserSkills();
	// The value we return becomes the `fulfilled` action payload
	return response.data;
});
export const getUserProjectsAsync = createAsyncThunk('user/Projects', async () => {
	const response = await getUserProjects();
	// The value we return becomes the `fulfilled` action payload
	return response.data;
});

export const blogSlice = createSlice({
	name: 'userProfile',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getUserArticleAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getUserArticleAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(getUserArticleAsync.fulfilled, (state, { payload }) => {
			state.article = payload;
			state.loading = false;
			state.success = true;
		});
		builder.addCase(getUserActivitiesAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getUserActivitiesAsync.rejected, (state) => {
			state.failed = true;
			state.loading = false;
		});
		builder.addCase(getUserActivitiesAsync.fulfilled, (state, { payload }) => {
			state.activities = payload;
			state.loading = false;
			state.success = true;
		});
		builder.addCase(getUserFriendsAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getUserFriendsAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(getUserFriendsAsync.fulfilled, (state, { payload }) => {
			state.friends = payload;
			state.loading = false;
			state.success = true;
		});
		builder.addCase(getUserSkillsAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getUserSkillsAsync.rejected, (state) => {
			state.failed = true;
			state.loading = false;
		});
		builder.addCase(getUserSkillsAsync.fulfilled, (state, { payload }) => {
			state.skills = payload;
			state.loading = false;
			state.success = true;
		});
		builder.addCase(getUserProjectsAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getUserProjectsAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(getUserProjectsAsync.fulfilled, (state, { payload }) => {
			state.projects = payload;
			state.loading = false;
			state.success = true;
		});
	},
});

export const { reset } = blogSlice.actions;

export const selectTasks = (state: AppState) => state.code;

export default blogSlice.reducer;
