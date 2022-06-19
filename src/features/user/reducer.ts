import { IUserActivities } from '@models/user-profile';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { AppState } from 'app/store';
import {
	getActivities,
	getBlogs,
	getProjects,
	IBlogResponseData,
	IProjectsResponseData,
} from './request';

export interface DashboardState {
	loading: boolean;
	success: boolean;
	failed: boolean;
	projects: number;
	contacts: number;
	score: number;
	activities: IUserActivities[] | undefined;
	latestArticles: IBlogResponseData | undefined;
	topProjects: IProjectsResponseData | undefined;
	project: {
		model: boolean;
		self: {
			model: boolean;
			loading: boolean;
		};
		ideeza: {
			modal: boolean;
			loading: boolean;
		};
	};
}

const initialState: DashboardState = {
	loading: false,
	success: false,
	failed: false,
	projects: 0,
	contacts: 0,
	score: 0,
	activities: undefined,
	latestArticles: undefined,
	topProjects: undefined,
	project: {
		model: false,
		self: {
			model: false,
			loading: false,
		},
		ideeza: {
			modal: false,
			loading: false,
		},
	},
};

export const getProjectsAsync = createAsyncThunk('dashboard/TopProjects', async (payload: any) => {
	const response = await getProjects(payload);
	return response.data;
});
export const getBlogsAsync = createAsyncThunk('dashboard/blog', async (params: any) => {
	const response = await getBlogs(params);
	return response.data;
});
export const getActivitiessAsync = createAsyncThunk('dashboard/LastActivities', async () => {
	const response = await getActivities();
	return response.data;
});

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		togglemodel: (state, { payload }) => {
			state.project.model = payload;
		},
		toggleMySelfModel: (state, { payload }) => {
			state.project.self.model = payload;
		},
		toggleIdezzaModal: (state) => {
			state.project.ideeza.modal = !state.project.ideeza.modal;
		},
		// toggleIdezzaModal: (state, { payload }) => {
		//   state.project.ideeza.modal = payload;
		// },
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getProjectsAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getProjectsAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(getProjectsAsync.fulfilled, (state, { payload }) => {
			state.topProjects = payload;
			state.loading = false;
			state.success = true;
		});
		builder.addCase(getBlogsAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getBlogsAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(getBlogsAsync.fulfilled, (state, { payload }) => {
			state.latestArticles = payload;
			state.loading = false;
			state.success = true;
		});
		builder.addCase(getActivitiessAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getActivitiessAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(getActivitiessAsync.fulfilled, (state, { payload }) => {
			state.activities = payload;
			state.loading = false;
			state.success = true;
		});
	},
});

export const { reset, togglemodel, toggleMySelfModel, toggleIdezzaModal } = dashboardSlice.actions;

export const selectTasks = (state: AppState) => state.code;

export default dashboardSlice.reducer;
