import { useFetch } from 'app/api';

export const getNotes = async () => {
	try {
		const res = await useFetch.get(`/note/`);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};
