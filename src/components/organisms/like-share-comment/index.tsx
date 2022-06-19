import React from 'react';
// import { IconLabel } from "molecules";
// import { Label } from "atoms";
import { IoMdThumbsUp } from 'react-icons/io';
import IconLabel from '@molecules/icon-label';
import Label from '@atoms/label';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { IoShareSocialOutline } from 'react-icons/io5';
import SimplePopper from '@atoms/generic-popper';

const CommentLikeShare: React.FC<any> = (props) => {
	const {
		likes,
		comments,
		shares,
		onClickLikeButton,
		onClickShareIdeeza,
		onClickShareSocial,
		selfUser,
	} = props;

	// const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	// const shareMenuOpen = Boolean(anchorEl);

	// const handleClickShareButton = (event: React.MouseEvent<HTMLButtonElement>) => {
	// 	setAnchorEl(event.currentTarget);
	// };

	// const handleCloseShareMenu = () => {
	// 	setAnchorEl(null);
	// };

	return (
		<div className="md:flex items-center justify-between font-sans border-t border-b py-3 mt-6 border-gray-100">
			<div className="flex -ml-1 md:-ml-0">
				<div className={selfUser ? 'pointer-event-none opacity-50' : 'cursor-pointer'}>
					<IconLabel
						labelValue="Like"
						lableClass={{
							root: `font-normal text-base 2xl:text-xl ${
								selfUser ? 'pointer-event-none' : 'text-gray-700 cursor-pointer'
							}`,
						}}
						iconComponent={
							<IoMdThumbsUp
								className={`text-lg ${
									selfUser ? 'pointer-event-none' : 'cursor-pointer'
								}`}
							/>
						}
						tooltipProps={{ open: false }}
						onClick={() => {
							if (!selfUser && onClickLikeButton) onClickLikeButton();
						}}
					/>
				</div>
				{!props.hideShareAndButton && (
					<>
						<SimplePopper
							clickableComponent={
								<div className="cursor-pointer">
									<IconLabel
										labelValue="Share"
										lableClass={{
											root: 'font-normal text-base 2xl:text-xl text-gray-700 cursor-pointer',
										}}
										iconComponent={
											<IoShareSocialOutline className="text-xl cursor-pointer" />
										}
										tooltipProps={{ open: false }}
										// TODO
										rawClick={true}
										// onClick={handleClickShareButton}
									/>
								</div>
							}
							popperComponent={
								<>
									<div className="w-full flex justify-center">
										<div className="arrow-up"></div>
									</div>
									<div className="px-2.5 py-1 shadow-lg rounded-lg border border-gray-300 bg-white">
										<ul>
											<li
												onClick={() => {
													onClickShareIdeeza();
													// handleCloseShareMenu();
												}}
												className="text-[#101010] hover:text-primary cursor-pointer pb-2"
											>
												Share Ideeza
											</li>
											<li
												onClick={() => {
													onClickShareSocial();
													// handleCloseShareMenu();
												}}
												className="text-[#101010] hover:text-primary cursor-pointer pb-2"
											>
												Share Social
											</li>
										</ul>
									</div>
								</>
							}
						/>
					</>
				)}
			</div>
			<div className="flex space-x-4 justify-end">
				<Label
					value={
						<>
							{' '}
							{likes} <span className="text-gray-810">likes</span>{' '}
						</>
					}
					classes={{ root: 'text-base 2xl:text-xl text-gray-810' }}
				/>
				<Label
					value={
						<>
							{' '}
							{comments} <span className="text-gray-810">comments</span>{' '}
						</>
					}
					classes={{ root: 'text-base 2xl:text-xl text-gray-810' }}
				/>
				{!props.hideShareAndButton && (
					<Label
						value={
							<>
								{' '}
								{shares} <span className="text-gray-810">shares</span>{' '}
							</>
						}
						classes={{ root: 'text-base 2xl:text-xl text-gray-810' }}
					/>
				)}
			</div>
		</div>
	);
};
CommentLikeShare.defaultProps = {
	likes: '0',
	comments: '0',
	shares: '0',
	onClickLikeButton: () => {
		throw new Error('Impleament like button onlclick action');
	},
};
export default CommentLikeShare;
