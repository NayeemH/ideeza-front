import SimplePopper from '@atoms/generic-popper';
import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const Contributor: React.FC<any> = ({
	data,
	index,
	onClick,
	goToMessages,
	onClickConnectBtn,
	isConnecting,
	connectStatus,
	visitProfile,
	setContribution,
}) => {
	return (
		<div
			className="flex custom-bg-color-1 text-white rounded-xl p-3 justify-between items-center cursor-pointer mb-3"
			onClick={onClick}
		>
			<div className="flex items-center justify-between">
				<span className="fnt-s2-mid mr-1 md:mr-1.5">{index ? `${index}.` : ''}</span>
				<div className="flex items-start">
					<img
						src={
							data?.user?.profile_photo ??
							'/images/choose-your-avatar/avatar-placeholder.png'
						}
						alt=""
						className="rounded-lg contributor-card-image"
					/>
					<div className="flex flex-col md:pl-2">
						<p className="font-semibold fnt-t4-small">
							{`${data?.user?.first_name} ${data?.user?.last_name}`}
						</p>
						<span className="fnt-extra-small md:mt-1 tracking-wider">
							{data?.user?.about_me}
						</span>
					</div>
				</div>
			</div>
			<div className="w-8 py-2 pl-1.5 rounded-lg bg-black-100">
				{/* <CustomDropDownMenu /> */}

				<SimplePopper
					clickableComponent={<BiDotsVerticalRounded className="text-xl text-white" />}
					popperComponent={
						<div className="py-2 w-auto shadow-lg px-4 bg-slate-50">
							<div
								onClick={() => goToMessages()}
								className="text-[18px] hover:text-primary py-1"
							>
								Send Message
							</div>
							<div
								onClick={onClickConnectBtn}
								className="text-[18px] hover:text-primary py-1"
							>
								{isConnecting ? 'loading...' : connectStatus}
							</div>
							<div
								onClick={() => visitProfile()}
								className="text-[18px] hover:text-primary py-1"
							>
								see profile
							</div>
							<div
								onClick={() => setContribution(true)}
								className="text-[18px] hover:text-primary py-1"
							>
								Invite to Contribute
							</div>
						</div>
					}
				/>
			</div>
		</div>
	);
};

export default Contributor;
