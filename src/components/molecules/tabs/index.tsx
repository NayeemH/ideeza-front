import Tab from '@atoms/tab';
import TabPanel from '@atoms/tab-panel';
import { TabContext, TabList } from '@mui/lab';
import { AppBar } from '@mui/material';
import React from 'react';

type tabsData = {
	name?: any;
	component?: JSX.Element;
	textColor?: string;
};
interface IProps {
	tabsData: tabsData[];
	tabsRootClasses: string;
	tabsWrapClasses: string;
	tabsClasses: string;
	handleChange: any;
	tabClasses: string;
	index: number;
	icon?: unknown;
	selected?: unknown;
	indicatorColor: string;
	scrollable?: unknown;
}
function TabsMolecule(props: IProps) {
	const {
		tabsData,
		handleChange,
		tabsRootClasses,
		tabsWrapClasses,
		tabsClasses,
		tabClasses,
		index,
		icon,
		selected,
		scrollable,
	} = props;

	return (
		<div className={tabsRootClasses}>
			<TabContext value={index.toString() || ' '}>
				<AppBar
					className={tabsWrapClasses}
					position="static"
					color="transparent"
					elevation={0}
				>
					{
						<div className="hidden sm:block"></div> // TODO: don't Delete this line
					}
					<TabList
						// for underline of tabs indicatorColor="white"
						variant={scrollable ? 'scrollable' : 'fullWidth'}
						// value={index}
						indicatorColor={'primary'}
						classes={{ root: `${tabsClasses}` }}
						aria-label="simple tabs example"
						onChange={handleChange}
					>
						{tabsData.map((value: any, key: number) => {
							return (
								<Tab
									key={key}
									classes={{
										root: `${tabClasses} outline-none w-full ${
											key === index ? ' news-tabs-active' : ''
										}`,
										selected: `${selected}`,
									}}
									label={value.name}
									// {...a11yProps(key)}
									icon={icon}
									value={key.toString()}
								></Tab>
							);
						})}
					</TabList>
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
TabsMolecule.defaultProps = {
	tabsRootClasses: 'w-full',
	tabsWrapClasses: 'bg-transparent',
	tabsClasses: 'w-full',
	tabClasses: 'border transform-none whitespace-nowrap tracking-tight py-3',
	textColor: 'text-primary',
	indicatorColor: 'white',
	selected: 'text-primary border-primary tx-primary-color border-b-4 border-solid',
};
export default TabsMolecule;
// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }
