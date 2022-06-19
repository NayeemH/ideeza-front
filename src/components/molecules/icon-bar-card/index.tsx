import Button from '@atoms/button';
import React from 'react';

function IconBarCard({ className, icons, icons2, value, mainClass }: any) {
	return (
		<>
			<div className={`text-center flex items-center relative ${mainClass}`}>
				<div className="flex space-x-3 w-full justify-center">
					<div className={`h-full pb-2 ${className}`}>{icons}</div>
					{icons2}
				</div>
				<div className="bottom-0 left-0 w-full">
					<Button
						value={value}
						className="bg-gray-160 text-gray-800 tracking-tight font-sans rounded-t-lg rounded-b-none capitalize py-1 px-4 w-full text-md"
					/>
				</div>
			</div>
		</>
	);
}
IconBarCard.defaultProps = {
	className: 'grid grid-cols-3 items-center gap-2',
	value: 'General',
};
export default IconBarCard;
