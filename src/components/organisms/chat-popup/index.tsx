import Button from '@atoms/button';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ChatBody from '@features/message/chatBody';
import UiFormHelperText from '@atoms/ui-form-helper-text';
import { AiOutlineCheck } from 'react-icons/ai';

const ChatPopup = (props: any) => {
	const { openPopup, onClosePopup, roomId } = props;
	const [showSeeAllButton, setShowSeeAllButton] = useState(false);
	const [msgSuccessText, setMsgSuccessText] = useState('');

	const router = useRouter();
	const onClose = () => {
		setShowSeeAllButton(false);
		if (onClosePopup) onClosePopup();
	};

	useEffect(() => {
		if (msgSuccessText) {
			setTimeout(() => {
				setMsgSuccessText('');
			}, 3000);
		}
	}, [msgSuccessText]);

	return (
		<>
			<Modal
				width="sm"
				close={onClose}
				open={openPopup}
				header={
					<div className="mb-5">
						<Label
							value="Message"
							className="text-primary text-lg font-semibold font-sans tracking-tight"
						/>
					</div>
				}
				content={
					<div>
						<div className="py-2 relative">
							<ChatBody
								onMessageSendingSuccess={() => {
									setShowSeeAllButton(true);
									setMsgSuccessText('Sent message');
								}}
								isMiniChatBox
								hideEmojiPicker
								hideFilePicker
							/>
							{/* <input
								ref={chatInputRef}
								type="text"
								placeholder="Type your massage here...."
								className="w-full p-3 pl-4 resize-none border border-[#E6E6E6] rounded-[10px] focus:outline-none bg-[#FBFBFB]"
								// rows={1}
								// cols={1}
								onChange={(e) => setInputtedMessage(e.target.value)}
								onKeyDown={(e) => sendMesssageOnPressEnter(e)}
								value={inputtedMessage}
							/>*/}
							{msgSuccessText && (
								<div className="absolute -bottom-4 right-14">
									<UiFormHelperText defaultColor="text-slate-600">
										<span className="flex">
											<AiOutlineCheck />
											<span className="text-sm ml-0.5">{msgSuccessText}</span>
										</span>
									</UiFormHelperText>
								</div>
							)}
						</div>
						<div className="w-full flex mt-5">
							<Button
								onClick={onClose}
								value="Cancel"
								classes={{
									root: `text-gray-700 border border-gray-300 border-solid bg-white rounded-[10px] leading-5 text-sm tracking-tight font-sans capitalize rounded`,
								}}
							/>
							{showSeeAllButton && (
								<Button
									onClick={() =>
										router.push(`/user/dashboard/message/?roomId=${roomId}`)
									}
									value="See all messages"
									classes={{
										root: `ml-5 text-primary border border-gray-300 border-solid bg-white rounded-[10px] leading-5 text-sm tracking-tight font-sans capitalize rounded`,
									}}
								/>
							)}
						</div>
					</div>
				}
			/>
		</>
	);
};

export default ChatPopup;
