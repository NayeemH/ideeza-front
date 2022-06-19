import ServiceProviderProfile from '@features/service-provider/profile-preview/ServiceProviderProfile';
import ServiceProviderLayout from '@layouts/private/template/service-provider';
import React from 'react';

const ProfilePreview = () => {
	return (
		<ServiceProviderLayout title="IDEEZA | AI Based SAAS- Service Provider- Profile">
			<ServiceProviderProfile />
		</ServiceProviderLayout>
	);
};

export default ProfilePreview;
