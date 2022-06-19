import SearchResult from '@features/user/dashboard/search-result';
import UserLayout from '@layouts/private/template/user';

export default function SearchResultPage() {
	return (
		<UserLayout title="Search | User Dashboard | IDEEZA | AI Based SAAS">
			<>
				<SearchResult />
			</>
		</UserLayout>
	);
}
