import Button from '@atoms/button';
import Label from '@atoms/label';
import React from 'react';
function PaymentMethod(props: any) {
	const { isWallet, toggleOpen, setSecondOpen } = props;
	return (
		<>
			<div className="flex items-start space-x-6">
				<img
					src={
						isWallet ? '/images/logo/wallet-img.png' : '/images/logo/paypal-icon-c.png'
					}
					className="w-[60px]"
					alt="paypal"
				/>
				<div className="md:flex items-center md:space-x-4 space-y-3">
					<div>
						<Label
							value={isWallet ? 'Wallet' : 'Paypal'}
							classes={{
								root: `text-base 2xl:text-xl font-semibold font-sans tracking-tight text-gray-700 -mt-1`,
							}}
						/>
						<Label
							value="- $1 USD IDEEZA withdrawal fee"
							classes={{
								root: `text-base 2xl:text-xl text-gray-700 tracking-tight font-sans`,
							}}
						/>
						<Label
							classes={{
								root: 'text-base 2xl:text-xl txet-sm tracking-tight text-gray-700',
							}}
							value={
								<>
									- Paypal may charge
									<span className="text-primary text-base 2xl:text-xl">
										{' '}
										additional fees{' '}
									</span>
									for sending and withdrawing funds.
									<span className="text-primary text-base 2xl:text-xl">
										{' '}
										Don't have a Paypal account?
									</span>
								</>
							}
						/>
					</div>
					{isWallet ? (
						// Wallet Corrent Button
						<Button
							value="Set Up"
							className={`text-primary font-sans px-4 py-2 w-56 border border-solid border-primary tracking-tight text-base 2xl:text-xl shadow-none bg-white rounded-lg capitalize`}
							//   classes={{
							//     root: `text-primary font-sans px-4 py-2 w-56 border border-solid border-primary tracking-tight text-base 2xl:text-xl shadow-none bg-white rounded-lg capitalize`,
							//   }}
							onClick={() => {
								setSecondOpen(true);
								toggleOpen();
							}}
						/>
					) : (
						<Button
							value="Set Up"
							className={`text-primary font-sans px-4 py-2 w-56 border border-solid border-primary tracking-tight text-base 2xl:text-xl shadow-none bg-white rounded-lg capitalize`}
							//   classes={{
							//     root: `text-primary font-sans px-4 py-2 w-56 border border-solid border-primary tracking-tight text-base 2xl:text-xl shadow-none bg-white rounded-lg capitalize`,
							//   }}
						/>
					)}
				</div>
			</div>
		</>
	);
}
export default PaymentMethod;
