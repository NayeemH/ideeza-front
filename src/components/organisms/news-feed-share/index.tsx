import Dialog from '@mui/material/Dialog';
import { DialogTitle, DialogContent } from '@mui/material';
import TextField from '@molecules/text-field';
import { IoHappySharp } from 'react-icons/io5';
import Button from '@atoms/button';
import { useRef, useState } from 'react';
import { apiService } from 'utils/request';
import { toast } from 'react-toastify';
import Loader from '@atoms/loader';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { IoClose } from 'react-icons/io5';
import { NEWSFEED_OBJECT_TYPE } from 'enums/common';

const NewsFeedShare = (props: any) => {
	const { id, onClose, open, onShareSucceed, objectType } = props;

	const [loadingShare, setLoadingShare] = useState(false);
	const [shareContentText, setShareContentText] = useState('');
	const [currentCursorPosition, setCurrentCursorPosition] = useState(0);

	const submitShare = async () => {
		setLoadingShare(true);
		const formData: any = {
			text: shareContentText,
		};
		if (NEWSFEED_OBJECT_TYPE[objectType]) formData.object_type = objectType;
		if (NEWSFEED_OBJECT_TYPE[objectType]) formData.object_id = id;

		await apiService(
			{
				method: 'post',
				url: `/account/news-feed/`,
				data: formData,
				token: true,
			},
			(res: any, error: any) => {
				if (res) {
					toast.success('Shared successfully!');
					setShareContentText('');
					onClose();
					setLoadingShare(false);
					return onShareSucceed();
				}

				if (error && error.response) {
					toast.error('You have already shared this feed!');
					setShareContentText('');
					onClose();
					setLoadingShare(false);
				}
			}
		);
	};

	const handleCursor = (e: any) => {
		const caretEnd = e.target.selectionEnd;
		setShareContentText(e.target.value);
		setCurrentCursorPosition(caretEnd);
	};

	const handleEmojiWithText = (emoji: any) => {
		if (currentCursorPosition >= shareContentText.length - 1) {
			setShareContentText(shareContentText + emoji.native);
		} else {
			setShareContentText(
				shareContentText.slice(0, currentCursorPosition) +
					emoji.native +
					shareContentText.slice(currentCursorPosition)
			);
		}
	};

	const [toggle, setToggle] = useState(false);
	const ref = useRef(null);

	return (
		<Dialog
			onClose={() => onClose()}
			open={open}
		>
			<div className="relative">
				{loadingShare && (
					<Loader
						type="relative"
						isTransparentBg
					/>
				)}
				<DialogTitle className="pt-[100px]">Share Social</DialogTitle>
				<DialogContent style={{ width: 600 }}>
					<div>
						<TextField
							mainClass="flex flex-col mt-3"
							labelvalue={'Share on Social Platform'}
							// register={register({ required: "Please Enter Description!" })}
							labelClasses="font-bold text-lg -mt-2 mb-2 text-primary pb-2"
							multiline="true"
							rows="6"
							name="text"
							// error={errors}
							placeholder="Write the text here..."
							inputClasses="w-full p-0 text-sm tracking-tight font-sans border border-gray-850 border-opacity-40"
							value={shareContentText}
							// onChange={(e: any) => setShareContentText(e.target.value)}
							onChange={(e: any) => {
								handleCursor(e);
							}}
							onClick={(e?: any) => {
								const caretEnd = e.target.selectionEnd;
								setCurrentCursorPosition(caretEnd);
							}}
						/>

						<div className="flex items-center w-full pr-1 justify-between mt-2">
							{toggle && (
								<div
									className="absolute bottom-[50px] "
									ref={ref}
								>
									<Picker
										set="apple"
										onSelect={(emoji: any) => handleEmojiWithText(emoji)}
										style={{
											width: '500px',
											paddingTop: '25px',
											paddingLeft: '10px',
											paddingRight: '10px',
											zIndex: 5000,
										}}
									/>
									<IoClose
										className="text-[30px] text-red-500 absolute top-2 right-2"
										onClick={() => setToggle(!toggle)}
									/>
								</div>
							)}
							<IoHappySharp
								onClick={() => setToggle(!toggle)}
								className="text-blue-150 text-4xl"
							/>
							<Button
								type="submit"
								value="Share"
								className="text-white bg-primary transform-none rounded-sm tracking-tight py-1 px-12"
								onClick={submitShare}
							/>
						</div>
					</div>
				</DialogContent>
			</div>
		</Dialog>
	);
};

export default NewsFeedShare;
