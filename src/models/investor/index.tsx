import { IUser } from '@models/auth';

export interface IInvestoryCategory {
	id?: number;
	updated_at?: Date;
	created_at?: Date;
	name?: string;
	description?: string;
	image?: string;
}

export interface IInvestorNewsSingle {
	id?: number;
	category?: IInvestoryCategory;
	user?: IUser;
	file_attachments?: any;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	title?: string;
	description?: string;
	cover_file?: string;
	views?: number;
	min_read?: number;
}
