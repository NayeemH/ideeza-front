import ServiceProviderDashboardTask from '@features/service-provider/dashboard/ServiceProviderDashboardTask';
import ServiceProviderLayout from '@layouts/private/template/service-provider';
import React from 'react';

const SingleTask = () => {
	return (
		<ServiceProviderLayout>
			<ServiceProviderDashboardTask />
		</ServiceProviderLayout>
	);
};

export default SingleTask;
