import React from 'react';
// import { SearchInput } from "molecules";
// import CustomDropDownMenu from '@molecules/custom-dropdown';
import SearchInput from '@molecules/search-input';
import CustomSelect from '@molecules/custom-select';
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

function UserServiceTechnicianTableHeader() {
	return (
		<div
			className={`md:flex md:flex-wrap xl:flex-nowrap w-full items-center justify-between  pt-3`}
		>
			<div className=" flex  items-center gap-x-[20px] ">
				<CustomSelect
					options={selectOptions}
					inputClassName="focus:outline-none w-[150px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
					placeholder="Select a tag"
					unorderedList="absolute overflow-y-auto w-full bg-white rounded border mt-2 shadow-lg flex flex-wrap gap-4 z-10  top-10 text-xl"
					arrowColor=" text-[#333333] ml-[-2rem]"
					arrowColorTop=" text-primary ml-[-2rem]"
				/>
				<CustomSelect
					options={[
						{
							name: 'All status type',
							value: 'All status type',
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
					inputClassName="focus:outline-none w-[150px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
					placeholder="Select a tag"
					unorderedList="absolute overflow-y-auto w-full bg-white rounded border mt-2 shadow-lg flex flex-wrap gap-4 z-10  top-10 text-xl"
					arrowColor=" text-[#333333] ml-[-2rem]"
					arrowColorTop=" text-primary ml-[-2rem]"
				/>
				<CustomSelect
					options={[
						{
							name: 'Date',
							value: 'Date',
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
					inputClassName="focus:outline-none w-[150px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
					placeholder="Select a tag"
					unorderedList="absolute overflow-y-auto w-full bg-white rounded border mt-2 shadow-lg flex flex-wrap gap-4 z-10  top-10 text-xl"
					arrowColor=" text-[#333333] ml-[-2rem]"
					arrowColorTop=" text-primary ml-[-2rem]"
				/>

				<CustomSelect
					options={[
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
					inputClassName="focus:outline-none w-[150px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
					placeholder="Select a tag"
					unorderedList="absolute overflow-y-auto w-full bg-white rounded border mt-2 shadow-lg flex flex-wrap gap-4 z-10  top-10 text-xl"
					arrowColor=" text-[#333333] ml-[-2rem]"
					arrowColorTop=" text-primary ml-[-2rem]"
				/>
			</div>
			<div className={`md:w-80`}>
				<SearchInput
					className="rounded-md border pl-0"
					placeholder="Search"
					inputClass="py-3 text-base 2xl:text-xl border"
				/>
			</div>
		</div>
	);
}
UserServiceTechnicianTableHeader.defaultProps = {
	extraBtn: false,
	classessort: { root: 'font-bold' },
};
export default UserServiceTechnicianTableHeader;
