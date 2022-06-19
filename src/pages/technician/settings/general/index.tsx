import React from 'react';
import TechnicianSettingsLayout from '@layouts/private/template/settings';
import GeneralSettings from '@features/technician/settings/GeneralSettings';

const TechnicianSettings = () => {
	return (
		<TechnicianSettingsLayout title="Technician Settings - IDEEZA | AI Based SAAS">
			<>
				<GeneralSettings />
			</>
		</TechnicianSettingsLayout>
	);
};

export default TechnicianSettings;
