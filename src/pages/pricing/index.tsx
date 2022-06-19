import PricingPlans from '@features/landing/pricing';
import { getPricingPlans } from '@features/landing/pricing/api';
import { IPricingPlan } from '@models/pricing-plan';
import PublicLayout from 'layouts/public';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import FreelancerSignUpPopup from '@organisms/freelancer-signup-popup';
import ManufacturerSignUpPopup from '@organisms/manufacturer-signup';

const PricingLanding = (props: any) => {
	const router = useRouter();
	const { data: session } = useSession();

	return (
		<PublicLayout isSupport="hauay">
			<ManufacturerSignUpPopup />
			<FreelancerSignUpPopup />
			<PricingPlans
				pricingPlans={props.pricingPlans}
				onSuccessAddToCart={() =>
					router.push(`/${session?.user?.role.toLowerCase()}/dashboard/cart`)
				}
				onFailedAddToCart={() => false}
				// isPricingSlider={true}
			/>
		</PublicLayout>
	);
};

export default PricingLanding;

export const getServerSideProps = async () => {
	const pricingPlans: IPricingPlan[] = await getPricingPlans();

	return {
		props: {
			pricingPlans,
		},
	};
};
