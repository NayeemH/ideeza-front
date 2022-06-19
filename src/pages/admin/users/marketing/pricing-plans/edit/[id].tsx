import AdminLayout from '@layouts/private/template/admin';
import React from 'react';
import ManageEditPricingPlan from '@features/admin/users/pricing-plans/ManageEditPricingPlan';

const EditStory = () => {
	return (
		<AdminLayout>
			<ManageEditPricingPlan />
		</AdminLayout>
	);
};

export default EditStory;
