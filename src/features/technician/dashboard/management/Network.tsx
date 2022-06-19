import React from 'react';
import Label from '@atoms/label';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import NetworkCard from '@organisms/network-card';

function ManagementNetwork(props: any) {
	const { classessort } = props;
	return (
		<div className="pt-4">
			<Label
				value="Network"
				classes={{
					root: 'text-primary tracking-tight font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
				}}
			/>
			<div className="w-full bg-white rounded-lg shadow space-y-3 md:p-6 p-4">
				<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-12 gap-y-3 md:gap-y-0">
					<div className="flex justify-between 2xl:justify-start">
						<div className="mr-2 font-sans text-base 2xl:text-xl flex items-center">
							Country
						</div>
						<CustomDropDownMenu
							className={classessort}
							selectOptions={[
								{
									name: 'Isreal',
									value: 'Isreal',
								},
								{
									name: 'USA',
									value: 'USA',
								},
							]}
							inputClasses="h-12 rounded-sm w-28 2xl:w-44 md:w-36 pl-2 font-sans tracking-wider text-lg bg-gray-200 cursor-pointer border border-solid"
							labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
							labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-16 truncate md:w-auto font-sans"
							labelWrapperClass="flex items-center cursor-pointer md:relative"
							dropDownClasses="origin-top-right mt-0 w-28 2xl:w-44 md:w-36 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
						/>
					</div>
					<div className="flex justify-between 2xl:justify-start">
						<div className="mr-2 font-sans text-base 2xl:text-xl flex items-center">
							Type
						</div>
						<CustomDropDownMenu
							className={classessort}
							selectOptions={[
								{
									name: 'Cellular, RF',
									value: 'Cellular, RF',
								},
								{
									name: 'USA',
									value: 'USA',
								},
							]}
							inputClasses="h-12 rounded-sm w-28 2xl:w-44 md:w-36 pl-2 font-sans tracking-wider bg-gray-200 text-lg cursor-pointer border border-solid"
							labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
							labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-16 truncate md:w-auto font-sans"
							labelWrapperClass="flex items-center cursor-pointer md:relative"
							dropDownClasses="origin-top-right mt-0 w-28 2xl:w-44 md:w-36 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
						/>
					</div>
				</div>
				<NetworkCard
					value="Cellular"
					rf="hidden"
				/>
				<NetworkCard
					value="RF"
					cellular="hidden"
				/>
			</div>
		</div>
	);
}
ManagementNetwork.defaultProps = {
	extraBtn: false,
	classessort: { root: 'font-bold' },
};

export default ManagementNetwork;
