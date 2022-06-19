import AdminSettingsLayout from '@layouts/private/template/admin/AdminSettingsLayout';
import General from '@features/admin/settings/General';
import React from 'react';

const AdminGeneral = () => {
	return (
		<AdminSettingsLayout title="Admin Settings - IDEEZA | AI Based SAAS">
			<>
				<General />
			</>
		</AdminSettingsLayout>
	);
};

export default AdminGeneral;
