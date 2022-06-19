import { IRoom } from '@models/chat';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRoomList } from 'request/chat';

export interface IResponsData {
	count?: number;
	next?: null;
	previous?: null;
	results?: IRoom[];
}
export interface ChatState {
	room_list: IResponsData | null;
	loading: boolean;
}

export interface IGetRoomListType {
	search?: string;
}

const initialState: ChatState = {
	room_list: null,
	loading: false,
};

export const getRoomListAsync = createAsyncThunk(
	'chat/RoomList',
	async (payload?: IGetRoomListType) => {
		const response = await getRoomList(payload?.search);
		return response.data;
	}
);

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getRoomListAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getRoomListAsync.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(getRoomListAsync.fulfilled, (state, { payload }) => {
			state.room_list = payload;
			state.loading = false;
		});
	},
});
// export const { openchat, closechat } = chatSlice.actions;
export default chatSlice.reducer;
