import ManageTeam from '@features/admin/users/team/ManageTeam';
import AdminLayout from '@layouts/private/template/admin';
import React from 'react';

const MarketingTeam = () => {
	return (
		<AdminLayout>
			<ManageTeam />
		</AdminLayout>
	);
};

export default MarketingTeam;
