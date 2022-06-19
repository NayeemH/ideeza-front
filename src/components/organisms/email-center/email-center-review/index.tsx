import Button from '@atoms/button';
import Loader from '@atoms/loader';
import TextField from '@molecules/text-field';
// import UploadButton from "@molecules/upload-button";
import React from 'react';

function EmailCenterReview(props: any) {
	const {
		emailAddress,
		handleEmailAddress,
		emailSubject,
		handleEmailSubject,
		emailBody,
		handleEmailBody,
		handleSendAction,
		onClickBack,
		loading,
		errorEmailAddress,
		errorEmailSubject,
		errorEmailBody,
		emailAddressHelpText,
		emailSubjectHelpText,
		emailBodyHelpText,
	} = props;

	return (
		<div className="space-y-8 relative">
			{loading && (
				<Loader
					type="relative"
					isTransparentBg
				/>
			)}
			<TextField
				mainClass="flex flex-col w-full"
				labelClasses="w-full font-sans text-md md:text-lg font-semibold tracking-normal text-gray-700 pb-3"
				inputClasses="w-full text-xs px-0 border border-gray-160 py-1 bg-[#FBFBFB]"
				labelvalue="Email"
				placeholder="Your email"
				type="email"
				value={emailAddress}
				onChange={handleEmailAddress}
				error={errorEmailAddress}
				helperText={emailAddressHelpText}
			/>
			<TextField
				mainClass="flex flex-col w-full"
				labelClasses="w-full font-sans text-md md:text-lg font-semibold tracking-normal text-gray-700 pb-3"
				inputClasses="w-full text-xs px-0 border border-gray-160 py-1 bg-[#FBFBFB]"
				labelvalue="Subject"
				placeholder="Your subject"
				value={emailSubject}
				onChange={handleEmailSubject}
				error={errorEmailSubject}
				helperText={emailSubjectHelpText}
			/>
			<TextField
				mainClass="flex flex-col w-full"
				labelClasses="w-full font-sans text-md md:text-lg font-semibold tracking-normal text-gray-700 pb-3"
				inputClasses="w-full text-xs px-0 border border-gray-160 py-1 bg-[#FBFBFB]"
				labelvalue="Body"
				multiline={true}
				rows="6"
				placeholder="Your message goes here..."
				value={emailBody}
				onChange={handleEmailBody}
				error={errorEmailBody}
				helperText={emailBodyHelpText}
			/>
			<div className="">
				{/* <Label
          value="Attachment"
          classes={{
            root: "font-sans text-md md:text-lg font-semibold tracking-normal text-gray-700",
          }}
        /> 
        <label
          className={
            "w-full flex items-center justify-center bg-gray-375 border border-ghray-125 rounded px-2 py-2 "
          }
        >
          <span>
            <FiUploadCloud className="text-primary text-2xl mr-1" />
          </span>
          <span className="text-primary text-lg font-sans tracking-tight">
            <>
              Add file <span className="text-gray-600">or drop files here</span>
            </>
          </span>
          <input type="file" className="hidden" />
        </label> */}
			</div>
			<div className="flex justify-between mt-5">
				<Button
					value="Back"
					className="border border-solid border-gray-400 text-gray-700 text-md md:text-lg tracking-tight font-sans capitalize py-[8px] min-h-0 w-32 shadow-none"
					onClick={onClickBack}
				/>
				<Button
					type="button"
					value="Send"
					className="text-white bg-primary text-md md:text-lg tracking-tight font-sans capitalize w-32 shadow-none min-h-0 py-[8px]"
					onClick={handleSendAction}
					color="primary"
				/>
			</div>
		</div>
	);
}

export default EmailCenterReview;
