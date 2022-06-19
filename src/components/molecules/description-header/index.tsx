import Label from '@atoms/label';
import React from 'react';

interface DescriptionHeaderProps {
	value: string;
}

const DescriptionHeader: React.FC<DescriptionHeaderProps> = ({ value }) => {
	return (
		//   bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500
		<div className="w-full header-gradient rounded-t-lg text-lg md:text-xl">
			<Label
				value={value}
				className="font-semibold text-white py-2 pl-4 "
			/>
		</div>
	);
};

export default DescriptionHeader;
