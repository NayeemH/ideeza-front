import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AppState } from 'app/store';
// import { id } from "date-fns/locale";
import { IUserData } from 'models/auth';
import { changePassword, getUserData, updateUserData } from 'request/auth';

export interface AuthState {
	userData: IUserData | undefined;
	loading: boolean;
	responseData: any;
}

const initialState: AuthState = {
	userData: undefined,
	loading: false,
	responseData: undefined,
};

export const setDataAsync = createAsyncThunk('auth/getAuthData', async (id: number) => {
	const response = await getUserData(id);
	return response.data;
});

export const updateUserDataAsync = createAsyncThunk(
	'auth/updateUserData',
	async ({ id, payload }: { id: number; payload: any }) => {
		const response = await updateUserData(id, payload);
		return response.data;
	}
);
export const changePasswordAsync = createAsyncThunk(
	'auth/ChangePassword',
	async ({ id, payload }: { id: number; payload: any }) => {
		const response = await changePassword(id, payload);
		return response.data;
	}
);

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setData: (state, action) => {
			state.userData = action.payload;
		},
		setLogout: (state) => {
			state.userData = undefined;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(setDataAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(setDataAsync.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(setDataAsync.fulfilled, (state, { payload }) => {
			state.userData = payload;
			state.loading = false;
		});
		builder.addCase(updateUserDataAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updateUserDataAsync.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(updateUserDataAsync.fulfilled, (state, { payload }) => {
			state.responseData = payload;
			state.loading = false;
		});
		builder.addCase(changePasswordAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(changePasswordAsync.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(changePasswordAsync.fulfilled, (state, { payload }) => {
			state.responseData = payload;
			state.loading = false;
		});
	},
});

export const { setData, setLogout } = authSlice.actions;

// Get a value from the state
export const selectCount = (state: AppState) => state.auth.userData;

export default authSlice.reducer;
