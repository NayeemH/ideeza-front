import PreviewArticle from '@features/admin/blog/PreviewArticle';
import AdminLayout from '@layouts/private/template/admin';
import React from 'react';

const AdminBlogPreviewArticle = () => {
	return (
		<AdminLayout title="Preview Article IDEEZA | AI Based SAAS">
			<PreviewArticle />
		</AdminLayout>
	);
};

export default AdminBlogPreviewArticle;
