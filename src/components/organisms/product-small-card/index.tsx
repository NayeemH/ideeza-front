import React, { useEffect, useState } from 'react';
import IconLabel from '@molecules/icon-label';
import Label from '@atoms/label';
// import { AiFillEye, AiFillLike } from "react-icons/ai";
import { IProject } from '@models/projects';
import { Avatar } from '@mui/material';
import { useFetch } from 'app/api';
import OnHoverPlayVideo from '@molecules/on-hover-play';
import { Box } from '@mui/system';

export interface IProductSmallCard {
	carouselHeight?: string;
	mainClass?: string;
	titleClass?: string;
	nameClass?: string;
	avatarClass?: string;
	noClass?: string;
	iconContanerClass?: string;
	mainIconClass?: string;
	lableIconClass?: any;
	imageSettingIcon?: string;
	imagesIdeezaIcon?: string;
	numbering?: string;
	authorImage?: string;
	numberingValue?: string;
	image?: string;
	project?: string;
	notification?: string;
	avatarMainClass?: string;
	iconMainClass?: string;
	handleProjectClick?: () => void;
	data: IProject;
	productId: any;
}

function ProductSmallCard(props: IProductSmallCard) {
	const {
		// carouselHeight,
		mainClass,
		noClass,
		iconContanerClass,
		mainIconClass,
		lableIconClass,
		imagesIdeezaIcon,
		numbering,
		numberingValue,
		iconMainClass,
		data,
		productId,
		handleProjectClick,
	} = props;
	const [video, setVideo] = useState([]);
	const getProductVideo = async () => {
		const { data } = await useFetch.get(`/product/video/?product__id=${productId}`);
		setVideo(data?.results);
	};

	useEffect(() => {
		getProductVideo();
	}, []);

	return (
		<div
			className={`${mainClass}`}
			onClick={handleProjectClick}
		>
			<div className={`pb-3 relative`}>
				<div className="">
					{/* <img
            src={data?.image ?? "/images/placeholder.jpg"}
            alt="soem"
            className="w-full"
          /> */}
					{video &&
						video.map((item: any, i: any) => {
							return (
								item.is_default == true && (
									<Box
										key={i}
										sx={{
											'& video': {
												height: '203px !important',
												position: 'relative',
											},
										}}
									>
										<OnHoverPlayVideo
											hideScaleView={true}
											// poster={defaultImage}
											src={item.video} // TODO: Remove comment after testing //src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
										/>
									</Box>
								)
							);
						})}
				</div>
				<div className="flex flex-col justify-between absolute w-full -mt-10 2xl:-mt-16">
					<div className={`flex justify-start ${numbering}`}>
						<Label
							value={numberingValue}
							classes={{ root: `text-white ${noClass} ml-1` }}
						/>
					</div>
					<div className={iconMainClass}>
						<IconLabel
							mainClass={mainIconClass}
							iconContanerClass={iconContanerClass}
							lableClass={lableIconClass}
							labelValue={data?.views || '0'}
							labelStyle={{ color: '#fff', fontSize: '18px' }}
							tooltipProps={{
								title: 'views',
								placement: 'top-end',
								arrow: true,
								classes: {
									tooltip:
										'border-none bg-white px-6 text-zinc-500 rounded-full py-4 text-sm',
									arrow: 'text-white w-2 text-md ',
								},
							}}
							// iconComponent={<AiFillLike className="text-white text-3xl" />}
							iconComponent={
								<img
									src="/images/icon/eye-w-icon.svg"
									className={imagesIdeezaIcon}
									alt="i"
								/>
							}
						/>
						<IconLabel
							tooltipProps={{
								title: 'dislikes',
								placement: 'top-end',
								arrow: true,
								classes: {
									tooltip:
										'border-none bg-white px-6 text-zinc-500 rounded-full py-4 text-sm',
									arrow: 'text-white w-2 text-md ',
								},
							}}
							onClick={() => handleProjectClick}
							mainClass={mainIconClass}
							iconContanerClass={iconContanerClass}
							lableClass={lableIconClass}
							labelValue={data?.dislikes || '0'}
							labelStyle={{ color: '#fff', fontSize: '18px' }}
							iconComponent={
								<img
									src="/images/icon/ideeza-w-icon.svg"
									className={imagesIdeezaIcon}
									alt="i"
								/>
							}
						/>
						<IconLabel
							onClick={() => handleProjectClick}
							tooltipProps={{
								title: 'likes',
								placement: 'top-end',
								arrow: true,
								classes: {
									tooltip:
										'border-none bg-white px-6 text-zinc-500 rounded-full py-4 text-sm',
									arrow: 'text-white w-2 text-md ',
								},
							}}
							mainClass={mainIconClass}
							iconContanerClass={iconContanerClass}
							lableClass={lableIconClass}
							labelValue={data?.likes || 0}
							labelStyle={{ color: '#fff', fontSize: '18px' }}
							//   iconComponent={<AiFillEye className="text-white text-3xl" />}
							iconComponent={
								<img
									src="/images/icon/like-w-icon.svg"
									className={imagesIdeezaIcon}
									alt="i"
								/>
							}
						/>
					</div>
				</div>
			</div>
			<div
				className="cursor-pointer hover:bg-gray-100"
				onClick={handleProjectClick}
			>
				<div className="mt-0">
					<div className="ml-3 my-2 flex items-center">
						<Avatar src={data?.user?.profile_photo} />

						<span
							style={{ color: '#666666' }}
							className="ml-2 font-semibold text-base"
						>
							{data?.name ?? 'N/A'}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

ProductSmallCard.defaultProps = {
	mainClass: 'border border-gray-200 bg-white p-2 w-full',
	carouselHeight: 'h-48',
	titleClass: 'text-xl',
	nameClass: 'text-lg text-primary',
	avatarClass: 'w-10 h-10 ',
	noClass: 'text-4xl',
	imageSettingIcon: 'w-6 h-6 mt-1',
	//   imagesIdeezaIcon: "w-10 h-10 mt-2",
	authorName: 'My Project',
	projectName: 'My Project',
	iconMainClass:
		'flex bottom-0  mb-2 justify-between w-4/5 m-auto md:p-2 2xl:p-4 2xl:px-6 rounded-full project-icon-bg-custom',
};
export default ProductSmallCard;
