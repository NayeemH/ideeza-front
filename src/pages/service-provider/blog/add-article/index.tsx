import AddSingleBlog from '@features/service-provider/blog/AddSingleBlog';
import ServiceProviderLayout from '@layouts/private/template/service-provider';
import React from 'react';

const AddArticle = () => {
	return (
		<ServiceProviderLayout>
			<AddSingleBlog />
		</ServiceProviderLayout>
	);
};

export default AddArticle;
