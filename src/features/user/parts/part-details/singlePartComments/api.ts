import {
	IPartCommenLikeFormDataType,
	IPartCommentDeleteFormDataType,
	IPartCommentSubmitFormDataType,
} from '@models/user-parts';
import { PARTS_COMMENT_API_TYPE } from 'enums/common';
import { ApiDataType, apiService } from 'utils/request';

/* ---------------------------------------------------------
 *	Index of Part Details Comment API Services
 * ---------------------------------------------------------
 * 1. Get Comments of single Part By Id
 * 2. Get Replies of a comment of single part by Id
 * 3. Create a comment
 * 4. Create a Reply
 * 5. Edit a comment or reply
 * 6. Delete a comment or reply
 * 7. Like a comment or Reply
 * ----------------------------------------------------------
 */

/*
 * 1. Get Comments of single Part By Id
 * -----------------------------------------
 */
export const getPartCommentsById = async (
	id: number,
	type: string,
	page: number,
	perPage: number
) => {
	let result: any = null;
	const params = `${page ? `?page=${page}` : ''}${perPage ? `&page_size=${perPage}` : ''}`;
	const apiData: ApiDataType = {
		method: 'get',
		// url: `/part/${type}-part/${id}/comments/${params}`,
		url:
			type == 'component'
				? `/component/${id}/comments/${params}`
				: `/part/${type}-part/${id}/comments/${params}`,
		token: true,
	};

	await apiService(apiData, (res: any) => {
		if (res) result = res?.data;
		// console.log('Part Comments by id Error----', err)
	});
	return result;
};

/*
 * 2. Get Replies of a comment of single Part by Id
 * -------------------------------------------------------
 */
export const getPartCommentRepliesById = async (id: any, type: string, page = 1, pageSize = 5) => {
	const result: any = {
		replies: [],
		parentId: id,
	};
	console.log('type-------', type);
	const params = `${page ? `?page=${page}` : ''}${pageSize ? `&page_size=${pageSize}` : ''}`;
	const apiData: ApiDataType = {
		method: 'get',
		url:
			type == 'component'
				? `/component/comment/${id}/replies/${params}`
				: `/part/${type}-part/comment/${id}/replies/${params}`,
		token: true,
	};

	await apiService(apiData, (res: any) => {
		if (res) result.replies = res?.data?.results;
	});
	return result;
};

/*
 * 3. Create a comment
 * --------------------------------------------
 */
export const createPartComment = async (
	type: string,
	partId: number,
	formData: IPartCommentSubmitFormDataType
) => {
	const result: any = {};

	const apiData: ApiDataType = {
		method: 'post',
		url:
			type == 'component'
				? `/component/comment/add-comment/`
				: `/part/${type}-part/comment/add-comment/`,
		data: formData,
		token: true,
	};

	if (PARTS_COMMENT_API_TYPE[type] === 'code_part') apiData.data.code_part = partId;
	if (PARTS_COMMENT_API_TYPE[type] === 'electronic_part') {
		apiData.data.electronic_part = partId;
	}
	if (PARTS_COMMENT_API_TYPE[type] === 'cover_part') apiData.data.cover_part = partId;
	if (PARTS_COMMENT_API_TYPE[type] === 'component') apiData.data.component = partId;

	await apiService(apiData, (res: any) => {
		if (res) result.comment = res?.data;
		// else result.error = err?.response?.data
		// console.log('comment submit error-------', result)
	});
	return result;
};

/*
 * 4. Create a Reply
 * --------------------------------------------
 */
export const createPartReply = async (
	type: string,
	partId: number,
	formData: IPartCommentSubmitFormDataType
) => {
	const result: any = {};
	result.parent = formData.parent || null;

	const apiData: ApiDataType = {
		method: 'post',
		url:
			type == 'component'
				? `/component/comment/add-comment/`
				: `/part/${type}-part/comment/add-comment/`,
		data: formData,
		token: true,
	};

	if (PARTS_COMMENT_API_TYPE[type] === 'code_part') apiData.data.code_part = partId;
	if (PARTS_COMMENT_API_TYPE[type] === 'electronic_part') {
		apiData.data.electronic_part = partId;
	}
	if (PARTS_COMMENT_API_TYPE[type] === 'cover_part') apiData.data.cover_part = partId;
	if (PARTS_COMMENT_API_TYPE[type] === 'component') apiData.data.component = partId;

	await apiService(apiData, (res: any) => {
		if (res) result.comment = res?.data;
		// else result.error = err?.response?.data
		// console.log('comment submit error-------', result)
	});
	return result;
};

/*
 * 5. Edit a comment or reply
 * ------------------------------------------
 */
export const editPartComment = async (type: string, partId: number, data: any) => {
	let result: any = {};
	result.id = data.id;
	result.isReply = data.isReply;
	if (data?.parentId) result.parentId = data.parentId;

	const apiData: ApiDataType = {
		method: 'put',
		url:
			type == 'component'
				? `/component/comment/${data.id}/`
				: `/part/${type}-part/comment/${data.id}/`,
		data: {
			content: data?.content,
		},
		token: true,
	};
	if (PARTS_COMMENT_API_TYPE[type] === 'code_part') apiData.data.code_part = partId;
	if (PARTS_COMMENT_API_TYPE[type] === 'electronic_part') {
		apiData.data.electronic_part = partId;
	}
	if (PARTS_COMMENT_API_TYPE[type] === 'cover_part') apiData.data.cover_part = partId;
	if (PARTS_COMMENT_API_TYPE[type] === 'component') apiData.data.component = partId;
	if (data?.parentId) {
		apiData.data.parent = apiData.data.parentId;
	}

	await apiService(apiData, (res: any) => {
		if (res) {
			result = { ...result, ...res?.data };
		}
	});
	return result;
};

/*
 * 6. Delete a comment or reply
 * ------------------------------------------
 */
export const deletePartComment = async (
	type?: string,
	formData?: IPartCommentDeleteFormDataType
) => {
	let result: any = {};
	result.isReply = formData?.isReply;
	result.id = formData?.id;
	if (formData?.parentId) result.parentId = formData?.parentId;

	const apiData: ApiDataType = {
		method: 'delete',
		url:
			type == 'component'
				? `/component/comment/${formData?.id}/`
				: `/part/${type}-part/comment/${formData?.id}/`,
		token: true,
	};
	await apiService(apiData, (res: any) => {
		if (res) {
			result = { ...result, ...res?.data };
		}
	});
	return result;
};

/*
 * 7. Like a comment or Reply
 * ---------------------------------------
 */
export const likePartComment = async (type?: string, formData?: IPartCommenLikeFormDataType) => {
	const result: any = {};
	result.isReply = formData?.isReply;
	result.id = formData?.id;
	if (formData?.parentId) result.parentId = formData?.parentId;

	const apiData: ApiDataType = {
		method: 'post',
		url:
			type == 'component'
				? `/component/comment/${formData?.id}/like/`
				: `/part/${type}-part/comment/${formData?.id}/like/`,
		data: {},
		token: true,
	};

	await apiService(apiData, (res: any) => {
		if (res) result.isSuccess = true;
		else result.isSuccess = false;
		// console.log('Error Posted comment Like---', err)
	});
	return result;
};
