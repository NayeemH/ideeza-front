import ViewBlog from '@features/user/blog/ViewBlog';
import UserLayout from '@layouts/private/template/user';

export default function AddBlogPreview() {
	return (
		<UserLayout title="Blog-Details | User Dashboard | IDEEZA | AI Based SAAS">
			<>
				<ViewBlog />
			</>
		</UserLayout>
	);
}
