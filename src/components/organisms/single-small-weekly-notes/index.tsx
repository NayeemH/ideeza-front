import React from 'react';
import { FaRegComment } from 'react-icons/fa';
import { IoIosAttach } from 'react-icons/io';
import AvatarAtom from '@atoms/avatar';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import CheckboxFields from '@molecules/checkbox-fields';

function SingleSmallWeeklyNotes(props: any) {
	const { startTime, endTime, noteName, checkBoxSmallNote } = props;

	return (
		<>
			<div className="mx-[20px] mt-[25px] p-[20px] border rounded-[5px] border-primary custom-note-single-top bg-[#FAFAFA] cursor-pointer">
				<div className="text-base ">
					<span className="hover:text-white">
						{new Date(startTime).toTimeString()?.slice(0, 9)}
					</span>
					-
					<span className="hover:text-white">
						{new Date(endTime).toTimeString()?.slice(0, 9)}
					</span>
				</div>

				<div className="font-sans text-[16px] leading-[30px] xl:text-[20px] font-semibold pt-[16px] ">
					{noteName}
				</div>
				{checkBoxSmallNote && (
					<div className="">
						<CheckboxFields
							value="Do a research on design"
							labelClass="text-base 2xl:text-xl tracking-normal font-sans text-gray-900"
							name="design research"
							checked={false}
							rules={''}
						/>
						<CheckboxFields
							value="Check if all deliveries are made"
							labelClass="text-base 2xl:text-xl tracking-normal font-sans text-gray-900"
							name="delivery made"
							checked={false}
							rules={''}
						/>
					</div>
				)}

				<div className="flex justify-between items-center pt-[38px]">
					<div className="flex">
						<AvatarAtom
							variant="circular"
							src="/images/choose-your-avatar/avatar1.png"
							className={'mr-2 w-[30px] h-[30px]'}
						/>
						<AvatarAtom
							variant="circular"
							src="/images/choose-your-avatar/avatar1.png"
							className={'mr-2 w-[30px] h-[30px]'}
						/>
						<BsFillPlusCircleFill className="cursor-pointer mr-1 text-primary w-[30px] h-[30px]" />
					</div>
					<div className="flex items-center">
						<div className="mr-3 flex items-center cursor-pointer">
							<FaRegComment className="text-[17px] mr-1 text-primary" />
							<span className="text-[19px]">5</span>
						</div>
						<div className="flex items-center cursor-pointer">
							<IoIosAttach className="text-[17px] mr-1 text-primary" />
							<span className="text-[19px]">2</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SingleSmallWeeklyNotes;
