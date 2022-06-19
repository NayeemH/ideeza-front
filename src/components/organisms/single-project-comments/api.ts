import { IBlogCommentSubmitData, IBlogCommentSubmitDataType } from '@models/blog';
import { ApiDataType, apiService } from 'utils/request';

/* ---------------------------------------------------------
 *	Index of Project Details Comment API Services
 * ---------------------------------------------------------
 * 1. Get Comments of single Project By Id
 * 2. Get Replies of a comment of single project by Id
 * 3. Create a comment
 * 4. Create a Reply
 * 5. Edit a comment or reply
 * 6. Delete a comment or reply
 * 7. Like a comment or Reply
 * ----------------------------------------------------------
 */

/*
 * 1. Get Comments of single Project By Id
 * -----------------------------------------
 */
export const getProjectCommentsById = async (id: number, page: number, perPage: number) => {
	let result: any = null;
	const params = `${page ? `?page=${page}` : ''}${perPage ? `&page_size=${perPage}` : ''}`;
	const apiData: ApiDataType = {
		method: 'get',
		url: `/project/${id}/comments/${params}`,
		token: true,
	};

	await apiService(apiData, (res: any) => {
		if (res) result = res?.data;
		// console.log('Project Comments by id Error----', err)
	});
	return result;
};

/*
 * 2. Get Replies of a comment of single Project by Id
 * -------------------------------------------------------
 */
export const getProjectCommentRepliesById = async (id: any, page = 1, pageSize = 5) => {
	const result: any = {
		replies: [],
		parentId: id,
	};
	const params = `${page ? `?page=${page}` : ''}${pageSize ? `&page_size=${pageSize}` : ''}`;
	const apiData: ApiDataType = {
		method: 'get',
		url: `project/comment/${id}/replies/${params}`,
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
export const createProjectComment = async (formData: IBlogCommentSubmitData) => {
	const result: any = {};
	result.parent = formData.parent || null;

	const apiData: ApiDataType = {
		method: 'post',
		url: `project/comment/add-comment/`,
		data: formData,
		token: true,
	};

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
export const createProjectReply = async (formData: IBlogCommentSubmitData) => {
	const result: any = {};
	result.parent = formData.parent || null;

	const apiData: ApiDataType = {
		method: 'post',
		url: `project/comment/add-comment/`,
		data: formData,
		token: true,
	};

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
export const editProjectComment = async (data: IBlogCommentSubmitDataType) => {
	let result: any = {};
	result.id = data.id;
	result.isReply = data.isReply;
	if (data?.parentId) result.parentId = data.parentId;

	const apiData: ApiDataType = {
		method: 'put',
		url: `project/comment/${data.id}/`,
		data: {
			project: data?.postId,
			content: data?.content,
		},
		token: true,
	};
	if (data.parentId) apiData.data.parent = data.parentId;
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
export const deleteProjectComment = async (
	id: number,
	isReply = false,
	parentId: number | null = null
) => {
	let result: any = {};
	result.isReply = isReply;
	result.id = id;
	if (parentId) result.parentId = parentId;

	const apiData: ApiDataType = {
		method: 'delete',
		url: `project/comment/${id}/`,
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
export const likeProjectComment = async (
	id: number,
	isReply = false,
	parentId: number | null = null
) => {
	const result: any = { id, isReply, parentId };

	const apiData: ApiDataType = {
		method: 'post',
		url: `project/comment/${id}/like/`,
		token: true,
	};

	await apiService(apiData, (res: any) => {
		if (res) result.isSuccess = true;
		else result.isSuccess = false;
		// console.log('Error Posted comment Like---', err)
	});
	return result;
};
