import Modal from '@atoms/modal';
import React from 'react';

interface IFramePopupProps {
	open: boolean;
	toggleOpen: () => void;
}

const IFramePopup: React.FC<IFramePopupProps> = (props) => {
	const { open, toggleOpen } = props;
	return (
		<div>
			<Modal
				width="md"
				className={{ paper: 'p-[20px]' }}
				close={toggleOpen}
				content={
					<iframe
						width="100%"
						height="400"
						className="rounded-lg pb-0"
						src="https://www.youtube.com/embed/ro6vxNwixz4"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				}
				open={open}
			/>
		</div>
	);
};
export default IFramePopup;
