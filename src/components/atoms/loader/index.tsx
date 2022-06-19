import React from 'react';
interface ILoaderProps {
	type?: 'fixed' | 'relative';
	isTransparentBg?: boolean;
	transparentBg?: string;
}

const Loader = (props: ILoaderProps) => {
	const { type, isTransparentBg, transparentBg } = props;

	return (
		<div
			className={`flex w-full top-0 left-0 ${
				isTransparentBg ? transparentBg || '' : 'bg-white'
			} ${
				type === 'fixed' ? 'fixed min-h-screen ' : 'absolute h-full '
			} items-center justify-center z-[100]`}
		>
			{/* <CircularProgress size={50} /> */}
			<img
				src="/images/logo/BubblePlay_fast.gif"
				alt="Loading"
			/>
		</div>
	);
};
Loader.defaultProps = {
	type: 'fixed',
	isTransparentBg: false,
	transparentBg: 'bg-white/80',
};
export default Loader;
