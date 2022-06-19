import React from 'react';

const AppDragBtn = (props: any) => {
	const { img, name, className } = props;
	return (
		<div className="flex cursor-pointer">
			<img
				src={img}
				className="mr-[15px]"
				alt=""
			/>
			<span className={className}>{name}</span>
		</div>
	);
};
AppDragBtn.defaultProps = {
	className: 'text-[#666666] text-base',
};

export default AppDragBtn;
