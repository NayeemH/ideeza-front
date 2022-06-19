import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import Button from '@atoms/button';
import EditableInput from '@molecules/editable-input';
import AvatarLabels from '@molecules/avatar-label';
import PricingPopup from '@organisms/pricing-popup';
import { useRouter } from 'next/router';
import { RiPencilFill } from 'react-icons/ri';
// import ProjectProducts from '@organisms/project-products';
import { useAppSelector, useDetectSelfUser } from '../../../../app/hooks';
import { toast } from 'react-toastify';
import Loader from '@atoms/loader';
import { a11yProps, checkSelfUser, connectToWallet } from '../../../../utils/utils';
import { ApiDataType, apiService } from '../../../../utils/request';
// import { FormControlLabel } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabsProjectGeneral from '@organisms/tabs-projects-general-info';
import SellerTab from '@organisms/tabs-projects-sellers';
import SelectBasic from '@molecules/select-basic';
import TabProjectMainNFT from '@organisms/tabs-projects-mainNFT';
import TabProjectVertualNFT from '@organisms/tabs-projects-vertualNFT';
import TabProjectPhysicalNFT from '@organisms/tabs-projects-PhysicalNFT';
import VertualNFTPopup from '@organisms/VertualNFT-popup';
import { ImCheckmark } from 'react-icons/im';
import ContributorsTab from '@organisms/tabs-projects-contributors';
// import VideosTab from '@organisms/tabs-projects-videos';
import 'emoji-mart/css/emoji-mart.css';
// import { IOSSwitch } from '@organisms/create-project-popup-sell';
import { IPartDetailsProps } from '@models/user-parts';
import TabIconLabel from './tabIconLabel';
import PartDescription from './partDescription';
import TabPanel from './tabPanel';
import ProjectCarouselContent from '@organisms/project-small-carousel';
import UiEmptyPlaceholder from '@molecules/ui-empty-placeholder';

// TODO:: Uncomment share code when share parts/components APIs are available
// import ShareModalSocial from './shareModal/social';
// import ShareModalPrivate from './shareModal/private';
// import ShareModalPublic from './shareModal/public';

