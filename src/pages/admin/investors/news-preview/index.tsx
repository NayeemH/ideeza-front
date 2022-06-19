import NewsPreview from '@features/admin/investors/news/NewsPreview';
import AdminLayout from '@layouts/private/template/admin';
import React from 'react';

const InvestorsNewsPreview = () => {
	return (
		<AdminLayout>
			<NewsPreview />
		</AdminLayout>
	);
};

export default InvestorsNewsPreview;
