import Privacy from '@features/user/settings/Privacy';
import UserSettingsLayout from '@layouts/private/template/user/UserSettingsLayout';
import React from 'react';

const UserPrivacySettings = () => {
	return (
		<UserSettingsLayout title="User Settings - IDEEZA | AI Based SAAS">
			<>
				<Privacy />
			</>
		</UserSettingsLayout>
	);
};

export default UserPrivacySettings;
