import AddArticle from '@features/user/blog/AddUserBlog';
import UserLayout from '@layouts/private/template/user';

export default function AddBlogPage() {
	return (
		<UserLayout title="Blog | User Dashboard | IDEEZA | AI Based SAAS">
			<AddArticle />
		</UserLayout>
	);
}
