import React from 'react';
import ServiceProviderBlog from '@features/service-provider/blog/ServiceProviderBlog';
import ServiceProviderLayout from '@layouts/private/template/service-provider';

const Blog = () => {
	return (
		<ServiceProviderLayout title="IDEEZA | AI Based SAAS- Blog">
			<ServiceProviderBlog />
		</ServiceProviderLayout>
	);
};

export default Blog;
