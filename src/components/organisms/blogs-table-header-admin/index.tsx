import React from 'react';
import SearchInput from '@molecules/search-input';
import Button from '@atoms/button';
// import CustomSelect from '@molecules/custom-select';
import Dropdown from '@atoms/drop-down';
import { IoSettingsSharp } from 'react-icons/io5';
import Label from '@atoms/label';
import AdminCustomSelect from '@molecules/custom-select-admin';

function AdminBlogsTableHeader({
	btnValue,
	iconEnd,
	onClick,
	searchValue,
	setSearchValue,
	mainClass,
	showGear = true,
	searchFieldShows = true,
	blogheaderLabel,
	// labelClass,
	showDropDownOneData,
	showDropDownTwoData,
	addButton = true,
}: {
	// btnValue = "Add New"
	// iconEnd = {< BsPlus size = "30" />}
	// labelClass = "hidden"
	// containerClass = ""
	// onClick = { AddAvatar }
	// showDropdown = { true}
	// labelClass?: string,
	btnValue?: string;
	iconEnd?: any;
	onClick?: any;
	searchValue?: any;
	setSearchValue?: any;
	mainClass?: any;
	showGear?: boolean;
	searchFieldShows?: boolean;
	blogheaderLabel?: any;
	showDropDownOneData?: any;
	showDropDownTwoData?: any;
	addButton?: boolean;
}) {
	return (
		<div
			className={
				showDropDownOneData
					? `md:flex items-center justify-between pl-4`
					: blogheaderLabel
					? `md:flex items-center justify-between pl-4`
					: `md:flex items-center justify-end pl-4`
			}
		>
			{showDropDownOneData && (
				<AdminCustomSelect
					unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 mt-10"
					inputClassName="bg-gray-300 rounded-md text-white font-bold text-xl focus:outline-none p-1 md:p-2 my-[10px] md:my-0"
					placeholder={showDropDownOneData.placeholder}
					options={showDropDownOneData.options}
					onchangeSelect={showDropDownOneData.onchangeSelect}
				/>
			)}
			{showDropDownTwoData && (
				<AdminCustomSelect
					unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 mt-10"
					inputClassName="bg-gray-300 rounded-md text-white font-bold text-xl focus:outline-none p-1 md:p-2 my-[10px] md:my-0"
					placeholder={showDropDownTwoData.placeholder}
					options={showDropDownTwoData.options}
					onchangeSelect={showDropDownTwoData.onchangeSelect}
				/>
			)}
			{blogheaderLabel && (
				<Label
					value="Manage Articles"
					classes={{
						root: 'text-[#333333]  font-semibold  text-xl xl:text-[26px] ',
					}}
				/>
			)}
			{/* <Select
        placeholder="All"
        containerClass="md:w-20 w-full bg-gray-200 text-gray-900 text-sm border border-gray-160"
        inputClass="text-md tracking-tight p-2"
        options={[{ value: "Some", name: "Some" }]}
      /> */}

			<div
				className={`flex justify-between xl:gap-5 gap-2 items-center pr-0 md:pr-2 md:p-4 ${mainClass}`}
			>
				{searchFieldShows && (
					<SearchInput
						className="rounded-md bg-[#FBFBFB] sm:w-full lg:w-[315px] border border-[#E6E6E6] pl-0"
						placeholder="Search"
						inputClass="md:text-base text-sm pl-2 pt-[11px] pb-[13px]  "
						value={searchValue}
						change={setSearchValue}
					/>
				)}
				{addButton && (
					<Button
						value={btnValue}
						iconEnd={iconEnd}
						onClick={onClick}
						className="lg:px-[30px] px-2 whitespace-nowrap w-full md:w-auto md:py-[10px] rounded-md tracking-tight bg-primary  shadow-none text-white text-base 2xl:text-[18px] transform-none  mr-2 md:mr-4 sm:w-[20%]"
						color="primary"
						// variant="outlined"
						//   classes={{
						//     root: "",
						//   }}
					/>
				)}
				{/* <Settings
          options={[
            {
              name: "View",
              value: "View",
            },
          ]}
        /> */}
				{searchFieldShows && showGear && (
					<Dropdown
						icons={<IoSettingsSharp className={`text-3xl text-[#787878]`} />}
						itemsClasses={{
							root: 'font-sans text-sm px-4 w-32 py-3 hover:text-current text-gray-900',
						}}
						options={[
							{
								name: 'Delete',
								value: 'Delete',
							},
						]}
					/>
				)}
			</div>
		</div>
	);
}
AdminBlogsTableHeader.defaultProps = {
	containerClass: 'grid md:grid-cols-8 grid-cols-2 gap-2 items-center justify-between px-2 pt-4',
	extraBtn: false,
	classessort: { root: 'font-bold' },
};
export default AdminBlogsTableHeader;
