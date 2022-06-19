// import { Avatar } from "@mui/material";
import AvatarAtom from '@atoms/avatar';
import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import React from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { MdDelete, MdModeEditOutline, MdThumbUp } from 'react-icons/md';

export const Comment: React.FC<any> = ({
	mainClass,
	avatarClass,
	containerClass,
	nameValue,
	nameClass,
	jobValue,
	jobClass,
	timeValue,
	timeClass,
	descriptionValue,
	descriptionClass,
	likeIconClass,
	likesValue,
	likesClass,
	iconClasses,
	// commentValue,
	// commentClass,
	maincontainerClass,
	likeHandler,
	commentId,
}) => {
	// export default function Comment(props) {
	//   const {
	//     mainClass,
	//     avatarClass,
	//     containerClass,
	//     nameValue,
	//     nameClass,
	//     jobValue,
	//     jobClass,
	//     timeValue,
	//     timeClass,
	//     descriptionValue,
	//     descriptionClass,
	//     likeIconClass,
	//     likesValue,
	//     likesClass,
	//     iconClasses,
	//     commentValue,
	//     commentClass,
	//     maincontainerClass,
	//     likeHandler,
	//     commentId,
	//   } = props;

	return (
		<div className={mainClass}>
			<AvatarAtom
				variant="circular"
				src="../../../../public/images/choose-your-avatar/avatar1.png"
				className={avatarClass}
			/>
			<div className={maincontainerClass}>
				<div className={containerClass}>
					<div className="flex justify-between items-start">
						<div>
							<Label
								value={nameValue}
								classes={{ root: `${nameClass}` }}
							/>
							<Label
								value={jobValue}
								classes={{ root: `${jobClass}` }}
							/>
						</div>
						<Label
							value={timeValue}
							classes={{ root: `${timeClass}` }}
						/>
					</div>
					<Label
						value={descriptionValue}
						classes={{ root: `${descriptionClass}` }}
					/>
					<div className={`md:flex items-center py-2 ${iconClasses}`}>
						<IconLabel
							tooltipProps={{ open: false }}
							labelValue={
								<>
									{' '}
									<span className="text-lg pr-1">•</span> {likesValue}{' '}
								</>
							}
							iconContanerClass="text-lg"
							lableClass={{
								root: `text-blue-350 tracking-tight text-sm mr-3 ml-2 font-sans ${likesClass}`,
							}}
							iconComponent={<MdThumbUp className={likeIconClass} />}
							onClick={() => likeHandler(commentId)}
						/>
						<IconLabel
							tooltipProps={{ open: false }}
							labelValue={
								<>
									{' '}
									<span className="text-lg pr-1">•</span> 0
								</>
							}
							iconContanerClass="text-lg"
							lableClass={{
								root: `text-blue-350 tracking-tight text-sm ml-2 font-sans`,
							}}
							iconComponent={<FaCommentDots className={likeIconClass} />}
						/>
						<IconLabel
							mainClass="flex items-center ml-8 mr-3"
							tooltipProps={{ open: false }}
							iconContanerClass="text-lg"
							lableClass={{
								root: `text-blue-350 tracking-tight text-sm ml-2 font-sans `,
							}}
							// iconComponent={<img src="/assets/images/comment.svg" />}
							iconComponent={<MdModeEditOutline className={likeIconClass} />}
						/>
						<IconLabel
							tooltipProps={{ open: false }}
							iconContanerClass="text-lg"
							lableClass={{
								root: `text-blue-350 tracking-tight text-sm ml-2 font-sans `,
							}}
							// iconComponent={<img src="/assets/images/comment.svg" />}
							iconComponent={<MdDelete className={likeIconClass} />}
						/>
					</div>
				</div>
				{/* {props.children} */}
			</div>
		</div>
	);
};
Comment.defaultProps = {
	mainClass: 'flex w-full mt-6',
	avatarClass: 'w-11 h-11',
	containerClass: 'rounded bg-blue-450 md:p-3 px-3 md:px-4 w-full',
	nameClass: 'text-gray-700 font-sans text-lg font-bold',
	jobClass: 'text-gray-670 font-thin',
	timeClass: 'text-gray-810 font-sans',
	descriptionClass: 'text-md tracking-tight  font-sans text-blue-350 pt-2 text-lg',
	likeIconClass: 'text-primary text-xl',
	commentIconClass: 'text-primary text-2xl ml-10',
	maincontainerClass: 'pl-2 w-full',
};
