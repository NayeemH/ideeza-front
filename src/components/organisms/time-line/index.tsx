import React from 'react';
import TimeLine from '@thetechcompany/react-gantt-timeline';

const TimeLineView = () => {
	const d1 = new Date();
	const d2 = new Date();
	d2.setDate(d2.getDate() + 5);
	const d3 = new Date();
	d3.setDate(d3.getDate() + 8);
	const d4 = new Date();
	d4.setDate(d4.getDate() + 20);
	const data = [
		{
			id: 1,
			start: d1,
			end: d2,
			name: 'Demo Task 1',
		},
		{
			id: 2,
			start: d3,
			end: d4,
			name: 'Demo Task 2',
			color: 'orange',
		},
	];
	const links = [{ id: 1, start: 1, end: 2 }];
	return (
		<div>
			<div className="time-line-container h-64">
				{/* timeline component should be here */}
				<TimeLine
					className="h-full"
					data={data}
					links={links}
				/>
			</div>
		</div>
	);
};

export default TimeLineView;
