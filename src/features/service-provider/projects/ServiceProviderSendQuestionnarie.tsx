import Button from '@atoms/button';
import CheckboxAtom from '@atoms/checkbox';
import Label from '@atoms/label';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { FORMINPUT } from 'utils/styles';

const ServiceProviderSendQuestionnarie = () => {
	const router = useRouter();
	return (
		<div className="bg-white mx-2 p-2 rounded-lg -mt-5">
			<div className="flex justify-between -ml-2">
				<Button
					value={
						<>
							<BsArrowLeftCircle className="mr-1" />
							<span>Go back</span>
						</>
					}
					className="text-white bg-primary mx-3 text-xl font-semibold"
					color="primary"
					onClick={() => router.back()}
				/>
				<Button
					value="Massege lawyer"
					className="text-xl bg-white font-medium text-[#333333]  border-2 border-gray-500"
					color="inherit"
					variant="outlined"
				/>
			</div>
			<Label
				value="Questionnaire"
				className="text-primary font-medium text-3xl my-5"
			/>
			<div className="grid md:grid-cols-2 gap-x-4">
				<div className="">
					<div className="flex items-center my-3">
						<CheckboxAtom />
						<Label
							value="Use the same information from profile"
							className="text-xl font-light text-[#3E3E3E]"
						/>
					</div>
					<Label
						value="Owner of mark"
						className="text-xl font-medium text-[#3E3E3E]"
					/>
					<input
						type="text"
						className={FORMINPUT}
					/>
					<div className="mt-5 mb-3">
						<Label
							value="Entity Type"
							className="text-xl font-medium text-[#3E3E3E]"
						/>
						<ul
							style={{ listStyleType: 'disc' }}
							className="text-xl text-[#3E3E3E] font-light pl-5"
						>
							<li>Individual</li>
							<li>Corporation</li>
							<li>Limited liability company</li>
							<li>Partnership</li>
							<li>Limited partnership</li>
							<li>Sole propietorship</li>
							<li>Trust</li>
							<li>Estate</li>
							<li>Other</li>
						</ul>
					</div>
					<Label
						value="Street address"
						className="text-xl font-medium text-[#3E3E3E] mt-4"
					/>
					<input
						type="text"
						className={FORMINPUT}
					/>
					<Label
						value="State"
						className="text-xl font-medium text-[#3E3E3E] mt-4"
					/>
					<input
						type="text"
						className={FORMINPUT}
					/>
					<Label
						value="Country for US territory"
						className="text-xl font-medium text-[#3E3E3E] mt-4"
					/>
					<input
						type="text"
						className={FORMINPUT}
					/>
					<Label
						value="Only for US residents"
						className="text-xl font-light text-[#3E3E3E] mt-4"
					/>
					<Label
						value="Zip/postal code"
						className="text-xl font-medium text-[#3E3E3E] mt-4"
					/>
					<input
						type="text"
						className={FORMINPUT}
					/>
					<Label
						value="Phone number"
						className="text-xl mt-4 font-medium text-[#3E3E3E]"
					/>
					<input
						type="text"
						className={FORMINPUT}
					/>
					<Label
						value="Applicant / Owner information"
						className="text-3xl font-medium text-primary mt-5"
					/>
					<div className="flex items-center my-3">
						<CheckboxAtom />
						<Label
							value="Use the same information from profile"
							className="text-xl font-light text-[#3E3E3E]"
						/>
					</div>
					<Label
						value="Name"
						className="text-xl mt-4 font-medium text-[#3E3E3E]"
					/>
					<input
						type="text"
						className={FORMINPUT}
					/>
					<Label
						value="Designation"
						className="text-xl mt-4 font-medium text-[#3E3E3E]"
					/>
					<input
						type="text"
						className={FORMINPUT}
					/>
				</div>
				<div className="">
					<Label
						value="Email address"
						className="text-xl mt-4 font-medium text-[#3E3E3E]"
					/>
					<input
						type="text"
						className={FORMINPUT}
					/>
					<div className="flex items-center my-3">
						<CheckboxAtom />
						<Label
							value="Check here to authorize the USPTO to communicate with the applicant via e-mail."
							className="text-xl font-light text-[#3E3E3E]"
						/>
					</div>
					<Label
						value="Website address"
						className="text-xl mt-4 font-medium text-[#3E3E3E]"
					/>
					<input
						type="text"
						className={FORMINPUT}
					/>
					<Label
						value="Applicant / Owner information"
						className="text-3xl font-medium text-primary mt-5"
					/>
					<Label
						value="Mark"
						className="text-xl mt-4 font-medium text-[#3E3E3E]"
					/>
					<input
						type="text"
						className={FORMINPUT}
					/>
					<Label
						value="Logo (if any)"
						className="text-xl mt-4 font-medium text-[#3E3E3E]"
					/>
					<input
						type="text"
						className={FORMINPUT}
					/>
					<Button
						value="Upload"
						className="text-white bg-primary text-xl font-light float-right my-4"
					/>
					<Label
						value={
							<div>
								Goods & Services
								<AiFillQuestionCircle className="text-blue-400 inline  ml-2 " />
							</div>
						}
						className="text-xl mt-20 font-medium text-[#3E3E3E]"
					/>
					<textarea
						name=""
						id=""
						placeholder="Write here...."
						cols={50}
						rows={2}
						className="border p-4 border-gray-500 my-3 focus:outline-none"
					></textarea>
					<Label
						value="First use in ecommerce"
						className="text-xl mt-4 font-medium text-[#3E3E3E]"
					/>
					<textarea
						name=""
						id=""
						placeholder="Write here...."
						cols={50}
						rows={2}
						className="border p-4 border-gray-500 my-3 focus:outline-none"
					></textarea>
					<Label
						value={
							<div>
								First use in anywhere
								<AiFillQuestionCircle className="text-blue-400 inline  ml-2 " />
							</div>
						}
						className="text-xl font-medium text-[#3E3E3E]"
					/>
					<textarea
						name=""
						id=""
						placeholder="Write here...."
						cols={50}
						rows={2}
						className="border p-4 border-gray-500 my-3 focus:outline-none"
					></textarea>
					<Label
						value={
							<div>
								Specimen
								<AiFillQuestionCircle className="text-blue-400 inline  ml-2 " />
							</div>
						}
						className="text-xl font-medium text-[#3E3E3E]"
					/>
					<textarea
						name=""
						id=""
						placeholder="Write here...."
						cols={50}
						rows={2}
						className="border p-4 border-gray-500 my-3 focus:outline-none"
					></textarea>
				</div>
			</div>
			<div className="w-full flex flex-row-reverse my-5">
				<Button
					value="Preview"
					className="text-xl font-semibold bg-primary text-white px-6 "
					onClick={() =>
						router.push('/service-provider/projects/1/questionnaire/preview')
					}
				/>
				<Button
					value="Cancel"
					variant="outlined"
					className="text-xl font-semibold text-[#818181] "
				/>
			</div>
		</div>
	);
};

export default ServiceProviderSendQuestionnarie;
