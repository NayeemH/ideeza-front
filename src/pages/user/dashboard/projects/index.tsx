import ProjectHome from '@features/user/projects';
import UserLayout from '@layouts/private/template/user';
import React from 'react';

const MyProjects = () => {
	return (
		<UserLayout title="My-Projects">
			<>
				<ProjectHome />
			</>
		</UserLayout>
	);
};

export default MyProjects;
