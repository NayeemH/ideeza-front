import NftProjectBidHome from '@features/landing/nft-project-bid';
import PublicLayout from 'layouts/public';
import FreelancerSignUpPopup from '@organisms/freelancer-signup-popup';
import ManufacturerSignUpPopup from '@organisms/manufacturer-signup';

const NftProjectBid = () => {
	return (
		<PublicLayout title="IDEEZA | AI Based SAAS - NFT Market">
			<ManufacturerSignUpPopup />
			<FreelancerSignUpPopup />
			<NftProjectBidHome />
		</PublicLayout>
	);
};

export default NftProjectBid;
