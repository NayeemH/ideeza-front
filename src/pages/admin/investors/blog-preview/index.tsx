import BlogPreview from '@features/technician/blog/BlogPreview';
import AdminLayout from '@layouts/private/template/admin';
import React from 'react';

const InvestorsBlogPreview = () => {
	return (
		<AdminLayout>
			<BlogPreview />
		</AdminLayout>
	);
};

export default InvestorsBlogPreview;
