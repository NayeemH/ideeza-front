import Button from '@atoms/button';
import CheckboxAtom from '@atoms/checkbox';
import Label from '@atoms/label';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineArrowDown, AiTwotonePrinter } from 'react-icons/ai';
import { BsArrowLeftCircle } from 'react-icons/bs';

const ServiceProviderQuestionnariePreview = () => {
	const router = useRouter();
	return (
		<div className="bg-white mx-2 p-4 pt-5 rounded-lg -mt-5">
			<div className="flex  -ml-2">
				<Button
					value={
						<>
							<BsArrowLeftCircle className="mr-1" />
							<span>Go back</span>
						</>
					}
					className="text-white bg-primary mx-3 text-xl font-semibold ml-6"
					color="primary"
					onClick={() => router.back()}
				/>
				<div className="mx-auto flex items-center">
					<Label
						value="Country"
						className="text-xl font-medium pr-4"
					/>
					<input
						type="text"
						className=" border border-gray-300 focus:outline-none p-2 rounded-md"
					/>
					<AiOutlineArrowDown className="-ml-8" />
					<div className="">
						<AiTwotonePrinter className="text-4xl ml-8 cursor-pointer" />
					</div>
				</div>
			</div>
			<Label
				value="Questionnaire"
				className="text-primary font-medium text-3xl my-5 mb-20 ml-4"
			/>
			<div className="grid grid-cols-2 gap-4 gap-x-14 text-[#3E3E3E]">
				<div className="pl-4">
					<div className="flex items-center my-3">
						<CheckboxAtom />
						<Label
							value="Use the same information from profile"
							className="text-xl font-light text-[#3E3E3E]"
						/>
					</div>
					<Label
						value="Owner of mark"
						className="text-xl font-medium mb-3"
					/>
					<Label
						value="Frizty Studio"
						className="text-xl  mb-5"
					/>

					<Label
						value="Entity Type"
						className="text-xl font-medium mb-3"
					/>
					<Label
						value="Individual"
						className="text-xl  mb-5"
					/>

					<Label
						value="Street address"
						className="text-xl font-medium mb-3"
					/>
					<Label
						value="67-A Bagrian chowk green town lahore"
						className="text-xl  mb-5"
					/>

					<Label
						value="State"
						className="text-xl font-medium mb-3"
					/>
					<Label
						value="Pakistan"
						className="text-xl  mb-5"
					/>

					<Label
						value="Country for US territory"
						className="text-xl font-medium mb-3"
					/>
					<Label
						value="Pakistan"
						className="text-xl  mb-5"
					/>

					<Label
						value="Only for US residents"
						className="text-xl font-light my-5"
					/>

					<Label
						value="Zip/postal code"
						className="text-xl font-medium mb-3"
					/>
					<Label
						value="54000"
						className="text-xl  mb-5"
					/>

					<Label
						value="Phone number"
						className="text-xl font-medium mb-3"
					/>
					<Label
						value="+923088407678"
						className="text-xl  mb-5"
					/>

					<Label
						value="Applicant / Owner information"
						className="text-3xl font-medium text-primary my-5"
					/>
					<div className="flex items-center">
						<CheckboxAtom />
						<Label
							value="Use the same information from profile"
							className="text-xl font-light text-[#3E3E3E]"
						/>
					</div>

					<Label
						value="Name"
						className="text-xl font-medium mb-3"
					/>
					<Label
						value="Ali Hamza"
						className="text-xl  mb-5"
					/>

					<Label
						value="Designation"
						className="text-xl font-medium mb-3"
					/>
					<Label
						value="Designer"
						className="text-xl  mb-5"
					/>
				</div>

				<div className="">
					<Label
						value="Email address"
						className="text-xl font-medium mb-3"
					/>
					<Label
						value="firiztystuido30@gmal.com"
						className="text-xl  mb-5"
					/>
					<div className="flex items-center my-3">
						<CheckboxAtom />
						<Label
							value="Use the same information from profile"
							className="text-xl font-light text-[#3E3E3E]"
						/>
					</div>
					<Label
						value="Website address"
						className="text-xl font-medium mb-3"
					/>
					<Label
						value="www.friztystudio.com"
						className="text-xl  mb-5"
					/>

					<Label
						value="Mark information"
						className="text-3xl text-primary font-medium my-8"
					/>

					<Label
						value="Mark"
						className="text-xl font-medium mb-3"
					/>
					<Label
						value="Ideeza"
						className="text-xl  mb-5"
					/>
					<Label
						value="Logo (if any)"
						className="text-xl font-medium mb-3"
					/>

					<Label
						value="Goods & Services"
						className="text-xl font-medium mb-3"
					/>
					<Label
						value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
						className="text-xl  mb-5"
					/>

					<Label
						value="First use in ecommerce"
						className="text-xl font-medium mb-3 mt-5"
					/>
					<Label
						value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
						className="text-xl  mb-5"
					/>
					<Label
						value="First use in anywhere"
						className="text-xl font-medium mb-3 mt-5"
					/>
					<Label
						value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
						className="text-xl  mb-5"
					/>
					<Label
						value="Specimen"
						className="text-xl font-medium mb-3 mt-5"
					/>
					<Label
						value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
						className="text-xl  mb-5"
					/>
				</div>
			</div>
			<div className="w-full flex flex-row-reverse my-5">
				<Button
					value="send"
					className="text-xl font-semibold bg-primary text-white px-6 "
					onClick={() =>
						router.push('/service-provider/projects/1/questionnaire/send-questionnaire')
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

export default ServiceProviderQuestionnariePreview;
