import React from 'react';
import ServiceProviderLayout from '@layouts/private/template/service-provider';
import ServiceProviderQuestionnarieReminder from '@features/service-provider/projects/ServiceProviderQuestionnarieReminder';

const QuestionnaireReminder = () => {
	return (
		<ServiceProviderLayout title="IDEEZA | AI Based SAAS- Service Provider- Projects questionnaire reminder">
			<ServiceProviderQuestionnarieReminder />
		</ServiceProviderLayout>
	);
};

export default QuestionnaireReminder;
