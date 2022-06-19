import React from 'react';
import Label from '@atoms/label';

interface EmptyPlaceHolderPropsTypes {
	image?: string;
	value?: string;
	MainClassName?: string;
}

const EmptyPlaceHolder: React.FC<EmptyPlaceHolderPropsTypes> = ({
	image = '/images/technician-profile/empty.png',
	value = 'No Project found',
	MainClassName = 'w-full flex justify-center',
}) => {
	return (
		<div className={MainClassName}>
			<div className="">
				<img
					src={image}
					alt="empty-page"
				/>
				<Label
					variant="h2"
					value={` ${value} `}
					className="text-xl md:text-2xl text-center"
				/>
			</div>
		</div>
	);
};
export default EmptyPlaceHolder;
