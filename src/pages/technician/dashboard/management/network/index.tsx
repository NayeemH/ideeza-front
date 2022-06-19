import ManagementNetwork from '@features/technician/dashboard/management/Network';
import TechnicianLayout from '@layouts/private/template/technician';
import React from 'react';

const Network = () => {
	return (
		<TechnicianLayout>
			<ManagementNetwork />
		</TechnicianLayout>
	);
};

export default Network;
