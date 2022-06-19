import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { AppState } from 'app/store';
import { getTrackingReviews, IResposeData } from './request';

export interface ProductionState {
	loading: boolean;
	success: boolean;
	failed: boolean;
	data: IResposeData | undefined;
}

const initialState: ProductionState = {
	loading: false,
	data: undefined,
	success: false,
	failed: false,
};

export const getTrackingReviewsAsync = createAsyncThunk(
	'production/postCodePart',
	async (payload: any) => {
		const response = await getTrackingReviews(payload);
		return response.data;
	}
);

export const productionSlice = createSlice({
	name: 'production',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getTrackingReviewsAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getTrackingReviewsAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(getTrackingReviewsAsync.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.loading = false;
			state.success = true;
		});
	},
});

export const { reset } = productionSlice.actions;

export const selectTasks = (state: AppState) => state.code;

export default productionSlice.reducer;
