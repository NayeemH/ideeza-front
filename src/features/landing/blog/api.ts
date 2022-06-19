import { IBlogComment, IBlogCommentSubmitData, IBlogCommentSubmitDataType } from '@models/blog';
import { ICoreCategory } from '@models/core';
import { IUserConnection } from '@models/user-profile';
import { ApiDataType, apiService } from 'utils/request';
import { getPaginateMeta } from 'utils/utils';

export type blogQueryParamsType = any;

/* ---------------------------------------------------------
 *	Index of API Services
 * ---------------------------------------------------------
 * 1. Get Blog Posts
 * 2. Get Blog Single Post By Id
 * 3. Get Blog Categories
 * 4. Like a Single blog post
 * 5. Dislike a Single blog post
 * 6. Follow an Author
 * 7. Unfollow an Author
 * 8. Get Connection with use by Id
 * 9. Get Comments of a Blog Single Post By Id
 * 10. Get Replies of comment by Id
 * 11. Submit a comment in a single blog post
 * 12. Like a comment of a single blog post
 * 13. Dislike a comment of a single blog post
 * 14. Edit a comment
 * 15. Delete a comment
 * ----------------------------------------------------------
 */
/*
 * 1. Get Blog Posts
 * ------------------------------------
 */
export const getBlogPosts = async (params?: blogQueryParamsType) => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'get',
		url: `blog/${params}`,
	};

	await apiService(apiData, (res: any) => {
		if (res) result = res?.data;
		// console.log('error---', err)
	});
	return result;
};

/*
 * 2. Get Blog Single Post By Id
 * ------------------------------------
 */
export const getBlogPostById = async (id: number) => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'get',
		url: `blog/${id}`,
	};

	await apiService(apiData, (res: any, err: any) => {
		if (res) result = res?.data;
		// console.log('Post by id Error----', err)
	});
	return result;
};

/*
 * 3. Get Blog Categories
 * -----------------------------------------
 */
export const getBlogCategories = async () => {
	let result: ICoreCategory[] = [];
	const apiData: ApiDataType = {
		method: 'get',
		url: `core/category/`,
	};

	await apiService(apiData, (res: any, err: any) => {
		if (res) result = res?.data?.results || [];
		else result = [];
		// console.log('Post Comments by id Error----', err)
	});
	return result;
};

/*
 * 4. Like a Single blog post
 * ------------------------------------
 */
export const likeBlogSinglePost = async (postId: number) => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'get',
		url: `blog/${postId}/like/`,
		token: true,
	};

	await apiService(apiData, (res: any, err: any) => {
		if (res) result = res?.data;
		// console.log('Error Like Blog Single Post---', err)
	});
	return result;
};

/*
 * 5. Dislike a Single blog post
 * ------------------------------------
 */
export const dislikeBlogSinglePost = async (postId: number) => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'get',
		url: `blog/${postId}/like/`,
		token: true,
	};

	await apiService(apiData, (res: any, err: any) => {
		if (res) result = res?.data;
		// console.log('Error Like Blog Single Post---', err)
	});
	return result;
};

/*
 * 6. Follow an Author
 * ------------------------------------
 */
export const followBlogAuthor = async (userId: number) => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'post',
		url: `account/friend/add-friend/`,
		data: {
			user_id: userId,
		},
		token: true,
	};

	await apiService(apiData, (res: any, err: any) => {
		if (res) result = res?.data;
		// console.log('Error Follow Blog Author---', err)
	});
	return result;
};

/*
 * 7. Unfollow an Author
 * ------------------------------------
 */
export const unfollowBlogAuthor = async (userId: number) => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'delete',
		url: `account/friend/${userId}/`,
		token: true,
	};

	await apiService(apiData, (res: any, err: any) => {
		if (res) result = res?.data;
		// console.log('Error Follow Blog Author---', err)
	});
	return result;
};

/*
 * 8. Get Connection with use by Id
 * -----------------------------------------
 */
