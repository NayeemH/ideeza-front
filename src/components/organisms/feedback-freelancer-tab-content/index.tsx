// import AvatarAtom from "@atoms/avatar";
import Button from '@atoms/button';
import React from 'react';

const FeedbackTabContent: React.FC<any> = () => {
	return (
		<>
			<div className="bg-white pr-[30px] pb-[30px]">
				<div className="flex justify-center items-center pt-[80px]">
					<img
						src="/images/hire-feedback.png"
						className="w-[430px] h-[220px]"
						alt="feedback"
					/>
				</div>
				<div className="py-[75px] text-center">
					<h1 className="text-[25px] font-bold">
						This contract is not yet eligible for feedback
					</h1>
					<h1 className="text-[20px]">
						You will be able to leave feedback after the contract has been active for 30
						days.
					</h1>
				</div>
				<div className="flex justify-end">
					<Button
						value="Give Feedback"
						className="text-base 2xl:text-xl rounded-md shadow-none bg-[#F5F5F5] border border-solid border-[#E6E6E6] capitalize px-4 py-2.5 text-gray-500"
						color="primary"
					/>
				</div>
			</div>
		</>
	);
};
FeedbackTabContent.defaultProps = {
	ProjectName: 'Anonymous Project',
};
export default FeedbackTabContent;
