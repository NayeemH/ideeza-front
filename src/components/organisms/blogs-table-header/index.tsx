import React from 'react';
import SearchInput from '@molecules/search-input';
import Button from '@atoms/button';
import CustomSelect from '@molecules/custom-select';
// import Dropdown from '@atoms/drop-down';

import SimplePopper from '@atoms/generic-popper';
import Label from '@atoms/label';

function BlogsTableHeader(props: any) {
	const {
		btnValue,
		iconEnd,
		onClick,
		searchValue,
		setSearchValue,
		mainClass,
		showGear = true,
		showDropdown = true,
		searchFieldShows = true,
		blogheaderLabel,
		selectOptions = [
			{ name: 'view', value: 'view' },
			{ name: 'cover', value: 'cover' },
			{ name: 'code', value: 'code' },
		],
	} = props;

	return (
		<div
			className={
				showDropdown
					? `md:flex items-center justify-between pl-4`
					: blogheaderLabel
					? `md:flex items-center justify-between pl-4`
					: `md:flex items-center justify-end pl-4`
			}
		>
			{showDropdown && (
				// <CustomSelect
				// 	inputClassName="bg-gray-300 rounded-md text-white font-bold text-xl focus:outline-none p-1 md:p-2 my-[10px] md:my-0"
				// 	options={[
				// 		{ name: 'view', value: 'view' },
				// 		{ name: 'cover', value: 'cover' },
				// 		{ name: 'code', value: 'code' },
				// 	]}
				// />
				<CustomSelect
					options={selectOptions}
					inputClassName="focus:outline-none w-[150px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border mb-2 md:mb-0"
					placeholder="Select a tag"
					unorderedList="absolute overflow-y-auto w-full bg-white rounded border mt-2 shadow-lg flex flex-wrap gap-4 z-10  top-10 text-xl"
					arrowColor=" text-[#333333] ml-[-2rem]"
					arrowColorTop=" text-primary ml-[-2rem]"
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
						className="rounded-md bg-[#FBFBFB] sm:w-full lg:w-[315px] border border-[#E6E6E6] pl-0 mb-2 md:mb-0"
						placeholder="Search"
						inputClass="md:text-base text-sm pl-2 pt-[11px] pb-[13px]  "
						value={searchValue}
						change={setSearchValue}
					/>
				)}
				<Button
					value={btnValue}
					iconEnd={iconEnd}
					onClick={onClick}
					className="lg:px-[30px] px-2 whitespace-nowrap w-full md:w-auto pt-[12px] pb-[14px] rounded-md tracking-tight bg-primary  shadow-none text-white text-base 2xl:text-[18px] transform-none  mr-2 md:mr-4 sm:min-w-[20%] mb-2 md:mb-0"
					color="primary"
					// variant="outlined"
					//   classes={{
					//     root: "",
					//   }}
				/>
				{/* <Settings
          options={[
            {
              name: "View",
              value: "View",
            },
          ]}
        /> */}
				{searchFieldShows && showGear && <SimplePopper />}
			</div>
		</div>
	);
}
BlogsTableHeader.defaultProps = {
	containerClass: 'grid md:grid-cols-8 grid-cols-2 gap-2 items-center justify-between px-2 pt-4',
	extraBtn: false,
	classessort: { root: 'font-bold' },
};
export default BlogsTableHeader;
