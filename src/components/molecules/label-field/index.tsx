import React from 'react';
import Label from '@atoms/label';
import Button from '@atoms/button';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import Router from 'next/router';
import { useAppSelector } from 'app/hooks';

function LabelFields(props: any) {
	const {
		value,
		selectdivclass,
		btnValue,
		labelClasses,
		buttonclasses,
		classesseeall = 'text-primary underline ml-3 text-base 2xl:text-xl cursor-pointer',
		labelseeall,
		classessort,
		mainClass,
		reverseClass,
		iconEnd,
		iconStart,
		btnAction,
		handleClick,
		selectOptions,
		noBtn,
		goTo,
	} = props;
	// const handleClick=()=> {
	//   history.push("/user/dashboard/see-all-projects");
	// }
	const userId = useAppSelector((state) => state?.auth?.userData?.id);

	return (
		<div
			className={`sm:flex w-full items-center justify-between font-sans tracking-tight ${mainClass}`}
		>
			<div className="flex items-center justify-between px-2 pl-0">
				<Label
					value={value}
					classes={{ root: `${labelClasses}` }}
				/>
				<div onClick={handleClick}>
					<Label
						value={labelseeall}
						classes={classesseeall}
					/>
				</div>
			</div>

			{selectOptions && (
				<CustomDropDownMenu
					change={handleClick}
					labelValue="Sort By"
					className={classessort}
					selectOptions={selectOptions}
					inputClasses="h-10 rounded-sm md:w-56 font-sans tracking-wider text-lg cursor-pointer"
					labelBtnClasses="inline-flex justify-center w-full rounded-md shadow-none px-4 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-bold text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-16 truncate md:w-auto font-sans md:ml-1 -ml-1 mr-2"
					labelWrapperClass="flex items-center cursor-pointer md:relative"
					dropDownClasses="origin-top-right md:w-40 mt-2 md:w-56 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm ml-24"
				/>
			)}
			{!noBtn && (
				<div className={` ${reverseClass}`}>
					{goTo === 'LastActivity' ? (
						<Button
							value={btnValue}
							iconStart={iconStart}
							iconEnd={iconEnd}
							className={`transform-none font-sans tracking-tight text-[#999999] shadow-none mt-4 sm:mt-0 ${buttonclasses}`}
							onClick={() =>
								Router.push({
									pathname: `/user/profile/${userId}`,
									query: { position: 5 },
								})
							}
						/>
					) : (
						<Button
							value={btnValue}
							iconStart={iconStart}
							iconEnd={iconEnd}
							className={`transform-none font-sans tracking-tight text-[#999999] shadow-none ${buttonclasses}`}
							onClick={btnAction}
						/>
					)}

					<div className={`flex items-center ${selectdivclass}`}></div>
				</div>
			)}
		</div>
	);
}
LabelFields.defaultProps = {
	mainClass: 'border-gray-100 border-b',
	labelClasses: 'text-xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-700',
	buttonclasses:
		'text-sm transform-none rounded-full bg-white border border-solid border-gray-175  tracking-tight px-6 py-2 ',
	classesseeall: {
		root: 'text-primary underline ml-3 text-base 2xl:text-xl cursor-pointer',
	},
	classessort: { root: 'font-bold' },
	className: 'w-48 p-0',
	selectClasses: 'border p-3',
	// selectOptions: [{ value: "some", name: "some" }],
};
export default LabelFields;
