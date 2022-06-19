import Button from '@atoms/button';
import Label from '@atoms/label';
import TextField from '@molecules/text-field';
import React from 'react';
function EmailCenterOne(props: any) {
	const { setEmailPage } = props;
	return (
		<>
			<Label
				value="How can we help?"
				className="font-sans font-bold text-gray-700 text-2xl md:text-4xl pb-2"
			/>
			<TextField
				mainClass="flex-col space-y-5"
				labelvalue={
					<>
						We're committed to finding the answers you need as quickly as possible.
						<br />
						Please tell us a little about what you need help with.
					</>
				}
				labelClasses="font-sans text-gray-700 tracking-tight leading-5 text-md md:text-lg "
				multiline={true}
				rows="10"
				placeholder="Type your question or a description of the problem you’re trying to resolve here (minimum of 10 characters)..."
				inputClasses="bg-gray-200 rounded-lg p-2"
			/>
			<Button
				value="Continue"
				className="flex text-white text-lg bg-primary tracking-tight font-sans capitalize mt-5 p-2 w-28 mx-auto"
				onClick={setEmailPage}
				color="primary"
			/>
		</>
	);
}

export default EmailCenterOne;
