import UserPaymentHome from '@features/user/dashboard/user-payment';
import UserLayout from '@layouts/private/template/user';

const UserPayment = () => {
	return (
		<UserLayout title="User Payment - IDEEZA | AI Based SAAS">
			<>
				<UserPaymentHome />
			</>
		</UserLayout>
	);
};

export default UserPayment;
