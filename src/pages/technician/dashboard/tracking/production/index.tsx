import Production from '@features/technician/tracking/production';
import TechnicianLayout from '@layouts/private/template/technician';

export default function ProductionPage() {
	return (
		<TechnicianLayout title="Production Page, Technician - IDEEZA | AI Based SAAS">
			<>
				<Production />
			</>
		</TechnicianLayout>
	);
}
