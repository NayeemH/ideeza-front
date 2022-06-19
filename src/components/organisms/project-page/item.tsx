import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import ThumbnailImageOrVideo from '@molecules/thumbnail-image-or-video';
import { Box } from '@mui/system';
import { useState } from 'react';
import { BsFillHeartFill } from 'react-icons/bs';

const ProjectPageItem = (props: any) => {
	const {
		item,
		goToDetailPage,
		thumbnailOrVideoHeight,
		containerHeight,
		toolbarContainerStyle,
		iconsContainerClasses = 'lg:w-52 w-[80%] md:w-[70%] absolute right-[10%] 2xl:right-[20px] z-50 cursor-text bottom-6 2xl:bottom-12 bg-gradient-to-r from-[#FA00C5] to-[#550F8A] text-white rounded-2xl px-2 lg:px-4 py-1 flex justify-between',
	} = props;
	const [hideViewLikeCount, setHideViewLikeCount] = useState(false);

	return (
		<div
			className={`p-[7px] 2xl:p-[9px] cursor-pointer max-h-[500px] pb-3 rounded-2xl w-full hover:bg-[#E6E6E6] border`}
			onClick={() => goToDetailPage(item)}
		>
			<Box
				className={`relative w-full ${!containerHeight ? '2xl:h-[380px] h-[270px]' : ''}  `}
				sx={{
					height: containerHeight ? `${containerHeight} !important` : 'auto',
				}}
				onMouseOver={() => setHideViewLikeCount(true)}
				onMouseOut={() => setHideViewLikeCount(false)}
			>
				{/*<ThreeJs
				{...{
					viewFile: {electronic: ${electronicScript, cover: ${coverFile}}} JSON.parse(item?.three_d_script),
					toolbar: "none",
					hideSidePanel: true,
					hideInfo: true,
					containerClass: "rounded-xl w-full ",
				}}
			/>*/}
				<ThumbnailImageOrVideo
					data={item}
					height={thumbnailOrVideoHeight ?? '350px'}
					xlHeight="250px"
					imgXlHeight="250px"
				/>
				<Box
					className={`${iconsContainerClasses} ${hideViewLikeCount ? 'hidden' : ''}`}
					style={toolbarContainerStyle}
				>
					<IconLabel
						mainClass="flex items-center"
						iconContanerClass="bg-transparent mr-2"
						lableClass={{
							root: ' text-sm lg:text-md  text-white',
						}}
						labelValue={item?.views || '0'}
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
								className="md:w-4 md:h-4 2xl:w-6 2xl:h-6 w-4 h-4"
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
						mainClass="flex items-center"
						iconContanerClass="bg-transparent mr-2"
						lableClass={{
							root: ' text-sm lg:text-md  text-white',
						}}
						labelValue={item?.views || '0'}
						iconComponent={
							<img
								src="/images/icon/ideeza-w-icon.svg"
								className="md:w-4 md:h-4 2xl:w-6 2xl:h-6"
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
						mainClass="flex items-center"
						iconContanerClass="bg-transparent mr-2"
						lableClass={{
							root: ' text-sm lg:text-md  text-white',
						}}
						labelValue={item?.likes || '0'}
						iconComponent={<BsFillHeartFill className="text-md lg:text-lg" />}
					/>
					{/* <div className="flex">
					<div className="flex items-center px-1 border-r-2 border-white z-auto">
						<Tooltip TransitionComponent={Zoom} title={item?.views}>
							<>
								<AiFillEye className="text-lg lg:text-2xl" />
								<span className="ml-1 lg:mr-1 text-sm lg:text-md">
									{item?.views}
								</span>
							</>
						</Tooltip>
					</div>

					<div className="flex items-center px-1 border-r-2 border-white lg:ml-1">
						<svg
							className="lg:w-6 lg:h-6 w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 31.651 26.018"
						>
							<g
								id="Group_1662"
								data-name="Group 1662"
								transform="translate(-175.215 -645.508)"
							>
								<path
									id="Path_128"
									data-name="Path 128"
									d="M168.435,23.832c0-5.828-7.147-10.551-15.962-10.551-6.612,0-12,2.853-14.44,6.333A6.662,6.662,0,0,0,138.6,28c1.925,2.24,2.7,3.59,4.352,7.554,1.19,2.86,3.746,3.727,6.59,3.747,2.341.017,4.518-1.608,5.909-3.246a17.633,17.633,0,0,1,6.57-4.283c4.048-1.335,6.418-4.161,6.418-7.938"
									transform="translate(38.43 632.227)"
									fill="white"
								/>
								<path
									id="Path_129"
									data-name="Path 129"
									d="M160.276,24.2c-.2-.209-2.052-1.277-2.707-1.746a30.7,30.7,0,0,0-4.411-2.363c-.429-.177-.812-.462-1.228-.673-.585-.3-1.177-.578-1.773-.851a.879.879,0,0,0-1.36.828c-.017.468.052,11.1.039,11.861a1.488,1.488,0,0,0,1.753,1.636,3.545,3.545,0,0,0,1.266-.536,19.22,19.22,0,0,0,2.16-1.343c1.043-.719,5.479-4.943,6.136-5.4a.886.886,0,0,0,.125-1.418"
									transform="translate(36.902 631.571)"
									fill="#FF00C7"
								/>
							</g>
						</svg>

						<span className="text-sm lg:text-md ml-1 lg:mr-1">
							{item?.views}
						</span>
					</div>

					<div className="flex items-center px-1 pl-2">
						<BsFillHeartFill className="text-md lg:text-lg" />
						<span className="text-sm lg:text-md ml-1">
							{item?.likes}
						</span>
					</div>
				</div> */}
				</Box>
			</Box>
			<div className="-mt-3">
				<Label
					value={item?.name?.length > 20 ? item?.name?.slice(0, 20) + '...' : item?.name}
					className="text-lg md:text-xl lg:text-2xl 2xl:text-[26px] font-bold font-proxima-nova text-[#000000]"
				/>
			</div>
		</div>
	);
};

export default ProjectPageItem;
