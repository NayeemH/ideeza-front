import Tab from '@atoms/tab';
import TabPanel from '@atoms/tab-panel';
import Tabs from '@atoms/tabs';
import TwoLabels from '@molecules/two-levels';
import React from 'react';

function TransactionTabs(props: any) {
	const { tabsData, tabsClasses, handleChange, tabClasses, index } = props;

	return (
		<div className={`w-full`}>
			<div className="md:flex justify-between w-full items-center">
				<Tabs
					value={index}
					onChange={handleChange}
					classes={{ root: `${tabsClasses}` }}
					aria-label="simple tabs example"
				>
					{tabsData.map((value: any, key: any) => {
						return (
							<Tab
								classes={{ root: `${tabClasses} outline-none` }}
								label={value.name}
								index={key}
								key={key}
							/>
						);
					})}
				</Tabs>
				<div className="flex flex-col items-end w-full pb-10">
					<TwoLabels
						mainClass="flex items-center space-x-4"
						value="Your balance:"
						value2="$50"
						labelClass="text-[#333333] texl-lg 2xl:text-2xl tracking-tight font-sans"
						labelClass2="text-[#333333] texl-lg 2xl:text-2xl tracking-tight font-sans font-semibold"
					/>
					<TwoLabels
						mainClass="flex items-center space-x-5 pt-1"
						value="Fixed price deposits (Not included in balance):"
						value2="$23"
						labelClass="text-[#333333] text-base 2xl:text-xl tracking-tight font-sans"
						labelClass2="text-primary text-base 2xl:text-xl tracking-tight font-sans"
					/>
					<TwoLabels
						mainClass="flex items-center space-x-2 pt-2"
						value="Paid Out:"
						value2="150$"
						labelClass="text-[#333333] text-base 2xl:text-xl tracking-tight font-sans"
						labelClass2="text-[#333333] text-base 2xl:text-xl tracking-tight font-sans font-bold"
					/>
				</div>
			</div>
			{tabsData.map((value: any, key: any) => {
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
}
TransactionTabs.defaultProps = {
	tabsClasses: 'w-full',
	tabClasses: 'border transform-none',
	textColor: 'text-primary',
};
export default TransactionTabs;
