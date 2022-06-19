import React, { useEffect, useRef, useState } from 'react';
import IconLabel from '@molecules/icon-label';
import Label from '@atoms/label';
import { IProject } from '@models/projects';
import { Avatar } from '@mui/material';
// import { AiOutlineSetting } from "react-icons/ai";
//import { useRouter } from "next/router";
import ThreeJs from '@organisms/threejs';
// import CustomBlockly from '@organisms/blockly';
import GeneralView from '@organisms/product-detail/general-view';
import ThumbnailImageOrVideo from '@molecules/thumbnail-image-or-video';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useDetectSelfUser } from 'app/hooks';
import { openLoginPopup } from 'reducers/login';
import SimpleToolTip from '@atoms/simple-tooltip';
import Link from 'next/link';
import { loadFile, loadGltf } from '@organisms/threejs/layout/functions/onLoadFunctions/functions';
import CreateComponentWorkspace from 'features/blockly/Shared/createComponentWorkspace';
export interface IProjectCarouselContent {
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
	imagesIdeezaEye?: string;
	numbering?: string;
	authorImage?: string;
	numberingValue?: string;
	projectNameClasses?: string;
	image?: string;
	projectId?: string;
	projectData?: any;
	notification?: string;
	creatorNameClass?: string;
	avatarMainClass?: string;
	topIconContainer?: string;
	bottomIconContainer?: string;
	videoClasses?: string;
	ImageHeight?: string;
	contentCreatorWrapper?: string;
	handleProjectClick?: () => void;
	data?: IProject | any;
	gotoProductDetails?: any;
	productThreeDView?: boolean;
	threeDScript?: any;
	video?: any;
	threeDHeight?: number;
	showWorkSpaceInsteadOfImageOrVideo?: boolean;
	initialVideoFor?: 'project' | 'product';
	showContentCreator?: boolean;
	hideNetwork?: boolean;
	type?: 'project' | 'product';
	hideBottomIcons?: boolean;
	showTopIcons?: boolean;
	showUserDetails?: boolean;
}

type IComponent = 'electronic' | 'cover' | 'code' | 'general' | 'network';

