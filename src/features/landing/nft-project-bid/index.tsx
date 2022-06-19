import ProjectDetail from '@features/user/projects/project-details';
import { useRouter } from 'next/router';
import React from 'react';

export default function NftProjectBidHome() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<div className="bg-header pt-20"></div>
			<div className="p-[40px]">
				<ProjectDetail projectId={id} />
			</div>
		</>
	);
}
