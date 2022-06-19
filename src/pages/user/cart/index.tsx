import UserCartHome from '@features/user/cart';
import UserLayout from '@layouts/private/template/user';

export default function BlogPage() {
	return (
		<UserLayout title="Cart | User Dashboard | IDEEZA | AI Based SAAS">
			<>
				<UserCartHome />
			</>
		</UserLayout>
	);
}
