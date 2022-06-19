import React from 'react';
import Button from '@atoms/button';
// import { Avatar } from '@mui/material';
import { timeFromNowFns } from '../../../utils/utils';
import { useRouter } from 'next/router';

const FriendRequestCard = ({ data, onClickAccept, onClickReject }: any) => {
	const router = useRouter();

	const goToProfile = (id: any) => {
		router.push(`/user/profile/${id}`);
	};

	return (
		<div className="w-full py-[25px] pl-[40px] pr-[14px] hover:bg-gray-100 rounded-[20px] cursor-pointer my-[20px]">
			<div className={`w-full flex items-center rounded-2xl mr-2 relative`}>
				<div>
					{/*<img
            src={data?.user?.profile_photo ?? ""}
            width="110"
            className="rounded-2xl"
            alt="image"
          />*/}

					{/* <Avatar
						// style={{ width: 50, height: 50 }}
						// src={data?.user?.profile_photo ?? ''}
					/> */}
					<img
						// src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4H92VQ01p9K7SGhcbBF0sGZdl1zBpMXRcfA&usqp=CAU"
						src={data?.user?.profile_photo ?? ''}
						className="rounded-[18px] w-[90px] h-[80px]"
						alt="image"
					/>
				</div>
				<div className="ml-3 flex flex-col w-full">
					<div className="flex justify-between items-center w-full">
						<div className="text-[18px] font-proxima-nova font-bold text-[#333333]">
							{data?.user?.first_name} {data?.user?.last_name}
							{/*{notification?.object_type}*/}
							Name
						</div>
						<div className="text-[18px] font-proxima-nova text-primary">
							{timeFromNowFns(data?.created_at)}
						</div>
					</div>

					<div
						className="text-[18px] font-proxima-nova text-[#BCC2C6]"
						onClick={() => goToProfile(data?.user?.id)}
					>
						Product designer, Entreprenuer
					</div>
					<div
						className="text-[18px] font-proxima-nova text-[#333333]"
						onClick={() => goToProfile(data?.user?.id)}
					>
						25 Mutual connections
					</div>
				</div>
			</div>
			<div className="flex justify-end">
				<Button
					value={'Accept'}
					className={'bg-primary mr-2 font-proxima-nova capitalize text-base'}
					size={'small'}
					onClick={onClickAccept}
				/>
				<Button
					value={'Delete'}
					className={'text-black bg-[#E1E1E1] font-proxima-nova capitalize text-base'}
					size={'small'}
					onClick={onClickReject}
				/>
			</div>
		</div>
	);
};

export default FriendRequestCard;
