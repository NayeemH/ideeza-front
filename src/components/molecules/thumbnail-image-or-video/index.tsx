import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import OnHoverPlayVideo from '@molecules/on-hover-play';
import { IMAGE_PLACEHOLDER } from 'enums/common';

interface IThumbnailImageOrVideo {
	data: any;
	video?: any;
	height?: string;
	xlHeight?: string;
	imgXlHeight?: string;
	lgImageHeight?: string;
	lgVideoHeight?: string;
	mdVideoHeight?: string;
	mdImageHeight?: string;
	hideScaleView?: boolean;
	imagePlaceholder?: string;
	className?: string;
	videoClasses?: string;
}

const ThumbnailImageOrVideo = (props: IThumbnailImageOrVideo) => {
	const {
		data,
		video,
		height,
		hideScaleView,
		imagePlaceholder,
		className,
		xlHeight,
		imgXlHeight,
		lgImageHeight,
		lgVideoHeight,
		mdVideoHeight,
		mdImageHeight,
		videoClasses,
	} = props;

	const [imageOrVideo, setImageOrVideo] = useState<any>({
		type: '',
		src: '',
		poster: '',
		altImage: '',
	});

	const getDefaultMedia = (media: any) => {
		if (media?.length === 0) return null;
		const defaultItemArr: any = media.filter((item: any) => item?.is_default);
		return defaultItemArr.length > 0 ? defaultItemArr[0] : media[0];
	};

	const getThumbnailImageOrVideo = (data: any) => {
		const result = { type: '', src: '', poster: '', altImage: '' };

		if (data) {
			const videos =
				data?.project_videos?.length > 0
					? data?.project_videos
					: data?.product_videos?.length > 0
					? data?.product_videos
					: [];
			const images =
				data?.project_images?.length > 0
					? data?.project_images
					: data?.product_images?.length > 0
					? data?.product_images
					: [];
			const defaultVideo = getDefaultMedia(videos);
			const defaultImage = getDefaultMedia(images);

			if (videos.length > 0) {
				result.type = 'VIDEO';
				result.src = defaultVideo?.video || '';
				result.poster = defaultImage?.image || '';
				result.altImage = defaultImage?.image || '';
			} else {
				result.type = 'IMAGE';
				result.src = defaultImage?.image || '';
				result.altImage = defaultImage?.image || '';
			}
			if (video) {
				result.type = 'VIDEO';
			}
		}

		return result;
	};

	useEffect(() => {
		setImageOrVideo(getThumbnailImageOrVideo(data));
	}, [data]);

	return (
		<div className={className}>
			{imageOrVideo && imageOrVideo?.type === 'VIDEO' && (
				<>
					{(imageOrVideo?.src && imageOrVideo?.src !== '') || video ? (
						<Box
							sx={{
								'& video': {
									height: `${height} !important`,
									'@media screen and (max-width: 1440px)': {
										height: `${xlHeight} !important`,
									},
									'@media screen and (max-width: 1024px)': {
										height: `${lgVideoHeight} !important`,
									},
									'@media screen and (max-width: 991px)': {
										height: `${mdVideoHeight} !important`,
									},
								},
							}}
							// className={`video ${height}`}
						>
							<OnHoverPlayVideo
								poster={imageOrVideo?.poster || imagePlaceholder}
								src={video ? video : imageOrVideo?.src} // TODO: Remove comment after testing //src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
								hideScaleView={hideScaleView}
								className={videoClasses}
							/>
						</Box>
					) : (
						<Box
							sx={{
								height: `${height} !important`,
								'@media screen and (max-width: 1440px)': {
									height: `${imgXlHeight} !important`,
								},
								'@media screen and (max-width: 1024px)': {
									height: `${lgImageHeight} !important`,
								},
								'@media screen and (max-width: 991px)': {
									height: `${mdImageHeight} !important`,
								},
								background: `url(${imageOrVideo.altImage || imagePlaceholder})`,
								backgroundPosition: 'center',
								borderRadius: '8px',
							}}
						/>
					)}
				</>
			)}

			{imageOrVideo && imageOrVideo.type === 'IMAGE' && (
				<Box
					sx={{
						height: `${height} !important`,
						'@media screen and (max-width: 1440px)': {
							height: `${imgXlHeight} !important`,
						},
						'@media screen and (max-width: 1024px)': {
							height: `${lgImageHeight} !important`,
						},
						'@media screen and (max-width: 991px)': {
							height: `${mdImageHeight} !important`,
						},
						background: `url(${imageOrVideo.src || imagePlaceholder})`,
						backgroundPosition: 'center',
						borderRadius: '8px',
					}}
				/>
			)}
		</div>
	);
};

ThumbnailImageOrVideo.defaultProps = {
	height: 380,
	hideScaleView: true,
	imagePlaceholder: IMAGE_PLACEHOLDER,
	className: '',
};

export default ThumbnailImageOrVideo;
