import InvestorsAddNews from '@features/admin/investors/news/InvestorsAddNews';
import AdminLayout from '@layouts/private/template/admin';

export default function AddNewsPage() {
	return (
		<AdminLayout title="News | Admin Investor | IDEEZA | AI Based SAAS">
			<InvestorsAddNews />
		</AdminLayout>
	);
}
