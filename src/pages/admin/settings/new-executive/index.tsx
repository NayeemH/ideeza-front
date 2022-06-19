import AddNewExecutive from '@features/admin/settings/AddNewExecutive';
import AdminSettingsLayout from '@layouts/private/template/admin/AdminSettingsLayout';
import React from 'react';

const AdminNewExecutive = () => {
	return (
		<AdminSettingsLayout title="Admin Settings - IDEEZA | AI Based SAAS">
			<>
				<AddNewExecutive />
			</>
		</AdminSettingsLayout>
	);
};

export default AdminNewExecutive;
