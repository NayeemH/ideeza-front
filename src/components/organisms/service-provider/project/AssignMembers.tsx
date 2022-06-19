import Label from '@atoms/label';
import Image from 'next/image';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const AssignMembers: React.FC<any> = ({ wrapperClasses }) => {
	return (
		<div className={wrapperClasses}>
			<div className="flex items-center border justify-center border-gray-100 bg-gray-100 rounded-md">
				{' '}
				<AiOutlineSearch className="text-[#140808]" />
				<input
					type="text"
					placeholder="Search Member..."
					className="text-xs font-light  text-[#140808] w-28 bg-gray-100  text-center py-1 focus:outline-none"
				/>
			</div>
			<div className="mt-4">
				<div className="flex items-start">
					<Image
						src="/images/choose-your-avatar/avatar1.png"
						width="25px"
						height="25px"
						layout="fixed"
					/>
					<Label
						value="She Someone, Manager"
						className="text-lg font-light text-[#101010] -mt-1"
					/>
					<span className="text-white bg-primary font-semibold cursor-pointer">+</span>
				</div>
			</div>
			<div className="mt-1">
				<div className="flex items-start">
					<Image
						src="/images/choose-your-avatar/avatar1.png"
						width="25px"
						height="25px"
						layout="fixed"
					/>
					<Label
						value="She Someone, Manager"
						className="text-lg font-light text-[#101010] -mt-1"
					/>
					<span className="text-white bg-primary font-semibold">+</span>
				</div>
			</div>
			<div className="mt-1">
				<div className="flex items-start">
					<Image
						src="/images/choose-your-avatar/avatar1.png"
						width="25px"
						height="25px"
						layout="fixed"
					/>
					<Label
						value="She Someone, Manager"
						className="text-lg font-light text-[#101010] -mt-1"
					/>
					<span className="text-white bg-primary font-semibold">+</span>
				</div>
			</div>
			<div className="mt-1">
				<div className="flex items-start">
					<Image
						src="/images/choose-your-avatar/avatar1.png"
						width="25px"
						height="25px"
						layout="fixed"
					/>
					<Label
						value="She Someone, Manager"
						className="text-lg font-light text-[#101010] -mt-1"
					/>
					<span className="text-white bg-primary font-semibold">+</span>
				</div>
			</div>
		</div>
	);
};

export default AssignMembers;
