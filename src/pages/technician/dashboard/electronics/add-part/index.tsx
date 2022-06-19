import AddPartElectronics from '@features/technician/electronics/add-part';
import TechnicianLayout from '@layouts/private/template/technician';

export default function ElectronicsPage() {
	return (
		<TechnicianLayout>
			<AddPartElectronics />
		</TechnicianLayout>
	);
}
