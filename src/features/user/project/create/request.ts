import { useFetch } from '../../../../app/api';

export async function registerProductToProject(params: any): Promise<{ data: {} }> {
	try {
		const result = await useFetch.patch(`/project/${params.id}/`, {
			...params,
		});
		return Promise.resolve(result);
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function createComponent(params: any): Promise<{ data: { id: any } }> {
	try {
		const result = await useFetch.post(`/component/`, {
			...params,
		});
		return Promise.resolve(result);
	} catch (error) {
		return Promise.reject(error);
	}
}
