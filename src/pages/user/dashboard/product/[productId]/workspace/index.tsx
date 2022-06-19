import Product from '@features/user/projects/project-details/workspace';
import UserLayout from '@layouts/private/template/user';
// import { useRouter } from "next/router";
import React from 'react';
import { useRouter } from 'next/router';
import CommonMeta from '@atoms/commonMeta';

const ProductDetails = () => {
	//   const router = useRouter();
	//   console.log(router.query);
	const router = useRouter();
	const { productId } = router.query;
	return (
		<UserLayout title="Product-details">
			<>
				<CommonMeta title="Product-details" />
				<Product productId={productId} />
			</>
		</UserLayout>
	);
};

export default ProductDetails;