const PartDetails = (props: IPartDetailsProps) => {
	const { id: partId, type: partType } = props;
	const router = useRouter();
	const [popup, SetPopup] = useState(false);
	const [popupVertual, SetPopupVertual] = useState(false);
	const [title, setTitle] = useState('');
	const [partNameEdit, setPartNameEdit] = useState(false);
	const [partDescriptionEdit, setpartDescriptionEdit] = useState(false);
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
	const [showInitialLoader, setShowInitialLoader] = useState(false);
	const [likesCount, setLikesCount] = useState<number>(0);
	const [sharesCount, setSharesCount] = useState<number | string>('');
	const [notFound, setNotFound] = useState(false);
	// const [initRender, setInitRender] = useState<boolean>(true);
	const [partData, setPartData] = useState<any>(null);

	const [generalInfo, setGeneralInfo] = useState<number>(0);
	const [partName, setPartName] = useState('');
	const [partDescription, setPartDescription] = useState('');
	const [userIsFriend, setUserIsFriend] = useState<boolean>(false);
	// const [connectionId, setConnectionId] = useState<number | null>(null);

	// // TODO:: Uncomment share code when share parts/components APIs are available
	// const [sharePopupOpen, setSharePopUpOpen] = useState(false);
	// const [shareProject, setShareProject] = useState<any>(null);
	// const [shareContentText, setShareContentText] = useState('');
	// const [shareSocialMediaText, setShareSocialMediaText] = useState('');
	// const [externalSharePopupOpen, setExternalSharePopupOpen] = useState(false);

	const authUserData = useAppSelector((state) => state.auth?.userData);
	const commentsCount = useAppSelector((state) => state?.partComments?.count);
	const isSelfUser = useDetectSelfUser(partData?.user?.id);
	// const loaded = useAppSelector((state) => state.projects.loaded);
	// const loading = useAppSelector((state) => state.projects.loading);
	// const projectData = useAppSelector((state) => state.projects.project.detail);

	useEffect(() => {
		if (!isSelfUser && partData?.user?.id) {
			checkConnection();
		}
	}, [isSelfUser, partData]);

	useEffect(() => {
		if (partId && partType) {
			getPartDetails();
		}
		// setInitRender(false)
	}, [partId]);

	const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
		setValueTab(newValue);
	};

	const handleChangeGeneralInfo = (event: any, newValue: any): void => {
		// console.log('handle Change team', event.target.value)
		setGeneralInfo(newValue);
	};

	const toggleOpen = () => SetPopup(!popup);
	const toggleOpenVertual = () => SetPopupVertual(!popupVertual);

	const getPartDetails = async () => {
		if (!partId && !partType) return;
		setShowInitialLoader(true);
		await apiService(
			{
				method: 'get',
				url:
					partType == 'component'
						? `/component/${partId}/`
						: `/part/${partType}-part/${partId}/`,
				token: true,
			},
			(res: any, err: any) => {
				if (res) {
					// console.log('get Part res---', res?.data);

					setPartName(res?.data?.name);
					setPartDescription(res?.data?.description);
					setPartData(res?.data);
					setLikesCount(res?.data?.likes);
					setSharesCount(res?.data?.shares);
					return setShowInitialLoader(false);
				}
				if (err) {
					setNotFound(true);
					return setShowInitialLoader(false);
				}
			}
		);
	};

	const onClickLikeButton = async () => {
		if (isSelfUser) return;
		const apiData: ApiDataType = {
			method: 'post',
			url:
				partType == 'component'
					? `/component/${partId}/like/`
					: `/part/${partType}-part/${partId}/like/`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				return setLikesCount(Number(likesCount) + 1);
			}
			// console.log('Error Posted Project Like---', err)
		});
	};

	// // TODO:: Uncomment share code when share parts/components APIs are available
	// const onClickShareButton = () => {
	// 	setShareProject(partData?.id);
	// 	setShareContentText('');
	// 	setSharePopUpOpen(true);
	// };
	// const submitShare = async () => {
	// 	if (shareProject) {
	// 		const id = shareProject;
	// 		await apiService(
	// 			{
	// 				method: 'post',
	// 				url: partType == 'component'
	// 					? `/component/${partId}/share/`
	// 					: `/part/${partType}-part/${partId}/share/`,
	// 				data: {
	// 					text: shareContentText,
	// 					// project: id,
	// 				},
	// 				token: true,
	// 			},
	// 			(res: any, error: any) => {
	// 				if (res) {
	// 					setSharesCount(Number(sharesCount) + 1);
	// 					toast.success('Shared successfully!');
	// 					setShareContentText('');
	// 					setSharePopUpOpen(false);
	// 					return;
	// 				}
	// 				if (error.response && error.response.status === 400) {
	// 					toast.error('You have already shared this feed!');
	// 					setShareProject(null);
	// 					setShareContentText('');
	// 					setSharePopUpOpen(false);
	// 				}
	// 			}
	// 		);
	// 	}
	// };

	const editpartName = async (name: any) => {
		try {
			const user_id = partData?.user?.id;

			if (checkSelfUser(authUserData?.id, user_id)) {
				await apiService(
					{
						method: 'patch',
						url:
							partType == 'component'
								? `/component/${partId}/`
								: `/part/${partType}-part/${partId}/`,
						data: { name },
						token: true,
					},
					(res: any) => {
						if (res) {
							setPartNameEdit(false);
							setPartName(name);
							toast.dismiss();
							toast.success('Saved successfully!');
							return;
						}
					}
				);
			} else {
				toast.error(
					`You can not edit this ${partType == 'component' ? 'component' : 'part'}!`
				);
			}
		} catch (error) {
			// console.log(error);
		}
	};

	const editpartDescription = async (description: any) => {
		try {
			const user_id = partData?.user?.id;

			if (checkSelfUser(authUserData?.id, user_id)) {
				await apiService(
					{
						method: 'patch',
						url:
							partType == 'component'
								? `/component/${partId}/`
								: `/part/${partType}-part/${partId}/`,
						data: { description },
						token: true,
					},
					(res: any) => {
						if (res) {
							setpartDescriptionEdit(false);
							getPartDetails();
							toast.dismiss();
							toast.success('Saved successfully!');
							return;
						}
					}
				);
			} else {
				toast.error(
					`You can not edit this ${partType == 'component' ? 'component' : 'part'}!`
				);
			}
		} catch (error) {
			// console.log(error);
		}
	};

	// const sendProjectViewRequest = async (project: any) => {
	//     try {
	//         const user_id = project?.user?.id;

	//         if (!checkSelfUser(authUserData?.id, user_id)) {
	//             await useFetch.post(`/project/${project.id}/view/`);
	//         }
	//     } catch (error) {
	//         // console.log(error);
	//     }
	// };

	const checkConnection = async () => {
		if (!isSelfUser) {
			await apiService(
				{
					method: 'get',
					url: `account/user/${partData?.user?.id}/connection/`,
					token: true,
				},
				(res: any) => {
					if (res) {
						const { data } = res;
						// setConnectionId(data.friend_id);
						setUserIsFriend(data.is_friend);
						return userIsFriend;
					}
				}
			);
		}
	};

	// TODO:: Remove this code if not necessary
	// const sendFriendRequest = () => {
	// 	apiService(
	// 		{
	// 			method: 'post',
	// 			url: `/account/friend/add-friend/`,
	// 			data: {
	// 				user_id: partData?.user?.id,
	// 			},
	// 			token: true,
	// 		},
	// 		(res: any, err: any) => {
	// 			if (res) {
	// 				// const {data} = res;
	// 				setUserIsFriend(false);
	// 				toast.success(
	// 					'Successfully sent friend request, currently you are following this user.'
	// 				);
	// 				return;
	// 			}
	// 			if (err?.response?.data?.detail) {
	// 				return toast.error(
	// 					err?.response?.data?.detail || 'Failed to send friend request!'
	// 				);
	// 			}
	// 		}
	// 	);
	// };
	const projectType = partData?.is_visible ? 'Public part' : 'Private part';

	const editComponet = partNameEdit ? (
		<div className="p-2 border rounded-full bg-[#F6F6F6]">
			<ImCheckmark className="cursor-pointer text-primary " />
		</div>
	) : (
		<div className="p-2 border rounded-full bg-[#F6F6F6]">
			<RiPencilFill className="cursor-pointer text-primary " />
		</div>
	);

	if (notFound) {
		return (
			<UiEmptyPlaceholder
				title={`No ${partType == 'component' ? 'component' : 'part'} found!`}
				onClickBackButton={() => router.push('/user/dashboard/projects?active=parts')}
				showBackButton
			/>
		);
	}

	const mappedPartData = (data: any) => {
		if (!data) return;
		const mappedData = {
			category: partData?.category,
			comments_count: partData?.comments_count,
			contract_address: partData?.contract_address,
			contribute_score: partData?.contribute_score,
			created_at: partData?.created_at,
			description: partData?.description,
			dislikes: partData?.dislikes,
			file_attachments: partData?.file_attachments,
			id: partData?.id,
			ipfs_link: partData?.ipfs_link,
			is_verified: partData?.is_verified,
			is_visible: partData?.is_visible,
			likes: partData?.likes,
			downloads: partData?.downloads,
			name: partData?.name,
			on_sale: partData?.on_sale,
			project_images: [
				{
					image: partData?.image_svg,
					is_default: true,
				},
			],
			project_videos: [
				{
					video: partData?.simulation_video,
					is_default: true,
					video_type: 'VIDEO',
				},
			],
			editor_script: partData?.editor_script,
			three_d_file: partData?.three_d_file,
			three_d_script: partData?.three_d_script,
			views: partData?.views,
		};
		return mappedData;
	};

	return (
		<>
			{/* STARTS Tabs Label Section --------------------*/}
			<Box sx={{ width: '100%' }}>
				<Box className="">
					<Tabs
						value={valueTab}
						onChange={handleChangeTab}
						aria-label="basic tabs example"
						centered
						className="custom-tabs-projects mt-[6px]"
					>
						<Tab
							label={
								<TabIconLabel
									iconImage={'/images/icon/p-general.svg'}
									title={'General Info'}
								/>
							}
							className="py-[12px] px-[30px] min-h-0"
							onClick={() => {
								setIsPhysicalNFTBid(false);
								setIsProof(false);
								setIsGeneralInfoBid(true);
								setIsMainNftBid(false);
								setIsVirtualNftBid(false);
								// setIspartDataRecord(false);
							}}
							{...a11yProps(0)}
						/>
						<Tab
							label={
								<div className="main-nft">
									<TabIconLabel
										iconImage={'/images/icon/main-nft.svg'}
										title={'Main NFT'}
									/>
								</div>
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
								<TabIconLabel
									iconImage={'/images/icon/physical-nft.svg'}
									title={'Physical NFT'}
								/>
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
								<TabIconLabel
									iconImage={'/images/icon/vertual-nft.svg'}
									title={'Virtual NFT'}
								/>
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
			</Box>
			{/* ENDS Tabs Label Section --------------------*/}

			<div className="2xl:p-[30px] p-4 bg-white rounded-lg">
				{showInitialLoader && <Loader />}
				{!showInitialLoader && partData && (
					<>
						<div className="w-full flex justify-between">
							<Button
								value="Go back"
								onClick={() => router.push('/user/dashboard/projects?active=parts')}
								classes={{
									root: 'bg-primary text-base 2xl:text-lg font-proxima-nova text-white transform-none  tracking-tight px-[14px] py-[7] 2xl:px-[30px] 2xl:py-[13px] rounded',
								}}
								iconStart={<FaArrowCircleLeft className="text-xl" />}
								color="primary"
							/>
							{/* TODO:: Uncomment share code when share parts/components APIs are available  */}
							{/* <div className="flex items-center">
								<FormControlLabel
									control={<IOSSwitch defaultChecked />}
									label=""
								/>
								<Label
									value="Shared in newsfeed"
									className="text-lg font-proxima-nova ml-[10px]"
								/>
							</div> */}
						</div>

						<div className="grid grid-cols-12 pt-4 gap-6 xl:pt-[51px] ">
							<div className="col-span-12 xl:col-span-6 ">
								{title}
								<div className="flex flex-wrap md:flex-nowrap justify-between lg:justify-start ">
									{isSelfUser ? (
										<EditableInput
											mainClass="flex items-center flex-row-reverse"
											editContanerClass="bg-transparent flex items-center justify-center text-2xl rounded-full w-8 h-8 text-primary"
											edit={partNameEdit}
											editComponent={isSelfUser ? editComponet : undefined}
											lableClass={{
												root: 'text-primary font-proxima-nova text-[20px] xl:text-[25px] 2xl:text-[32px] font-bold mr-1',
											}}
											inputClasses={{ root: 'mr-2' }}
											handleChange={() => setPartNameEdit(!partNameEdit)}
											setTitle={setTitle}
											labelValue={partName}
											onSubmit={(value) => editpartName(value)}
										/>
									) : (
										<div
											className={
												'text-primary font-proxima-nova text-[20px] xl:text-[25px] 2xl:text-[32px] font-bold mr-1'
											}
										>
											{partData && partData?.name?.length <= 8
												? partData?.name
												: partData?.name?.slice(0, 8) + '...'}
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
										src={partData?.user?.profile_photo}
										title={
											partData && partData?.user
												? '@' +
												  partData?.user?.first_name +
												  '_' +
												  partData?.user?.last_name +
												  ' / ' +
												  projectType
												: ''
										}
									/>
								</div>

								{isProof && (
									<SelectBasic
										value={proof}
										options={[
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
										]}
										handleChange={(e: any) => setProof(e.target.value)}
										placeholder={'Select proof'}
										selectClasses="bg-gray-200 rounded-[8px] mt-[20px] w-[50%] text-lg 2xl:text-xl text-[#333333] h-[35px] lg:h-[50px] py-0"
									/>
								)}
							</div>

							<div className="col-span-12 lg:col-span-6 mt-[20px]">
								{isGeneralInfoBid && (
									<div className="border border-gray-300 rounded-[10px] p-[30px] bg-[#FBFBFB]">
										<div className="flex justify-between font-proxima-nova">
											{isSelfUser && !partData?.is_visible ? (
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
													onClick={() => {
														connectToWallet();
													}}
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
											{isSelfUser && partData?.is_visible ? (
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
											) : (
												<Button
													value="Add to Sell"
													className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
													onClick={() => setIsMinimumBid(true)}
												/>
											)}
										</div>
										{isSelfUser && !partData?.is_visible ? (
											<div className="pt-[25px] font-proxima-nova">
												<p className="text-[#787878] text-base font-semibold">
													Create New
												</p>
												<div className="flex flex-col sm:flex-row justify-start gap-4">
													<Button
														value="Physical NFT"
														className="text-white 2xl:text-lg rounded-[8px] sm:mt-4 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-14 py-1 sm:py-2 lg:py-2.5"
														onClick={() => connectToWallet()}
														// color="inherit"
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

								{isVirtualNftBid && (
									<>
										{isSelfUser && !partData?.is_visible && (
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
														// onClick={onClickApply}
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
														/>
														<Button
															value="Virtual NFT"
															className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
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
														onClick={() => {
															connectToWallet();
														}}
														value="Place Bid"
														className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
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
										tabsClasses="border-b border-gray-300 font-proxima-nova custom-border-project-tabs mt-[-60px]"
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
													<PartDescription
														selfUser={isSelfUser}
														partData={partData}
														onClickLikeButton={onClickLikeButton}
														description={partDescription}
														counts={{
															likes: likesCount,
															comments: commentsCount,
															shares: sharesCount,
														}}
														edit={partDescriptionEdit}
														onClickEdit={() =>
															setpartDescriptionEdit(
																!partDescriptionEdit
															)
														}
														onSubmit={(value: any) => {
															editpartDescription(value);
														}}
														partType={partType}
														partId={partId}
														// TODO:: Uncomment share code when share parts/components APIs are available
														// onClickShareIdeeza={onClickShareButton}
														// onClickShareSocial={() =>
														// 	setExternalSharePopupOpen(true)
														// }
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
														<ContributorsTab data={[]} />
													</>
												),
											},
											{
												// name: <div className="">Videos</div>,
												// textColor: 'primary',
												// component: (
												// 	<>
												// 		<VideosTab
												// 			images={[
												// 				'/images/project/car.png',
												// 				'/images/project/car.png',
												// 				'/images/project/car.png',
												// 				'/images/project/car.png',
												// 			]}
												// 		/>
												// 	</>
												// ),
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
								{/* <ProjectProducts
									projectData={projectData}
									products={
										partData && partData?.products?.length > 0
											? partData?.products
											: []
									}
									productThreeDView={true}
									initialVideoFor={'project'}
									hideNetwork={true}
								/> */}
								<ProjectCarouselContent
									productThreeDView={true}
									threeDScript={partData?.three_d_script}
									iconContanerClass="border-none flex items-center justify-center text-lg rounded-full w-7 h-7"
									numbering="hidden"
									imageSettingIcon="2xl:w-6 2xl:h-6 w-5 h-5"
									imagesIdeezaIcon="2xl:w-7 2xl:h-7 w-5 h-5"
									imagesIdeezaEye="2xl:w-8 2xl:h-8 w-5 h-5"
									mainIconClass="flex items-center"
									lableIconClass={{
										root: 'font-extrabold mr-1 text-xl pl-2 text-gray-300',
									}}
									video={partData?.video}
									data={mappedPartData(partData)}
									carouselHeight=" relative"
									titleClass="text-lg"
									nameClass="text-md "
									avatarClass="w-8 h-8"
									gotoProductDetails={() => false} //{gotoProductDetails}
									topIconContainer="flex absolute top-[30px] right-[30px] pl-1 w-[45%] px-3 p-2 md:p-2 2xl:py-3 xl:px-5 rounded-full project-icon-bg-custom justify-between "
									handleProjectClick={() => {
										// if (projectData) {
										// 	router.push(
										// 		`/user/dashboard/project/${projectData?.id}/product/${products[0]?.id}?project_id=${projectData?.id}`
										// 	);
										// }
										return false;
									}}
									showWorkSpaceInsteadOfImageOrVideo={true}
									initialVideoFor={'project'}
									projectData={mappedPartData(partData)}
									showContentCreator={false}
									hideNetwork={true}
								/>
							</div>
						</div>

						{/* TODO:: Uncomment share code when share parts/components APIs are available */}
						{/* {!partData?.is_visible ? (
							<ShareModalPrivate
								onClose={() => {
									setSharePopUpOpen(false);
								}}
								open={sharePopupOpen}
								partData={partData}
								partName={partName}
								partDescription={partDescription}
								onSubmit={submitShare}
							/>
						) : (
							<ShareModalPublic
								onClose={() => setSharePopUpOpen(false)}
								open={sharePopupOpen}
								value={shareContentText}
								onChange={(e: any) => setShareContentText(e.target.value)}
								onSelectEmoji={(emoji: any) =>
									setShareSocialMediaText(shareSocialMediaText + emoji.native)
								}
								onSubmit={submitShare}
							/>
						)}
						<ShareModalSocial
							onClose={() => setExternalSharePopupOpen(false)}
							open={externalSharePopupOpen}
							value={shareSocialMediaText}
							onChange={(e: any) => setShareSocialMediaText(e.target.value)}
							onSelectEmoji={(emoji: any) =>
								setShareSocialMediaText(shareSocialMediaText + emoji.native)
							}
							onSubmit={submitShare}
						/> */}
					</>
				)}
			</div>
		</>
	);
};

export default PartDetails;
