export interface INote {
	id?: number;
	user?: User;
	assigned_to?: any[];
	file_attachments?: any[];
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	title?: string;
	description?: string;
	start_time?: null;
	note_period?: null;
	deadline?: null;
	link_id?: null;
	link_type?: null;
	is_important?: boolean;
}

export interface User {
	id?: number;
	first_name?: string;
	last_name?: string;
	email?: string;
	phone?: string;
	profile_photo?: null;
	address?: string;
	website?: string;
	preferred_language?: null;
	about_me?: string;
}
