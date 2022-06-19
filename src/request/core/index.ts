import { useFetch } from 'app/api';

export const getBlockCategory = async (params: string) => {
	try {
		const res = await useFetch.get(`/core/category-project/${params}`);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getBlockChildCategories = async (parent_cat_id: string) => {
	try {
		const res = await useFetch.get(`/core/category-project/${parent_cat_id}/children/`);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};
