import Button from '@atoms/button';
import Input from '@atoms/input';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import CheckboxFields from '@molecules/checkbox-fields';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import React from 'react';
import { BiDollar } from 'react-icons/bi';
function FilterPopup(props: any) {
	const { open, toggleOpen, classessort } = props;
	return (
		<div>
			<Modal
				width="xs"
				close={toggleOpen}
				header={
					<Label
						value="Filter by"
						classes={{
							root: `text-primary font-extrabold font-sans pt-4 p-7 text-lg`,
						}}
					/>
				}
				content={
					<div className="pl-1">
						{/* <CheckboxLabel
              value="Free shipping"
              id="shipping"
              labelClass="text-gray-300 text-md font-sans pl-2"
              checkboxClass="w-6 h-6 rounded-sm"
            /> */}
						<CheckboxFields
							value="Free shipping"
							labelClass="texl-lg 2xl:text-2xl tracking-normal font-sans text-gray-900"
							name="Free shipping"
							checked={false}
							rules={''}
						/>
						<Label
							value="Price"
							classes={{
								root: `text-gray-600 text-md font-sans tracking-tight pb-1 pt-3`,
							}}
						/>
						<div className="space-x-3 grid grid-cols-2 pr-3">
							<Input
								isIcon
								position="end"
								placeholder="min"
								className={{
									root: `border pl-0 py-1 pr-2 border-solid border-gray-250 text-gray-300`,
								}}
							>
								<BiDollar className="text-gray-650 text-sm" />
							</Input>
							<Input
								isIcon
								position="end"
								placeholder="max"
								className={{
									root: `border pl-0 py-1 pr-2 border-solid border-gray-250 text-gray-300`,
								}}
							>
								<BiDollar className="text-gray-650 text-sm" />
							</Input>
						</div>
						{/* <SelectField
              value="Delivery Time"
              labelClasses="text-gray-300 text-md font-sans tracking-tight pb-1 pt-3"
              // options=""
              mainClasses="flex flex-col"
              className="bg-white text-sm pl-2 py-3 pr-4 border border-gray-250 border-solid"
              placeholder="1 day"
            /> */}
						<CustomDropDownMenu
							className={classessort}
							selectOptions={[
								{
									name: 'Fabrication',
									value: 'Fabrication',
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
							inputClasses="h-12 rounded-sm w-48 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
							labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
							labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
							labelWrapperClass="flex cursor-pointer md:relative"
							dropDownClasses="origin-top-right z-20 mt-0 w-48 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
							// placeholder="Search..."
						/>
					</div>
				}
				actions={
					<div className="pl-0 pb-3 pt-5">
						<Button
							className="bg-primary text-white px-7  transform-none text-sm py-2"
							value="Save"
							onClick={toggleOpen}
							color="primary"
						/>
					</div>
				}
				open={open}
			/>
		</div>
	);
}
export default FilterPopup;
