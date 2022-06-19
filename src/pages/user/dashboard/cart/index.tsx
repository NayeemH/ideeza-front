import PricingCart from '@features/user/dashboard/cart';
import UserLayout from '@layouts/private/template/user';

const UserPricingCart = () => {
	return (
		<UserLayout title="User Payment - IDEEZA | AI Based SAAS">
			<>
				<PricingCart />
			</>
		</UserLayout>
	);
};

export default UserPricingCart;
