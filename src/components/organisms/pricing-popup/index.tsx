import React, { useEffect, useState } from 'react';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import { PricingPopupProps } from 'models/user-project';
import PricingPlans from '@features/landing/pricing';
import { getPricingPlans } from '@features/landing/pricing/api';
import { IPricingPlan } from '@models/pricing-plan';
import { MdOutlineCancel } from 'react-icons/md';

const PricingPopup: React.FC<PricingPopupProps> = (props) => {
	const { open, toggleOpen, onSuccessAddToCart, onFailedAddToCart } = props;
	const [pricingPlans, setPricingPlans] = useState<any>();
	const getAllPricingPlans = async () => {
		const pricings: IPricingPlan[] = await getPricingPlans();
		setPricingPlans(pricings);
	};

	useEffect(() => {
		getAllPricingPlans();
	}, []);

	return (
		<div>
			<Modal
				width="xl"
				// width={false}
				className={{ paper: ' rounded-xl md:px-6 md:py-6 p-4' }}
				close={toggleOpen}
				header={
					<div className="mb-12 relative">
						<Label
							value="Pricing"
							classes={{
								root: `text-primary text-center tracking-tight font-proxima-nova text-3xl font-bold`,
							}}
						/>
						<Label
							value="Choose the pricing option"
							classes={{
								root: `text-center text-gray-700 tracking-tight font-proxima-nova text-xl mt-3`,
							}}
						/>
						<MdOutlineCancel
							onClick={toggleOpen}
							className="text-primary text-2xl absolute top-0 right-0 cursor-pointer"
						/>
					</div>
				}
				content={
					<div className="pt-2">
						<PricingPlans
							hideTitleSection
							pricingPlans={pricingPlans}
							onSuccessAddToCart={onSuccessAddToCart}
							onFailedAddToCart={onFailedAddToCart}
							isPricingSlider={true}
						/>
					</div>
				}
				actions={<></>}
				open={open}
			/>
		</div>
	);
};
export default PricingPopup;
