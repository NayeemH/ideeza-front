import { IUser } from '@models/auth';

export interface IElectronicsPart {
	id?: number;
	user?: IUser;
	package?: ICPackage;
	category?: null;
	country?: ICountry;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	description?: string;
	icon?: null;
	file_2d?: null;
	file_3d?: null;
	qfn_dimensions?: QfnDimensions;
	leg_meaning?: LegMeaning[];
	chart?: Chart;
	three_d_script?: unknown;
	component?: null;
}

export interface Chart {
	title?: string;
	values?: Value[];
	label_x?: string;
	label_y?: string;
}

export interface Value {
	x?: number;
	y?: number;
}

export interface LegMeaning {
	pin_no?: number;
	pin_name?: string;
	max_value?: number;
	min_value?: number;
	pin_property?: string;
}

export interface ICPackage {
	id?: number;
	user?: IUser;
	family?: Family;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	pin?: string;
	properties?: Property[];
}

export interface Family {
	id?: number;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	description?: string;
}

export interface Property {
	x1?: number;
	x2?: number;
	y1?: number;
	y2?: number;
	z1?: number;
	z2?: number;
	name?: string;
	value?: string;
}

export interface QfnDimensions {
	name?: string;
	pitch?: number;
	body_type?: string;
	lead_width?: number;
	total_pins?: number;
	lead_length?: number;
	package_type?: string;
	total_height?: number;
	pin1_location?: string;
	lead_thickness?: number;
	clearance_ic_pcb?: number;
	total_carrier_length?: number;
}

export interface ICountry {
	id?: number;
	updated_at?: Date;
	created_at?: Date;
	name?: string;
	telephone_code?: string;
}

export interface ICFamily {
	id?: number;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: true;
	name?: string;
	description?: string;
}
