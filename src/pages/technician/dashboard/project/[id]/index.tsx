import ProjectDetails from '@features/technician/dashboard/projects/ProjectDetails';
import TechnicianLayout from '@layouts/private/template/technician';

export default function Project() {
	return (
		<TechnicianLayout>
			<ProjectDetails />
		</TechnicianLayout>
	);
}
