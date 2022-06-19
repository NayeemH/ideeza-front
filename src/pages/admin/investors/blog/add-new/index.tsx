import AddArticle from '@features/admin/investors/blog/AddAdminBlog';
import AdminLayout from '@layouts/private/template/admin';

export default function AddBlogPage() {
	return (
		<AdminLayout title="Blog | Admin Investor | IDEEZA | AI Based SAAS">
			<AddArticle />
		</AdminLayout>
	);
}
