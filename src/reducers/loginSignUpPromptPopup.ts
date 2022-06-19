import { createSlice } from '@reduxjs/toolkit';

export interface LoginSignUpPromptPopupState {
	progressPopup: boolean;
	askingToLoginPopup: boolean;
	loginSignUpPopup: boolean;
}

const initialState: LoginSignUpPromptPopupState = {
	progressPopup: false,
	askingToLoginPopup: false,
	loginSignUpPopup: false,
};

export const loginSignUpPromptPopupSlice = createSlice({
	name: 'loginSignUpPromptPopup',
	initialState,
	reducers: {
		openProgressPopup: (state) => {
			state.progressPopup = true;
		},
		openLoginSignUpPopup: (state) => {
			state.loginSignUpPopup = true;
		},
		openAskingToLoginPopup: (state) => {
			state.askingToLoginPopup = true;
		},
		closeProgressPopup: (state) => {
			state.progressPopup = false;
		},
		closeAskingToLoginPopup: (state) => {
			state.askingToLoginPopup = false;
		},
		closeLoginSignUpPopup: (state) => {
			state.loginSignUpPopup = false;
		},
	},
});
export const {
	openProgressPopup,
	openAskingToLoginPopup,
	closeProgressPopup,
	closeAskingToLoginPopup,
	openLoginSignUpPopup,
	closeLoginSignUpPopup,
} = loginSignUpPromptPopupSlice.actions;
export default loginSignUpPromptPopupSlice.reducer;
