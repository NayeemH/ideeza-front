import Review from '@features/technician/tracking/review';
import TechnicianLayout from '@layouts/private/template/technician';

export default function ReviewPage() {
	return (
		<TechnicianLayout title="Review Page, Technician - IDEEZA | AI Based SAAS">
			<>
				<Review />
			</>
		</TechnicianLayout>
	);
}
