import { IBlogPostList } from '@models/blog';
import { useFetch } from 'app/api';

export async function getBlogs(params: any): Promise<{ data: IResposeData }> {
	let result: any = [];
	try {
		result = await useFetch.get(`blog/`, {
			params: params,
		});
	} catch (error) {
		console.error('error', error);
	}
	return result;
}

export async function createBlogPost(payload: any): Promise<{ payload: any }> {
	let result: any = [];
	try {
		result = await useFetch.post(`blog/`, payload);
	} catch (error) {
		console.error('error', error);
	}
	return result;
}

export interface IResposeData {
	count: number;
	next: unknown;
	previous: unknown;
	results: IBlogPostList[];
}
