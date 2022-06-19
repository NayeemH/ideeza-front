import CostingPhase from '@organisms/tab-content-costing-phase';
import TabsProjectGeneral from '@organisms/tabs-projects-general-info';
import React, { useState } from 'react';
import { AiOutlineShareAlt, AiOutlineUser } from 'react-icons/ai';
import { IoRocketOutline } from 'react-icons/io5';

const TabContentCost: React.FC<any> = () => {
	const [tabContenCost, setTabContenCost] = useState<number>(0);
	const handleChangeTabContentCost = (event: any, newValue: any): void => {
		// console.log('handle Change team', event.target.value)
		setTabContenCost(newValue);
	};
	return (
		<div className="mt-[20px]">
			<TabsProjectGeneral
				tabsClasses="border-none tab-cost-container"
				tabClasses="bg-white focus:bg-white focus:text-primary text-xl tracking-tight eina-font-sb03 border-none mr-2 transform-none py-1 px-0"
				handleChange={handleChangeTabContentCost}
				selected="text-[#ff09d0]"
				index={tabContenCost}
				tabsData={[
					{
						name: (
							<div className="flex items-center">
								<AiOutlineUser className="text-3xl mr-1" />
								<div className="">Development Phase</div>
							</div>
						),
						textColor: 'primary',
						/****TODO*****/
						component: <CostingPhase />,
					},
					{
						name: (
							<div className="flex items-center">
								<IoRocketOutline className="text-3xl mr-1" />
								<div className="">Prototyping Phase</div>
							</div>
						),
						textColor: 'primary',
						component: (
							<>
								<CostingPhase />
							</>
						),
					},
					{
						name: (
							<div className="flex items-center">
								<AiOutlineShareAlt className="text-3xl mr-1" />
								<div className="">Production Phase</div>
							</div>
						),
						textColor: 'primary',
						component: (
							<>
								<CostingPhase />
							</>
						),
					},
				]}
			/>
		</div>
	);
};

export default React.memo(TabContentCost);
