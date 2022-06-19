import ServiceProviderLayout from '@layouts/private/template/service-provider';
import { Dispute as DisputeComponent } from '@organisms/service-provider/transactions/Dispute';
import React from 'react';

const Dispute = () => {
	return (
		<ServiceProviderLayout title="IDEEZA | AI Based SAAS- Service Provider- Projects dispute">
			<DisputeComponent />
		</ServiceProviderLayout>
	);
};

export default Dispute;
