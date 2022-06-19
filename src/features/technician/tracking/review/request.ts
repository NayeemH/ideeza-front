import { IBlogPostList } from '@models/blog';
import { useFetch } from 'app/api';

export async function getTrackingReviews(params: any): Promise<{ data: IResposeData }> {
	let result: any = [];
	try {
		result = await useFetch.get(`tracking-reviews/`, {
			params: {
				...params,
				page_size: 10,
			},
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
	results: IBlogPostList[];
}
