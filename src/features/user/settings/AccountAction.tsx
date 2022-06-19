import Button from '@atoms/button';
import Label from '@atoms/label';
import DeleteAccountPopup from '@organisms/delete-account-popup';
import RemoveAccount from '@organisms/remove-account';
import React, { useState } from 'react';

function AccountAction() {
	const [popup, SetPopup] = useState(false);
	const toggleOpen = () => SetPopup(!popup);
	return (
		<div className="lg:w-7/12 md:w-8/12">
			<Label
				value="Remove the account"
				classes={{
					root: 'text-primary md:text-xl xl:text-2xl 2xl:text-3xl tracking-normal font-semibold font-sans pb-1 border-b border-gray-750 mb-3',
				}}
				selectdivclass="hidden"
			/>
			<RemoveAccount />
			<div className="flex justify-center pt-14">
				<Button
					value="Delete"
					onClick={toggleOpen}
					className={
						'bg-red-500 text-base 2xl:text-xl px-12 text-white py-2 capitalize tracking-tigh'
					}
					//   classes={{
					//     root: "t",
					//   }}
				/>
			</div>
			<DeleteAccountPopup
				open={popup}
				toggleOpen={toggleOpen}
			/>
		</div>
	);
}

export default AccountAction;
