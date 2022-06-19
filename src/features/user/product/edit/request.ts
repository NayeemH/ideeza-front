import { useFetch } from '../../../../app/api';

export async function getProject(params: any): Promise<{ data: { id: any } }> {
	try {
		const result = await useFetch.get(`/project/${params.id}/`, {});
		return Promise.resolve(result);
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function saveProject(
	params: any
): Promise<{ data: { id: any; name: any; description: any } }> {
	try {
		const result = await useFetch.patch(`/project/`, {
			...params,
		});
		return Promise.resolve(result);
	} catch (error) {
		return Promise.reject(error);
	}
}
