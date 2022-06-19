import { useFetch } from 'app/api';

export const getBlogPost = async (param: string) => {
	try {
		const res = await useFetch.get(`blog/?${param}`);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};
