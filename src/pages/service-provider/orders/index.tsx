import ServiceProviderOrders from '@features/service-provider/orders/ServiceProviderOrders';
import ServiceProviderLayout from '@layouts/private/template/service-provider';
import React from 'react';

const Orders = () => {
	return (
		<ServiceProviderLayout title="IDEEZA | AI Based SAAS- Service Provider-Orders">
			<ServiceProviderOrders />
		</ServiceProviderLayout>
	);
};

export default Orders;
