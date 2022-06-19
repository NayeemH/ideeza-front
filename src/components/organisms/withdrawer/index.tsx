import Label from '@atoms/label';
import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';

function PaidWithdraw() {
	const [hidden, setHidden] = useState(false);

	if (hidden) {
		return <></>;
	}

	return (
		<div className=" my-[30px] py-4 px-5 space-x-5 bg-white rounded  flex items-center">
			<img
				src="/images/icon/warning-ques.png"
				alt="close"
				className="w-9"
			/>
			<div className="flex items-center pt-[26px] pb-[24px]">
				<Label
					classes={{ root: 'text-sm md:text-base text-[#333333]' }}
					value={
						<>
							In order to withdraw earnings, please complete a{' '}
							<span className="text-primary font-semibold">
								W8BEN Foreign status verification.{' '}
							</span>
							If you are a U.S. tax payer living outside of U.S, please complete a{' '}
							<span className="text-primary font-semibold">W9 form. </span>
						</>
					}
				/>
				<GrFormClose
					className=" text-xl md:text-2xl text-gray-700 cursor-pointer"
					onClick={() => setHidden(true)}
				/>
			</div>
		</div>
	);
}
export default PaidWithdraw;
