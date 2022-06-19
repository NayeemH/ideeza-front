import React from 'react';

const TabContentMainNFTAbout: React.FC<any> = () => {
	return (
		<div>
			<h2 className="text-[18px] font-bold mb-[30px] text-[#999999]">Basic Information</h2>
			<div className="flex items-center mb-[20px]">
				<p className=" text-base lg:text-[18px] font-semibold">Created At:</p>
				<p className=" text-base w-[75%] ml-auto lg:text-[18px]">1.1.2021, 22:01:23</p>
			</div>
			<div className="flex items-center mb-[20px]">
				<p className=" text-base lg:text-[18px] font-semibold">Network Type:</p>
				<p className=" text-base w-[75%] ml-auto lg:text-[18px]">Solana</p>
			</div>
			<div className="flex items-center mb-[20px]">
				<p className=" text-base lg:text-[18px] font-semibold">Product Layers:</p>
				<p className=" text-base w-[75%] ml-auto lg:text-[18px]">
					elerctronics, code, cover
				</p>
			</div>
			<div className="flex items-center mb-[20px]">
				<p className=" text-base lg:text-[18px] font-semibold">File size:</p>
				<p className=" text-base w-[75%] ml-auto lg:text-[18px]">110 MB</p>
			</div>
			<div className="flex items-center mb-[20px]">
				<p className=" text-base lg:text-[18px] font-semibold">Product size:</p>
				<p className=" text-base w-[75%] ml-auto lg:text-[18px]">1cm * 1cm * 1cm</p>
			</div>
		</div>
	);
};

export default React.memo(TabContentMainNFTAbout);
