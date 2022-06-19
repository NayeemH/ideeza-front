import Button from '@atoms/button';
import Label from '@atoms/label';
import { Select } from '@mui/material';
import React from 'react';
import { MdClose } from 'react-icons/md';
function AddNewChart(props: any) {
	const { labelClass } = props;
	return (
		<div className="bg-white w-full pt-4 shadow-full overflow-hidden">
			<div className="grid grid-cols-5 items-center w-full p-2 md:pl-4 border-b border-gray-750">
				<Label
					value="Chart Title"
					classes={{ root: `${labelClass}` }}
				/>
				<div className="col-span-4 flex items-center pl-2">
					{/* <Input
            containerClass="w-full p-0"
            inputProps="text-gray-700 text-sm font-lato p-2 rounded-none border border-solid border-gray-725"
          /> */}
					<div className="lg:w-10 md:w-8 w-5"></div>
				</div>
			</div>
			<div className="grid grid-cols-5 items-center w-full p-2 md:pl-4 border-b border-gray-750">
				<Label
					value="Label"
					classes={{ root: `${labelClass}` }}
				/>
				<div className="col-span-4 flex items-center md:space-x-4 space-x-2">
					<div className="flex items-center md:space-x-2 space-x-1 pr-2">
						{/* <TextField
              mainClass="flex items-center space-x-1"
              inputClasses="w-full p-0 text-md tracking-tight font-sans rounded-none border border-gray-725"
              labelClasses="text-gray-600 flex items-center md:text-base text-md font-sans tracking-tight"
              labelvalue="X"
            /> */}
						<Select
							placeholder="mV"
							// containerClass="text-gray-900 xl:w-28 lg:w-14 w-12 rounded-none border border-gray-725"
							// inputClass="text-md font-sans tracking-tight lg:px-2 py-1.5 h-5"
						/>
					</div>
					<div className="flex items-center md:space-x-2 space-x-1">
						{/* <TextField
              mainClass="flex items-center space-x-1"
              inputClasses="w-full p-0 text-md tracking-tight font-sans rounded-none border border-gray-725"
              labelClasses="text-gray-600 flex items-center md:text-base text-md font-sans tracking-tight"
              labelvalue="Y"
            /> */}
						<Select
							placeholder="mV"
							// containerClass="text-gray-900 xl:w-28 lg:w-14 w-12 rounded-none border border-gray-725"
							// inputClass="text-md font-sans tracking-tight lg:px-2 py-1.5 h-5"
						/>
					</div>
					<div className="lg:w-9 w-3 flex justify-center">
						<MdClose className="text-lg cursor-pointer text-gray-900 opacity-0" />
					</div>
				</div>
			</div>
			<div className="grid grid-cols-5 items-center w-full p-2 md:pl-4 border-b border-gray-750">
				<Label
					value="Add Value"
					classes={{ root: `${labelClass}` }}
				/>
				<div className="col-span-4 flex items-center md:space-x-2">
					<div className="flex items-center pr-2">
						{/* <TextField
              mainClass="flex items-center space-x-1"
              inputClasses="w-full p-0 text-md tracking-tight font-sans rounded-none border border-gray-725"
              labelClasses="text-gray-600 flex items-center md:text-base text-md font-sans tracking-tight"
              labelvalue="X"
            /> */}
					</div>
					<div className="flex items-center pl-1">
						{/* <TextField
              mainClass="flex items-center space-x-1"
              inputClasses="w-full p-0 text-md tracking-tight font-sans rounded-none border border-gray-725"
              labelClasses="text-gray-600 pr-1 flex items-center md:text-base text-md font-sans tracking-tight"
              labelvalue="Y"
            /> */}
					</div>
					<div className="w-9 flex justify-center">
						<MdClose className="text-lg cursor-pointer text-gray-900" />
					</div>
				</div>
			</div>
			<Button
				value="+ Add new value"
				className="bg-gray-375 w-full transform-none py-3 rounded-none text-md text-primary tracking-tight font-sans"
			/>
		</div>
	);
}
AddNewChart.defaultProps = {
	labelClass: 'text-gray-900 md:text-md text-sm tracking-tight font-sans',
};
export default AddNewChart;
