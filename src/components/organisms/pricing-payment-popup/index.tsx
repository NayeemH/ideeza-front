import React from 'react';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import PricingPayment from '@organisms/pricing-payment';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from 'app/hooks';
import { setDataAsync } from 'reducers/auth';

interface PricingPaymentPopupProps {
	open: boolean;
	toggleOpen: (e?: any) => void;
	onClick?: (e?: any) => void;
	onClickI?: (e?: any) => void;
	onClickT?: (e?: any) => void;
	onSuccesPaymentCards?: () => void;
	onFailedPaymentCards?: () => void;
	onSuccesPaymentPaypal?: () => void;
	onFailedPaymentPaypal?: () => void;
	onClickCancelPaymentCards?: () => void;
	onClickSubmitPaymentCards?: () => void;
	onClickCancelPaymentPaypal?: () => void;
	onClickSubmitPaymentPaypal?: () => void;
}
const PricingPaymentPopup: React.FC<PricingPaymentPopupProps> = (props) => {
	const {
		open,
		toggleOpen,
		onSuccesPaymentCards,
		onFailedPaymentCards,
		onSuccesPaymentPaypal,
		onFailedPaymentPaypal,
		onClickCancelPaymentCards,
		onClickSubmitPaymentCards,
		onClickCancelPaymentPaypal,
		onClickSubmitPaymentPaypal,
	} = props;

	const dispatch = useAppDispatch();
	const { data: session, status } = useSession();

	return (
		<div>
			<Modal
				width="xl"
				close={toggleOpen}
				header={
					<div className="pt-12">
						<Label
							value="Pricing Payment"
							classes={{
								root: `text-primary text-center tracking-tight font-proxima-nova text-5xl font-bold mb-5`,
							}}
						/>
					</div>
				}
				content={
					<PricingPayment
						onSuccesPaymentCards={onSuccesPaymentCards}
						onFailedPaymentCards={onFailedPaymentCards}
						onSuccesPaymentPaypal={() => {
							if (status === 'authenticated') {
								dispatch(setDataAsync(Number(session?.user.id)));
							}
							if (typeof onSuccesPaymentPaypal == 'function') onSuccesPaymentPaypal();
						}}
						onFailedPaymentPaypal={onFailedPaymentPaypal}
						onClickCancelPaymentCards={onClickCancelPaymentCards}
						onClickSubmitPaymentCards={onClickSubmitPaymentCards}
						onClickCancelPaymentPaypal={onClickCancelPaymentPaypal}
						onClickSubmitPaymentPaypal={onClickSubmitPaymentPaypal}
					/>
				}
				actions={<></>}
				open={open}
			/>
		</div>
	);
};
export default PricingPaymentPopup;
