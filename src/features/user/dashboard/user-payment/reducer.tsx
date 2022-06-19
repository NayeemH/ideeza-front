import { IAsyncStates } from '@models/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCartSubscription, getUserCartItems } from './api';

const initActionState: IAsyncStates = {
	loading: false,
	success: false,
	failed: false,
};

const initialState: any = {
	planCartMeta: null,
	planCartItems: [],
	planCartGetState: initActionState,
	planCartAddState: initActionState,
	count: 0,
	activePlanId: null,
	activePlanDuration: null,
};

export const addToCartSubscriptionAsync = createAsyncThunk(
	'planPayment/addToCart',
	async (payload: any) => {
		console.log('2. addToCartSubscription', payload);
		return await addToCartSubscription(payload);
	}
);

export const getUserCartItemsAsync = createAsyncThunk('planPayment/cartList', async () => {
	return await getUserCartItems();
});

export const planPaymentSlice = createSlice({
	name: 'planPayment',
	initialState: initialState,
	reducers: {
		setPlanCartMeta: (state, action) => {
			state.planCartMeta = action.payload;
		},
		setPlanCartItems: (state, action) => {
			state.planCartItems = action.payload;
		},
		setActivePlanId: (state, action) => {
			state.activePlanId = action.payload;
		},
		setActivePlanDuration: (state, action) => {
			state.activePlanDuration = action.payload;
		},
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		// 1. Add Plan Cart Items ----------------------------------
		// builder.addCase(addToCartSubscriptionAsync.pending, state => {
		//     state.planCartAddState.loading = true
		//     state.planCartAddState.success = false
		//     state.planCartAddState.failed = false
		// });
		// builder.addCase(addToCartSubscriptionAsync.rejected, state => {
		//     state.planCartAddState.loading = false
		//     state.planCartAddState.success = false
		//     state.planCartAddState.failed = true
		// });
		// builder.addCase(addToCartSubscriptionAsync.fulfilled, (state, action) => {
		//     const newItems = action.payload?.results
		//     state.planCartItems = [...state.planCartItems, ...newItems]
		//     state.planCartAddState.loading = false
		//     state.planCartAddState.success = true
		//     state.planCartAddState.failed = false
		// });
		// 2. Get Plan Cart Items ----------------------------------
		// builder.addCase(getUserCartItemsAsync.pending, state => {
		//     state.planCartGetState.loading = true
		//     state.planCartGetState.success = false
		//     state.planCartGetState.failed = false
		// });
		// builder.addCase(getUserCartItemsAsync.rejected, state => {
		//     state.planCartGetState.loading = false
		//     state.planCartGetState.success = false
		//     state.planCartGetState.failed = true
		// });
		// builder.addCase(getUserCartItemsAsync.fulfilled, (state, action) => {
		//     const newItems = action.payload
		//     state.planCartItems = newItems
		//     state.planCartGetState.loading = false
		//     state.planCartGetState.success = true
		//     state.planCartGetState.failed = false
		// });
	},
});

export const { setPlanCartMeta, setPlanCartItems, setActivePlanId, setActivePlanDuration, reset } =
	planPaymentSlice.actions;

export default planPaymentSlice.reducer;
