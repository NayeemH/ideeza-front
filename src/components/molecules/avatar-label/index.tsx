import React from 'react';
import AvatarAtom from '@atoms/avatar';
import Label from '@atoms/label';
import { AvatarLabelProps } from 'models/user-project';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }: any) => ({
	'& .MuiBadge-badge': {
		backgroundColor: '#ff09d0',
		color: '#ff09d0',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: 'ripple 1.2s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
	},
}));

const AvatarLabels: React.FC<AvatarLabelProps> = (props) => {
	const {
		src,
		avaterClasses,
		mainClassesLabel,
		mainClasses,
		title,
		titleClasses,
		subtitle,
		subtitleClasses,
		isAvatarDot,
	} = props;

	return (
		<div className={mainClasses}>
			{isAvatarDot ? (
				<StyledBadge
					overlap="circular"
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					variant="dot"
				>
					<AvatarAtom
						// className="m-auto"
						variant="circular"
						src={[src]}
						classes={{ root: `${avaterClasses}` }}
					/>
				</StyledBadge>
			) : (
				<AvatarAtom
					// className="m-auto"
					variant="circular"
					src={[src]}
					classes={{ root: `${avaterClasses}` }}
				/>
			)}

			<div className={mainClassesLabel}>
				<Label
					className=""
					value={title}
					classes={{ root: `${titleClasses}` }}
				/>
				<Label
					value={subtitle}
					classes={{ root: `${subtitleClasses}` }}
				/>
			</div>
		</div>
	);
};
AvatarLabels.defaultProps = {
	mainClasses: 'flex mt-4 sm:flex-row items-center',
	titleClasses: 'texl-lg 2xl:text-2xl font-semibold',
	subtitleClasses: 'text-base 2xl:text-xl font-light text-gray-800 font-light',
	mainClassesLabel: 'pl-2',
	avaterClasses: 'h-14 w-14 shadow-md',
};
export default AvatarLabels;
