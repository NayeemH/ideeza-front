import Privacy from '@features/admin/settings/Privacy';
import AdminSettingsLayout from '@layouts/private/template/admin/AdminSettingsLayout';
import React from 'react';

const AdminPrivacySettings = () => {
	return (
		<AdminSettingsLayout title="Admin Settings - IDEEZA | AI Based SAAS">
			<>
				<Privacy />
			</>
		</AdminSettingsLayout>
	);
};

export default AdminPrivacySettings;
