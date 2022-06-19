import ServiceProviderTransactions from '@features/service-provider/transactions/ServiceProviderTransactions';
import ServiceProviderLayout from '@layouts/private/template/service-provider';
import React from 'react';

const Transactions = () => {
	return (
		<ServiceProviderLayout title="IDEEZA | AI Based SAAS- Service Provider- Transaction">
			<ServiceProviderTransactions />
		</ServiceProviderLayout>
	);
};

export default Transactions;
