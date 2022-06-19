import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTeam, TeamRoleType } from './api';

export interface TeamStateType {
	loading: boolean;
	success: boolean;
	failed: boolean;
	data: []; //IResposeData | undefined
}

const initialState: TeamStateType = {
	loading: false,
	success: false,
	failed: false,
	data: [],
};

export const getTeamAsync = createAsyncThunk('getTeam', async (payload?: TeamRoleType) => {
	return await getTeam(payload);
});

export const teamSlice = createSlice({
	name: 'team',
	initialState: initialState,
	reducers: {
		setTeam: (state, action) => {
			return {
				...state,
				data: action.payload,
			};
			// state.data = action.payload
		},
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getTeamAsync.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});
		builder.addCase(getTeamAsync.rejected, (state) => {
			return {
				...state,
				loading: false,
				failed: true,
			};
		});
		builder.addCase(getTeamAsync.fulfilled, (state, action) => {
			return {
				...state,
				data: action.payload,
				success: true,
				loading: false,
				failed: false,
			};
		});
	},
});

export const { setTeam, reset } = teamSlice.actions;

export default teamSlice.reducer;
