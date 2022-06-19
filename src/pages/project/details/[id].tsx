import React from 'react';
import PublicLayout from '@layouts/public';
import ProjectDetail from '@features/landing/project/project-details';

const ProjectDetails = () => {
	return (
		<div>
			<PublicLayout isSupport="isSupport">
				<>
					<div className="pt-[110px] " />
					<div className="px-[100px] bg-[#F6F6F6]">
						<ProjectDetail />
					</div>
				</>
			</PublicLayout>
		</div>
	);
};

export default ProjectDetails;
