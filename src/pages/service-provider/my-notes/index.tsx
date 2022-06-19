import ServiceProviderNotes from '@features/service-provider/my-notes/ServiceProviderNotes';
import ServiceProviderLayout from '@layouts/private/template/service-provider';
import React from 'react';

const MyNotes = () => {
	return (
		<ServiceProviderLayout title="IDEEZA | AI Based SAAS- Service Provider-Notes">
			<ServiceProviderNotes />
		</ServiceProviderLayout>
	);
};

export default MyNotes;
