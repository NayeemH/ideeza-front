import GetPaid from '@features/admin/settings/GetPaid';
import AdminSettingsLayout from '@layouts/private/template/admin/AdminSettingsLayout';
import React from 'react';

const AdminGetPaidSettings = () => {
	return (
		<AdminSettingsLayout title="Admin Settings - IDEEZA | AI Based SAAS">
			<>
				<GetPaid />
			</>
		</AdminSettingsLayout>
	);
};

export default AdminGetPaidSettings;
