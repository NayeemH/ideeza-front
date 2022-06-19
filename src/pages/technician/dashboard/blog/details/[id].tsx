import ViewBlog from '@features/technician/blog/ViewBlog';
import TechnicianLayout from '@layouts/private/template/technician';

export default function AddBlogPreview() {
	return (
		<TechnicianLayout title="Blog-Details | Technician Dashboard | IDEEZA | AI Based SAAS">
			<>
				<ViewBlog />
			</>
		</TechnicianLayout>
	);
}
