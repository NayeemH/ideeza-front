import Tab from '@atoms/tab';
import TabPanel from '@atoms/tab-panel';
import { TabContext } from '@mui/lab';

import React from 'react';

import Tabs from '@atoms/tabs';
import { AppBar } from '@mui/material';
// import Label from "@atoms/label";

type tabsData = {
	name?: any;
	component?: JSX.Element;
	textColor?: string;
};
interface IProps {
	tabsData: tabsData[];
	tabsClasses: string;
	handleChange: any;
	tabClasses: string;
	index: number;
	icon?: unknown;
	selected?: unknown;
	indicatorColor: string;
	scrollable?: unknown;
}
function TabsMoleculeApp(props: IProps) {
	const {
		tabsData,
		tabsClasses,
		handleChange,
		tabClasses,
		index,
		icon,
		selected,
		indicatorColor,
		// hasSideAppBarContent,
	} = props;

	return (
		<div className={`w-full`}>
			<TabContext value={index.toString() || ' '}>
				<AppBar
					className="bg-transparent col-span-3 md:col-span-5"
					position="static"
					color="transparent"
					elevation={0}
				>
					<Tabs
						// for underline of tabs indicatorColor="white"
						variant="fullWidth"
						value={index}
						indicatorColor={indicatorColor}
						onChange={handleChange}
						classes={{ root: `${tabsClasses}` }}
						aria-label="simple tabs example"
					>
						{tabsData.map((value: any, key: number) => {
							return (
								<Tab
									key={key}
									classes={{
										root: `${tabClasses} outline-none w-full`,
										selected: `${selected} text-white  `,
									}}
									label={value.name}
									{...a11yProps(key)}
									icon={icon}
								></Tab>
							);
						})}
					</Tabs>
				</AppBar>
				{tabsData.map((value: tabsData, key: number) => {
					return (
						<TabPanel
							value={index}
							key={key}
							index={key}
						>
							{value.component}
						</TabPanel>
					);
				})}
			</TabContext>
		</div>
	);
}
TabsMoleculeApp.defaultProps = {
	tabsClasses: 'w-full',
	tabClasses: 'border transform-none whitespace-nowrap tracking-tight py-3',
	textColor: 'text-white',
	indicatorColor: 'primary',
	selected: 'border-b-2',
};
export default TabsMoleculeApp;
function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
