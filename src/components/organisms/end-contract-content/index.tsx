import React from 'react';
import { IoClose } from 'react-icons/io5';

import Button from '@atoms/button';

interface EndContractContentProps {
	handleCloseEndContract: any;
}
const EndContractContent: React.FC<EndContractContentProps> = (props) => {
	const { handleCloseEndContract } = props;

	return (
		<>
			<div className="flex justify-between items-center mb-[50px]">
				<h3 className="text-primary text-[25px] font-semibold ">End Contract</h3>
				<IoClose
					onClick={handleCloseEndContract}
					className="text-red-600 text-4xl"
				/>
			</div>
			<div className="flex justify-center items-center">
				<img
					src="/images/end-contract-img.png"
					alt=""
				/>
			</div>
			<div className="mt-[20px]">
				<h2 className="text-center text-[22px] font-semibold">
					Are you sure you want to end this contract?
				</h2>
				<p className="text-center text-[22px]">
					You'll be promoted to provide feedback and make any final payments in the
					following steps.
				</p>
			</div>
			<div className="mt-[30px] flex items-center gap-3">
				<Button
					value="Cencel"
					className="text-primary text-base 2xl:text-xl border border-solid shadow-none border-primary bg-white capitalize px-8 py-3"
					color="inherit"
					onClick={handleCloseEndContract}
				/>
				<Button
					value="Activate & Fund"
					className="text-white text-base 2xl:text-xl shadow-none rounded-[5px] bg-primary capitalize px-8 py-3"
					color="primary"
				/>
			</div>
		</>
	);
};

export default EndContractContent;
