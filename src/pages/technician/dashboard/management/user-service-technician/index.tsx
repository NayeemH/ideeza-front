import UserServiceProviderTechnician from '@features/technician/dashboard/management/UserServiceProviderTechnician';
import TechnicianLayout from '@layouts/private/template/technician';
import React from 'react';

const UserServiceTechnician = () => {
	return (
		<TechnicianLayout>
			<UserServiceProviderTechnician />
		</TechnicianLayout>
	);
};

export default UserServiceTechnician;
