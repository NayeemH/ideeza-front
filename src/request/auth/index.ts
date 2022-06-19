import { useFetch } from 'app/api';
import { setRefreshToCookies, setTokenToCookies } from 'utils/auth';

export const getUserData = async (id: number) => {
	try {
		const res = await useFetch.get(`account/user/${id}/`);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const updateUserData = async (id: number, payload: any) => {
	try {
		const res = await useFetch.patch(`account/user/${id}/`, payload);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const changePassword = async (id: number, payload: any) => {
	try {
		const res = await useFetch.put(`account/change-password/${id}/`, payload);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};

export async function loginAction(payload: any) {
	try {
		const res = await useFetch.post(`account/token/`, payload);
		if (res.status === 200) {
			setRefreshToCookies(res?.data?.refresh);
			setTokenToCookies(res?.data?.access);
			return Promise.resolve(res.data);
		} else {
			return Promise.resolve(res.data.statusText);
		}
	} catch (error) {
		return Promise.reject(error);
	}
}
