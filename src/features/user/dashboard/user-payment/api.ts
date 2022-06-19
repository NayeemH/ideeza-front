/* ---------------------------------------------------------
 *	Index of API Services
 * ---------------------------------------------------------
 * 1. Trial a Subscription
 * 2. Add to Cart of Premium Subscription
 * 3. Current Projects of a user cart
 * 4. Create Order
 * 5. Capture the payment
 * 6. Get Subcription Plan By Id
 * ----------------------------------------------------------
 */

import { ApiDataType, apiService } from 'utils/request';

/*
 * 1. Trial a Subscription
 * ------------------------------------
 */
export const trialASubscription = async (id: number, duration?: 'MONTHLY' | 'YEARLY') => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'post',
		url: `/subscription/pricing-plan/${id}/trial-subscription/`,
		data: {
			package: duration,
		},
	};

	await apiService(apiData, (res: any, err: any) => {
		if (res) result = res?.data;
		// console.log('Post by id Error----', err)
	});
	return result;
};

/*
 * 2. Add to Cart of Premium Subscription
 * --------------------------------------------
 */
export const addToCartSubscription = async (id: number) => {
	console.log('3. addToCartSubscription', id);

	let result: any = [];
	const apiData: ApiDataType = {
		method: 'post',
		url: `/subscription/pricing-plan/${id}/add_to_cart/`,
		data: {
			package: 'MONTHLY',
		},
		token: true,
	};

	await apiService(apiData, (res: any) => {
		if (res) {
			result = res?.data;
			console.log('4. addToCartSubscription success', id);
		}
		// console.log('error---', err)
	});
	return result;
};

/*
 * 3. Get Cart items / Current Project of user cart
 * --------------------------------------------
 */
export const getUserCartItems = async (page = 1, pageSize = 5) => {
	let result: any = null;
	const params: any = `?page=${page}&pageSize=${pageSize}`;
	const apiData: ApiDataType = {
		method: 'get',
		url: `/order/cart/${params}`,
		token: true,
	};

	await apiService(apiData, (res: any, err: any) => {
		if (res) result = res?.data;
		// console.log('Post by id Error----', err)
	});
	return result;
};

/*
 * 4. Create Paypal Order
 * --------------------------------------------
 */
export const createOrderPaypal = async () => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'post',
		url: `/payment/paypal/create-order/`,
		token: true,
	};

	await apiService(apiData, (res: any, err: any) => {
		if (res) result = res?.data;
		// console.log('Post by id Error----', err)
	});
	return result;
};

/*
 * 5. Capture a Paypal Order
 * --------------------------------------------
 */
export const captureOrderPaypal = async (orderID?: number, payerID?: number) => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'post',
		url: `/payment/paypal/capture-order/`,
		data: {
			orderID,
			payerID,
		},
		token: true,
	};

	await apiService(apiData, (res: any, err: any) => {
		if (res) result = res?.data;
		// console.log('Post by id Error----', err)
	});
	return result;
};

/*
 * 6. Get Subscription Plan By Id
 * --------------------------------------------
 */
export const getSubscriptionPlanById = async (id: number) => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'get',
		url: `/subscription/pricing-plan/${id}/`,
		token: true,
	};

	await apiService(apiData, (res: any, err: any) => {
		if (res) result = res?.data;
		// console.log('Post by id Error----', err)
	});
	return result;
};
