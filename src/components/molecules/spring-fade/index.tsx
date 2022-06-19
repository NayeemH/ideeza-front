import React from 'react';
import { animated, useSpring } from 'react-spring';

interface FadeProps {
	children?: React.ReactElement;
	in?: boolean;
	onEnter?: () => void;
	onExited?: () => void;
}

export const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
	const { in: open, children, onEnter, onExited, ...other } = props;
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		onStart: () => {
			if (open && onEnter) {
				onEnter();
			}
		},
		onRest: () => {
			if (!open && onExited) {
				onExited();
			}
		},
	});

	return (
		<animated.div
			ref={ref}
			style={style}
			{...other}
		>
			{children}
		</animated.div>
	);
});
