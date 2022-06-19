import React from 'react';
import ServiceProviderLayout from '@layouts/private/template/service-provider';
import ServiceProviderSendQuestionnarie from '@features/service-provider/projects/ServiceProviderSendQuestionnarie';

const SendQuestionnaire = () => {
	return (
		<ServiceProviderLayout title="IDEEZA | AI Based SAAS- Service Provider- Projects sendquestionnaire">
			<ServiceProviderSendQuestionnarie />
		</ServiceProviderLayout>
	);
};

export default SendQuestionnaire;
