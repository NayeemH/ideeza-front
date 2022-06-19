import TaxInformation from '@features/admin/settings/TaxInformation';
import AdminSettingsLayout from '@layouts/private/template/admin/AdminSettingsLayout';
import React from 'react';

const AdminTaxInformationSettings = () => {
	return (
		<AdminSettingsLayout title="Admin Settings - IDEEZA | AI Based SAAS">
			<>
				<TaxInformation />
			</>
		</AdminSettingsLayout>
	);
};

export default AdminTaxInformationSettings;
