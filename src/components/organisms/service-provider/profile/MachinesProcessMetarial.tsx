import Label from '@atoms/label';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import Image from 'next/image';
import React from 'react';

const MachinesProcessMetarial = () => {
	return (
		<>
			<div className="h-80 overflow-scroll">
				<div>
					<Label
						value="3D printing - Additive"
						className="text-primary text-xl font-bold"
					/>
					<div className="w-full mt-5 flex justify-between ">
						<div className="flex flex-col ">
							<Image
								src="/images/technician-profile/6d22daf4-18cb-4348-9d30-29ce186d6da3.png"
								alt="Picture of the author"
								width={220}
								height={175}
							/>
							<p className="text-xl">Flame reducers for military</p>
							<small className="text-lg text-gray-400">3D Systems</small>
						</div>

						<div className="flex flex-col">
							<Image
								src="/images/technician-profile/51T+nA5ZhWL._SY355_.png"
								alt="Picture of the author"
								width={220}
								height={175}
							/>
							<p className="text-xl">Prototype</p>
							<small className="text-lg text-gray-400">3D Systems</small>
						</div>
						<div>
							<Image
								src="/images/technician-profile/312639.png"
								alt="Picture of the author"
								width={220}
								height={175}
							/>
							<p className="text-xl">Wire grippers</p>
							<small className="text-lg text-gray-400">3D Systems</small>
						</div>
					</div>
				</div>
				<div>
					<Label
						value="CNC Machining - Subtractive"
						className="text-primary text-xl font-bold"
					/>
					<div className="w-full mt-5 flex justify-between ">
						<div className="flex flex-col ">
							<Image
								src="/images/technician-profile/1563886209_1490619.png"
								alt="Picture of the author"
								width={220}
								height={175}
							/>
							<p className="text-xl">Flame reducers for military</p>
							<small className="text-lg text-gray-400">3D Systems</small>
						</div>

						<div className="flex flex-col">
							<Image
								src="/images/technician-profile/DSC_0083__17745.1423154114.1200.1200.png"
								alt="Picture of the author"
								width={220}
								height={175}
							/>
							<p className="text-xl">Prototype</p>
							<small className="text-lg text-gray-400">3D Systems</small>
						</div>
						<div>
							<Image
								src="/images/technician-profile/Processor-Application-and-Computer-Case-CPU-Cooler-Heatsink-Type.png"
								alt="Picture of the author"
								width={220}
								height={175}
							/>
							<p className="text-xl">Wire grippers</p>
							<small className="text-lg text-gray-400">3D Systems</small>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-5 flex justify-between">
				<CustomDropDownMenu
					//   className={classessort}
					selectOptions={[
						{
							name: 'Process',
							value: 'Process',
						},
						{
							name: 'Process',
							value: 'Process',
						},
						{
							name: 'Process',
							value: 'Process',
						},
						{
							name: 'Process',
							value: 'Process',
						},
					]}
					inputClasses="h-12 rounded-sm sm:w-32 md:w-36 2xl:w-56 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right mt-0 md:w-44 lg:w-48 xl:w-52 2xl:w-56 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm z-10 -mt-1"
					// labelValue={"Search..."}
					//   placeholder="Search..."
				/>
				<CustomDropDownMenu
					//   className={classessort}
					selectOptions={[
						{
							name: 'sub-Process',
							value: 'sub-Process',
						},
						{
							name: 'sub-Process',
							value: 'sub-Process',
						},
						{
							name: 'sub-Process',
							value: 'sub-Process',
						},
						{
							name: 'sub-Process',
							value: 'sub-Process',
						},
					]}
					inputClasses="h-12 rounded-sm sm:w-32 md:w-36 2xl:w-56 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right mt-0 md:w-44 lg:w-48 xl:w-52 2xl:w-56 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm z-10 -mt-1"
					// labelValue={"Search..."}
					//   placeholder="Search..."
				/>
				<CustomDropDownMenu
					//   className={classessort}
					selectOptions={[
						{
							name: 'metarial',
							value: 'metarial',
						},
						{
							name: 'metarial',
							value: 'metarial',
						},
						{
							name: 'metarial',
							value: 'metarial',
						},
						{
							name: 'metarial',
							value: 'metarial',
						},
					]}
					inputClasses="h-12 rounded-sm sm:w-32 md:w-36 2xl:w-56 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right mt-0 md:w-44 lg:w-48 xl:w-52 2xl:w-56 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm z-10 -mt-1"
					// labelValue={"Search..."}
					//   placeholder="Search..."
				/>
			</div>
		</>
	);
};

export default MachinesProcessMetarial;
