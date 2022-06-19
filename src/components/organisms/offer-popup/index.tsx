import Button from '@atoms/button';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import OfferPopupBody from '@organisms/offer-popup-body';
import React from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';

function OfferPopup(props: any) {
	const { open, toggleOpen } = props;
	return (
		<div>
			<Modal
				width="xs"
				close={toggleOpen}
				open={open}
				header={
					<Label
						value="OFFER"
						classes={{
							root: `text-gray-600 font-extrabold font-sans pt-4 pl-8 text-lg uppercase`,
						}}
					/>
				}
				content={
					<OfferPopupBody
						des="Work Description:"
						detail="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam ett dolore magna aliquyam erat,"
						term="Terms:"
						value1="Total Amount"
						value2="Switch to:"
						btnValue="Fixed Price"
						amountValue="$500"
						icon={
							<img
								src="/images/icon/Path 1623.png"
								className="ml-1 w-4 -mt-2"
								alt="icon"
							/>
						}
						deposit="Deposit Funds into Escrow"
						icon2={<AiFillQuestionCircle className="text-primary ml-2" />}
						radio1="Deposit for the whole project"
						radio2="Deposit a lesser amount to cover the first milestone"
						value3="Due Date"
						date="13-10-2020"
						advance="Advance Option:"
						SDate="Start Date"
						payment="Weekly Payment"
						radio3="Yes"
						radio4="No"
					/>
				}
				actions={
					<div className="flex justify-end w-full space-x-3 px-4 pb-3">
						<Button
							value="Send"
							classes={{
								root: `text-white bg-primary py-1 leading-6 w-26 tracking-tight font-sans capitalize`,
							}}
							color="primary"
						/>
						<Button
							onClick={toggleOpen}
							value="Cancel"
							classes={{
								root: `border border-solid border-gray-600 text-gray-600 p-2 tracking-tight text-sm capitalize w-26`,
							}}
							color="inherit"
						/>
					</div>
				}
			/>
		</div>
	);
}
export default OfferPopup;
