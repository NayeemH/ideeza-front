import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductDetail, getProjectDetail, getProjects } from './request';

export interface ProjectsState {
	loading: boolean;
	loaded: boolean;
	success: boolean;
	failed: boolean;
	myProjects: {
		public: any[];
		private: any[];
		contributed: any[];
	};
	project: {
		detail: any;
	};
	product: {
		detail: any;
	};
}

export interface ProjectsState {
	loading: boolean;
	success: boolean;
	failed: boolean;
	myProjects: {
		public: any[];
		private: any[];
		contributed: any[];
	};
}

const initialState: ProjectsState = {
	loading: false,
	loaded: false,
	myProjects: {
		public: [],
		private: [],
		contributed: [],
	},
	project: {
		detail: null,
	},
	product: {
		detail: null,
	},
	success: false,
	failed: false,
};

export const getProjectsAsync = createAsyncThunk('my-projects', async (payload: any) => {
	const response: any = await getProjects(payload);
	// The value we return becomes the `fulfilled` action payload
	return response.data;
});

export const getProjectDetailAsync = createAsyncThunk('my-project-detail', async (payload: any) => {
	const response: any = await getProjectDetail(payload);
	// The value we return becomes the `fulfilled` action payload
	return response.data;
});

export const getProductDetailAsync = createAsyncThunk(
	'my-project-product-detail',
	async (payload: any) => {
		const response: any = await getProductDetail(payload);
		// The value we return becomes the `fulfilled` action payload
		return response.data;
	}
);

export const projectSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getProjectsAsync.pending, (state) => {
			state.loading = true;
			state.loaded = false;
		});

		builder.addCase(getProjectDetailAsync.pending, (state) => {
			state.loading = true;
			state.loaded = false;
		});

		builder.addCase(getProductDetailAsync.pending, (state) => {
			state.loading = true;
			state.loaded = false;
		});

		builder.addCase(getProjectsAsync.rejected, (state) => {
			state.failed = true;
			state.loading = false;
			state.loaded = true;
		});

		builder.addCase(getProjectDetailAsync.rejected, (state) => {
			state.failed = true;
			state.loading = false;
			state.loaded = true;
		});

		builder.addCase(getProductDetailAsync.rejected, (state) => {
			state.failed = true;
			state.loading = false;
			state.loaded = true;
		});

		builder.addCase(getProjectsAsync.fulfilled, (state, { payload }) => {
			state.myProjects = payload;
			state.loading = false;
			state.loaded = true;
			state.success = true;
		});

		builder.addCase(getProjectDetailAsync.fulfilled, (state, { payload }) => {
			state.project.detail = payload;
			state.loading = false;
			state.loaded = true;
		});

		builder.addCase(getProductDetailAsync.fulfilled, (state, { payload }) => {
			state.product.detail = payload;
			state.loading = false;
			state.loaded = true;
		});
	},
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;
