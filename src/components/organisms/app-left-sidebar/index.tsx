import SearchInput from '@molecules/search-input';
import React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useRouter } from 'next/router';
import AppDragBtn from '@molecules/project-app-drag-btn';
import Draggable from 'react-draggable';

const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion
		disableGutters
		elevation={0}
		square
		{...props}
	/>
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
	},
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor:
		theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const AppleftSideBar = (props: any) => {
	const history = useRouter();
	const [expanded, setExpanded] = React.useState<string | false>('panel1');
	const { setIsAppSettings, setIsAppMain } = props;

	const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};
	return (
		<>
			<div className="">
				<div className="p-[35px]">
					<div className="flex items-center justify-center mb-[35px]">
						<img
							src="/images/icon/back-icon.svg"
							className="mr-[35px] cursor-pointer"
							alt=""
							onClick={() => {
								history.back();
							}}
						/>
						<div className="flex">
							<img
								src="/images/icon/-e-info-icon.svg"
								className="mr-1"
								alt=""
							/>
							<h5 className="text-[20px] eina-font-sb03 text-[#666666]">Infos</h5>
						</div>
					</div>
					<SearchInput
						placeholder="search"
						className="border"
						inputClass="text-base 2xl:text-xl py-2"
					/>
				</div>
				<hr />
				<div className="p-[35px] custom-project-app-left ">
					<Accordion
						expanded={expanded === 'panel2'}
						onChange={handleChange('panel2')}
					>
						<AccordionSummary
							aria-controls="panel2d-content"
							id="panel2d-header"
							className="bg-transparent border-none shadow-none"
						>
							<p
								onClick={() => {
									setIsAppSettings(true);
									setIsAppMain(false);
									// setIsMainScreen(false);
								}}
								className="hover:text-primary focus:text-primary text-[18px] text-[#666666]"
							>
								App info
							</p>
						</AccordionSummary>
						<AccordionDetails>
							{/* <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography> */}
						</AccordionDetails>
					</Accordion>
					<Accordion
						expanded={expanded === 'panel1'}
						onChange={handleChange('panel1')}
					>
						<AccordionSummary
							aria-controls="panel1d-content"
							id="panel1d-header"
							className="bg-transparent border-none shadow-none"
						>
							<p
								onClick={() => {
									setIsAppSettings(false);
									setIsAppMain(true);
									// setIsMainScreen(false);
								}}
								className="text-[18px] text-[#666666] hover:text-primary focus:text-primary"
							>
								User interface
							</p>
						</AccordionSummary>
						<AccordionDetails>
							<div className="pl-[30px]">
								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/Rectangle-btn.svg"
												name="Button"
											/>
										</div>
									</Draggable>
								</div>
								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/tick-inside-circle.svg"
												name="Checkbox"
											/>
										</div>
									</Draggable>
								</div>
								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/calendar.svg"
												name="Datepicker"
											/>
										</div>
									</Draggable>
								</div>
								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/image-icon.svg"
												name="Image"
											/>
										</div>
									</Draggable>
								</div>
								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/price-tag.svg"
												name="Label"
											/>
										</div>
									</Draggable>
								</div>

								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/app-search.svg"
												name="Listpicker"
											/>
										</div>
									</Draggable>
								</div>
								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/app-list.svg"
												name="Listview"
											/>
										</div>
									</Draggable>
								</div>

								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/notifications-bell-button.svg"
												name="Notifier"
											/>
										</div>
									</Draggable>
								</div>
								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/app-password.svg"
												name="Passwordtextbox"
											/>
										</div>
									</Draggable>
								</div>
								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/app-levels.svg"
												name="Slider"
											/>
										</div>
									</Draggable>
								</div>

								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/spinner-of-dots.svg"
												name="Spinner"
											/>
										</div>
									</Draggable>
								</div>
								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/text-documents.svg"
												name="Textbox"
											/>
										</div>
									</Draggable>
								</div>
								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/alarm-clock.svg"
												name="Timepicker"
											/>
										</div>
									</Draggable>
								</div>

								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/app-language.svg"
												name="Webviewer"
											/>
										</div>
									</Draggable>
								</div>
								<div className="pb-[24px]">
									<Draggable>
										<div>
											<AppDragBtn
												img="/images/icon/app-layout.svg"
												name="Layouts"
											/>
										</div>
									</Draggable>
								</div>
							</div>
						</AccordionDetails>
					</Accordion>
				</div>
				<hr />
				<div className="p-[35px]">
					<div className="flex cursor-pointer mb-[20px]">
						<img
							src="/images/icon/-e-info-icon.svg"
							className="mr-[30px]"
							alt=""
						/>
						<h5 className="text-[20px] eina-font-sb03 text-[#666666]">Help ?</h5>
					</div>
					<div className="flex cursor-pointer mb-[20px]">
						<img
							src="/images/icon/app-settings.svg"
							className="mr-[30px]"
							alt=""
						/>
						<h5 className="text-[20px] eina-font-sb03 text-[#666666]">Settings</h5>
					</div>
					<div className="flex cursor-pointer mb-[20px]">
						<img
							src="/images/icon/app-support.svg"
							className="mr-[30px]"
							alt=""
						/>
						<h5 className="text-[20px] eina-font-sb03 text-[#666666]">
							Contact Support
						</h5>
					</div>
				</div>
			</div>
		</>
	);
};

export default AppleftSideBar;
