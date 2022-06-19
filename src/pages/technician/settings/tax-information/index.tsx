import React from 'react';
import TechnicianSettingsLayout from '@layouts/private/template/settings';
import TaxInformation from '@features/technician/settings/TaxInformation';

const TechnicianTaxInformation = () => {
	return (
		<TechnicianSettingsLayout title="Technician Settings - IDEEZA | AI Based SAAS">
			<>
				<TaxInformation />
			</>
		</TechnicianSettingsLayout>
	);
};

export default TechnicianTaxInformation;
