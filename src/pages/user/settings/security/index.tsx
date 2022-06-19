import Security from '@features/user/settings/Security';
import UserSettingsLayout from '@layouts/private/template/user/UserSettingsLayout';
import React from 'react';

const UserSecuritySettings = () => {
	return (
		<UserSettingsLayout title="User Security-Settings - IDEEZA | AI Based SAAS">
			<>
				<Security />
			</>
		</UserSettingsLayout>
	);
};

export default UserSecuritySettings;
