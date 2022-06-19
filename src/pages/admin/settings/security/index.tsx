import Security from '@features/admin/settings/Security';
import AdminSettingsLayout from '@layouts/private/template/admin/AdminSettingsLayout';
import React from 'react';

const AdminSecuritySettings = () => {
	return (
		<AdminSettingsLayout title="Admin Settings - IDEEZA | AI Based SAAS">
			<>
				<Security />
			</>
		</AdminSettingsLayout>
	);
};

export default AdminSecuritySettings;
