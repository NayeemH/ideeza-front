import React, { FC } from 'react';

interface PointLevelProps {
	lavelName: string;
	lavelStatus: string;
	pointStart?: number;
	pointEnd?: number;
	img?: any;
	isPointPlus?: any;
	allPoints?: number;
}

const PointLevel: FC<PointLevelProps> = (props) => {
	const { lavelName, lavelStatus, pointStart, pointEnd, img, isPointPlus, allPoints } = props;
	return (
		<>
			<div className="py-[30px] px-[25px] xl:py-[50px] 2xl:py-[90px] xl:px-[40px] 2xl:px-[70px] flex justify-between border rounded-[10px] bg-white">
				<div className="left-side">
					<h3 className=" xl:text-[20px] 2xl:text-[30px] font-semibold">{lavelName}</h3>
					<h2 className=" xl:text-[30px] 2xl:text-[45px] font-semibold">{lavelStatus}</h2>

					{isPointPlus ? (
						<p className=" text-base 2xl:text-[20px] font-semibold text-primary">
							{allPoints} + Points
						</p>
					) : (
						<p className="text-base 2xl:text-[20px] font-semibold text-primary">
							<span>{pointStart}</span>-<span>{pointEnd}</span> Points
						</p>
					)}
				</div>
				<div className="right-side">
					<img
						src={img}
						className="h-[135px]"
						alt="img"
					/>
				</div>
			</div>
		</>
	);
};
export default PointLevel;
