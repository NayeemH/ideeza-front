export interface ITimeFromNow {
	when: string;
	unitOfTime: string;
	time: number | null;
}

export interface ITimeFromNowOptionsLabel {
	now?: string;
	past?: string;
	future?: string;
}

export interface ITimeFromNowOptions {
	labels?: ITimeFromNowOptionsLabel;
}

export interface PaginateMetaType {
	pageCount?: number;
	next?: number | null;
	previous?: number | null;
	currentPage: number;
	perPage: number;
}

export interface InvestorIconType {
	id?: string;
	dataName?: string;
	width?: number;
	height?: number;
	viewBox?: string;
}

export interface IAsyncStates {
	loading: boolean;
	success: boolean;
	failed: boolean;
}
