// import AvatarAtom from "@atoms/avatar";
import AvatarAtom from '@atoms/avatar';
import React from 'react';

const SingleNotificationManuWork: React.FC<any> = () => {
	// const { authorName, authorPost, AuthorType} = props;
	return (
		<>
			<div className="p-[15px] shadow-lg bg-white hover:bg-[#FFE6FA] cursor-pointer">
				<div className="flex items-center">
					<AvatarAtom
						variant="circular"
						src="/images/choose-your-avatar/avatar-project-noti.png"
						className="md:w-16 w-10 md:h-16 h-10 ml-1 cursor-pointer relative"
					/>
					<div className="pl-3">
						<h4 className="text-[18px] font-semibold">Piter Parker</h4>
						<p className="text-base text-[#818181] w-4/5">
							Hi Jonny, I need some additional papers could you help me here with
							some...
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
SingleNotificationManuWork.defaultProps = {
	ProjectName: 'Anonymous Project',
};
export default SingleNotificationManuWork;
