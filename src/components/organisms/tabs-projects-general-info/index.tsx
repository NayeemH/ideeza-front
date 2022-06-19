import React from 'react';
import Tab from '@atoms/tab';
import TabPanel from '@atoms/tab-panel';
import Tabs from '@atoms/tabs';
import { AppBar } from '@mui/material';

interface TabsProjectGeneralProps {
	tabsData: any;
	tabsClasses?: string;
	handleChange: (e?: any, value?: any) => void;
	tabClasses: string;
	index: number;
	icon?: React.ReactNode;
	selected?: string;
	indicatorColor?: any;
	textColor?: string;
	// hasSideAppBarContent?: boolean;
}

const TabsProjectGeneral: React.FC<TabsProjectGeneralProps> = (props) => {
	const {
		tabsData,
		tabsClasses,
		handleChange,
		tabClasses,
		index,
		icon,
		selected,
		indicatorColor,
	} = props;

	return (
		<div className={`w-full`}>
			<div>
				<AppBar
					className="bg-transparent col-span-3 md:col-span-6"
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
										root: `${tabClasses} outline-none  text-gray-500`,
										selected: `${selected} shadow-none custom-border-project-tab-selected`,
									}}
									label={value.name}
									{...a11yProps(key)}
									icon={icon}
								></Tab>
							);
						})}
					</Tabs>
				</AppBar>
			</div>
			{tabsData.map((value: any, key: number) => {
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
		</div>
	);
};
TabsProjectGeneral.defaultProps = {
	tabsClasses: 'w-full',
	tabClasses: 'border transform-none text-gray-500 whitespace-nowrap tracking-tight md:py-3',
	textColor: 'text-primary',
	indicatorColor: 'primary',
	selected: 'border-b-2',
};
export default React.memo(TabsProjectGeneral);
function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
