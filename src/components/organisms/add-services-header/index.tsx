import React, { useState } from 'react';
import Proptype from 'prop-types';
import Label from '@atoms/label';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import SearchInput from '@molecules/search-input';
import Button from '@atoms/button';
import FilterPopup from '@organisms/filter-popup';
function ServicesHeader(props: any) {
	const [popup, SetPopup] = useState(false);
	const toggleOpen = () => SetPopup(!popup);
	const { mainClass, value1, labelClass, classessort, InputPlaceholder, row } = props;
	return (
		<div className={mainClass}>
			<Label
				value={value1}
				classes={{ root: `${labelClass}` }}
			/>
			<div className="w-40">
				<CustomDropDownMenu
					className={classessort}
					selectOptions={[
						{
							name: 'Lambogini',
							value: 'Lambogini',
						},
						{
							name: 'Cover',
							value: 'Cover',
						},
						{
							name: 'Electronics',
							value: 'Electronics',
						},
						{
							name: 'Parts',
							value: 'Parts',
						},
					]}
					inputClasses="h-12 rounded-sm  pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right z-20 mt-0 w-48 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
					// placeholder="Search..."
				/>
			</div>
			<div className={row}>
				<SearchInput
					className="rounded border pl-0"
					placeholder={InputPlaceholder}
					inputClass="md:py-4  py-3 text-base 2xl:text-xl font-sans"
				/>
				<div className="grid w-full grid-cols-1 md:flex gap-3 justify-end">
					{/* <SelectField
            mainClasses="grid grid-cols-2 md:flex items-center"
            className="text-sm p-2 pr-4 bg-gray-100 rounded border border-gray-125 border-solid tracking-tight"
            containerClass={{ root: "text-xs" }}
            value="Type:"
            placeholder="Fabrication"
            labelClasses="text-base 2xl:text-xl pr-2 whitespace-nowrap tracking-tight text-gray-300 font-sans"
          /> */}
					<div className="flex items-center">
						<Label
							value="Type:"
							classes={{
								root: `text-primary text-base 2xl:text-xl font-sans tracking-tight mr-2`,
							}}
						/>
						<CustomDropDownMenu
							className={classessort}
							selectOptions={[
								{
									name: 'Fabrication',
									value: 'Fabrication',
								},
								{
									name: 'Cover',
									value: 'Cover',
								},
								{
									name: 'Electronics',
									value: 'Electronics',
								},
								{
									name: 'Parts',
									value: 'Parts',
								},
							]}
							inputClasses="h-12 rounded-sm w-48 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
							labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
							labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
							labelWrapperClass="flex cursor-pointer md:relative"
							dropDownClasses="origin-top-right z-20 mt-0 w-48 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
							// placeholder="Search..."
						/>
					</div>

					{/* <SelectField
            mainClasses="grid grid-cols-2 md:flex items-center"
            className="text-sm p-2 pr-4 bg-gray-100 rounded border border-gray-125 border-solid tracking-tight"
            containerClass={{ root: "text-xs text-gray-910" }}
            value="Sort by:"
            placeholder="Cost"
            labelClasses="text-base 2xl:text-xl pr-2 whitespace-nowrap tracking-tight text-gray-300 font-sans md:text-right text-left"
          /> */}
					<div className="flex items-center">
						<Label
							value="Sort by:"
							classes={{
								root: `text-primary text-base 2xl:text-xl font-sans tracking-tight mr-2`,
							}}
						/>
						<CustomDropDownMenu
							className={classessort}
							selectOptions={[
								{
									name: 'Fabrication',
									value: 'Fabrication',
								},
								{
									name: 'Cover',
									value: 'Cover',
								},
								{
									name: 'Electronics',
									value: 'Electronics',
								},
								{
									name: 'Parts',
									value: 'Parts',
								},
							]}
							inputClasses="h-12 rounded-sm w-48 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
							labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
							labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
							labelWrapperClass="flex cursor-pointer md:relative"
							dropDownClasses="origin-top-right z-20 mt-0 w-48 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
							// placeholder="Search..."
						/>
					</div>

					<Button
						value="Filter by"
						onClick={toggleOpen}
						classes={{
							root: `bg-gray-200 shadow-none text-gray-600 px-4 h-12  mt-2 text-base 2xl:text-xl p-0 tracking-tight font-sans capitalize`,
						}}
						color="primary"
					/>
				</div>
			</div>
			<FilterPopup
				open={popup}
				toggleOpen={toggleOpen}
			/>
		</div>
	);
}
ServicesHeader.defaultProps = {
	mainClass: 'space-y-2',
	labelClass: 'text-primary font-sans texl-lg 2xl:text-2xl font-semibold tracking-normal pb-2',
	options: [
		{ value: 'Lamboghini', name: 'Lamboghini' },
		{ value: 'Chair', name: 'Chair' },
		{ value: 'All Products', name: 'All Products' },
	],
	inputClass: 'w-20 bg-gray-160 rounded',
	containerClass: { root: ' px-1' },
	row: 'grid md:grid-cols-2 grid-cols-1 items-center gap-3',
	inputClasses: 'border border-solid border-gray-160',
	classessort: { root: 'font-bold' },
};
ServicesHeader.prototype = {
	mainClasses: Proptype.string,
	labelClasses: Proptype.object,
	value: Proptype.string,
	containerClass: Proptype.object,
	options: Proptype.array,
};
export default ServicesHeader;
