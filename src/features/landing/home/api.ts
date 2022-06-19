// import { IProjectsResponseData } from "@features/user/request";
import { IProjects } from '@models/projects';
import { useFetch } from 'app/api';
import { ApiDataType, apiService } from 'utils/request';

export async function fetchCount(id = 1): Promise<{ data: number }> {
	let result: any = [];

	try {
		result = await useFetch.get(`blog/${id}`);
	} catch (error) {
		console.error('error', error);
	}

	return result;
}

/*
 * Get projects
 * ------------------------------------
 */
export const getProjectList = async (params?: any) => {
	let result: IProjects[] = [];
	const apiData: ApiDataType = {
		method: 'get',
		url: `project/${params}`,
	};

	await apiService(apiData, (res: any) => {
		if (res) result = res?.data?.results || [];
		// console.log('error---', err)
	});
	return result;
};

/*
 * Get product
 * ------------------------------------
 */
export const getProductList = async (params?: any) => {
	let result: any[] = [];
	const apiData: ApiDataType = {
		method: 'get',
		url: `product/${params}`,
	};

	await apiService(apiData, (res: any) => {
		if (res) result = res?.data?.results || [];
		// console.log('error---', err)
	});
	return result;
};

/*
 * Get Projects
 * ------------------------------------
 */
export const getProjects = async (params?: any) => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'get',
		url: `project/${params}`,
	};

	await apiService(apiData, (res: any) => {
		if (res) result = res?.data || null;
		// console.log('error---', err)
	});
	return result;
};

/*
 * Get Products
 * ------------------------------------
 */
export const getProducts = async (params?: any) => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'get',
		url: `product/${params}`,
	};

	await apiService(apiData, (res: any) => {
		if (res) result = res?.data || null;
		// console.log('error---', err)
	});
	return result;
};
