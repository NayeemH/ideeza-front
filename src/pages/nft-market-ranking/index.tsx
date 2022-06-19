import NftMarketRankingHome from '@features/landing/nft-market-ranking';
import PublicLayout from 'layouts/public';
import FreelancerSignUpPopup from '@organisms/freelancer-signup-popup';
import ManufacturerSignUpPopup from '@organisms/manufacturer-signup';

const NftMarketRanking = () => {
	return (
		<PublicLayout
			title="IDEEZA | AI Based SAAS - NFT Market"
			isSupport="isSupport"
		>
			<ManufacturerSignUpPopup />
			<FreelancerSignUpPopup />
			<NftMarketRankingHome />
		</PublicLayout>
	);
};

export default NftMarketRanking;
