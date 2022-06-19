import ServiceProviderSingleProject from '@features/service-provider/projects/ServiceProviderSingleProject';
import ServiceProviderLayout from '@layouts/private/template/service-provider';
import React from 'react';

const SingleProject = () => {
	return (
		<ServiceProviderLayout>
			<ServiceProviderSingleProject />
		</ServiceProviderLayout>
	);
};

export default SingleProject;
