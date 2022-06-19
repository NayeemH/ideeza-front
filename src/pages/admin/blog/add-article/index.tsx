import AddArticle from '@features/admin/blog/AddArticle';
import AdminLayout from '@layouts/private/template/admin';
import React from 'react';

const AdminBlogAddArticle = () => {
	return (
		<AdminLayout title="Add Article IDEEZA | AI Based SAAS">
			<AddArticle />
		</AdminLayout>
	);
};

export default AdminBlogAddArticle;
