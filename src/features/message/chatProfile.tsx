import Button from '@atoms/button';
import Label from '@atoms/label';
import CustomDropDownMenu from '@molecules/custom-dropdown';
// import SearchInput from "@molecules/search-input";
import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { Avatar } from '@mui/material';
// import { useQuery } from "react-query";
// import { getChatFile } from "request/chat";
// import { FORMINPUT } from "utils/styles.ts";
import { useSession } from 'next-auth/react';
import { useMessageState } from '@features/message/chatContext';
import { useDetectSelfUser } from 'app/hooks';
import { apiService } from 'utils/request';
import { toast } from 'react-toastify';
import { Fade } from '@mui/material';
import { getTextExcerpt } from 'utils/utils';
import { GiCancel } from 'react-icons/gi';

type ConnectStatusType = 'unfriend' | 'following' | 'connect';

const ChatProfile = (props: any) => {
	const {
		onChangeConversationSearch,
		onKeyDownConversationSearch,
		clearSearchText,
		isFileUploaded,
		onClickImage,
	} = props;
	const data = useMessageState();
	const room = data?.room;
	const { data: session } = useSession();
	const roomId = room?.id;
	const [handleSettings, setHandleSettings] = useState(false);
	const [isFriend, setIsFriend] = useState<boolean>(false);
	const [connectionId, setConnectionId] = useState(null);
	const [connectStatus, setConnectStatus] = useState<ConnectStatusType>('connect');
	const [isConnecting, setIsConnecting] = useState<boolean>(false);
	const [profile, setProfile] = useState<any>(null);
	const [sharedFiles, setSharedFiles] = useState<any>([]);
	const [searchedText, setSearchedText] = useState('');
	const [initRender, setInitRender] = useState(true);

	const isSelfUser = useDetectSelfUser(profile?.id);

	// console.log('room-------', data, room)
	// console.log('roomId, profileUser?.id, myUserId, isSelfUser, ProfileUser------------', roomId, profile?.id, session?.user?.id, isSelfUser, profile)

	useEffect(() => {
		setInitRender(false);
		if (roomId) {
			getChatUserProfile();
			getRoomSharedFiles();
		}
	}, [roomId]);

	useEffect(() => {
		checkConnection(profile?.id);
	}, [profile]);

	useEffect(() => {
		if (!initRender) {
			onChangeConversationSearch(searchedText);
		}
	}, [searchedText]);

	useEffect(() => {
		if (clearSearchText) setSearchedText('');
	}, [clearSearchText]);

	useEffect(() => {
		if (isFileUploaded) getRoomSharedFiles();
	}, [isFileUploaded]);

	const getChatUserProfile = () => {
		const profileData = room?.participants?.find((item) => item?.id !== session?.user?.id);
		if (profileData) {
			setProfile(profileData || null);
		}
	};

	const getRoomSharedFiles = async () => {
		if (!roomId) return;
		await apiService(
			{
				method: 'get',
				url: `/chat/room/${roomId}/files/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const results = res?.data?.results;
					return setSharedFiles(results);
				}
			}
		);
	};

	const updateConnectStatus = (is_follower: any = false, is_friend: any = false) => {
		if (is_friend && is_follower) {
			setConnectStatus('unfriend');
		} else if (!is_friend && is_follower) {
			setConnectStatus('following');
		} else {
			setConnectStatus('connect');
		}
	};

	const checkConnection = async (profileId?: number) => {
		if (!profileId || isSelfUser) return;
		setIsConnecting(true);
		await apiService(
			{
				method: 'get',
				url: `account/user/${profileId}/connection/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					setConnectionId(data?.friend_id);
					setIsFriend(data?.is_friend);
					updateConnectStatus(data?.is_follower, data?.is_friend);
					return setIsConnecting(false);
					// console.log('res',data);
				}
			}
		);
		setIsConnecting(false);
	};

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
						user_id: profile?.id,
					},
					token: true,
				},
				(res: any, err: any) => {
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
						//const {data} = res;
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

	const handleSearch = (value: string) => {
		// console.log(value);
		setSearchedText(value);
	};

	return (
		<div>
			{room && (
				<div className="m-4 relative">
					<div className="absolute top-0 right-0 -mt-0 -mr-3">
						<div className="mt-0 mr-2">
							<IoSettingsOutline
								className={
									(handleSettings ? 'text-[#787878]' : '') +
									` text-3xl  cursor-pointer relative`
								}
								//   onClick={() => setHandleSettings((prev) => !prev)}
							/>
							{handleSettings && (
								<div className="absolute bg-white px-3 py-2 rounded-lg text-base">
									<AiOutlineClose
										className="text-[#787878] text-sm float-right cursor-pointer shadow"
										onClick={() => setHandleSettings(false)}
									/>
									<ul className="">
										<li>settings 1</li>
										<li>settings 2</li>
									</ul>
								</div>
							)}
						</div>
					</div>
					<div className="flex space-y-2 flex-col justify-center font-proxima-nova items-center pb-5">
						<Avatar
							src={room?.image}
							className="xl:w-12 xl:h-12 2xl:w-[52px] 2xl:h-[52px]"
						/>
						<h2 className="text-base xl:text-[20px] font-semibold">{room?.name}</h2>
						<h3 className="text-[#787878] font-[14px]">
							{getTextExcerpt(profile?.about_me, 30)}
						</h3>

						<Button
							onClick={onClickConnectBtn}
							disabled={isConnecting}
							value={isConnecting ? 'loading...' : connectStatus}
							className="text-white bg-primary shadow-none  text-base  capitalize items-center justify-center px-8 pt-2 pb-[11px] rounded-md"
							color="primary"
						/>
					</div>

					<div className="relative mt-2">
						<AiOutlineSearch
							size="30"
							className="absolute text-gray-500 top-4 left-4"
						/>
						<input
							type="text"
							className={
								' w-full border border-[#E6E6E6] pl-14 bg-[#FBFBFB] py-4 rounded-[6px]'
							}
							placeholder="Search in conversation"
							value={searchedText}
							onKeyDown={(e?: any) =>
								onKeyDownConversationSearch(e, e?.target?.value)
							}
							// onKeyPress={(e?: any) => onKeyPressConversationSearch(e, e?.target?.value)}
							onChange={(e?: any) => handleSearch(e.target.value)}
						/>
						{searchedText && (
							<GiCancel
								className="text-primary absolute right-7 top-6 cursor-pointer"
								onClick={() => {
									setSearchedText('');
								}}
							/>
						)}
						{searchedText.length > 0 && (
							<Fade in={searchedText.length > 0 ? true : false}>
								<div className="text-right text-xs mt-1 text-gray-500">
									Press enter to search
								</div>
							</Fade>
						)}
					</div>
					<div className="mt-6">
						<div className="flex items-center mb-3">
							<Label
								value="Shared files"
								classes={{
									root: `capitalize font-bold text-black md:text-md 2xl:text-xl mr-0`,
								}}
							/>
							<div className="hidden">
								<CustomDropDownMenu
									className="font-bold"
									selectOptions={[{ value: 'images', name: 'images' }]}
									inputClasses="w-full block border border-[#7A7A7A] text-base 2xl:text-xl text-gray-500 px-4 py-2 rounded focus:outline-none  focus:border-primary"
									// labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-0 text-sm font-medium focus:outline-none text-gray-700 border bordre-solid border-gray-300"
									labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
									labelWrapperClass="flex cursor-pointer md:relative"
									dropDownClasses="origin-top-right z-20 mt-0 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
									// placeholder="Search..."
								/>
							</div>
						</div>
						{sharedFiles.length > 0 ? (
							<div className="grid md:grid-cols-3 grid-cols-4 gap-1">
								{sharedFiles.map((item: any, index: number) => (
									<div
										key={index}
										className="msg-img-container 2xl:h-[100px] xl:h-[100px]"
									>
										{item?.content_type == 'FILE' && item?.file && (
											<div
												className="h-full w-full rounded cursor-pointer bg-center bg-no-repeat bg-cover border border-slate-200"
												style={{ backgroundImage: `url(${item?.file})` }}
												onClick={() => onClickImage(item?.file)}
											></div>
										)}
										{
											// item?.content_type == 'AUDIO' &&
											// <audio controls>
											//   <source src="https://www.w3schools.com/tags/horse.ogg" type="audio/ogg" />
											//   <source src="https://www.w3schools.com/tags/horse.mp3" type="audio/mpeg" />
											//   Your browser does not support the audio element.
											// </audio>
										}
									</div>
								))}
							</div>
						) : (
							<Label
								value="No file shared yet!!"
								classes={{
									root: `capitalize font-medium text-primary md:text-md 2xl:text-md md:ml-1 -ml-1 mr-2 mt-3`,
								}}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatProfile;
