import Blog from '@features/technician/dashboard/management/Blog';
import TechnicianLayout from '@layouts/private/template/technician';
import React from 'react';

const Blogs = () => {
	return (
		<TechnicianLayout>
			<Blog />
		</TechnicianLayout>
	);
};

export default Blogs;
