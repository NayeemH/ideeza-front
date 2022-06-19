import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProject, saveProject } from './request';

export interface ProjectState {
	loading: boolean;
	success: boolean;
	failed: boolean;
	projectData: any;
}

const initialState: ProjectState = {
	loading: false,
	success: false,
	failed: false,
	projectData: null,
};

export const getProjectAsync = createAsyncThunk('project/get-data', async (payload: any) => {
	try {
		const response = await getProject(payload);
		// The value we return becomes the `fulfilled` action payload
		return response.data;
	} catch (error) {
		return error;
	}
});

export const saveProjectAsync = createAsyncThunk('project/save', async (payload: any) => {
	try {
		const response = await saveProject(payload);
		// The value we return becomes the `fulfilled` action payload
		return response.data;
	} catch (error) {
		return error;
	}
});

export const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getProjectAsync.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(saveProjectAsync.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(getProjectAsync.rejected, (state) => {
			state.failed = true;
		});

		builder.addCase(saveProjectAsync.rejected, (state) => {
			state.failed = true;
		});

		builder.addCase(getProjectAsync.fulfilled, (state, { payload }) => {
			//state.data.project = payload;
			state.loading = false;
			state.success = true;
			state.projectData = payload;
		});

		builder.addCase(saveProjectAsync.fulfilled, (state, { payload }) => {
			//state.data.project = payload;
			state.loading = false;
			state.success = true;
		});
	},
});

export const { reset } = projectSlice.actions;

export default projectSlice.reducer;
