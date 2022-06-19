export interface IUserData {
	id?: number;
	role?: string;
	badge?: string;
	friends?: any[];
	reviews?: any[];
	preferred_language?: null;
	languages?: any[];
	user_skills?: any[];
	notes?: Note[];
	blogs?: any[];
	projects?: Projects;
	services?: any[];
	line_of_business?: any[];
	last_login?: Date;
	email?: string;
	date_joined?: Date;
	first_name?: string;
	last_name?: string;
	gender?: string;
	dob?: Date;
	phone?: string;
	address?: string;
	score?: null;
	profile_photo?: null;
	website?: string;
	social_media?: any;
	recent_activities?: unknown;
	is_visible?: boolean;
	about_me?: string;
	timezone?: string;
	work?: string;
	credit_card?: unknown;
	paypal?: string;
	in_team?: boolean;
	hourly_charge?: null;
	messages_count?: number;
	blogs_count?: number;
	open_tasks_count?: number;
	current_subscription?: CurrentSubscription;
	projects_count?: number;
	friends_count?: number;
	profile_setting?: ProfileSetting;
	tax_information: ITaxInformation;
	new_executive?: NewExecutive;
}

export interface CurrentSubscription {
	pricing_plan?: number;
	package?: string;
	is_active?: boolean;
	value?: number;
	cancellation_date?: Date;
}
export interface ProfileSetting {
	messages?: INotificationType;
	reminders?: INotificationType;
	account_support?: INotificationType;
	policy_community?: INotificationType;
	social_connections?: boolean;
	facebook_timeline?: boolean;
	search_engine?: boolean;
}

export interface INotificationType {
	email?: boolean;
	notification?: boolean;
	text_message?: boolean;
}
export interface Note {
	id?: number;
	user?: IUser;
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

export interface IUser {
	id?: number;
	first_name?: string;
	last_name?: string;
	email?: string;
	phone?: string;
	profile_photo?: null;
	address?: string;
	website?: string;
	preferred_language?: IPreferredLanguage;
	about_me?: string;
}

export interface Projects {
	public?: any[];
	private?: any[];
	contributed?: any[];
}

export interface IPreferredLanguage {
	id?: number;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	code?: string;
	name?: string;
	native_name?: string;
}

export interface ITaxInformation {
	country: string;
	address: string;
	city: string;
	postal_code: string;
	us_person: boolean;
	business_name: string;
	federal_tax_classification: string;
	taxpayer_identification_type: 'SSN' | 'EIN';
	taxpayer_identification_number: string;
}

export interface NewExecutive {
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	birthdate: {
		month: string;
		day: string;
		year: string;
	};
	permissionType: string;
}
