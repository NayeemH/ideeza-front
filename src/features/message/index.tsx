import ChatProfile from './chatProfile';
import ChatBody from './chatBody';
import ChatList from './chatList';
import { MessageProvider } from '@features/message/chatContext';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect, useState } from 'react';
import { getRoomListAsync } from 'reducers/chat';
import { IRoom } from '@models/chat';
import { useRouter } from 'next/router';
import { KEY_CODES } from 'enums/common';
import Loader from '@atoms/loader';
import UiEmptyPlaceholder from '@molecules/ui-empty-placeholder';
import { ApiDataType, apiService } from 'utils/request';
import { toast } from 'react-toastify';
import Modal from '@atoms/modal';
import { IoClose } from 'react-icons/io5';
import Label from '@atoms/label';

function Message() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const { roomId: activeRoomId } = router.query;
	const [selectedRoom, setSelectedRoom] = useState<IRoom>({});
	const [conversationSearch, setConversationSearch] = useState<string>('');
	const [resetChatHistory, setResetChatHistory] = useState<boolean>(false);
	const [showSearchHistory, setShowSearchHistory] = useState<boolean>(false);
	const [isClearConversationSearchText, setIsClearConversationSearchText] =
		useState<boolean>(false);
	const [initLoading, setInitLoading] = useState<boolean>(true);
	const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
	const [initRender, setInitRender] = useState<boolean>(true);
	const [searching, setSearching] = useState<boolean>(false);
	const [chatData, setChatData] = useState<any>(null);
	const [rooms, setRooms] = useState<any>([]);
	const [initNotFound, setInitNotFound] = useState<boolean>(false);
	const [openImagePreviewPopup, setOpenImagePreviewPopup] = useState<boolean>(false);
	const [previewImageUrl, setPreviewImageUrl] = useState<string>('');

	const { room_list, loading } = useAppSelector(({ chat }) => chat);

	useEffect(() => {
		if (initRender) {
			dispatch(getRoomListAsync());
		}
		setInitRender(false);
	}, []);

	useEffect(() => {
		setInitLoading(loading);
	}, [loading]);

	useEffect(() => {
		if (room_list?.results && room_list?.results?.length > 0) {
			setRooms(room_list?.results);
			setInitNotFound(room_list?.results?.length > 0 ? false : true);
			if (!activeRoomId) {
				return setSelectedRoom(room_list?.results[0]);
			}
			const filteredList = room_list?.results.find((room: any) => room.id == activeRoomId);
			if (filteredList) setSelectedRoom(filteredList);
		}
	}, [room_list?.results]);

	useEffect(() => {
		setChatData({
			room: selectedRoom,
		});
	}, [selectedRoom]);

	const onKeyDownRoomListSearch = (e?: any, search?: string) => {
		if (e?.keyCode === KEY_CODES['ENTER']) {
			getRoomListBySearched(search);
		} else if (e?.keyCode === KEY_CODES['BACKSPACE'] || e?.keyCode === KEY_CODES['BACKSPACE']) {
			if (!search) clearSearchResult();
		}
	};

	const clearSearchResult = () => {
		getRoomListBySearched('');
	};

	const getRoomListBySearched = (search?: string) => {
		setSearching(true);
		const apiData: ApiDataType = {
			method: 'get',
			url: `/chat/room/room-list/${search ? `?search=${search}` : ''}`,
			token: true,
		};
		apiService(apiData, (res: any, err: any) => {
			if (res) {
				const results = res?.data?.results;
				setRooms(results || []);
				return setSearching(false);
			}
			if (err) {
				// console.log('err---------', err)
				toast.error(err?.response?.data?.message || 'Error searching room');
				return setSearching(false);
			}
		});
	};

	const onChangeConversationSearch = (search?: string) => {
		return search;
	};

	const onKeyDownConversationSearch = (e: any, value?: string) => {
		if (e?.keyCode === KEY_CODES['ENTER']) {
			setConversationSearch(value || '');
			setShowSearchHistory(true);
			setResetChatHistory(false);
		} else if (e?.keyCode === KEY_CODES['DELETE'] || e?.keyCode === KEY_CODES['BACKSPACE']) {
			setResetChatHistory(true);
			setShowSearchHistory(false);
		}
	};

	const resetShowSearchHistory = () => {
		setShowSearchHistory(false);
	};

	const clearConversationSearchText = () => {
		setIsClearConversationSearchText(true);
		setTimeout(() => {
			setIsClearConversationSearchText(false);
		}, 1000);
	};

	const onFIleUploadSuccess = () => {
		setIsFileUploaded(true);
		setTimeout(() => {
			setIsFileUploaded(false);
		}, 1000);
	};

	const onClickImage = (imageUrl?: string) => {
		if (!imageUrl) return;
		setPreviewImageUrl(imageUrl);
		setOpenImagePreviewPopup(true);
	};

	return (
		<div className="relative">
			{initLoading && <Loader />}
			{chatData && (
				<MessageProvider data={chatData}>
					<>
						{initNotFound ? (
							<div>
								<UiEmptyPlaceholder
									className="bg-white border border-blue-950 pt-8 pb-16"
									imageClasses="h-80 w-auto m-auto"
									title="You have not started any conversation yet!"
									image={'/images/placeholders/placeholder-chat-empty.png'}
								/>
							</div>
						) : (
							<div className="grid md:grid-cols-9 xl:gap-5 gap-2 h-full mt-[50px] lg:mt-0">
								<div className=" col-span-12 lg:col-span-3 bg-white border border-blue-950 pb-3">
									<ChatList
										roomList={rooms ?? []}
										select={(room: any) => {
											setSelectedRoom(room);
											resetShowSearchHistory();
											clearConversationSearchText();
										}}
										// triggeredRoomListSearch={triggeredRoomListSearch}
										onKeyDownRoomListSearch={onKeyDownRoomListSearch}
										onClearSearchResult={clearSearchResult}
										searchingResult={searching}
									/>
								</div>
								<div className="hidden lg:block lg:col-span-4 bg-white border border-blue-950">
									<ChatBody
										search={conversationSearch}
										resetChatHistory={resetChatHistory}
										showSearchHistory={showSearchHistory}
										onTriggeredNewMsgOnShowingHistory={resetShowSearchHistory}
										onFIleUploadSuccess={onFIleUploadSuccess}
										onClickImage={onClickImage}
									/>
								</div>
								<div className="hidden lg:block lg:col-span-2 bg-white border border-blue-950 p-3 flex-col">
									<ChatProfile
										onChangeConversationSearch={onChangeConversationSearch}
										onKeyDownConversationSearch={onKeyDownConversationSearch}
										clearSearchText={isClearConversationSearchText}
										isFileUploaded={isFileUploaded}
										onClickImage={onClickImage}
									/>
								</div>
							</div>
						)}
					</>
				</MessageProvider>
			)}
			{openImagePreviewPopup && (
				<Modal
					width="sm"
					close={() => setOpenImagePreviewPopup(false)}
					open={openImagePreviewPopup}
					className={{ paper: 'rounded-xl md:px-4 p-4' }}
					header={
						<>
							<div className="flex items-center justify-between mb-4">
								{' '}
								<Label
									value="Image Preview"
									className="text-primary pt-0 texl-xl font-semibold font-sans tracking-tight ml-2.5"
								/>
								<IoClose
									onClick={() => setOpenImagePreviewPopup(false)}
									className="text-red-300 font-semibold ml-1 cursor-pointer"
									size="30"
								/>
							</div>
						</>
					}
					content={
						<div className="p-3 pt-0">
							{previewImageUrl && (
								<img
									src={previewImageUrl}
									alt=""
									className="rounded-xl"
								/>
							)}
						</div>
					}
				/>
			)}
		</div>
	);
}

export default Message;
