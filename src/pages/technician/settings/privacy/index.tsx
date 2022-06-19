import React from 'react';
import TechnicianSettingsLayout from '@layouts/private/template/settings';
import PrivacySettings from '@features/technician/settings/PrivacySettings';

const TechnicianPrivacy = () => {
	return (
		<TechnicianSettingsLayout title="Technician Settings - IDEEZA | AI Based SAAS">
			<>
				<PrivacySettings />
			</>
		</TechnicianSettingsLayout>
	);
};

export default TechnicianPrivacy;
