import BlogPreview from '@features/technician/blog/BlogPreview';
import TechnicianLayout from '@layouts/private/template/technician';

export default function Preview() {
	return (
		<TechnicianLayout>
			<BlogPreview />
		</TechnicianLayout>
	);
}
