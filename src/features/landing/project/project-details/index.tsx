import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import Button from '@atoms/button';
import EditableInput from '@molecules/editable-input';
import AvatarLabels from '@molecules/avatar-label';
import PricingPopup from '@organisms/pricing-popup';
import { useRouter } from 'next/router';
import { useAppSelector, useDetectSelfUser } from '../../../../app/hooks';
import Loader from '@atoms/loader';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Popover } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SelectBasic from '@molecules/select-basic';
import VertualNFTPopup from '@organisms/VertualNFT-popup';
import { apiService } from '../../../../utils/request';
import { useFetch } from '../../../../app/api';
import { toast } from 'react-toastify';
import { ImCheckmark } from 'react-icons/im';
import { RiPencilFill } from 'react-icons/ri';
import ProjectDescription from '@organisms/project-description';
import { updateProjectLike } from '@features/user/projects/request';
import { checkSelfUser, connectToWallet } from '../../../../utils/utils';
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

const ProjectDetail = () => {
	const router = useRouter();
	const [popup, SetPopup] = useState(false);
	const [popupVertual, SetPopupVertual] = useState(false);
	const [title, setTitle] = useState('');
	const authUserData = useAppSelector((state) => state.auth?.userData);
	const [projectNameEdit, setProjectNameEdit] = useState(false);
	const [projectDescriptionEdit, setProjectDescriptionEdit] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [valueTab, setValueTab] = React.useState(0);
	const [proof, setProof] = useState<string>('');
	const [isProof, setIsProof] = useState(false);
	const [isPhysicalNFTBid, setIsPhysicalNFTBid] = useState(false);
	const [isGeneralInfoBid, setIsGeneralInfoBid] = useState(true);
	const [isItemRecord, setIsItemRecord] = useState(false);
	const [isPrivateUser, setIsPrivateUser] = useState(true);
	const [isMinimumBid, setIsMinimumBid] = useState(true);
	const [projectData, setProjectData] = useState<any>(null);
	const isSelfUser = useDetectSelfUser(projectData?.user?.id);

	const project_id = router.query.id;

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

	const editComponet = projectNameEdit ? (
		<ImCheckmark className="cursor-pointer" />
	) : (
		<RiPencilFill className="cursor-pointer" />
	);

	// const projectDetails = location?.state?.projectDetails;
	//   const projectDetails = useAppSelector(
	//     ({ Project: any }) => Project?.userProject
	//   );

	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const toggleOpen = () => SetPopup(!popup);
	const toggleOpenVertual = () => SetPopupVertual(!popupVertual);

	const onClickLikeButton = () => {
		try {
			updateProjectLike({
				id: projectData.id,
			}).then(() => {
				getProject();
				toast.success('Like submitted!');
			});
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const editProjectName = async (name: any) => {
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
							getProject();
							setProjectNameEdit(false);
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
							getProject();
							setProjectDescriptionEdit(false);
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

	const updateProjectStatus = async (visible: boolean) => {
		try {
			await useFetch.patch(`project/${project_id}/`, {
				is_visible: visible,
			});

			await getProject();
			toast.dismiss();
			toast.success(`Project is ${visible ? 'public' : 'private'} now`);
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const getProject = async () => {
		setLoading(true);

		await apiService(
			{
				method: 'get',
				url: `project/${project_id}/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					setProjectData(data);
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
		if (project_id) {
			getProject();
		}
	}, [project_id]);

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
						className="custom-tabs-projects custom-tabs-projects pt-[50px]"
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
				{loaded && projectData !== null && (
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
										if (projectData !== null) {
											updateProjectStatus(!projectData?.is_visible);
										}
									}}
									value={`Turn it to ${
										projectData !== null && projectData?.is_visible
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
											edit={projectNameEdit}
											editComponent={isSelfUser ? editComponet : undefined}
											lableClass={{
												root: 'text-primary tracking-tight font-sans text-xl xl:text-2xl 2xl:text-3xl font-bold mr-1',
											}}
											inputClasses={{ root: 'mr-2' }}
											handleChange={() =>
												setProjectNameEdit(!projectNameEdit)
											}
											setTitle={setTitle}
											labelValue={projectData ? projectData?.name : ''}
											onSubmit={(value) => editProjectName(value)}
										/>
									) : (
										<div style={{ fontWeight: 'bold' }}>
											{projectData && projectData?.name}
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
										projectData && projectData?.user
											? projectData?.user?.first_name +
											  ' ' +
											  projectData?.user?.last_name
											: ''
									}
									subtitle={
										projectData && projectData?.user
											? projectData?.user?.about_me
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
														onClick={() => connectToWallet()}
													/>
													<Button
														value="Virtual NFT"
														className="text-white 2xl:text-xl rounded-[8px] sm:mt-8 shadow-none bg-primary capitalize px-4 sm:px-6 lg:px-16 py-1 sm:py-2 lg:py-2.5"
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
										onClick={() => false}
									>
										Share invention
									</div>
									<div className="text-[18px] hover:text-primary py-1">
										Join this project
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
															onClick={() => {
																connectToWallet();
															}}
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
										tabsClasses="border-none custom-border-project-tabs"
										tabClasses="bg-white focus:bg-white focus:text-primary text-xl tracking-tight eina-font-sb03 max-w-[0] custom-border-project-tab mr-2 transform-none py-1 px-0"
										handleChange={handleChangeGeneralInfo}
										selected="text-[#ff09d0]"
										index={generalInfo}
										tabsData={[
											{
												name: <div className="text-base">Description</div>,
												textColor: 'primary',
												component: (
													<ProjectDescription
														selfUser={isSelfUser}
														projectData={projectData}
														onClickLikeButton={onClickLikeButton}
														onClickShareButton={() => false}
														description={
															projectData && projectData?.description
														}
														edit={projectDescriptionEdit}
														onClickEdit={() =>
															setProjectDescriptionEdit(
																!projectDescriptionEdit
															)
														}
														onSubmit={(value: any) => {
															editProjectDescription(value);
														}}
														onReload={getProject}
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
														{/*<ContributorsTab data={projectData?.project_contributors} />*/}
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
									gotoProductDetails={() => false}
									products={
										projectData &&
										projectData?.products &&
										projectData?.products?.length > 0
											? new Array(1).fill(projectData?.products[0])
											: []
									}
									projectData={projectData}
									initialVideoFor="product"
									hideNetwork={true}
								/>
							</div>
						</div>
					</React.Fragment>
				)}
			</div>
		</>
	);
};

export default ProjectDetail;
