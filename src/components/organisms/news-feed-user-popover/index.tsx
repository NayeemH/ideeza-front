import AvatarAtom from '@atoms/avatar';
import Button from '@atoms/button';
import Label from '@atoms/label';
import ChatPopup from '@organisms/chat-popup';
import { useDetectSelfUser } from 'app/hooks';
import { USER_AVATAR_PLACEHOLDER } from 'enums/blog';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { apiService } from 'utils/request';
import { MessageProvider } from '@features/message/chatContext';
// import ChatBody from '@features/message/chatBody';
interface IUserPopover {
	data?: any;
}

type ConnectStatusType = 'unfriend' | 'following' | 'connect';

export function NewsFeedUserPopover(props: IUserPopover) {
	const user_id = props.data?.id;
	const isSelfUser = useDetectSelfUser(user_id);
	const [isFriend, setIsFriend] = useState<boolean>(false);
	const [connectionId, setConnectionId] = useState(null);
	const [connectStatus, setConnectStatus] = useState<ConnectStatusType>('connect');
	const [isConnecting, setIsConnecting] = useState<boolean>(false);
	const [openChatPopup, setOpenChatPopup] = useState<boolean>(false);
	const [creatingRoom, setCreatingRoom] = useState<boolean>(false);
	const [roomId, setRoomId] = useState<any>(null);
	const [room, setRoom] = useState<any>(null);

	const userProfileRoute = `/user/profile/${user_id}`;

	const updateConnectStatus = (is_follower: any = false, is_friend: any = false) => {
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
			setIsConnecting(true);
			await apiService(
				{
					method: 'get',
					url: `account/user/${props.data?.id}/connection/`,
					token: true,
				},
				(res: any) => {
					if (res) {
						const { data } = res;
						setConnectionId(data.friend_id);
						setIsFriend(data.is_friend);
						updateConnectStatus(data?.is_follower, data?.is_friend);
						return setIsConnecting(false);
					}
				}
			);
			setIsConnecting(false);
		}
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
						user_id,
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

	const goToMessages = async () => {
		setCreatingRoom(true);
		await apiService(
			{
				method: 'post',
				url: `/chat/room/`,
				token: true,
				data: {
					user: user_id,
				},
			},
			(res: any) => {
				if (res) {
					setRoom(res?.data);
					setRoomId(res?.data?.id);
					setCreatingRoom(false);
					return setOpenChatPopup(true);
				}
				setCreatingRoom(false);
			}
		);
	};

	useEffect(() => {
		checkConnection();
	}, []);

	return (
		<div className="py-4 px-5 w-auto shadow-lg hover:shadow-xl transition-all bg-white rounded-lg">
			<div className="flex items-start">
				<Link href={userProfileRoute}>
					<a>
						<AvatarAtom
							variant="circular"
							src={
								props.data?.profile_photo
									? [props.data?.profile_photo]
									: [USER_AVATAR_PLACEHOLDER]
							}
							className="md:w-14 w-10 md:h-14 h-10 cursor-pointer relative"
						/>
					</a>
				</Link>
				<div className="ml-2">
					{(props.data?.first_name || props.data?.last_name) && (
						<Link href={userProfileRoute}>
							<a>
								<Label
									value={props.data?.first_name + ' ' + props.data?.last_name}
									className="font-medium text-lg text-gray-700 inline-block"
								/>
							</a>
						</Link>
					)}
					{/* {props.data?.about_me && (
            <Label
              value={
                props.data?.about_me?.length > 30
                  ? props.data?.about_me?.slice(0, 30) + "..."
                  : props.data?.about_me
              }
              className="text-base text-gray-600"
            />
          )} */}
					{props.data?.address && (
						<div className="flex items-center">
							<HiOutlineLocationMarker />
							<Label
								value={props.data?.address}
								className=" text-md text-zinc-500"
							/>
						</div>
					)}
				</div>
			</div>
			{!isSelfUser && (
				<div className="mt-4">
					<Button
						className={`capitalize ${
							connectStatus === 'following'
								? 'text-black bg-white'
								: 'text-white bg-primary'
						} font-medium py-1 px-3 rounded w-32`}
						onClick={onClickConnectBtn}
						disabled={isConnecting}
						value={isConnecting ? 'loading...' : connectStatus}
					/>
					<Button
						className="capitalize text-white bg-primary font-medium py-1 ml-2 px-3 rounded w-32"
						value={creatingRoom ? 'Loading...' : 'Send Message'}
						onClick={goToMessages}
						disabled={creatingRoom}
					/>
				</div>
			)}

			<MessageProvider data={{ room }}>
				<ChatPopup
					openPopup={openChatPopup}
					onClosePopup={() => setOpenChatPopup(false)}
					roomId={roomId}
				/>
			</MessageProvider>
		</div>
	);
}

export default NewsFeedUserPopover;
