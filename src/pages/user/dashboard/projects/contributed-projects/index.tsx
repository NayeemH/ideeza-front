import SeeAllContributed from '@features/user/projects/contributed-projects';
import UserLayout from '@layouts/private/template/user';

import React from 'react';

const PrivateProjects = () => {
	// const router = useRouter();
	// console.log(router.query);

	return (
		<UserLayout title="Project-details">
			<>
				<SeeAllContributed />
			</>
		</UserLayout>
	);
};

export default PrivateProjects;
