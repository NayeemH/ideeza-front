import Blog from '@features/landing/blog';
import { getBlogPosts } from '@features/landing/blog/api';
import PublicLayout from 'layouts/public';
import { getPaginateMeta } from 'utils/utils';
import FreelancerSignUpPopup from '@organisms/freelancer-signup-popup';
import ManufacturerSignUpPopup from '@organisms/manufacturer-signup';

export default function BlogPage(props: any) {
	return (
		<PublicLayout
			title="IDEEZA | AI Based SAAS - Blog"
			isSupport="isSupport"
		>
			<ManufacturerSignUpPopup />
			<FreelancerSignUpPopup />
			<Blog
				blogPosts={props.blogPosts}
				topBlogPosts={props.topBlogPosts}
				paginateMeta={props.paginateMeta}
				blogPostsCount={props.blogPostsCount}
			/>
		</PublicLayout>
	);
}

// : getServerSideProps
export const getServerSideProps = async (_context: any) => {
	const page = 1;
	const perPage = 3;
	const blogPostParams = `?page=${page}&page_size=${perPage}`;
	const blogPostsData = await getBlogPosts(blogPostParams);
	const blogPostsCount = blogPostsData?.count || 0;
	const blogPosts = blogPostsData?.results || [];
	const paginateMeta = getPaginateMeta(blogPostsData, page, perPage);

	const topBlogPostParams = '?ordering=-views&page=1&page_size=5';
	const topBlogPostsData = await getBlogPosts(topBlogPostParams);
	const topBlogPosts = topBlogPostsData?.results || [];

	return {
		props: {
			blogPosts,
			topBlogPosts,
			paginateMeta,
			blogPostsCount,
		},
	};
};
