import { IPricingPlan } from '@models/pricing-plan';
import { ApiDataType, apiService } from 'utils/request';

export const getPricingPlans = async () => {
	let result: IPricingPlan[] = [];
	const apiData: ApiDataType = {
		method: 'get',
		url: 'subscription/pricing-plan/',
	};
	await apiService(apiData, (res: any, err: any) => {
		if (res) {
			result = res?.data?.results || [];
			// console.log('PLANS____', res.data.results)
		}
		// console.log('err pricing plan----------', err)
	});
	return result;
};
