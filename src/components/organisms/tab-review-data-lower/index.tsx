import Label from '@atoms/label';
import React from 'react';

function TabReviewsDataLower(props: any) {
	const {
		mainClass = 'mt-[15px]',
		boxTopText,
		value1,
		// value1Class,
		value2,
		// value2Class,
		value3,
		// value3Class,
		value4,
		// value4Class,
	} = props;
	return (
		<>
			<div className={mainClass}>
				<div className={boxTopText}>
					<Label
						value={value1}
						className="text-base 2xl:text-xl font-sans font-semibold tracking-tight"
					/>
					<Label
						value={value2}
						className=" text-base 2xl:text-xl font-sans font-semibold text-primary"
					/>
				</div>
				<Label
					value={value3}
					className="font-sans pt-2 text-base 2xl:text-xl leading-6 text-gray-700"
				/>
				<Label
					value={value4}
					className="text-base font-sans pt-2 text-primary"
				/>
			</div>
		</>
	);
}

export default TabReviewsDataLower;
