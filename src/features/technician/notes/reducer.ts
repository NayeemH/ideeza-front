import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { AppState } from 'app/store';
import { createNote, getNote, IResposeData } from './request';

export interface BlogState {
	loading: boolean;
	success: boolean;
	failed: boolean;
	noteList: IResposeData | undefined;
	data: any;
}

const initialState: BlogState = {
	loading: false,
	noteList: undefined,
	data: undefined,
	success: false,
	failed: false,
};

export const getNoteAsync = createAsyncThunk('note/getNote', async (payload: any) => {
	const response = await getNote(payload);
	// The value we return becomes the `fulfilled` action payload
	return response.data;
});
export const createNoteAsync = createAsyncThunk('note/postNote', async (payload: any) => {
	const response = await createNote(payload);
	// The value we return becomes the `fulfilled` action payload
	return response.data;
});

export const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		reset: (state) => {
			state.success = false;
			state.failed = false;
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getNoteAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getNoteAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(createNoteAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createNoteAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(getNoteAsync.fulfilled, (state, { payload }) => {
			state.noteList = payload;
			state.loading = false;
			state.success = true;
		});
		builder.addCase(createNoteAsync.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.loading = false;
			state.success = true;
		});
	},
});

export const { reset } = noteSlice.actions;

export const selectTasks = (state: AppState) => state.code;

export default noteSlice.reducer;
