import React from 'react';
import UserLayout from '@layouts/private/template/user';
import PricingPaymentHome from '@organisms/pricing-payment';

const TestPricingPayment = () => {
	return (
		<UserLayout title="My Payment | User Dashboard | IDEEZA | AI Based SAAS">
			<div className="px-[44px] ">
				<PricingPaymentHome />
			</div>
		</UserLayout>
	);
};

export default TestPricingPayment;
