// import AvatarAtom from "@atoms/avatar";
import React from 'react';

const SingleMiniTabContent: React.FC<any> = (props: any) => {
	const { spentWorkTime, time, income } = props;
	return (
		<>
			<div>
				<h5 className="text-[18px] font-semibold">{spentWorkTime}</h5>
				<h2 className="text-[30px] font-semibold">{time}</h2>
				<h5 className="text-[#999999] text-base">{income}</h5>
			</div>
		</>
	);
};
SingleMiniTabContent.defaultProps = {
	ProjectName: 'Anonymous Project',
};
export default SingleMiniTabContent;
