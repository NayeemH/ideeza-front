import React from 'react';
import UserLayout from '@layouts/private/template/user';
import TopProjectsHome from '@features/user/top-projects';

const TopProjects = () => {
	return (
		<UserLayout title="Top Projects | User Dashboard | IDEEZA | AI Based SAAS">
			<>
				<TopProjectsHome />
			</>
		</UserLayout>
	);
};

export default TopProjects;
