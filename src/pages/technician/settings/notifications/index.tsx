import React from 'react';
import TechnicianSettingsLayout from '@layouts/private/template/settings';
import NotificationsSettings from '@features/technician/settings/NotificationsSettings';

const TechnicianNotifications = () => {
	return (
		<TechnicianSettingsLayout title="Technician Settings - IDEEZA | AI Based SAAS">
			<>
				<NotificationsSettings />
			</>
		</TechnicianSettingsLayout>
	);
};

export default TechnicianNotifications;
