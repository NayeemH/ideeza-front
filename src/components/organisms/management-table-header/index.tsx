import Button from '@atoms/button';
import Dropdown from '@atoms/drop-down';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import SearchInput from '@molecules/search-input';
import React from 'react';
import { IoSettingsSharp } from 'react-icons/io5';

function ManagementTableHeader(props: any) {
	const {
		containerClass,
		mainClass,
		iconClass,
		btnValue,
		onClick,
		btnClass,
		btnValue2,
		onClick2,
		// sortClass,
		classessort,
	} = props;
	return (
		<div className={containerClass}>
			<div className="flex items-center space-x-3 w-full pl-4">
				<CustomDropDownMenu
					className={classessort}
					selectOptions={[
						{
							name: 'All',
							value: 'All',
						},
						{ value: 'no_applied', name: 'No one applied' },
						{ value: '1_applied', name: 'At least 1 applied' },
						{ value: 'status', name: 'Pending status' },
					]}
					inputClasses="h-12 rounded-sm w-32 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right z-20 mt-0 w-64 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
				/>
				<CustomDropDownMenu
					className={classessort}
					selectOptions={[
						{
							name: 'Sort by',
							value: 'Sort by',
						},
						{ value: 'no_applied', name: 'No one applied' },
						{ value: '1_applied', name: 'At least 1 applied' },
						{ value: 'status', name: 'Pending status' },
					]}
					inputClasses="h-12 rounded-sm w-32 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right z-20 mt-0 w-64 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
				/>
			</div>
			<div className={`${mainClass} w-full`}>
				<SearchInput
					className="rounded-md border pl-0"
					inputClass="md:py-3 md:text-md 2xl:text-xl py-2 md:py-3 pl-2 border"
				/>
				<div className="md:flex items-center md:space-x-2 space-y-2 md:space-y-0">
					<Button
						value={btnValue}
						onClick={onClick}
						classes={{
							root: 'px-4 w-full md:w-auto md:py-2 py-2 rounded-md tracking-tight bg-primary text-white md:text-md 2xl:text-xl font-semibold shadow-none transform-none font-sans',
						}}
						color="primary"
					/>
					<Button
						value={btnValue2}
						onClick={onClick2}
						classes={{
							root: `px-4 w-full md:w-auto md:py-2 py-3 rounded-md tracking-tight bg-primary text-white md:text-md 2xl:text-xl font-semibold shadow-none transform-none font-sans ${btnClass}`,
						}}
					/>
					<Dropdown
						className={iconClass}
						icons={<IoSettingsSharp className={`text-2xl text-gray-900`} />}
						itemsClasses={{
							root: 'font-sans md:text-md 2xl:text-xl px-4 w-32 py-1 hover:text-primary text-gray-700',
						}}
						options={[
							{
								name: 'Pause',
								value: 'Pause',
							},
							{
								name: 'Approve',
								value: 'Approve',
							},
							{
								name: 'Delete',
								value: 'Delete',
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
}
ManagementTableHeader.defaultProps = {
	containerClass: 'flex md:flex-row flex-col items-center justify-between px-4',
	mainClass: 'md:flex justify-end items-center md:space-x-2 space-y-2 md:space-y-0',
	value: 'Manage Users, Technicians & Service Providers',
	labelClass: 'text-gray-700 text-base font-sans tracking-tight font-semibold',
	extraBtn: false,
	classessort: { root: 'font-bold' },
};
export default ManagementTableHeader;
