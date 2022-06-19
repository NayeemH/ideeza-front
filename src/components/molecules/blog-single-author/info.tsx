import Button from '@atoms/button';
import Label from '@atoms/label';
import { IUser } from '@models/auth';
import { Dialog, DialogTitle } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { AUTHOR_AVATAR_PLACEHOLDER } from 'enums/blog';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa';
import {
	FacebookIcon,
	FacebookMessengerIcon,
	FacebookMessengerShareButton,
	FacebookShareButton,
	InstapaperIcon,
	InstapaperShareButton,
	LineIcon,
	LineShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	PinterestIcon,
	PinterestShareButton,
	TwitterIcon,
	TwitterShareButton,
	ViberIcon,
	ViberShareButton,
	WhatsappIcon,
	WhatsappShareButton,
} from 'react-share';
import { toast } from 'react-toastify';
import { openLoginPopup } from 'reducers/login';
import { ApiDataType, apiService } from 'utils/request';

interface BlogSingleAuthorInfoType {
	author?: IUser;
	postId?: number;
	likes?: number;
	views?: number;
	isFollowing: boolean;
}

const BlogSingleAuthorInfo: FC<BlogSingleAuthorInfoType> = (props) => {
	const { author, postId, likes, views, isFollowing } = props;

	const dispatch = useAppDispatch();
	const { status } = useSession();
	const router = useRouter();

	const current_url = process.env.NEXT_PUBLIC_APP_URL + router.asPath;
	const [isFollowed, setIsFollowed] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [externalShareModal, setExternalShareModal] = useState<boolean>(false);
	const [likesCount, setLikesCount] = useState<number>(likes || 0);

	const followBtnClasses = `bg-primary transform-none font-poppins text-[18px] rounded-[6px] font-normal leading-[18px] px-[30px] py-[10px] h-[50px] shadow-none hover:shadow-lg outline-none`;

	useEffect(() => {
		setIsFollowed(isFollowing);
	}, [isFollowing]);

	const handleSignUpPopUp = () => {
		dispatch(openLoginPopup({ ref: '' }));
	};

	const checkAuth = () => {
		router.query.redirect = 'false';
		router.push(router, undefined, { scroll: false });
		handleSignUpPopUp();
	};

	const onClickedFollowBtn = async () => {
		if (status === 'unauthenticated') {
			return checkAuth();
		}

		if (!isFollowed) {
			setIsLoading(true);
			const apiData: ApiDataType = {
				method: 'post',
				url: `account/friend/add-friend/`,
				data: { user_id: author?.id },
				token: true,
			};

			await apiService(apiData, (res: any, err: any) => {
				if (res) {
					setIsFollowed(true);
					return setIsLoading(false);
				}
				// console.log('err--------', err.response)
				toast.error(
					err?.response?.data?.detail || 'Error following author, please try agian.'
				);
				return setIsLoading(false);
			});
		} else {
			toast.success('You are currently following this author');
		}
	};

	const onClickLikePost = async () => {
		if (status === 'unauthenticated') {
			return checkAuth();
		}

		const apiData: ApiDataType = {
			method: 'post',
			url: `blog/${postId}/like/`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				setLikesCount(likesCount + 1);
				return setIsLiked(true);
			}
			return setIsLiked(false);
		});
	};

	return (
		<>
			<div className="flex sm:flex-row flex-col items-center justify-between w-[80%] lg:w-[50%] xl:w-[40%] 2xl:w-[25%] mt-[30px]">
				<div className="flex">
					<Image
						src={author?.profile_photo || AUTHOR_AVATAR_PLACEHOLDER}
						className="w-20 h-20 rounded-full"
						alt="image"
						height={60}
						width={60}
						// layout="responsive"
					/>
					{(author?.first_name || author?.last_name) && (
						<div className="pl-[18px]">
							<Label
								value={'Written by'}
								className="text-[16px] leading-[29px] text-[#787878] font-poppins whitespace-nowrap"
							/>
							<Label
								value={`${author?.first_name || ''} ${author?.last_name || ''}`}
								className="text-[18px] text-[#333333] font-poppins whitespace-nowrap font-normal leading-[32px] capitalize"
							/>
						</div>
					)}
				</div>

				<Button
					onClick={onClickedFollowBtn}
					type="button"
					disabled={isLoading}
					value={isLoading ? 'Pending...' : isFollowed ? 'Following' : 'Follow'}
					className={`${
						// isFollowed ? "text-primary pointer-events-none" : "text-purple-400"
						isFollowed ? 'text-white pointer-events-none' : 'text-white'
					} ${followBtnClasses}`}
				/>
			</div>

			{/* <hr className="w-full mt-12 mb-6 border-t border-primary" /> */}
			<div className=" px-[30px] sm:px-[100px] xl:px-[200px] 2xl:px-[300px] w-full">
				<div className="flex md:flex-row flex-col items-center gap-[10px] md:gap-0 justify-between border-t border-b py-[17px] mb-[65px] mt-[45px] w-full">
					<div className="">
						<div className="text-[16px] leading-[29px] text-[#333333]">Category</div>
						<div className="text-[16px] leading-[29px] text-[#787878]">Electronics</div>
					</div>
					<div className="">
						<div className="text-[16px] leading-[29px] text-[#333333]">Date</div>
						<div className="text-[16px] leading-[29px] text-[#787878]">20.02.22</div>
					</div>
					<div className="">
						<div className="text-[16px] leading-[29px] text-[#333333]">Read Time</div>
						<div className="text-[16px] leading-[29px] text-[#787878]">15 MINS</div>
					</div>
					<div className="flex items-center">
						<Button
							onClick={onClickLikePost}
							type="button"
							value={
								<AiFillLike
									className={`text-2xl ${
										isLiked ? 'text-primary' : 'text-purple-400'
									}`}
								/>
							}
							className="bg-white transform-none shadow-none outline-none"
						/>

						<span className="pl-2 pr-4 text-base 2xl:text-xl font-sans font-semibold">
							{likesCount || 'No Likes'}
						</span>

						<div className="bg-white transform-none shadow-none outline-none ml-3">
							<FaRegEye
								className={`text-2xl ${
									views && views > 0 ? 'text-primary' : 'text-purple-400'
								}`}
							/>
						</div>

						<span className="pl-5 pr-2   text-base 2xl:text-xl font-sans font-semibold">
							{(views && views) || 'No Views'}
						</span>

						<Button
							onClick={() => setExternalShareModal(true)}
							type="button"
							value={<FaShare className="text-2xl text-primary" />}
							className="bg-white transform-none shadow-none outline-none"
						/>
					</div>
				</div>
			</div>

			<Dialog
				onClose={() => setExternalShareModal(false)}
				open={externalShareModal}
			>
				<DialogTitle>Share External</DialogTitle>
				<div className="flex flex-wrap p-8">
					<div className="p-2">
						<FacebookShareButton
							url={current_url}
							quote={'title'}
						>
							<FacebookIcon
								size={40}
								round
							/>
						</FacebookShareButton>
					</div>

					<div className="p-2">
						<FacebookMessengerShareButton
							appId={''}
							url={current_url}
						>
							<FacebookMessengerIcon
								size={40}
								round
							/>
						</FacebookMessengerShareButton>
					</div>

					<div className="p-2">
						<TwitterShareButton url={current_url}>
							<TwitterIcon
								size={40}
								round
							/>
						</TwitterShareButton>
					</div>

					<div className="p-2">
						<LinkedinShareButton url={current_url}>
							<LinkedinIcon
								size={40}
								round
							/>
						</LinkedinShareButton>
					</div>

					<div className="p-2">
						<InstapaperShareButton url={current_url}>
							<InstapaperIcon
								size={40}
								round
							/>
						</InstapaperShareButton>
					</div>

					<div className="p-2">
						<PinterestShareButton
							url={current_url}
							media={''}
						>
							<PinterestIcon
								size={40}
								round
							/>
						</PinterestShareButton>
					</div>

					<div className="p-2">
						<LineShareButton url={current_url}>
							<LineIcon
								size={40}
								round
							/>
						</LineShareButton>
					</div>

					<div className="p-2">
						<ViberShareButton url={current_url}>
							<ViberIcon
								size={40}
								round
							/>
						</ViberShareButton>
					</div>

					<div className="p-2">
						<WhatsappShareButton url={current_url}>
							<WhatsappIcon
								size={40}
								round
							/>
						</WhatsappShareButton>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default BlogSingleAuthorInfo;
