import { INewsFeed } from '@models/news-feed';
import { useFetch } from 'app/api';

export async function getNewsFeed(params: any): Promise<{ data: INewsFeed[] }> {
	try {
		const result = await useFetch.get(`project/news-feed/`, {
			params: params,
		});
		return Promise.resolve(result);
	} catch (error) {
		return Promise.reject(error);
	}
}
