import Button from '@atoms/button';
import Modal from '@atoms/modal';
import CustomDropDownMenuSort from '@molecules/dropdown-items-custom';
import LabelFields from '@molecules/label-field';
import React from 'react';

function AddProcessPopup(props: any) {
	const { open, toggleOpen, classessort } = props;

	return (
		<div>
			<Modal
				width="sm"
				close={toggleOpen}
				header={
					<div className="pb-2 p-6 pl-0">
						<LabelFields
							value="Add new process"
							className="text-primary texl-lg 2xl:text-2xl font-semibold font-sans tracking-tight"
						/>
					</div>
				}
				content={
					<div className="space-y-2">
						<input
							placeholder="Name of the process"
							name="name"
							className="w-full text-gray-700 text-base 2xl:text-xl font-sans h-11 -ml-2 p-2 py-2 rounded border border-solid border-gray-160"
						/>
						<CustomDropDownMenuSort
							className={classessort}
							selectOptions={[
								{ value: 'Sub-processes', name: 'Sub-processes' },
								{ value: 'ceo', name: 'CEO' },
								{ value: 'cto', name: 'CTO' },
								{ value: 'cfo', name: 'CFO' },
								{ value: 'cso', name: 'CSO' },
							]}
							inputClasses="p-2 pl-4 py-5 w-full rounded border border-solid border-gray-160  font-sans tracking-wider text-base  cursor-pointer"
							labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 pr-0 text-sm font-medium focus:outline-none text-gray-700"
							labelWrapperClass="flex cursor-pointer md:relative w-full"
							dropDownClasses="origin-top-right z-20 mt-0 w-80 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded -mt-1"
							placeholder="Search..."
						/>
						<CustomDropDownMenuSort
							className={classessort}
							selectOptions={[
								{ value: 'Machines', name: 'Machines' },
								{ value: 'ceo', name: 'CEO' },
								{ value: 'cto', name: 'CTO' },
								{ value: 'cfo', name: 'CFO' },
								{ value: 'cso', name: 'CSO' },
							]}
							inputClasses="p-2 pl-4 py-5 w-full rounded border border-solid border-gray-160  font-sans tracking-wider text-base  cursor-pointer"
							labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 pr-0 text-sm font-medium focus:outline-none text-gray-700"
							labelWrapperClass="flex cursor-pointer md:relative w-full"
							dropDownClasses="origin-top-right z-20 mt-0 w-80 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded -mt-1"
							placeholder="Search..."
						/>
					</div>
				}
				actions={
					<>
						<div className="flex justify-start w-full p-4 pl-0 space-x-3">
							<Button
								onClick={toggleOpen}
								value="Create process"
								classes={{
									root: `text-white bg-primary py-3 px-6 leading-5 text-base 2xl:text-xl tracking-tight font-sans capitalize rounded`,
								}}
							/>
							<Button
								onClick={toggleOpen}
								value="Cancel"
								classes={{
									root: `text-gray-700 border border-gray-600 border-solid bg-white py-3 px-6 leading-5 text-base 2xl:text-xl tracking-tight font-sans capitalize rounded`,
								}}
							/>
						</div>
					</>
				}
				open={open}
			/>
		</div>
	);
}
AddProcessPopup.defaultProps = {
	extraBtn: false,
	classessort: { root: 'font-bold' },
};
export default AddProcessPopup;
