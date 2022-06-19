import MessageLoader from '@atoms/chat-loader';
import Dropdown from '@atoms/drop-down';
import { IMessage } from '@models/chat';
import { Avatar } from '@mui/material';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { IoSendSharp } from 'react-icons/io5';
import { BsEmojiSmile } from 'react-icons/bs';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Waypoint } from 'react-waypoint';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { useOutsideClickHandler } from 'utils/utils';
import { IContextData, useMessageState } from '@features/message/chatContext';
import { IoIosArrowDown } from 'react-icons/io';
import { Popover } from '@mui/material';
import ChatProfile from './chatProfile';
import { AiOutlineFileImage } from 'react-icons/ai';
// import { GrAttachment } from 'react-icons/gr';
import Label from '@atoms/label';
import { apiService } from 'utils/request';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
// const READY_STATE_OPEN = 1;

const ChatBody = (props: any) => {
	const {
		search,
		showSearchHistory,
		resetChatHistory,
		onTriggeredNewMsgOnShowingHistory, //event when new message arrived and also 'showingSearchHistory' value is true
		onFIleUploadSuccess,
		onMessageSendingSuccess,
		isMiniChatBox,
		hideEmojiPicker,
		hideFilePicker,
		onClickImage,
	} = props;
	const data = useMessageState();
	const { room } = data as IContextData;
	const { data: session } = useSession();
	const chatBody = useRef<HTMLDivElement>(null);
	const [page, setPage] = useState(0);
	const [messageHistory, setMessageHistory] = useState<IMessage[]>([]);
	const [messageHistoryTemp, setMessageHistoryTemp] = useState<IMessage[]>([]);
	const [inputtedMessage, setInputtedMessage] = useState('');
	const [showingSearchHistory, setShowingSearchHistory] = useState(false);
	const [initRender, setInitRender] = useState(true);
	const [loading, setLoading] = useState(true);
	const [file, setFile] = useState<any>(null);
	const [fileUrl, setFileUrl] = useState<any>('');
	const [mediaUploading, setMediaUploading] = useState<any>();

	// console.log('file------', file)
	const url = `${process.env.NEXT_PUBLIC_SOCKET_URL}/${room?.id}/?token=${session?.user.access}`;
	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url, {
		shouldReconnect: () => true,
	});
	const ref = useRef(null);
	const chatInputRef: any = useRef(null);
	const fileInputRef: any = useRef(null);

	const [toggle, setToggle] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [notFound, setNotFound] = useState(false);

	useOutsideClickHandler(ref, () => setToggle(!toggle));

	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Online',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	}[readyState];

	useEffect(() => {
		//------ checking Message list changed ------------
		if (lastJsonMessage && lastJsonMessage.messages) {
			setMessageHistory([...messageHistory, ...lastJsonMessage.messages]);
			setMessageHistoryTemp([...messageHistory, ...lastJsonMessage.messages]);
		}
		//------ checking New Message created/arrived ------------
		else if (lastJsonMessage && lastJsonMessage.message) {
			//------ checking New Message created/arrived but !showingSearchHistory ------------
			if (!showingSearchHistory) {
				setMessageHistory((prev) => [lastJsonMessage.message, ...prev]);
			}
			//------ checking New Message created/arrived but showingSearchHistory ------------
			else {
				setMessageHistory([lastJsonMessage.message, ...messageHistoryTemp]);
				setShowingSearchHistory(false);
				if (typeof onTriggeredNewMsgOnShowingHistory == 'function')
					onTriggeredNewMsgOnShowingHistory();
			}
		}
		setInitRender(false);
	}, [lastJsonMessage, setMessageHistory]);

	useEffect(() => {
		if (initRender) return;
		if (search && showSearchHistory) {
			getSearchedChatHistory(search);
		}
	}, [search, showSearchHistory]);

	useEffect(() => {
		if (initRender) return;
		if (resetChatHistory) {
			resetConversationHistory();
		}
	}, [resetChatHistory]);

	useEffect(() => {
		if (connectionStatus === 'Online') {
			sendJsonMessage({
				start: page,
				command: 'fetch_messages',
			});
		}
		setLoading(false);
	}, [connectionStatus, page]);

	useEffect(() => {
		setPage(0);
		setMessageHistory([]);
		chatInputRef.current.scrollIntoView({ behavior: 'smooth' });
	}, [room]);

	useEffect(() => {
		chatInputRef?.current?.focus();
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setNotFound(
				messageHistory?.length <= 0 &&
					!loading &&
					connectionStatus !== 'Connecting' &&
					connectionStatus === 'Online'
					? true
					: false
			);
		}, 3000);
	}, [messageHistory, loading, connectionStatus]);

	const resetConversationHistory = () => {
		setMessageHistory(messageHistoryTemp);
		setShowingSearchHistory(false);
	};

	const getSearchedChatHistory = async (search?: string) => {
		setLoading(true);
		await apiService(
			{
				method: 'get',
				url: `/chat/room/${room?.id}/search-message/${search ? `?query=${search}` : ''}`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const results = res?.data?.results;
					setMessageHistory(results);
					setShowingSearchHistory(true);
					return setLoading(false);
				}
				setLoading(false);
			}
		);
	};

	const sendMesssageOnPressEnter = (e: any) => {
		if (e?.keyCode === 13 && inputtedMessage?.trim()) {
			e?.preventDefault();

			if (file && fileUrl && room?.id) {
				// console.log('Uploading file-----')
				uploadMedia('FILE', file, room?.id);
			} else {
				sendJsonMessage({
					command: 'new_message',
					message: inputtedMessage,
				});
				chatBody.current && chatBody.current.scrollIntoView({ behavior: 'smooth' });
				setInputtedMessage('');
				if (onMessageSendingSuccess) onMessageSendingSuccess();
			}
		}
	};
	const sendMesssageOnClickBtn = () => {
		if (file && fileUrl && room?.id) {
			// console.log('Uploading file-----')
			uploadMedia('FILE', file, room?.id);
		} else {
			if (!inputtedMessage?.trim()) return;
			sendJsonMessage({
				command: 'new_message',
				message: inputtedMessage,
			});
			chatBody.current && chatBody.current.scrollIntoView({ behavior: 'smooth' });
			setInputtedMessage('');
			if (onMessageSendingSuccess) onMessageSendingSuccess();
		}
	};

	const nextPage = () => {
		setPage((prev) => prev + 10);
	};
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const onChangeFile = (event: any) => {
		event.stopPropagation();
		event.preventDefault();
		// removeFile()
		const attachFile = event?.target?.files[0];
		// console.log(attachFile);
		if (attachFile) {
			const fileUrl = URL?.createObjectURL(event?.target?.files[0]);
			setFileUrl(fileUrl);
			// console.log('fileUrl----', fileUrl)
		}
		setFile(attachFile);

		chatBody.current && chatBody.current.scrollIntoView({ behavior: 'smooth' });
	};

	const removeFile = () => {
		setFileUrl('');
		setFile(null);
	};

	const uploadMedia = async (type: 'MESSAGE' | 'AUDIO' | 'FILE', media: any, roomId: any) => {
		setMediaUploading(true);
		// console.log('file type------', typeof file, file)
		const formData = new FormData();
		formData.append('message', 'Hello Worl');
		formData.append('content_type', type);
		formData.append('room', roomId);
		if (!file) {
			// console.log('file type---- !file', typeof file, file)
			return toast.error('No file is seleted');
		}
		formData.append('file', file);

		await apiService(
			{
				method: 'post',
				url: `/chat/file/`,
				token: true,
				data: formData,
			},
			(res: any, err: any) => {
				if (res) {
					// const results = res?.data?.results
					// console.log('res----file Uploading succeed', res?.data)
					setFile(null);
					setFileUrl(null);
					setInputtedMessage('');
					setMediaUploading(false);
					if (onFIleUploadSuccess) onFIleUploadSuccess();
					return;
				}
				if (err) {
					// console.log('file uploading error-----', err?.response)
					toast.error(
						err?.response?.data?.message || 'Something went wrong to send file'
					);
				}
				setMediaUploading(false);
			}
		);
	};

	// console.log('messageHistory-----------', messageHistory);

	return (
		<div>
			{!isMiniChatBox && (
				<>
					{room && (
						<div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
							<div className="flex gap-4">
								<Avatar
									src={room?.image}
									className="xl:w-12 xl:h-12 2xl:w-[52px] 2xl:h-[52px]"
								/>
								<div>
									<div className="flex items-center gap-2">
										<h3 className=" text-base xl:text-[20px] font-semibold">
											{room?.name}
										</h3>{' '}
										<span className="lg:hidden">
											<IoIosArrowDown onClick={handleClick} />
										</span>
									</div>
									{connectionStatus === 'Online' && (
										<h4 className="text-[#999999] text-[14px] flex items-center">
											<span className="w-[10px] h-[10px] inline-block mr-1 bg-primary rounded-full"></span>
											{connectionStatus}
										</h4>
									)}
								</div>
								<Popover
									open={open}
									// handleClick={handleClick}
									onClose={handleClose}
									id={id}
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right',
									}}
									className="popover-container"
								>
									<div className="py-2 w-auto shadow-lg px-4">
										<ChatProfile />
									</div>
								</Popover>
							</div>

							<div className="flex items-center">
								<div className="pr-5 cursor-pointer">
									<img
										src="/images/icon/call-icon.svg"
										alt="icon"
									/>
								</div>
								<div className="cursor-pointer">
									<img
										src="/images/icon/video-icon.svg"
										alt="icon"
									/>
								</div>
								<div>
									<Dropdown
										mainClass="p-0 md:p-auto"
										icons={
											<BiDotsVerticalRounded className="2xl:text-4xl xl:text-3xl text-[#999999]" />
										}
										itemsClasses={{
											root: 'font-sans md:text-md 2xl:text-xl px-4 hover:text-current text-gray-700',
										}}
										options={[
											{
												name: 'Block',
												value: 'Block',
											},
											{
												name: 'Report this user',
												value: 'Report',
											},
											{
												name: 'Leave this conversation',
												value: 'Leave',
											},
										]}
									/>
								</div>
							</div>
						</div>
					)}

					<div
						className={`h-[calc(100vh_-_332px)] overflow-y-auto no-scrollbar`}
						style={{ scrollBehavior: 'smooth' }}
					>
						<div ref={chatBody} />
						{room ? (
							<div className="w-full self-end flex flex-col p-4">
								<Waypoint
									onEnter={() => {
										setLoading(true);
										nextPage();
									}}
									bottomOffset="50%"
								/>
								{loading || connectionStatus == 'Connecting'
									? [...Array(2).fill('')].map((i) => (
											<MessageLoader key={i + Math.random()} />
									  ))
									: null}
								{messageHistory?.length > 0 &&
									[...messageHistory].reverse()?.map((history, key: number) => {
										return (
											<div key={key + Math.random() * 100000}>
												{history?.author?.id === session?.user.id ? (
													<div className="flex flex-row-reverse gap-4 items-end mb-4">
														<Avatar
															src={history?.author?.profile_photo}
															className="xl:w-12 xl:h-12 2xl:w-[52px] 2xl:h-[52px]"
														/>
														<div>
															<div className="flex flex-row-reverse items-center group">
																<div>
																	<time className="text-sm text-gray-200 text-left block">
																		{format(
																			new Date(
																				history?.updated_at ||
																					'2022-01-26T03:49:39.388308Z'
																			),
																			'EEE, hh:mm'
																		)}
																	</time>
																	<div className="p-4 rounded rounded-br-none bg-primary">
																		<p className="text-white text-md flex items-center">
																			{history?.message}
																		</p>
																		{history?.content_type ===
																			'FILE' &&
																			history?.file && (
																				<img
																					src={
																						history?.file
																					}
																					className="w-72 h-auto rounded cursor-pointer mt-1.5"
																					onClick={() =>
																						onClickImage(
																							history?.file
																						)
																					}
																				/>
																			)}
																	</div>
																</div>
																<div className="hidden group-hover:block">
																	<Dropdown
																		className="mt-5"
																		icons={
																			<BiDotsVerticalRounded />
																			//   <img
																			//     src="/images/icon/user-msg-setting.svg"
																			//     alt="setting"
																			//     className="w-full"
																			//   />
																		}
																		itemsClasses={{
																			root: 'font-sans text-base 2xl:text-xl font-normal px-3 py-1 hover:text-current text-gray-700',
																		}}
																		options={[
																			{
																				name: 'Delete',
																				value: 'delete',
																				// func: () => {dispatch(deleteChat(item.id))}
																			},
																			{
																				name: 'Edit',
																				value: 'edit',
																			},
																			// {
																			// 	name: 'Mark as unread',
																			// 	value: 'unread',
																			// },
																		]}
																	/>
																</div>
															</div>
														</div>
													</div>
												) : (
													<div className="flex gap-4 items-end mb-4">
														<Avatar
															src={history?.author?.profile_photo}
															className="xl:w-12 xl:h-12 2xl:w-[52px] 2xl:h-[52px]"
														/>
														<div>
															<time className="text-sm text-gray-200 text-right block">
																{format(
																	new Date(
																		history?.updated_at ||
																			'2022-01-26T03:49:39.388308Z'
																	),
																	'EEE, hh:mm'
																)}
															</time>
															<div className="border p-4 bg-gray-100 rounded rounded-bl-none">
																<p className="text-gray-600 text-md flex items-center">
																	{history?.message}
																</p>
															</div>
														</div>
													</div>
												)}
											</div>
										);
									})}
								{
									// TODO: fix showing message empty placeholder
									false && messageHistory?.length == 0 && notFound && (
										// && connectionStatus != 'Connecting'
										<Label
											value="Message not found!"
											className="text-xl font-semibold text-primary"
										/>
									)
								}
							</div>
						) : (
							<div className="h-full flex items-center justify-center">
								<Label
									value="You have not started any conversation yet"
									className="text-xl text-primary font-semibold"
								/>
							</div>
						)}
					</div>
				</>
			)}
			{room && (
				<div
					className={`${
						fileUrl ? 'border border-t-slate-100 border-x-0 border-b-0' : ''
					} `}
				>
					{fileUrl && (
						<div className="w-full h-auto pt-5 px-4 pl-6 flex items-end">
							<div className="h-32 w-32 border border-slate-200 rounded-lg relative">
								<div
									className="w-full h-full absolute bg-cover bg-no-repeat bg-center rounded-lg"
									style={{ backgroundImage: `url(${fileUrl})` }}
								></div>
								<div
									className="absolute top-2 right-2 rounded-full h-8 w-8 flex items-center justify-center bg-white border border-slate-300 shadow hover:shadow-lg transition-all cursor-pointer"
									onClick={removeFile}
								>
									<FaTimes className="text-slate-700" />
								</div>
							</div>
							{mediaUploading && <div className="ml-4">Sending...</div>}
						</div>
					)}
					<div
						className={`flex flex-col lg:flex-row items-center bg-white ${
							isMiniChatBox ? '' : `px-4 pl-6 ${fileUrl ? 'pt-5' : 'pt-[30px]'} pb-6`
						}`}
					>
						<div className="relative w-full bg-[#FBFBFB] ">
							{!hideEmojiPicker && (
								<div className="absolute top-[15px] left-[14px] ml-2">
									<span
										onClick={() => setToggle(!toggle)}
										className="cursor-pointer"
									>
										<BsEmojiSmile className="text-gray-600 text-xl -mr-1" />
									</span>
									{toggle && (
										<div
											className="absolute bottom-[48px] z-[999999]"
											ref={ref}
										>
											<Picker
												set="apple"
												onSelect={(emoji: any) =>
													setInputtedMessage(
														inputtedMessage + emoji.native
													)
												}
											/>
										</div>
									)}
								</div>
							)}

							<input
								ref={chatInputRef}
								type="text"
								placeholder="Type your massage here...."
								className={`w-full p-3 ${
									hideEmojiPicker ? '' : 'pl-[60px]'
								} resize-none border border-[#E6E6E6] rounded-[10px] focus:outline-none bg-[#FBFBFB]`}
								onChange={(e) => setInputtedMessage(e.target.value)}
								onKeyDown={(e) => sendMesssageOnPressEnter(e)}
								value={inputtedMessage}
							/>
						</div>
						<div className="flex 2xl:mt-[-5px] items-center">
							{!hideFilePicker && (
								<button
									onClick={() => {
										// // console.log('fileInput-----', fileInputRef?.current)
										fileInputRef?.current?.click();
									}}
									disabled={false}
								>
									<div className="ml-4 mr-2 bg-[#EEEEEE] border rounded-[50%] h-[50px] w-[50px] flex items-center justify-center cursor-pointer">
										<AiOutlineFileImage className="text-gray-600 text-xl m-2" />
										<input
											type="file"
											accept="image/*"
											ref={fileInputRef}
											className={'hidden'}
											onChange={(e: any) => onChangeFile(e)}
										/>
									</div>
								</button>
							)}
							{/* <div className="mx-2 bg-[#EEEEEE] border rounded-[50%] h-[50px] w-[50px] flex items-center justify-center cursor-pointer">
								<GrAttachment className="text-gray-600 text-xl m-2" />
							</div> */}

							<button
								onClick={() => {
									sendMesssageOnClickBtn();
								}}
								disabled={!(inputtedMessage || file)}
							>
								<div
									className={`${
										inputtedMessage || file ? 'bg-primary' : 'bg-[#EEEEEE]'
									} ml-2 mr-0 border rounded-[50%] h-[50px] w-[50px] flex items-center justify-center transition-all ease-in-out`}
								>
									<IoSendSharp
										className={`${
											inputtedMessage || file ? 'text-white' : 'text-gray-600'
										} text-xl m-2 transition-all ease-in-out`}
									/>
								</div>
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatBody;
