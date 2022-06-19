import React from 'react';
import ServiceProviderMessages from '@features/service-provider/messages/ServiceProviderMessages';
import ServiceProviderLayout from '@layouts/private/template/service-provider';

const Messages = () => {
	return (
		<ServiceProviderLayout title="IDEEZA | AI Based SAAS- Message">
			<ServiceProviderMessages />
		</ServiceProviderLayout>
	);
};

export default Messages;
