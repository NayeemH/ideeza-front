import NotificationsSettings from '@features/user/settings/Notifications';
import UserSettingsLayout from '@layouts/private/template/user/UserSettingsLayout';

import React from 'react';

const UserNotificatioSettings = () => {
	return (
		<UserSettingsLayout title="User Settings - IDEEZA | AI Based SAAS">
			<>
				<NotificationsSettings />
			</>
		</UserSettingsLayout>
	);
};

export default UserNotificatioSettings;
