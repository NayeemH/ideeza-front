import ServiceProviderSettings from '@features/service-provider/settings/ServiceProviderSettings';
import ServiceProviderLayout from '@layouts/private/template/service-provider';
import React from 'react';

const Settings = () => {
	return (
		<ServiceProviderLayout title="IDEEZA | AI Based SAAS- Service Provider- Settings">
			<ServiceProviderSettings />
		</ServiceProviderLayout>
	);
};

export default Settings;
