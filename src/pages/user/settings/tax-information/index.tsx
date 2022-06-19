import TaxInformation from '@features/user/settings/TaxInformation';
import UserSettingsLayout from '@layouts/private/template/user/UserSettingsLayout';
import React from 'react';

const UserTaxInformationSettings = () => {
	return (
		<UserSettingsLayout title="User Settings - IDEEZA | AI Based SAAS">
			<>
				<TaxInformation />
			</>
		</UserSettingsLayout>
	);
};

export default UserTaxInformationSettings;
