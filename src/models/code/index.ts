export interface ICodeBlock {
	id?: any;
	name?: string;
	description?: null;
	editor_script?: string;
	image_svg?: string;
	category?: IBlockCategory;
	created_at?: Date;
	block_type?: string;
	simulation_video?: any;
}

export interface IBlockCategory {
	id?: number;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	description?: string;
	has_children?: boolean;
}
