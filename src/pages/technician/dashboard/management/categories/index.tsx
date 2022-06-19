import ManageCategories from '@features/technician/dashboard/management/ManageCategories';
import TechnicianLayout from '@layouts/private/template/technician';
import React from 'react';

const index = () => {
	return (
		<TechnicianLayout>
			<ManageCategories />
		</TechnicianLayout>
	);
};

export default index;
