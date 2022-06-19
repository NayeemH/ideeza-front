import ManageAvatars from '@features/admin/users/avatars/ManageAvatars';
import AdminLayout from '@layouts/private/template/admin';
import React from 'react';

const MarketingAvatars = () => {
	return (
		<AdminLayout>
			<ManageAvatars />
		</AdminLayout>
	);
};

export default MarketingAvatars;
