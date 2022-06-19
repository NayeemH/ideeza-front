import Services from '@features/technician/dashboard/management/Services';
import TechnicianLayout from '@layouts/private/template/technician';
import React from 'react';

const TechnicianServices = () => {
	return (
		<TechnicianLayout>
			<Services />
		</TechnicianLayout>
	);
};

export default TechnicianServices;
