import React from 'react';
import Modal from '@atoms/modal';
import Button from '@atoms/button';
// import TextField from "@molecules/text-field";
import { IoClose } from 'react-icons/io5';
// import CustomDropDownMenu from "@molecules/custom-dropdown";
// import SelectField from "@molecules/select-field";
import CustomSelect from '@molecules/custom-select';
function InvestorPopup(props: any) {
	const { open, toggleOpen } = props;

	return (
		<div>
			<Modal
				width="md"
				className={{ paper: 'p-[30px] w-[877px] rounded-[20px]' }}
				close={toggleOpen}
				header={
					<>
						{/* <img
              src="/assets/images/cross.png"
              onClick={toggleOpen}
              className="w-4 cursor-pointer ml-auto"
              alt="image"
            /> */}
						<div className="flex justify-between items-center w-full mb-[28px]">
							<div className="text-[#333333] text-[24px] leading-[41px] font-poppins">
								Join Now
							</div>
							<IoClose
								onClick={toggleOpen}
								className="cursor-pointer text-red-500 text-[24px]"
							/>
						</div>
					</>
				}
				content={
					<div className="custom-popup-investor">
						{/* <TextField
              mainClass="flex flex-col md:w-1/2"
              inputClasses={`text-blue-500 border border-blue-300 py-1 px-0`}
              labelClasses="text-blue-300 text-lg font-sans tracking-tight pb-2"
              labelvalue="Your Name"
              placeholder="name"
              name="name"
            /> */}
						<label>
							<span className="mb-[10px] text-base font-[500] block">First Name</span>
							<input
								className="placeholder-[#B9B9B9] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] w-full border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA] mb-[18px]"
								placeholder="Enter your first name"
							/>
						</label>
						{/* <TextField
              mainClass="flex flex-col md:w-1/2"
              inputClasses={`text-blue-500 border border-blue-300 py-1 px-0`}
              labelClasses="text-blue-300 text-lg font-sans tracking-tight pb-2"
              labelvalue="Your email"
              placeholder="email"
              name="email"
            /> */}
						<label>
							<span className="mb-[10px] text-base font-[500] block">Last Name</span>
							<input
								className="placeholder-[#B9B9B9] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] w-full border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA] mb-[18px]"
								placeholder="Enter your last name"
							/>
						</label>
						{/* <TextField
              mainClass="flex flex-col md:w-1/2"
              inputClasses={`text-blue-500 border border-blue-300 py-1 px-0`}
              labelClasses="text-blue-300 text-lg font-sans tracking-tight pb-2"
              labelvalue="Your phone number"
              placeholder="+995"
              name="number"
            /> */}
						<label>
							<span className="mb-[10px] text-base font-[500] block">
								Email address
							</span>
							<input
								className="placeholder-[#B9B9B9] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] w-full border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA] mb-[18px]"
								placeholder="Enter your email address"
							/>
						</label>
						<label>
							<span className="mb-[10px] text-base font-[500] block">Phone</span>
							<input
								className="placeholder-[#B9B9B9] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] w-full border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA] mb-[18px]"
								placeholder="+12 232 3213"
							/>
						</label>
						<div className="mb-[10px] text-base font-[500] block">Section</div>
						<CustomSelect
							options={[
								{
									name: 'Salesman',
									value: 'Salesman',
								},
								{
									name: 'Project Manger',
									value: 'Project Manger',
								},
								{
									name: 'Other',
									value: 'OTHER',
								},
							]}
							inputClassName="placeholder-[#B9B9B9] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] w-full border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
							placeholder="Salesman"
							unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 mt-5 top-10 text-xl"
							// arrowColor="text-[#787878] text-[25px]"
							arrowColor=" text-primary ml-[-40px] lg:ml-[-30px] xl:ml-[-2.5rem]"
							arrowColorTop=" text-primary ml-[-40px] lg:ml-[-30px] xl:ml-[-2.5rem]"
							// isArrowTrue={true}
						/>
						{/* <SelectField
              name="selection"
              mainClasses="flex flex-col md:w-1/2"
              containerClass="border rounded border-solid border-blue-300 text-sm py-1"
              value="Section"
              labelClasses="text-blue-300 text-lg font-sans tracking-tight pb-2"
              placeholder="Select One"
              options={[
                {
                  name: "Salesman",
                  value: "Salesman",
                },
                {
                  name: "Project Manger",
                  value: "Project Manger",
                },
                {
                  name: "Other",
                  value: "OTHER",
                },
              ]}
              className="bg-white text-xs py-0 h-3 px-2 pr-4 rounded-md border border-solid"
            /> */}
						{/* <CustomDropDownMenu
              className="font-bold"
              selectOptions={[
                {
                  name: "Salesman",
                  value: "Salesman",
                },
                { value: "no_applied", name: "No one applied" },
                { value: "1_applied", name: "At least 1 applied" },
                { value: "status", name: "Pending status" },
              ]}
              inputClasses="h-14 rounded-sm pl-2 w-1/2 font-sans border border-solid border-blue-300 rounded tracking-wider text-base  cursor-pointer bg-white"
              labelBtnClasses=" w-full rounded-md shadow-none px-4 pr-0 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
              labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
              labelWrapperClass="flex cursor-pointer md:relative"
              dropDownClasses="origin-top-right z-20 mt-0 w-96 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
              isCartDropDown={true}
            /> */}
						{/* <TextField
              mainClass="flex flex-col"
              inputClasses={`text-blue-500 border border-blue-300 py-1 px-0`}
              labelClasses="text-blue-300 text-lg font-sans tracking-tight pb-2"
              labelvalue="Message"
              placeholder="Description"
              name="description"
              multiline={true}
              rows="8"
            /> */}
						<div className="mb-[10px] mt-[18px] text-base font-[500] block">
							Message
						</div>
						<textarea
							rows={6}
							style={{ width: '100%' }}
							className="placeholder-[#B9B9B9] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] w-full border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
							placeholder="Description"
						/>
					</div>
				}
				actions={
					<>
						<div className="w-full py-[20px]">
							<Button
								onClick={toggleOpen}
								value="Send"
								classes={{
									root: `text-white bg-primary py-[15px] px-[30px] leading-5 text-[16px] tracking-tight font-poppins capitalize rounded shadow-none`,
								}}
								color="primary"
							/>
						</div>
					</>
				}
				open={open}
			/>
		</div>
	);
}
export default InvestorPopup;
