import TechProject from '@features/technician/dashboard/projects/projects';
import TechnicianLayout from '@layouts/private/template/technician';

export default function Project() {
	return (
		<TechnicianLayout>
			<TechProject />
		</TechnicianLayout>
	);
}
