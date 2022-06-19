import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { AppState } from 'app/store';
import {
	createCodePart,
	createComponent,
	IAddCodePartPayload,
	IAddCodePartResponse,
} from './request';

export interface CodeState {
	loading: boolean;
	addPartFormSuccess: boolean;
	addComponentFormsuccess: boolean;
	failed: boolean;
	data: IAddCodePartResponse | null;
	blocklyConfig: any;
}

const initialState: CodeState = {
	loading: false,
	data: null,
	addPartFormSuccess: false,
	addComponentFormsuccess: false,
	failed: false,
	blocklyConfig: undefined,
};

export const createCodePartAsync = createAsyncThunk(
	'code/postCodePart',
	async (payload: IAddCodePartPayload) => {
		const response = await createCodePart(payload);
		return response.data;
	}
);
export const createComponentAsync = createAsyncThunk('code/postComponent', async (payload: any) => {
	const response = await createComponent(payload);
	return response.data;
});

export const codeSlice = createSlice({
	name: 'code',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		reset: (state) => {
			state.addComponentFormsuccess = false;
			state.addPartFormSuccess = false;
			state.failed = false;
			state.loading = false;
			state.data = null;
			state.blocklyConfig = null;
		},
		blocklyConfigReducer: (state, { payload }) => {
			state.blocklyConfig = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createCodePartAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createCodePartAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(createCodePartAsync.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.loading = false;
			state.addPartFormSuccess = true;
		});
		builder.addCase(createComponentAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createComponentAsync.rejected, (state) => {
			state.failed = true;
		});
		builder.addCase(createComponentAsync.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.loading = false;
			state.addComponentFormsuccess = true;
		});
	},
});

export const { reset, blocklyConfigReducer } = codeSlice.actions;

// Get a value from the state
export const selectTasks = (state: AppState) => state.code;

export default codeSlice.reducer;
