import React from 'react';
import { Typography } from '@mui/material';
import Proptype from 'prop-types';

// interface LabelProps {
//   value?: string;
//   onClick?: (e?: any) => void;
//   align?: "inherit" | "left" | "center" | "right" | "justify";
//   color?:
//     | "initial"
//     | "inherit"
//     | "primary"
//     | "secondary"
//     | "textPrimary"
//     | "textSecondary"
//     | "error";
//   variant?:
//     | "h1"
//     | "h2"
//     | "h3"
//     | "h4"
//     | "h5"
//     | "h6"
//     | "subtitle1"
//     | "subtitle2"
//     | "body1"
//     | "body2"
//     | "caption"
//     | "button"
//     | "overline"
//     | "srOnly"
//     | "inherit";
//   display?: "initial" | "block" | "inline";
//   paragraph?: boolean;
//   classes?: any;
//   styleName?: any;
//   component?: any;
// }

const Label: React.FC<any> = (props) => {
	const { value } = props;
	return (
		<Typography {...props}>
			{props.styleName || ''}
			{value}
		</Typography>
	);
};

Label.defaultProps = {
	color: 'textPrimary',
	align: 'left',
	display: 'block',
	paragraph: false,
	variant: 'inherit',
	classes: {},
};
Label.prototype = {
	onClick: Proptype.func,
	align: Proptype.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
	color: Proptype.oneOf([
		'initial',
		'inherit',
		'primary',
		'secondary',
		'textPrimary',
		'textSecondary',
		'error',
	]),
	variant: Proptype.oneOf([
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'subtitle1',
		'subtitle2',
		'body1',
		'body2',
		'caption',
		'button',
		'overline',
		'srOnly',
		'inherit',
	]),
	display: Proptype.oneOf(['initial', 'block', 'inline']),
	paragraph: Proptype.bool,
	classes: Proptype.object,
	className: Proptype.string,
};
export default Label;
