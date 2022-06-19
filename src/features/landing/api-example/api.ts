import { useFetch } from 'app/api';

export async function fetchCount(amount = 1): Promise<{ data: number }> {
	let result: any = [];

	try {
		result = await useFetch.get(`blog/${amount}`);
	} catch (error) {
		console.error('error', error);
	}

	return result;
}
