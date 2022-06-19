import Contributors from '@features/user/settings/Contributors';
import UserSettingsLayout from '@layouts/private/template/user/UserSettingsLayout';
import React from 'react';

const UserContributorsSettings = () => {
	return (
		<UserSettingsLayout title="User Settings - IDEEZA | AI Based SAAS">
			<>
				<Contributors />
			</>
		</UserSettingsLayout>
	);
};

export default UserContributorsSettings;
