import { createSlice } from '@reduxjs/toolkit';

export interface LoginPopupState {
	loginPopup: boolean;
	loginRef: string;
}

const initialState: LoginPopupState = {
	loginPopup: false,
	loginRef: '',
};

export const loginPopUpSlice = createSlice({
	name: 'loginPopup',
	initialState,
	reducers: {
		openLoginPopup: (state, action) => {
			state.loginPopup = true;

			if (action.payload && action.payload.ref) {
				state.loginRef = action.payload.ref;
			}
		},
		updateLoginRef: (state, action) => {
			state.loginRef = action.payload;
		},
		closeLoginPopup: (state) => {
			state.loginPopup = false;
			state.loginRef = '';
		},
	},
});
export const { openLoginPopup, updateLoginRef, closeLoginPopup } = loginPopUpSlice.actions;
export default loginPopUpSlice.reducer;