export const getUserConnectionById = async (id: number, context?: any) => {
	let result: IUserConnection | null = null;
	const apiData: ApiDataType = {
		method: 'get',
		url: `account/user/${id}/connection/`,
		token: true,
	};
	if (context) apiData.context = context;

	await apiService(apiData, (res: any) => {
		if (res) result = res?.data;
		// console.log('Post Comments by id Error----', err)
	});
	return result;
};

/*
 * 9. Get Comments of a Blog Single Post By Id
 * -----------------------------------------
 */
export const getBlogPostCommentsById = async (id: number, page: number, perPage: number) => {
	let result: any = [];
	const params = `${page ? `?page=${page}` : ''}${perPage ? `&page_size=${perPage}` : ''}`;
	const apiData: ApiDataType = {
		method: 'get',
		url: `blog/${id}/comments/${params}`,
	};

	await apiService(apiData, (res: any) => {
		if (res) result = res?.data;
		// console.log('Post Comments by id Error----', err)
	});
	return result;
};

/*
 * 10. Get Replies of comment by Id
 * -------------------------------------------------------
 */
export const getCommentRepliesById = async (id: any, page: number = 1, pageSize: number = 5) => {
	let result: any = {
		replies: [],
		parentId: id,
	};
	const params = `${page ? `?page=${page}` : ''}${pageSize ? `&page_size=${pageSize}` : ''}`;
	const apiData: ApiDataType = {
		method: 'get',
		url: `/blog/comment/${id}/replies/${params}`,
	};

	await apiService(apiData, (res: any) => {
		if (res) result.replies = res?.data?.results;
	});
	return result;
};

/*
 * 11. Like a comment of a single blog post
 * ---------------------------------------
 */
export const likeBlogComment = async (
	id: number,
	isReply: boolean = false,
	parentId: number | null = null
) => {
	let result: any = { id, isReply, parentId };

	const apiData: ApiDataType = {
		method: 'post',
		url: `blog/comment/${id}/like/`,
		token: true,
	};

	await apiService(apiData, (res: any) => {
		if (res) result.isSuccess = true;
		else result.isSuccess = false;
		// console.log('Error Posted comment Like---', err)
	});
	return result;
};

/*
 * 12. Dislike a comment of a single blog post
 * ------------------------------------------
 */
export const dislikeBlogComment = async (id: number) => {
	let result: any = null;
	const apiData: ApiDataType = {
		method: 'get',
		url: `blog/comment/${id}/dislike/`,
		token: true,
	};

	await apiService(apiData, (res: any, err: any) => {
		if (res) result = res?.data;
		// console.log('Error Posted comment disLike---', err)
	});
	return result;
};

/*
 * 13. Submit a comment in a single blog post
 * --------------------------------------------
 */
export const createComment = async (formData: IBlogCommentSubmitData) => {
	let result: any = {};
	result.parent = formData.parent || null;

	const apiData: ApiDataType = {
		method: 'post',
		url: `blog/comment/add-comment/`,
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
 * 13.5. Submit a Reply in a single comment
 * --------------------------------------------
 */
export const createReply = async (formData: IBlogCommentSubmitData) => {
	let result: any = {};
	result.parent = formData.parent || null;

	const apiData: ApiDataType = {
		method: 'post',
		url: `blog/comment/add-comment/`,
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
 * 14. Edit a comment
 * ------------------------------------------
 */
export const editBlogComment = async (data: IBlogCommentSubmitDataType) => {
	let result: any = {};
	result.id = data.id;
	result.isReply = data.isReply;
	if (data?.parentId) result.parentId = data.parentId;

	const apiData: ApiDataType = {
		method: 'put',
		url: `blog/comment/${data.id}/`,
		data: {
			blog: data?.postId,
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
 * 15. Delete a comment
 * ------------------------------------------
 */
export const deleteBlogComment = async (
	id: number,
	isReply: boolean = false,
	parentId: number | null = null
) => {
	let result: any = {};
	result.isReply = isReply;
	result.id = id;
	if (parentId) result.parentId = parentId;

	const apiData: ApiDataType = {
		method: 'delete',
		url: `/blog/comment/${id}/`,
		token: true,
	};
	await apiService(apiData, (res: any) => {
		if (res) {
			result = { ...result, ...res?.data };
		}
	});
	return result;
};
