import React, { useState } from 'react';
import TabsMoleculeAbout from '@molecules/tabs-about';
import UserTechnicianServiceProvidersTable from '@organisms/service-provider/transactions/UserTechnicianServiceProvidersTable';
import { Dispute } from '@organisms/service-provider/transactions/Dispute';

const ServiceProviderTransactions = () => {
	const [index, setIndex] = useState<number>(0);
	const [dispute, setDispute] = useState<boolean>(false);
	const handleChange = (event: any, newValue: any): void => {
		setIndex(newValue);
	};
	return (
		<div className="flex items-start">
			{!dispute ? (
				<TabsMoleculeAbout
					tabsClasses="2xl:w-1/5 xl:w-2/5 lg:w-2/6 md:w-1/2 "
					tabClasses="tracking-tight text-xl md:text-3xl font-bold mb-10 md:mb-20 transform-none text-gray-600 focus:text-primary"
					indicatorColor="primary"
					handleChange={handleChange}
					index={index}
					hasSideAppBarContent={true}
					tabsData={[
						{
							name: 'My Orders',
							textColor: 'primary',
							component: (
								<UserTechnicianServiceProvidersTable
									setDispute={() => setDispute((prev) => !prev)}
								/>
							),
						},
						{
							name: 'System',
							textColor: 'primary',
							component: (
								<UserTechnicianServiceProvidersTable
									setDispute={() => setDispute((prev) => !prev)}
								/>
							),
						},
					]}
				/>
			) : (
				<Dispute />
			)}
			{/*  */}
		</div>
	);
};

export default ServiceProviderTransactions;
