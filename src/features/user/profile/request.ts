import { IBlogPostList } from '@models/blog';
import { IProjects } from '@models/projects';
import { IUserActivities, IUserFriends } from '@models/user-profile';
import { useFetch } from 'app/api';

export async function getBlogs(params: any): Promise<{ data: IBlogResponseData }> {
	try {
		const result = await useFetch.get(`blog/`, {
			params: params,
		});
		return Promise.resolve(result);
	} catch (error) {
		return Promise.reject(error);
	}
}
export async function getActivities(): Promise<{ data: IUserActivities[] }> {
	try {
		const result = await useFetch.get(`account/user/recent-activities/`);
		return Promise.resolve(result);
	} catch (error) {
		return Promise.reject(error);
	}
}
export async function getFriends(): Promise<{ data: IFriendsResponseData }> {
	try {
		const result = await useFetch.get(`account/friend/my-friends/`);
		return Promise.resolve(result);
	} catch (error) {
		return Promise.reject(error);
	}
}
export async function getUserSkills(): Promise<{ data: any }> {
	try {
		const result = await useFetch.get(`account/user-skill/`);
		return Promise.resolve(result);
	} catch (error) {
		return Promise.reject(error);
	}
}
export async function getUserProjects(): Promise<{ data: IProjects }> {
	try {
		const result = await useFetch.get(`/project/my-project/`);
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

export type IFriendsResponseData = IResponseData & {
	results: IUserFriends[];
};
