import Label from '@atoms/label';
import TwoLabels from '@molecules/two-levels';
import { format } from 'date-fns';
import React from 'react';
function TabAbout({ profile }: any) {
	// TODO::
	// const language = (profile?.languages.map(a => a.name)).join()
	return (
		<div className="3xl:max-w-[338px]">
			<Label
				value="CONTACT INFORMATION"
				classes={{
					root: ` font-semibold text-base 2xl:text-2xl text-[#333333]  tracking-tight uppercase`,
				}}
			/>

			{/* <div className={`grid md:grid-cols-2 grid-cols-1 md:gap-x-2`}> */}
			{!profile?.phone &&
				!profile?.address &&
				!profile?.email &&
				!profile?.website &&
				!profile?.dob &&
				!profile?.gender && (
					<div className="w-full flex justify-center">
						<Label
							value="No information found"
							className="text-primary text-lg font-semibold"
						/>
					</div>
				)}
			<div className="space-y-5 mt-8">
				{profile?.phone && (
					<TwoLabels
						mainClass="flex "
						value="Phone"
						value2={profile?.phone ?? ''}
						labelClass="text-[#333333] w-[82px]  text-sm md:text-base font-proxima-nova font-semibold  tracking-tight "
						labelClass2="text-[#787878] text-sm md:text-base font-proxima-nova tracking-tight  "
					/>
				)}
				{profile?.address && (
					<TwoLabels
						mainClass="flex"
						value="Address"
						value2={profile?.address ?? ''}
						labelClass="text-[#333333] w-[82px]  text-sm md:text-base font-proxima-nova font-semibold  tracking-tight"
						labelClass2="text-[#787878] text-sm md:text-base font-proxima-nova tracking-tight  "
					/>
				)}
				{profile?.email && (
					<TwoLabels
						mainClass="flex"
						value="Email"
						value2={profile?.email ?? ''}
						labelClass="text-[#333333] w-[82px]  text-sm md:text-base font-proxima-nova font-semibold  tracking-tight"
						labelClass2="text-[#787878] text-sm md:text-base font-proxima-nova tracking-tight  "
					/>
				)}
				{profile?.website && (
					<TwoLabels
						mainClass="flex"
						value="Site"
						value2={profile?.website ?? ''}
						labelClass="text-[#333333] w-[82px]  text-sm md:text-base font-proxima-nova font-semibold  tracking-tight"
						labelClass2="text-primary text-sm md:text-base font-proxima-nova tracking-tight  "
					/>
				)}
			</div>
			{/* </div> */}

			{(profile?.dob || profile?.gender) && (
				<>
					<Label
						value="BASIC INFORMATION"
						classes={{
							root: `font-semibold text-base 2xl:text-2xl text-[#333333]  text-base 2xl:text-2xl tracking-tight uppercase md:mt-6 mt-2`,
						}}
					/>
					{/* <div className={`grid md:grid-cols-2 grid-cols-1 md:gap-x-2`}> */}
					<div className="space-y-5 mt-11">
						{profile?.dob && (
							<TwoLabels
								mainClass="flex"
								value="Birthday"
								value2={format(new Date(profile?.dob), 'do MMMM, yyyy') ?? ''}
								labelClass="text-[#333333] w-[82px]  text-sm md:text-base font-proxima-nova font-semibold  tracking-tight "
								labelClass2="text-[#787878] text-sm md:text-base font-proxima-nova tracking-tight  "
							/>
						)}
						{profile?.gender && (
							<TwoLabels
								mainClass="flex"
								value="Gender"
								value2={profile?.gender ?? ''}
								labelClass="text-[#333333] w-[82px]  text-sm md:text-base font-proxima-nova font-semibold  tracking-tight "
								labelClass2="text-[#787878] text-sm md:text-base font-proxima-nova tracking-tight  "
							/>
						)}
					</div>
					{/* </div> */}
				</>
			)}
		</div>
	);
}
export default TabAbout;
