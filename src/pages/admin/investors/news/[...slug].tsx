import React from 'react';
import AdminLayout from '@layouts/private/template/admin';
import SingleNews from '@features/admin/investors/news/SingleNews';

const AdminSingleNews = () => {
	return (
		<AdminLayout>
			<SingleNews />
		</AdminLayout>
	);
};

export default AdminSingleNews;
