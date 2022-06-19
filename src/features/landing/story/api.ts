import { ApiDataType, apiService } from 'utils/request';

export const getSuccessStories = async (page: number = 1, perPage: number = 3) => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'get',
		url: `core/success-story/${page ? `?page=${page}` : ''}${
			perPage ? `&page_size=${perPage}` : ''
		}`,
	};

	await apiService(apiData, (res: any, err: any) => {
		if (res) {
			// console.log('res----', res)
			result = res?.data;
		}
		// console.log('error---', err)
	});

	return result;
};
