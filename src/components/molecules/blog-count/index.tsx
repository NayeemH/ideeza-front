import React from 'react';
interface IBlogCountProps {
	totalBlogs?: number;
	pageCount?: number;
	perPage?: any;
	currentPage?: any;
}

const BlogCount = (props: IBlogCountProps) => {
	const { currentPage, perPage, pageCount, totalBlogs } = props;

	return (
		<div className="text-md md:text-lg text-[#333333]  tracking-tight">
			Showing {(currentPage - 1) * perPage + 1} -{' '}
			{currentPage === pageCount ? totalBlogs : perPage * currentPage} of {totalBlogs}
		</div>
	);
};
// BlogCount.defaultProps = {
// 	type: 'fixed',
// 	isTransparentBg: false,
// 	transparentBg: 'bg-white/80',
// };
export default BlogCount;
