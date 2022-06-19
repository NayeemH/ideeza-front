import React from 'react';
import AddArticle from '@features/technician/blog/AddArticle';
import TechnicianLayout from '@layouts/private/template/technician';

export default function BlogAddArticle() {
	return (
		<TechnicianLayout>
			<AddArticle />
		</TechnicianLayout>
	);
}
