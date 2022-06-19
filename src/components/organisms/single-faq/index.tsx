import Label from '@atoms/label';
import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

const SingleFaq: React.FC<any> = ({ header, questions }) => {
	return (
		<div>
			<Label
				value={header}
				className="md:text-xl text-lg xl:text-2xl font-semibold text-[#333333]  "
			/>
			<hr className="my-4" />
			<div className="md:mt-2 mt-1">
				{questions?.map((qu: string) => (
					<Label
						value={qu}
						key={qu}
						className="text-sm xl:text-[16px] custom-line-height-28 text-[#999999] mb-2 md:mb-4"
					/>
				))}
			</div>
			<div className="flex items-center text-primary">
				<AiOutlineArrowRight className="text-xl mr-2 font-bold" />
				<Label
					value="View all"
					className="text-base text-primary"
				/>
			</div>
		</div>
	);
};

export default SingleFaq;
