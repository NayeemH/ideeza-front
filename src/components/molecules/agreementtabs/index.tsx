import Tab from '@atoms/tab';
import TabPanel from '@atoms/tab-panel';
import Tabs from '@atoms/tabs';
import React from 'react';
function AgreementTabs(props: any) {
	const { tabsData, tabsClasses, handleChange, index } = props;
	return (
		<div
			className={`w-full grid  grid-cols-12 lg:grid-cols-8 mt-[30px] lg:mt-0 lg:pt-[70px] 2xl:px-[300px] mb-[115px]`}
		>
			<div className=" col-span-12 lg:col-span-2 bg-gray-100 p-4 py-5 rounded-lg w-full lg:mb-0 mb-[30px]">
				<Tabs
					value={index}
					onChange={handleChange}
					classes={{
						root: `${tabsClasses} flex flex-col item-start h-full agrement_tabs`,
					}}
					aria-label="simple tabs example"
				>
					{tabsData.map((value: any, key: any) => {
						return (
							<Tab
								key={key}
								classes={{
									root: `w-full max-w-md outline-none transform-none font-sans text-lg tracking-tight`,
								}}
								label={value.name}
								index={key}
							/>
						);
					})}
				</Tabs>
			</div>
			{tabsData.map((value: any, key: any) => {
				return (
					<TabPanel
						key={key}
						className="w-full text-[#787878] text-base leading-7  col-span-12 lg:col-span-6 p-3 lg:pl-[60px] py-5 md:px-5 overflow-y-auto pr-3"
						value={index}
						index={key}
					>
						{value.component}
					</TabPanel>
				);
			})}
		</div>
	);
}
AgreementTabs.defaultProps = {
	tabsClasses: 'w-full',
	tabClasses: 'border transform-none',
	textColor: 'text-primary',
};
export default AgreementTabs;
