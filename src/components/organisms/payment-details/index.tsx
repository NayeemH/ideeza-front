import Button from '@atoms/button';
import Input from '@atoms/input';
import Label from '@atoms/label';
import PaymentMethodPopup from '@organisms/payment-method-popup';
import React, { useState } from 'react';

interface PaymentDetailsProps {
	value: string;
	value2?: string | React.ReactNode;
	btnValue?: string;
	value2Class?: string;
	// SelectedPaymentClass?:string,
	bottomClass?: string;
	labelBtnClass?: string;
	btnValue2?: string;
	btnClass2?: string;
	btnClass?: string;
	noSetupClass: string;
}

function PaymentDetails(props: PaymentDetailsProps) {
	const [popup, SetPopup] = useState(false);
	const toggleOpen = () => SetPopup(!popup);
	const {
		value,
		value2,
		btnValue,
		value2Class,
		// SelectedPaymentClass,
		bottomClass,
		labelBtnClass,
		btnValue2,
		btnClass2,
		btnClass,
		noSetupClass,
	} = props;
	return (
		<div className="pt-[26px] pb-[31px] px-[30px] bg-white rounded ">
			<div className="flex justify-between">
				<div className="">
					<Label
						value={value}
						classes={{
							root: `text-primary font-bold text-xl xl:text-2xl 2xl:text-[26px] pb-1 tracking-normal `,
						}}
					/>
					<hr className="w-10 border-t border-primary" />
				</div>
				<Button
					value={btnValue}
					onClick={toggleOpen}
					className={`capitalize text-white bg-primary leading-none rounded-md  py-2 md:px-10 px-8 text-base 2xl:text-lg ${btnClass}`}
					color="primary"
					// classes={{
					//   root: `capitalize text-white bg-primary leading-none rounded-md  py-2 md:px-10 px-8 text-base 2xl:text-xl ${btnClass}`,
					// }}
				/>
			</div>
			<div className={`${noSetupClass}`}>
				<Label
					value="You have no setup with any payment methods yet."
					classes={{
						root: `text-sm md:text-base font-semibold  mt-5 text-[#333333]`,
					}}
				/>
				<Label
					value="Tell us how you want to receive your funds."
					classes={{
						root: `text-sm md:text-base  mt-3 text-[#999999]`,
					}}
				/>
				<Label
					value="It may take up to 3 days to activate your payment method."
					classes={{ root: `text-sm md:text-base  text-[#999999]` }}
				/>
			</div>

			<div className={`flex items-center justify-between pb-1 pt-6 ${labelBtnClass}`}>
				<Label
					classes={{ root: ` ${value2Class}` }}
					value={value2}
				/>
				<Button
					value={btnValue2}
					size="medium"
					className={`capitalize text-white leading-none bg-[#999999] rounded-md  py-5 px-6  text-base 2xl:text-lg ${btnClass2}`}
					color="secondary"
					// classes={{
					//   root: `capitalize text-white leading-none bg-gray-900 rounded-md  py-5 px-6  text-base 2xl:text-xl ${btnClass2}`,
					// }}
				/>
			</div>
			<div className={`${bottomClass}`}>
				<Label
					value="The credit balance from coupons will be automatically applien when you buy a product."
					classes={{ root: `text-sm md:text-base text-[#999999] ` }}
				/>
				<Label
					value="Enter Ideeza coupon code"
					classes={{
						root: `text-sm md:text-base mt-5 text-[#666666]  pb-2`,
					}}
				/>
				<div className="flex space-x-4 md:justify-start justify-between pb-4">
					<div className="md:w-2/4 w-2/4">
						<Input
							position="start"
							className={{
								root: 'bg-[#FBFBFB] ml-0 text-[#a9a7a7] text-xl rounded-lg border border-[#FBFBFB]',
							}}
							placeholder="Enter code"
						/>
					</div>
					<Button
						value="Apply to Account"
						size="large"
						className={
							'capitalize text-white leading-none bg-primary w-auto font-medium py-1 lg:px-9 md:px-6 px-4  text-sm md:text-base'
						}
						color="primary"
						// classes={{
						//   root: "capitalize text-white leading-none bg-primary w-auto font-medium py-1 lg:px-9 md:px-6 px-4  text-sm md:text-base",
						// }}
					/>
				</div>
			</div>
			<PaymentMethodPopup
				open={popup}
				toggleOpen={toggleOpen}
			/>
		</div>
	);
}
export default PaymentDetails;
