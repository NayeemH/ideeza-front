import { useFetch } from 'app/api';

export const getCoverBlocks = async (params: string) => {
	try {
		const res = await useFetch.get(`/cover-blocks/${params}`);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};
