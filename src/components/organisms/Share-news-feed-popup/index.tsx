import React, { useState } from 'react';
// import Modal from "@atoms/modal";
import Button from '@atoms/button';
// import { TextField } from "@molecules";
// import TextField from "../../molecules/text-field";
import { IoHappySharp } from 'react-icons/io5';
// import { useForm } from "react-hook-form";
import TextField from '@molecules/text-field';
import Modal from '@atoms/modal';

const ShareNewsFeedPopup: React.FC<any> = (props) => {
	const { open, toggleOpen, social } = props;
	// const { register, errors, handleSubmit } = useForm();
	// const onSubmitHandler = (e) => shareToNewsFeed(e);

	const [content, setContent] = useState('');

	return (
		<div>
			<Modal
				width="sm"
				close={toggleOpen}
				header={<></>}
				content={
					<div className="flex w-full flex-col">
						{social ? (
							<div className="flex space-x-2">
								<img
									src="/images/facebook.png"
									alt="fb"
									className="w-5"
								/>
								<img
									src="/images/Icon awesome-linkedin-in.png"
									alt="ldn"
									className="w-5"
								/>
								<img
									src="/images/instagram.png"
									alt="insta"
									className="w-5"
								/>
								<img
									src="/images/twitter.png"
									alt="twtr"
									className="w-5"
								/>
								<img
									src="/images/brand.png"
									alt="tiktok"
									className="w-5"
								/>
							</div>
						) : null}
						<TextField
							mainClass="flex flex-col mt-3"
							labelvalue={social ? 'Share on Social Platform' : 'Share In News Feed'}
							// register={register({ required: "Please Enter Description!" })}
							labelClasses="font-bold text-lg -mt-2 mb-2 text-primary pb-2"
							multiline="true"
							rows="10"
							name="text"
							// error={errors}
							placeholder="Write the text here..."
							inputClasses="w-full p-0 text-sm tracking-tight font-sans border border-gray-850 border-opacity-40"
							value={content}
							onChange={(e: any) => setContent(e.target.value)}
						/>
						<>
							<div className="flex items-center w-full pr-1 justify-between mt-2">
								<IoHappySharp className="text-blue-150 text-4xl" />
								<Button
									value="Share"
									className="text-white bg-primary transform-none rounded-sm tracking-tight py-1 px-12"
									onClick={() => props.shareToNewsFeed(content)}
								/>
							</div>
						</>
					</div>
				}
				actions={<></>}
				open={open}
			/>
		</div>
	);
};

export default ShareNewsFeedPopup;
