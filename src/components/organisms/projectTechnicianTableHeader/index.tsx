import React from 'react';
// import { SearchInput } from "molecules";
import SearchInput from '@molecules/search-input';
import Settings from '@molecules/settings';
// import CustomSelect from "@molecules/custom-select";
import CustomDropDownMenu from '@molecules/custom-dropdown';
// import CustomDropDownMenu from "molecules/dropdown-items";

function ProjectTechnicianTableHeader({ handleSearch }: { handleSearch: (e?: any) => void }) {
	return (
		<div
			className={`flex md:flex md:flex-wrap xl:flex-nowrap w-full items-center md:justify-between px-3 pt-3`}
		>
			<div className="sm:grid sm:grid-cols-4 2xl:grid-cols-6 gap-2 md:w-full sm:mb-2">
				{/* <CustomSelect
          options={[
            {
              name: "All ",
              value: "All ",
            },
            {
              name: "Cover",
              value: "Cover",
            },
            {
              name: "Electronics",
              value: "Electronics",
            },
            {
              name: "Parts",
              value: "Parts",
            },
          ]}
          inputClassName="form-select mr-[10px] w-[110px] bg-gray-100 text-black rounded-md text-xl font-light "
          unorderedList="absolute top-[48px] min-w-[225px] bg-white shadow-lg flex flex-wrap gap-4 z-10"
        /> */}
				<CustomDropDownMenu
					// className={classessort}
					selectOptions={[
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
					]}
					inputClasses="h-12 rounded-sm sm:w-44 md:w-64 lg:w-48 xl:w-52 2xl:w-64 pl-8 font-sans tracking-wider text-base xl:text-xl  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right mt-0 md:w-44 lg:w-48 xl:w-52 2xl:w-64 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm z-10 -mt-1"
					// labelValue={"Search..."}
					placeholder="Select"
				/>
			</div>
			<div className={''}>
				<SearchInput
					className="rounded-md border pl-0"
					placeholder="Search"
					inputClass="py-3 md:text-md 2xl:text-xl border"
					change={handleSearch}
				/>
			</div>
			<Settings
				options={[
					{
						name: 'View',
						value: 'View',
					},
				]}
			/>
		</div>
	);
}
ProjectTechnicianTableHeader.defaultProps = {
	extraBtn: false,
	classessort: { root: 'font-bold' },
};
export default ProjectTechnicianTableHeader;
