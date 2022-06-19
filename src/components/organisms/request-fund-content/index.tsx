import SelectBasic from '@molecules/select-basic';
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { IoClose } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { CgAttachment } from 'react-icons/cg';
import Button from '@atoms/button';

interface RequestFundContentProps {
	handleCloseFund: any;
}
const RequestFundContent: React.FC<RequestFundContentProps> = (props) => {
	const { handleCloseFund } = props;
	const [invoiceNumber, setInvoiceNumber] = useState<string>('');
	const { register } = useForm();
	return (
		<>
			<div className="flex justify-between items-center mb-[5px] 2xl:mb-[50px]">
				<h3 className="text-primary text-xl 2xl:text-[25px] font-semibold ">
					Request A Refund
				</h3>
				<IoClose
					onClick={handleCloseFund}
					className="text-red-600 text-4xl"
				/>
			</div>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-8">
					<label className="text-base 2xl:text-[18px] mb-[5px] block font-bold text-[#333333]">
						Invoice
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
						placeholder={'Please select an invoice'}
						// error={genderError ? true : false}
						// helpText={genderError}
						selectClasses="border border-[#CCCCCC] rounded-[5px] w-full text-lg 2xl:text-xl text-[#333333]"
					/>

					<div className=" mt-[10px] 2xl:mt-[40px]">
						<label className="text-base 2xl:text-[18px] mb-[5px] block font-bold text-[#333333]">
							Refund Rquested
						</label>
						<FormControl>
							<RadioGroup
								aria-labelledby="demo-radio-buttons-group-label"
								defaultValue="total-amount"
								name="radio-buttons-group"
							>
								<FormControlLabel
									value="total-amount"
									control={<Radio />}
									label={
										<div className="text-base 2xl:text-[18px] mt-[3px] block font-bold text-[#333333]">
											Total invoice amount <span>($0.00)</span>{' '}
										</div>
									}
								/>
								<FormControlLabel
									value="other-amount"
									control={<Radio />}
									label={
										<div className="text-base 2xl:text-[18px] mt-[3px] block font-bold text-[#333333]">
											Other Amount
										</div>
									}
								/>
							</RadioGroup>
						</FormControl>
					</div>
					<div className="mt-[10px] 2xl:mt-[40px]">
						<label className="text-base 2xl:text-[18px] mb-[5px] block font-bold text-[#333333]">
							Messages
						</label>
						<textarea
							{...register('description')}
							placeholder="Please explain to the freelancer the reason for this request"
							//   maxLength={255}
							className="border border-[#CCCCCC] outline-none rounded-lg bg-white w-full pl-4 pt-2 text-base resize-none 2xl:text-xl"
							rows={6}
						/>
						<div className="pt-[5px]">
							<div className="text-base 2xl:text-[18px] text-[#333333] flex items-center gap-3">
								<div className="flex items-center gap-2 bg-[#F5F5F5] p-[10px]">
									<CgAttachment className="text-primary" />
									<label className="custom-upload-btn-wrapper cursor-pointer block">
										<span className="custom-btn capitalize text-base 2xl:text-xl font-sans text-[#333333] block text-center">
											Attach file
											<input
												type="file"
												name="myfile"
											/>
										</span>
									</label>
								</div>
								<p className="text-gray-400">Up to 25 MB</p>
							</div>
						</div>
						<div className=" 2xl:mt-[30px] flex items-center gap-3">
							<Button
								value="Cencel"
								className="text-primary text-base 2xl:text-xl border border-solid shadow-none border-primary bg-white capitalize px-8 py-3"
								color="inherit"
								onClick={handleCloseFund}
							/>
							<Button
								value="Send Request"
								className="text-white text-base 2xl:text-xl shadow-none rounded-[5px] bg-primary capitalize px-8 py-3"
								color="primary"
							/>
						</div>
					</div>
				</div>
				<div className="col-span-4 bg-[#FAFAFA] py-[40px] px-[50px]">
					<h3 className="text-primary text-base 2xl:text-[20px] font-semibold ">
						Requesting an escrow refund?
					</h3>
					<p className="mt-[10px] 2xl:mt-[40px] text-base">
						If your funds are currently in escrow, follow the{' '}
						<span className="text-primary">escrow refund process</span> to request a
						refund.
					</p>
					<p className="mt-[10px] 2xl:mt-[40px] text-base">
						If your funds have been released from escrow, use this form to request a
						refund from your freelancer.
					</p>
				</div>
			</div>
		</>
	);
};

export default RequestFundContent;
