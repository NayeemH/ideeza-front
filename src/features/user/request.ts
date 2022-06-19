// import { IBlogPostList } from "@models/blog";
import { IBlogPostList } from '@models/blog';
import { IProject } from '@models/projects';
import { IUserActivities } from '@models/user-profile';
import { useFetch } from 'app/api';
import { apiService } from 'utils/request';

export async function getProjects(params: any): Promise<{ data: IProjectsResponseData }> {
	let result: any = [];
	await apiService(
		{
			method: 'get',
			url: `project/${params ? `?${params}` : ''}`,
		},
		(res: any, err: any) => {
			if (res) {
				result = res;
			}
			if (err) console.error('get Projects error----', err);
		}
	);
	return result;
}

export async function getBlogs(params: any): Promise<{ data: IBlogResponseData }> {
	let result: any = [];
	await apiService(
		{
			method: 'get',
			url: `blog/${params ? `?${params}` : ''}`,
		},
		(res: any, err: any) => {
			if (res) {
				result = res;
			}
			if (err) console.error('get Blog error----', err);
		}
	);
	return result;
}
export async function getActivities(): Promise<{ data: IUserActivities[] }> {
	try {
		const result = await useFetch.get(`account/user/recent-activities/`);
		return Promise.resolve(result);
	} catch (error) {
		return Promise.reject(error);
	}
}
export interface IResponseData {
	count: number;
	next: unknown;
	previous: unknown;
}

export type IBlogResponseData = IResponseData & {
	results: IBlogPostList[];
};
export type IProjectsResponseData = IResponseData & {
	results: IProject[];
};
