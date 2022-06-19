import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BiShareAlt } from 'react-icons/bi';

const TabContentLegal: React.FC<any> = () => {
	return (
		<div className="mt-[30px]">
			<div className="flex justify-between w-[85%] mb-[30px]">
				<div className="flex items-center flex-1">
					<AiOutlineUser className="text-3xl" />
					<h5 className="text-[18px] ml-2">Parent</h5>
				</div>
				<h5 className="text-[18px] flex-1">Filed In:</h5>
				<h5 className="text-[18px] flex-1">1.1.2021, 22:01:23</h5>
			</div>
			<div className="flex justify-between w-[85%] mb-[30px]">
				<div className="flex items-center flex-1">
					<img
						src="/images/siderbar-icons/management.svg"
						alt="icon"
					/>
					<h5 className="text-[18px] ml-2">Copyright</h5>
				</div>
				<h5 className="text-[18px] flex-1">Filed In:</h5>
				<h5 className="text-[18px] flex-1 cursor-pointer underline">USPTO</h5>
			</div>
			<div className="flex justify-between w-[85%] mb-[30px]">
				<div className="flex items-center flex-1">
					<BiShareAlt className="text-3xl" />
					<h5 className="text-[18px] ml-2">Trademark</h5>
				</div>
				<h5 className="text-[18px] flex-1">Attorney name:</h5>
				<h5 className="text-[18px] flex-1 cursor-pointer underline">David</h5>
			</div>
		</div>
	);
};

export default React.memo(TabContentLegal);
