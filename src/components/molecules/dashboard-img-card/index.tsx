import React from 'react';
import Label from '@atoms/label';

const DashboardImgCard = ({ onClick }: any) => {
	return (
		<>
			<div
				className={`p-11 xl:pt-[110px] bg-cover bg-dashboard flex flex-col items-center justify-start bg-no-repeat h-full w-full font-proxima-nova`}
			>
				<Label
					value="Let's get you started"
					classes={{
						root: `mb-[14px] text-xl xl:text-3xl 2xl:text-[32px] font-semibold text-white`,
					}}
				/>
				<Label
					value="Now it's your time to change the world."
					classes={{
						root: `texl-lg 2xl:text-xl  m-0 tracking-tight text-center text-white`,
					}}
				/>
				<Label
					value="Dream, invent, create."
					classes={{
						root: `texl-lg 2xl:text-xl m-0 tracking-tight text-center text-white second-step`,
					}}
				/>
				<img
					onClick={onClick}
					src="/images/logo/user-ideeza.png"
					className="mt-10 pt-4 cursor-pointer first-step "
					alt="tmage"
					width="90px"
				/>
			</div>
		</>
	);
};

DashboardImgCard.defaultProps = {};

export default DashboardImgCard;
