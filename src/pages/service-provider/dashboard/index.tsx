import React from 'react';
import ServiceProviderDashboard from '@features/service-provider/dashboard/ServiceProviderDashboard';
import ServiceProviderLayout from '@layouts/private/template/service-provider';

const Dashboard = () => {
	return (
		<ServiceProviderLayout title="IDEEZA | AI Based SAAS- Service Provider">
			<ServiceProviderDashboard />
		</ServiceProviderLayout>
	);
};

export default Dashboard;
