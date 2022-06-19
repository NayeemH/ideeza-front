import SeeAllPrivate from '@features/user/projects/private-projects';

import UserLayout from '@layouts/private/template/user';

import React from 'react';

const PrivateProjects = () => {
	// const router = useRouter();
	// console.log(router.query);

	return (
		<UserLayout title="Project-details">
			<>
				<SeeAllPrivate />
			</>
		</UserLayout>
	);
};

export default PrivateProjects;
