import { IAddCodePartPayload, IAddCodePartResponse } from '@features/technician/code/request';
import { useFetch } from 'app/api';

export const getCodeBlocks = async (params: string) => {
	try {
		const res = await useFetch.get(`/code-blocks/${params}`);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
};

export async function createCodePart(
	payload: IAddCodePartPayload
): Promise<{ data: IAddCodePartResponse }> {
	try {
		const res = await useFetch.post(`part/code-part/`, payload);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function createComponent(payload: any): Promise<{ data: any }> {
	try {
		const res = await useFetch.post(`component/`, payload);
		return Promise.resolve(res);
	} catch (error) {
		return Promise.reject(error);
	}
}
// export async function createCodePart(
//   payload: IAddCodePartPayload
// ): Promise<{ data: IAddCodePartResponse }> {
//   let result: any = [];
//   try {
//     result = await useFetch.post(`part/code-part/`, payload);
//   } catch (error) {
//     console.error("error", error);
//   }
//   return result;
// }
