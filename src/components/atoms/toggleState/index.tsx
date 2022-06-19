import React from 'react';
interface Iprops {
	isActive?: boolean;
	render: ({
		isOpen,
		close,
		open,
	}: {
		isOpen: boolean;
		close: () => void;
		open: () => void;
	}) => React.ReactNode;
}
///do not add ref it is react utility component
export const ToggleState = (props: Iprops): any => {
	const [isOpen, setIsOpen] = React.useState(props.isActive || false);
	return props.render({
		isOpen,
		close: () => {
			setIsOpen(false);
		},
		open: () => {
			setIsOpen(true);
		},
	});
};
