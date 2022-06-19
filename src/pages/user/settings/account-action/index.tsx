import AccountAction from '@features/user/settings/AccountAction';
import UserSettingsLayout from '@layouts/private/template/user/UserSettingsLayout';
import React from 'react';

const UserAccountActionSettings = () => {
	return (
		<UserSettingsLayout title="User Settings - IDEEZA | AI Based SAAS">
			<>
				<AccountAction />
			</>
		</UserSettingsLayout>
	);
};

export default UserAccountActionSettings;
