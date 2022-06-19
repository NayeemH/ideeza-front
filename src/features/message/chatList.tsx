import Label from '@atoms/label';
import { IContextData, useMessageState } from '@features/message/chatContext';
import { IRoom } from '@models/chat';
import { Avatar, Fade } from '@mui/material';
import ChatCard from '@organisms/chat-card';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import { styled } from '@mui/material/styles';
import { IoSettingsOutline } from 'react-icons/io5';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Badge from '@mui/material/Badge';
import { isDataInArray, timeFromNowFns } from 'utils/utils';
import ChatBody from './chatBody';
import { useSession } from 'next-auth/react';
import Loader from '@atoms/loader';
import { useAppSelector } from 'app/hooks';
import { IMAGE_PLACEHOLDER } from 'enums/common';

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		backgroundColor: '#ff09d0',
		color: '#ff09d0',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: 'ripple 1.2s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
	},
}));

interface IChatListProps {
	roomList: IRoom[];
	select: (room: IRoom) => void;
	triggeredRoomListSearch?: (search?: string) => void;
	onKeyDownRoomListSearch?: (e?: any, search?: string) => void;
	onClearSearchResult?: () => void;
	searchingResult?: boolean;
}

const ChatList = (props: IChatListProps) => {
	const {
		roomList,
		select,
		triggeredRoomListSearch,
		onKeyDownRoomListSearch,
		onClearSearchResult,
		searchingResult,
	} = props;
	const { data: session } = useSession();
	const data = useMessageState();

	// const [isChatBody, setIsChatBody] = useState(false);
	const [isChatCard, setIsChatCard] = useState(true);
	const [searchedText, setSearchedText] = useState('');
	const [initRender, setInitRender] = useState<boolean>(true);
	const { room } = data as IContextData;
	const [handleSettings] = useState(false);

	const userData = useAppSelector((state) => state?.auth?.userData);

	const url = `${process.env.NEXT_PUBLIC_SOCKET_URL}/${room?.id}/?token=${session?.user.access}`;
	const { readyState } = useWebSocket(url, {
		shouldReconnect: () => true,
	});

	const connectionStatus: any = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Online',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	}[readyState];

	const handleSearch = (value: string) => {
		// console.log(value);
		setSearchedText(value);
	};

	useEffect(() => {
		if (!initRender && triggeredRoomListSearch) {
			triggeredRoomListSearch(searchedText);
		}
		setInitRender(false);
	}, [searchedText]);

	// console.log('room-------', data, room)

	return (
		<div className="relative">
			{searchingResult && (
				<Loader
					type={'relative'}
					isTransparentBg
				/>
			)}

			<div>
				<div>
					<div className="flex justify-between items-start px-6 py-4 ">
						<div className="flex items-center">
							<Avatar
								src={userData?.profile_photo || IMAGE_PLACEHOLDER}
								className="xl:w-12 xl:h-12 2xl:w-[52px] 2xl:h-[52px]  mr-4 mt-1"
							/>
							<div className="">
								{(userData?.first_name || userData?.last_name) && (
									<h3 className=" text-base xl:text-[20px] font-semibold">
										{userData?.first_name} {userData?.last_name}
									</h3>
								)}
								{room && connectionStatus === 'Online' && (
									<h4 className="text-[#999999] text-[14px] flex items-center">
										<span className="w-[10px] h-[10px] inline-block mr-1 bg-primary rounded-full"></span>
										{connectionStatus}
									</h4>
								)}
							</div>
						</div>

						<div className="hidden">
							<div className="">
								{' '}
								<span className="">
									<IoSettingsOutline
										className={
											(handleSettings ? 'text-primary' : '') +
											` text-3xl  cursor-pointer relative`
										}
										//   onClick={() => setHandleSettings((prev) => !prev)}
									/>
								</span>
							</div>
						</div>
					</div>
					<div className="px-4 relative mt-2 ">
						<AiOutlineSearch
							size="30"
							className="absolute text-gray-500 top-4 left-8"
						/>
						<input
							type="text"
							className={
								' w-full border border-[#E6E6E6] pl-14 bg-[#FBFBFB] py-4 rounded-[6px]'
							}
							value={searchedText}
							onChange={(e?: any) => handleSearch(e.target.value)}
							onKeyDown={(e?: any) => {
								if (onKeyDownRoomListSearch) {
									onKeyDownRoomListSearch(e, e?.target?.value);
								}
							}}
							placeholder="Search people or messages"
						/>
						{searchedText && (
							<GiCancel
								className="text-primary absolute right-7 top-6 cursor-pointer"
								onClick={() => {
									setSearchedText('');
									if (onClearSearchResult) {
										onClearSearchResult();
									}
								}}
							/>
						)}
						{searchedText.length > 0 && (
							<Fade in={searchedText.length > 0 ? true : false}>
								<div className="text-right text-xs mt-1 text-gray-500 absolute -bottom-5 right-5">
									Press enter to search
								</div>
							</Fade>
						)}
					</div>
					<div className="hidden">
						<Label
							value="Favourites"
							className="text-xl font-semibold pl-4 mt-4 "
						/>
						<div className=" mt-2">
							<div className="flex justify-between px-4">
								<div className="flex flex-col">
									<StyledBadge
										overlap="circular"
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right',
										}}
										variant="dot"
									>
										<Avatar
											alt="Remy Sharp"
											src="/static/images/avatar/1.jpg"
										/>
									</StyledBadge>
									<Label
										value="Alicia"
										className="text-[#999999] text-base"
									/>
								</div>
								<div className="flex flex-col">
									<StyledBadge
										overlap="circular"
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right',
										}}
										variant="dot"
									>
										<Avatar
											alt="Remy Sharp"
											src="/static/images/avatar/1.jpg"
										/>
									</StyledBadge>
									<Label
										value="Alicia"
										className="text-[#999999] text-base"
									/>
								</div>
								<div className="flex flex-col">
									<StyledBadge
										overlap="circular"
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right',
										}}
										variant="dot"
									>
										<Avatar
											alt="Remy Sharp"
											src="/static/images/avatar/1.jpg"
										/>
									</StyledBadge>
									<Label
										value="Alicia"
										className="text-[#999999] text-base"
									/>
								</div>
								<div className="flex flex-col">
									<StyledBadge
										overlap="circular"
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right',
										}}
										variant="dot"
									>
										<Avatar
											alt="Remy Sharp"
											src="/static/images/avatar/1.jpg"
										/>
									</StyledBadge>
									<Label
										value="Alicia"
										className="text-[#999999] text-base"
									/>
								</div>
								<div className="flex flex-col">
									<StyledBadge
										overlap="circular"
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right',
										}}
										variant="dot"
									>
										<Avatar
											alt="Remy Sharp"
											src="/static/images/avatar/1.jpg"
										/>
									</StyledBadge>
									<Label
										value="Alicia"
										className="text-[#999999] text-base"
									/>
								</div>
								<div className="flex flex-col">
									<StyledBadge
										overlap="circular"
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right',
										}}
										variant="dot"
									>
										<Avatar
											alt="Remy Sharp"
											src="/static/images/avatar/1.jpg"
										/>
									</StyledBadge>
									<Label
										value="Alicia"
										className="text-[#999999] text-base"
									/>
								</div>
								<div className="flex flex-col">
									<StyledBadge
										overlap="circular"
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right',
										}}
										variant="dot"
									>
										<Avatar
											alt="Remy Sharp"
											src="/static/images/avatar/1.jpg"
										/>
									</StyledBadge>
									<Label
										value="Alicia"
										className="text-[#999999] text-base"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* <div className="flex justify-between p-4 border-b border-gray-100 mb-4">
						<div className="flex items-center">
						<BiArrowBack
							className={`lg:hidden ${
							isChatCard ? "hidden" : "block"
							} text-xl text-primary cursor-pointer mr-2`}
							onClick={() => setIsChatCard(true)}
						/>
						<h2 className="text-lg font-semibold">Chat</h2>
						</div>

						<AiOutlineSearch size="24" />
					</div> */}
					{/* <FavouritesChat /> */}
				</div>

				<div>
					<div className="mt-10 md:mt-6 px-4 mb-2">
						<Label
							value="Recent"
							className="text-xl font-semibold"
						/>
					</div>
					{roomList?.length > 0 ? (
						<div className="max-h-screen overflow-y-auto hidden lg:block ">
							{roomList.map((room: IRoom, index: number) => (
								<div
									key={room?.id}
									onClick={() => {
										select(room ?? {});
										// setIsChatCard(false);
									}}
								>
									<ChatCard
										key={index}
										room={room}
										title={room?.name}
										msg={room?.last_message}
										time={timeFromNowFns(room.updated_at, '')}
										image={room?.image}
										unread={room?.unread_message_count}
										mainClass={`xl:pl-4 p-2 py-3 flex justify-between flex-row items-center cursor-pointer hover:bg-blue-950 overflow-hidden ${
											room.id === data?.room?.id ? ' bg-[#ff09d21f] ' : ''
										}`}

										// onClick={() => setIsChatCard(false)}
										// onClick={() => {
										//   setIsDesign(true);
										//   setIsCode(false);
										// }}
									/>
								</div>
							))}
						</div>
					) : (
						<div className="mt-8 w-full flex justify-center">
							<Label
								value="No chat room found!"
								className="text-xl font-semibold text-primary m-2 "
							/>
						</div>
					)}
				</div>
			</div>

			{isChatCard ? (
				<div className="max-h-screen overflow-y-auto lg:hidden pt-1">
					{isDataInArray(roomList) ? (
						roomList.map((room: IRoom, index: number) => (
							<div
								key={room.id}
								onClick={() => {
									select(room ?? {});
									setIsChatCard(false);
								}}
							>
								<ChatCard
									key={index}
									room={room}
									title={room?.name}
									msg={room?.last_message}
									time={timeFromNowFns(room.updated_at, '')}
									image={room?.image}
									unread={room?.unread_message_count}
									mainClass={`xl:pl-4 p-2 py-3 pr-4 flex justify-between flex-row items-center cursor-pointer hover:bg-blue-900 overflow-hidden ${
										room.id === data?.room?.id ? ' bg-[#ff09d21f]' : ''
									}`}
									// onClick={() => setIsChatCard(false)}
									// onClick={() => {
									//   setIsDesign(true);
									//   setIsCode(false);
									// }}
								/>
							</div>
						))
					) : (
						<div className="mt-8 w-full flex justify-center">
							<Label
								value="No chat room found!"
								className="text-xl font-semibold text-primary m-2 "
							/>
						</div>
					)}
				</div>
			) : (
				<ChatBody />
			)}
		</div>
	);
};

export default ChatList;
