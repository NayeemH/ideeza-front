import AdminTableBlog from '@features/admin/blog';
import AdminLayout from '@layouts/private/template/admin';
import React from 'react';

const AdminBlog = () => {
	return (
		<AdminLayout title="Blog IDEEZA | AI Based SAAS">
			<AdminTableBlog />
		</AdminLayout>
	);
};

export default AdminBlog;
