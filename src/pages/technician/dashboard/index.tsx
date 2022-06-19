import Dashboard from '@features/technician/dashboard';
import TechnicianLayout from 'layouts/private/template/technician';
import React from 'react';

const TechnicianDashboard = () => {
	return (
		<TechnicianLayout title="Technician Dashboard - IDEEZA | AI Based SAAS">
			<Dashboard />
		</TechnicianLayout>
	);
};

export default TechnicianDashboard;
