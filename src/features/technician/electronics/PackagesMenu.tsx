import React, { useEffect, useState } from 'react';
import Loader from '@atoms/loader';
import { useOutsideClickHandler } from 'utils/utils';
// import { TreeItem } from '@mui/lab';
// import { FiPlus } from 'react-icons/fi';
import Button from '@atoms/button';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { apiService } from '../../../utils/request';
import {
	setCustomizeMenu,
	setNewModule,
	setOpenBlockMenu,
	setPackage,
} from '@layouts/private/sidebar/reducer';
// import { MdVerifiedUser } from 'react-icons/md';
// import { FaDownload } from 'react-icons/fa';
import BlockDetails from '@molecules/onclick-block-details';
// import { useRouter } from 'next/router';

export default function PackagesMenu({ selectedBlock }: { selectedBlock: any }) {
	const dispatch = useAppDispatch();
	const ref = React.useRef(null);
	// const router = useRouter();
	const closeThisMenu = () => dispatch(setOpenBlockMenu(''));
	useOutsideClickHandler(ref, () => closeThisMenu());

	// useOutsideClickHandler(ref, () => {
	// 	if (!openBlockDetails) {
	// 		dispatch(setOpenBlockMenu(''));
	// 	}
	// });

	// const [mounted, setMounted] = useState(false);
	const currentMenu = useAppSelector((state) => state.sidebar.currentTabMenu);
	const customizeMenu = useAppSelector((state) => state.sidebar.customizeMenu);
	const newAddedModule = useAppSelector((state) => state.sidebar.package.newModule);
	const mode = useAppSelector(({ sidebar }) => sidebar?.package.sidebar_selected_package_mode);
	const moduleType = useAppSelector(
		({ sidebar }) => sidebar?.package.sidebar_selected_package_type
	);

	const [clickedBlock, setClickedBlock] = useState<any>();
	const [openBlockDetails, setOpenBlogDetails] = useState(false);

	const perPage = 10;
	const [bodyPbCurrentPage, setBodyPbCurrentPage] = useState<number>(0);
	const [bodyPvCurrentPage, setBodyPvCurrentPage] = useState<number>(0);
	const [legPbCurrentPage, setLegPbCurrentPage] = useState<number>(0);
	const [legPvCurrentPage, setLegPvCurrentPage] = useState<number>(0);

	const [bodyPbPageCount, setBodyPbPageCount] = useState<number>(0);
	const [bodyPvPageCount, setBodyPvPageCount] = useState<number>(0);
	const [legPbPageCount, setLegPbPageCount] = useState<number>(0);
	const [legPvPageCount, setLegPvPageCount] = useState<number>(0);

	const [bodyPbResCount, setBodyPbResCount] = useState<number>(0);
	const [bodyPvResCount, setBodyPvResCount] = useState<number>(0);
	const [legPbResCount, setLegPbResCount] = useState<number>(0);
	const [legPvResCount, setLegPvResCount] = useState<number>(0);

	const [bodyPbLoading, setBodyPbLoading] = useState<boolean>(false);
	const [bodyPvLoading, setBodyPvLoading] = useState<boolean>(false);
	const [legPbLoading, setLegPbLoading] = useState<boolean>(false);
	const [legPvLoading, setLegPvLoading] = useState<boolean>(false);
	const [bodyPackageModules, setBodyPackageModules] = useState<{ public: any[]; private: any[] }>(
		{
			public: [],
			private: [],
		}
	);

	const [legPackageModules, setLegPackageModules] = useState<{ public: any[]; private: any[] }>({
		public: [],
		private: [],
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getICPackageModules = async (
		type: 'BODY' | 'LEG',
		visible: boolean,
		page = 0,
		pageSize = 10,
		callback: (data: any) => void,
		concat = true
	) => {
		if (type == 'BODY' && visible) setBodyPbLoading(true);
		else if (type == 'BODY' && !visible) setBodyPvLoading(true);
		else if (type == 'LEG' && visible) setLegPbLoading(true);
		else if (type == 'LEG' && !visible) setLegPvLoading(true);

		const pageNum = page + 1;
		setIsLoading(true);
		await apiService(
			{
				method: 'get',
				// url: `/ic-package/module/?is_visible=${visible}&module_type=${type}&page=${pageNum}&page_size=${pageSize}`,
				url: `/ic-package/module/?is_visible=${visible}&module_type=${type}&page=${pageNum}&page_size=${30}`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					const results = data.results;

					const visibleType = visible ? 'public' : 'private';
					let modules: any = {};

					if (type === 'BODY') {
						setBodyPackageModules((items) => {
							modules = {
								...items,
								[visibleType]: concat
									? [...items[visibleType], ...results]
									: results,
							};
							setIsLoading(false);
							return modules;
						});
					}

					if (type === 'LEG') {
						setLegPackageModules((items) => {
							modules = {
								...items,
								[visibleType]: concat
									? [...items[visibleType], ...results]
									: results,
							};
							setIsLoading(false);
							return modules;
						});
					}

					if (type == 'BODY' && visible) {
						setBodyPbLoading(false);
						setBodyPbResCount(modules.public.length);
					} else if (type == 'BODY' && !visible) {
						setBodyPvLoading(false);
						setBodyPvResCount(modules.private.length);
					} else if (type == 'LEG' && visible) {
						setLegPbLoading(false);
						setLegPbResCount(modules.public.length);
					} else if (type == 'LEG' && !visible) {
						setLegPvLoading(false);
						setLegPvResCount(modules.private.length);
					}

					callback({ type, visible, page: pageNum, pageSize, count: data?.count });
					dispatch(setNewModule({ isSucceed: false }));
					setIsLoading(false);
					return;
				} else {
					if (type == 'BODY' && visible) setBodyPbLoading(false);
					else if (type == 'BODY' && !visible) setBodyPvLoading(false);
					else if (type == 'LEG' && visible) setLegPbLoading(false);
					else if (type == 'LEG' && !visible) setLegPvLoading(false);
					setIsLoading(false);
				}
			}
		);
	};

	/*const selected_modules = useAppSelector((state) => state.sidebar?.package?.selected_modules);

	const storeModule = (type: 'body' | 'leg', module: any) => {
		const data: any = { ...selected_modules };
		if (type === 'body') {
			data.body = module;
		} else if (type === 'leg') {
			data.leg = module;
		}

		dispatch(
			setPackage({
				selected_modules: data,
			})
		);
	};*/

	const openAddPackage = (type: 'BODY' | 'LEG', visible: boolean) => {
		dispatch(
			setPackage({
				addPackageOpen: true,
				selected_module_type: type,
				selected_module_is_visible: visible,
			})
		);

		setCustomizeMenu('');
	};

	const successCallback = (data: any, currentPageNum?: number) => {
		const { type, visible, page, pageSize, count } = data;
		if (type == 'BODY' && visible) {
			setBodyPbCurrentPage(currentPageNum || page);
			setBodyPbPageCount(count > pageSize ? Math.ceil(count / pageSize) : 1);
		} else if (type == 'BODY' && !visible) {
			setBodyPvCurrentPage(currentPageNum || page);
			setBodyPvPageCount(count > pageSize ? Math.ceil(count / pageSize) : 1);
		} else if (type == 'LEG' && visible) {
			setLegPbCurrentPage(currentPageNum || page);
			setLegPbPageCount(count > pageSize ? Math.ceil(count / pageSize) : 1);
		} else if (type == 'LEG' && !visible) {
			setLegPvCurrentPage(currentPageNum || page);
			setLegPvPageCount(count > pageSize ? Math.ceil(count / pageSize) : 1);
		}
	};

	const getCurrentPageNum = (type: 'BODY' | 'LEG', visible: boolean) => {
		if (type == 'BODY' && visible) return bodyPbCurrentPage;
		else if (type == 'BODY' && !visible) return bodyPvCurrentPage;
		else if (type == 'LEG' && visible) return legPbCurrentPage;
		else if (type == 'LEG' && !visible) return legPvCurrentPage;
	};

	const getResultLengthCount = (type: 'BODY' | 'LEG', visible: boolean) => {
		if (type == 'BODY' && visible) return bodyPbResCount;
		else if (type == 'BODY' && !visible) return bodyPvResCount;
		else if (type == 'LEG' && visible) return legPbResCount;
		else if (type == 'LEG' && !visible) return legPvResCount;
	};

	const onScrollLoadMore = (type: 'BODY' | 'LEG', visible: boolean) => {
		getICPackageModules(type, visible, getCurrentPageNum(type, visible), perPage, (data) =>
			successCallback(data)
		);
	};

	const handleSelectedModule = (module: any) => {
		setClickedBlock(module);
		setOpenBlogDetails(true);
	};

	useEffect(() => {
		if (currentMenu === 'Customize' && customizeMenu === 'packages') {
			setBodyPbCurrentPage(0);
			setBodyPvCurrentPage(0);
			setLegPbCurrentPage(0);
			setLegPvCurrentPage(0);

			if (moduleType === 'body') {
				if (mode === 'public') {
					getICPackageModules('BODY', true, 0, perPage, (data) => successCallback(data));
				}

				if (mode === 'private') {
					getICPackageModules('BODY', false, 0, perPage, (data) => successCallback(data));
				}
			}

			if (moduleType === 'leg') {
				if (mode === 'public') {
					getICPackageModules('LEG', true, 0, perPage, (data) => successCallback(data));
				}

				if (mode === 'private') {
					getICPackageModules('LEG', false, 0, perPage, (data) => successCallback(data));
				}
			}
		}
	}, [currentMenu, customizeMenu, mode, moduleType]);

	// console.log(moduleType);

	useEffect(() => {
		if (newAddedModule.isSucceed === true) {
			getICPackageModules(
				newAddedModule.type,
				newAddedModule.visible,
				0,
				Number(getResultLengthCount(newAddedModule?.type, newAddedModule?.visible)) + 1,
				(data) =>
					successCallback(
						data,
						getCurrentPageNum(newAddedModule?.type, newAddedModule?.visible) || 0
					),
				false
			);
		}
	}, [newAddedModule.isSucceed]);
	// console.log('packages is calling', legPackageModules);
	// console.log('packages is bodyPackageModules', bodyPackageModules);
	// console.log('packages is moduleType', moduleType);

	return (
		<div
			className="fixed top-24 w-96 bg-gray-200 p-6 "
			style={{ left: '300px', zIndex: 1200, height: 'calc(100vh - 50px)' }}
			ref={ref}
		>
			{moduleType === 'body' && (
				<>
					{mode === 'public' && (
						<>
							{/* <div
								className=""
								style={{
									// maxHeight: '550px',
									paddingBottom: '5px',
									marginTop: '10px',
								}}
							> */}
							<div className="w-full flex justify-center mb-[25px]">
								<Button
									value="Add new part"
									className="text-[14px] text-white bg-primary px-[19px] pt-[6px] pb-[7px]"
									onClick={() => {
										openAddPackage('BODY', true);
										closeThisMenu();
									}}
								/>
							</div>

							{isLoading && <Loader type="relative" />}
							<ul className="h-full overflow-y-auto pb-28">
								{bodyPackageModules.public.map((module, index) => (
									<li
										key={index}
										className="cursor-pointer mb-4 pr-2"
										onClick={() => handleSelectedModule(module)}
									>
										<div className={'mb-7'}>
											<b>{module?.name}</b>
											<div
												className="relative"
												style={{ textAlign: 'center' }}
											>
												<img
													src={
														module?.image_svg &&
														module?.image_svg !== ''
															? module?.image_svg
															: '/images/placeholder.jpg'
													}
													alt="Block Image"
													className={` hover:shadow-xl transition-all ease-in delay-150 h-[120px] 2xl:h-[150px] object-cover w-full rounded-md  ${
														clickedBlock?.id === module?.id
															? ' border-4 border-primary'
															: ''
													}`}
													style={{
														display: 'inline-block',
														border: '1px solid #dddddd',
													}}
												/>
												<div className=" w-64 flex justify-between items-center absolute bottom-0 pb-2">
													{/* <div className="ml-4">
														<MdVerifiedUser className="text-primary" />
													</div>
													<div className="flex">
														<div className="flex bg-[#000000] opacity-[35%] items-center mr-[10px] px-[15px] py-[4px] ">
															<FaDownload className="text-white" />
															<span className="text-white ml-1">
																500
															</span>
														</div>
														<div className="text-white bg-[#000000] opacity-[35%] pl-[35px] pr-[27px] py-[4px]">
															5 $
														</div>
													</div> */}
												</div>
											</div>
										</div>
									</li>

									// <TreeItem
									// 	key={index}
									// 	nodeId={module?.id.toString()}
									// 	label={
									// 		<div style={{ textAlign: 'left' }}>
									// 			<div
									// 				style={{
									// 					position: 'relative',
									// 					display: 'inline-block',
									// 				}}
									// 			>
									// 				<div
									// 					onClick={() => handleSelectedModule(module)}
									// 					className="cursor-pointer mb-4 pr-2 relative"
									// 				>
									// 					<img
									// 						src={
									// 							module?.three_d_file &&
									// 							module?.three_d_file !== ''
									// 								? module?.three_d_file
									// 								: '/images/placeholder.jpg'
									// 						}
									// 						alt={''}
									// 						style={{
									// 							// width: 50,
									// 							display: 'inline-block',
									// 							padding: '4px',
									// 						}}
									// 						className="w-64 h-32 rounded-md"
									// 					/>
									// 					<div className=" w-60 flex justify-between items-center absolute bottom-0 pb-2">
									// 						<div className="ml-4">
									// 							<MdVerifiedUser className="text-primary" />
									// 						</div>
									// 						<div className="flex">
									// 							<div className="flex bg-[#000000] opacity-[35%] items-center mr-[10px] px-[15px] py-[4px] ">
									// 								<FaDownload className="text-white" />
									// 								<span className="text-white ml-1">
									// 									500
									// 								</span>
									// 							</div>
									// 							<div className="text-white bg-[#000000] opacity-[35%] pl-[35px] pr-[27px] py-[4px]">
									// 								5 $
									// 							</div>
									// 						</div>
									// 					</div>
									// 				</div>
									// 			</div>
									// 			{bodyPackageModules.public.length === index + 1 && (
									// 				<div
									// 					style={{
									// 						position: 'absolute',
									// 						bottom: -20,
									// 						right: 50,
									// 					}}
									// 					onClick={(e: any) => {
									// 						e.stopPropagation();
									// 						openAddPackage('BODY', true);
									// 					}}
									// 					className=""
									// 				>
									// 					<FiPlus />
									// 				</div>
									// 			)}
									// 		</div>
									// 	}
									// 	onClick={() => {
									// 		// storeModule('body', module);
									// 	}}
									// />
								))}

								{/* </InfiniteScroll> */}
							</ul>
							{bodyPbCurrentPage < bodyPbPageCount && (
								<Button
									onClick={() => onScrollLoadMore('BODY', true)}
									value={bodyPbLoading ? 'Loading...' : 'Load More'}
									disabled={bodyPbLoading}
									className="text-xs px-3 py-1 bg-primary text-white ml-9 mt-4"
								/>
							)}
						</>
					)}

					{mode === 'private' && (
						<>
							<div className="w-full flex justify-center mb-[25px]">
								<Button
									value="Add new part"
									className="text-[14px] text-white bg-primary px-[19px] pt-[6px] pb-[7px]"
									onClick={() => openAddPackage('BODY', false)}
								/>
							</div>
							{isLoading && <Loader type="relative" />}
							<ul className="h-full overflow-y-auto pb-28">
								{bodyPackageModules.private.map((module, index) => (
									<li
										key={index}
										className="cursor-pointer mb-4 pr-2"
										onClick={() => handleSelectedModule(module)}
									>
										<div className={'mb-7'}>
											<b>{module?.name}</b>
											<div
												className="relative"
												style={{ textAlign: 'center' }}
											>
												<img
													src={
														module?.image_svg &&
														module?.image_svg !== ''
															? module?.image_svg
															: '/images/placeholder.jpg'
													}
													alt="Block Image"
													className={` hover:shadow-xl transition-all ease-in delay-150 h-[120px] 2xl:h-[150px] object-cover w-full rounded-md  ${
														clickedBlock?.id === module?.id
															? ' border-4 border-primary'
															: ''
													}`}
													style={{
														display: 'inline-block',
														border: '1px solid #dddddd',
													}}
												/>
												<div className=" w-64 flex justify-between items-center absolute bottom-0 pb-2">
													{/* <div className="ml-4">
														<MdVerifiedUser className="text-primary" />
													</div> */}
													{/* <div className="flex">
														<div className="flex bg-[#000000] opacity-[35%] items-center mr-[10px] px-[15px] py-[4px] ">
															<FaDownload className="text-white" />
															<span className="text-white ml-1">
																500
															</span>
														</div>
														<div className="text-white bg-[#000000] opacity-[35%] pl-[35px] pr-[27px] py-[4px]">
															5 $
														</div>
													</div> */}
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>

							{bodyPvCurrentPage < bodyPvPageCount && (
								<Button
									onClick={() => onScrollLoadMore('BODY', false)}
									value={bodyPvLoading ? 'Loading...' : 'Load More'}
									disabled={bodyPvLoading}
									className="text-xs px-3 py-1 bg-primary text-white ml-9 mt-4"
								/>
							)}
						</>
					)}
				</>
			)}

			{moduleType === 'leg' && (
				<>
					{mode === 'public' && (
						<>
							{/* <div
								// className="overflow-auto"
								style={{
									// maxHeight: '250px',
									paddingBottom: '5px',
									marginTop: '10px',
								}}
							> */}
							<div className="w-full flex justify-center mb-[25px]">
								<Button
									value="Add new part"
									className="text-[14px] text-white bg-primary px-[19px] pt-[6px] pb-[7px]"
									onClick={() => openAddPackage('LEG', true)}
								/>
							</div>
							{isLoading && <Loader type="relative" />}

							<ul className="h-full overflow-y-auto pb-28">
								{legPackageModules.public.map((module, index) => (
									<li
										key={index}
										className="cursor-pointer mb-4 pr-2"
										onClick={() => handleSelectedModule(module)}
									>
										<div className={'mb-7'}>
											<b>{module?.name}</b>
											<div
												className="relative"
												style={{ textAlign: 'center' }}
											>
												<img
													src={
														module?.image_svg &&
														module?.image_svg !== ''
															? module?.image_svg
															: '/images/placeholder.jpg'
													}
													alt="Block Image"
													className={` hover:shadow-xl transition-all ease-in delay-150 h-[120px] 2xl:h-[150px] object-cover w-full rounded-md  ${
														clickedBlock?.id === module?.id
															? ' border-4 border-primary'
															: ''
													}`}
													style={{ display: 'inline-block' }}
												/>
												<div className=" w-64 flex justify-between items-center absolute bottom-0 pb-2">
													{/* <div className="ml-4">
														<MdVerifiedUser className="text-primary" />
													</div> */}
													{/* <div className="flex">
														<div className="flex bg-[#000000] opacity-[35%] items-center mr-[10px] px-[15px] py-[4px] ">
															<FaDownload className="text-white" />
															<span className="text-white ml-1">
																500
															</span>
														</div>
														<div className="text-white bg-[#000000] opacity-[35%] pl-[35px] pr-[27px] py-[4px]">
															5 $
														</div>
													</div> */}
												</div>
											</div>
										</div>
									</li>
									// <TreeItem
									// 	key={index}
									// 	nodeId={module?.id.toString()}
									// 	label={
									// 		<div style={{ textAlign: 'left' }}>
									// 			{/* <div
									// 				style={{
									// 					position: 'relative',
									// 					display: 'inline-block',
									// 				}}
									// 			> */}
									// 			<div
									// 				onClick={() => handleSelectedModule(module)}
									// 				className="cursor-pointer mb-4 pr-2 relative"
									// 			>
									// 				<img
									// 					src={
									// 						module?.image_svg &&
									// 						module?.image_svg !== ''
									// 							? module?.image_svg
									// 							: '/images/placeholder.jpg'
									// 					}
									// 					alt={''}
									// 					style={{
									// 						width: 50,
									// 						display: 'inline-block',
									// 						padding: '4px',
									// 					}}
									// 				/>
									// 				{legPackageModules.public.length ===
									// 					index + 1 && (
									// 					<div
									// 						style={{
									// 							position: 'absolute',
									// 							bottom: -5,
									// 							right: -20,
									// 						}}
									// 						onClick={(e: any) => {
									// 							e.stopPropagation();
									// 							openAddPackage('LEG', true);
									// 						}}
									// 					>
									// 						<FiPlus />
									// 					</div>
									// 				)}
									// 			</div>
									// 		</div>
									// 	}
									// 	onClick={() => {
									// 		storeModule('leg', module);
									// 	}}
									// />
								))}
							</ul>
							{legPbCurrentPage < legPbPageCount && (
								<Button
									onClick={() => onScrollLoadMore('LEG', true)}
									value={legPbLoading ? 'Loading...' : 'Load More'}
									disabled={legPbLoading}
									className="text-xs px-3 py-1 bg-primary text-white ml-9 mt-4"
								/>
							)}
						</>
					)}

					{mode === 'private' && (
						<>
							{/* <div
								className="overflow-auto"
								style={{
									maxHeight: '250px',
									paddingBottom: '5px',
									marginTop: '10px',
								}}
							> */}
							<div className="w-full flex justify-center mb-[25px]">
								<Button
									value="Add new part"
									className="text-[14px] text-white bg-primary px-[19px] pt-[6px] pb-[7px]"
									onClick={() => openAddPackage('LEG', false)}
								/>
							</div>
							{isLoading && <Loader type="relative" />}

							<ul className="h-full overflow-y-auto pb-28">
								{legPackageModules.private.map((module, index) => (
									<li
										key={index}
										className="cursor-pointer mb-4 pr-2"
										onClick={() => handleSelectedModule(module)}
									>
										<div className={'mb-7'}>
											<b>{module?.name}</b>
											<div
												className="relative"
												style={{ textAlign: 'center' }}
											>
												<img
													src={
														module?.image_svg &&
														module?.image_svg !== ''
															? module?.image_svg
															: '/images/placeholder.jpg'
													}
													alt="Block Image"
													className={` hover:shadow-xl transition-all ease-in delay-150 h-[120px] 2xl:h-[150px] object-cover w-full rounded-md  ${
														clickedBlock?.id === module?.id
															? ' border-4 border-primary'
															: ''
													}`}
													style={{ display: 'inline-block' }}
												/>
												<div className=" w-64 flex justify-between items-center absolute bottom-0 pb-2">
													{/* <div className="ml-4">
														<MdVerifiedUser className="text-primary" />
													</div> */}
													{/* <div className="flex">
														<div className="flex bg-[#000000] opacity-[35%] items-center mr-[10px] px-[15px] py-[4px] ">
															<FaDownload className="text-white" />
															<span className="text-white ml-1">
																500
															</span>
														</div>
														<div className="text-white bg-[#000000] opacity-[35%] pl-[35px] pr-[27px] py-[4px]">
															5 $
														</div>
													</div> */}
												</div>
											</div>
										</div>
									</li>
									// <TreeItem
									// 	key={index}
									// 	nodeId={module?.id.toString()}
									// 	label={
									// 		<div style={{ textAlign: 'left' }}>
									// 			<div
									// 				style={{
									// 					position: 'relative',
									// 					display: 'inline-block',
									// 				}}
									// 			>
									// 				<img
									// 					src={
									// 						module?.image_svg &&
									// 						module?.image_svg !== ''
									// 							? module?.image_svg
									// 							: '/images/placeholder.jpg'
									// 					}
									// 					alt={''}
									// 					style={{
									// 						width: 50,
									// 						display: 'inline-block',
									// 						padding: '4px',
									// 					}}
									// 					className="w-64 h-32 rounded-md"
									// 				/>
									// 				{legPackageModules.private.length ===
									// 					index + 1 && (
									// 					<div
									// 						style={{
									// 							position: 'absolute',
									// 							bottom: -5,
									// 							right: -20,
									// 						}}
									// 						onClick={(e: any) => {
									// 							e.stopPropagation();
									// 							openAddPackage('LEG', false);
									// 						}}
									// 					>
									// 						<FiPlus />
									// 					</div>
									// 				)}
									// 			</div>
									// 		</div>
									// 	}
									// 	onClick={() => {
									// 		storeModule('leg', module);
									// 	}}
									// />
								))}
							</ul>
							{legPvCurrentPage < legPvPageCount && (
								<Button
									onClick={() => onScrollLoadMore('LEG', false)}
									value={legPvLoading ? 'Loading...' : 'Load More'}
									disabled={legPvLoading}
									className="text-xs px-3 py-1 bg-primary text-white ml-9 mt-4"
								/>
							)}
						</>
					)}
				</>
			)}
			{openBlockDetails && (
				<BlockDetails
					clickedBlock={clickedBlock}
					selectedBlock={selectedBlock}
					blockType={'package'}
					blockData={clickedBlock}
					onClose={() => setOpenBlogDetails(false)}
					onClickUse={(blockData: any) => {
						openAddPackage(blockData?.module_type, blockData?.is_visible);
					}}
					onCloseParentSidebar={closeThisMenu}
				/>
			)}
		</div>
	);
}
