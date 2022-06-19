import Message from '@features/message';
import TechnicianLayout from '@layouts/private/template/technician';

export default function MessagePage() {
	return (
		<TechnicianLayout title="Message Page, Technician - IDEEZA | AI Based SAAS">
			<>
				<Message />
			</>
		</TechnicianLayout>
	);
}
