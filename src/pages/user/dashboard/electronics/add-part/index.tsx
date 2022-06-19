import AddPartElectronics from '@features/technician/electronics/add-part';
import UserLayout from '@layouts/private/template/user';

export default function ElectronicsPage() {
	return (
		<UserLayout>
			<AddPartElectronics />
		</UserLayout>
	);
}
