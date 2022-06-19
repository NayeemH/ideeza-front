import NftDemo from '@features/user/project/create/nft-demo';
import UserLayout from '@layouts/private/template/user';

export default function DemoNft() {
	return (
		<UserLayout
			title="User Pro | User Dashboard | IDEEZA | AI Based SAAS"
			hideMyIdeeza={true}
		>
			<>
				<NftDemo />
			</>
		</UserLayout>
	);
}
