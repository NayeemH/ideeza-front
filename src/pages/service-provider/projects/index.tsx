import React from 'react';
import ServiceProviderLayout from '@layouts/private/template/service-provider';
import ServiceProviderProjects from '@features/service-provider/projects/ServiceProviderProjects';

const Projects = () => {
	return (
		<ServiceProviderLayout title="IDEEZA | AI Based SAAS- Service Provider- Projects">
			<ServiceProviderProjects />
		</ServiceProviderLayout>
	);
};

export default Projects;
