import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { AppState } from 'app/store';
import { createCoverComponent, IAddCodePartResponse } from './request';

export interface CoverState {
	loading: boolean;
	success: boolean;
	failed: boolean;
	data: IAddCodePartResponse | undefined;
}

const initialState: CoverState = {
	loading: false,
	data: undefined,
	success: false,
	failed: false,
};

export const createCoverComponentAsync = createAsyncThunk(
	'cover/postComponent',
	async (payload: any) => {
		const response = await createCoverComponent(payload);
		return response.data;
	}
);
export const coverSlice = createSlice({
	name: 'cover',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(createCoverComponentAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createCoverComponentAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(createCoverComponentAsync.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.loading = false;
			state.success = true;
		});
	},
});

export const { reset } = coverSlice.actions;

// Get a value from the state
export const selectTasks = (state: AppState) => state.code;

export default coverSlice.reducer;
