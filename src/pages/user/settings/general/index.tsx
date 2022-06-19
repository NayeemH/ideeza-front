import General from '@features/user/settings/General';
import UserSettingsLayout from '@layouts/private/template/user/UserSettingsLayout';
import React from 'react';

const UserGeneralSettings = () => {
	return (
		<UserSettingsLayout title="User Settings - IDEEZA | AI Based SAAS">
			<>
				<General />
			</>
		</UserSettingsLayout>
	);
};

export default UserGeneralSettings;
