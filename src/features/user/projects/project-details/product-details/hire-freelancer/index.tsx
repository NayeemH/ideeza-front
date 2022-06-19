import AvatarAtom from '@atoms/avatar';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Button from '@atoms/button';
// import TabsMoleculeFreelancer from "@molecules/tabs-project-freelancer";
import TimePaymentTabContent from '@organisms/time-payment-tab-content';
import MillstonesPaymentTabContent from '@organisms/millstones-payment-tab-content';
import TermAndSettingsTabContent from '@organisms/Term-and-settings-tab-content';
import FeedbackTabContent from '@organisms/feedback-freelancer-tab-content';
import { BsThreeDots } from 'react-icons/bs';
import { Popover } from '@mui/material';
import IconLabel from '@molecules/icon-label';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
// import Box from "@mui/material/Box";

import RequestFundContent from '@organisms/request-fund-content';
import BonusModalContent from '@organisms/bonus-modal-content';
import EndContractContent from '@organisms/end-contract-content';
// import AddMilstoneContent from "@organisms/add-milstone-content";

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 1064,
	bgcolor: 'background.paper',
	borderRadius: '15px',
	boxShadow: 24,
	p: 4,
};
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
				<Box sx={{ p: 0 }}>
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

const HireFreelancerHome: React.FC<any> = () => {
	// const [index, setIndex] = useState<number>(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const [openFund, setOpenFund] = React.useState(false);
	const [openBonus, setOpenBonus] = React.useState(false);
	const [openEndContract, setOpenEndContract] = React.useState(false);
	const handleOpenFund = () => setOpenFund(true);
	const handleOpenBonus = () => setOpenBonus(true);
	const handleOpenEndContract = () => setOpenEndContract(true);
	const handleCloseFund = () => setOpenFund(false);
	const handleCloseBonus = () => setOpenBonus(false);
	const handleCloseEndContract = () => setOpenEndContract(false);
	// const handleChange = (event: any, newValue: any): void => {
	//   setIndex(newValue);
	// };
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	const StyledBadge = styled(Badge)(({ theme }: any) => ({
		'& .MuiBadge-badge': {
			backgroundColor: '#E904BC',
			color: '#E904BC',
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			top: '-14px',
			right: '3px',
			height: '20px',
			width: '20px',
			borderRadius: '50%',
			'&::after': {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				borderRadius: '50%',
				animation: 'ripple 1.2s infinite ease-in-out',
				border: '1px solid currentColor',
				content: '""',
			},
		},
		'@keyframes ripple': {
			'0%': {
				transform: 'scale(.8)',
				opacity: 1,
			},
			'100%': {
				transform: 'scale(2.4)',
				opacity: 0,
			},
		},
	}));
	const [value, setValue] = React.useState(0);

	const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	return (
		<>
			<h2 className="text-primary text-[30px] font-bold">
				Translation Service - English to Hebrew:
			</h2>
			<div className="mt-[25px]">
				<div className="p-[30px] rounded-lg custom-box-shadow-freelancer">
					<div className="flex flex-wrap xl:justify-between ">
						<div className="flex items-center gap-2">
							<StyledBadge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								variant="dot"
							>
								<AvatarAtom
									alt="Remy Sharp"
									src="/images/freelancer-pro.png"
									className="h-full w-full"
									variant="rounded"
								/>
							</StyledBadge>
							<div>
								<div className="flex gap-2 items-center">
									<h2 className="text-[30px] font-semibold">Thomas Hellies</h2>
									<p className="bg-primary text-white text-[14px] px-2 py-1 rounded-md">
										Rookie
									</p>
								</div>
								<h5 className="text-lg">
									United Kingdom <span className="ml-2">10:00 AM</span>
								</h5>
								<div className="flex items-center gap-2">
									<div className="border border-solid border-primary rounded-full">
										<div className="bg-primary w-4 h-4 rounded-full m-1"></div>
									</div>
									<h1 className="text-[50px] font-semibold">4.9</h1>
									<p className="text-base text-[#8399A4]">My Score</p>
								</div>
							</div>
						</div>
						<div className="flex gap-3 sm:mt-[20px] xl:mt-0">
							<div>
								<Button
									value="Active Next Milestone"
									className="text-white text-base 2xl:text-xl shadow-none rounded-md bg-primary capitalize px-4 py-2.5"
									color="primary"
								/>
							</div>
							<div>
								<Button
									value="Give Bonus"
									className="text-base 2xl:text-xl rounded-md shadow-none bg-white border border-solid border-[#E6E6E6] capitalize px-4 py-2.5 text-black"
									color="primary"
									onClick={handleOpenBonus}
								/>
							</div>
							<Modal
								aria-labelledby="transition-modal-title"
								aria-describedby="transition-modal-description"
								open={openBonus}
								onClose={handleCloseBonus}
								closeAfterTransition
								BackdropComponent={Backdrop}
								BackdropProps={{
									timeout: 500,
								}}
							>
								<Fade in={openBonus}>
									<Box sx={style}>
										<BonusModalContent handleCloseBonus={handleCloseBonus} />
									</Box>
								</Fade>
							</Modal>
							<div>
								<Button
									value="End Contract"
									className="text-base 2xl:text-xl rounded-md shadow-none bg-white border border-solid border-[#E6E6E6] capitalize px-4 py-2.5 text-black"
									color="primary"
									onClick={handleOpenEndContract}
								/>
							</div>
							<Modal
								aria-labelledby="transition-modal-title"
								aria-describedby="transition-modal-description"
								open={openEndContract}
								onClose={handleCloseEndContract}
								closeAfterTransition
								BackdropComponent={Backdrop}
								BackdropProps={{
									timeout: 500,
								}}
							>
								<Fade in={openEndContract}>
									<Box sx={style}>
										<EndContractContent
											handleCloseEndContract={handleCloseEndContract}
										/>
									</Box>
								</Fade>
							</Modal>
						</div>
					</div>
					<div className="pt-[30px] relative">
						<Box sx={{ width: '100%' }}>
							<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
								<Tabs
									value={value}
									onChange={handleChangeTabs}
									aria-label="basic tabs example"
									className="hire-freelancer-tabs"
								>
									<Tab
										label={<label>Time & Payments</label>}
										{...a11yProps(0)}
									/>
									<Tab
										label="Millstones & Payments"
										{...a11yProps(1)}
									/>
									<Tab
										label="Messages & Files"
										{...a11yProps(2)}
									/>
									<Tab
										label="Work Diary"
										{...a11yProps(3)}
									/>
									<Tab
										label="Terms & Setting"
										{...a11yProps(4)}
									/>
									<Tab
										label="Feedback"
										{...a11yProps(5)}
									/>
									<Tab
										label={
											<BsThreeDots
												className=" text-gray-500 text-[40px] cursor-pointer"
												onClick={handleClick}
											/>
										}
										className="dot-settings"
										{...a11yProps(6)}
									/>
								</Tabs>
							</Box>
							<TabPanel
								value={value}
								index={0}
							>
								<TimePaymentTabContent />
							</TabPanel>
							<TabPanel
								value={value}
								index={1}
							>
								<MillstonesPaymentTabContent />
							</TabPanel>
							<TabPanel
								value={value}
								index={2}
							>
								<div>Messages & Files</div>
							</TabPanel>
							<TabPanel
								value={value}
								index={3}
							>
								<div>Work Diary</div>
							</TabPanel>
							<TabPanel
								value={value}
								index={4}
							>
								<TermAndSettingsTabContent />
							</TabPanel>
							<TabPanel
								value={value}
								index={5}
							>
								<FeedbackTabContent />
							</TabPanel>
						</Box>

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
							<div className="py-2 w-auto shadow-lg">
								<IconLabel
									mainClass="px-3 py-1 hover:bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out flex items-center"
									tooltipProps={{ open: false }}
									labelValue="View original job posting"
									iconContanerClass="text-lg w-6"
									lableClass={{
										root: `text-gray-700 tracking-tighter text-base 2xl:text-xl ml-2`,
									}}
									iconComponent={
										<img
											alt="icon"
											src="/images/icon/push-pin.svg"
											className="w-4 mt-1 ml-1"
										/>
									}
								/>

								<IconLabel
									mainClass="px-3 py-1 hover:bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out flex items-center"
									tooltipProps={{ open: false }}
									labelValue="View original proposals"
									iconContanerClass="text-lg w-6"
									lableClass={{
										root: `text-gray-700 tracking-tighter text-base 2xl:text-xl ml-2`,
									}}
									iconComponent={
										<img
											alt="icon"
											src="/images/icon/proposals.svg"
											className="w-4 mt-1 ml-1"
										/>
									}
								/>

								<IconLabel
									mainClass="px-3 py-1 hover:bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out flex items-center"
									tooltipProps={{ open: false }}
									labelValue="Thomas Hellies profile"
									iconContanerClass="text-lg w-6"
									lableClass={{
										root: `text-gray-700 tracking-tighter text-base 2xl:text-xl ml-2`,
									}}
									iconComponent={
										<img
											alt="icon"
											src="/images/icon/profile.svg"
											className="w-4 mt-1 ml-1"
										/>
									}
								/>
								<IconLabel
									mainClass="px-3 py-1 hover:bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out flex items-center"
									tooltipProps={{ open: false }}
									labelValue="Request a refund"
									iconContanerClass="text-lg w-6"
									lableClass={{
										root: `text-gray-700 tracking-tighter text-base 2xl:text-xl ml-2`,
									}}
									onClick={handleOpenFund}
									iconComponent={
										<img
											alt="icon"
											src="/images/icon/money-back.svg"
											className="w-4 mt-1 ml-1"
										/>
									}
								/>
								<Modal
									aria-labelledby="transition-modal-title"
									aria-describedby="transition-modal-description"
									open={openFund}
									onClose={handleCloseFund}
									closeAfterTransition
									BackdropComponent={Backdrop}
									BackdropProps={{
										timeout: 500,
									}}
								>
									<Fade in={openFund}>
										<Box sx={style}>
											<div className="overflow-y-auto">
												<RequestFundContent
													handleCloseFund={handleCloseFund}
												/>
											</div>
										</Box>
									</Fade>
								</Modal>
								<IconLabel
									mainClass="px-3 py-1 hover:bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out flex items-center"
									tooltipProps={{ open: false }}
									labelValue="Rehire Thomas Hellies"
									iconContanerClass="text-lg w-6"
									lableClass={{
										root: `text-gray-700 tracking-tighter text-base 2xl:text-xl ml-2`,
									}}
									iconComponent={
										<img
											alt="icon"
											src="/images/icon/cyber-security.svg"
											className="w-4 mt-1 ml-1"
										/>
									}
								/>
								<IconLabel
									mainClass="px-3 py-1 hover:bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out flex items-center"
									tooltipProps={{ open: false }}
									labelValue="Request Public Feedback"
									iconContanerClass="text-lg w-6"
									lableClass={{
										root: `text-gray-700 tracking-tighter text-base 2xl:text-xl ml-2`,
									}}
									iconComponent={
										<img
											alt="icon"
											src="/images/icon/request-feedback.svg"
											className="w-4 mt-1 ml-1"
										/>
									}
								/>
							</div>
						</Popover>
					</div>
				</div>
			</div>
		</>
	);
};
export default HireFreelancerHome;
