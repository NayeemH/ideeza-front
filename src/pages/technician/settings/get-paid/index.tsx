import React from 'react';
import TechnicianSettingsLayout from '@layouts/private/template/settings';
import GetPaid from '@features/technician/settings/GetPaid';

const TechnicianGetPaid = () => {
	return (
		<TechnicianSettingsLayout title="Technician Settings - IDEEZA | AI Based SAAS">
			<>
				<GetPaid />
			</>
		</TechnicianSettingsLayout>
	);
};

export default TechnicianGetPaid;
