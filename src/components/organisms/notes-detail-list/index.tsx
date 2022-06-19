import React from 'react';
import { IconButton } from '@mui/material';
import { BsPaperclip } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { getTimeFormat } from 'utils/utils';

function NotesDetailList({ note }: any) {
	return (
		<div className="bg-white hover:bg-[#441184] group custom-daily-note-border custom-daily-note-box-shadow p-8 mt-8 rounded-2xl relative">
			<div className="flex row items-center">
				<p className="text-base text-[#999999] group-hover:text-white mr-2 font-normal">
					{getTimeFormat(note?.created_at)} - {getTimeFormat(note?.updated_at)}
				</p>
				<AiOutlineClockCircle color="#FF00C7" />
			</div>
			<p className="text-2xl font-semibold pt-3.5 group-hover:text-white">{note?.title}</p>
			<p className="text-lg font-normal text-[#333333] group-hover:text-white">
				Associate to the<span className="underline tx-primary-color"> New Car </span>Project
			</p>
			<p className="pt-3.5 text-base font-normal group-hover:text-white text-[#707070]">
				{note?.description}
			</p>
			<div className="mt-5 flex row items-center">
				<img
					className="w-9 h-9 rounded-full"
					src="/images/cart-h-add1.png"
				/>
				<img
					className="w-9 h-9 rounded-full -ml-2"
					src="/images/cart-h-add1.png"
				/>
				<img
					className="w-9 h-9 rounded-full -ml-2"
					src="/images/cart-h-add1.png"
				/>
				<IconButton
					className={`bg-primary outline-none font-bold rounded-full text-lg items-center justify-center flex text-white w-9 h-9`}
				>
					+
				</IconButton>
			</div>
			{note?.file_attachments.length > 0 &&
				note?.file_attachments.map((item: any, i: any) => {
					return (
						<div
							key={i}
							className="flex row items-center pt-3.5"
						>
							<BsPaperclip
								className="text-primary mr-2"
								size="25"
							/>
							<p className="text-primary text-base font-normal">{item.name}</p>
						</div>
					);
				})}

			<div className="flex row items-center justify-center h-20 w-44 rounded-tl-[34px] rounded-br-[16px] bg-[#F1F1F1] group-hover:bg-[#6029A5] absolute	bottom-0 right-0">
				<img
					className="w-7 h-6 mr-2"
					src="/images/my-notes/chatting.png"
				/>
				<p className="text-2xl font-normal group-hover:text-white">5</p>
			</div>
		</div>
	);
}

export default NotesDetailList;
