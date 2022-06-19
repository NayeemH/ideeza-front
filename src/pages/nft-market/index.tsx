import { getProjects } from '@features/landing/home/api';
import NftMarketHome from '@features/landing/nft-market';
import FreelancerSignUpPopup from '@organisms/freelancer-signup-popup';
import ManufacturerSignUpPopup from '@organisms/manufacturer-signup';
import PublicLayout from 'layouts/public';

const NftMarket = (props: any) => {
	return (
		<PublicLayout
			title="IDEEZA | AI Based SAAS - NFT Market"
			isSupport="isSupport"
		>
			<ManufacturerSignUpPopup />
			<FreelancerSignUpPopup />
			<NftMarketHome projects={props.projectsData} />
		</PublicLayout>
	);
};

export default NftMarket;

export const getServerSideProps = async (_context: any) => {
	const projectsData: any = await getProjects(`?page=1&page_size=9`);
	const projects = projectsData?.results;

	return {
		props: {
			projects,
		},
	};
};
