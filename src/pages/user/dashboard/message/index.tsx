import Message from '@features/message';
import UserLayout from '@layouts/private/template/user';

export default function MessagePage() {
	return (
		<UserLayout title="Message | User Dashboard | IDEEZA | AI Based SAAS">
			<>
				<Message />
			</>
		</UserLayout>
	);
}
