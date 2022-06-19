import React from 'react';
import ChartActivitiesNFT from '@organisms/tab-content-chart-activities';

const TabContentMainNFTSale: React.FC<any> = () => {
	return (
		<div>
			<div className="">
				<ChartActivitiesNFT />
			</div>
		</div>
	);
};

export default React.memo(TabContentMainNFTSale);
