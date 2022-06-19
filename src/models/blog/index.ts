import { IUser } from '@models/auth';

export interface IBlogPostList {
	id?: number;
	user?: IUser;
	tags?: string[];
	blog_comments?: IBlogComment[];
	comments_count?: number;
	file_attachments?: ICategory[];
	category?: ICategory;
	manufacturer?: null;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	title?: string;
	description?: string;
	image?: string;
	views?: number;
	likes?: number;
	dislikes?: number;
	min_read?: number;
	status?: string;
}

export interface IBlogComment {
	id?: number;
	user?: IUser;
	children?: IBlogComment[] | any;
	updated_at?: Date;
	created_at?: Date;
	content?: string;
	likes?: number;
	dislikes?: number;
	replies_count: number;
	lft?: number;
	rght?: number;
	tree_id?: number;
	level?: number;
	blog?: number | null;
	parent?: number | null;
	is_liked?: boolean;
}

export interface ICategory {
	id?: number;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	description?: string;
	file?: string;
}

export interface IBlogCommentGetDataType {
	id: number;
	page: number;
	perPage: number;
}
export interface IBlogCommentSubmitData {
	blog: number | undefined;
	parent?: number | null;
	content: string;
}
export interface IBlogCommentSubmitDataType {
	id?: number;
	parentId?: number;
	postId?: number;
	content?: string;
	isReply?: boolean;
}
export interface IBlogCommentDeleteDataType {
	id: number;
	isReply?: boolean;
	parentId?: number | null;
}
export interface IBlogCommentLikePostDataType {
	id: number;
	isReply?: boolean;
	parentId?: number | null;
}
