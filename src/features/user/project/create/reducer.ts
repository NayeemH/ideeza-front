import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerProductToProject } from '@features/user/project/create/request';

export interface ProjectState {
	loading: boolean;
	success: boolean;
	failed: boolean;
	projectResponseData: any;
	productResponseData: any;
	data: {
		project: any;
		product: any;
	};
}

const initialState: ProjectState = {
	loading: false,
	success: false,
	failed: false,
	projectResponseData: null,
	productResponseData: null,
	data: {
		project: null,
		product: null,
	},
};

export const registerProductToProjectAsync = createAsyncThunk(
	'project/register-product',
	async (payload: any) => {
		try {
			const response = await registerProductToProject(payload);
			// The value we return becomes the `fulfilled` action payload
			return response.data;
		} catch (error) {
			return error;
		}
	}
);

export const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		reset: () => initialState,
	},
});

export const { reset } = projectSlice.actions;

export default projectSlice.reducer;
