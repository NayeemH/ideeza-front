import ManageCertifications from '@features/technician/dashboard/management/ManageCertifications';
import TechnicianLayout from '@layouts/private/template/technician';
import React from 'react';

const Certifications = () => {
	return (
		<TechnicianLayout>
			<ManageCertifications />
		</TechnicianLayout>
	);
};

export default Certifications;
