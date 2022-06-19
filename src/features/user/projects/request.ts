// import { IBlogPostList } from "@models/blog";
import { useFetch } from 'app/api';

export async function getProjects(params: any): Promise<{ data: any }> {
	try {
		const result = await useFetch.get(`project/my-project/`, {
			params,
		});
		return Promise.resolve(result);
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function getProjectDetail(params: any): Promise<{ data: any }> {
	let result: any = [];
	try {
		result = await useFetch.get(`project/${params.id}/`);
	} catch (error) {
		console.error('error', error);
	}
	return result;
}

export async function getProductDetail(params: any): Promise<{ data: any }> {
	let result: any = [];
	try {
		result = await useFetch.get(`product/${params.id}/`);
	} catch (error) {
		console.error('error', error);
	}
	return result;
}

export async function updateProjectLike(params: any): Promise<{ data: any }> {
	let result: any = [];
	try {
		result = await useFetch.post(`project/${params.id}/like/`);
	} catch (error) {
		console.error('error', error);
	}
	return result;
}

export async function updateProductLike(params: any): Promise<{ data: any }> {
	let result: any = [];
	try {
		result = await useFetch.post(`product/${params.id}/like/`);
	} catch (error) {
		console.error('error', error);
	}
	return result;
}

export async function updateProjectCommentLike(params: any): Promise<{ data: any }> {
	let result: any = [];
	try {
		result = await useFetch.post(`/project/comment/${params.id}/like/`);
	} catch (error) {
		console.error('error', error);
	}
	return result;
}

export async function addProductComment(params: any): Promise<{ data: any }> {
	let result: any = [];
	try {
		result = await useFetch.post(`/product/comment/add-comment/`, {
			...params,
		});
	} catch (error) {
		console.error('error', error);
	}
	return result;
}

export interface IResposeData {
	count: number;
	next: unknown;
	previous: unknown;
	results: any[];
}
