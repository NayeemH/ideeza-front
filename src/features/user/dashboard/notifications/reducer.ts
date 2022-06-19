import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { AppState } from 'app/store';
import { getNotification, readNotification } from './request';

export interface NotificationState {
	loading: boolean;
	success: boolean;
	failed: boolean;
	data: any | undefined;
	totalNotifications: number;
}

const initialState: NotificationState = {
	loading: false,
	data: undefined,
	success: false,
	failed: false,
	totalNotifications: 0,
};

export const getNotificationAsync = createAsyncThunk('notification', async (payload: any) => {
	const response = await getNotification(payload);
	// The value we return becomes the `fulfilled` action payload
	return response.data;
});
export const readNotificationAsync = createAsyncThunk('read/notification', async (payload: any) => {
	const response = await readNotification(payload);
	console.log('response', payload);

	// The value we return becomes the `fulfilled` action payload
	return response.data;
});

export const notificationSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		reset: (state) => {
			state.success = false;
			state.failed = false;
			state.loading = false;
		},

		setTotalNotifications: (state, action) => {
			state.totalNotifications = action?.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getNotificationAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getNotificationAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(getNotificationAsync.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.loading = false;
			state.success = true;
		});
		builder.addCase(readNotificationAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(readNotificationAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(readNotificationAsync.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.loading = false;
			state.success = true;
		});
	},
});

export const { reset, setTotalNotifications } = notificationSlice.actions;

export const selectTasks = (state: AppState) => state.notification;

export default notificationSlice.reducer;
