import { IUser } from 'models/auth';

export interface ITaskItem {
	id?: number;
	line_of_business?: LineOfBusiness;
	user?: IUser;
	file_attachments?: FileAttachment[];
	updated_at?: Date;
	created_at?: Date;
	title?: string;
	description?: string;
	link?: string;
	end_datetime?: Date;
	status?: string;
	component?: IComponent;
	manufacturing_project: IManufacturingProject;
	assigned_users: IUser[];
}

export interface ITask {
	id?: number;
	line_of_business?: LineOfBusiness;
	user?: IUser;
	file_attachments?: FileAttachment[];
	updated_at?: Date;
	created_at?: Date;
	title?: string;
	description?: string;
	link?: string;
}

export interface FileAttachment {
	id?: number;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	file?: string;
}

export interface LineOfBusiness {
	id?: number;
	updated_at?: Date;
	created_at?: Date;
	name?: string;
	lob_type?: string;
}

export interface IComponent {
	id?: number;
	user?: IUser;
	category?: ICategory | null;
	children?: IComponent[];
	parts?: any[];
	line_of_business?: LineOfBusiness | null;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	description?: string;
	editor_script?: string;
	component_type?: string;
	icon?: null;
	lft?: number;
	rght?: number;
	tree_id?: number;
	level?: number;
	parent?: number | null;
	product?: number;
	electronic_codes?: any[];
}

export interface ICategory {
	id?: number;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	description?: string;
}

export interface IManufacturingProject {
	id?: number;
	project?: IProject;
	user?: IUser;
	updated_at?: Date;
	created_at?: Date;
	shipping_address?: string;
	amount_spent?: string;
	end_datetime?: Date;
	status?: string;
}

export interface IProject {
	id?: number;
	user?: IUser;
	products?: IProject[];
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	description?: string;
	image?: string;
	views?: number;
	likes?: number;
	dislikes?: number;
	product_comments?: ProductComment[];
	status?: string;
}

export interface ProductComment {
	id?: number;
	user?: IUser;
	children?: ProductComment[];
	updated_at?: Date;
	created_at?: Date;
	content?: string;
	likes?: number;
	dislikes?: number;
	lft?: number;
	rght?: number;
	tree_id?: number;
	level?: number;
	product?: number | null;
	parent?: number | null;
}
