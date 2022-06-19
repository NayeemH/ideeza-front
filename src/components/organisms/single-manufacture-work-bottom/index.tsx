// import AvatarAtom from "@atoms/avatar";
import React from 'react';
import ManuFactureAvatar from '@molecules/manufacture-avater';
import { IoClose } from 'react-icons/io5';
import Button from '@atoms/button';

const SingleManuFactureWorkBottom: React.FC<any> = (props) => {
	const { authorName, authorPost, AuthorType, img } = props;
	return (
		<>
			<div className="">
				<div className="flex justify-between items-center">
					<ManuFactureAvatar
						authorName={authorName}
						authorPost={authorPost}
						isAuthorPost={true}
						img={img}
					/>
					<div className="text-primary text-[18px] font-semibold">{AuthorType}</div>
					<div className="flex items-center gap-2 pr-[25px]">
						<Button
							value="Request Quote "
							className="text-base 2xl:text-lg shadow rounded flex ml-auto bg-white hover:text-white hover:bg-[#10E43A] capitalize px-2 py-2.5"
							color="inherit"
						/>
						<IoClose className="text-xl bg-red-500 rounded-full text-white" />
					</div>
				</div>
			</div>
		</>
	);
};
SingleManuFactureWorkBottom.defaultProps = {
	ProjectName: 'Anonymous Project',
};
export default SingleManuFactureWorkBottom;
