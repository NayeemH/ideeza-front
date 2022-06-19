// import { IBlogPostList } from "@models/blog";
import { useFetch } from 'app/api';

export async function getNotification(params: any): Promise<{ data: IResposeData }> {
	let result: any = [];
	try {
		result = await useFetch.get(`notification/`, {
			params: params,
		});
	} catch (error) {
		console.error('error', error);
	}
	return result;
}

export async function readNotification(payload: any): Promise<{ data: IResposeData }> {
	let result: any = [];
	try {
		result = await useFetch.post(`notification/seen_notifications/`, payload);
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
