import React from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

// type CheckboxProps = {
//   color: "default" | "primary" | "secondary";
//   disabled?: boolean;
//   size?: "medium" | "small";
//   classes?: () => void;
//   checked: boolean;
// };

function CheckboxAtom(props: CheckboxProps) {
	return <Checkbox {...props} />;
}
CheckboxAtom.defaultProps = {
	color: 'default',
	disabled: false,
	size: 'medium',
	//   classes: () => {},
};
// CheckboxAtom.prototype = {
//   color: Proptype.oneOf(["default", "primary", "secondary"]),
//   disabled: Proptype.bool,
//   size: Proptype.oneOf(["medium", "small"]),
//   classes: Proptype.object,
//   checked: Proptype.object,
// };
export default CheckboxAtom;
