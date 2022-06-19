import React from 'react';
import UserLayout from '@layouts/private/template/user';
import UserNotification from '@features/user/dashboard/notifications';

const UserNotifications = () => {
	return (
		<UserLayout>
			<>
				<UserNotification />
			</>
		</UserLayout>
	);
};

export default UserNotifications;
