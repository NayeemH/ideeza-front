import { useFetch } from 'app/api';
import { IUser } from '@models/auth';

export async function createCoverPart(
	payload: IAddCodePartPayload
): Promise<{ data: IAddCodePartResponse }> {
	let result: any = [];
	try {
		result = await useFetch.post(`part/cover-part/`, payload);
	} catch (error) {
		console.error('error', error);
		result = {
			is_error: true,
			error,
		};
	}
	return result;
}
export async function createCoverComponent(payload: any): Promise<{ data: any }> {
	let result: any = [];
	try {
		result = await useFetch.post(`component/`, payload);
	} catch (error) {
		console.error('error', error);
		result = {
			is_error: true,
			error,
		};
	}
	return result;
}

export interface IAddCodePartPayload {
	source_code?: string;
	image?: string;
	name?: string;
	color?: string;
	type?: string;
	input_pin?: string;
	input_variable_name?: string;
	input_variable_value?: string;
	previous_connector?: boolean;
	next_connector?: boolean;
	is_output?: boolean;
	input_inline?: boolean;
	statement?: boolean;
	append_dummy_input?: string;
	append_value_input_type?: boolean;
	append_value_input_name?: string;
	description?: string;
}

export type IAddCodePartResponse = IAddCodePartPayload & {
	user?: IUser;
};
