import { useFetch } from 'app/api';

export const getRoomList = async (search?: string) => {
	try {
		const res = await useFetch.get(`chat/room/room-list/${search ? `?search=${search}` : ''}`);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getChatFile = async () => {
	try {
		const res = await useFetch.get(`chat/file/`);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};
