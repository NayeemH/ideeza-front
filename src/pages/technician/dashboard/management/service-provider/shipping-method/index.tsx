import Shipping from '@features/technician/dashboard/management/Shipping';
import TechnicianLayout from '@layouts/private/template/technician';
import React from 'react';

const ShippingMethodManagement = () => {
	return (
		<TechnicianLayout>
			<Shipping />
		</TechnicianLayout>
	);
};

export default ShippingMethodManagement;
