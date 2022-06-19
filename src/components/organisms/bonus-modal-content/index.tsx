import SelectBasic from '@molecules/select-basic';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import Button from '@atoms/button';
import Label from '@atoms/label';
import { BiDollar } from 'react-icons/bi';

interface BonusModalContentProps {
	handleCloseBonus: any;
}
const BonusModalContent: React.FC<BonusModalContentProps> = (props) => {
	const { handleCloseBonus } = props;
	const [invoiceNumber, setInvoiceNumber] = useState<string>('');
	const { register } = useForm();
	return (
		<>
			<div className="flex justify-between items-center mb-[50px]">
				<h3 className="text-primary text-[25px] font-semibold ">
					Give Bonus Or Expense Reimbursement
				</h3>
				<IoClose
					onClick={handleCloseBonus}
					className="text-red-600 text-4xl"
				/>
			</div>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-8">
					<div className="flex justify-between">
						<div className="w-[40%]">
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

						<div className="w-[40%]">
							<label className="text-[18px] mb-[10px] block font-bold text-[#333333]">
								Reason
							</label>
							<SelectBasic
								value={invoiceNumber}
								options={[
									{
										name: '#00004',
										value: '#00004',
									},
									{
										name: '#eeee',
										value: '#eeee',
									},
									{
										name: 'Others',
										value: 'Others',
									},
								]}
								handleChange={(e: any) => setInvoiceNumber(e.target.value)}
								placeholder={'Bonus'}
								// error={genderError ? true : false}
								// helpText={genderError}
								selectClasses=" border border-[#CCCCCC] rounded-[5px] w-full text-lg 2xl:text-xl text-[#333333]"
							/>
						</div>
					</div>

					<div className="mt-[40px]">
						<label className="text-[18px] mb-[10px] block font-bold text-[#333333]">
							Description
						</label>
						<p className="text-gray-500 text-base">
							Please explain to the freelancer the reason for this request
						</p>
						<textarea
							{...register('description')}
							className="border border-[#CCCCCC] outline-none rounded-lg bg-white w-full pl-4 pt-2 text-base resize-none 2xl:text-xl"
							rows={2}
						/>

						<div className="mt-[40px]">
							<label className="text-[18px] mb-[10px] block font-bold text-[#333333]">
								Privat Note <span className="text-gray-500">(Optional)</span>
							</label>
							<p className="text-gray-500 text-base">
								The note will be available in transaction details for personal
								reference The freelancer will not see this note.
							</p>
							<textarea
								{...register('description')}
								className="border border-[#CCCCCC] outline-none rounded-lg bg-white w-full pl-4 pt-2 text-base resize-none 2xl:text-xl"
								rows={2}
							/>
						</div>

						<div className="mt-[30px] flex items-center gap-3">
							<Button
								value="Cencel"
								className="text-primary text-base 2xl:text-xl border border-solid shadow-none border-primary bg-white capitalize px-8 py-3"
								color="inherit"
								onClick={handleCloseBonus}
							/>
							<Button
								value="Make Payment"
								className="text-white text-base 2xl:text-xl shadow-none rounded-[5px] bg-primary capitalize px-8 py-3"
								color="primary"
							/>
						</div>
					</div>
				</div>
				<div className="col-span-4 bg-[#FAFAFA] py-[40px] px-[50px]">
					<p className="text-base">
						When you send a bonus or expense reimbursement, account will be charged
						within 24 hours.
					</p>
					<p className="mt-[45px] text-base">
						The freelancer will receive funds after the standard hold.
					</p>
				</div>
			</div>
		</>
	);
};

export default BonusModalContent;
