import AvatarAtom from '@atoms/avatar';
import React from 'react';

const ManuFactureAvatar: React.FC<any> = (props) => {
	const { authorName, authorPost, isAuthorPost, img } = props;
	return (
		<>
			<div className="flex items-center">
				<AvatarAtom
					variant="circular"
					src={img}
					className="md:w-16 w-10 md:h-16 h-10 ml-1 cursor-pointer relative"
				/>
				<div className="pl-4">
					<h5 className="text-[18px] font-semibold">{authorName}</h5>
					<p className={`${isAuthorPost ? 'text-primary' : 'text-[#8E8E8E]'} text-base`}>
						{authorPost}
					</p>
				</div>
			</div>
		</>
	);
};
ManuFactureAvatar.defaultProps = {
	img: '/images/choose-your-avatar/avater-project-manufect.png',
};
export default ManuFactureAvatar;
