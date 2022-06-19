import Button from '@atoms/button';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import IconLabel from '@molecules/icon-label';
import React from 'react';
import { IoClose } from 'react-icons/io5';

interface SmsVerificationProps {
	open: boolean;
	toggleOpen: (e?: any) => void;
	handleNext?: () => void;
}

function SmsVerification(props: SmsVerificationProps) {
	const { open, toggleOpen, handleNext } = props;

	// const numOfFields = 6;

	const handleChange = (e: any) => {
		const { maxLength, value, name } = e.target;
		const [fieldName, fieldIndex] = name.split('-');
		if (value.length >= maxLength || (value.length >= maxLength && e.key === 'Enter')) {
			const fieldIntIndex = parseInt(fieldIndex, 10);
			if (fieldIntIndex < 6) {
				const nextField = document.querySelector(
					`input[name=${fieldName}-${fieldIntIndex + 1}]`
				) as HTMLElement | null;
				if (nextField !== null) {
					nextField.focus();
				}
			}
		}
	};

	return (
		<div>
			<Modal
				width="xs"
				close={toggleOpen}
				header={
					<>
						<IconLabel
							mainClass="flex w-full items-center justify-between flex-row-reverse pl-6 pr-2 pt-3 pb-7"
							lableClass={{
								root: `text - lg text - current font - semibold tracking - tight font - sans`,
							}}
							labelValue="Enter SMS code"
							iconContanerClass=""
							iconComponent={
								<IoClose
									className="text-red-300 text-2xl cursor-pointer -mt-2"
									onClick={toggleOpen}
								/>
							}
							tooltipProps={{ open: false }}
						/>
					</>
				}
				content={
					<>
						<img
							src="/images/logo/phone-logo.png"
							alt="verify"
							className="mx-auto w-28"
						/>
						<Label
							value="Enter SMS code"
							className="text-center font-semibold text-md text-gray-700 pt-3 font-sans tracking-tight"
						/>
						<Label
							value="Text message verification"
							className="text-center tracking-tight font-sans text-gray-700 text-md mt-3"
						/>
						<Label
							value="We'v sent a text message to"
							className="text-center tracking-tight font-sans text-gray-700 text-md my-2"
						/>
						<Label
							value="+972 4646438348"
							className="text-center font-sans text-base tracking-tight text-gray-700 font-semibold"
						/>
						<div className="flex space-x-2 items-center justify-center mx-auto mt-10">
							<input
								name="field-1"
								type="number"
								min="0"
								max="9"
								maxLength={1}
								onKeyDown={handleChange}
								className="p-0 h-full w-full text-sm hover:shadow bg-gray-200 rounded-md sms-input transition-all duration-500 ease-in-out"
							/>
							<input
								name="field-2"
								type="number"
								min="0"
								max="9"
								maxLength={1}
								onKeyDown={handleChange}
								className="p-0 h-full w-full text-sm hover:shadow bg-gray-200 rounded-md sms-input transition-all duration-500 ease-in-out"
							/>
							<input
								name="field-3"
								type="number"
								min="0"
								max="9"
								maxLength={1}
								onKeyDown={handleChange}
								className="p-0 h-full w-full text-sm hover:shadow bg-gray-200 rounded-md sms-input transition-all duration-500 ease-in-out"
							/>
							<input
								name="field-4"
								type="number"
								min="0"
								max="9"
								maxLength={1}
								onKeyDown={handleChange}
								className="p-0 h-full w-full text-sm hover:shadow bg-gray-200 rounded-md sms-input transition-all duration-500 ease-in-out"
							/>
							<input
								name="field-5"
								type="number"
								min="0"
								max="9"
								maxLength={1}
								onKeyDown={handleChange}
								className="p-0 h-full w-full text-sm hover:shadow bg-gray-200 rounded-md sms-input transition-all duration-500 ease-in-out"
							/>
							<input
								name="field-6"
								type="number"
								min="0"
								max="9"
								maxLength={1}
								onKeyDown={handleChange}
								className="p-0 h-full w-full text-sm hover:shadow bg-gray-200 rounded-md sms-input transition-all duration-500 ease-in-out"
							/>
						</div>
						<Label
							className="text-md font-sans tracking-tight text-center mt-2"
							value={
								<>
									Don't receive your code?
									<span className="text-primary font-semibold"> Resend </span>
								</>
							}
						/>
					</>
				}
				actions={
					<>
						<div className="flex space-x-2 pb-5 pt-4 px-6">
							<Button
								onClick={toggleOpen}
								value="Cancel"
								classes={{
									root: `text - current border border - solid border - current tracking - tight font - sans capitalize py - 2 text - md w - 22`,
								}}
							/>
							<Button
								value="Next"
								onClick={handleNext}
								classes={{
									root: `text - white bg - primary py - 2 text - md tracking - tight font - sans capitalize w - 22`,
								}}
								color="primary"
							/>
						</div>
					</>
				}
				open={open}
			/>
		</div>
	);
}

export default SmsVerification;
