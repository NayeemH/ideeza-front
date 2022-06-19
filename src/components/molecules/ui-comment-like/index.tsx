import Button from '@atoms/button';
import IconLabel from '@molecules/icon-label';
import { useAppDispatch } from 'app/hooks';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { AiFillLike } from 'react-icons/ai';
import { MdThumbUp } from 'react-icons/md';
import { openLoginPopup } from 'reducers/login';
import { numerify } from 'utils/utils';

const UiCommentLike = (props: any) => {
	const { comment, parentId, likeCount, isReply, onSubmitLike, isMinimal, isSelfUser } = props;
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { status } = useSession();

	const checkAuth = () => {
		router.query.redirect = 'false';
		router.push(router, undefined, { scroll: false });
		dispatch(openLoginPopup({ ref: '' }));
	};

	const onClickLike = async () => {
		if (isSelfUser) return;
		if (status === 'unauthenticated') return checkAuth();
		onSubmitLike({ id: comment?.id, isReply, parentId });
	};

	const LikeCounter = () => {
		return (
			<span className="whitespace-nowrap">
				{likeCount == 0
					? 'No Likes'
					: likeCount == 1
					? '1 Like'
					: `${numerify(likeCount)} Likes`}
			</span>
		);
	};
	return (
		<span>
			{isMinimal ? (
				<IconLabel
					mainClass="flex items-center mr-3"
					tooltipProps={{ open: false }}
					labelValue={
						<>
							{' '}
							<span className="text-lg pr-1">•</span> {LikeCounter()}
						</>
					}
					iconContanerClass="text-lg"
					lableClass={{
						root: 'text-blue-350 tracking-tight text-sm mr-3 ml-2 font-sans',
					}}
					iconComponent={
						<MdThumbUp
							className={`cursor-pointer ${
								comment?.is_liked ? 'text-primary' : 'text-purple-400'
							} ${
								isSelfUser
									? 'cursor-not-allowed pointer-events-none opacity-20'
									: ''
							}`}
						/>
					}
					onClick={onClickLike}
				/>
			) : (
				<>
					<Button
						onClick={onClickLike}
						value={
							<AiFillLike
								className={`text-2xl ${
									comment?.is_liked ? 'text-primary' : 'text-purple-400'
								}`}
							/>
						}
						className={`bg-transparent p-0 transform-none outline-none ${
							isSelfUser ? 'cursor-not-allowed pointer-events-none opacity-20' : ''
						}`}
						type="button"
					/>
					<span className={'text-base font-sans font-semibold'}>
						<LikeCounter />
					</span>
				</>
			)}
		</span>
	);
};

export default UiCommentLike;
