import UserPro from '@features/user/product/edit';
import UserLayout from '@layouts/private/template/user';

export default function BlogPage() {
	return (
		<UserLayout title="User Pro | User Dashboard | IDEEZA | AI Based SAAS">
			<>
				<UserPro />
			</>
		</UserLayout>
	);
}
