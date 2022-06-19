import CustomDropDownMenu from '@molecules/custom-dropdown';
import BlogTableHeader from '@organisms/technician-blog-table-header';
import React from 'react';
import { BsPlus } from 'react-icons/bs';

const ProjectTableHeader = () => {
	const selectOptions = [
		{
			name: 'All ',
			value: 'All ',
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
	return (
		<div
			className={`md:flex md:flex-wrap xl:flex-nowrap w-full items-center justify-between px-3 pt-3`}
		>
			<div className="">
				{/* <Select
          placeholder="All Roles"
          containerClass="w-full bg-gray-200 text-gray-900 text-sm border border-gray-160"
          inputClass="text-sm tracking-tight p-2 leading-4"
          options={[{ value: "Some", name: "Some" }]}
        /> */}
				<CustomDropDownMenu
					// className={classessort}
					selectOptions={selectOptions}
					inputClasses="h-12 rounded-sm sm:w-44 md:w-64 lg:w-48 xl:w-52 2xl:w-64 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right mt-0 md:w-44 lg:w-48 xl:w-52 2xl:w-56 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm z-10 -mt-1"
					// labelValue={"Search..."}
					//   placeholder="Search..."
				/>
			</div>
			<BlogTableHeader
				btnValue="Add New"
				iconEnd={<BsPlus size="30" />}
				labelClass="hidden"
				containerClass=""
				// onClick={AddArticle}
				// containerClass="p-4 md:p-0 md:pr-3"
				// handleSearch={handleSearch}
			/>
		</div>
	);
};

export default ProjectTableHeader;
