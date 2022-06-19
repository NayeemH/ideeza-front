import IconLabel from '@molecules/icon-label';
import React from 'react';
//import { BsFillHeartFill } from "react-icons/bs";
import { numerify } from 'utils/utils';

interface IProjectIcons {
	viewCount?: number;
	likeCount?: number;
	contributeScoreCount?: number;
}
const ProjectIcons = (props: IProjectIcons) => {
	const { viewCount, contributeScoreCount, likeCount } = props;

	// console.log(`2. #${id}. likeCount(${likeCount}), viewCount(${viewCount}), contributeScoreCount(${contributeScoreCount}) ------`)

	return (
		<div
			className={`lg:w-[283px] flex absolute bottom-[5%] right-[2%] justify-between w-[80%] sm:w-[60%] md:w-[40%] m-auto px-[15px] lg:px-[20px] py-[10px] rounded-full project-icon-bg-custom`}
		>
			<IconLabel
				mainClass="flex items-center mr-2"
				iconContanerClass="text-white mr-2"
				lableClass={{
					root: 'text-white text-base 2xl:text-xl font-sans',
				}}
				labelValue={numerify(viewCount || 0)}
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
						className="md:w-4 md:h-4 2xl:w-[30px] 2xl:h-[30px] w-5 h-5"
						alt="i"
					/>
				}
			/>
			<div className="w-[1px] h-[20px] bg-white m-auto"></div>
			<IconLabel
				mainClass="flex items-center mr-2"
				iconContanerClass="text-white mr-2"
				lableClass={{
					root: 'text-white text-base 2xl:text-xl font-sans',
				}}
				tooltipProps={{
					title: 'Contribute Score',
					placement: 'top-end',
					arrow: true,
					classes: {
						tooltip:
							'border-none bg-white px-6 text-zinc-500 rounded-full py-4 text-sm',
						arrow: 'text-white w-2 text-md ',
					},
				}}
				labelValue={contributeScoreCount}
				iconComponent={
					<img
						src="/images/icon/ideeza-w-icon.svg"
						className="md:w-4 md:h-4 2xl:w-[30px] 2xl:h-[30px] w-5 h-5"
						alt="i"
					/>
				}
			/>
			<div className="w-[1px] h-[20px] bg-white m-auto"></div>
			<IconLabel
				mainClass="flex items-center"
				iconContanerClass="text-white mr-2"
				lableClass={{
					root: 'text-white text-base 2xl:text-xl font-sans',
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
				labelValue={numerify(likeCount || 0)}
				iconComponent={
					<img
						src="/images/icon/favorite-heart-button.svg"
						className="md:w-4 md:h-4 2xl:w-[25px] 2xl:h-[25px] w-5 h-5"
						alt="i"
					/>
				}
			/>
		</div>
	);
};

ProjectIcons.defaultProps = {
	// height: 380,
	// hideScaleView: true,
	// imagePlaceholder: IMAGE_PLACEHOLDER,
	//   className: "",
};

export default ProjectIcons;
