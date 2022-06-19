import ManageNews from '@features/admin/investors/news/ManageNews';
import AdminLayout from '@layouts/private/template/admin';
import React from 'react';

const InvestorsNews = () => {
	return (
		<AdminLayout>
			<ManageNews />
		</AdminLayout>
	);
};

export default InvestorsNews;
