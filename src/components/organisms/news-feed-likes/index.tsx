import IconLabel from '@molecules/icon-label';
import React from 'react';
import { FaComments, FaThumbsUp } from 'react-icons/fa';
import { IoShareSocialSharp } from 'react-icons/io5';
import { numerify } from 'utils/utils';

interface IL_S_CProps {
	onLikeButtonClick?(): void;
	onShareButtonClick?(): void;
	onCommentButtonClick?(): void;
	commentCount?: number;
	shareCount?: number;
	isSelfUser?: boolean;
	likeSuccess?: boolean;
	shareSuccess?: boolean;
}

function L_S_C(props: IL_S_CProps) {
	const {
		onLikeButtonClick,
		onShareButtonClick,
		onCommentButtonClick,
		commentCount,
		isSelfUser,
		shareCount,
		likeSuccess,
		shareSuccess,
	} = props;

	return (
		<div className="flex justify-between md:flex-row flex-col">
			<div className="flex items-center space-x-4">
				<IconLabel
					onClick={onLikeButtonClick}
					mainClass={`flex items-center ${
						!isSelfUser
							? 'cursor-pointer'
							: 'cursor-not-allowed pointer-events-none opacity-30'
					} active:translate-y-0.5 transition-all`}
					iconContanerClass=""
					lableClass={{
						root: 'text-gray-700 uppercase text-base 2xl:text-xl tracking-tight font-medium pl-1',
					}}
					labelValue="Like"
					//   labelValue={`Like${likeCount ? ` (${numerify(likeCount)})` : ""}`}
					tooltipProps={{
						title: 'Like',
						placement: 'top-end',
						arrow: true,
						open: false,
						classes: {
							tooltip:
								'border-none bg-white px-6 text-black-300 rounded-full py-1 text-sm',
							arrow: 'text-white w-2 text-sm ',
						},
					}}
					iconComponent={
						// <img
						//   src="/images/icon/like.svg"
						//   className={
						//     !isSelfUser
						//       ? "cursor-pointer"
						//       : "cursor-not-allowed pointer-events-none"
						//   }
						//   alt="image"
						// />
						<FaThumbsUp
							className={`${
								!isSelfUser
									? 'cursor-pointer'
									: 'cursor-not-allowed pointer-events-none'
							} ${likeSuccess ? 'text-primary' : 'text-purple-400'}`}
						/>
					}
					labelStyle={{
						cursor: !isSelfUser ? 'pointer' : 'not-allowed',
						pointerEvents: !isSelfUser ? 'none' : 'auto',
					}}
				/>
				<IconLabel
					onClick={onShareButtonClick}
					mainClass="flex items-center active:translate-y-0.5 transition-all"
					iconContanerClass=""
					lableClass={{
						root: 'text-gray-700 uppercase text-base 2xl:text-xl tracking-tight font-medium pl-1 pr-2',
					}}
					labelValue="Share"
					tooltipProps={{
						title: 'Share',
						placement: 'top-end',
						arrow: true,
						open: false,
						classes: {
							tooltip:
								'border-none bg-white px-6 text-black-300 rounded-full py-1 text-sm',
							arrow: 'text-white w-2 text-sm ',
						},
					}}
					iconComponent={
						<IoShareSocialSharp
							className={`${
								shareSuccess ? 'text-primary' : 'text-purple-400'
							} text-xl`}
						/>
					}
					labelStyle={{ cursor: 'pointer' }}
				/>
				<IconLabel
					onClick={onCommentButtonClick}
					mainClass="flex items-center active:translate-y-0.5 transition-all"
					iconContanerClass=""
					lableClass={{
						root: 'text-gray-700 uppercase text-base 2xl:text-xl tracking-tight font-medium pl-1 pr-2',
					}}
					labelValue="Comment"
					tooltipProps={{
						title: 'Comments',
						placement: 'top-end',
						arrow: true,
						open: false,
						classes: {
							tooltip:
								'border-none bg-white px-6 text-black-300 rounded-full py-1 text-sm',
							arrow: 'text-white w-2 text-sm ',
						},
					}}
					iconComponent={
						// <img src="/images/icon/comment.svg" alt="image" />
						<FaComments
							className={`${
								Number(commentCount) > 0 ? 'text-primary' : 'text-purple-400'
							} text-xl`}
						/>
					}
					labelStyle={{ cursor: 'pointer' }}
				/>
			</div>
			<div className="flex items-center gap-4">
				<div className="text-base 2xl:text-xl tracking-tight font-medium pl-1 text-gray-700 whitespace-nowrap">
					{commentCount == 0
						? 'No Comment'
						: commentCount == 1
						? 'One Comment'
						: commentCount == 2
						? 'Two Comments'
						: `${numerify(Number(commentCount))} Comments`}
				</div>

				<div className={`flex items-center gap-1`}>
					<div className="text-gray-700 text-base 2xl:text-xl tracking-tight font-medium pl-1 pr-2 whitespace-nowrap">
						{shareCount == 0
							? 'No Share'
							: shareCount == 1
							? 'One Share'
							: shareCount == 2
							? 'Two Shares'
							: `${numerify(Number(shareCount))} Shares`}
					</div>
				</div>
			</div>
		</div>
	);
}

export default L_S_C;
