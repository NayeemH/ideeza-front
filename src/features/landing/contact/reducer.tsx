import { IContactUs } from '@models/contact';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { AppState } from 'app/store';
import { sendContactUsEmail } from './api';

export interface contactEmailStateType {
	loading: boolean;
	success: boolean;
	failed: boolean;
}

const initialState: contactEmailStateType = {
	loading: false,
	success: false,
	failed: false,
};

export const postContactEmail = createAsyncThunk(
	'contactUs/postContactEmail',
	async (formData: IContactUs) => {
		return await sendContactUsEmail(formData);
	}
);

export const contactUsSlice = createSlice({
	name: 'contactUs',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(postContactEmail.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(postContactEmail.rejected, (state) => {
			state.loading = false;
			state.failed = true;
		});
		builder.addCase(postContactEmail.fulfilled, (state) => {
			state.loading = false;
			state.success = true;
		});
	},
});

export const { reset } = contactUsSlice.actions;

export default contactUsSlice.reducer;
