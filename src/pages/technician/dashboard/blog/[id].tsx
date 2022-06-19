import SingleBlog from '@features/technician/blog/SingleBlog';
import TechnicianLayout from '@layouts/private/template/technician';

export default function BlogPage() {
	return (
		<TechnicianLayout>
			<SingleBlog />
		</TechnicianLayout>
	);
}
