import React from 'react';
import ProjectProductDetails from '@features/technician/dashboard/management/ProductDetails';
import TechnicianLayout from '@layouts/private/template/technician';

const ProductDetails = () => {
	return (
		<TechnicianLayout>
			<ProjectProductDetails />
		</TechnicianLayout>
	);
};

export default ProductDetails;
