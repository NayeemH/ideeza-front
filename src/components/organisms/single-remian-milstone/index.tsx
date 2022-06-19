// import AvatarAtom from "@atoms/avatar";
import React, { useState } from 'react';

const SingleRemainMilestone: React.FC<any> = (props: any) => {
	const [isActive, setIsActive] = useState(false);
	const handleMilestoneState = () => setIsActive(!isActive);
	const {
		millstoneNumber,
		millstoneHeader,
		millstoneDetails,
		dueTime,
		iconImage,
		isImgIcon,
		isMillstoneStatus,
		millstoneDetailsClass,
		payingStatus,
	} = props;
	return (
		<>
			<div className="mt-[35px] flex justify-between">
				<div className="flex">
					<div className="mr-[30px] text-[20px] font-semibold text-[#333333]">
						{millstoneNumber}
					</div>
					<div className="flex">
						<h5 className="mr-[20px] text-[20px] font-semibold text-[#333333]">
							{millstoneHeader}
						</h5>
						{isMillstoneStatus ? (
							<div
								className={`px-[15px] leading-[33px] h-[35px] pt-[2px] font-semibold text-white text-[17px] ${
									isActive ? 'bg-primary' : 'bg-[#F5AC2F]'
								} rounded-[4px] mt-[-2px] uppercase cursor-pointer`}
							>
								{isActive ? 'Active' : 'Inactive'}
							</div>
						) : (
							''
						)}
					</div>
				</div>
				{isMillstoneStatus ? (
					<div
						className={`px-[15px] leading-[33px] py-[10px] font-semibold text-white text-[17px] ${
							isActive ? 'bg-[#F5AC2F]' : 'bg-primary'
						} rounded-[4px] mt-[-2px] uppercase cursor-pointer`}
						onClick={handleMilestoneState}
					>
						{isActive ? 'Inactive' : 'Active'}
					</div>
				) : (
					''
				)}
			</div>
			<div className="flex items-center  mb-[35px]">
				{isImgIcon ? (
					<img
						src={iconImage}
						className="mt-[20px]"
						alt="icon"
					/>
				) : (
					''
				)}

				<p className={millstoneDetailsClass}>
					{millstoneDetails} <span>{payingStatus}</span>{' '}
				</p>
				<p className="text-[18px] text-[#999999]">{dueTime}</p>
			</div>
		</>
	);
};
SingleRemainMilestone.defaultProps = {
	ProjectName: 'Anonymous Project',
	millstoneDetailsClass: 'text-[18px] text-[#999999] mr-[150px] ml-[40px]',
};
export default SingleRemainMilestone;
