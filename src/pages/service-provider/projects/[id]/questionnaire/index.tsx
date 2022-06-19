import React from 'react';
import ServiceProviderLayout from '@layouts/private/template/service-provider';
import ServiceProviderQuestionnarie from '@features/service-provider/projects/ServiceProviderQuestionnarie';

const Questionnaire = () => {
	return (
		<ServiceProviderLayout title="IDEEZA | AI Based SAAS- Service Provider- Projects questionnaire">
			<ServiceProviderQuestionnarie />
		</ServiceProviderLayout>
	);
};

export default Questionnaire;
