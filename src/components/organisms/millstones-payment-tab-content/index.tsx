// import AvatarAtom from "@atoms/avatar";
import Button from '@atoms/button';
import SingleMiniTabContent from '@molecules/single-mini-tab-content';
import GenericTable from '@organisms/generic-table';
import SingleRemainMilestone from '@organisms/single-remian-milstone';
import React from 'react';
import { AiOutlineSchedule } from 'react-icons/ai';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AddMilstoneContent from '@organisms/add-milstone-content';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 670,
	bgcolor: 'background.paper',
	borderRadius: '15px',
	boxShadow: 24,
	p: 4,
};
// interface MillstonesPaymentTabContentProps {
//   // handleOpenFund: any;
// }
const MillstonesPaymentTabContent: React.FC<any> = () => {
	const [openAddMilstone, setOpenAddMilstone] = React.useState(false);
	const handleOpenAddMilstone = () => setOpenAddMilstone(true);
	const handleCloseAddMilstone = () => setOpenAddMilstone(false);
	return (
		<>
			<div className="bg-white text-base">
				<div className="flex justify-between py-[20px] px-4">
					<SingleMiniTabContent
						spentWorkTime="Budget"
						time="$270.00"
					/>
					<SingleMiniTabContent
						spentWorkTime="In Escrow"
						time="$0.00"
					/>
					<SingleMiniTabContent
						spentWorkTime="Milestone Paid"
						time="$90"
					/>
					<SingleMiniTabContent
						spentWorkTime="Remaining"
						time="$180.00"
					/>
					<SingleMiniTabContent
						spentWorkTime="Total Payments"
						time="$90.00"
					/>
				</div>
				<hr />
				<div className="px-4 mt-[30px]">
					<div className="flex justify-between items-center pb-[30px]">
						<h3 className="text-primary text-[22px] font-semibold ">
							Remaining Milestones
						</h3>
						<div>
							<Button
								value="Add or Edit Milestones"
								className="text-base 2xl:text-xl rounded-md shadow-none bg-[#F5F5F5] border border-solid border-[#E6E6E6] capitalize px-4 py-2.5 text-black"
								color="primary"
								onClick={handleOpenAddMilstone}
							/>
							<Modal
								aria-labelledby="transition-modal-title"
								aria-describedby="transition-modal-description"
								open={openAddMilstone}
								onClose={handleCloseAddMilstone}
								closeAfterTransition
								BackdropComponent={Backdrop}
								BackdropProps={{
									timeout: 500,
								}}
							>
								<Fade in={openAddMilstone}>
									<Box sx={style}>
										<AddMilstoneContent
											handleCloseAddMilstone={handleCloseAddMilstone}
										/>
									</Box>
								</Fade>
							</Modal>
						</div>
					</div>
					<hr />
					<SingleRemainMilestone
						millstoneNumber="2"
						millstoneHeader="12 next pages"
						millstoneDetails="$90.00"
						payingStatus="(Not funded)"
						dueTime="Due Oct 28"
						isImgIcon={false}
						isMillstoneStatus={true}
						// iconImage="/images/icon/lightbulb.svg"
					/>
					<hr />
					<SingleRemainMilestone
						millstoneNumber="3"
						millstoneHeader="6 last pages + drawings"
						millstoneDetails="Based on your current remaining milestones, you have $180.00 of budget left to allocate to new or existing milestones."
						iconImage="/images/icon/lightbulb.svg"
						millstoneDetailsClass="text-[18px] text-[#999999] mt-[20px] mr-[150px] ml-[30px]"
						isImgIcon={true}
						isMillstoneStatus={false}
					/>
					<hr />

					<div className="mt-[30px]">
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon className="text-primary text-4xl" />}
								aria-controls="panel1a-content"
								id="panel1a-header"
								className="pl-0 shadow-none border-none"
							>
								<h3 className="text-primary text-[22px] font-semibold ">
									Completed milestones <span>(1)</span>
								</h3>
							</AccordionSummary>
							<AccordionDetails>
								<div>
									<SingleRemainMilestone
										millstoneNumber="1"
										millstoneHeader="12 first pages"
										millstoneDetails="$90.00"
										payingStatus="(paid)"
										millstoneDetailsClass="text-[18px] text-[#999999] mt-[20px] mr-[150px] ml-[40px]"
										isImgIcon={false}
										isMillstoneStatus={false}
										// iconImage="/images/icon/lightbulb.svg"
									/>
								</div>
							</AccordionDetails>
						</Accordion>
					</div>
					<div className="flex justify-between mt-[50px] items-center pb-[50px]">
						<h3 className="text-primary text-[22px] font-semibold">
							Additional payments and credits
						</h3>
						<div className="flex items-center gap-5">
							<p className="font-semibold font-base">
								Last 30 days: <span>$0.00</span>{' '}
							</p>
							<AiOutlineSchedule className="text-4xl text-primary" />
						</div>
					</div>
					<GenericTable
						headers={['Date', 'Description', 'Charge', 'Invoice']}
						rows={[
							{
								Date: 'Date',
								Description: 'Description',
								Charge: 'Charge',
								Invoice: 'Invoice',
							},
						]}
					/>
				</div>
			</div>
		</>
	);
};

export default MillstonesPaymentTabContent;
