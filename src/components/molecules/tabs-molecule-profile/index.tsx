import Tab from '@atoms/tab';
import TabPanel from '@atoms/tab-panel';
import Tabs from '@atoms/tabs';
import { AppBar } from '@mui/material';
import React from 'react';
function TabsMoleculeProfile(props: any) {
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
		<div className={`w-full px-4 xl:px-[5px] 2xl:px-[30px]`}>
			<AppBar
				className="bg-transparent"
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
					classes={{
						root: `${tabsClasses}`,
					}}
					aria-label="simple tabs example"
					allowScrollButtonsMobile
					scrollButtons="auto"
				>
					{tabsData.map((value: any, key: any) => {
						return (
							<Tab
								classes={{
									root: `${tabClasses} outline-none  w-full`,
									selected: `${selected} text-primary border-b-2  border-primary`,
									// selected: `${selected} text-primary tx-primary-color custom-border-color cus-border-bottom-none border-solid border-t-2 border-l-2 border-r-2 border-b-0`,
								}}
								key={key}
								label={value.name}
								{...a11yProps(key)}
								icon={icon}
							></Tab>
						);
					})}
				</Tabs>
			</AppBar>
			{tabsData.map((value: any, key: any) => {
				return (
					<TabPanel
						value={index}
						key={key}
						index={key}
					>
						<div className="tab-molecule-profile">{value.component}</div>
					</TabPanel>
				);
			})}
		</div>
	);
}
TabsMoleculeProfile.defaultProps = {
	tabsClasses: 'w-full ',
	tabClasses: 'transform-none whitespace-nowrap ',
	textColor: 'text-primary',
	indicatorColor: 'primary',
	selected: 'text-primary',
};
export default React.memo(TabsMoleculeProfile);
function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
