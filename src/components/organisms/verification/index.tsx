import Button from '@atoms/button';
import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import SwitchField from '@molecules/switch';
import PhoneNumber from '@organisms/phone-number-verification';
import SecurityQuestionPopup from '@organisms/security-question';
import SmsVerification from '@organisms/sms-verifications';
import React, { useState } from 'react';

function Verification({ settingData }: any) {
	const [popup, SetPopup] = useState(false);
	const [SmsPopup, SetSmsPopup] = useState(false);
	const [PhonePopup, SetPhonePopup] = useState(false);
	const toggleOpen = () => SetPopup(!popup);
	const toggleOpenSms = () => SetSmsPopup(!SmsPopup);
	const toggleOpenPhone = () => SetPhonePopup(!PhonePopup);
	return (
		<div className="rounded-lg bg-white shadow-md py-3 md:px-6 px-4 mb-6">
			<Label
				value="Two-step verification"
				classes={{
					root: `font-bold font-sans text-gray-700 texl-lg 2xl:text-2xl`,
				}}
			/>
			<Label
				value="Help protect your account by enabling extra layers of security."
				classes={{
					root: `font-sans text-gray-700 tracking-tight text-base 2xl:text-xl mb-2 border-b-2 border-gray-100 pb-3`,
				}}
			/>
			<div className="border-b-2 border-gray-100 pb-4 mt-4 items-center justify-between flex">
				<div className="">
					<IconLabel
						mainClass="flex items-center flex-row-reverse justify-end"
						labelValue="Text message verification"
						lableClass={{
							root: 'font-semibold font-sans tracking-tight text-gray-700 text-base 2xl:text-xl',
						}}
						iconComponent={
							<img
								src="/images/icon/question.svg"
								alt="ques"
								className="w-5 h-6"
							/>
						}
						// tooltipProps={{
						//   title:
						//     "We'll send you a text!   We'll ask you to confirm it's you by having you enter a code we'll send to you by text message.",
						//   placement: "top-center",
						//   arrow: true,
						//   classes: {
						//     tooltip:
						//       "bg-gray-200 shadow px-4 text-black-300 rounded-md py-3 text-base 2xl:text-xl",
						//     arrow: "text-gray-150 w-5",
						//   },
						// }}
					/>
					<Label
						value="Receive a six digit code by text message to enter along with your password."
						classes={{
							root: `font-sans text-gray-700 tracking-tight text-base 2xl:text-xl`,
						}}
					/>
				</div>
				{settingData?.messages?.text_message ? (
					<Button
						onClick={toggleOpenPhone}
						value="Disable"
						classes={{
							root: `text-gray-800 text-base 2xl:text-xl bg-gray-200 tracking-tight bg-primary p-2 capitalize px-6`,
						}}
					/>
				) : (
					<Button
						onClick={toggleOpenPhone}
						value="Enable"
						classes={{
							root: `text-white text-base 2xl:text-xl tracking-tight bg-primary p-2 capitalize px-6`,
						}}
						color="primary"
					/>
				)}
			</div>
			<div className="flex items-center justify-between mt-2 -mb-3">
				<IconLabel
					mainClass="flex items-center flex-row-reverse justify-end"
					labelValue="Security question"
					lableClass={{
						root: 'font-semibold font-sans tracking-tight text-gray-700 text-base 2xl:text-xl',
					}}
					iconComponent={
						<img
							src="/images/icon/question.svg"
							alt="ques"
							className="w-5 h-6"
						/>
					}
					// tooltipProps={{
					//   title:
					//     "We'll ask the question you choose!   Make it:    1. Memorable for you    2. Unique, short and simple    3. Hard for you other to guess or find online    4. Something that won't change other time",
					//   placement: "top-center",
					//   arrow: true,
					//   classes: {
					//     tooltip:
					//       "bg-gray-200 shadow px-4 text-black-300 rounded-md py-3 text-sm",
					//     arrow: "text-gray-150 w-5",
					//   },
					// }}
				/>
				<img
					src="/images/icon/edit.png"
					alt="pencil"
					className="w-7 h-7 cursor-pointer"
					onClick={toggleOpen}
				/>
			</div>
			<SwitchField
				mainClass="flex items-start -ml-3"
				value={
					<>
						Enabled
						<span className="text-base 2xl:text-xl mb-2 font-sans tracking-tight font-light text-gray-700">
							Confirm your identity with a question only you know answer to.
						</span>
					</>
				}
				labelClass="text-base 2xl:text-xl mt-2 flex flex-col font-bold font-sans tracking-tight text-gray-700"
			/>
			<SmsVerification
				open={SmsPopup}
				toggleOpen={toggleOpenSms}
			/>
			<PhoneNumber
				open={PhonePopup}
				toggleOpen={toggleOpenPhone}
			/>
			<SecurityQuestionPopup
				open={popup}
				toggleOpen={toggleOpen}
			/>
		</div>
	);
}
export default Verification;
