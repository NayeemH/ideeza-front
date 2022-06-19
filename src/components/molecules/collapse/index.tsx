import Label from '@atoms/label';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { useState } from 'react';

function Collapse(props: any) {
	const [expanded, setExpanded] = useState<any>(false);

	const handleChange = (panel: any) => (event: any, isExpanded: any) => {
		setExpanded(isExpanded ? panel : false);
	};
	const { collapseData } = props;
	return (
		<div className={`space-y-4 pt-10`}>
			{collapseData?.map((v: any, k: any) => {
				return (
					<Accordion
						key={k}
						expanded={expanded === `${v.id}`}
						onChange={handleChange(`${v.id}`)}
					>
						<AccordionSummary
							className="py-10"
							expandIcon={
								<span className="text-gray-700 text-3xl">
									{expanded ? '-' : '+'}
								</span>
							}
						>
							<Label
								value={
									<span
										className={`${
											expanded ? 'text-primary' : 'text-gray-700'
										} texl-lg 2xl:text-2xl  font-semibold`}
									>
										{k + 1}. {v.name}
									</span>
								}
							/>
						</AccordionSummary>

						<AccordionDetails>
							<Label
								className="p-2 tracking-tight  text-gray-700  text-base 2xl:text-xl leading-7"
								value={v.detail}
							/>
						</AccordionDetails>
					</Accordion>
				);
			})}
		</div>
	);
}
export default Collapse;