function ProjectCarouselContent(props: IProjectCarouselContent) {
	const {
		carouselHeight = 'h-42 pb-3 relative',
		mainClass,
		noClass,
		iconContanerClass,
		mainIconClass,
		lableIconClass,
		imageSettingIcon,
		imagesIdeezaIcon,
		imagesIdeezaEye,
		numbering,
		numberingValue,
		//notification,
		topIconContainer,
		bottomIconContainer,
		data,
		video,
		//ImageHeight,
		handleProjectClick,
		threeDHeight,
		// gotoProductDetails,
		showWorkSpaceInsteadOfImageOrVideo,
		projectData,
		showContentCreator,
		hideNetwork,
		videoClasses,
		contentCreatorWrapper = 'cursor-pointer p-2 ',
		creatorNameClass = 'ml-2 text-primary text-base 2xl:text-lg',
		projectNameClasses = ' text-base 2xl:text-xl font-bold',
		hideBottomIcons = false,
		showTopIcons = true,
		showUserDetails = true,
	} = props;
	//const router = useRouter();
	// console.log(hideBottomIcons, showTopIcons);

	const editorRef = useRef<any>(null);

	const [activeWorkspace, setActiveWorkspace] = useState<IComponent>();

	useEffect(() => {
		if (activeWorkspace === 'cover' && data) {
			if (editorRef?.current) {
				editorRef?.current?.clear();

				loadGltf(editorRef?.current, {
					id: data.id,
					type: 'COVER',
					file: data.three_d_file,
				});
			}
			return;
		}
		if (activeWorkspace === 'electronic' && projectData) {
			if (editorRef?.current) {
				editorRef?.current?.clear();

				// loadGltf(editorRef?.current, {
				// 	id: projectData.id,
				// 	type: 'ELECTRONICS',
				// 	file: projectData.three_d_file,
				// });

				loadFile(editorRef?.current, {
					id: projectData.id,
					type: 'ELECTRONICS',
					file: { ...JSON.parse(projectData.three_d_script) },
				});
			}
			return;
		}
	}, [activeWorkspace]);

	const [hideViewLikeCount, setHideViewLikeCount] = useState<boolean>(false);

	const router = useRouter();
	const isSelfUser = useDetectSelfUser(data?.user?.id);

	const { status } = useSession();
	const dispatch = useAppDispatch();

	const getComponentData = (component: IComponent) => {
		const component_type = component.toUpperCase();
		let script_data = null;
		if (data && data?.components && data?.components?.length > 0) {
			const components = data?.components ?? [];
			const componentIndex = components.findIndex(
				(c: any) => c?.component_type === component_type
			);

			if (componentIndex > -1) {
				const component = components[componentIndex];

				if (component_type === 'CODE') {
					script_data = component?.editor_script;
				} else if (component_type === 'ELECTRONIC' || component_type === 'COVER') {
					script_data = component?.three_d_script;
				}
			}
		}

		return script_data;
	};

	const electronic_data = getComponentData('electronic');
	const cover_data = getComponentData('cover');
	const code_data = getComponentData('code');

	const [initialVideoView, setInitialVideoView] = useState(true);

	return (
		<>
			<div
				className={`${mainClass}` + ' '}
				onClick={handleProjectClick}
				onMouseOver={() => setHideViewLikeCount(true)}
				onMouseOut={() => setHideViewLikeCount(false)}
			>
				<div className={`${carouselHeight} `}>
					<div className="cursor-poiner">
						{showWorkSpaceInsteadOfImageOrVideo && !initialVideoView && (
							<>
								<div
									className={`relative rounded-xl w-full 2xl:h-[${
										threeDHeight ?? 380
									}px] xl:h-[15rem] h-60 cursor-pointer`}
								>
									{activeWorkspace === 'electronic' && (
										<ThreeJs
											{...{
												editorRef,
												viewFile: JSON.parse(electronic_data),
												editorType: 'projectsShowCase',
												toolbar: 'none',
												hideSidePanel: true,
												hideInfo: true,
												containerClass: `rounded-xl w-full h-1000`,
											}}
										/>
									)}

									{activeWorkspace === 'cover' && (
										<ThreeJs
											{...{
												editorRef,
												// viewFile: cover_data,
												viewFile: data?.three_d_file,
												editorType: 'projectsShowCase',
												toolbar: 'none',
												hideSidePanel: true,
												hideInfo: true,
												containerClass: `rounded-xl w-full h-1000`,
											}}
										/>
									)}

									{activeWorkspace === 'code' && (
										<CreateComponentWorkspace editorScript={code_data} />
										// <CustomBlockly
										// 	xmlCode={(code: any) => console.warn(code)}
										// 	jsCode={(code: any) => console.warn(code)}
										// 	svgCode={(code: any) => console.warn(code)}
										// 	initialBlock={code_data}
										// 	type={'component'}
										// />
									)}

									{activeWorkspace === 'general' && (
										<GeneralView
											project_id={projectData?.id}
											electronicThreeDData={electronic_data}
											coverThreeDData={cover_data}
											generalHeight="h-full"
											generalContributor="cursor-pointer absolute md:top-[100px] md:right-[50px]"
											animeSpeedBar="absolute right-[50px] top-[5px]"
										/>
									)}
								</div>

								{/*<img
                  // src={data?.image ?? "/images/placeholder.jpg"}
                  src={data?.image ?? "/images/car.png"}
                  alt="soem"
                  className={`w-full cursor-pointer rounded-[10px] ${ImageHeight}`}
              />*/}
							</>
						)}

						{initialVideoView && (
							<div
								className={`relative rounded-xl w-full 2xl:h-[${
									threeDHeight ?? 380
								}px] xl:h-[15rem] cursor-pointer`}
							>
								<ThumbnailImageOrVideo
									data={props.initialVideoFor === 'product' ? data : projectData}
									video={video}
									imagePlaceholder={
										data?.product_images && data?.product_images?.length > 0
											? data?.product_images[0]?.image
											: ''
									}
									videoClasses={videoClasses}
									height={threeDHeight ? `${threeDHeight}px` : '380px'}
								/>
							</div>
						)}
					</div>
					<div className="flex flex-col justify-between w-full bottom-12">
						<div className={`flex justify-start ${numbering}`}>
							<Label
								value={numberingValue}
								classes={{ root: `text-white ${noClass} ml-1` }}
							/>
						</div>
						{showTopIcons && (
							<div
								className={topIconContainer}
								onClick={(e: any) => {
									e.stopPropagation();
									e.preventDefault();
								}}
							>
								<IconLabel
									mainClass={mainIconClass}
									iconContanerClass={iconContanerClass}
									iconComponent={
										<>
											<SimpleToolTip
												title="Electronics"
												arrow
											>
												<img
													src="/images/icon/logo-electron-white.svg"
													className={imagesIdeezaEye}
													alt="i"
												/>
											</SimpleToolTip>
										</>
									}
									rawClick={true}
									onClick={(e: any) => {
										e.stopPropagation();
										/*router.push(
					`/user/dashboard/projects/project-details/workspace/${data?.id}?view_tab=electronic`
				  );*/
										setInitialVideoView(false);
										setActiveWorkspace('electronic');
									}}
									style={{ cursor: 'pointer' }}
								/>
								<div className="w-[1px]  bg-white"></div>
								<IconLabel
									mainClass={mainIconClass}
									iconContanerClass={iconContanerClass}
									iconComponent={
										<>
											<SimpleToolTip
												title="Code"
												arrow
											>
												<img
													src="/images/icon/arrow-p-icon.svg"
													className={imagesIdeezaIcon}
													alt="i"
												/>
											</SimpleToolTip>
										</>
									}
									rawClick={true}
									onClick={(e: any) => {
										e.stopPropagation();
										/*router.push(
					`/user/dashboard/projects/project-details/workspace/${data?.id}?view_tab=code`
				  );*/
										setInitialVideoView(false);
										setActiveWorkspace('code');
									}}
									style={{ cursor: 'pointer' }}
								/>
								<div className="w-[1px]  bg-white"></div>
								<IconLabel
									mainClass={mainIconClass}
									iconContanerClass={iconContanerClass}
									iconComponent={
										<>
											<SimpleToolTip
												title="Cover"
												arrow
											>
												<img
													src="/images/icon/cube-p-icon.svg"
													className={imageSettingIcon}
													alt="i"
												/>
											</SimpleToolTip>
										</>
									}
									rawClick={true}
									onClick={(e: any) => {
										e.stopPropagation();
										/*router.push(
					`/user/dashboard/projects/project-details/workspace/${data?.id}?view_tab=cover`
				  );*/
										setInitialVideoView(false);
										setActiveWorkspace('cover');
									}}
									style={{ cursor: 'pointer' }}
								/>
								<div className="w-[1px]  bg-white"></div>
								<IconLabel
									mainClass={mainIconClass}
									iconContanerClass={iconContanerClass}
									iconComponent={
										<>
											<SimpleToolTip
												title="Settings"
												arrow
											>
												<img
													src="/images/icon/settings-outline.svg"
													className={imageSettingIcon + ' bright'}
													alt="i"
												/>
												{/* <AiOutlineSetting
                        className={`${imageSettingIcon} text-white`}
                      /> */}
											</SimpleToolTip>
										</>
										// <img
										//   src="/images/icon/settings-outline.svg"
										//   className={imageSettingIcon}
										//   alt="i"
										// />
									}
									rawClick={true}
									onClick={(e: any) => {
										e.stopPropagation();
										/*router.push(
					`/user/dashboard/projects/project-details/workspace/${data?.id}?view_tab=general`
				  );*/
										setInitialVideoView(false);
										setActiveWorkspace('general');
									}}
									style={{ cursor: 'pointer' }}
								/>
								{!hideNetwork && (
									<>
										<div className="w-[1px]  bg-white"></div>
										<IconLabel
											mainClass={mainIconClass}
											iconContanerClass={iconContanerClass}
											iconComponent={
												<img
													src="/images/icon/p-wifi.svg"
													className={imageSettingIcon}
													alt="i"
												/>
											}
											rawClick={true}
											onClick={(e: any) => {
												e.stopPropagation();
												/*router.push(
						`/user/dashboard/projects/project-details/workspace/${data?.id}?view_tab=network`
					  );*/
											}}
											style={{ cursor: 'pointer' }}
										/>
									</>
								)}

								{isSelfUser && (
									<>
										<div className="w-[1px]  bg-white"></div>
										<IconLabel
											mainClass={mainIconClass}
											iconContanerClass={iconContanerClass}
											iconComponent={
												<>
													<SimpleToolTip
														title="Edit"
														arrow
													>
														<img
															src="/images/icon/p-cup.svg"
															className={imageSettingIcon}
															alt="i"
														/>
													</SimpleToolTip>
												</>
											}
											rawClick={true}
											onClick={(e: any) => {
												e.stopPropagation();

												if (status === 'authenticated') {
													return router.push(
														`/user/dashboard/product/${data?.id}/workspace?&view_tab=electronic`
													);
												}

												dispatch(openLoginPopup({ ref: '' }));
											}}
											style={{ cursor: 'pointer' }}
										/>
									</>
								)}
							</div>
						)}

						{!hideBottomIcons && (
							<div
								className={
									(hideViewLikeCount ? 'hidden ' : ' ') + bottomIconContainer
								}
							>
								<IconLabel
									onClick={() => handleProjectClick}
									tooltipProps={{
										title: 'Views',
										placement: 'top-end',
										arrow: true,
										classes: {
											tooltip:
												'border-none bg-white px-6 text-gray-500 rounded-full py-1 text-sm',
											arrow: 'text-white w-2 text-md ',
										},
									}}
									mainClass={mainIconClass + ' pr-[8px] border-r border-gray-100'}
									iconContanerClass={iconContanerClass}
									lableClass={lableIconClass}
									labelValue={data?.views ?? 0}
									iconComponent={
										<img
											src="/images/icon/Icon-remove-red-eye.svg"
											className={imagesIdeezaEye}
											alt="i"
										/>
									}
									style={{ cursor: 'pointer' }}
								/>
								{/* <div className="w-[1px] mr-2 bg-white"></div> */}
								<IconLabel
									mainClass={mainIconClass + ' pr-[8px] border-r border-gray-100'}
									iconContanerClass={iconContanerClass + ' ml-[13px]'}
									lableClass={lableIconClass}
									labelValue={0}
									tooltipProps={{
										title: 'Actions',
										placement: 'top-end',
										arrow: true,
										classes: {
											tooltip:
												'border-none bg-white px-6 text-gray-500 rounded-full py-1 text-sm',
											arrow: 'text-white w-2 text-md ',
										},
									}}
									iconComponent={
										<img
											src="/images/icon/ideeza-primary.svg"
											className={imagesIdeezaIcon}
											alt="i"
										/>
									}
									style={{ cursor: 'pointer' }}
								/>

								<IconLabel
									tooltipProps={{
										title: 'Like',
										placement: 'top-end',
										arrow: true,
										classes: {
											tooltip:
												'border-none bg-white px-6 text-gray-500 rounded-full py-1 text-sm',
											arrow: 'text-white w-2 text-md ',
										},
									}}
									mainClass={mainIconClass}
									iconContanerClass={iconContanerClass + ' ml-[13px]'}
									lableClass={lableIconClass}
									labelValue={data?.likes ?? 0}
									iconComponent={
										<img
											src="/images/icon/favorite-heart-button.svg"
											className={imageSettingIcon}
											alt="i"
										/>
									}
									style={{ cursor: 'pointer' }}
								/>
							</div>
						)}
					</div>
				</div>
				{showContentCreator && (
					<div className={contentCreatorWrapper}>
						<div className="mt-1">
							<div className={projectNameClasses}>
								<Link href={`/user/dashboard/project/${data?.id}`}>
									<SimpleToolTip
										title={data?.name}
										arrow
									>
										<a className="hover:underline whitespace-nowrap">{`${
											data?.name?.length < 27
												? data?.name
												: data?.name?.slice(0, 27) + '...'
										}`}</a>
										{/* <a className="hover:underline text-ellipsis">{`${data?.name}`}</a> */}
									</SimpleToolTip>
								</Link>
							</div>
							{showUserDetails && (
								<div
									className=" my-2 flex items-center"
									onClick={() => router.push(`/user/profile/${data?.user?.id}`)}
								>
									<Avatar src={data?.user?.profile_photo} />

									<span
										// style={{ color: "#666666" }}
										className={creatorNameClass}
									>
										{data?.user?.first_name ?? ''} {data?.user?.last_name ?? ''}
									</span>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

ProjectCarouselContent.defaultProps = {
	mainClass: 'border border-gray-200 rounded-[15px] bg-white p-[15px] w-full',
	carouselHeight: 'h-48',
	titleClass: 'text-xl',
	nameClass: 'text-lg text-primary',
	avatarClass: 'w-10 h-10 ',
	noClass: 'text-4xl',
	imageSettingIcon: 'w-6 h-6 mt-1',
	imagesIdeezaIcon: 'w-6 h-4 mt-2',
	authorName: 'My Project',
	projectName: 'My Project',
	iconMainClass: 'justify-between',
	topIconContainer:
		'flex absolute top-[30px]  right-[30px] pl-1 w-[45%] px-3 p-2 md:p-2 2xl:py-3 xl:px-5 rounded-full project-icon-bg-custom justify-between',
	bottomIconContainer:
		'flex absolute bottom-[40px] right-[30px] pl-1 w-[45%] px-3 p-2 md:p-2 2xl:py-3 xl:px-5 rounded-full project-icon-bg-custom justify-between',
	ImageHeight: 'h-full',
	showContentCreator: true,
};

export default ProjectCarouselContent;
