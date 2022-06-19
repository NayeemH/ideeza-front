import React, { useState } from 'react';

interface OnHoverPlayVideoProps {
	poster?: string;
	src: string;
	style?: React.CSSProperties;
	className?: string;
	hideScaleView?: boolean;
	videoSize?: string;
}

const OnHoverPlayVideo: React.FC<OnHoverPlayVideoProps> = ({
	poster,
	src,
	style,
	className = 'rounded-2xl',
	hideScaleView = true,
	videoSize = 'object-cover h-[120px] 2xl:h-[150px] w-full scale-y-1 scale-x-1 hover:shadow-xl',
}) => {
	const vidRef = React.useRef<any>();
	const [control, setControl] = useState(false);
	const playVideo = () => {
		// You can use the play method as normal on your video ref
		vidRef?.current?.play();
		setControl(true);
	};

	const pauseVideo = () => {
		// Pause as well
		vidRef?.current?.pause();
		setControl(false);
	};
	return (
		<video
			ref={vidRef} //Provide ref here
			poster={poster}
			onMouseOver={() => playVideo()}
			onMouseOut={() => pauseVideo()}
			src={src}
			preload="none"
			muted={true}
			loop
			controls={control}
			className={`${
				!hideScaleView ? 'hover:scale-y-125 hover:scale-x-110' : ''
			} ${videoSize} transition-all  ease-in delay-150 ${className}`}
			style={style}
		/>
	);
};

export default OnHoverPlayVideo;
