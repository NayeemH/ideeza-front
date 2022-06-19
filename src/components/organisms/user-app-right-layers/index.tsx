import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Remove, Add } from '@mui/icons-material';
import AppDragBtn from '@molecules/project-app-drag-btn';

const UserAppLayers = () => {
	{
		/****** Start For Layers Design *******/
	}

	const [expandedFrist, setExpandedFrist] = React.useState<string | false>(false);
	const [expandedSecond, setExpandedSecond] = React.useState<string | false>(false);
	const [expandedThird, setExpandedThird] = React.useState<string | false>(false);
	const [expandedFour, setExpandedFour] = React.useState<string | false>(false);
	const [expandedFive, setExpandedFive] = React.useState<string | false>(false);

	const handleChangeFrist =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpandedFrist(isExpanded ? panel : false);
		};
	const handleChangeSecond =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpandedSecond(isExpanded ? panel : false);
		};
	const handleChangeThird =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpandedThird(isExpanded ? panel : false);
		};
	const handleChangeFour =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpandedFour(isExpanded ? panel : false);
		};
	const handleChangeFive =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpandedFive(isExpanded ? panel : false);
		};

	{
		/****** End For Layers Design *******/
	}
	return (
		<>
			{/****** For Layers Design *******/}
			<div className="layers">
				<div className="p-[35px]">
					<h5 className="text-[20px] text-center eina-font-sb03 text-[#666666]">
						Layers
					</h5>
				</div>

				<div className="custom-project-app-right custom-project-app-left">
					<Accordion
						expanded={expandedFrist === 'panel1'}
						onChange={handleChangeFrist('panel1')}
					>
						<AccordionSummary
							// expandIcon={<Remove />}
							expandIcon={expandedFrist === 'panel1' ? <Remove /> : <Add />}
							// expandIcon={<Remove/>}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<AppDragBtn
								img="/images/icon/Rectangle-btn.svg"
								name="Button 1"
							/>
						</AccordionSummary>
						<AccordionDetails>
							<Accordion
								expanded={expandedSecond === 'panel2'}
								onChange={handleChangeSecond('panel2')}
							>
								<AccordionSummary
									// expandIcon={<Remove />}
									expandIcon={expandedSecond === 'panel2' ? <Remove /> : <Add />}
									// expandIcon={<Remove />}
									aria-controls="panel2ab-content"
									id="panel2ab-header"
									className="pr-0"
								>
									<AppDragBtn
										// img="/images/icon/Rectangle-btn.svg"
										name="Properties"
										className="ml-2 font-semibold"
									/>
								</AccordionSummary>
								<AccordionDetails>
									<div className="ml-8">
										<div className="flex items-center">
											<div className="w-9">
												<div className="w-4 h-4 bg-primary rounded-[2px]"></div>
											</div>
											<h5 className="text-base text-[#666666]">Color</h5>
										</div>
										<div className="flex ">
											<div className="w-9">
												{' '}
												<div className="text-base text-[#666666] font-semibold">
													10
												</div>
											</div>

											<h5 className="text-base text-[#666666]">
												Border radius
											</h5>
										</div>
										<div className="flex ">
											<div className="w-9">
												<div className="text-base text-[#666666] font-semibold">
													120
												</div>
											</div>

											<h5 className="text-base text-[#666666]">Width(px)</h5>
										</div>
										<div className="flex ">
											<div className="w-9">
												<div className="text-base text-[#666666] font-semibold">
													110
												</div>
											</div>

											<h5 className="text-base text-[#666666]">Height(px)</h5>
										</div>
									</div>
								</AccordionDetails>
							</Accordion>
							<Accordion
								expanded={expandedThird === 'panel3'}
								onChange={handleChangeThird('panel3')}
							>
								<AccordionSummary
									// expandIcon={<Remove />}
									expandIcon={expandedThird === 'panel3' ? <Remove /> : <Add />}
									// expandIcon={<Remove />}
									aria-controls="panel3ab-content"
									id="panel3ab-header"
									className="pr-0"
								>
									<AppDragBtn
										// img="/images/icon/Rectangle-btn.svg"
										name="Inside layers"
										className="ml-2 text-base text-[#666666] "
									/>
								</AccordionSummary>
								<AccordionDetails>
									<div className="pl-10">content</div>
								</AccordionDetails>
							</Accordion>
						</AccordionDetails>
					</Accordion>
					<Accordion
						expanded={expandedFour === 'panel4'}
						onChange={handleChangeFour('panel4')}
					>
						<AccordionSummary
							// expandIcon={<Remove />}
							expandIcon={expandedFour === 'panel4' ? <Remove /> : <Add />}
							// expandIcon={<Remove />}
							aria-controls="panel4ab-content"
							id="panel4ab-header"
						>
							<AppDragBtn
								img="/images/icon/text-documents.svg"
								name="Text Box"
								className="ml-2 text-base text-[#666666] "
							/>
						</AccordionSummary>
						<AccordionDetails>
							<div className="pl-14">content</div>
						</AccordionDetails>
					</Accordion>
					<Accordion
						expanded={expandedFive === 'panel5'}
						onChange={handleChangeFive('panel5')}
					>
						<AccordionSummary
							// expandIcon={<Remove />}
							expandIcon={expandedFive === 'panel5' ? <Remove /> : <Add />}
							// expandIcon={<Remove />}
							aria-controls="panel5ab-content"
							id="panel5ab-header"
						>
							<AppDragBtn
								img="/images/icon/image-icon.svg"
								name="Image"
								className="ml-2 text-base text-[#666666] "
							/>
						</AccordionSummary>
						<AccordionDetails>
							<div className="pl-14">content</div>
						</AccordionDetails>
					</Accordion>
				</div>
			</div>
		</>
	);
};

export default UserAppLayers;
