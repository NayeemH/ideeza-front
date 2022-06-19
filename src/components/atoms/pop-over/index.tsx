import React from 'react';
import { Popover as PopoverAtom } from '@mui/material';
// import Proptype from "prop-types";
interface PopoverProps {
	id: string | any;
	open: boolean;
	onClose: (e?: any) => void;
	anchorEl: any;
	handleClick: (e?: any) => void;
	children: React.ReactNode;
}
function Popover(props: PopoverProps) {
	return <PopoverAtom {...props}>{props.children}</PopoverAtom>;
}
Popover.defaulProps = {
	id: null,
	open: false,
	onClose: () => {
		('');
	},
	anchorEl: '',
};
// Popover.prototype = {
//   id: Proptype.string,
//   open: Proptype.bool,
//   onClose: Proptype.func,
//   anchorEl: Proptype.any,
//   transformOrigin: Proptype.object,
//   TransitionProps: Proptype.object,
//   children: Proptype.node,
//   anchorOrigin: Proptype.object,
//   anchorPosition: Proptype.object,
//   classes: Proptype.classes,
//   elevation: Proptype.number,
// };
export default React.memo(Popover);
