import MyProfile from '@features/user/profile';
import UserLayout from '@layouts/private/template/user';
import React from 'react';

const UserProfile = () => {
	return (
		<UserLayout title="User Profile - IDEEZA | AI Based SAAS">
			<>
				<MyProfile />
			</>
		</UserLayout>
	);
};

export default UserProfile;
