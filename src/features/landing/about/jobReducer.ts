import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getJobs, JobPositionType } from './api';

export interface JobsStateType {
	loading: boolean;
	success: boolean;
	failed: boolean;
	data: []; //IResposeData | undefined
	selectedJobPosition: JobPositionType | undefined;
}

const initialState: JobsStateType = {
	loading: false,
	success: false,
	failed: false,
	data: [],
	selectedJobPosition: undefined,
};

export const getJobsAsync = createAsyncThunk('getJobs', async (payload?: JobPositionType) => {
	return await getJobs(payload);
});

export const jobSlice = createSlice({
	name: 'jobs',
	initialState: initialState,
	reducers: {
		setJobs: (state, action) => {
			return {
				...state,
				data: action.payload,
			};
		},
		setSelectedJobPosition: (state, action) => {
			return {
				...state,
				selectedJobPosition: action.payload,
			};
		},
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getJobsAsync.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});
		builder.addCase(getJobsAsync.rejected, (state) => {
			return {
				...state,
				loading: false,
				failed: true,
			};
		});
		builder.addCase(getJobsAsync.fulfilled, (state, action) => {
			return {
				...state,
				data: action.payload,
				success: true,
				loading: false,
				failed: false,
			};
		});
	},
});

export const { setJobs, setSelectedJobPosition, reset } = jobSlice.actions;

export default jobSlice.reducer;
