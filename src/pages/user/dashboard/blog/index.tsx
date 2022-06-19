import UserBlog from '@features/user/blog';
import UserLayout from '@layouts/private/template/user';

export default function BlogPage() {
	return (
		<UserLayout title="Blog | User Dashboard | IDEEZA | AI Based SAAS">
			<>
				<UserBlog />
			</>
		</UserLayout>
	);
}
