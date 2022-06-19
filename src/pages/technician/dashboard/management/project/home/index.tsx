import ProjectHome from '@features/technician/dashboard/management/AddNewProject';
import TechnicianLayout from '@layouts/private/template/technician';
import React from 'react';

const Projects = () => {
	return (
		<TechnicianLayout>
			<ProjectHome />
		</TechnicianLayout>
	);
};

export default Projects;
