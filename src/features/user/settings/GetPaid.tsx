import Label from '@atoms/label';
import GetPaid1 from '@organisms/withdrawer';
import PaymentDetails from '@organisms/payment-details';
import { useAppSelector } from 'app/hooks';
import React, { useState, useEffect } from 'react';

function GetPaid() {
	const [auth, setAuth] = useState<any>(false);
	const [user, setUser] = useState({});

	const state = useAppSelector((state) => state?.auth);
	const data = useAppSelector((state) => state?.auth);
	useEffect(() => {
		setAuth(state);
	}, [state]);
	useEffect(() => {
		setUser(data);
	}, [auth, data]);
	return (
		<div className="space-y-4 md:w-10/12 lg:w-7/12 2xl:w-5/12 w-full pb-4 font-proxima-nova">
			<Label
				value="Get paid"
				classes={{
					root: 'text-primary text-xl xl:text-2xl 2xl:text-3xl font-semibold ',
				}}
			/>
			<GetPaid1 />
			<PaymentDetails
				value="Balance"
				btnClass="hidden"
				noSetupClass="hidden"
				value2Class="text-gray-300 text-base 2xl:text-xl"
				value2={`Your balance is $${user}`}
				btnValue2="Get paid now"
				bottomClass="hidden"
				// SelectedPaymentClass="hidden"
			/>
			<PaymentDetails
				value="Payment details"
				btnValue="Add method"
				labelBtnClass="hidden"
				bottomClass="hidden"
				noSetupClass="pb-2"
				// SelectedPaymentClass="pb-2"
			/>
			<PaymentDetails
				value="Payment details"
				btnValue="Add method"
				btnClass2="hidden"
				// SelectedPaymentClass="hidden"
				value2Class="text-gray-600 texl-lg 2xl:text-2xl"
				value2={
					<>
						Ideeza coupon balance:{' '}
						<span className="text-gray-300 text-lg">${user}</span>
					</>
				}
				btnClass="hidden"
				noSetupClass="hidden"
			/>
		</div>
	);
}

export default GetPaid;
