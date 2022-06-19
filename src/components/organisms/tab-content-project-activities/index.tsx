import Activity from '@molecules/activites';
import React from 'react';

const TabContentProjectActivities: React.FC<any> = (activities) => {
	return (
		<div className="mt-[30px]">
			<div className="max-h-52 min-h-32 overflow-y-auto">
				{activities?.length > 0 ? (
					activities?.map((val: any, index: any) => {
						return (
							<Activity
								key={index}
								date={val?.time}
								title={val?.title}
								description={val?.description}
							/>
						);
					})
				) : (
					<p className="text-center h-full flex items-center justify-center w-full text-gray-500">
						User Have No Activity!
					</p>
				)}
			</div>
		</div>
	);
};

export default React.memo(TabContentProjectActivities);
