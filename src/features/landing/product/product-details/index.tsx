import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import Button from '@atoms/button';
import EditableInput from '@molecules/editable-input';
import AvatarLabels from '@molecules/avatar-label';
import PricingPopup from '@organisms/pricing-popup';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector, useDetectSelfUser } from '../../../../app/hooks';
import Loader from '@atoms/loader';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Popover } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SelectBasic from '@molecules/select-basic';
import { useSession } from 'next-auth/react';
import VertualNFTPopup from '@organisms/VertualNFT-popup';
import { apiService } from '../../../../utils/request';
import { useFetch } from '../../../../app/api';
import { toast } from 'react-toastify';
import { ImCheckmark } from 'react-icons/im';
import { RiPencilFill } from 'react-icons/ri';
import ProductDescription from '@organisms/product-description';
import { updateProductLike } from '@features/user/projects/request';
import { checkSelfUser } from '../../../../utils/utils';
import SellerTab from '@organisms/tabs-projects-sellers';
import TabsProjectGeneral from '@organisms/tabs-projects-general-info';
import TabProjectMainNFT from '@organisms/tabs-projects-mainNFT';
import TabProjectPhysicalNFT from '@organisms/tabs-projects-PhysicalNFT';
import TabProjectVertualNFT from '@organisms/tabs-projects-vertualNFT';
import ProjectProducts from '@organisms/project-products';

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

const ProductDetail = (props: any) => {
	const router = useRouter();
	const { data: session } = useSession();
	const dispatch = useAppDispatch();
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

	const product_id = router.query.id;

	const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
		setValueTab(newValue);
	};

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	const [generalInfo, setGeneralInfo] = useState<number>(0);

	const handleChangeGeneralInfo = (event: any, newValue: any): void => {
		// console.log('handle Change team', event.target.value)
		setGeneralInfo(newValue);
	};

	const editComponet = productNameEdit ? (
		<ImCheckmark className="cursor-pointer" />
	) : (
		<RiPencilFill className="cursor-pointer" />
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
				toast.success('Like submitted!');
			});
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const editProductName = async (name: any) => {
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

	const updateProductStatus = async (visible: boolean) => {
		try {
			await useFetch.patch(`product/${product_id}/`, {
				is_visible: visible,
			});

			await getProduct();
			toast.dismiss();
			toast.success(`Product is ${visible ? 'public' : 'private'} now`);
		} catch (error: any) {
			toast.error(error.message);
		}
	};

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
					setLoading(true);
					setLoaded(true);

					return;
				}

				setLoaded(true);
				setLoading(true);
			}
		);
	};

	useEffect(() => {
		if (product_id) {
			getProduct();
		}
	}, [product_id]);

	return (
		<>
			{/* Tabs */}
			<Box sx={{ width: '100%' }}>
				<Box className="mb-[25px]">
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
									root: 'bg-primary text-base 2xl:text-xl font-semibold text-white transform-none font-medium tracking-tight font-sans px-5 py-2 rounded',
								}}
								iconStart={<FaArrowCircleLeft className="text-lg" />}
								color="primary"
							/>
							{isSelfUser && (
								<Button
									onClick={() => {
										if (productData !== null) {
											updateProductStatus(!productData?.is_visible);
										}
									}}
									value={`Turn it to ${
										productData !== null && productData?.is_visible
											? 'private'
											: 'public'
									}`}
									variant="outlined"
									classes={{
										root: 'text-md text-gray-600 font-normal py-2 tracking-tight transform-none',
										outlined: 'border-gray-600',
									}}
								/>
							)}
						</div>
						<BsThreeDotsVertical
							className=" text-gray-500 text-[40px] cursor-pointer flex ml-auto mt-4"
							onClick={handleClick}
						/>
						<div className="grid grid-cols-12">
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
												root: 'text-primary tracking-tight font-sans text-xl xl:text-2xl 2xl:text-3xl font-bold mr-1',
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
								<AvatarLabels
									mainClassesLabel="pl-3 w-full"
									avaterClasses="h-12 w-12 shadow-md"
									titleClasses="text-xl text-gray-700 font-sans tracking-normal leading-6 font-semibold"
									subtitleClasses="text-sm text-gray-810 font-thin tracking-tight font-sans"
									src=""
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
													// onClick={onClickApply}
													value="Add to Sell"
													className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
													onClick={() => setIsMinimumBid(true)}
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
														className="text-white 2xl:text-xl rounded-[8px] sm:mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
														// color="inherit"
													/>
													<Button
														value="Virtual NFT"
														className="text-white 2xl:text-xl rounded-[8px] sm:mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
														onClick={toggleOpenVertual}
													/>
												</div>
											</div>
										) : (
											<div className="flex justify-start gap-4">
												<Button
													onClick={() => {
														setIsPrivateUser(false);
													}}
													value="Buy Now"
													className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
												/>
												<Button
													// onClick={()=>setIsItemSold(true)}
													value="Place Bid"
													className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
												/>
											</div>
										)}
									</div>
								)}
							</div>
							<Popover
								open={open}
								// handleClick={handleClick}
								onClose={handleClose}
								id={id}
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								className="popover-container"
							>
								<div className="py-2 w-auto shadow-lg px-4">
									<div
										className="text-[18px] hover:text-primary py-1"
										onClick={() => {}}
									>
										Share invention
									</div>
									<div className="text-[18px] hover:text-primary py-1">
										Join this product
									</div>
									<div className="text-[18px] hover:text-primary py-1">
										Connect
									</div>
									<div className="text-[18px] hover:text-primary py-1">
										Report
									</div>
								</div>
							</Popover>
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
														onClick={() => setIsMinimumBid(true)}
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
															// onClick={onClickApply}
															value="Physical NFT"
															className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
															// color="inherit"
														/>
														<Button
															// onClick={onClickApply}
															value="Virtual NFT"
															className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
															onClick={toggleOpenVertual}
															// color="inherit"
														/>
													</div>
												</div>
											) : (
												<div className="flex justify-start gap-4">
													<Button
														onClick={() => {
															setIsPrivateUser(false);
														}}
														value="Buy Now"
														className="text-white 2xl:text-xl rounded-[8px] mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
														// color="inherit"
													/>
													<Button
														// onClick={onClickApply}
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
										tabsClasses="border-none custom-border-product-tabs"
										tabClasses="bg-white focus:bg-white focus:text-primary text-xl tracking-tight eina-font-sb03 max-w-[0] custom-border-product-tab mr-2 transform-none py-1 px-0"
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
														onClickShareButton={() => {}}
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
														{/*<ContributorsTab data={productData?.product_contributors} />*/}
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
									hideLabel={true}
									gotoProductDetails={() => {}}
									products={productData ? new Array(1).fill(productData) : []}
									projectData={null}
									initialVideoFor="product"
								/>
							</div>
						</div>
					</React.Fragment>
				)}
			</div>
		</>
	);
};

export default ProductDetail;
