import PersonalData from '@features/user/settings/PersonalData';
import UserSettingsLayout from '@layouts/private/template/user/UserSettingsLayout';

import React from 'react';

const UserPersonalDataSettings = () => {
	return (
		<UserSettingsLayout title="User Settings - IDEEZA | AI Based SAAS">
			<>
				<PersonalData />
			</>
		</UserSettingsLayout>
	);
};

export default UserPersonalDataSettings;
