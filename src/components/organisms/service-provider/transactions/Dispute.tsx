import Button from '@atoms/button';
import CheckboxAtom from '@atoms/checkbox';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { BiMessageAlt } from 'react-icons/bi';

export const Dispute = () => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const router = useRouter();
	return (
		<div>
			<Modal
				width="xs"
				header={
					<Label
						value="Choose the step"
						className="text-2xl text-primary font-bold m-4"
					/>
				}
				content={
					<div>
						<div className="flex items-center">
							<CheckboxAtom />
							<Label
								value="Refund"
								className="text-xl"
							/>
						</div>

						<input
							type="text"
							placeholder="Type amount in USD"
							className="text-xl text-[#C6C6C6] px-4 py-1"
						/>
						<div className="flex items-center">
							<CheckboxAtom />
							<Label
								value="Refund"
								className="text-xl"
							/>
						</div>

						<textarea
							name=""
							id=""
							className="border w-4/5 focus:outline-none ml-2 bg-zinc-200 text-[#929292] p-4"
							placeholder="Explain why?"
						></textarea>
						<div className="flex my-2 pt-4 -ml-2">
							<Button
								value="Complete"
								onClick={() => setOpenModal((prev) => !prev)}
								color="primary"
								className="mx-4"
							/>
							<Button
								value="Cancel"
								className="text-[#333333]"
							/>
						</div>
					</div>
				}
				open={openModal}
				close={setOpenModal}
			/>
			<Label
				value={
					<span className="flex">
						<BiMessageAlt />
						<BiMessageAlt className="-ml-4 relative bottom-2" />
						<span>Dispute to Giorgi John</span>
					</span>
				}
				className="text-xl md:text-3xl text-bold text-primary mb-2"
			/>
			<div className="bg-white mt-2 md:mt-6 p-2 md:p-4 shadow-xl rounded-xl">
				<Label
					value="Opened 24th Jan."
					className="text-[22px] text-[#333333]"
				/>
				<Label
					value="Whole dispute process duration is till 23 Oct. 09:00PM"
					className="text-[22px] text-[#333333]"
				/>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 ">
					<div className="col-span-2 bg-[#F6F6F6] rounded-lg p-4">
						<Label
							value="Did you receive your package?"
							className="text-xl text-primary"
						/>
						<Label
							value="Yes"
							className="text-2xl font-bold text-[#818181] my-4"
						/>

						<Label
							value="Logistics tracking problem"
							className="text-xl text-primary"
						/>
						<Label
							value={
								<>
									<span>Purchase Protection is running out,</span>
									<br />
									<span> but package is still in transit</span>
								</>
							}
							className="text-2xl font-bold text-[#818181] my-4"
						/>
						<Label
							value="Customs problem"
							className="text-xl text-primary"
						/>
						<Label
							value="Customs is holding the package"
							className="text-2xl font-bold text-[#818181] my-4"
						/>

						<Label
							value="Other"
							className="text-xl text-primary"
						/>
						<Label
							value="Package sent to a wrong address"
							className="text-2xl font-bold text-[#818181] my-4"
						/>

						<Label
							value="Refund Request:"
							className="text-xl text-primary"
						/>
						<Label
							value="1000 USD From  3000 USD"
							className="text-2xl font-bold text-[#818181] my-4"
						/>

						<Label
							value="User request details:"
							className="text-xl text-primary"
						/>
						<Label
							value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
							className="text-2xl font-bold text-[#818181] my-4"
						/>
						<Label
							value="User evidence:"
							className="text-xl text-primary"
						/>
						<Label
							value="Text.txt"
							className="text-2xl font-bold"
						/>
					</div>
					<div className="col-span-1 bg-[#F6F6F6] rounded-lg p-4 relative">
						<Label
							value="Notification Centre:"
							className="mb-2 text-[33px] text-[#101010]"
						/>
						<div className="h-96 overflow-y-scroll">
							<div className="my-4">
								<Label
									value="Manufacturer answer"
									className="text-[22px] font-semibold"
								/>
								<Label
									value="23 Sep, 9:09 PM"
									className="text-xl text-[#6B6B6B]"
								/>
								<Label
									value="Answer will be accepted till 26th Sep. 09:00PM"
									className="text-xl text-[#6B6B6B]"
								/>
							</div>
							<div className="my-4">
								<Label
									value="Your answer"
									className="text-[22px] font-semibold"
								/>
								<Label
									value="23 Sep, 9:09 PM"
									className="text-xl text-[#6B6B6B]"
								/>
								<Label
									value="Answer will be accepted till 26th Sep. 09:00PM"
									className="text-xl text-[#6B6B6B]"
								/>
							</div>
							<div className="my-4">
								<Label
									value="Manufacturer answer"
									className="text-[22px] font-semibold"
								/>
								<Label
									value="23 Sep, 9:09 PM"
									className="text-xl text-[#6B6B6B]"
								/>
								<Label
									value="Answer will be accepted till 26th Sep. 09:00PM"
									className="text-xl text-[#6B6B6B]"
								/>
							</div>
							<div className="my-4">
								<Label
									value="Your answer"
									className="text-[22px] font-semibold"
								/>
								<Label
									value="23 Sep, 9:09 PM"
									className="text-xl text-[#6B6B6B]"
								/>
								<Label
									value="Answer will be accepted till 26th Sep. 09:00PM"
									className="text-xl text-[#6B6B6B]"
								/>
							</div>
						</div>
						<div className="mt-8 flex items-center">
							<input
								type="text"
								placeholder="Type something..."
								className="focus:outline-none w-full text-xl text-[#AAAAAA] p-4 py-2"
							/>
							<AiOutlineSend className="-ml-6 text-xl text-[#AAAAAA]" />
						</div>
						<div className="w-full flex flex-row-reverse text-[22px] absolute bottom-0">
							<Button
								value="Cancel"
								onClick={() => setOpenModal((prev) => !prev)}
								color="primary"
								className="mx-4"
							/>
							<Button
								value="Back"
								onClick={() => router.back()}
								className="text-[#333333]"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
