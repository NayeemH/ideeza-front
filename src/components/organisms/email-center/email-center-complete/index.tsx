import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import Image from 'next/image';
import React from 'react';
function EmailCenterComplete() {
	// const { handleSendAction, handleEmailPageDecrement } = props;
	return (
		<div className="">
			<IconLabel
				mainClass="flex flex-col items-center justify-center space-x-1 pt-8 items-end space-y-8"
				labelValue="Your email is sent!"
				lableClass={{
					root: 'font-sans tracking-tight text-center text-gray-700 text-3xl font-bold pb-2',
				}}
				tooltipProps={{ open: false }}
				iconContanerClass="h-20 w-20"
				iconComponent={
					<Image
						src="/images/icon/checkmark-circle-outline.png"
						alt="email-sent"
						height={256}
						width={256}
					/>
				}
			/>
			<Label
				value="We will be in touch as soon as possible."
				className="font-sans tracking-tight text-lg text-gray-700 text-center pb-8"
			/>
		</div>
	);
}

export default EmailCenterComplete;
