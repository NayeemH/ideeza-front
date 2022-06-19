import React, { useEffect, useRef, useState } from 'react';
import AvatarAtom from '@atoms/avatar';
import Label from '@atoms/label';
import { ClickAwayListener, Popper } from '@mui/material';
import L_S_C from '@organisms/news-feed-likes';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Fade } from '@molecules/spring-fade';
import { format } from 'date-fns';
// import ThreeJs from "@organisms/threejs";
import {
	getTextExcerpt,
	// timeFromNowFns
} from 'utils/utils';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import NewsFeedSingleItemDropdown from '@organisms/news-feed-single-item-dropdown';
import { USER_AVATAR_PLACEHOLDER } from 'enums/blog';
import SingleNewsFeedComments from '@organisms/single-news-feed-comments';
import { ApiDataType, apiService } from 'utils/request';
import ThumbnailImageOrVideo from '@molecules/thumbnail-image-or-video';
import NewsFeedUserPopover from '@organisms/news-feed-user-popover';
import { IUser } from '@models/auth';
import Link from 'next/link';
import { useDetectSelfUser } from 'app/hooks';
import { toast } from 'react-toastify';
import NewsFeedShare from '@organisms/news-feed-share';
import ProjectIcons from '@organisms/projectIcons';

interface INewsFeedSingleItem {
	project?: any;
	type?: 'world' | 'following';
	user?: IUser;
	text?: string;
}

