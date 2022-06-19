import React from 'react';
import ProjectDetail from '@features/user/projects/project-details';
import UserLayout from '@layouts/private/template/user';
// import { useRouter } from "next/router";
import { useRouter } from 'next/router';

const ProjectDetails = () => {
	const router = useRouter();
	const { id } = router.query;
	// const router = useRouter();
	// console.log(router.query);

	return (
		<UserLayout title="Project-details">
			<>
				<ProjectDetail projectId={id} />
			</>
		</UserLayout>
	);
};

export default ProjectDetails;
