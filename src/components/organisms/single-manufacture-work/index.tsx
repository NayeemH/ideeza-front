// import AvatarAtom from "@atoms/avatar";
import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import ManuFactureAvatar from '@molecules/manufacture-avater';

const SingleManuFactureWork: React.FC<any> = (props) => {
	const { authorName, authorPost, companyName, companyPost } = props;
	return (
		<>
			<div className="">
				<div className="flex justify-between items-center">
					<ManuFactureAvatar
						authorName={authorName}
						authorPost={authorPost}
					/>
					<div className="flex items-center">
						<div className="pr-[50px]">
							<h5 className="text-primary text-[18px] font-semibold">
								{companyName}
							</h5>
							<p className="text-[#8E8E8E] text-base text-right">{companyPost}</p>
						</div>
						<div className="pr-[25px]">
							<HiOutlineMail className="text-4xl text-primary " />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
SingleManuFactureWork.defaultProps = {
	ProjectName: 'Anonymous Project',
};
export default SingleManuFactureWork;
