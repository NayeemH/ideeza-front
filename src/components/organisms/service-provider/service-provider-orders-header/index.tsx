import CustomDropDownMenu from '@molecules/custom-dropdown';
import SearchInput from '@molecules/search-input';
import React from 'react';

const ServiceProviderOrdersHeader = (props: any) => {
	const { classessort } = props;
	const selectOptions = [
		{
			name: 'All payment methods',
			value: 'All payment methods',
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
			className={` md:flex  md:flex-wrap xl:flex-nowrap w-full md:items-start  px-3 pt-3 mb-10 md:mb-14`}
		>
			<div className="w-3/4 md:flex shrink-0  ">
				{/* sm:grid-cols-4 2xl:grid-cols-6 grid-cols-2 */}
				<CustomDropDownMenu
					className={classessort}
					selectOptions={selectOptions}
					inputClasses="h-12 rounded-sm sm:w-32 md:w-36 2xl:w-56 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right mt-0 md:w-44 lg:w-48 xl:w-52 2xl:w-56 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm z-10 -mt-1"
					// labelValue={"Search..."}
					//   placeholder="Search..."
				/>
				<CustomDropDownMenu
					className={classessort}
					selectOptions={[
						{
							name: 'All type product',
							value: 'All type product',
						},
						{
							name: 'All type product',
							value: 'All type product',
						},
						{
							name: 'All type product',
							value: 'All type product',
						},
						{
							name: 'All type product',
							value: 'All type product',
						},
					]}
					inputClasses="h-12 rounded-sm sm:w-32 md:w-36 2xl:w-56 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right mt-0 w-56 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm z-10 -mt-1"
					//   placeholder="Search..."
					// labelValue={"Search..."}
					//   a change function should be passed as props to get value from the component
				/>
				<CustomDropDownMenu
					className={classessort}
					selectOptions={[
						{
							name: '2018',
							value: '2018',
						},
						{
							name: '2019',
							value: '2019',
						},
						{
							name: '2020',
							value: '2020',
						},
						{
							name: '2021',
							value: '2021',
						},
					]}
					inputClasses="h-12 rounded-sm sm:w-32 md:w-36 2xl:w-44 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right mt-0 w-56 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm z-10 -mt-1"
					//   placeholder="Search..."
					// labelValue={"Search..."}
					//   a change function should be passed as props to get value from the component
				/>

				<CustomDropDownMenu
					className={classessort}
					selectOptions={[
						{
							name: 'Order Status',
							value: 'Order Status',
						},
						{
							name: 'Order Status',
							value: 'Order Status',
						},
						{
							name: 'Order Status',
							value: 'Order Status',
						},
						{
							name: 'Order Status',
							value: 'Order Status',
						},
					]}
					inputClasses="h-12 rounded-sm sm:w-32 md:w-36 2xl:w-44 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right mt-0 w-56 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm z-10 -mt-1"
					//   placeholder="Search..."
					// labelValue={"Search..."}
				/>

				<CustomDropDownMenu
					className={classessort}
					selectOptions={[
						{
							name: 'Type',
							value: 'Type',
						},
						{
							name: 'Type',
							value: 'Type',
						},
						{
							name: 'Type',
							value: 'Type',
						},
						{
							name: 'Type',
							value: 'Type',
						},
					]}
					inputClasses="h-12 rounded-sm sm:w-32 md:w-36 2xl:w-44 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right mt-0 w-56 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm z-10 -mt-1"
					//   placeholder="Search..."
					// labelValue={"Search..."}
				/>
			</div>
			<div className="w-full ">
				<SearchInput
					className="rounded-md w-full border pl-0"
					placeholder="Search"
					inputClass="py-3 text-base 2xl:text-xl "
				/>
			</div>
		</div>
	);
};

ServiceProviderOrdersHeader.defaultProps = {
	extraBtn: false,
	classessort: { root: 'font-bold' },
};

export default ServiceProviderOrdersHeader;
