import React from 'react';
import { Dialog, DialogContent, DialogActions } from '@mui/material';
import { ClassNameMap } from '@mui/material';

interface IProps {
	header?: JSX.Element;
	content: JSX.Element;
	className: Partial<ClassNameMap<any>> | undefined;
	actions?: JSX.Element;
	open?: boolean | JSX.Element | any;
	// noteOpen?: boolean | JSX.Element | any;
	close?: ((event: unknown, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined | any;
	width: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
	disableEscapeKeyDown?: boolean;
	dialogContentContainerClass?: string;
}

function Modal(props: IProps) {
	const {
		header,
		dialogContentContainerClass,
		content,
		className,
		actions,
		open,
		close,
		width,
		disableEscapeKeyDown,
	} = props;

	return (
		<Dialog
			fullWidth
			keepMounted={false}
			maxWidth={width}
			onClose={close}
			open={open}
			classes={className}
			disableEscapeKeyDown={disableEscapeKeyDown}
		>
			{header}
			<DialogContent
				className={`${dialogContentContainerClass ? dialogContentContainerClass : ' '} p-0`}
			>
				{content}
			</DialogContent>
			<DialogActions classes={{ root: 'justify-start pb-0' }}>{actions}</DialogActions>
		</Dialog>
	);
}
// Modal.prototype = {
//   open: Proptype.bool,
//   width: Proptype.string,
//   content: Proptype.element,
//   header: Proptype.element,
//   action: Proptype.element,
//   className: Proptype.object,
// };
Modal.defaultProps = {
	className: { paper: ' rounded-xl md:px-12 md:py-10 p-4' },
};
export default Modal;
