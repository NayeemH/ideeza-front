import { IUser } from '@models/auth';

export interface ISuccessStoryAPIData {
	count: 4;
	next?: string | null;
	previous?: string | null;
	results: ISuccessStory[];
}
export interface ISuccessStory {
	id: number;
	updated_at?: Date;
	created_at?: Date;
	is_visible: boolean;
	title: string;
	description?: string;
	cover_file?: string | null;
	user?: IUser;
}
