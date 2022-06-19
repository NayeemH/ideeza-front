import React, { useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import Modal from '@atoms/modal';
import { MdAccessTimeFilled } from 'react-icons/md';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { BsChatLeftText } from 'react-icons/bs';
import { AiTwotoneEdit } from 'react-icons/ai';
import { RiAttachment2 } from 'react-icons/ri';
import AvatarAtom from '@atoms/avatar';
import { format } from 'date-fns';

export const notesBg = [
	{ colorName: 'colorOne', bgImg: '/images/my-notes/noteOne.png' },
	{ colorName: 'colorTwo', bgImg: '/images/my-notes/noteTwo.png' },
	{ colorName: 'colorThree', bgImg: '/images/my-notes/noteThree.png' },
	{ colorName: 'colorFour', bgImg: '/images/my-notes/noteFive.png' },
	{ colorName: 'colorFive', bgImg: '/images/my-notes/noteSix.png' },
	{ colorName: 'colorSix', bgImg: '/images/my-notes/noteSeven.png' },
	{ colorName: 'colorSeven', bgImg: '/images/my-notes/noteEight.png' },
	{ colorName: 'colorEight', bgImg: '/images/my-notes/noteNine.png' },
	{ colorName: 'colorNine', bgImg: '/images/my-notes/noteTen.png' },
	{ colorName: 'colorTen', bgImg: '/images/my-notes/noteEleven.png' },
	{ colorName: 'colorEleven', bgImg: '/images/my-notes/noteTwelve.png' },
	{ colorName: 'colorTwelve', bgImg: '/images/my-notes/noteThirteen.png' },
	{ colorName: 'colorThirteen', bgImg: '/images/my-notes/noteForteen.png' },
];

function NotesDetail(props: any) {
	const {
		singleNote,
		onDeleteClicked,
		// open,
		onEditClicked,
	} = props;
	// const [user, setUser] = useState(false);
	const [open, setOpen] = React.useState(false);

	const createdTime = new Date(singleNote?.created_at).toLocaleTimeString(navigator.language, {
		hour: '2-digit',
		minute: '2-digit',
	});

	const endTime = new Date(singleNote?.deadline).toLocaleTimeString(navigator.language, {
		hour: '2-digit',
		minute: '2-digit',
	});

	// const endTime = new Date(singleNote?.created_at);
	// console.log(createdTime);
	// console.log(endTime);
	// function getISOStringWithoutSecsAndMillisecs2(date: Date) {
	// 	const dStr = date.toISOString();

	// 	const totalString = dStr.substring(0, dStr.indexOf(':', dStr.indexOf(':') + 1));
	// 	return totalString.slice(11);
	// }

	const handleClick2 = () => {
		setOpen((prev) => !prev);
	};

	const handleClickAway = () => {
		setOpen(false);
	};
	// console.log(singleNote?.file_attachments);

	const [openModal, setOpenModal] = useState(false);
	const singleNoteId = singleNote?.id;
	// console.log(singleNote?.color);

	const randomIndex = Math.floor(Math.random() * notesBg.length);
	const { bgImg } = notesBg[randomIndex];
	// console.log(singleNote);

	return (
		<div className="relative cursor-pointer ml-10 lg:ml-0">
			<div
				className="lg:pr-[4px] w-[232px] pr-1 lg:pb-[4px] object-cover h-[226px] "
				onClick={() => setOpenModal(true)}
			>
				<img
					src={singleNote?.color || bgImg}
					alt=""
					// width={227}
					// height={227}
					className="object-cover w-full h-[226px]"
				/>
			</div>
			<div className="absolute top-[12%] left-[10%] 2xl:left-[15%] flex flex-col items-start font-proxima-nova">
				<div className="flex">
					<Label
						value={createdTime}
						className="text-white text-[12px]"
					/>
					<span className="text-white  mx-2">-</span>
					<Label
						value={endTime}
						className="text-white text-[12px]"
					/>
				</div>
				<div className="cursor-pointer w-full ">
					<div className="w-40 flex mr-2 justify-between">
						<Label
							value={
								singleNote?.title.length > 30
									? singleNote?.title?.slice(0, 30) + '...'
									: singleNote?.title
							}
							classes={{
								root: `hover-text font-proxima-nova text-[16px] font-semibold text-white`,
							}}
						/>

						<ClickAwayListener onClickAway={handleClickAway}>
							<div className="">
								<div className="">
									<BiDotsVerticalRounded
										onClick={handleClick2}
										className="text-2xl text-white cursor-pointer"
									/>
								</div>
								{open ? (
									// <div sx={styles}>
									<div
										className={` py-2 absolute top-8 w-auto rounded-xl bg-zinc-100 z-50`}
									>
										<IconLabel
											onClick={() => onDeleteClicked()}
											mainClass="px-3 py-1 rounded-xl hover:bg-gray-200  cursor-pointer transition-all duration-500 ease-in-out flex items-center"
											tooltipProps={{ open: false }}
											labelValue="Delete"
											iconContanerClass="text-lg w-6"
											lableClass={{
												root: `text-gray-700 tracking-tighter text-base 2xl:text-xl ml-2`,
											}}
											iconComponent={
												<BsFillBookmarkFill className="text-gray-910 text-xl pt-1" />
											}
										/>
										<IconLabel
											onClick={() => {
												onEditClicked(singleNoteId);
											}}
											mainClass="px-3 py-1 rounded-xl hover:bg-gray-200 cursor-pointer transition-all duration-500 ease-in-out flex items-center"
											tooltipProps={{ open: false }}
											labelValue="Edit"
											iconContanerClass="text-lg w-6"
											lableClass={{
												root: `text-gray-700 tracking-tighter text-base 2xl:text-xl ml-2`,
											}}
											iconComponent={
												<AiTwotoneEdit className="text-gray-910 text-xl pt-1" />
											}
										/>
									</div>
								) : // </div>
								null}
							</div>
						</ClickAwayListener>
					</div>

					{/* <Popper open={openPop} id={id} anchorEl={anchorEl}> */}

					{/* </Popper> */}

					<Modal
						width="md"
						close={() => setOpenModal(false)}
						className={{
							paper: 'p-6 pt-[80px] relative overflow-hidden bg-transparent shadow-none w-[742px]',
						}}
						header={
							<>
								<div className="img-container absolute top-[-20px] left-5 2xl:left-[32%]">
									<img
										src="/images/my-notes/img_notetime.png"
										alt=""
									/>
									<div className="absolute top-5  2xl:top-[40px] left-[55px]">
										<MdAccessTimeFilled className="text-lg 2xl:text-2xl relative left-[-15px] text-white text-center m-auto" />
										<div className="text-white ">
											<h4 className="text-xs xl:text-sm font-proxima-nova flex flex-col sm:flex-row">
												<span>
													{format(
														new Date(singleNote?.created_at),
														"yyyy-MM-dd hh:mm aaaaa'm'"
													)}
												</span>
												<span className="ml-[-15px] mr-[17px]">-</span>
												<span>
													{format(
														new Date(singleNote?.deadline),
														"yyyy-MM-dd hh:mm aaaaa'm'"
													)}
												</span>
											</h4>
										</div>
									</div>
								</div>
							</>
						}
						content={
							<div className="note-modal-bg">
								<div className="absolute z-[-1] right-[-30px] top-[50px]">
									<img
										src="/images/my-notes/note-modal-bg.png"
										alt=""
										className="h-[690px]"
									/>
								</div>
								<div className="flex flex-col items-center custom-note-bg  pt-[56px] pb-[26px] ">
									<div>
										<Label
											value={singleNote?.title}
											className="text-white text-center texl-lg xl:text-[24px] font-semibold font-proxima-nova tracking-tight hover:underline z-50"
										/>
										<div className="text-white text-base xl:text-[20px] font-semibold font-proxima-nova tracking-tight">
											<h4>
												Associate to the{' '}
												<span className="underline cursor-pointer">
													New Car
												</span>{' '}
												Project
											</h4>
										</div>
									</div>
								</div>
								<div className="custom-note-bg-secondary">
									<div
										dangerouslySetInnerHTML={{
											__html: singleNote?.description,
										}}
										className="text-white text-base  font-semibold font-proxima-nova tracking-tight p-[30px] h-[225px] overflow-y-auto"
									/>
									{/* <Label value={singleNote?.description} /> */}
									<hr />
									{/* TODO */}
									<div className="flex justify-between p-[30px] h-[210px] items-center">
										{/* <img src={singleNote?.user?.profile_photo} alt="" /> */}
										<div className="">
											<AvatarAtom
												// click={toggleUser}
												// assign={assign}
												src={[singleNote?.user?.profile_photo]}
												variant="circular"
											/>
											{singleNote?.file_attachments?.map((file: any) => {
												return (
													<div
														key={file}
														className="flex items-center text-white"
													>
														<RiAttachment2 />
														<Label
															value={file?.name}
															className="text-white"
														/>
													</div>
												);
											})}
										</div>

										<div className="rounded-full custom-note-bg w-12 h-12 flex items-center justify-center">
											<BsChatLeftText className="text-white" />
											<div className="text-white ml-2">3</div>
										</div>
									</div>
								</div>
							</div>
						}
						open={openModal}
						actions={<></>}
					/>
				</div>
			</div>
		</div>
	);
}

{
	/* <Label
        value={label1Value}
        classes={{ root: `mb-2 font-medium hover-text ${labelDate}` }}
      />
      <Label
        value={label2Value}
        classes={{
          root: `hover-text text-gray-700 font-semibold ${labelheading}`,
        }}
      />
      <Label value={label3Value} classes={{ root: `hover-text ${label3}` }} />
      <div className={`${chackboxClass}`}>
        <CheckboxFields
          value={checkboxValue}
          labelClass="hover-text text-gray-900 tracking-tight"
        />
        <CheckboxFields
          value={checkboxValue1}
          labelClass="hover-text text-gray-900 tracking-tight"
        />
      </div>
      <Label value={descValue} classes={{ root: `hover-text ${descClass}` }} />
      <div className={`flex justify-between ${bottomClass}`}>
        <AddAvatar labelClass="hidden" avatarClass={avatarClass} />
        <div className="flex items-center -mr-3">
          <IconLabel
            tooltipProps={{ open: false }}
            labelValue="5"
            iconContanerClass="text-lg"
            lableClass={{
              root: "hover-text text-gray-900 text-base ml-1 font-proxima-nova",
            }}
            iconComponent={<FaRegComment className="text-primary" />}
          />
          <IconLabel
            tooltipProps={{ open: false }}
            labelValue="5"
            iconContanerClass="text-lg"
            lableClass={{
              root: "hover-text text-gray-900 text-base font-proxima-nova",
            }}
            iconComponent={<BsPaperclip className="text-primary" />}
          />
        </div>
      </div>
      <Label
        value="Introduction to the task 4.png"
        classes={{ root: `${label4}` }}
      /> */
}

// NotesDetail.defaultProps = {
//   mainClass: "p-4 lg:px-7 px-5",
//   labelDate: "text-gray-900",
//   labelheading: "text-lg text-gray-700 font-semibold",
//   label3: "text-gray-700 mb-3",
//   descClass: "font-normal text-gray-770 pt-2",
//   comment: "text-primary",
//   label4: "text-primary tracking-tight pt-2",
//   label5: "text-primary py-1",
//   read: "text-primary",
//   avatarClass: "w-8 h-8",
//   bottomClass: "pt-7",
// };

export default NotesDetail;
