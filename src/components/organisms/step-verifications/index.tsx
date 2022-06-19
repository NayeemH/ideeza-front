import AvatarAtom from '@atoms/avatar';
import Button from '@atoms/button';
import Label from '@atoms/label';
import AvatarPopup from '@molecules/avatar-popup';
import React, { useState } from 'react';
// import { Label, Avatar, Button } from "atoms";
// import { Upload, SelectField } from "molecules";
// import { AvatarPopup } from "..";

const StepVerification: React.FC<any> = (props) => {
	const [popup, SetPopup] = useState(false);

	// const [state, setState] = useState<any>("");
	// const onFileChange = (event: any) => {
	//   // Update the state
	//   setState({ selectedFile: event.target.files[0] });
	// };
	const [selectedAvatar, setSelectedAvatar] = useState(false);
	const [avatarName, setAvatarName] = useState('');
	const [selectedImageThumb, setSelectedImageThumb] = useState('');
	const toggleOpen = () => SetPopup(!popup);
	// console.log(avatarName);
	// console.log(selectedAvatar);
	// console.log("total image", selectedImageThumb);

	return (
		<div className="items-center grid grid-cols-7 rounded-lg bg-white  p-[30px] pr-[76px] ">
			<div className="md:col-span-2 col-span-12 mr-5 mb-4 md:mb-0 md:relative lg:bottom-8 right-2 xl:pl-[25px] xl:pt-[35px] 2xl:pt-[25px] ">
				{props?.photo?.name ? (
					<AvatarAtom
						variant="circular"
						// src={
						//   selectedAvatar
						//     ? "/images/choose-your-avatar/" + avatarName
						//     : props.photo.name
						// }
						src={
							!selectedAvatar
								? selectedImageThumb && selectedImageThumb !== ''
									? selectedImageThumb
									: props.photo.name
								: '/images/choose-your-avatar/' + avatarName
						}
						className={`${
							props.photo === '/images/placeholder.jpg'
								? ''
								: 'w-44 h-44 lg:w-32 lg:h-32 xl:w-36 xl:h-36 '
						}  md:-m-2.5 m-auto rounded-full`}
					/>
				) : (
					<img
						src={
							selectedAvatar
								? '/images/choose-your-avatar/' + avatarName
								: props.photo
						}
						alt=""
						className=" w-36 h-36 md:-m-2.5 m-auto rounded-[50%]"
					/>
				)}
			</div>
			<div className="flex-col col-span-12 md:col-span-5 overflow-x-auto">
				<Label
					value="First impressions count, we all know this. And we only get one chance to make a good first impression. Perhaps in person, your charm and use of language can camouflage your faults, but in the online world. your first impression is made with your face – your profile picture."
					className="text-[#787878] tracking-tight text-sm md:text-base "
				/>
				<div className="flex flex-row items-center gap-5 pt-[30px] ">
					<label className="custom-upload-btn-wrapper cursor-pointer block">
						<span className="custom-btn capitalize text-base  bg-white tracking-tight text-primary border-solid border shadow-none border-primary md:w-40  lg:w-auto xl:w-full px-8  pt-[13px] pb-[16px] block text-center">
							Upload a file
							<input
								type="file"
								name="myfile"
								onChange={(e: any) => {
									const file = e.target.files[0];
									// console.log("uploadedFile: ", e)

									const reader = new FileReader();
									reader?.readAsDataURL(file);

									reader.onloadend = function () {
										const path: any = [reader.result];
										setSelectedImageThumb(path);
									};

									props.onChangeProfilePhoto(file);
								}}
							/>
						</span>
					</label>

					<div className="flex items-center ">
						{/* <hr className="border-t md:w-2 w-2 border-gray-800" /> */}
						<Label
							value="OR"
							className="text-[#999999]  text-base  font-semibold tracking-tight"
						/>
						{/* <hr className="border-t md:w-2 w-2 border-gray-800" /> */}
					</div>
					<Button
						value="choose your avatar"
						onClick={toggleOpen}
						className="capitalize text-base custom-btn  bg-white  tracking-tight text-primary border-solid border shadow-none border-primary lg:w-auto px-[30] pt-[13px] pb-[16px]"
					/>
				</div>
				<AvatarPopup
					setSelectedAvatar={setSelectedAvatar}
					open={popup}
					toggleOpen={toggleOpen}
					setAvatarName={setAvatarName}
				/>
			</div>
		</div>
	);
};
export default StepVerification;
