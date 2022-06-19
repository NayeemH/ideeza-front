import CustomDropDownMenu from '@molecules/custom-dropdown';
import SearchInput from '@molecules/search-input';
import React from 'react';
// import { Select } from "atoms";
// import { SearchInput } from "molecules";
// import CustomDropDownMenu from "molecules/dropdown-items";
const selectOptions = [
	{
		name: 'All Roles',
		value: 'All Roles',
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
];
function AddPartsTableHeader(props: any) {
	const { classessort } = props;
	return (
		<div
			className={`md:flex md:flex-wrap xl:flex-nowrap w-full items-center justify-between px-3 pt-3`}
		>
			<div className="grid sm:grid-cols-4 2xl:grid-cols-6 grid-cols-1 gap-2 w-full">
				<CustomDropDownMenu
					className={classessort}
					selectOptions={selectOptions}
					inputClasses="h-12 rounded-sm w-72 sm:w-44 md:w-56 lg:w-48  pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right z-20 w-72 mt-0 sm:w-44 md:w-56 lg:w-48  absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
					//   placeholder="Search..."
				/>
				<CustomDropDownMenu
					className={classessort}
					selectOptions={[
						{
							name: 'All type',
							value: 'All type',
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
					inputClasses="h-12 rounded-sm w-72 sm:w-44 md:w-56 lg:w-48  pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right z-20 w-72 mt-0 sm:w-44 md:w-56 lg:w-48  absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
					//   placeholder="Search..."
				/>
				<CustomDropDownMenu
					className={classessort}
					selectOptions={[
						{
							name: 'All Packages',
							value: 'All Packages',
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
					inputClasses="h-12 rounded-sm w-72 sm:w-44 md:w-56 lg:w-48  pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right z-20 w-72 mt-0 sm:w-44 md:w-56 lg:w-48  absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
					//   placeholder="Search..."
				/>
				<CustomDropDownMenu
					className={classessort}
					selectOptions={[
						{
							name: 'Category',
							value: 'Category',
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
					inputClasses="h-12 rounded-sm w-72 sm:w-44 md:w-56 lg:w-48  pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right z-20 w-72 mt-0 sm:w-44 md:w-56 lg:w-48  absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
					//   placeholder="Search..."
				/>
				<CustomDropDownMenu
					className={classessort}
					selectOptions={[
						{
							name: 'Sub-Categoty',
							value: 'Sub-Categoty',
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
					inputClasses="h-12 rounded-sm w-72 sm:w-44 md:w-56 lg:w-48  pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right z-20 w-72 mt-0 sm:w-44 md:w-56 lg:w-48  absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
					//   placeholder="Search..."
				/>
				<CustomDropDownMenu
					className={classessort}
					selectOptions={[
						{
							name: 'All Columns',
							value: 'All Columns',
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
					inputClasses="h-12 rounded-sm w-72 sm:w-44 md:w-56 lg:w-48  pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right z-20 w-72 mt-0 sm:w-44 md:w-56 lg:w-48  absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
					//   placeholder="Search..."
				/>
			</div>
			<div className={`md:w-80`}>
				<SearchInput
					className="rounded-md border pl-0"
					placeholder="Search"
					inputClass="py-3 text-base 2xl:text-xl border"
					keyDown={props?.search?.keyDown}
				/>
			</div>
		</div>
		// <div className={containerClass}>
		//   <Select
		//     placeholder="All Roles"
		//     containerClass="w-full bg-gray-200 text-gray-900 text-sm border border-gray-160"
		//     inputClass="text-sm tracking-tight p-2 leading-4"
		//     options={[{ value: "Some", name: "Some" }]}
		//   />
		//   <Select
		//     placeholder="All Type"
		//     containerClass="w-full bg-gray-200 text-gray-900 text-sm border border-gray-160"
		//     inputClass="text-sm tracking-tight p-2 leading-4"
		//     options={[{ value: "Some", name: "Some" }]}
		//   />
		//   <Select
		//     placeholder="All Packages"
		//     containerClass="w-full bg-gray-200 text-gray-900 text-sm border border-gray-160"
		//     inputClass="text-sm tracking-tight p-2 leading-4"
		//     options={[{ value: "Some", name: "Some" }]}
		//   />
		//   <Select
		//     placeholder="Category"
		//     containerClass="w-full bg-gray-200 text-gray-900 text-sm border border-gray-160"
		//     inputClass="text-sm tracking-tight p-2 leading-4"
		//     options={[{ value: "Some", name: "Some" }]}
		//   />
		//   <Select
		//     placeholder="Sub-Category"
		//     containerClass="w-full bg-gray-200 text-gray-900 text-sm border border-gray-160"
		//     inputClass="text-sm tracking-tight p-2 leading-4"
		//     options={[{ value: "Some", name: "Some" }]}
		//   />
		//   <Select
		//     placeholder="All Columns"
		//     containerClass="w-full bg-gray-200 text-gray-900 text-sm border border-gray-160"
		//     inputClass="text-sm tracking-tight p-2 leading-4"
		//     options={[{ value: "Some", name: "Some" }]}
		//   />
		//   <div className={`col-span-2 md:pl-6`}>
		//     <SearchInput
		//       className="rounded-md border pl-0"
		//       inputClass="py-2 border"
		//     />
		//   </div>
		// </div>
	);
}
AddPartsTableHeader.defaultProps = {
	containerClass: 'grid md:grid-cols-8 grid-cols-2 gap-2 items-center justify-between px-2 pt-4',
	extraBtn: false,
	classessort: { root: 'font-bold' },
};
export default AddPartsTableHeader;
