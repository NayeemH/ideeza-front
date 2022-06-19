import React from 'react';
import { useOutsideClickHandler } from 'utils/utils';

export const CustomPopover = ({
	renderRef,
	renderBody,
	zIndex = 60,
}: {
	renderRef: (toggle: () => void) => JSX.Element;
	renderBody: (toggle: () => void, isOpen: boolean) => JSX.Element;
	zIndex?: number;
}) => {
	const [popperElement, setPopperElement] = React.useState<any>(null);
	const [isOpen, setIsOpen] = React.useState(false);
	const ref = React.useRef(null);
	useOutsideClickHandler(ref, () => setIsOpen(!toggle));

	const toggle = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div className="relative ">
			{renderRef(toggle)}
			{isOpen && (
				<div
					ref={ref}
					style={{ zIndex }}
					className={`absolute w-full h-full`}
					onClick={(event) => {
						if (popperElement && popperElement.contains(event.target)) {
							return;
						}
						toggle();
					}}
				>
					<div ref={setPopperElement}>{renderBody(toggle, isOpen)}</div>
				</div>
			)}
		</div>
	);
};
