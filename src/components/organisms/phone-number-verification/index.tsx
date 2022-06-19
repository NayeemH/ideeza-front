import Button from '@atoms/button';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import ReactSelect from '@atoms/select';
import IconLabel from '@molecules/icon-label';
import React from 'react';
import { IoClose } from 'react-icons/io5';

function PhoneNumber(props: any) {
	const { open, toggleOpen } = props;

	return (
		<div>
			<Modal
				width="sm"
				close={toggleOpen}
				header={
					<>
						<IconLabel
							mainClass="flex w-full items-center justify-between flex-row-reverse pl-6 pr-2 pt-3 pb-7"
							lableClass={{
								root: `texl-lg 2xl:text-2xl text-primary font-semibold tracking-tight font-sans md:pl-1`,
							}}
							labelValue="Add your mobile number"
							iconContanerClass=""
							iconComponent={
								<IoClose
									className="text-red-300 text-3xl cursor-pointer -mt-2"
									onClick={toggleOpen}
								/>
							}
							tooltipProps={{ open: false }}
						/>
					</>
				}
				content={
					<>
						<img
							src="/images/logo/phone-logo.png"
							alt="verify"
							className="mx-auto w-28"
						/>
						<Label
							value="Add your mobile number"
							className="text-center font-semibold text-base 2xl:text-xl text-gray-700 pt-3 font-sans tracking-tight"
						/>
						<Label
							className="text-base  font-sans tracking-tight pt-1 text-gray-700 text-center"
							value={
								<>
									Phone verification
									<span className="text-primary"> (SMS) </span>
								</>
							}
						/>
						<div className="grid grid-cols-3 items-start  gap-x-2 pt-3 md:px-2 overflow-hidden">
							<ReactSelect
								placeholder="ISR +972"
								containerClass="bg-white h-12 w-32 shadow rounded"
							/>
							<div className="col-span-2">
								<input
									type="number"
									placeholder="Mobile number"
									className="bg-gray-100 h-12 text-base 2xl:text-xl tracking-tight  rounded-md pl-10 focus:outline-none"
								/>
								{/* <Input
                  type="number"
                  placeholder="Mobile number"
                  className={{ root: "text-base 2xl:text-xl pl-0" }}
                  containerClass="bg-gray-100 tracking-tight text-base 2xl:text-xl rounded-md pl-0"
                /> */}
								<Label
									value="Messaging rates may apply."
									className="text-zinc-300 text-base  pt-1 tracking-tight font-sans"
								/>
							</div>
						</div>
					</>
				}
				actions={
					<>
						<div className="w-full flex space-x-2 justify-center pb-5 pt-8 md:px-6 px-4">
							<Button
								onClick={toggleOpen}
								value="Cancel"
								classes={{
									root: `text-primary border border-gray-500 border-solid border-primary shadow-none bg-white font-sans capitalize py-2 text-md w-22`,
								}}
							/>
							<Button
								value="Next"
								classes={{
									root: `text-white bg-primary py-2 px-6 text-md shadow-none font-sans capitalize `,
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

export default PhoneNumber;
