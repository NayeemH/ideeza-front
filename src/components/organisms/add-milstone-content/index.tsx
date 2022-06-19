import Button from '@atoms/button';
import Label from '@atoms/label';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';

import { IoClose } from 'react-icons/io5';

interface AddMilstoneContentProps {
	handleCloseAddMilstone: any;
}
const AddMilstoneContent: React.FC<AddMilstoneContentProps> = (props) => {
	const { handleCloseAddMilstone } = props;
	const { register } = useForm();

	return (
		<>
			<div className="flex justify-between items-center mb-[50px]">
				<h3 className="text-primary text-[25px] font-semibold ">Add Milstone</h3>
				<IoClose
					onClick={handleCloseAddMilstone}
					className="text-red-600 text-4xl"
				/>
			</div>
			<label className="text-[18px] mb-[10px] block font-bold text-[#333333]">
				Name of Milestone 4
			</label>
			<input
				placeholder="Milestone Name"
				name="name"
				className="border border-[#CCCCCC] rounded-[5px] py-[20px] px-[10px] w-full text-lg 2xl:text-xl text-[#333333] outline-none"
			/>
			<div className="flex pt-[40px] justify-between">
				<div>
					<Label
						className="text-[18px] mb-[10px] block font-bold text-[#333333]"
						value="Amount"
					/>
					<div className="flex items-center border border-[#CCCCCC] w-[170px] rounded-[5px] py-[5px] px-[10px]">
						<BiDollar className="ml-2 text-5xl text-primary" />
						<input
							placeholder="0.00"
							name="name"
							className="  w-full text-lg text-right 2xl:text-xl text-[#333333] outline-none"
						/>
					</div>
				</div>
				<div>
					<label className="text-[18px] mb-[10px] block font-bold text-[#333333]">
						Due Date <span className="text-gray-500">(Optional)</span>
					</label>
					<div className="flex items-center border w-[170px] border-[#CCCCCC] rounded-[5px] py-[5px] px-[10px]">
						<AiOutlineCalendar className="ml-2 text-5xl text-primary" />
						<input
							name="name"
							className="w-full text-lg text-right 2xl:text-xl text-[#333333] outline-none"
						/>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-end">
				<p className="text-base text-gray-500 text-right mt-2">
					All dates and times are based on UTC{' '}
				</p>
				<div className="bg-primary text-white p-3 h-5 w-5 rounded-full ml-1 flex items-center justify-center">
					?
				</div>
			</div>
			<label className="text-[18px] mb-[10px] block font-bold text-[#333333]">
				Description <span className="text-gray-500">(Optional)</span>
			</label>
			<textarea
				{...register('description')}
				placeholder="Type here..."
				//   maxLength={255}
				className="border border-[#CCCCCC] outline-none rounded-lg bg-white w-full pl-4 pt-2 text-base resize-none 2xl:text-xl"
				rows={6}
			/>
			<div className="mt-[30px] flex items-center gap-3">
				<Button
					value="Cencel"
					className="text-primary text-base 2xl:text-xl border border-solid shadow-none border-primary bg-white capitalize px-8 py-3"
					color="inherit"
					onClick={handleCloseAddMilstone}
				/>
				<Button
					value="Save & Add Another"
					className="text-white text-base 2xl:text-xl shadow-none rounded-[5px] bg-primary capitalize px-8 py-3"
					color="primary"
				/>
				<Button
					value="Save"
					className="text-white text-base 2xl:text-xl shadow-none rounded-[5px] bg-primary capitalize px-8 py-3"
					color="primary"
				/>
			</div>
		</>
	);
};

export default AddMilstoneContent;
