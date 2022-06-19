import ManageNotifications from '@features/admin/users/notifications/ManageNotifications';
import AdminLayout from '@layouts/private/template/admin';
import React from 'react';

const MarketingNotificationCenter = () => {
	return (
		<AdminLayout>
			<ManageNotifications />
		</AdminLayout>
	);
};

export default MarketingNotificationCenter;
