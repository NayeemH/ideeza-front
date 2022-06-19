import React from 'react';
import TechnicianSettingsLayout from '@layouts/private/template/settings';
import SecuritySettings from '@features/technician/settings/SecuritySettings';

const TechnicianSecurity = () => {
	return (
		<TechnicianSettingsLayout title="Technician Settings - IDEEZA | AI Based SAAS">
			<>
				<SecuritySettings />
			</>
		</TechnicianSettingsLayout>
	);
};

export default TechnicianSecurity;
