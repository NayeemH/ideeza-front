import React, { FC } from 'react';
import { Button as ButtonAtom, CircularProgress } from '@mui/material';

interface ButtonProps {
	iconStart?: JSX.Element;
	iconEnd?: JSX.Element;
	loading?: boolean | string;
	value: any;
	color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

	disabled?: boolean;
	isloadingSmall?: boolean;
	href?: string;
	buttonText?: string;
	className?: any;
	classes?: any;
	variant?: 'contained' | 'outlined' | 'text';
	size?: 'large' | 'medium' | 'small';
	type?: 'button' | 'submit' | 'reset' | undefined;
	style?: React.CSSProperties;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
const Button: FC<ButtonProps> = (props) => {
	const {
		value,
		iconStart,
		iconEnd,
		loading,
		color,
		size,
		variant,
		disabled,
		className,
		href,
		type,
		onClick,
		classes,
		isloadingSmall,
		style,
		buttonText,
	} = props;
	return (
		<ButtonAtom
			startIcon={iconStart}
			endIcon={iconEnd}
			className={className + ' shadow-none'}
			variant={variant}
			color={color}
			onClick={onClick}
			size={size}
			disabled={disabled}
			href={href}
			type={type}
			classes={classes}
			style={style}
		>
			<div className={buttonText}>
				{isloadingSmall ? (
					<>
						{loading ? (
							<CircularProgress
								color="inherit"
								size={15}
							/>
						) : (
							value
						)}
					</>
				) : (
					<>
						{loading ? (
							<CircularProgress
								color="inherit"
								size={36}
							/>
						) : (
							value
						)}
					</>
				)}
			</div>
		</ButtonAtom>
	);
};
Button.defaultProps = {
	color: 'inherit',
	disabled: false,
	size: 'medium',
	variant: 'contained',
	className: '',
	loading: false,
	buttonText: 'w-full flex items-center justify-center',
};

export default Button;
