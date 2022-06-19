import React from 'react';
import PublicLayout from '@layouts/public';
import ProductDetail from '@features/landing/product/product-details';

const ProductDetails = () => {
	return (
		<div>
			<PublicLayout isSupport="isSupport">
				<>
					<div className="pt-[110px] " />
					<div className="px-[100px]">
						<ProductDetail />
					</div>
				</>
			</PublicLayout>
		</div>
	);
};

export default ProductDetails;
