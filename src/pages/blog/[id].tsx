import {
	getBlogPostById,
	getBlogPostCommentsById,
	getUserConnectionById,
} from '@features/landing/blog/api';
import BlogSingle from '@features/landing/blog/single';
import PublicLayout from '@layouts/public';
import React from 'react';
import { getPaginateMeta } from 'utils/utils';

const BlogArticleHome = (props: any) => {
	return (
		<PublicLayout isSupport="isSupport">
			<BlogSingle
				post={props.post}
				postComments={props.comments}
				commentsCount={props.commentsCount}
				paginateMeta={props.paginateMeta}
				userConnection={props.userConnection}
			/>
		</PublicLayout>
	);
};

export default BlogArticleHome;

// getServerSideProps
export const getServerSideProps = async (context: any) => {
	const page = 1;
	const perPage = 5;
	const post = await getBlogPostById(context?.params?.id || '');
	const authorId = post?.user?.id;
	const comments = await getBlogPostCommentsById(context?.params?.id || null, page, perPage);
	const paginateMeta = getPaginateMeta(comments, page, perPage);
	const userConnection = await getUserConnectionById(authorId, context);

	if (!post) {
		return {
			redirect: {
				destination: '/404',
				permanent: false,
			},
		};
	}

	return {
		props: {
			post,
			comments: comments?.results || [],
			commentsCount: comments?.count || 0,
			paginateMeta,
			userConnection,
		},
	};
};
