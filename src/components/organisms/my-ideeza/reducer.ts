import { createSlice } from '@reduxjs/toolkit';

// import type { AppState } from 'app/store'

export interface MyIdeezaState {
	open: boolean;
	memo: boolean;
}

const initialState: MyIdeezaState = {
	open: false,
	memo: false,
};

export const myIdeezaSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {
		toggleMyIdeeza: (state) => {
			state.open = !state.open;
		},
		setMemo: (state) => {
			state.memo = !state.memo;
		},
	},
});

//export const selectMyIdeeza = (state: AppState) => state.myIdeeza;

export const { toggleMyIdeeza, setMemo } = myIdeezaSlice.actions;

export default myIdeezaSlice.reducer;
