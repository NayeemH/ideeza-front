import UserPro from '@features/user/project/create';
import UserLayout from '@layouts/private/template/user';

export default function BlogPage() {
	return (
		<UserLayout
			title="User Pro | User Dashboard | IDEEZA | AI Based SAAS"
			hideMyIdeeza={true}
		>
			<>
				<UserPro />
			</>
		</UserLayout>
	);
}
