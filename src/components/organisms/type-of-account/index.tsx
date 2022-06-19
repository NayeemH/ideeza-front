import Button from '@atoms/button';
import Label from '@atoms/label';
import PricingPopup from '@organisms/pricing-popup';
import PricingPaymentPopup from '@organisms/pricing-payment-popup';
import React, { useState } from 'react';
import { useAppSelector } from 'app/hooks';
import { capitalize } from 'utils/utils';
// import Tooltip from "@mui/material/Tooltip";
// import { format } from "date-fns";
// import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";

const TypeYourAccount: React.FC<any> = ({ plan, loading }) => {
	const userSubscription = useAppSelector(({ auth }) => auth?.userData?.current_subscription);

	const [popup, setPopup] = useState(false);
	const [popupPayment, setPopupPayment] = useState(false);

	const toggleOpen = () => setPopup(!popup);

	const togglePayment = () => {
		setPopup(false);
		setPopupPayment(!popupPayment);
	};

	return (
		<>
			<div className="rounded-lg bg-white md:p-7 md:px-6 p-4">
				<div className="flex flex-col items-start  md:py-2 pb-2">
					{loading ? (
						<Label
							value={'Loading subscription plan info...'}
							className="text-gray-500 font-semibold 2xl:text-xl text-base"
						/>
					) : (
						<Label
							value={
								plan?.name ? (
									<span className="flex items-center w-full">
										<span>{`Your account plan is`}</span>
										<span className="font-bold ml-1">
											{`${capitalize(plan?.name)}`}
										</span>
										<span className="font-medium text-base ml-1">
											{`(${capitalize(userSubscription?.package)})`}
										</span>
										{
											// TODO: Tooltip is not showing, fix the issue and uncomment the code block
											// userSubscription?.is_active ? (
											//   <Tooltip
											//     title={
											//       <>
											//         {`
											//           Your subscription plan is active
											//           ${
											//             userSubscription?.cancellation_date ?
											//             `and will expire at ${format(new Date(userSubscription?.cancellation_date), "dd MMMM, yyyy")}` :
											//             ''
											//           }.
											//         `}
											//       </>
											//     }
											//   >
											//     <FaCalendarCheck />
											//   </Tooltip>
											// ) : (
											//   <Tooltip
											//     title={
											//       <>
											//         {`
											//           Your subscription plan is not active
											//           ${
											//             userSubscription?.cancellation_date ?
											//             `and has expired at ${format(new Date(userSubscription?.cancellation_date), "dd MMMM, yyyy")}` :
											//             ''
											//           }.
											//         `}
											//       </>
											//     }
											//   >
											//     <FaCalendarTimes />
											//   </Tooltip>
											// )
										}
									</span>
								) : (
									'You are not subscribed any plan yet!'
								)
							}
							className="text-gray-700 font-semibold 2xl:text-xl text-base"
						/>
					)}
					<Button
						value="Your pricing plan"
						onClick={toggleOpen}
						classes={{
							root: 'bg-primary md:w-60 px-3 mt-4 text-base 2xl:text-xl tracking-tight shadow-none capitalize text-white',
						}}
						color="primary"
					/>
				</div>
				<Label
					value={
						<>
							To change your pricing plan,{' '}
							<span
								onClick={toggleOpen}
								className="text-primary underline text-base  font-semibold cursor-pointer"
							>
								click here
							</span>
						</>
					}
					className="text-gray-700 text-left font-sans text-base  tracking-tight"
				/>
				<PricingPopup
					open={popup}
					toggleOpen={toggleOpen}
					onSuccessAddToCart={togglePayment}
				/>
				<PricingPaymentPopup
					open={popupPayment}
					toggleOpen={togglePayment}
					onClickCancelPaymentCards={() => setPopupPayment(!popupPayment)}
					onClickCancelPaymentPaypal={() => setPopupPayment(!popupPayment)}
					onSuccesPaymentPaypal={() => setPopupPayment(!popupPayment)}
					// onSuccesPaymentCards={() => false} // TODO: uncomment and write logic when fix card payment
				/>
			</div>
		</>
	);
};

export default TypeYourAccount;
