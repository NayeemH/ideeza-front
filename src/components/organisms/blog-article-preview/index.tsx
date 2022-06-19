import React from 'react';
import Label from '@atoms/label';
import { Avatar } from '@mui/material';
import Button from '@atoms/button';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import CircularProgress from '@mui/material/CircularProgress';

function BlogArticlePreview({ blog, loading, handlePublish, user, setShowPreview }: any) {
	return (
		<>
			<div className="">
				<div className="w-full flex justify-between items-center">
					<Label
						value="Preview"
						className="text-xl md:text-2xl xl:text-[26px] font-semibold"
					/>
					<Button
						value={
							<>
								<BsArrowLeftCircleFill className=" mr-2" />
								<Label
									value="Back"
									className="text-white"
								/>
							</>
						}
						className="text-xl text-white bg-primary px-[30px] py-[13px]"
						onClick={() => setShowPreview(false)}
					/>
				</div>
				<div className="bg-white min-h-screen p-6 my-4 xl:mt-[30px] rounded-lg xl:pt-[46px] xl:pl-[30px] xl:pr-[60px]">
					<div className="w-full flex justify-center">
						<div className="w-full xl:max-w-[800px] flex justify-center 2xl:pb-[40px] xl:pb-[30px] pb-5">
							<Label
								value={
									blog?.title?.length > 80
										? blog?.title?.slice(0, 80) + '...'
										: blog?.title
								}
								className="mt-4 md:text-3xl xl:text-5xl text-xl font-semibold text-center"
							/>
						</div>
					</div>
					<div className="flex items-center">
						{user?.profile_photo ? (
							<img
								src={
									user?.profile_photo || '/images/user_account_profile_avatar.svg'
								}
								className="h-[78px] w-[78px] rounded-lg mr-3 border"
								alt=""
							/>
						) : (
							<div className="mr-3">
								<Avatar
									className="h-[78px] w-[78px] rounded-lg"
									variant="square"
								>
									{user ? user?.first_name?.charAt(0).toUpperCase() : 'O'}
								</Avatar>
							</div>
						)}

						<div className="">
							<Label
								value={user?.first_name + ' ' + user?.last_name}
								className="text-md md:text-2xl text-[#333333] mb-[5px]"
							/>
							<Label
								value={new Date().toDateString()}
								className="text-[#787878] text-sm md:text-base"
							/>
						</div>
					</div>
					{blog?.description?.length > 400 && (
						<div
							className="mt-10 text-[#101010] text-sm md:text-base "
							dangerouslySetInnerHTML={{
								__html:
									blog?.description?.length > 400
										? blog?.description?.slice(0, 400)
										: blog?.description,
							}}
						></div>
					)}
					<div className="w-full flex justify-center mt-10">
						{blog?.img || blog?.image ? (
							<div className="w-full h-full 2xl:w-[852px] 2xl:h-[322px] 3xl:w-[982px] 3xl:h-[472px]">
								<img
									src={blog?.img || blog?.image}
									alt="news-image"
									className="w-full h-full"
								/>
							</div>
						) : (
							<Label
								value="No file attachments found"
								className="text-primary"
							/>
						)}
					</div>
					<div
						className="mt-10 text-[#101010] text-sm md:text-base"
						dangerouslySetInnerHTML={{
							__html:
								blog?.description?.length > 50
									? blog?.description?.slice(50)
									: blog?.description,
						}}
					></div>
					<div className="text-center mt-2 lg:mt-4 3xl:mt-6">
						{handlePublish ? (
							<button
								form="blog-form"
								type="submit"
								className=" shadow-none text-base 2xl:text-xl rounded-md w-20 h-8 3xl:w-28 3xl:h-16 text-white  font-proxima-nova font-semibold capitalize  bg-primary"
							>
								{loading ? (
									<CircularProgress
										color="inherit"
										size={20}
									/>
								) : (
									'Publish'
								)}
							</button>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default BlogArticlePreview;
