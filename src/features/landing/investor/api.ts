import { ApiDataType, apiService } from 'utils/request';

/*
 * Get Investor Categories
 * ------------------------------------
 */
export const getInvestorCategories = async (params?: string) => {
	let result: any = [];
	const apiData: ApiDataType = {
		method: 'get',
		url: `/investor/category/${params}`,
	};

	await apiService(apiData, (res: any) => {
		if (res) result = res?.data?.results || [];
		// console.log('error---', err)
	});
	return result;
};

/*
 * Get Investor News
 * ------------------------------------
 */
export const getInvestorNews = async (params?: string) => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'get',
		url: `/investor/news/${params}`,
	};

	await apiService(apiData, (res: any) => {
		if (res) result = res?.data;
		// console.log('error---', err)
	});
	return result;
};

/*
 * Get Investor Traction
 * ------------------------------------
 */
export const getInvestorTraction = async () => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'get',
		url: `/investor/traction/traction/`,
	};

	await apiService(apiData, (res: any) => {
		if (res) result = res?.data;
		// console.log('error---', err)
	});
	return result;
};
