export interface IProjects {
	public?: IProject[];
	private?: IProject[];
}

export interface IProject {
	id?: number;
	user?: User;
	products?: Product[];
	project_contributors?: any[];
	project_comments?: ProjectComment[];
	file_attachments?: FileAttachment[];
	role?: string;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	description?: string;
	image?: null | string;
	views?: number;
	likes?: number;
	dislikes?: number;
	three_d_script?: any;
}

export interface FileAttachment {
	id?: number;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	file?: string;
	description?: string;
}

export interface Product {
	id?: number;
	user?: User;
	components?: Component[];
	product_comments?: ProductComment[];
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	description?: string;
	image?: string;
	views?: number;
	likes?: number;
	dislikes?: number;
	status?: string;
}

export interface Component {
	id?: number;
	user?: User;
	category?: FileAttachment | null;
	children?: Component[];
	parts?: any[];
	line_of_business?: LineOfBusiness | null;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	description?: string;
	editor_script?: string;
	three_d_script?: unknown;
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

export interface LineOfBusiness {
	id?: number;
	updated_at?: Date;
	created_at?: Date;
	name?: string;
	lob_type?: string;
}

export interface User {
	id?: number;
	first_name?: string;
	last_name?: string;
	email?: string;
	phone?: string;
	profile_photo?: string;
	address?: string;
	website?: string;
	preferred_language?: PreferredLanguage | null;
	about_me?: string;
}

export interface PreferredLanguage {
	id?: number;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	code?: string;
	name?: string;
	native_name?: string;
}

export interface ProductComment {
	id?: number;
	user?: User;
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

export interface ProjectComment {
	id?: number;
	user?: User;
	children?: ProjectComment[];
	updated_at?: Date;
	created_at?: Date;
	content?: string;
	likes?: number;
	dislikes?: number;
	lft?: number;
	rght?: number;
	tree_id?: number;
	level?: number;
	project?: number | null;
	parent?: number | null;
}
