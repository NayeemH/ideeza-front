import React, { useEffect, useRef, useState } from 'react';
import Loader from '@atoms/loader';
import { FaArrowCircleLeft } from 'react-icons/fa';
import Button from '@atoms/button';
import EditableInput from '@molecules/editable-input';
import AvatarLabels from '@molecules/avatar-label';
import PricingPopup from '@organisms/pricing-popup';
import { useRouter } from 'next/router';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
	ClickAwayListener,
	DialogContent,
	DialogTitle,
	// Popover,
	Popper,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SelectBasic from '@molecules/select-basic';
import VertualNFTPopup from '@organisms/VertualNFT-popup';
import { toast } from 'react-toastify';
import { ImCheckmark } from 'react-icons/im';
import { RiPencilFill } from 'react-icons/ri';
import ProductDescription from '@organisms/product-description';
import { updateProductLike } from '@features/user/projects/request';
import SellerTab from '@organisms/tabs-projects-sellers';
import TabsProjectGeneral from '@organisms/tabs-projects-general-info';
import TabProjectMainNFT from '@organisms/tabs-projects-mainNFT';
import TabProjectPhysicalNFT from '@organisms/tabs-projects-PhysicalNFT';
import TabProjectVertualNFT from '@organisms/tabs-projects-vertualNFT';
import ProjectProducts from '@organisms/project-products';
import { useAppSelector, useDetectSelfUser } from 'app/hooks';
import { checkSelfUser, connectToWallet } from 'utils/utils';
import { apiService } from 'utils/request';
import Fade from '@mui/material/Fade';
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
import Dialog from '@mui/material/Dialog';
// import TextField from '@molecules/text-field';
// import { IoHappySharp } from 'react-icons/io5';
import ContributorsTab from '@organisms/tabs-projects-contributors';
// import ProjectDescription from '@organisms/project-description';
// import { getProjectDetailAsync } from '@features/user/projects/reducer';
import Label from '@atoms/label';
import CheckboxAtom from '@atoms/checkbox';
import { MdCancel } from 'react-icons/md';

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

