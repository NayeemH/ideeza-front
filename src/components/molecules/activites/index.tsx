import React from 'react';
import Label from '@atoms/label';
import Proptype from 'prop-types';
function Activity(props: any) {
	const { date, title, description, mainClass, dateClass, titleClass, descriptionClass } = props;
	return (
		<div className={mainClass}>
			<div className="flex items-center justify-start flex-col p-0 pt-1 pr-5">
				<div className="h-3 w-3 mt-1">
					<div className="h-[14px] w-[14px] bg-[#333333] rounded-full"></div>
				</div>
				<div className="border-l border-[#333333] h-full"></div>
			</div>
			<div className="p-0">
				<Label
					classes={{
						root: `p-0 m-0 texl-base font-sans ${dateClass}`,
					}}
					value={date}
				/>
				<Label
					classes={{
						root: `p-0 pt-2 pb-3 m-0 texl-base font-sans ${titleClass}`,
					}}
					value={title}
				/>
				<Label
					classes={{
						root: `p-0 m-0 texl-base font-sans font-semibold leading-none ${descriptionClass}`,
					}}
					value={description}
				/>
			</div>
		</div>
	);
}
Activity.defaultProps = {
	mainClass: 'flex font-sans pb-3 m-0 tracking-normal',
	dateClass: 'text-gray-400',
	titleClass: 'text-[#333333] font-proxima-nova',
	descriptionClass: 'text-[#333333] font-proxima-nova font-semibold',
};
Activity.prototype = {
	mainClass: Proptype.string,
	date: Proptype.string,
	title: Proptype.string,
	description: Proptype.string,
};
export default Activity;
