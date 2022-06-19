import NotificationsSettings from '@features/admin/settings/Notifications';
import AdminSettingsLayout from '@layouts/private/template/admin/AdminSettingsLayout';

import React from 'react';

const AdminNotificatioSettings = () => {
	return (
		<AdminSettingsLayout title="Admin Settings - IDEEZA | AI Based SAAS">
			<>
				<NotificationsSettings />
			</>
		</AdminSettingsLayout>
	);
};

export default AdminNotificatioSettings;
