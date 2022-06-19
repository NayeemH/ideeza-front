import TechnicianBlog from '@features/technician/blog';
import TechnicianLayout from '@layouts/private/template/technician';

export default function BlogPage() {
	return (
		<TechnicianLayout>
			<TechnicianBlog />
		</TechnicianLayout>
	);
}
