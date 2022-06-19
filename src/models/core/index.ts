export interface ICategories {
	label: string;
	value: number;
}

export interface ICoreCategory {
	id: number;
	updated_at?: Date;
	created_at?: Date;
	is_visible: boolean;
	name?: string;
	discription?: string;
}
