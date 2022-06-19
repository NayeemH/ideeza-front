import Label from '@atoms/label';
import AddMoreInformation from '@molecules/add-more-information';
import TextField from '@molecules/text-field';
import React from 'react';
import TimezoneSelect from 'react-timezone-select';

function AdditionalInformation({
	change,
	school,
	setSchool,
	work,
	setWork,
	timezone,
	setTimezone,
	permissionType,
	languagesList,
	value,
	setPermissionType,
}: any) {
	return (
		<div>
			<div className="rounded-lg bg-white  space-y-3 p-5 md:px-6 px-4 w-full">
				<TextField
					name="first_name"
					mainClass="flex items-center"
					inputClasses="w-full h-11 rounded-md bg-[#FBFBFB] border border-[#E6E6E6] p-0 py-2 md:text-base text-sm tracking-tight   placeholder-[#999999] text-[#333333] border-opacity-40 "
					labelClasses="text-gray-700 txt-c2-color md:text-base text-sm  tracking-tight w-2/4"
					labelvalue="School"
					value={school}
					onChange={(e?: any) => setSchool(e.target.value)}
					placeholder="Govt high school"
				/>
				<TextField
					mainClass="flex items-center"
					name="last_name"
					inputClasses="w-full h-11 rounded-md p-0 py-2 md:text-base text-sm tracking-tight  bg-[#FBFBFB] border border-[#E6E6E6] placeholder-[#999999] text-[#333333] border-opacity-40 "
					labelClasses="text-gray-700  md:text-base text-sm  tracking-tight w-2/4"
					labelvalue="Work"
					value={work}
					onChange={(e?: any) => setWork(e.target.value)}
					placeholder="Ideeza LLC"
				/>

				<div className="flex items-center">
					<Label
						value="Timezone"
						className="text-gray-700 md:text-base text-sm  tracking-tight w-2/4"
					/>
					<div className="w-full">
						<TimezoneSelect
							value={timezone}
							onChange={setTimezone}
							className=" max-w-[502px]  rounded-md p-0 py-2 md:text-base text-sm focus:outline-none tracking-tight "
						/>
					</div>
				</div>
				<div className=""></div>

				<AddMoreInformation
					mainClass="grid grid-cols-3"
					labelClasses="text-gray-700 md:text-base text-sm"
					change={change}
					value={value}
					languagesList={languagesList}
				/>
				<TextField
					name="permission_type"
					mainClass="flex items-center"
					inputClasses="w-full h-11 rounded-md p-0 py-2 md:text-base text-sm txt-c-color tracking-tight  bg-[#FBFBFB] border border-[#E6E6E6] placeholder-[#999999] text-[#333333]  border-opacity-40"
					labelClasses="text-gray-700 md:text-base text-sm  tracking-tight w-2/4"
					labelvalue="Permission Type"
					value={permissionType}
					onChange={(e?: any) => setPermissionType(e.target.value)}
					placeholder="CMO"
				/>
			</div>
		</div>
	);
}

export default AdditionalInformation;
