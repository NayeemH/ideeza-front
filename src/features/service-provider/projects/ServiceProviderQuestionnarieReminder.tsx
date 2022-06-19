import Button from '@atoms/button';
import Label from '@atoms/label';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { BsArrowLeftCircle } from 'react-icons/bs';

const ServiceProviderQuestionnarieReminder = () => {
	const router = useRouter();
	return (
		<div className="bg-white mx-2 p-2 pt-5 rounded-lg -mt-5">
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
			<div className="grid grid-cols-2 gap-4 gap-y-10">
				<Label
					value={
						<div>
							I. Main Problem Being Addressed
							<AiFillQuestionCircle className="text-blue-400 inline ml-2 " />
						</div>
					}
					className="text-xl font-medium text-[#3E3E3E]"
				/>
				<Label
					value={
						<div>
							IV. Markets Addressed
							<AiFillQuestionCircle className="text-blue-400 inline ml-2 " />
						</div>
					}
					className="text-xl font-medium text-[#3E3E3E]"
				/>
				<textarea
					name=""
					id=""
					cols={30}
					rows={5}
					placeholder="write here.."
					className="focus:outline-none"
				></textarea>
				<div className="px-4 py-4 shadow-2xl rounded-md relative -left-64">
					<Label
						value="Every solution targets a certain problem. Please use this section to highlight the specific problem the solution addresses. This section can be as short or as long as needed to describe the precise problem the solution addresses"
						className="text-primary text-xl font-light "
					/>
				</div>
				<Label
					value={
						<div>
							II. Summary of the Invention (Maximum of 150 words)
							<AiFillQuestionCircle className="text-blue-400 inline ml-2 " />
						</div>
					}
					className="text-xl font-medium text-[#3E3E3E]"
				/>
				<Label
					value={
						<div>
							V. Comparative Benefits / Advantages
							<AiFillQuestionCircle className="text-blue-400 inline ml-2 " />
						</div>
					}
					className="text-xl font-medium text-[#3E3E3E]"
				/>
				<textarea
					name=""
					id=""
					cols={30}
					rows={5}
					placeholder="write here.."
					className="focus:outline-none"
				></textarea>
				<div className="px-4 py-4 shadow-2xl rounded-md relative -left-40">
					<Label
						value="This is the section reviewers read to understand the technical solution.  Please state the solution clearly.Reviewers will ask: What is the actual technical advancement or improvement provided by this solution?
"
						className="text-primary text-xl font-light "
					/>
				</div>
				<Label
					value={
						<div>
							III. How is This Invention Made and Used
							<AiFillQuestionCircle className="text-blue-400 inline ml-2 " />
						</div>
					}
					className="text-xl font-medium text-[#3E3E3E]"
				/>
				<Label
					value={
						<div>
							VI. Related Background
							<AiFillQuestionCircle className="text-blue-400 inline ml-2 " />
						</div>
					}
					className="text-xl font-medium text-[#3E3E3E]"
				/>
				<textarea
					name=""
					id=""
					cols={30}
					rows={5}
					placeholder="write here.."
					className="focus:outline-none"
				></textarea>
				<div className="px-4 py-4 shadow-2xl rounded-md relative -left-48">
					<Label
						value="Please describe in as much detail as possible how the innovation is implemented.  This includes details on how you actually make, assemble, synthesize, or build the solution and details on how the solution is used once it is made.Reviewers will ask: How does the technical innovation actually work – or – what is the detailed process to achieve the technical innovation? Please help convince the reviewers with supporting statements using as much of the following that is available: your thoughts, logic, supporting literature, and/or experiments."
						className="text-primary text-xl font-light "
					/>
				</div>
				<Label
					value={
						<div>
							VII. References
							<AiFillQuestionCircle className="text-blue-400 inline ml-2 " />
						</div>
					}
					className="text-xl font-medium text-[#3E3E3E]"
				/>
				<Label
					value={
						<div>
							VI. Related Background
							<AiFillQuestionCircle className="text-blue-400 inline ml-2 " />
						</div>
					}
					className="text-xl font-medium text-[#3E3E3E]"
				/>
				<textarea
					name=""
					id=""
					cols={30}
					rows={5}
					placeholder="write here.."
					className="focus:outline-none"
				></textarea>
				<div className="px-4 py-4 shadow-2xl rounded-md relative -left-80">
					<Label
						value="Please list each of the documents you referenced in any of the above sections, or any other documents or information that you believe a reviewer or patent attorney would want to know about.  (Please note: this section is not optional. We are required to collect this information for legal reasons to comply with patent rules in some countries in which we file)."
						className="text-primary text-xl font-light "
					/>
				</div>
			</div>
			<div className="w-full flex flex-row-reverse my-5">
				<Button
					value="Next"
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

export default ServiceProviderQuestionnarieReminder;
