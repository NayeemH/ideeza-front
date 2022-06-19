// import SeeAll from "@features/user/my-projects/private-projects";
import SeeAllPublic from '@features/user/projects/public-projects';
import UserLayout from '@layouts/private/template/user';
// import { useRouter } from "next/router";
import React from 'react';

const PrivateProjects = () => {
	// const router = useRouter();
	// console.log(router.query);

	return (
		<UserLayout title="Public Projects">
			<>
				<SeeAllPublic />
			</>
		</UserLayout>
	);
};

export default PrivateProjects;
