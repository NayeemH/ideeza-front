import React, { useEffect, useState } from 'react';
import { BiRadioCircleMarked } from 'react-icons/bi';
import { BsInstagram } from 'react-icons/bs';
import { AiFillFacebook, AiFillLinkedin, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';
import Label from '@atoms/label';
import { useDetectSelfUser } from 'app/hooks';
import { useRouter } from 'next/router';
import { apiService } from '../../../utils/request';
import { toast } from 'react-toastify';
import { AUTHOR_AVATAR_PLACEHOLDER } from 'enums/blog';
import Button from '@atoms/button';
// import {getUserSkills} from "@features/user/profile/request";

type ConnectStatusType = 'unfriend' | 'following' | 'connect';

const ProfileLeftSide = ({ profile, onReload }: any) => {
	const router = useRouter();
	const user_id = Number(router.query.id);
	const [loading, setLoading] = useState(true);
	const [userSkills, setUserSkills] = useState<any[]>([]);
	const [isFriend, setIsFriend] = useState<boolean>(false);
	const [isConnecting, setIsConnecting] = useState<boolean>(false);
	const [connectStatus, setConnectStatus] = useState<ConnectStatusType>('unfriend');
	const isSelfUser = useDetectSelfUser(user_id);
	const [connectionId, setConnectionId] = useState(null);

	const updateConnectStatus = (is_follower = false, is_friend = false) => {
		if (is_friend && is_follower) {
			setConnectStatus('unfriend');
		} else if (!is_friend && is_follower) {
			setConnectStatus('following');
		} else {
			setConnectStatus('connect');
		}
	};

	const checkConnection = async () => {
		if (!isSelfUser) {
			await apiService(
				{
					method: 'get',
					url: `account/user/${user_id}/connection/`,
					token: true,
				},
				(res: any) => {
					if (res) {
						const { data } = res;
						// console.log(data);

						// console.log("DATA", data);
						setConnectionId(data.friend_id);
						setIsFriend(data.is_friend);
						updateConnectStatus(data?.is_follower, data?.is_friend);
						return;
					}
				}
			);
		}
	};

	const getUserSkills = async () => {
		await apiService(
			{
				method: 'get',
				url: `account/user-skill/${`?user__id=${user_id}`}`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					setUserSkills(data?.results || []);
					setLoading(false);
					return;
				}
				setLoading(false);
			}
		);
	};
	// console.log(userSkills);

	const onClickConnectBtn = async () => {
		if (connectStatus === 'following') {
			return toast.error('Friend Request has already been sent.');
		}
		if (!isFriend && connectStatus === 'connect') {
			setIsConnecting(true);

			await apiService(
				{
					method: 'post',
					url: `/account/friend/add-friend/`,
					data: {
						user_id,
					},
					token: true,
				},
				(res: any, err: any) => {
					console.log(res, err);

					if (res) {
						// const {data} = res;
						setIsFriend(false);
						toast.success(
							'Successfully sent friend request, currently you are following this user.'
						);
						updateConnectStatus(true, false);
						setIsConnecting(false);
						return;
					}
					if (err?.response?.data?.detail) {
						setIsConnecting(false);
						return toast.error(
							err?.response?.data?.detail || 'Failed to send friend request!'
						);
					}
				}
			);
		} else if (isFriend && connectStatus === 'unfriend') {
			setIsConnecting(true);
			await apiService(
				{
					method: 'delete',
					url: `/account/friend/${connectionId}/`,
					token: true,
				},
				(res: any, err: any) => {
					if (res) {
						const { data } = res;
						setIsFriend(false);
						toast.success('Unfriend request has been succeed!');
						updateConnectStatus();
						setIsConnecting(false);
						return;
					}
					if (err?.response?.data?.detail) {
						setIsConnecting(false);
						return toast.error(
							err?.response?.data?.detail || 'Failed to send unfriend request!'
						);
					}
				}
			);
		}
	};

	const changeProfileVisibility = async () => {
		const id = profile?.id;

		await apiService(
			{
				method: 'patch',
				url: `/account/user/${id}/`,
				token: true,
				data: {
					is_visible: !profile?.is_visible,
				},
			},
			(res: any) => {
				if (res) {
					if (typeof onReload === 'function') {
						onReload();
					}
					toast.dismiss();
					toast.success('Privacy changed successfully!');
					return;
				}
			}
		);
	};

	const goToMessages = () => {
		router.push('/user/dashboard/message');
	};

	useEffect(() => {
		// console.log("VIS", profile)
		getUserSkills();
		checkConnection();
	}, [user_id]);

	return (
		<>
			<div className="bg-left pt-10">
				<div className=" h-20 w-20  md:h-56 md:w-56 mx-auto rounded-full overflow-hidden shadow-primary">
					<img
						src={profile?.profile_photo ?? AUTHOR_AVATAR_PLACEHOLDER}
						alt="Profile"
						className={`h-20 w-20  md:h-56 md:w-56 sm:h-40 sm:w-40 ${
							profile?.profile_photo ? '' : 'border-2 border-primary rounded-full'
						}`}
						srcSet=""
					/>
				</div>
			</div>

			{!isSelfUser && (
				<div className="p-5 pt-14 pb-3">
					<Button
						className={`capitalize ${
							connectStatus === 'following'
								? 'text-black bg-white'
								: 'text-white bg-primary'
						} font-medium py-1 mt-3 px-4 rounded`}
						onClick={onClickConnectBtn}
						disabled={isConnecting}
						value={isConnecting ? 'loading...' : connectStatus}
					/>
					<Button
						className="capitalize text-white bg-primary font-medium py-1 mt-3 ml-2 px-4 rounded"
						value={'Send Message'}
						onClick={goToMessages}
					/>
				</div>
			)}

			<div className="px-2 md:px-7 pt-4 md:pt-16 pb-3">
				<Label
					value={
						<>
							<span className="text-[#333333] text-lg md:text-xl">ABOUT ME</span>
							<span className="w-full h-[1px] bg-[#EEEEEE]"></span>
						</>
					}
					classes={{
						root: `space-x-2 whitespace-nowrap custom-newsfeed-subt-color text-base  font-bold flex items-center`,
					}}
				/>
				<div className="flex justify-between   my-5 items-start">
					<div className="flex items-start md:-ml-2">
						<BiRadioCircleMarked className="text-primary text-5xl -ml-1 -mt-2" />

						<Label
							value={
								<>
									<span>{profile?.score ?? '4.9'}</span>
									<span className="text-[#8399A4] text-sm  2xl:text-base font-proxima-nova capitaize font-thin pt-1">
										My score
									</span>
								</>
							}
							classes={{
								root: `whitespace-nowrap flex flex-col font-proxima-nova md:text-2xl xl:text-[32px] font-semibold`,
							}}
						/>
					</div>

					{profile?.badge && (
						<span className="capitalize text-white bg-primary font-medium py-1 mt-3 3xl:mt-0 px-4 rounded">
							{profile.badge}
						</span>
					)}

					<div className="grid gap-2 grid-cols-2 mt-3 3xl:-mt-1">
						{profile?.social_media?.facebook && (
							<a
								href={profile.social_media.facebook}
								target="blank"
							>
								<AiFillFacebook className="2xl:text-4xl text-3xl text-blue-700" />
							</a>
						)}

						{profile?.social_media?.instagram && (
							<a
								href={profile.social_media.instagram}
								target="blank"
							>
								<BsInstagram className="2xl:text-4xl text-3xl from-red-500" />
							</a>
						)}

						{profile?.social_media?.linkedin && (
							<a
								href={profile.social_media.linkedin}
								target="blank"
							>
								<AiFillLinkedin className="2xl:text-4xl text-3xl text-blue-500" />
							</a>
						)}

						{profile?.social_media?.twitter && (
							<a
								href={profile.social_media.twitter}
								target="blank"
							>
								<AiFillTwitterCircle className="2xl:text-4xl text-3xl text-blue-500" />
							</a>
						)}

						{profile?.social_media?.youtube && (
							<a
								href={profile.social_media.youtube}
								target="blank"
							>
								<AiFillYoutube className="2xl:text-4xl text-3xl text-red-600" />
							</a>
						)}
					</div>
				</div>

				<Label
					value={
						<>
							<span className="text-[#333333] text-lg md:text-xl">Skill</span>
							<span className="w-full h-[1px] bg-[#EEEEEE]"></span>
						</>
					}
					classes={{
						root: `space-x-2 whitespace-nowrap mb-[25px] custom-newsfeed-subt-color text-base  font-bold flex items-center`,
					}}
				/>
				<div className="overflow-y-auto max-h-48 overflow-x-hidden ">
					<div className="">
						{userSkills?.length > 0 ? (
							<>
								{userSkills?.map((usersKill: any, k: any) => (
									<div key={k}>
										<div className=" mt-3 pr-3 -mr-2">
											<Label
												className="text-gray-900 sm:grid grid-cols-11 font-proxima-nova text-xl xl:text-base tracking-tight whitespace-nowrap leading-5  items-center"
												value={
													<>
														<span className=" text-[#333333] col-span-5 font-semibold underline capitalize">
															{usersKill?.skill?.name}
														</span>{' '}
														<span className="text-center mx-5 xl:mx-0">
															-
														</span>{' '}
														<span className="text-sm col-span-5 text-[#999999]">
															{usersKill?.yearsExperience ?? 0} year
															experience
														</span>
													</>
												}
											/>
										</div>
										<div className="overflow-y-auto max-h-48 pr-3 -mr-2">
											<Label
												className="text-gray-700 font-proxima-nova tracking-tight leading-5"
												value={usersKill?.skill?.description}
											/>
										</div>
									</div>
								))}
							</>
						) : (
							<Label
								value={
									<>
										<span className="text-[#333333] text-lg md:text-xl">
											No skills found
										</span>
									</>
								}
								classes={{
									root: `whitespace-nowrap w-full flex justify-center text-base  font-bold `,
								}}
							/>
						)}
					</div>
				</div>

				{isSelfUser && (
					<Label
						value={profile?.is_visible ? 'Make profile private' : 'Make profile public'}
						className="text-center w-100 pt-14 text-primary text-base 2xl:text-xl cursor-pointer tracking-tight font-semibold hover:underline"
						onClick={changeProfileVisibility}
					/>
				)}
			</div>
		</>
	);
};

export default ProfileLeftSide;
