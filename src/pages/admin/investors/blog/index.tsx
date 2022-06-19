// import ManageBlog from '@features/admin/investors/blog/ManageBlog';
import AdminBlog from '@features/admin/investors/blog';
import AdminLayout from '@layouts/private/template/admin';
import React from 'react';

const InvestorsBlog = () => {
	return (
		<AdminLayout>
			<AdminBlog />
			{/* <ManageBlog /> */}
		</AdminLayout>
	);
};

export default InvestorsBlog;
