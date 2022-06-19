import SingleBlogPost from '@features/service-provider/blog/SingleBlogPost';
import ServiceProviderLayout from '@layouts/private/template/service-provider';
import React from 'react';

const SingleBlog = () => {
	return (
		<ServiceProviderLayout>
			<SingleBlogPost />
		</ServiceProviderLayout>
	);
};

export default SingleBlog;
