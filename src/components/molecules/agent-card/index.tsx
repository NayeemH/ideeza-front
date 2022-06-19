import AvatarAtom from '@atoms/avatar';
import IconLabel from '@molecules/icon-label';
import WorkingRequest from '@molecules/working-request';
import Image from 'next/image';
import React from 'react';
import { AiOutlineApartment } from 'react-icons/ai';
import { useRouter } from 'next/router';

function AgentCard({ data }: any) {
	const router = useRouter();

	const visitProfile = (id: any) => router.push(`/user/profile/${id}`);

	return (
		<>
			<div className=" border border-gray-125 shadow-lg rounded-md overflow-hidden">
				{/* <img src="/images/user-dash-img.png" className="w-full" alt="lool" /> */}
				<Image
					src="/images/user-dash-img.png"
					height={'40%'}
					width={'100%'}
					className="w-full"
					alt="logo"
					layout="responsive"
				/>
				<div className="w-full flex justify-center -mt-10">
					<AvatarAtom
						variant="circular"
						className="h-28 w-28"
						src={[data?.user?.profile_photo]}
					/>
				</div>
				<IconLabel
					tooltipProps={{ open: false }}
					labelValue={`${data?.mutual_friends} matual connections`}
					iconContanerClass="text-2xl text-gray-600"
					mainClass="flex items-center justify-center p-3 pb-1"
					lableClass={{
						root: `text-gray-600 opacity-50 font-sans font-normal text-sm pl-1`,
					}}
					iconComponent={
						<AiOutlineApartment />
						// <img alt="icon" src="/images/web.svg" className="w-5 mr-1" />
						// <Image
						//   src="/images/web.svg"
						//   height={"100%"}
						//   width={"100%"}
						//   className="w-5 mr-1"
						//   alt="icon"
						// />
					}
				/>
				<WorkingRequest
					icon="hidden"
					namevalue={`${data?.user?.first_name} ${data?.user?.last_name}`}
					Compvalue="Techincan"
					avatarClass="hidden"
					mainClass="pl-1 pr-2 mb-3 space-x-2"
					btnvalue="Visit"
					label2Class="text-black-500 opacity-50 text-xs font-sans font-normal"
					btnClass="bg-white border-solid border-primary border transform-none text-primary px-8 text-xs shadow-none 2xl:w-36 w-32 py-4 leading-4 hover:text-white hover:bg-primary"
					clickHandler={() => visitProfile(data?.user?.id)}
				/>
			</div>
		</>
	);
}
export default AgentCard;
