import Corporations from '@features/technician/dashboard/management/Corporations';
import TechnicianLayout from '@layouts/private/template/technician';
import React from 'react';

const CorporationsManagement = () => {
	return (
		<TechnicianLayout>
			<Corporations />
		</TechnicianLayout>
	);
};

export default CorporationsManagement;
