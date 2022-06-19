import React from 'react';
import ProductDetail from '@features/user/projects/project-details/product-details';
import UserLayout from '@layouts/private/template/user';
import CommonMeta from '@atoms/commonMeta';

const ProductDetails = () => {
	return (
		<div>
			<UserLayout title="Product-details">
				<>
					<CommonMeta title="Product-details" />
					<div>
						<ProductDetail />
					</div>
				</>
			</UserLayout>
		</div>
	);
};

export default ProductDetails;
