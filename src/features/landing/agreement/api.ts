import { ApiDataType, apiService } from 'utils/request';

/*
 * Get Agreement
 * ------------------------------------
 */
export const getAgreement = async (type: string) => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'get',
		url: `/core/authority-content/${type ? `?content_type=${type}` : ''}`,
	};

	await apiService(apiData, (res: any) => {
		if (res) result = res?.data?.results[0];
		// console.log('result---', result)
	});
	return result;
};
