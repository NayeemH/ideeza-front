import React from 'react';
import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import { ImageCardProps } from 'models/user-project';
import { BsFillHeartFill } from 'react-icons/bs';
// import { Avatar } from "@mui/material";

// TODO: remove data binding from dumb components
const ImgCard: React.FC<ImageCardProps> = ({
	carouselHeight,
	// img,
	value,
	numbering,
	//   iconComponent1,
	//   iconComponent2,
	//   iconComponent3,
	//   iconsClass,
	iconValue1,
	iconValue2,
	iconValue3,
	noClass,
	mainIconClass,
	iconContanerClass,
	lableClass,
	imgClasses,
	onClick,
	text,
	title,
	imgSrc,
	bottomIconContainer,
}) => {
	return (
		<>
			<div className={`${carouselHeight} w-full p-0 relative `}>
				<img
					onClick={onClick}
					// src={img ? img : "/images/placeholder.jpg"}
					src={imgSrc ? imgSrc : '/images/placeholder.jpg'}
					alt="Loading..."
					className={`${imgClasses} w-full 2xl:h-[380px] h-[270px] border cursor-pointer`}
				/>
				<div className="h-full flex flex-col justify-between w-full -mt-14 2xl:-mt-20">
					<div className={`flex justify-start ${numbering}`}>
						<Label
							value={value}
							classes={{ root: `text-black ${noClass} ml-3` }}
						/>
					</div>
					<div className="absolute bottom-0 left-0">{text}</div>
					<div className={bottomIconContainer}>
						<IconLabel
							mainClass={mainIconClass}
							iconContanerClass={iconContanerClass}
							lableClass={lableClass}
							labelValue={iconValue1}
							tooltipProps={{
								title: 'Connects',
								placement: 'top-end',
								arrow: true,
								classes: {
									tooltip:
										'border-none bg-white px-6 text-zinc-500 rounded-full py-4 text-sm',
									arrow: 'text-white w-2 text-md ',
								},
							}}
							iconComponent={
								<img
									src="/images/icon/eye-w-icon.svg"
									className="md:w-4 md:h-4 2xl:w-6 2xl:h-6 w-5 h-5"
									alt="i"
								/>
							}
							// TODO
							onClick={() => {
								'goto';
							}}
						/>

						<IconLabel
							// TODO
							onClick={() => {
								'goto';
							}}
							tooltipProps={{
								title: 'Dislike',
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
							lableClass={lableClass}
							labelValue={iconValue2}
							iconComponent={
								<img
									src="/images/icon/ideeza-w-icon.svg"
									className="md:w-4 md:h-4 2xl:w-6 2xl:h-6 w-5 h-5"
									alt="i"
								/>
							}
						/>
						<IconLabel
							// TODO
							onClick={() => {
								'goto';
							}}
							tooltipProps={{
								title: 'Likes',
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
							lableClass={lableClass}
							labelValue={iconValue3}
							iconComponent={
								<BsFillHeartFill className="text-white text-md lg:text-lg" />
							}
						/>
					</div>
				</div>
				<div
					className="cursor-pointer hover:bg-gray-100"
					// onClick={handleProjectClick}
				>
					<div className="mt-0">
						<div className="ml-3 my-2 flex items-center">
							{/* <Avatar src={data?.user?.profile_photo} /> */}

							<span
								style={{ color: '#666666' }}
								className="ml-2 font-semibold text-primary text-xl py-3"
							>
								{/* {data?.name ?? "N/A"} */}
								{title}
								{/* {console.log(title)} */}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
ImgCard.defaultProps = {
	iconsClass: 'flex justify-between space-x-2',
	bottomIconContainer:
		'lg:w-52 flex bottom-0  justify-between w-4/5 m-auto px-2 lg:px-4 py-1 rounded-full project-icon-bg-custom',
};

export default ImgCard;
