import Machines from '@features/technician/dashboard/management/Machines';
import TechnicianLayout from '@layouts/private/template/technician';
import React from 'react';

const TechnicianMachines = () => {
	return (
		<TechnicianLayout>
			<Machines />
		</TechnicianLayout>
	);
};

export default TechnicianMachines;
