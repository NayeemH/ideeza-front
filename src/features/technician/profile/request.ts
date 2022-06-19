import { ApiDataType, apiService } from 'utils/request';

export const getTechnicianProject = async (
	id?: number,
	page?: number,
	perPage?: number
): Promise<any> => {
	let result: any = null;
	const userId = id ? `?user__id=${id}` : '';
	const pageNum = page ? `?page=${page}` : '';
	const pageSize = perPage ? `?page_size=${perPage}` : '';
	const params: string = `${userId}${pageNum}${pageSize}`;

	const apiData: ApiDataType = {
		method: 'get',
		url: `/project/${params}`,
		token: true,
	};

	await apiService(apiData, (res: any) => {
		if (res) result = res?.data;
	});
	return result;
};
