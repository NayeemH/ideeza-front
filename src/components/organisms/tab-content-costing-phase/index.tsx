import AvatarAtom from '@atoms/avatar';
import React from 'react';

const CostingPhase: React.FC<any> = () => {
	return (
		<div className="mt-[30px] px-[60px]">
			<div className="flex justify-between mb-[25px]">
				<h5 className="text-[18px]">Ideeza Cost: </h5>
				<h5 className="text-[18px]">30$</h5>
			</div>
			<div className="flex justify-between mb-[25px] ">
				<h5 className="text-[18px]">Special Cost: </h5>
				<h5 className="text-[18px]">30$</h5>
			</div>
			<div className="flex mb-[25px] ">
				<h5 className="text-[18px] w-[35%]">Freelancers Cost: </h5>
				<div className="h-[150px] overflow-y-auto w-full">
					<div className="flex justify-between px-4">
						<div className="flex items-center">
							<AvatarAtom
								variant="circular"
								src="/images/choose-your-avatar/avater-project-manufect.png"
							/>
							<div className="pl-2">
								<h5 className="text-[18px]">John Doe</h5>
								<h5 className="text-[16px] text-gray-400">Google consultant</h5>
							</div>
						</div>
						<div className="text-[18px]">400$</div>
					</div>
					<div className="flex justify-between px-4">
						<div className="flex items-center">
							<AvatarAtom
								variant="circular"
								src="/images/choose-your-avatar/avater-project-manufect.png"
							/>
							<div className="pl-2">
								<h5 className="text-[18px]">John Doe</h5>
								<h5 className="text-[16px] text-gray-400">Google consultant</h5>
							</div>
						</div>
						<div className="text-[18px]">400$</div>
					</div>
					<div className="flex justify-between px-4">
						<div className="flex items-center">
							<AvatarAtom
								variant="circular"
								src="/images/choose-your-avatar/avater-project-manufect.png"
							/>
							<div className="pl-2">
								<h5 className="text-[18px]">John Doe</h5>
								<h5 className="text-[16px] text-gray-400">Google consultant</h5>
							</div>
						</div>
						<div className="text-[18px]">400$</div>
					</div>
					<div className="flex justify-between px-4">
						<div className="flex items-center">
							<AvatarAtom
								variant="circular"
								src="/images/choose-your-avatar/avater-project-manufect.png"
							/>
							<div className="pl-2">
								<h5 className="text-[18px]">John Doe</h5>
								<h5 className="text-[16px] text-gray-400">Google consultant</h5>
							</div>
						</div>
						<div className="text-[18px]">400$</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(CostingPhase);