const NewsFeedSingleItemOld = (props: INewsFeedSingleItem) => {
	const { project, type, user, text } = props;

	const router = useRouter();
	const refPopperUserAvatar = useRef<any>(null);
	const refPopperUserName = useRef<any>(null);
	const refPopperMenu = useRef<any>(null);
	const isSelfUser = useDetectSelfUser(project?.user?.id);
	const projectUrl = `/user/dashboard/project/${project?.id}`;

	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const [openPopperUserAvatar, setOpenPopperUserAvatar] = useState(false);
	const [openPopperUserName, setOpenPopperUserName] = useState(false);
	const [openPopperMenu, setOpenPopperMenu] = useState(false);
	const [commentCount, setCommentCount] = useState(0);
	const [shareCount, setShareCount] = useState(0);
	const [likeCount, setLikeCount] = useState(0);
	const [showComments, setShowComments] = useState(true);

	const [isFriend, setIsFriend] = useState<boolean>(false);
	const [connectionId, setConnectionId] = useState(null);
	const [isLoadingConnect, setIsLoadingConnect] = useState<boolean>(false);
	const [sharePopUpOpen, setSharePopUpOpen] = useState(false);
	const [hideViewLikeCount, setHideViewLikeCount] = useState(false);
	const [likeSuccess, setLikeSuccess] = useState(false);
	const [shareSuccess, setShareSuccess] = useState(false);

	useEffect(() => {
		checkConnection();
	}, []);

	useEffect(() => {
		setCommentCount(project?.comments_count);
	}, [project?.comments_count]);

	useEffect(() => {
		setShareCount(project?.shared);
	}, [project?.shared]);

	useEffect(() => {
		setLikeCount(project?.likes);
	}, [project?.likes]);

	const checkConnection = async () => {
		if (!isSelfUser) {
			setIsLoadingConnect(true);
			await apiService(
				{
					method: 'get',
					url: `account/user/${user?.id}/connection/`,
					token: true,
				},
				(res: any) => {
					if (res) {
						const { data } = res;
						setConnectionId(data.friend_id);
						setIsFriend(data.is_friend);
						return setIsLoadingConnect(false);
					}
				}
			);
			setIsLoadingConnect(false);
		}
	};

	const goToProjectDetails = (id: any) => {
		router.push(`/user/dashboard/project/${id}`);
	};

	const handleClickOutsideAvatar = () => {
		setOpenPopperUserAvatar(false);
	};
	const handleClickOutsideUserName = () => {
		setOpenPopperUserName(false);
	};
	const handleClickOutsideMenu = () => {
		setOpenPopperMenu(false);
	};

	const handleClickUserAvatar = (event: React.MouseEvent<HTMLElement | any>) => {
		setOpenPopperUserAvatar(!openPopperUserAvatar);
		setAnchorEl(event.currentTarget);
	};
	const handleClickUserName = (event: React.MouseEvent<HTMLElement | any>) => {
		setOpenPopperUserName(!openPopperUserName);
		setAnchorEl(event.currentTarget);
	};
	const handleClickDropdownMenuIcon = (event: React.MouseEvent<HTMLElement | any>) => {
		setOpenPopperMenu(!openPopperMenu);
		setAnchorEl(event.currentTarget);
	};

	const updatedCommentCount = (count: number) => {
		setCommentCount(count);
	};
	const onShareSucceed = () => {
		setShareCount(shareCount + 1);
		return setShareSuccess(true);
	};

	const onClickUnFollowUser = async () => {
		if (isLoadingConnect || !isFriend) return;
		setIsLoadingConnect(true);
		await apiService(
			{
				method: 'delete',
				url: `/account/friend/${connectionId}/`,
				token: true,
			},
			(res: any, err: any) => {
				if (res) {
					//const {data} = res;
					setIsFriend(false);
					toast.success('Unfriend request has been succeed!');
					setIsLoadingConnect(false);
					checkConnection();
					return;
				}
				if (err?.response?.data?.detail) {
					setIsLoadingConnect(false);
					return toast.error(
						err?.response?.data?.detail || 'Failed to send unfriend request!'
					);
				}
			}
		);
	};

	const onClickFollowUser = async () => {
		if (isLoadingConnect || isFriend) return;
		setIsLoadingConnect(true);
		await apiService(
			{
				method: 'post',
				url: `/account/friend/add-friend/`,
				data: {
					user_id: user?.id,
				},
				token: true,
			},
			(res: any, err: any) => {
				if (res) {
					// const {data} = res;
					setIsFriend(false);
					toast.success(
						'Successfully sent friend request, currently you are following this user.'
					);
					setIsLoadingConnect(false);
					return;
				}
				if (err?.response?.data?.detail) {
					setIsLoadingConnect(false);
					return toast.error(
						err?.response?.data?.detail || 'Failed to send friend request!'
					);
				}
			}
		);
	};

	const onClickProjectLike = async () => {
		if (isSelfUser) return;
		const apiData: ApiDataType = {
			method: 'post',
			url: `project/${project?.id}/like/`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				setLikeCount(likeCount + 1);
				return setLikeSuccess(true);
			}
			// console.log('Error Posted Project Like---', err)
		});
	};

	// console.log(`1. #${project?.id}. likeCount(${project?.likes}): ${likeCount}, viewCount(${project?.views}), contributeScoreCount(${project?.contribute_score}) ------`)

	return (
		<>
			<div className="col-span-1 mb-[5px] md:mb-0">
				<ClickAwayListener onClickAway={handleClickOutsideAvatar}>
					<div>
						<div onClick={handleClickUserAvatar}>
							<AvatarAtom
								variant="circular"
								src={[user?.profile_photo || USER_AVATAR_PLACEHOLDER]}
								className="w-[45px] h-[45px] 2xl:w-16 xl:w-10 2xl:h-16 xl:h-10 md:ml-1 mr-1 md:mr-0 cursor-pointer relative border border-white"
							/>
						</div>
						{openPopperUserAvatar && (
							<Popper
								ref={refPopperUserAvatar}
								open={openPopperUserAvatar}
								anchorEl={anchorEl}
								placement="bottom-start"
								transition
							>
								{({ TransitionProps }) => (
									<Fade {...TransitionProps}>
										<Box sx={{ my: 1 }}>
											<NewsFeedUserPopover data={user} />
										</Box>
									</Fade>
								)}
							</Popper>
						)}
					</div>
				</ClickAwayListener>
			</div>

			<div className="col-span-8 xl:col-span-9">
				<div className="rounded-[10px] shadow-none bg-white">
					<div className="border-b flex justify-between items-center py-[10px] px-[30px]">
						<Label
							classes={{
								root: 'text-base text-gray-900 tracking-tighter font-proxima-nova pr-3',
							}}
							value={
								<>
									{(user?.first_name || user?.last_name) && (
										<ClickAwayListener onClickAway={handleClickOutsideUserName}>
											<span>
												<span
													className="text-gray-600 text-base font-proxima-nova font-medium leading-5 cursor-pointer"
													onClick={handleClickUserName}
												>
													{(user?.first_name || '') +
														' ' +
														(user?.last_name || '')}
												</span>
												{openPopperUserName && (
													<Popper
														ref={refPopperUserName}
														open={openPopperUserName}
														anchorEl={anchorEl}
														placement="bottom-start"
														transition
													>
														{({ TransitionProps }) => (
															<Fade {...TransitionProps}>
																<Box sx={{ my: 1 }}>
																	<NewsFeedUserPopover
																		data={user}
																	/>
																</Box>
															</Fade>
														)}
													</Popper>
												)}
											</span>
										</ClickAwayListener>
									)}
									<span className="text-gray-500 text-base font-proxima-nova leading-5 ml-1">
										{type === 'following' ? 'shared' : 'created'}
									</span>
									<span className="text-gray-600 text-base font-medium font-proxima-nova leading-5 mx-1">
										{project?.name ? (
											<Link href={projectUrl}>
												<a>{getTextExcerpt(project?.name, 40)}</a>
											</Link>
										) : (
											'a project'
										)}
									</span>
									{project?.created_at && (
										<>
											<span className="text-gray-500 text-base font-proxima-nova leading-5 mx-1">
												•
											</span>
											<span className="text-gray-500 text-base font-proxima-nova leading-5">
												{format(
													new Date(project?.created_at),
													'dd.MM.yyyy'
												) ?? ''}
												{/* {timeFromNowFns(new Date(project?.created_at))} */}
											</span>
										</>
									)}
								</>
							}
						/>

						<ClickAwayListener onClickAway={handleClickOutsideMenu}>
							<div>
								<BiDotsHorizontalRounded
									onClick={handleClickDropdownMenuIcon}
									className="text-4xl hover:border hover:rounded-full hover:bg-gray-300 cursor-pointer"
								/>
								{openPopperMenu && (
									<Popper
										ref={refPopperMenu}
										open={openPopperMenu}
										anchorEl={anchorEl}
										placement="bottom-end"
										transition
									>
										{({ TransitionProps }) => (
											<Fade {...TransitionProps}>
												<Box sx={{ mr: -0.5, my: 1 }}>
													<NewsFeedSingleItemDropdown
														news={project}
														projectUrl={projectUrl}
														isSelfUser={isSelfUser}
														onClickUnFollowUser={onClickUnFollowUser}
														onClickFollowUser={onClickFollowUser}
														isFriend={isFriend}
														isLoadingConnect={isLoadingConnect}
													/>
												</Box>
											</Fade>
										)}
									</Popper>
								)}
							</div>
						</ClickAwayListener>
					</div>
					<div className={` p-2 sm:p-6 space-y-4 ${showComments ? 'pb-2' : 'pb-4'}`}>
						{type === 'following' && text && (
							<Label
								classes={{
									root: 'text-base 2xl:text-xl font-proxima-nova text-[#666666] truncate leading-6 pb-6',
								}}
								value={text}
							/>
						)}
						<div
							className="relative rounded-xl w-full lg:h-[250px] xl:h-[384px] 2xl:h-[500px] h-[400px] cursor-pointer"
							onClick={() => goToProjectDetails(project?.id)}
							onMouseOver={() => setHideViewLikeCount(true)}
							onMouseOut={() => setHideViewLikeCount(false)}
						>
							{/* <ThreeJs
								{...{
								viewFile: project?.three_d_script,
								editorType: "projectsShowCase",
								toolbar: "none",
								hideSidePanel: true,
								hideInfo: true,
								containerClass: "rounded-xl w-full ",
								}}
							/> */}
							<ThumbnailImageOrVideo
								data={project}
								height="500px"
								xlHeight="384px"
								imgXlHeight="384px"
								lgVideoHeight="250px"
								lgImageHeight="250px"
								mdImageHeight="400px"
								mdVideoHeight="400px"
							/>
							{!hideViewLikeCount && (
								<ProjectIcons
									viewCount={project?.views || 0}
									contributeScoreCount={project?.contribute_score || 0}
									likeCount={likeCount || 0}
								/>
							)}
						</div>
						<L_S_C
							onLikeButtonClick={onClickProjectLike}
							onShareButtonClick={() => setSharePopUpOpen(true)}
							onCommentButtonClick={() => setShowComments(!showComments)}
							commentCount={commentCount}
							shareCount={shareCount}
							isSelfUser={isSelfUser}
							likeSuccess={likeSuccess}
							shareSuccess={shareSuccess}
						/>
					</div>
					<SingleNewsFeedComments
						projectId={project?.id}
						projectCreator={project?.user}
						showComments={showComments}
						updatedCommentCount={(count: number) => updatedCommentCount(count)}
						onSuccessCommentCreate={() => setShowComments(true)}
					/>
				</div>
			</div>
			<NewsFeedShare
				id={project?.id}
				onClose={() => setSharePopUpOpen(false)}
				open={sharePopUpOpen}
				onShareSucceed={onShareSucceed}
			/>
		</>
	);
};

export default NewsFeedSingleItemOld;
