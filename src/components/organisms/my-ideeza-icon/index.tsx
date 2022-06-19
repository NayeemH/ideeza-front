import Label from '@atoms/label';
import React from 'react';
import { useSpring, animated } from 'react-spring';

interface IdeezaIconProps {
	css?: string;
	img: string;
	value: any;
	right?: number;
	bottom?: number;
	toggle: boolean;
	click?: (e?: any) => void;
}

const MyIdeezaIcon: React.FC<IdeezaIconProps> = (props: any) => {
	const { css, img, value, right, bottom, toggle, click } = props;
	const fadeStyles = useSpring({
		from: { opacity: 0, right: 0, bottom: 0 },
		to: {
			opacity: toggle ? 1 : 0,
			right: toggle ? right : 0,
			bottom: toggle ? bottom : 0,
		},
	});

	return (
		<animated.div
			style={fadeStyles}
			className={css + ` w-auto flex items-center justify-center flex-col absolute z-[1000]`}
		>
			<div
				onClick={click}
				className="bg-[#712b8e] w-9 h-9 flex items-center justify-center rounded-full cursor-pointer"
			>
				<div className="outline-none bg-[#712b8e] hover:bg-transparent">
					<img
						className="w-4"
						src={img}
						alt=""
					/>
				</div>
			</div>
			<Label
				variant="caption"
				value={value}
				className="font-sans mt-1 w-32 text-center text-xs font-semibold"
				// classes={{
				//   root: "",
				// }}
			/>
		</animated.div>
	);
};
export default MyIdeezaIcon;
