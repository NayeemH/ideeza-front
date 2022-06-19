import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from 'app/store';
import { getTechnicianProject } from './request';

const initialState: any = {
	article: null,
	loading: false,
	success: false,
	failedMessage: '',
};

export const getTechnicianProjectAsync = createAsyncThunk(
	'technician/projectlist',
	async (payload: number) => await getTechnicianProject(payload)
);
export const TechnicianProjectSlice = createSlice({
	name: 'technician-project',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getTechnicianProjectAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getTechnicianProjectAsync.rejected, (state, { error }) => {
			state.loading = false;
			state.failed = true;
			state.failedMessage = error.message;
		});
		builder.addCase(getTechnicianProjectAsync.fulfilled, (state, { payload }) => {
			state.article = payload;
			state.loading = false;
			state.success = true;
			state.failedMessage = '';
		});
	},
});
export const { reset } = TechnicianProjectSlice.actions;

export const selectTasks = (state: AppState) => state.code;

export default TechnicianProjectSlice.reducer;
