import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { AppState } from 'app/store';
import { fetchTask, ITaskList } from './request';

export interface TaskState {
	taskList: ITaskList;
}

const initialState: TaskState = {
	taskList: {},
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getTaskAsync = createAsyncThunk('task/fetchTask', async () => {
	const response = await fetchTask();
	// The value we return becomes the `fulfilled` action payload
	return response.data;
});

export const taskSlice = createSlice({
	name: 'task',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getTaskAsync.fulfilled, (state, { payload }) => {
			state.taskList = payload;
		});
	},
});

// export const { increment } = taskSlice.actions;

// Get a value from the state
export const selectTasks = (state: AppState) => state.task.taskList;

export default taskSlice.reducer;
