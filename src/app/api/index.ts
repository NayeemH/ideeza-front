// Anything exported from this file is importable by other in-browser modules.
import axios from 'axios';
import { getSession } from 'next-auth/react';

const useFetch = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
useFetch.interceptors.request.use(
	async function (config) {
		config.headers = {
			...config.headers,
		};
		const session = await getSession();
		if (session?.user?.access) {
			config.headers.Authorization = `Bearer ${session?.user?.access}`;
		}
		return config;
	},
	function (error) {
		console.error('response in interceptor line number 27', JSON.stringify(error));
		return Promise.reject(error);
	}
);

export { useFetch };
