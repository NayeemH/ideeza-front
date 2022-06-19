// import GetPaid from "@features/user/settings/GetPaid";
import GetPaid from '@features/technician/settings/GetPaid';
import UserSettingsLayout from '@layouts/private/template/user/UserSettingsLayout';
import React from 'react';

const UserGetPaidSettings = () => {
	return (
		<UserSettingsLayout title="User Settings - IDEEZA | AI Based SAAS">
			<>
				<GetPaid />
				{/* this getPaid should be imported from user/settings */}
			</>
		</UserSettingsLayout>
	);
};

export default UserGetPaidSettings;
