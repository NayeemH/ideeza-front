import { useFetch } from 'app/api';

export const getElectronicsPart = async (params: string) => {
	try {
		const res = await useFetch.get(`/part/electronic-part/${params}`);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};
export const createElectronicsPart = async (reqbody: any) => {
	try {
		const res = await useFetch.post(`/part/electronic-part/`, reqbody);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};
export const addElectronicsPartCode = async ({ reqBody, id }: { reqBody: any; id: number }) => {
	try {
		console.log('ID', id);
		const res = await useFetch.post(`/part/electronic-part/${id}/add-code/`, reqBody);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};
export const getBlocks = async (params: string) => {
	try {
		const res = await useFetch.get(`/electronic-blocks/${params}`);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};
export const getICFamily = async (params: string) => {
	try {
		const res = await useFetch.get(`/ic-package/family/${params}`);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};
export const getICPackage = async (params: string) => {
	try {
		const res = await useFetch.get(`/ic-package/${params}`);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};
export const createICPackage = async (reqBody: any) => {
	try {
		const res = await useFetch.post(`/ic-package/`, reqBody);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};
export const getICPackageDetails = async (id: number) => {
	try {
		const res = await useFetch.get(`/ic-package/${id}/`);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};
