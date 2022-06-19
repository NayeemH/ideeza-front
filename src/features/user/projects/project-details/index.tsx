import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import Button from '@atoms/button';
import EditableInput from '@molecules/editable-input';
import AvatarLabels from '@molecules/avatar-label';
import PricingPopup from '@organisms/pricing-popup';
import { useRouter } from 'next/router';
import { ProjectDetailsProps } from 'models/user-project';
import { RiPencilFill } from 'react-icons/ri';
import {
	// GrAddCircle,
	GrFacebook,
	// GrInstagram,
	GrLinkedin,
} from 'react-icons/gr';
import ProjectDescription from '@organisms/project-description';
import ProjectProducts from '@organisms/project-products';
import { useAppDispatch, useAppSelector, useDetectSelfUser } from '../../../../app/hooks';
import { getProjectDetailAsync } from '@features/user/projects/reducer';
import { useFetch } from '../../../../app/api';
import { toast } from 'react-toastify';
import { updateProjectLike } from '@features/user/projects/request';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Loader from '@atoms/loader';
import { checkSelfUser, connectToWallet } from '../../../../utils/utils';
import { apiService } from '../../../../utils/request';
import { DialogContent, DialogTitle, FormControlLabel, ButtonBase } from '@mui/material';
import {
	IoAddCircleSharp,
	IoClose,
	// IoClose, IoHappySharp
} from 'react-icons/io5';
import Dialog from '@mui/material/Dialog';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabsProjectGeneral from '@organisms/tabs-projects-general-info';
import SellerTab from '@organisms/tabs-projects-sellers';
import TabProjectMainNFT from '@organisms/tabs-projects-mainNFT';
import TabProjectVertualNFT from '@organisms/tabs-projects-vertualNFT';
import TabProjectPhysicalNFT from '@organisms/tabs-projects-PhysicalNFT';
import { useSession } from 'next-auth/react';
import VideosTab from '@organisms/tabs-projects-videos';
import VertualNFTPopup from '@organisms/VertualNFT-popup';
import { ImCheckmark, ImCross } from 'react-icons/im';
import ContributorsTab from '@organisms/tabs-projects-contributors';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CreateNewIdeezaProject from '@organisms/create-new-idezza-project';
import {
	InstapaperShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
	FacebookShareButton,
} from 'react-share';
import Label from '@atoms/label';
import Steppers from '@molecules/steppers';
// import { AiOutlineEye, AiOutlineUser } from 'react-icons/ai';
// import { FORMINPUT } from 'utils/styles';
import CheckboxAtom from '@atoms/checkbox';
import 'emoji-mart/css/emoji-mart.css';
// import { Picker } from 'emoji-mart';
import { IOSSwitch } from '@organisms/create-project-popup-sell';
import Modal from '@atoms/modal';
import NetworkProperties from '@molecules/network-properties';
import UiFormHelperText from '@atoms/ui-form-helper-text';
import ProjectContributorsDialog from './project-contributors-dialog';
import { deleteProjectFlow } from '@features/user/project/create/utils';
import UiEmptyPlaceholder from '@molecules/ui-empty-placeholder';
import { toggleIdezzaModal } from '@features/user/reducer';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const ProjectDetail: React.FC<ProjectDetailsProps> = (props) => {
	const router = useRouter();
	const { data: session } = useSession();
	const dispatch = useAppDispatch();
	const [popup, SetPopup] = useState(false);
	const [popupVertual, SetPopupVertual] = useState(false);
	const [title, setTitle] = useState('');
	const loaded = useAppSelector((state) => state.projects.loaded);
	const loading = useAppSelector((state) => state.projects.loading);
	const projectData = useAppSelector((state) => state.projects.project.detail);
	const authUserData = useAppSelector((state) => state.auth?.userData);
	const ideezaModel = useAppSelector(({ dashboard }) => dashboard?.project?.ideeza?.modal);
	const toggleIdeezaProject = () => dispatch(toggleIdezzaModal());
	const isSelfUser = useDetectSelfUser(projectData?.user?.id);
	const [projectNameEdit, setProjectNameEdit] = useState(false);
	const [projectDescriptionEdit, setProjectDescriptionEdit] = useState(false);
	const [sharePopupOpen, setSharePopUpOpen] = useState(false);
	const [shareProject, setShareProject] = useState<any>(null);
	const [shareContentText, setShareContentText] = useState('');
	// const [shareSocialMediaText] = useState('');
	// const [currentCursorPosition, setCurrentCursorPosition] = useState(0);
	// const [currentCursorPositionShareContent, setCurrentCursorPositionShareContent] = useState(0);
	// const [currentCursorPositionDescription, setCurrentCursorPositionDescription] = useState(0);
	const [popperOpen, setPopperOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [valueTab, setValueTab] = React.useState(0);
	const [proof, setProof] = useState<string>('');
	const [isProof, setIsProof] = useState(false);
	const [isPhysicalNFTBid, setIsPhysicalNFTBid] = useState(false);
	const [isGeneralInfoBid, setIsGeneralInfoBid] = useState(true);
	const [isMainNftBid, setIsMainNftBid] = useState(false);
	const [isVirtualNftBid, setIsVirtualNftBid] = useState(false);
	const [isItemRecord, setIsItemRecord] = useState(false);
	const [isPrivateUser, setIsPrivateUser] = useState(true);
	const [isMinimumBid, setIsMinimumBid] = useState(true);
	const [showInitialLoader, setShowInitialLoader] = useState(true);
	const [externalSharePopupOpen, setExternalSharePopupOpen] = useState(false);
	const [networkModal, setNetworkModal] = useState(false);
	const [networkStep, setNetworkStep] = useState(0);
	// const [shareStep, setShareStep] = useState(0);
	// const current_url = process.env.NEXT_PUBLIC_APP_URL + router?.asPath;
	//const [productArray, setProductArray] = useState<any>([]);
	// const [anotherProduct, setAnotherProduct] = useState<any>('');
	const [likesCount, setLikesCount] = useState<number | string>('');
	const [commentsCount, setCommentsCount] = useState<number | string>('');
	const [sharesCount, setSharesCount] = useState<number | string>('');
	const refPopper = useRef<any>(null);
	const [notFound, setNotFound] = useState(false);

	const [contributorsDialogOpen, setContributorsDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const [selectedProductsForNetwork, setSelectedProductsForNetwork] = useState<number[]>([]);

	const [isShared, setIsShared] = useState(false);
	const [generalInfo, setGeneralInfo] = useState<number>(0);

	const [projectName, setProjectName] = useState('');
	const [projectDescription, setProjectDescription] = useState('');
	const [userIsFriend, setUserIsFriend] = useState<boolean>(false);
	// const [toggle, setToggle] = useState(false);
	// const [connectionId, setConnectionId] = useState<number | null>(null);
	const [projectVideos, setProjectVideos] = useState<any>([]);
	const [projectImages, setProjectImages] = useState<any>([]);
	const [projectDefaultImage, setProjectDefaultImage] = useState<any>(null);
	const [projectDefaultVideo, setProjectDefaultVideo] = useState<any>(null);
	const [sharePopUpConfirmOpen, setSharePopUpConfirmOpen] = useState(false);
	const [isSharing, setIsSharing] = useState(false);
	const [checkedTerms, setCheckedTerms] = useState(false);
	const [proofClicked, setProofClicked] = useState(false);
	const [checkTermError, setCheckTermError] = useState<string>('');

	const handleChangeTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCheckedTerms(event.target.checked);
	};

	useEffect(() => {
		if (!isSelfUser && projectData && projectData?.user?.id) {
			checkConnection();
		}
	}, [isSelfUser, projectData]);

	useEffect(() => {
		getProjectData();
	}, [props.projectId]);

	useEffect(() => {
		if (projectVideos?.length > 0) {
			const defaultItem = projectVideos.find((item: any) => item.is_default === true);
			if (defaultItem && defaultItem !== -1) {
				return setProjectDefaultVideo(defaultItem?.video);
			}
		}
	}, [projectVideos]);

	useEffect(() => {
		if (projectImages?.length > 0) {
			const defaultItem = projectImages.find((item: any) => item.is_default === true);
			if (defaultItem && defaultItem !== -1) {
				return setProjectDefaultImage(defaultItem?.image);
			}
		}
	}, [projectImages]);

	useEffect(() => {
		if (projectData !== null) {
			sendProjectViewRequest(projectData);
			setProjectName(projectData?.name);
			setProjectDescription(projectData?.description);

			setIsShared(Number(projectData?.shared) > 0);
		}
	}, [projectData]);

	useEffect(() => {
		if (checkedTerms) setCheckTermError('');
	}, [checkedTerms]);

	// const ref = useRef(null);
	// const firstProduct =
	// 	projectData && projectData?.products?.length > 0 ? projectData?.products[0] : null;

	const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
		setValueTab(newValue);
	};

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
		setPopperOpen((previousOpen) => !previousOpen);
	};
	const handleClickOutsidePopper = () => {
		setPopperOpen(false);
	};
	// const canBeOpen = popperOpen && Boolean(anchorEl);
	// const id = canBeOpen ? 'transition-popper' : undefined;

	const handleChangeGeneralInfo = (event: any, newValue: any): void => {
		// console.log('handle Change team', event.target.value)
		setGeneralInfo(newValue);
	};

	// const projectDetails = location?.state?.projectDetails;
	//   const projectDetails = useAppSelector(
	//     ({ Project: any }) => Project?.userProject
	//   );

	const toggleOpen = () => SetPopup(!popup);
	const toggleOpenVertual = () => SetPopupVertual(!popupVertual);

	const getProjectData = () => {
		if (typeof props.projectId !== 'undefined') {
			dispatch(getProjectDetailAsync({ id: props.projectId })).then((data) => {
				if (!data?.payload) {
					setNotFound(true);
					return;
				}
				const resolved_project_data = data?.payload;
				setLikesCount(resolved_project_data?.likes);
				setCommentsCount(resolved_project_data?.comments_count);
				setSharesCount(resolved_project_data?.shared);
				setProjectImages(resolved_project_data?.project_images || []);
				setProjectVideos(resolved_project_data?.project_videos || []);

				if (showInitialLoader) {
					setShowInitialLoader(false);
				}
			});
		}
	};

	// const updateProjectStatus = async (visible: boolean) => {
	// 	try {
	// 		await useFetch.patch(`project/${props.projectId}/`, {
	// 			is_visible: visible,
	// 		});

	// 		await getProjectData();
	// 		toast.dismiss();
	// 		toast.success(`Project is ${visible ? 'public' : 'private'} now`);
	// 	} catch (error: any) {
	// 		toast.error(error.message);
	// 	}
	// };
	// console.log(projectData?.user);

	// const product =
	// 	typeof projectData !== 'undefined' &&
	// 		projectData !== null &&
	// 		projectData?.products.length > 0
	// 		? projectData.products[0]
	// 		: null;

	const onClickLikeButton = () => {
		try {
			updateProjectLike({
				id: projectData.id,
			}).then(() => {
				setLikesCount(Number(likesCount) + 1);
			});
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const onCommentSubmitted = () => {
		setCommentsCount(Number(commentsCount) + 1);
	};

	const onClickShareButton = () => {
		setShareProject(projectData?.id);
		setShareContentText('');
		setSharePopUpOpen(true);
	};

	const submitShare = async () => {
		if (shareProject) {
			const id = shareProject;
			setIsSharing(true);
			await apiService(
				{
					method: 'post',
					url: `/account/news-feed/`,
					data: {
						text: shareContentText,
						object_type: 'PROJECT',
						object_id: id,
					},
					token: true,
				},
				(res: any, error: any) => {
					if (res) {
						setIsShared(true);
						setSharesCount(Number(sharesCount) + 1);
						toast.success('Shared successfully!');
						setShareContentText('');
						setSharePopUpOpen(false);
						setSharePopUpConfirmOpen(false);
						return setIsSharing(false);
					}

					if (error.response && error.response.status === 400) {
						toast.error('You have already shared this feed!');
						setShareProject(null);
						setShareContentText('');
						setSharePopUpOpen(false);
						setIsSharing(false);
					}
				}
			);
		}
	};

	const removeProjectShare = async () => {
		if (!props?.projectId) return;
		await apiService(
			{
				method: 'post',
				url: `/account/news-feed/remove_share/`,
				data: {
					object_type: 'PROJECT',
					object_id: props?.projectId,
				},
				token: true,
			},
			(res: any, error: any) => {
				if (res) {
					setIsShared(false);
					setSharesCount(Number(sharesCount) - 1);
					toast.success('Share removed successfully!');
					setShareContentText('');
					setSharePopUpOpen(false);
					return;
				}

				if (error.response && error.response.status === 400) {
					toast.error('You have not shared this project ever!');
					setShareProject(null);
					setShareContentText('');
					setSharePopUpOpen(false);
				}
			}
		);
	};

	const MyTabScrollButton = forwardRef((props: any, ref: any) => {
		const { direction, ...other } = props;

		return (
			<ButtonBase
				component="div"
				ref={ref}
				style={{ opacity: other.disabled ? 0 : 1 }}
				{...other}
			>
				{direction === 'left' ? (
					// <BsArrowLeftShort className="text-xl bg-primary text-white rounded-[10px] h-8 w-8 mr-8" />
					<div className="bg-transparent">
						<img
							src="/images/icon/arrow-left-tab.svg"
							className="w-[30px] inline-block md:hidden h-[30px] mr-12 rounded-[4px] bg-primary px-2"
							alt="icon"
						/>
					</div>
				) : (
					<div className="bg-transparent">
						<img
							src="/images/icon/arrow-right-tab.svg"
							className="w-[30px] inline-block md:hidden h-[30px] ml-4 mr-6 rounded-[4px] bg-primary px-2"
							alt="icon"
						/>
					</div>
				)}
			</ButtonBase>
		);
	});

	const editProjectName = async (name: any) => {
		if (name.toString().length > 235) {
			toast.error('The project name you entered is too long!');
			return;
		}

		try {
			const user_id = projectData?.user?.id;

			if (checkSelfUser(authUserData?.id, user_id)) {
				await apiService(
					{
						method: 'patch',
						url: `/project/${projectData?.id}/`,
						data: { name },
						token: true,
					},
					(res: any) => {
						if (res) {
							setProjectNameEdit(false);
							setProjectName(name);
							toast.dismiss();
							toast.success('Saved successfully!');
							return;
						}
					}
				);
			} else {
				toast.error('You can not edit this project!');
			}
		} catch (error) {
			// console.log(error);
		}
	};

	const editProjectDescription = async (description: any) => {
		try {
			const user_id = projectData?.user?.id;

			if (checkSelfUser(authUserData?.id, user_id)) {
				await apiService(
					{
						method: 'patch',
						url: `/project/${projectData?.id}/`,
						data: { description },
						token: true,
					},
					(res: any) => {
						if (res) {
							setProjectDescriptionEdit(false);
							getProjectData();
							toast.dismiss();
							toast.success('Saved successfully!');
							return;
						}
					}
				);
			} else {
				toast.error('You can not edit this project!');
			}
		} catch (error) {
			// console.log(error);
		}
	};

	const sendProjectViewRequest = async (project: any) => {
		try {
			const user_id = project?.user?.id;

			if (!checkSelfUser(authUserData?.id, user_id)) {
				await useFetch.post(`/project/${project.id}/view/`);
			}
		} catch (error) {
			// console.log(error);
		}
	};

	const gotoProductDetails = (project: any) => {
		if (project.products.length > 0) {
			const product = project.products[0];
			// /user/dashboard/projects/project-details/product/341?project_id=91
			router.push(
				`/${session?.user?.role.toLowerCase()}/dashboard/project/${project.id}/product/${
					product.id
				}?project_id=${project.id}`
			);
		}
	};

	const checkConnection = async () => {
		if (!isSelfUser) {
			await apiService(
				{
					method: 'get',
					url: `account/user/${projectData?.user?.id}/connection/`,
					token: true,
				},
				(res: any) => {
					if (res) {
						const { data } = res;
						// setConnectionId(data.friend_id);
						setUserIsFriend(data.is_friend);
						return;
					}
				}
			);
		}
	};

	const sendFriendRequest = () => {
		apiService(
			{
				method: 'post',
				url: `/account/friend/add-friend/`,
				data: {
					user_id: projectData?.user?.id,
				},
				token: true,
			},
			(res: any, err: any) => {
				if (res) {
					// const {data} = res;
					setUserIsFriend(false);
					toast.success(
						'Successfully sent friend request, currently you are following this user.'
					);
					return;
				}
				if (err?.response?.data?.detail) {
					return toast.error(
						err?.response?.data?.detail || 'Failed to send friend request!'
					);
				}
			}
		);
	};

	const projectType = projectData?.is_visible ? 'Public project' : 'Private project';

	const onClickNetworkButton = () => {
		setNetworkModal((prev) => !prev);
	};
	// const onClickAppButton = () => {
	// 	router.push('/');
	// };

	// emoji added any where in the share social pop up
	// const handleCursor = (e: any) => {
	// 	const caretEnd = e.target.selectionEnd;
	// 	setShareSocialMediaText(e.target.value);
	// 	setCurrentCursorPosition(caretEnd);
	// };
	// const handleEmojiWithText = (emoji: any) => {
	// 	if (currentCursorPosition >= shareSocialMediaText.length - 1) {
	// 		setShareSocialMediaText(shareSocialMediaText + emoji.native);
	// 	} else {
	// 		setShareSocialMediaText(
	// 			shareSocialMediaText.slice(0, currentCursorPosition) +
	// 			emoji.native +
	// 			shareSocialMediaText.slice(currentCursorPosition)
	// 		);
	// 	}
	// };

	// const handleCursorShareInvention = (e: any) => {
	// 	const caretEnd = e.target.selectionEnd;
	// 	setShareContentText(e.target.value);
	// 	setCurrentCursorPositionShareContent(caretEnd);
	// };
	// const handleEmojiWithTextShareInvention = (emoji: any) => {
	// 	if (currentCursorPositionShareContent >= shareSocialMediaText.length - 1) {
	// 		setShareContentText(shareSocialMediaText + emoji.native);
	// 	} else {
	// 		setShareContentText(
	// 			shareSocialMediaText.slice(0, currentCursorPositionShareContent) +
	// 			emoji.native +
	// 			shareSocialMediaText.slice(currentCursorPositionShareContent)
	// 		);
	// 	}
	// };
	// const handleCursorDescription = (e: any) => {
	// 	const caretEnd = e.target.selectionEnd;
	// 	setProjectDescription(e.target.value);
	// 	setCurrentCursorPositionDescription(caretEnd);
	// };
	// const handleEmojiWithTextDescription = (emoji: any) => {
	// 	if (currentCursorPositionDescription >= projectDescription.length - 1) {
	// 		setProjectDescription(projectDescription + emoji.native);
	// 	} else {
	// 		setProjectDescription(
	// 			projectDescription.slice(0, currentCursorPositionDescription) +
	// 			emoji.native +
	// 			projectDescription.slice(currentCursorPositionDescription)
	// 		);
	// 	}
	// };
	// end of emoji added any where in the share social pop up

	const editComponent = projectNameEdit ? (
		<div className="p-2 ml-2 lg:mr-2 border rounded-full bg-[#F6F6F6]">
			<ImCheckmark className="cursor-pointer text-primary " />
		</div>
	) : (
		<div className="p-2 ml-2 lg:mr-2 border rounded-full bg-[#F6F6F6]">
			<RiPencilFill className="cursor-pointer text-primary " />
		</div>
	);

	if (notFound) {
		return (
			<UiEmptyPlaceholder
				title={`Project not found!`}
				onClickBackButton={() => router.push('/user/dashboard/projects')}
				showBackButton
			/>
		);
	}
	// console.log(ideezaModel);

	return (
		<>
			{loaded && projectData !== null && (
				<>
					{/* Tabs */}
					<Box sx={{ width: '100%' }}>
						<Box
							display="flex"
							justifyContent="center"
							width="100%"
							className="custom-project-details"
						>
							<Tabs
								value={valueTab}
								onChange={handleChangeTab}
								aria-label="basic tabs example"
								variant="scrollable"
								scrollButtons
								ScrollButtonComponent={MyTabScrollButton}
								className="custom-tabs-projects mt-[6px] "
								sx={{
									[`& .${tabsClasses.scrollButtons}`]: {
										'&.Mui-disabled': { opacity: 1 },
									},
								}}
							>
								<Tab
									label={
										<>
											<span className="flex items-center">
												<img
													src="/images/icon/p-general.svg"
													alt="icon"
												/>
												<span className="ml-2 capitalize text-[18px]">
													General Info
												</span>
											</span>
										</>
									}
									className="py-[12px] px-[30px] min-h-0"
									// onClick={handleProofAuthorityOthers}
									onClick={() => {
										setIsPhysicalNFTBid(false);
										setIsProof(false);
										setIsGeneralInfoBid(true);
										setIsMainNftBid(false);
										setIsVirtualNftBid(false);
										setIsItemRecord(false);
									}}
									{...a11yProps(0)}
								/>
								<Tab
									label={
										<>
											<span className="flex items-center main-nft">
												<img
													src="/images/icon/main-nft.svg"
													alt="icon"
												/>
												<span className="ml-2 capitalize text-[18px]">
													Main NFT
												</span>
											</span>
										</>
									}
									className="py-[12px] px-[30px] min-h-0"
									onClick={() => {
										setIsPhysicalNFTBid(false);
										setIsGeneralInfoBid(false);
										setIsProof(true);
										setIsMainNftBid(true);
										setIsVirtualNftBid(false);
										setIsItemRecord(false);
									}}
									{...a11yProps(1)}
								/>
								<Tab
									label={
										<>
											<span className="flex items-center">
												<img
													src="/images/icon/physical-nft.svg"
													alt="icon"
												/>
												<span className="ml-2 capitalize text-[18px]">
													Physical NFT
												</span>
											</span>
										</>
									}
									className="py-[12px] px-[30px] min-h-0"
									onClick={() => {
										setIsPhysicalNFTBid(true);
										setIsProof(true);
										setIsGeneralInfoBid(false);
										setIsMainNftBid(false);
										setIsVirtualNftBid(false);
										setIsItemRecord(true);
									}}
									{...a11yProps(2)}
								/>
								<Tab
									label={
										<>
											<span className="flex items-center">
												<img
													src="/images/icon/vertual-nft.svg"
													alt="icon"
												/>
												<span className="ml-2 capitalize text-[18px]">
													Virtual NFT
												</span>
											</span>
										</>
									}
									className="py-[12px] px-[30px] min-h-0"
									onClick={() => {
										setIsPhysicalNFTBid(false);
										setIsProof(true);
										setIsGeneralInfoBid(false);
										setIsMainNftBid(false);
										setIsVirtualNftBid(true);
										setIsItemRecord(false);
									}}
									{...a11yProps(3)}
								/>
							</Tabs>
						</Box>

						{/* <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel> */}
					</Box>
				</>
			)}

			<div className="2xl:p-[30px] p-4 bg-white rounded-lg">
				{loading && !loaded && showInitialLoader && <Loader />}
				{loaded && projectData !== null && (
					<React.Fragment>
						<div className="w-full flex flex-wrap gap-y-4 gap-x-2 justify-between">
							<Button
								value="Go back"
								onClick={() => router.push('/user/dashboard/projects')}
								classes={{
									root: 'bg-primary text-base 2xl:text-lg font-proxima-nova text-white transform-none  tracking-tight px-[14px] py-[7] 2xl:px-[30px] 2xl:py-[13px] rounded',
								}}
								iconStart={<FaArrowCircleLeft className="text-xl" />}
								color="primary"
							/>
							{projectData?.is_visible !== false && (
								<div className="flex items-center">
									<FormControlLabel
										control={
											<IOSSwitch
												checked={isShared}
												onClick={
													isShared
														? removeProjectShare
														: onClickShareButton
												}
											/>
										}
										label=""
									/>
									<Label
										value="Shared in newsfeed"
										className="text-lg font-proxima-nova ml-[10px]"
									/>
								</div>
							)}

							<div className="flex items-start">
								{!props?.isPartDetails && isSelfUser && (
									<Button
										onClick={() =>
											// router.push(
											// 	`/user/dashboard/project/create/?project_id=${projectData?.id}&is_visible=${projectData?.is_visible}`
											// )
											// setOpenNewCreateProjectPopup(true)
											toggleIdeezaProject()
										}
										value={
											<>
												<span className="text-lg mr-3">
													Add new product
												</span>
												<IoAddCircleSharp className="text-white text-xl" />
											</>
										}
										className="text-white bg-primary py-[13px] pl-[19px] pr-[17px] text-lg font-proxima-nova"
									/>
								)}
								<CreateNewIdeezaProject
									open={ideezaModel}
									close={() => toggleIdeezaProject()}
									buttonCustomUrl={`/user/dashboard/project/create/?project_id=${projectData?.id}&is_visible=${projectData?.is_visible}`}
									buttonCustomText={
										'Click here to design new product by yourself!'
									}
								/>
								<Modal
									width="lg"
									open={networkModal}
									close={() => {
										onClickNetworkButton();
										setNetworkStep(0);
									}}
									header={
										<div className="pb-4 relative">
											<Steppers
												currentStep={networkStep}
												className="w-full 2xl:w-2/3  mx-auto"
												options={['Choose Products', 'Configure']}
												icons={{
													1: (
														<span className="p-1 w-12 flex items-center justify-center h-12 rounded-full border-primary">
															1
														</span>
													),
													2: (
														<span className="p-1 w-12 flex items-center justify-center h-12 rounded-full border-primary">
															2
														</span>
													),
												}}
											/>
											<span>
												<ImCross
													onClick={() => {
														onClickNetworkButton();
														setNetworkStep(0);
													}}
													className="text-primary absolute right-5 top-3 cursor-pointer"
												/>
											</span>
										</div>
									}
									content={
										<div className="mt-[30px] md:mt-[40px] 2xl:mt-[44px]">
											{networkStep === 0 && (
												<>
													<div className="w-full flex justify-center">
														<Label
															value="Choose Products To Connect"
															className="text-lg text-primary md:text-xl lg:text-[22px]"
														/>
													</div>
													<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8 pt-4 2xl:pt-12">
														{projectData?.products.length > 0 &&
															projectData?.products.map(
																(item: any, i: any) => {
																	const productIndex =
																		selectedProductsForNetwork.findIndex(
																			(pId) =>
																				pId === item?.id
																		);
																	const isSelected =
																		productIndex > -1;
																	return (
																		<div
																			key={i}
																			className="cursor-pointer"
																			onClick={() => {
																				const productIds: any[] =
																					[
																						...selectedProductsForNetwork,
																					];

																				if (isSelected) {
																					productIds.splice(
																						productIndex,
																						1
																					);
																				} else {
																					productIds.push(
																						item?.id
																					);
																				}

																				// console.log("productIds", productIds);

																				setSelectedProductsForNetwork(
																					() => [
																						...productIds,
																					]
																				);
																			}}
																		>
																			<Label
																				value={item?.name}
																				className="text-lg pb-[18px]"
																			/>
																			<img
																				src={
																					item &&
																					item?.product_images &&
																					item
																						?.product_images
																						.length > 0
																						? item
																								?.product_images[0]
																								?.image
																						: ''
																				}
																				alt=""
																				className="border-primary"
																				style={{
																					borderRadius: 5,
																					borderWidth:
																						isSelected
																							? 4
																							: 0,
																				}}
																			/>
																		</div>
																	);
																}
															)}
														{/* <div className="cursor-pointer">
                            <Label value="Headphone" className="text-lg pb-[18px]" />
                            <img src="/images/headphone.svg" alt="" /></div>
                          <div className="cursor-pointer">
                            <Label value="Watch" className="text-lg pb-[18px]" />
                            <img src="/images/watch.svg" alt="" /></div>
                          <div className="cursor-pointer">
                            <Label value="Headphone" className="text-lg pb-[18px]" />
                            <img src="/images/headphone.svg" alt="" /></div> */}
													</div>
													<div className="mt-[90px] w-full flex flex-col md:flex-row justify-center font-proxima-nova">
														<Button
															value="Cancel"
															onClick={onClickNetworkButton}
															className="px-[124px] pt-[11px] pb-[15px] bg-primary text-white text-lg mr-[21px]"
														/>
														<Button
															value="Next"
															onClick={() => setNetworkStep(1)}
															className="px-[124px] pt-[11px] pb-[15px] bg-primary text-white text-lg"
														/>
													</div>
												</>
											)}
											{networkStep === 1 && (
												<div className="mt-[15px] lg:mt-[30px] 2xl:mt-[50px] font-proxima-nova">
													<div className=" w-full 2xl:w-11/12 grid lg:grid-cols-2 gap-4 lg:gap-x-8 2xl:gap-x-24"></div>
													<NetworkProperties
														close={() => setNetworkModal(false)}
														setNetworkStep={setNetworkStep}
														projectId={projectData?.id}
													/>
												</div>
											)}
										</div>
									}
								/>
								<ClickAwayListener onClickAway={handleClickOutsidePopper}>
									<div>
										<div className="">
											<BsThreeDotsVertical
												className=" text-[#B9B9B9] text-[25px] cursor-pointer flex ml-auto mt-4"
												onClick={handleClick}
											/>
										</div>

										{popperOpen && (
											<Popper
												// id={id}
												open={popperOpen}
												ref={refPopper}
												anchorEl={anchorEl}
												transition
											>
												{({ TransitionProps }) => (
													<Fade
														{...TransitionProps}
														timeout={350}
													>
														<div className="bg-zinc-50 rounded-md">
															<div
																className="py-2 w-auto shadow-lg px-4"
																style={{ cursor: 'pointer' }}
															>
																{/* {isSelfUser &&
																	projectData?.is_visible !==
																		false && (
																		<div
																			className="text-[18px] hover:text-primary py-1"
																			onClick={
																				onClickShareButton
																			}
																		>
																			Share invention
																		</div>
																	)} */}
																{isSelfUser &&
																	projectData?.products.length >
																		1 && (
																		<div
																			className="text-[18px] hover:text-primary py-1"
																			onClick={
																				onClickNetworkButton
																			}
																		>
																			Network
																		</div>
																	)}
																<div
																	className="text-[18px] hover:text-primary py-1"
																	onClick={() =>
																		router.push(
																			'/user/dashboard/project/app'
																		)
																	}
																>
																	App
																</div>
																{isSelfUser &&
																	projectData?.is_visible !==
																		false && (
																		<div
																			className="text-[18px] hover:text-primary py-1"
																			onClick={() =>
																				setExternalSharePopupOpen(
																					true
																				)
																			}
																		>
																			Share social
																		</div>
																	)}

																{userIsFriend ? (
																	<div
																		className="text-[18px] hover:text-primary py-1"
																		onClick={sendFriendRequest}
																	>
																		Unfriend
																	</div>
																) : !isSelfUser ? (
																	<div
																		className="text-[18px] hover:text-primary py-1"
																		onClick={sendFriendRequest}
																	>
																		Connect
																	</div>
																) : null}

																{/* {isSelfUser && (
																	<div
																		className="text-[18px] hover:text-primary py-1"
																		onClick={() =>
																			router.push(
																				`/user/dashboard/product/${firstProduct
																					? firstProduct.id
																					: ''
																				}/edit`
																			)
																		}
																	>
																		Edit
																	</div>
																)} */}

																{isSelfUser &&
																	projectData?.is_visible ===
																		false && (
																		<div
																			className="text-[18px] hover:text-primary py-1"
																			onClick={() =>
																				setDeleteDialogOpen(
																					true
																				)
																			}
																		>
																			Delete
																		</div>
																	)}

																{isSelfUser && (
																	<div
																		className="text-[18px] hover:text-primary py-1"
																		onClick={() =>
																			setContributorsDialogOpen(
																				true
																			)
																		}
																	>
																		Add Conntribiutor
																	</div>
																)}
															</div>
														</div>
													</Fade>
												)}
											</Popper>
										)}
									</div>
								</ClickAwayListener>
							</div>

							{/* {isSelfUser && (
                <Button
                  onClick={() => {
                    if (projectData !== null) {
                      updateProjectStatus(!projectData?.is_visible);
                    }
                  }}
                  value={`Turn it to ${
                    projectData !== null && projectData?.is_visible
                      ? "private"
                      : "public"
                  }`}
                  variant="outlined"
                  classes={{
                    root: "text-md text-gray-600 font-normal py-2 tracking-tight transform-none",
                    outlined: "border-gray-600",
                  }}
                />
              )} */}
						</div>

						<div className="grid grid-cols-12 pt-4 xl:gap-6 xl:pt-[51px] ">
							<div className="col-span-12 lg:col-span-6 ">
								{title}
								<div className=" flex flex-wrap xl:flex-nowrap justify-between lg:justify-start ">
									{isSelfUser ? (
										<EditableInput
											mainClass="w-full sm:w-1/2 lg:w-full 2xl:w-4/5 2.5xl:w-2/3 3xl:w-1/2 flex items-center flex-row-reverse gap-x-2"
											// editContanerClass="bg-gray-100 flex items-center justify-center text-2xl rounded-full w-8 h-8"
											editContanerClass="bg-transparent flex items-center justify-center text-2xl rounded-full w-8 lg:mr-5 xl:mr-0 h-8 text-primary ml-[7px]"
											edit={projectNameEdit}
											editComponent={isSelfUser ? editComponent : undefined}
											lableClass={{
												root: 'text-primary font-proxima-nova text-[20px] xl:text-[25px] truncate 2xl:text-[32px] font-bold mr-1',
											}}
											inputClasses={{ root: 'mr-2 border-primary' }}
											handleChange={() =>
												setProjectNameEdit(!projectNameEdit)
											}
											setTitle={setTitle}
											labelValue={projectName}
											onSubmit={(value) => editProjectName(value)}
										/>
									) : (
										<div
											className={
												'text-primary font-proxima-nova text-[20px] xl:text-[25px] 2xl:text-[32px] font-bold mr-1'
											}
										>
											{projectData && projectData?.name?.length <= 8
												? projectData?.name
												: projectData?.name?.slice(0, 8) + '...'}
										</div>
									)}

									{isItemRecord && (
										<div className="pt-[10px] flex justify-end lg:relative left-[30%]">
											<div className="border border-solid border-[#BBBBBB] py-2 px-4 text-center rounded-tl-[10px] rounded-bl-[10px]">
												<div>
													<p className="text-[20px] font-semibold">360</p>
													<p className="text-[16px] text-gray-500">
														items
													</p>
												</div>
											</div>
											<div className="border border-solid border-[#BBBBBB] py-2 px-4 text-center">
												<div>
													<p className="text-[20px] font-semibold">168</p>
													<p className="text-[16px] text-gray-500">
														owners
													</p>
												</div>
											</div>
											<div className="border border-solid border-[#BBBBBB] py-2 px-4 text-center">
												<div>
													<div className="flex items-center justify-center">
														<img
															src="/images/icon/diamond-black.svg"
															alt="icon"
														/>
														<p className="text-[20px] font-semibold ml-2">
															5
														</p>
													</div>

													<p className="text-[16px] text-gray-500">
														floor price
													</p>
												</div>
											</div>
											<div className="border border-solid border-[#BBBBBB] py-2 px-4 rounded-tr-[10px] rounded-br-[10px] text-center">
												<div>
													<div className="flex items-center justify-center">
														<img
															src="/images/icon/diamond-black.svg"
															alt="icon"
														/>
														<p className="text-[20px] font-semibold ml-2">
															1.6K
														</p>
													</div>

													<p className="text-[16px] text-gray-500">
														volume traded
													</p>
												</div>
											</div>
										</div>
									)}
								</div>
								<div className="flex items-start justify-between">
									<AvatarLabels
										mainClassesLabel="pl-3 w-full"
										avaterClasses="h-10 w-10 shadow-md"
										titleClasses="text-[23px] text-gray-700 font-proxima-nova  leading-[28px] font-semibold"
										subtitleClasses="text-sm text-[#818181]  tracking-tight font-proxima-nova"
										src={projectData?.user?.profile_photo}
										title={
											projectData && projectData?.user
												? '@' +
												  projectData?.user?.first_name +
												  '_' +
												  projectData?.user?.last_name +
												  ' / ' +
												  projectType
												: ''
										}
										// subtitle={
										//   projectData && projectData?.user
										//     ? projectData?.user?.about_me
										//     : ""
										// }
									/>
								</div>

								{isProof && (
									// <div className="">this is vey proof</div>
									<div className="relative w-[240px] sm:w-[300px] mb-[38px] mr-4 cursor-pointer 3xl:mr-0">
										{!proofClicked ? (
											<AiOutlineDown className="absolute font-extrabold right-4 text-[#999999] top-[40px]" />
										) : (
											<AiOutlineUp className="absolute font-extrabold right-4 text-[#999999] top-[40px]" />
										)}
										<select
											value={proof}
											className="bg-gray-200 w-full appearance-none rounded-[8px] mt-[20px]  text-lg 2xl:text-xl text-[#333333] h-full lg:h-[50px] py-[13px] px-2 sm:px-[28px]"
											onChange={(e: any) => {
												setProof(e.target.value);
											}}
											onClick={() => setProofClicked((prev) => !prev)}
											placeholder={'Select proof'}
										>
											{[
												{
													name: 'View proof of authenticity',
													value: 'View proof of authenticity',
												},
												{
													name: 'proof of athenticity second',
													value: 'proof of athenticity second',
												},
												{
													name: 'Others',
													value: 'Others',
												},
											].map((val) => (
												<option key={val.name}>{val.name}</option>
											))}
										</select>
									</div>

									// <SelectBasic
									// 	value={proof}
									// 	options={[
									// 		{
									// 			name: 'View proof of authenticity',
									// 			value: 'View proof of authenticity',
									// 		},
									// 		{
									// 			name: 'proof of athenticity second',
									// 			value: 'proof of athenticity second',
									// 		},
									// 		{
									// 			name: 'Others',
									// 			value: 'Others',
									// 		},
									// 	]}
									// 	handleChange={(e: any) => setProof(e.target.value)}
									// 	placeholder={'Select proof'}
									// 	selectClasses="bg-gray-200 rounded-[8px] mt-[20px] w-[50%] text-lg 2xl:text-xl text-[#333333] h-[35px] lg:h-[50px] py-0"
									// />
								)}
							</div>

							<div className="col-span-12 lg:col-span-6 mt-[20px]">
								{isGeneralInfoBid && (
									<div className="border border-gray-300 rounded-[10px] p-[30px] bg-[#FBFBFB]">
										<div className="flex justify-between font-proxima-nova">
											{isSelfUser && !projectData?.is_visible ? (
												<div className="w-full font-proxima-nova flex justify-between">
													<div>
														<p className="text-[#787878] text-base md:text-lg">
															Minimun bid
														</p>
														<h5 className=" text-base lg:text-[20px] font-semibold">
															{' '}
															<span>449.50</span>{' '}
															<span className="text-[#787878] ">
																{' '}
																USD/ 0.01 ETH
															</span>
														</h5>
													</div>
													<div>
														<p className="text-[#787878]">Countdown</p>
														<h5 className=" text-base lg:text-[25px] font-semibold">
															06:20:59
														</h5>
													</div>
												</div>
											) : isSelfUser ? (
												<Button
													value="Add to Sell"
													className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
													onClick={() => {
														connectToWallet();
														setIsMinimumBid(true);
													}}
												/>
											) : null}
										</div>

										{isSelfUser ? (
											<div className="pt-[25px] font-proxima-nova">
												<p className="text-[#787878] text-base font-semibold">
													Create New
												</p>
												<div className="flex flex-col sm:flex-row justify-start gap-4">
													<Button
														value="Physical NFT"
														className="text-white 2xl:text-lg rounded-[8px] sm:mt-4 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-14 py-1 sm:py-2 lg:py-2.5"
														onClick={() => {
															connectToWallet();
														}}
													/>
													<Button
														value="Virtual NFT"
														className="text-white 2xl:text-lg rounded-[8px] sm:mt-4 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-14 py-1 sm:py-2 lg:py-2.5"
														onClick={() => {
															connectToWallet();
															toggleOpenVertual();
														}}
													/>
												</div>
											</div>
										) : (
											<div className="flex justify-start gap-4">
												<Button
													onClick={() => {
														connectToWallet();
														setIsPrivateUser(false);
													}}
													value="Buy Now"
													className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
												/>
												<Button
													onClick={() => connectToWallet()}
													value="Place Bid"
													className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
												/>
											</div>
										)}
									</div>
								)}

								{isMainNftBid && (
									<div className="border border-gray-300 rounded-[10px] p-[30px] bg-[#FBFBFB]">
										<div className="flex justify-between font-proxima-nova">
											{isSelfUser && projectData?.is_visible ? (
												<div className="w-full font-proxima-nova flex justify-between">
													<div>
														<p className="text-[#787878] text-base md:text-lg">
															Minimun bid
														</p>
														<h5 className=" text-base lg:text-[20px] font-semibold">
															{' '}
															<span>449.50</span>{' '}
															<span className="text-[#787878] ">
																{' '}
																USD/ 0.01 ETH
															</span>
														</h5>
													</div>
													<div>
														<p className="text-[#787878]">Countdown</p>
														<h5 className=" text-base lg:text-[25px] font-semibold">
															06:20:59
														</h5>
													</div>
												</div>
											) : isSelfUser ? (
												<Button
													// onClick={onClickApply}
													value="Add to Sell"
													className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
													onClick={() => {
														connectToWallet();
														setIsMinimumBid(true);
													}}
												/>
											) : null}
										</div>
										{isSelfUser && !projectData?.is_visible ? (
											<div className="pt-[25px] font-proxima-nova">
												<p className="text-[#787878] text-base font-semibold">
													Create New
												</p>
												<div className="flex flex-col sm:flex-row justify-start gap-4">
													<Button
														value="Physical NFT"
														className="text-white 2xl:text-lg rounded-[8px] sm:mt-4 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-14 py-1 sm:py-2 lg:py-2.5"
														onClick={() => connectToWallet()}
													/>
													<Button
														value="Virtual NFT"
														className="text-white 2xl:text-lg rounded-[8px] sm:mt-4 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-14 py-1 sm:py-2 lg:py-2.5"
														onClick={() => {
															connectToWallet();
															toggleOpenVertual();
														}}
													/>
												</div>
											</div>
										) : !isSelfUser ? (
											<div className="flex justify-start gap-4">
												<Button
													onClick={() => {
														connectToWallet();
														setIsPrivateUser(false);
													}}
													value="Buy Now"
													className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
												/>
												<Button
													onClick={() => connectToWallet()}
													value="Place Bid"
													className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
												/>
											</div>
										) : null}
									</div>
								)}

								{isVirtualNftBid && (
									<>
										{isSelfUser && !projectData?.is_visible && (
											<>
												<div className="border border-gray-300 rounded-[10px] p-[30px] bg-[#FBFBFB]">
													<div className="flex justify-between font-proxima-nova">
														<div className="w-full font-proxima-nova flex justify-between">
															<div>
																<p className="text-[#787878] text-base md:text-lg">
																	Minimum bid
																</p>
																<h5 className=" text-base lg:text-[20px] font-semibold">
																	{' '}
																	<span>449.50</span>{' '}
																	<span className="text-[#787878] ">
																		{' '}
																		USD/ 0.01 ETH
																	</span>
																</h5>
															</div>
															<div>
																<p className="text-[#787878]">
																	Countdown
																</p>
																<h5 className=" text-base lg:text-[25px] font-semibold">
																	06:20:59
																</h5>
															</div>
														</div>
													</div>
													<div className="p-8 text-center">
														Number of{' '}
														<span className={'text-primary'}>SOLD</span>{' '}
														items{' '}
														<span className={'text-primary'}>10</span>
														/30
													</div>
												</div>
											</>
										)}
									</>
								)}
							</div>

							{/* <Popover
                open={open}
                onClose={handleClose}
                id={id}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                className="popover-container"
              >

              </Popover> */}
						</div>
						<VertualNFTPopup
							open={popupVertual}
							toggleOpen={toggleOpenVertual}
						/>
						<PricingPopup
							open={popup}
							toggleOpen={toggleOpen}
						/>

						<div className="grid grid-cols-12 gap-6 custom-tab-head">
							<div className="xl:col-span-6 col-span-12">
								{isPhysicalNFTBid && (
									<div className="my-[20px] ">
										<div className="border border-gray-300 rounded-[10px] p-[30px] bg-[#FBFBFB]">
											<div className="flex justify-between">
												{isMinimumBid ? (
													<>
														<div>
															<p className="text-[#787878]">
																Minimun bid
															</p>
															<h5 className=" text-base lg:text-[20px] font-semibold">
																{' '}
																<span>449.50</span>{' '}
																<span className="text-[#787878] ">
																	{' '}
																	USD/ 0.01 ETH
																</span>
															</h5>
														</div>
														<div>
															<p className="text-[#787878]">
																Countdown
															</p>
															<h5 className=" text-base lg:text-[25px] font-semibold">
																06:20:59
															</h5>
														</div>
													</>
												) : (
													<Button
														value="Add to Sell"
														className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
														onClick={() => {
															connectToWallet();
															setIsMinimumBid(true);
														}}
													/>
												)}
											</div>
											{isPrivateUser ? (
												<div className="pt-[30px]">
													<p className="text-[#787878] text-base">
														Create New
													</p>
													<div className="flex justify-start gap-4">
														<Button
															onClick={() => connectToWallet()}
															value="Physical NFT"
															className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
															// color="inherit"
														/>
														<Button
															// onClick={onClickApply}
															value="Virtual NFT"
															className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
															onClick={() => {
																connectToWallet();
																toggleOpenVertual();
															}}
															// color="inherit"
														/>
													</div>
												</div>
											) : (
												<div className="flex justify-start gap-4">
													<Button
														onClick={() => {
															connectToWallet();
															setIsPrivateUser(false);
														}}
														value="Buy Now"
														className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
														// color="inherit"
													/>
													<Button
														onClick={() => {
															connectToWallet();
														}}
														value="Place Bid"
														className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
														// color="inherit"
													/>
												</div>
											)}
										</div>
									</div>
								)}
								<TabPanel
									value={valueTab}
									index={0}
								>
									<TabsProjectGeneral
										tabsClasses="border-b border-gray-300 font-proxima-nova custom-border-project-tabs xl:mt-[-60px]"
										tabClasses="bg-white focus:bg-white focus:text-primary font-semibold text-xl tracking-tight max-w-[0] mr-2 transform-none py-1 px-0"
										handleChange={handleChangeGeneralInfo}
										selected="text-[#ff09d0]"
										index={generalInfo}
										tabsData={[
											{
												name: <div className="">Description</div>,
												textColor: 'primary',
												/****TODO*****/
												component: (
													<ProjectDescription
														selfUser={isSelfUser}
														projectData={projectData}
														onClickLikeButton={onClickLikeButton}
														onClickShareIdeeza={onClickShareButton}
														onClickShareSocial={() =>
															setExternalSharePopupOpen(true)
														}
														onCommentSubmitted={onCommentSubmitted}
														description={projectDescription}
														counts={{
															likes: likesCount,
															comments: commentsCount,
															shares: sharesCount,
														}}
														edit={projectDescriptionEdit}
														onClickEdit={() =>
															setProjectDescriptionEdit(
																!projectDescriptionEdit
															)
														}
														onSubmit={(value: any) => {
															editProjectDescription(value);
														}}
														hideShareButton={
															isSelfUser &&
															projectData?.is_visible === false
														}
													/>
												),
											},
											{
												name: <div className="">Sellers</div>,
												textColor: 'primary',
												component: (
													<>
														<SellerTab />
													</>
												),
											},
											{
												name: <div className="">Contributors</div>,
												textColor: 'primary',
												component: (
													<>
														<ContributorsTab
															data={projectData?.project_contributors}
														/>
													</>
												),
											},
											{
												name: <div className="">Videos</div>,
												textColor: 'primary',
												component: (
													<>
														<VideosTab
															images={projectImages}
															videos={projectVideos}
															defaultImage={projectDefaultImage}
															defaultVideo={projectDefaultVideo}
															onClickSetDefaultMedia={() => false}
															onClickDeleteMedia={() => false}
														/>
													</>
												),
											},
										]}
									/>
								</TabPanel>
								<TabPanel
									value={valueTab}
									index={1}
								>
									<TabProjectMainNFT />
								</TabPanel>
								<TabPanel
									value={valueTab}
									index={2}
								>
									<TabProjectPhysicalNFT />
								</TabPanel>
								<TabPanel
									value={valueTab}
									index={3}
								>
									<TabProjectVertualNFT />
								</TabPanel>
							</div>
							<div className="xl:col-span-6 col-span-12 xl:mt-[15px]">
								<ProjectProducts
									gotoProductDetails={() => gotoProductDetails(projectData)}
									projectData={projectData}
									products={
										projectData && projectData?.products?.length > 0
											? projectData?.products
											: []
									}
									productThreeDView={true}
									initialVideoFor={'project'}
									hideNetwork={true}
									type="project"
								/>
							</div>

							{/* <ProjectProducts projectDetails={projectDetails} changeid={ClickHandler} /> */}
							{/* <ProjectProducts
                projectData={projectData}
                product={
                  projectData && projectData?.product?.length > 0
                    ? projectData?.product
                    : []
                }
              /> */}
						</div>

						<Dialog
							onClose={() => {
								setSharePopUpOpen(false);
							}}
							open={sharePopupOpen}
							maxWidth="md"
							classes={{
								paper: 'z-[110] rounded-[10px] px-[6px] 2xl:w-[675px] 2xl:pb-[15px]',
							}}
							// className="rounded-[10px] p-[45px] 2xl:w-[800px]"
						>
							<DialogTitle>
								<span className="hover:rotate-180">
									<IoClose
										className="text-primary absolute right-5 top-5  hover:cursor-pointer"
										onClick={() => {
											setSharePopUpOpen(false);
										}}
									/>
								</span>
							</DialogTitle>
							<DialogContent>
								<div className="font-proxima-nova">
									<div className="w-full flex justify-center border-b pb-4">
										<Label
											value="Project Preview"
											className="text-[20px] font-proxima-nova"
										/>
									</div>
									<div className="mt-4 border-b pb-4">
										<Label
											value={
												projectName && projectName.length > 30
													? projectName.slice(0, 30) + '...'
													: projectName
											}
											className="text-base text-[#101010]"
										/>
										<Label
											value={
												projectDescription?.length > 200
													? projectDescription.slice(0, 200) + '...'
													: projectDescription
											}
											className="my-2 text-sm text-[#707070]"
										/>
										<video
											// width="400"
											// height="280"
											controls
											className="rounded-md h-[280px] w-full"
										>
											<source
												src={projectData?.project_videos[0]?.video}
												type="video/mp4"
											/>
										</video>
									</div>
									<div className="w-full">
										<FormControlLabel
											className="items-start mt-[50px]"
											control={
												<CheckboxAtom
													checked={checkedTerms}
													onChange={handleChangeTerms}
													inputProps={{ 'aria-label': 'controlled' }}
												/>
											}
											label={
												<div className="text-[#999999] mt-2 text-[13px] font-proxima-nova">
													I confirm that I'm the rightful owner of this
													idea virtually or physically and any part of it.
													I know I have all responsibility in all legal
													and/or intellectual property issues that will
													occur because my product.
												</div>
											}
										/>
									</div>
									{checkTermError && (
										<UiFormHelperText message={checkTermError} />
									)}
									<div className="w-full flex justify-between mt-4 gap-[20px]">
										<Button
											value={'Back'}
											className="text-lg w-full bg-primary text-white px-12 h-12"
											onClick={() => setSharePopUpOpen(false)}
										/>
										<Button
											value={'Share'}
											className="text-lg w-full bg-primary text-white px-12 h-12"
											onClick={() => {
												if (!checkedTerms) {
													return setCheckTermError(
														'*Please check the terms.'
													);
												}
												setSharePopUpConfirmOpen(true);
												setSharePopUpOpen(false);
											}}
										/>
									</div>
								</div>
							</DialogContent>
						</Dialog>

						<Dialog
							onClose={() => {
								setSharePopUpConfirmOpen(false);
							}}
							open={sharePopUpConfirmOpen}
						>
							<DialogContent style={{ width: 450 }}>
								<div className="">
									<div className="mt-4">
										<Label
											value="I hereby warrant and confirm that all materials are original and I am the rightful owner of this product."
											className="text-lg"
										/>
										<Label
											value="I hereby warrant and confirm that in any case of copywrites, confidential or IP issues, I have all responsibility for my work."
											className="text-lg"
										/>
									</div>
									<div className="w-full flex justify-start mt-6">
										{
											// isSelfUser &&
											// <Button
											// 	value={'Edit'}
											// 	className="text-lg bg-primary text-white px-12 mr-4"
											// 	onClick={() => router.push(
											// 		`/user/dashboard/projects/project-details/workspace/${projectData?.id}?view_tab=electronic`
											// 	)}
											// />
										}
										<Button
											value={isSharing ? 'Sharing...' : 'Agree'}
											loading={isSharing}
											className="text-lg bg-primary text-white px-12 h-12"
											onClick={submitShare}
										/>
									</div>
								</div>
							</DialogContent>
						</Dialog>
						{
							// TODO:: Remove this modal after discussion with lead dev
							// <Dialog
							// 	onClose={() => setSharePopUpOpen(false)}
							// 	open={sharePopupOpen}
							// 	PaperProps={{
							// 		style: {
							// 			borderRadius: 20,
							// 			padding: '20px',
							// 			maxWidth: '1111px',
							// 			width: '1111px',
							// 		},
							// 	}}
							// >
							// 	<div className="">
							// 		<DialogTitle
							// 			sx={{
							// 				padding: '0',
							// 			}}
							// 		>
							// 			<div className="font-bold font-proxima-nova text-primary text-[25px] leading-[43px] mb-[20px]">
							// 				Share in news feed
							// 			</div>
							// 		</DialogTitle>
							// 	</div>
							// 	<div>
							// 		<textarea
							// 			rows={8}
							// 			style={{ width: '100%' }}
							// 			className="focus:outline-none pt-[25px] pl-[20px] md:placeholder-[#818181] text-[#333333] tracking-widest placeholder-opacity-100 font-proxima-nova text-[16px] leading-[42px] border rounded-[10px] font-semibold"
							// 			placeholder="Write the text here..."
							// 			value={shareContentText}
							// 			onChange={(e: any) => handleCursorShareInvention(e)}
							// 			onClick={(e?: any) => {
							// 				const caretEnd = e.target.selectionEnd;
							// 				setCurrentCursorPositionShareContent(caretEnd);
							// 			}}
							// 		// onChange={(e: any) => setShareContentText(e.target.value)}
							// 		/>
							// 		<div className="flex items-center w-full pr-1 justify-between mt-[20px] relative">
							// 			{toggle && (
							// 				<div
							// 					className="absolute bottom-[80px] "
							// 					ref={ref}
							// 				>
							// 					<Picker
							// 						set="apple"
							// 						onSelect={(emoji: any) =>
							// 							handleEmojiWithTextShareInvention(emoji)
							// 						}
							// 						style={{
							// 							width: '600px',
							// 							paddingTop: '25px',
							// 							paddingLeft: '10px',
							// 							paddingRight: '10px',
							// 							zIndex: 5000,
							// 						}}
							// 					/>
							// 					<IoClose
							// 						className="text-[30px] text-red-500 absolute top-2 right-2"
							// 						onClick={() => setToggle(!toggle)}
							// 					/>
							// 				</div>
							// 			)}
							// 			<IoHappySharp
							// 				onClick={() => setToggle(!toggle)}
							// 				className="text-[#1B2E50] text-[41px]"
							// 			/>
							// 			<Button
							// 				type="submit"
							// 				value="Share"
							// 				className="text-white bg-primary transform-none rounded-[6px] text-[20px] font-proxima-nova tracking-tight py-[15px] px-[81px]"
							// 				onClick={submitShare}
							// 			/>
							// 		</div>
							// 	</div>
							// </Dialog>
						}

						<Dialog
							onClose={() => setExternalSharePopupOpen(false)}
							open={externalSharePopupOpen}
							PaperProps={{
								style: {
									borderRadius: 20,
									padding: '20px',
									maxWidth: '1111px',
									width: '450px',
								},
							}}
						>
							<div className="">
								<DialogTitle
									sx={{
										padding: '0',
									}}
								>
									<div className="font-bold font-proxima-nova text-primary text-[25px] leading-[43px] mb-[20px]">
										Share on Social
									</div>
								</DialogTitle>
							</div>

							<div className="flex gap-[20px] mb-[25px]">
								<FacebookShareButton url={window.location.href}>
									<GrFacebook
										size={40}
										color={'#475993'}
										className="rounded-[5px]"
									/>
								</FacebookShareButton>

								<LinkedinShareButton url={window.location.href}>
									<GrLinkedin
										size={40}
										color={'#818181'}
										className="rounded-[5px]"
									/>
								</LinkedinShareButton>

								<InstapaperShareButton url={window.location.href}>
									<div className="">
										<img
											src="/images/logo/instagram.svg"
											alt="icon"
										/>
									</div>
								</InstapaperShareButton>

								<TwitterShareButton url={window.location.href}>
									<div className="rounded-[5px]">
										<img
											src="/images/logo/twitter.svg"
											alt="icon"
										/>
									</div>
								</TwitterShareButton>

								<WhatsappShareButton url={window.location.href}>
									<div className="rounded-[5px]">
										<WhatsappIcon
											size={40}
											style={{ borderRadius: 4 }}
										/>
									</div>
								</WhatsappShareButton>
							</div>
							{/* <textarea
								rows={8}
								style={{ width: '100%' }}
								className="focus:outline-none pt-[25px] pl-[20px] md:placeholder-[#818181] text-[#333333] tracking-widest placeholder-opacity-100 font-proxima-nova text-[16px] leading-[42px] border rounded-[10px] font-semibold"
								placeholder="Write the text here..."
								value={shareSocialMediaText}
								// onChange={(e: any) => setShareSocialMediaText(e.target.value)}
								onChange={(e: any) => handleCursor(e)}
								onClick={(e?: any) => {
									const caretEnd = e.target.selectionEnd;
									setCurrentCursorPosition(caretEnd);
								}}
							/> */}

							<div className="flex items-center w-full pr-1 justify-center mt-[20px] relative">
								{/* {toggle && (
									<div
										className="absolute bottom-[80px]"
										ref={ref}
									>
										<Picker
											set="apple"
											onSelect={(emoji: any) => handleEmojiWithText(emoji)}
											style={{
												width: '600px',
												paddingTop: '25px',
												paddingLeft: '10px',
												paddingRight: '10px',
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
									className="text-[#1B2E50] text-[41px]"
								/> */}
								{/* <Button
									type="submit"
									value="Share"
									className="text-white bg-primary transform-none rounded-[6px] text-[20px] font-proxima-nova tracking-tight py-[5px] px-[50px]"
								// onClick={submitShare}
								/> */}
							</div>
						</Dialog>
					</React.Fragment>
				)}
			</div>

			<Dialog
				open={deleteDialogOpen}
				onClose={() => setDeleteDialogOpen(false)}
				maxWidth="lg"
				sx={{
					'& .MuiPaper-root': {
						width: 400,
					},
				}}
			>
				<div className="p-10">
					<h3 className="text-center">Are you sure to delete?</h3>
					<div className="text-right mt-6">
						<Button
							className="text-black hover:bg-primary hover:text-white p-1 pl-3 pr-3 radius-20 mr-2"
							value="Cancel"
							onClick={() => setDeleteDialogOpen(false)}
						/>

						<Button
							className="text-black hover:bg-primary hover:text-white p-1 pl-3 pr-3 radius-20"
							value="Delete"
							onClick={() => {
								setDeleteDialogOpen(false);
								deleteProjectFlow(projectData, () => {
									toast.success('Project deleted successfully!');
									router.replace(`/user/dashboard/projects`);
								});
							}}
						/>
					</div>
				</div>
			</Dialog>

			<ProjectContributorsDialog
				open={contributorsDialogOpen}
				onClose={() => setContributorsDialogOpen(false)}
				projectData={projectData}
			/>
		</>
	);
};

export default ProjectDetail;
