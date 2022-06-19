import Button from '@atoms/button';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
// import Image from "next/image";
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
// import attach from "../../../assets/images/XMLID_18_.png";

function AvatarPopup(props: any) {
	const { open, toggleOpen, setSelectedAvatar, setAvatarName } = props;
	const [selected, setSelected] = useState('');

	return (
		<div>
			<Modal
				width="sm"
				close={toggleOpen}
				header={
					<>
						<div className="flex items-center justify-between">
							{' '}
							<Label
								value="Choose your avatar"
								className="text-primary pt-0 texl-lg 2xl:text-2xl font-semibold font-sans tracking-tight"
							/>
							<IoClose
								onClick={toggleOpen}
								className="text-red-200 font-semibold ml-1 cursor-pointer"
								size="30"
							/>
						</div>
					</>
				}
				content={
					<div className="space-y-2">
						<div className="overflow-y-auto pop-c-height mt-12 mb-20 ">
							<div className="flex flex-wrap txt-c4-color rounded-2xl mr-3">
								<div
									className="m-3 cursor-pointer"
									onClick={() => setSelected('avatar1.png')}
								>
									<img
										className={
											selected === 'avatar1.png'
												? 'w-full border border-primary'
												: 'w-full'
										}
										src="/images/choose-your-avatar/avatar1.png"
										alt="avater icon"
									/>
								</div>
								<div
									className="m-3 cursor-pointer"
									onClick={() => setSelected('avatar2.png')}
								>
									<img
										className={
											selected === 'avatar2.png'
												? 'w-full border border-primary'
												: 'w-full'
										}
										src="/images/choose-your-avatar/avatar2.png"
										alt="avater icon"
									/>
								</div>
								<div
									className="m-3 cursor-pointer"
									onClick={() => setSelected('avatar3.png')}
								>
									<img
										className={
											selected === 'avatar3.png'
												? 'w-full border border-primary'
												: 'w-full'
										}
										src="/images/choose-your-avatar/avatar3.png"
										alt="avater icon"
									/>
								</div>
								<div
									className="m-3 cursor-pointer"
									onClick={() => setSelected('avatar4.png')}
								>
									<img
										className={
											selected === 'avatar4.png'
												? 'w-full border border-primary'
												: 'w-full'
										}
										src="/images/choose-your-avatar/avatar4.png"
										alt="avater icon"
									/>
								</div>
								<div
									className="m-3 cursor-pointer"
									onClick={() => setSelected('avatar5.png')}
								>
									<img
										className={
											selected === 'avatar5.png'
												? 'w-full border border-primary'
												: 'w-full'
										}
										src="/images/choose-your-avatar/avatar5.png"
										alt="avater icon"
									/>
								</div>
								<div
									className="m-3 cursor-pointer"
									onClick={() => setSelected('avatar6.png')}
								>
									<img
										className={
											selected === 'avatar6.png'
												? 'w-full border border-primary'
												: 'w-full'
										}
										src="/images/choose-your-avatar/avatar6.png"
										alt="avater icon"
									/>
								</div>
								<div
									className="m-3 cursor-pointer"
									onClick={() => setSelected('avatar7.png')}
								>
									<img
										className={
											selected === 'avatar7.png'
												? 'w-full border border-primary'
												: 'w-full'
										}
										src="/images/choose-your-avatar/avatar7.png"
										alt="avater icon"
									/>
								</div>
								<div
									className="m-3 cursor-pointer"
									onClick={() => setSelected('avatar8.png')}
								>
									<img
										className={
											selected === 'avatar8.png'
												? 'w-full border border-primary'
												: 'w-full'
										}
										src="/images/choose-your-avatar/avatar8.png"
										alt="avater icon"
									/>
								</div>
								<div
									className="m-3 cursor-pointer"
									onClick={() => setSelected('avatar9.png')}
								>
									<img
										className={
											selected === 'avatar9.png'
												? 'w-full border border-primary'
												: 'w-full'
										}
										src="/images/choose-your-avatar/avatar9.png"
										alt="avater icon"
									/>
								</div>
								<div
									className="m-3 cursor-pointer"
									onClick={() => setSelected('avatar10.png')}
								>
									<img
										className={
											selected === 'avatar10.png'
												? 'w-full border border-primary'
												: 'w-full'
										}
										src="/images/choose-your-avatar/avatar10.png"
										alt="avater icon"
									/>
								</div>
								<div
									className="m-3 cursor-pointer"
									onClick={() => setSelected('avatar11.png')}
								>
									<img
										className={
											selected === 'avatar11.png'
												? 'w-full border border-primary'
												: 'w-full'
										}
										src="/images/choose-your-avatar/avatar11.png"
										alt="avater icon"
									/>
								</div>
								<div
									className="m-3 cursor-pointer"
									onClick={() => setSelected('avatar12.png')}
								>
									<img
										className={
											selected === 'avatar12.png'
												? 'w-full border border-primary'
												: 'w-full'
										}
										src="/images/choose-your-avatar/avatar12.png"
										alt="avater icon"
									/>
								</div>
							</div>
						</div>

						{/* 
            <Upload
              inputMainClass="flex justify-between w-full"
              value="Upload Avatar"
              labelClass="text-gray-900 p-1 px-2"
              iconComponent={
                // <img className="w-full" src={attach} alt="attach" />
                <AiOutlinePaperClip className="text-primary cursor-pointer text-2xl ml-auto" />
              }
            /> */}
					</div>
				}
				actions={
					<>
						<div className="flex space-x-4 -mx-2 mt-4">
							<Button
								onClick={toggleOpen}
								value="Cancel"
								classes={{
									root: `bg-white border border-solid border-gray-500 py-3 px-7 leading-5 text-base 2xl:text-xl font-sans shadow-none capitalize rounded`,
								}}
								color="inherit"
							/>

							<Button
								onClick={() => {
									toggleOpen();
									setSelectedAvatar(true);
									setAvatarName(selected);
								}}
								value="Upload"
								classes={{
									root: `text-white bg-primary py-3 px-6 leading-5 text-base 2xl:text-xl font-sans shadow-none capitalize rounded`,
								}}
								color="primary"
							/>
						</div>
					</>
				}
				open={open}
				className={{ paper: 'rounded-xl md:px-4 p-4' }}
			/>
		</div>
	);
}
export default AvatarPopup;
