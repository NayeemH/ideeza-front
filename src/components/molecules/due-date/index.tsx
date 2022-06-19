import React from 'react';
import { endOfDay, format, startOfDay } from 'date-fns';

const DueDate = ({ startDate, endDate }: any) => {
	const today = endOfDay(new Date()).getTime();
	const start_date = startOfDay(new Date(startDate)).getTime();
	const end_date = endOfDay(new Date(endDate)).getTime();
	const progress = Math.round(((today - start_date) / (end_date - start_date)) * 100);

	return (
		<div
			className={`rounded-full h-9 relative xl:w-64 w-full  overflow-hidden ${
				progress < 0 ? 'bg-primary' : 'bg-gray-600'
			}`}
		>
			<span
				className="bg-primary block h-full absolute"
				style={{ width: `${progress}%`, zIndex: 0 }}
			></span>
			<span
				className="relative text-white text-center w-full block p-1"
				style={{ zIndex: 1 }}
			>
				{format(new Date(endDate), 'MM/dd/yyyy') ?? ''}
			</span>
		</div>
	);
};

export default DueDate;
