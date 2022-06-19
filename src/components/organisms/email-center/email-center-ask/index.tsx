import Button from '@atoms/button';
import Label from '@atoms/label';
// import SelectBasic from "@molecules/select-basic";
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
function EmailCenterAsk(props: any) {
	const {
		// category,
		handleCategory,
		categoryOptions,
		onClickContinue,
		// categoryError,
		// categoryHelpText,
	} = props;
	return (
		<>
			<Label
				value="Select your question category"
				className="font-sans font-normal text-gray-700 text-2xl md:text-3xl pb-2"
			/>
			<div className="my-8 relative">
				<IoIosArrowDown className="absolute right-[1px] xl:right-[20px] top-[4px] xl:top-[14px] text-[30px]" />
				<select
					className="w-full py-[15px] bg-zinc-50 focus:outline-none border rounded-md px-4 border-gray-300 appearance-none"
					onChange={handleCategory}
					name=""
					id=""
				>
					{categoryOptions?.map((category: any) => (
						<option key={category?.id}>{category?.name}</option>
					))}
				</select>
				{/* <SelectBasic 
          value={category}
          options={categoryOptions}
          handleChange={handleCategory}
          placeholder={'Select a category'}
          error={categoryError}
          helpText={categoryHelpText}
        /> */}
			</div>
			<div className="flex justify-end mt-8">
				<Button
					value="Continue"
					className="text-white bg-primary text-md md:text-lg tracking-tight font-sans capitalize w-32 py-[8px] shadow-none min-h-0"
					onClick={onClickContinue}
					color="primary"
				/>
			</div>
		</>
	);
}

export default EmailCenterAsk;
