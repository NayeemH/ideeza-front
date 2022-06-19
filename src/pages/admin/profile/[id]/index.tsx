import MyProfile from '@features/admin/profile';
import AdminLayout from '@layouts/private/template/admin';
import React from 'react';

const AdminProfile = () => {
	return (
		<AdminLayout title="Admin Profile - IDEEZA | AI Based SAAS">
			<>
				<MyProfile />
			</>
		</AdminLayout>
	);
};

export default AdminProfile;