const ProductDetail = () => {
	const router = useRouter();
	// const dispatch = useAppDispatch();
	const [popup, SetPopup] = useState(false);
	const [popupVertual, SetPopupVertual] = useState(false);
	const [title, setTitle] = useState('');
	const authUserData = useAppSelector((state) => state.auth?.userData);
	const [productNameEdit, setProductNameEdit] = useState(false);
	const [productDescriptionEdit, setProductDescriptionEdit] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [valueTab, setValueTab] = React.useState(0);
	const [proof, setProof] = useState<string>('');
	const [isProof, setIsProof] = useState(false);
	const [isPhysicalNFTBid, setIsPhysicalNFTBid] = useState(false);
	const [isGeneralInfoBid, setIsGeneralInfoBid] = useState(true);
	const [isItemRecord, setIsItemRecord] = useState(false);
	const [isPrivateUser, setIsPrivateUser] = useState(true);
	const [isMinimumBid, setIsMinimumBid] = useState(true);
	const [productData, setProductData] = useState<any>(null);
	const isSelfUser = useDetectSelfUser(productData?.user?.id);
	const [externalSharePopupOpen, setExternalSharePopupOpen] = useState(false);
	const current_url = process.env.NEXT_PUBLIC_APP_URL + router?.asPath;
	const [shareContentText, setShareContentText] = useState('');
	const [shareProject, setShareProject] = useState<any>(null);
	const [sharePopupOpen, setSharePopUpOpen] = useState(false);
	const [popperOpen, setPopperOpen] = React.useState(false);
	const refPopper = useRef<any>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [userIsFriend, setUserIsFriend] = useState<boolean>(false);
	const [sharePopUpConfirmOpen, setSharePopUpConfirmOpen] = useState(false);

	// const projectId = router.query.id;
	// const [projectData, setProjectData] = useState<any>(null);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
		setPopperOpen((previousOpen) => !previousOpen);
	};
	const handleClickOutsidePopper = () => {
		setPopperOpen(false);
	};
	// const canBeOpen = popperOpen && Boolean(anchorEl);
	// const id = canBeOpen ? 'transition-popper' : undefined;

	const product_id = router.query.productId;

	const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
		setValueTab(newValue);
	};

	const [generalInfo, setGeneralInfo] = useState<number>(0);

	const handleChangeGeneralInfo = (event: any, newValue: any): void => {
		// console.log('handle Change team', event.target.value)
		setGeneralInfo(newValue);
	};

	const editComponet = productNameEdit ? (
		<div className="p-2 border rounded-full">
			<ImCheckmark className="cursor-pointer text-primary bg-[#F6F6F6]" />
		</div>
	) : (
		<div className="p-2 border rounded-full">
			<RiPencilFill className="cursor-pointer text-primary bg-[#F6F6F6]" />
		</div>
	);

	// const productDetails = location?.state?.productDetails;
	//   const productDetails = useAppSelector(
	//     ({ Product: any }) => Product?.userProduct
	//   );

	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const toggleOpen = () => SetPopup(!popup);
	const toggleOpenVertual = () => SetPopupVertual(!popupVertual);

	const onClickLikeButton = () => {
		try {
			updateProductLike({
				id: productData.id,
			}).then(() => {
				getProduct();
				// toast.success('Like submitted!');
			});
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const editProductName = async (name: any) => {
		if (name.toString().length > 235) {
			toast.error('The project name you entered is too long!');
			return;
		}

		try {
			const user_id = productData?.user?.id;

			if (checkSelfUser(authUserData?.id, user_id)) {
				await apiService(
					{
						method: 'patch',
						url: `/product/${productData?.id}/`,
						data: { name },
						token: true,
					},
					(res: any) => {
						if (res) {
							getProduct();
							setProductNameEdit(false);
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

	const editProductDescription = async (description: any) => {
		try {
			const user_id = productData?.user?.id;

			if (checkSelfUser(authUserData?.id, user_id)) {
				await apiService(
					{
						method: 'patch',
						url: `/product/${productData?.id}/`,
						data: { description },
						token: true,
					},
					(res: any) => {
						if (res) {
							getProduct();
							setProductDescriptionEdit(false);
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

	const onClickShareButton = () => {
		setShareProject(productData?.id);
		setShareContentText('');
		setSharePopUpOpen(true);
	};

	const submitShare = async () => {
		if (shareProject) {
			const id = shareProject;

			await apiService(
				{
					method: 'post',
					url: `/account/news-feed/`,
					data: {
						text: shareContentText,
						object_type: 'PRODUCT',
						object_id: id,
					},
					token: true,
				},
				(res: any, error: any) => {
					if (res) {
						toast.success('Shared successfully!');
						setShareContentText('');
						setSharePopUpOpen(false);
						setSharePopUpConfirmOpen(false);
						return;
					}

					if (error.response && error.response.status === 400) {
						toast.error('You have already shared this feed!');
						setShareProject(null);
						setShareContentText('');
						setSharePopUpOpen(false);
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
					user_id: productData?.user?.id,
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

	// const updateProductStatus = async (visible: boolean) => {
	// 	try {
	// 		await useFetch.patch(`product/${product_id}/`, {
	// 			is_visible: visible,
	// 		});

	// 		await getProduct();
	// 		toast.dismiss();
	// 		toast.success(`Product is ${visible ? 'public' : 'private'} now`);
	// 	} catch (error: any) {
	// 		toast.error(error.message);
	// 	}
	// };

	const getProduct = async () => {
		setLoading(true);

		await apiService(
			{
				method: 'get',
				url: `product/${product_id}/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					setProductData(data);
					setLoading(false);
					setLoaded(true);
					return;
				}

				setLoaded(true);
				setLoading(false);
			}
		);
	};

	// const getProjectData = () => {
	// 	if (typeof projectId !== 'undefined') {
	// 		setLoading(true);

	// 		dispatch(getProjectDetailAsync({ id: projectId })).then((data) => {
	// 			if (!data?.payload) {
	// 				return;
	// 			}
	// 			setProjectData(data?.payload);
	// 			setLoading(false);
	// 		});
	// 	}
	// };

	useEffect(() => {
		if (product_id) {
			getProduct();
		}
	}, [product_id]);

	// useEffect(() => {
	// 	if (productData) {
	// 		getProjectData();
	// 	}
	// }, [projectId, productData]);

	return (
		<>
			{loaded && productData !== null && (
				<>
					{/* Tabs */}
					<Box sx={{ width: '100%' }}>
						<Box className="">
							<Tabs
								value={valueTab}
								onChange={handleChangeTab}
								aria-label="basic tabs example"
								centered
								className="custom-tabs-products custom-tabs-projects mt-[50px]"
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
										setIsItemRecord(false);
									}}
									{...a11yProps(0)}
								/>
								<Tab
									label={
										<>
											<span className="flex items-center">
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
										setIsProof(true);
										setIsGeneralInfoBid(true);
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
										setIsGeneralInfoBid(true);
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

			<div className="md:p-6 p-4 bg-white rounded-lg">
				{loading && !loaded && <Loader />}
				{loaded && productData !== null && (
					<React.Fragment>
						<div className="flex justify-between">
							<Button
								value="Go back"
								onClick={() => {
									router.back();
								}}
								classes={{
									root: 'bg-primary text-base 2xl:text-xl font-semibold text-white transform-none font-medium tracking-tight  px-5 py-2 rounded',
								}}
								iconStart={<FaArrowCircleLeft className="text-lg" />}
								color="primary"
							/>{' '}
							<ClickAwayListener onClickAway={handleClickOutsidePopper}>
								<div>
									<div className="">
										<BsThreeDotsVertical
											className=" text-gray-500 text-[40px] cursor-pointer flex ml-auto mt-4"
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
															{isSelfUser &&
																productData?.is_visible !==
																	false && (
																	<>
																		<div
																			className="text-[18px] hover:text-primary py-1"
																			onClick={
																				onClickShareButton
																			}
																		>
																			Share invention
																		</div>
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
																	</>
																)}
															{/*<div className="text-[18px] hover:text-primary py-1">
                        Join this product
                      </div>*/}

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

															{isSelfUser && (
																<div
																	className="text-[18px] hover:text-primary py-1"
																	onClick={() =>
																		router.push(
																			`/user/dashboard/product/${
																				productData
																					? productData.id
																					: ''
																			}/edit`
																		)
																	}
																>
																	Edit
																</div>
															)}

															{isSelfUser && (
																<div
																	className="text-[18px] hover:text-primary py-1"
																	onClick={() =>
																		setDeleteDialogOpen(true)
																	}
																>
																	Delete
																</div>
															)}

															{/*<div className="text-[18px] hover:text-primary py-1">
                        Report
                      </div>*/}
														</div>
													</div>
												</Fade>
											)}
										</Popper>
									)}
								</div>
							</ClickAwayListener>
							{/* {isSelfUser && (
                <Button
                  onClick={() => {
                    if (productData !== null) {
                      updateProductStatus(!productData?.is_visible);
                    }
                  }}
                  value={`Turn it to ${
                    productData !== null && productData?.is_visible
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

						<div className="grid grid-cols-12 font-proxima-nova">
							<div className=" col-span-12 lg:col-span-6">
								{title}
								<div className="flex flex-wrap md:flex-nowrap justify-between lg:justify-start mt-8 ">
									{isSelfUser ? (
										<EditableInput
											mainClass="flex items-center flex-row-reverse "
											// editContanerClass="bg-gray-100 flex items-center justify-center text-2xl rounded-full w-8 h-8"
											editContanerClass="bg-transparent flex items-center justify-center text-2xl rounded-full w-8 h-8"
											edit={productNameEdit}
											editComponent={isSelfUser ? editComponet : undefined}
											lableClass={{
												root: 'text-primary tracking-tight  text-xl xl:text-2xl 2xl:text-3xl font-bold mr-1',
											}}
											inputClasses={{ root: 'mr-2' }}
											handleChange={() =>
												setProductNameEdit(!productNameEdit)
											}
											setTitle={setTitle}
											labelValue={productData ? productData?.name : ''}
											onSubmit={(value) => editProductName(value)}
										/>
									) : (
										<div style={{ fontWeight: 'bold' }}>
											{productData && productData?.name}
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
														<p className=" font-semibold ml-2 capitalize text-[18px]">
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
														<p className=" font-semibold ml-2 capitalize text-[18px]">
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
										avaterClasses="h-12 w-12 shadow-md"
										titleClasses="text-xl text-gray-700 tracking-normal leading-6 font-semibold"
										subtitleClasses="text-sm text-gray-810 font-thin tracking-tight "
										src={productData?.user?.profile_photo}
										title={
											productData && productData?.user
												? productData?.user?.first_name +
												  ' ' +
												  productData?.user?.last_name
												: ''
										}
										subtitle={
											productData && productData?.user
												? productData?.user?.about_me
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
										selectClasses="bg-gray-200 rounded-lg mt-[20px] w-[50%] text-lg 2xl:text-xl text-[#333333] h-[35px] lg:h-[50px] py-0"
									/>
								)}
							</div>

							<div className="col-span-12 lg:col-span-6 mt-[20px]">
								{isGeneralInfoBid && (
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
														<p className="text-[#787878]">Countdown</p>
														<h5 className=" text-base lg:text-[25px] font-semibold">
															06:20:59
														</h5>
													</div>
												</>
											) : (
												<Button
													value="Add to Sell"
													className="text-white 2xl:text-xl rounded-lg mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
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
												<div className="flex flex-col sm:flex-row justify-start gap-4">
													<Button
														value="Physical NFT"
														className="text-white 2xl:text-xl rounded-lg sm:mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
														onClick={() => {
															connectToWallet();
														}}
													/>
													<Button
														value="Virtual NFT"
														className="text-white 2xl:text-xl rounded-lg sm:mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
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
													className="text-white 2xl:text-xl rounded-lg mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
												/>
												<Button
													onClick={() => {
														connectToWallet();
													}}
													value="Place Bid"
													className="text-white 2xl:text-xl rounded-lg mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
												/>
											</div>
										)}
									</div>
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

						<div className="grid grid-cols-12 gap-6 custom-tab-head font-proxima-nova">
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
														className="text-white 2xl:text-xl rounded-lg mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
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
															onClick={() => {
																connectToWallet();
															}}
															value="Physical NFT"
															className="text-white 2xl:text-xl rounded-lg mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
														/>
														<Button
															value="Virtual NFT"
															className="text-white 2xl:text-xl rounded-lg mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
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
														className="text-white 2xl:text-xl rounded-lg mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5 "
													/>
													<Button
														onClick={() => connectToWallet()}
														value="Place Bid"
														className="text-white 2xl:text-xl rounded-lg mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
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
										tabsClasses="border-b custom-border-project-tabs  mt-[-60px]"
										tabClasses="bg-white focus:bg-white focus:text-primary text-xl tracking-tight  max-w-[0] custom-border-product-tab mr-2 transform-none py-1 px-0"
										handleChange={handleChangeGeneralInfo}
										selected="text-[#ff09d0]"
										index={generalInfo}
										tabsData={[
											{
												name: <div className="text-base">Description</div>,
												textColor: 'primary',
												component: (
													<ProductDescription
														selfUser={isSelfUser}
														productData={productData}
														onClickLikeButton={onClickLikeButton}
														onClickShareIdeeza={onClickShareButton}
														onClickShareSocial={() =>
															setExternalSharePopupOpen(true)
														}
														description={
															productData && productData?.description
														}
														edit={productDescriptionEdit}
														onClickEdit={() =>
															setProductDescriptionEdit(
																!productDescriptionEdit
															)
														}
														onSubmit={(value: any) => {
															editProductDescription(value);
														}}
														onReload={getProduct}
														hideShareButton={
															isSelfUser &&
															productData?.is_visible === false
														}
													/>
												),
											},
											{
												name: <div className="text-base">Sellers</div>,
												textColor: 'primary',
												component: (
													<>
														<SellerTab />
													</>
												),
											},
											{
												name: <div className="text-base">Contributors</div>,
												textColor: 'primary',
												component: (
													<>
														<ContributorsTab
															/*data={productData?.product_contributors}*/
															data={[]}
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
							<div className="xl:col-span-6 col-span-12 xl:mt-[20px]">
								<ProjectProducts
									hideLabel={false}
									gotoProductDetails={() => false}
									products={productData ? new Array(1).fill(productData) : []}
									productThreeDView={true}
									// projectData={projectData}
									initialVideoFor={'product'}
								/>
							</div>
						</div>

						<Dialog
							onClose={() => {
								setSharePopUpOpen(false);
							}}
							open={sharePopupOpen}
							style={{ zIndex: 110 }}
						>
							<DialogTitle>
								<span className="hover:rotate-180">
									<MdCancel
										className="text-primary absolute right-5 top-5  hover:cursor-pointer"
										onClick={() => {
											setSharePopUpOpen(false);
										}}
									/>
								</span>
							</DialogTitle>
							<DialogContent style={{ width: 450 }}>
								<div className="">
									<div className="w-full flex justify-center border-b pb-4">
										<Label
											value="Product Preview"
											className="text-xl "
										/>
									</div>
									<div className="mt-4 border-b pb-4">
										<Label
											value={productData?.name}
											className="text-base"
										/>
										<Label
											value={productData?.description}
											className="my-2 text-sm"
										/>
										{productData?.product_videos?.length > 0 && (
											<video
												width="400"
												height="240"
												controls
											>
												<source
													src={productData?.product_videos[0]?.video}
													type="video/mp4"
												/>
											</video>
										)}
									</div>
									<div className="flex items-start mt-4">
										<CheckboxAtom />
										<Label
											value="I confirm that I'm the rightful owner of this idea virtually or physically and any part of it. I know I have all responsibility in all legal and/or intellectual property issues that will occur because my product."
											className="text-xs"
										/>
									</div>
									<div className="w-full flex justify-between mt-4">
										<Button
											value={'Back'}
											className="text-lg bg-primary text-white px-12 "
											onClick={() => setSharePopUpOpen(false)}
										/>
										<Button
											value={'Share'}
											className="text-lg bg-primary text-white px-12"
											onClick={() => {
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
											value={'Agree'}
											className="text-lg bg-primary text-white px-12"
											onClick={submitShare}
										/>
									</div>
								</div>
							</DialogContent>
						</Dialog>
						{
							// <Dialog
							// 	onClose={() => setSharePopUpOpen(false)}
							// 	open={sharePopupOpen}
							// >
							// 	<DialogTitle>Share Ideeza</DialogTitle>
							// 	<DialogContent style={{ width: 400 }}>
							// 		<div>
							// 			<TextField
							// 				mainClass="flex flex-col mt-3"
							// 				labelvalue={'Share on Ideeza'}
							// 				// register={register({ required: "Please Enter Description!" })}
							// 				labelClasses="font-bold text-lg -mt-2 mb-2 text-primary pb-2"
							// 				multiline="true"
							// 				rows="6"
							// 				name="text"
							// 				// error={errors}
							// 				placeholder="Write the text here..."
							// 				inputClasses="w-full p-0 text-sm tracking-tight  border border-gray-800 border-opacity-40"
							// 				value={shareContentText}
							// 				onChange={(e: any) => setShareContentText(e.target.value)}
							// 			/>
							// 			<div className="flex items-center w-full pr-1 justify-between mt-2">
							// 				<IoHappySharp className="text-blue-150 text-4xl" />
							// 				<Button
							// 					type="submit"
							// 					value="Share"
							// 					className="text-white bg-primary transform-none rounded-sm tracking-tight py-1 px-12"
							// 					onClick={submitShare}
							// 				/>
							// 			</div>
							// 		</div>
							// 	</DialogContent>
							// </Dialog>
						}

						<Dialog
							onClose={() => setExternalSharePopupOpen(false)}
							open={externalSharePopupOpen}
						>
							<DialogTitle>Share External</DialogTitle>
							<div style={{ display: 'flex', flexWrap: 'wrap' }}>
								<div style={{ padding: '5px 10px' }}>
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

								<div style={{ padding: '5px 10px' }}>
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

								<div style={{ padding: '5px 10px' }}>
									<TwitterShareButton url={current_url}>
										<TwitterIcon
											size={40}
											round
										/>
									</TwitterShareButton>
								</div>

								<div style={{ padding: '5px 10px' }}>
									<LinkedinShareButton url={current_url}>
										<LinkedinIcon
											size={40}
											round
										/>
									</LinkedinShareButton>
								</div>

								<div style={{ padding: '5px 10px' }}>
									<InstapaperShareButton url={current_url}>
										<InstapaperIcon
											size={40}
											round
										/>
									</InstapaperShareButton>
								</div>

								<div style={{ padding: '5px 10px' }}>
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

								<div style={{ padding: '5px 10px' }}>
									<LineShareButton url={current_url}>
										<LineIcon
											size={40}
											round
										/>
									</LineShareButton>
								</div>

								<div style={{ padding: '5px 10px' }}>
									<ViberShareButton url={current_url}>
										<ViberIcon
											size={40}
											round
										/>
									</ViberShareButton>
								</div>

								<div style={{ padding: '5px 10px' }}>
									<WhatsappShareButton url={current_url}>
										<WhatsappIcon
											size={40}
											round
										/>
									</WhatsappShareButton>
								</div>
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
						/>

						<Button
							className="text-black hover:bg-primary hover:text-white p-1 pl-3 pr-3 radius-20"
							value="Delete"
						/>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default ProductDetail;
