import { IUser } from '@models/auth';

export interface INewsFeed {
	id?: number;
	user?: IUser;
	project?: Project;
	updated_at?: Date;
	created_at?: Date;
	text?: string;
}

export interface Project {
	id?: number;
	user?: IUser;
	products?: any[];
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	description?: string;
	image?: null;
	views?: number;
	likes?: number;
	dislikes?: number;
}
