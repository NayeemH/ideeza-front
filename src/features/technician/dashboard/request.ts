import { useFetch } from 'app/api';
import { ITaskItem } from 'models/tasks';

export interface ITaskList {
	count?: number;
	next?: unknown;
	previous?: unknown;
	results?: ITaskItem[];
}
export async function fetchTask(): Promise<{ data: ITaskList }> {
	let result: any = [];

	try {
		result = await useFetch.get(`manufacturing/assigned-task/`);
	} catch (error) {
		console.error('error', error);
	}

	return result;
}
