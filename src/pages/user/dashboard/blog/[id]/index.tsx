import SingleBlog from '@features/user/blog/SingleBlog';
import UserLayout from '@layouts/private/template/user';

export default function AddBlogPage() {
	return (
		<UserLayout title="Blog-details | User Dashboard | IDEEZA | AI Based SAAS">
			<SingleBlog />
		</UserLayout>
	);
}
