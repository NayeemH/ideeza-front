import React from 'react';
import Tab from '@atoms/tab';
import TabPanel from '@atoms/tab-panel';
import Tabs from '@atoms/tabs';
import { AppBar } from '@mui/material';
import Label from '@atoms/label';

interface TabsMoleculeAboutProps {
	tabsData: any;
	tabsClasses?: string;
	handleChange: (e?: any, value?: any) => void;
	tabClasses: string;
	index: number;
	icon?: React.ReactNode;
	selected?: string;
	indicatorColor?: any;
	textColor?: string;
	hasSideAppBarContent?: boolean;
	sideAppBarContent?: any;
	appbarClassName?: string;
}

const TabsMoleculeAbout: React.FC<TabsMoleculeAboutProps> = (props) => {
	const {
		tabsData,
		tabsClasses,
		handleChange,
		tabClasses,
		index,
		icon,
		selected = 'border border-b border-primary',
		indicatorColor,
		hasSideAppBarContent,
		sideAppBarContent,
		appbarClassName = 'bg-transparent col-span-3 md:col-span-6',
	} = props;

	return (
		<div className={`w-full`}>
			<div className={hasSideAppBarContent ? 'grid grid-cols-1 lg:grid-cols-8' : ''}>
				<AppBar
					className={appbarClassName}
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
										root: `${tabClasses} outline-none w-full text-gray-500`,
										selected: `${selected} `,
									}}
									label={value.name}
									{...a11yProps(key)}
									icon={icon}
								></Tab>
							);
						})}
					</Tabs>
				</AppBar>

				{hasSideAppBarContent &&
					(sideAppBarContent || (
						<div className="col-span-2 flex flex-col justify-start -mt-2 md:pr-4 min-w-fit">
							<div className="flex justify-between md:text-[25px] items-end leading-6 my-2">
								<Label value="Your Balance: " />
								<Label
									value="50$"
									className="font-semibold ml-2"
								/>
							</div>
							<div className="flex justify-between md:text-lg items-end leading-5 my-1 ">
								<Label value="Fixed price deposits (Not included in balance): " />
								<Label
									value="20$"
									className="font-semibold"
								/>
							</div>
							<div className="flex justify-between md:text-[22px] items-center">
								<Label value="Paid Out: " />
								<Label
									value="150$"
									className="font-semibold"
								/>
							</div>
						</div>
					))}
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
TabsMoleculeAbout.defaultProps = {
	tabsClasses: 'w-full',
	tabClasses: 'border transform-none whitespace-nowrap tracking-tight md:py-3',
	textColor: 'text-primary',
	indicatorColor: 'primary',
	selected: 'border-b-2',
};
export default React.memo(TabsMoleculeAbout);
function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
