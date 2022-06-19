import React from 'react';
import { Avatar } from '@mui/material';

interface AvatarAtomProps {
	variant: 'circular' | 'rounded' | 'square';
	className?: string;
	classes?: any;
	value?: any;
	src: any;
	sizes?: string;
	alt?: string;
	sx?: any;
}

const AvatarAtom: React.FC<AvatarAtomProps> = (props) => {
	const { src } = props;

	return (
		<Avatar
			{...props}
			src={src ? src[0] : ''}
			alt={props.alt}
		>
			{/* src={"/assets/landing/User_Profile.png"} */}
			{props.value}
		</Avatar>
	);
};

export default AvatarAtom;
