import PricingPayment from '@organisms/pricing-payment';
import { useRouter } from 'next/router';

const UserPayment = (props: any) => {
	const router = useRouter();

	return (
		<PricingPayment
			onClickCancelPaymentCards={() => router.push('/user/dashboard/cart')}
			onClickCancelPaymentPaypal={() => router.push('/user/dashboard/cart')}
			onSuccesPaymentPaypal={() => router.push('/user/dashboard/cart')}
			// onSuccesPaymentCards={() => false} // TODO: uncomment and write logic when fix card payment
		/>
	);
};

export default UserPayment;
