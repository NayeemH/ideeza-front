import { createSlice } from '@reduxjs/toolkit';

export interface signupPopupState {
	signupPopup: boolean;
	signupOptions: boolean;
	openSignUpPopupManufacturer: boolean;
	openSignUpPopupManufacturerOptions: boolean;
	openSignUpPopupFreelancer: boolean;
	openSignUpPopupFreelancerOptions: boolean;
}

const initialState: signupPopupState = {
	signupPopup: false,
	signupOptions: false,
	openSignUpPopupManufacturer: false,
	openSignUpPopupManufacturerOptions: false,
	openSignUpPopupFreelancer: false,
	openSignUpPopupFreelancerOptions: false,
};

export const signupPopUpSlice = createSlice({
	name: 'signupPopup',
	initialState,
	reducers: {
		openSignUpPopup: (state) => {
			state.signupPopup = true;
			state.signupOptions = false;
		},
		openSignUpPopupManufacturer: (state) => {
			state.openSignUpPopupManufacturer = true;
			state.openSignUpPopupManufacturerOptions = false;
		},
		closeSignUpPopupManufacturer: (state) => {
			state.openSignUpPopupManufacturer = false;
		},
		openSignUpPopupFreelancer: (state) => {
			state.openSignUpPopupFreelancer = true;
			state.openSignUpPopupFreelancerOptions = false;
		},
		closeSignUpPopupFreelancer: (state) => {
			state.openSignUpPopupFreelancer = false;
		},
		closeSignUpPopup: (state) => {
			state.signupPopup = false;
		},
		openSignUpOptions: (state) => {
			state.signupOptions = true;
		},
		closeSignUpOptions: (state) => {
			state.signupOptions = false;
		},
	},
});
export const {
	openSignUpPopup,
	closeSignUpPopup,
	openSignUpOptions,
	closeSignUpOptions,
	openSignUpPopupFreelancer,
	openSignUpPopupManufacturer,
	closeSignUpPopupManufacturer,
	closeSignUpPopupFreelancer,
} = signupPopUpSlice.actions;
export default signupPopUpSlice.reducer;
