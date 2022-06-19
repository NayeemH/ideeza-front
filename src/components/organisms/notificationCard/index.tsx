import React from 'react';
// import { IoIosTrash, IoIosUndo } from "react-icons/io";
import { GoPrimitiveDot } from 'react-icons/go';
import { format } from 'date-fns';
// import { IoIosTrash, IoIosUndo } from 'react-icons/io';

const NotificationCard = ({ wrapperClass, showDot, notification }: any) => {
	return (
		<div>
			<div
				className={`w-full py-[25px] pl-[40px] pr-[14px] flex items-center hover:bg-gray-100 rounded-[20px] cursor-pointer mr-2 relative ${wrapperClass}`}
			>
				{showDot && <GoPrimitiveDot className="absolute text-xl left-2 text-pink-500" />}
				<div>
					<img
						// src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4H92VQ01p9K7SGhcbBF0sGZdl1zBpMXRcfA&usqp=CAU"
						// src="/images/choose-your-avatar/noti-male-img-avater.png"
						src="https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png"
						className="rounded-[18px] w-[90px] h-[80px]"
						alt="image"
					/>
				</div>
				<div className="ml-3 flex items-center w-full justify-between">
					<div className="flex flex-col items-start">
						<span className="text-[18px] font-proxima-nova font-bold text-[#333333]">
							{notification?.object_type}
						</span>
						<span className="text-[18px] text-[#BCC2C6] ">
							<span className="text-[18px] font-proxima-nova font-bold text-[#333333]">
								Invitation &nbsp;
							</span>
							{notification?.content?.slice(0, 15)}...
						</span>
					</div>
					<div className="flex items-center w-[175px] justify-between">
						<span className="mr-2 font-semibold text-gray-700 text-md">
							{format(new Date(notification.created_at), 'MM.dd.yyyy') ??
								'12.02.2021'}
						</span>
						{/* <IoIosUndo
							className="mr-2 text-3xl font-bold text-gray-700 cursor-pointer"
							size="25"
						/>
						<IoIosTrash
							className="mr-2 text-3xl font-bold text-red-500 cursor-pointer"
							size="25"
						/> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotificationCard;
