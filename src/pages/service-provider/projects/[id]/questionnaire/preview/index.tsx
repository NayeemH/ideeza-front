import React from 'react';
import ServiceProviderLayout from '@layouts/private/template/service-provider';
import ServiceProviderQuestionnariePreview from '@features/service-provider/projects/ServiceProviderQuestionnariePreview';

const QuestionnaireReminder = () => {
	return (
		<ServiceProviderLayout title="IDEEZA | AI Based SAAS- Service Provider- Projects questionnaire reminder">
			<ServiceProviderQuestionnariePreview />
		</ServiceProviderLayout>
	);
};

export default QuestionnaireReminder;
