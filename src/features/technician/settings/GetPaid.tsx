import React from 'react';
import Label from '@atoms/label';
import PaymentDetails from '@organisms/payment-details';
import PaidWithdraw from '@organisms/withdrawer';

function GetPaid() {
	return (
		<div className="space-y-4 md:w-10/12 lg:w-8/12 w-full pb-4 font-proxima-nova">
			<Label
				value="Get paid"
				classes={{
					root: 'text-primary text-xl xl:text-2xl 2xl:text-3xl font-semibold pb-3 border-b border-[#E6E6E6]',
				}}
			/>
			<PaidWithdraw />
			<PaymentDetails
				value="Balance"
				btnClass="hidden"
				noSetupClass="hidden"
				value2Class="text-[#333333] text-base 2xl:text-xl font-semibold"
				value2="Your balance is $0.00"
				btnValue2="Get paid now"
				bottomClass="hidden"
				// SelectedPaymentClass="hidden"
			/>
			<PaymentDetails
				value="Payment details"
				btnValue="Add method"
				labelBtnClass="hidden"
				bottomClass="hidden"
				noSetupClass="pb-2"
				// SelectedPaymentClass="pb-2"
			/>
			<PaymentDetails
				value="Payment details"
				btnValue="Add method"
				btnClass2="hidden"
				// SelectedPaymentClass="hidden"
				value2Class="text-[#333333] texl-lg 2xl:text-xl font-semibold"
				value2={
					<>
						Ideeza coupon balance: <span className="">$0</span>
					</>
				}
				btnClass="hidden"
				noSetupClass="hidden"
			/>
		</div>
	);
}

export default GetPaid;
