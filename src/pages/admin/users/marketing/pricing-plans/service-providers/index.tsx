import ManagePricing from '@features/admin/users/pricing-plans/ManagePricing';
import AdminLayout from '@layouts/private/template/admin';
import React from 'react';

const MarketingPricingPlans = () => {
	return (
		<AdminLayout>
			<ManagePricing plan_type="SERVICE_PROVIDER" />
		</AdminLayout>
	);
};

export default MarketingPricingPlans;
