export interface IRoom {
	id?: number;
	participants?: Participant[];
	updated_at?: Date;
	created_at?: Date;
	name?: string;
	is_group?: boolean;
	image?: string;
	last_message?: string;
	unread_message_count?: number;
}

export interface Participant {
	id?: number;
	first_name?: string;
	last_name?: string;
	email?: string;
	phone?: string;
	profile_photo?: null | string;
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

export interface IMessage {
	id?: number;
	author?: IAuthor;
	seen_users?: IAuthor[];
	updated_at?: Date;
	created_at?: Date;
	message?: string;
	content_type?: string;
	file?: null;
	room?: number;
}

export interface IAuthor {
	id?: number;
	first_name?: string;
	last_name?: string;
	email?: string;
	phone?: string;
	profile_photo?: string;
	address?: string;
	website?: string;
	preferred_language?: null;
	about_me?: string;
}
