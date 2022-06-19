import Label from '@atoms/label';
import CheckboxFields from '@molecules/checkbox-fields';
import SelectField from '@molecules/select-field';
import TextField from '@molecules/text-field';
import React from 'react';

function SecurityQuestion() {
	return (
		<div className="md:px-6">
			<Label
				value="You'll be prompted to answer your securtiy question when we need to verigy your identiry, so be sure to choose a question only you know the anser to."
				className="text-base 2xl:text-xl tracking-tight text-gray-700"
			/>
			<SelectField
				mainClasses="flex-col space-y-1 mt-4 w-4/5"
				placeholder="Your favourite writer"
				name="writer"
				className="bg-white shadow rounded-none px-3 py-2 text-base 2xl:text-xl text-gray-640 font-sans tracking-tight"
				containerClass="border border-solid text-base 2xl:text-xl"
				labelClasses="font-sans tracking-tight font-semibold text-base 2xl:text-xl pb-1 text-gray-700"
				value="Question"
			/>
			<TextField
				mainClass="flex flex-col mt-5"
				labelvalue="Answer"
				labelClasses="font-sans tracking-tight font-semibold text-base 2xl:text-xl pb-1 text-gray-700"
				inputClasses="bg-gray-100 pl-0 text-base 2xl:text-xl outline-none w-4/5"
			/>
			<CheckboxFields
				size="small"
				mainClass="mt-8 -ml-1 flex items-start"
				value="I understand my account will be locked if i am unable to answer this question"
				labelClass="text-gray-700 tracking-tight text-base 2xl:text-xl"
				name="understand question"
				checked={false}
				rules={''}
			/>
			<CheckboxFields
				size="small"
				mainClass="mt-1 -ml-1 flex items-center"
				value="Keep me logged in on this device"
				labelClass="text-gray-700 tracking-tight text-base 2xl:text-xl"
				name="Keep me logged in"
				checked={false}
				rules={''}
			/>
		</div>
	);
}

export default SecurityQuestion;
