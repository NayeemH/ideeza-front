import { INote } from '@models/notes';
import { useFetch } from 'app/api';

export async function getNote(params: any): Promise<{ data: IResposeData }> {
	let result: any = [];
	try {
		result = await useFetch.get(`note/`, {
			params: params,
		});
	} catch (error) {
		console.error('error', error);
	}
	return result;
}
export async function createNote(payload: any): Promise<{ data: IResposeData }> {
	let result: any = [];
	try {
		result = await useFetch.post(`note/`, payload);
	} catch (error) {
		console.error('error', error);
	}
	return result;
}

export interface IResposeData {
	count: number;
	next: unknown;
	previous: unknown;
	results: INote[];
}
