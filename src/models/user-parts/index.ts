export interface IPartDetailsProps {
	id?: any;
	type?: string;
}
export interface IPartCommentGetDataType {
	id: number;
	type: string;
	page: number;
	perPage: number;
}

export interface IPartCommentSubmitFormDataType {
	id?: number;
	parent?: number;
	parentId?: number;
	content?: string;
	isReply?: boolean;
	code_part?: number;
	electronic_part?: number;
	cover_part?: number;
	component?: number;
}
export interface IPartCommentSubmitDataType {
	type: string;
	partId: any;
	formData: IPartCommentSubmitFormDataType;
}

export interface IPartCommentDeleteDataType {
	type?: string;
	formData?: IPartCommentDeleteFormDataType;
}
export interface IPartCommentDeleteFormDataType {
	id: number;
	isReply?: boolean;
	parentId?: number | null;
}
export interface IPartCommentLikePostDataType {
	id: number;
	type: string;
	isReply?: boolean;
	parentId?: number | null;
}

export interface IPartCommentLikeDataType {
	type?: string;
	formData?: IPartCommenLikeFormDataType;
}
export interface IPartCommenLikeFormDataType {
	id: number;
	isReply?: boolean;
	parentId?: number | null;
}
