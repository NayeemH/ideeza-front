import Loader from '@atoms/loader';
import { ICodeBlock } from '@models/code';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
// import { Waypoint } from 'react-waypoint';
import { getCoverBlocks } from 'request/cover';
import { filterQueryParams, useOutsideClickHandler } from 'utils/utils';
// import OnHoverPlayVideo from "@molecules/on-hover-play";
// import Button from "@atoms/button";
import BlockDetails from '@molecules/onclick-block-details';
import { MdVerifiedUser } from 'react-icons/md';
import { FaDownload } from 'react-icons/fa';
import { useAppDispatch } from 'app/hooks';
import { setOpenBlockMenu } from '@layouts/private/sidebar/reducer';
import Button from '@atoms/button';

const LIMIT = 10;

const stringifyQueryParameter = (param: any) => {
	const filterdParam = filterQueryParams(param);
	const searchParams = new URLSearchParams(filterdParam);

	return `?${searchParams.toString()}`;
};

export default function CoverBlockMenu({
	selectedBlock,
	selectCat,
	userRole,
}: {
	selectedBlock: (item: ICodeBlock) => void;
	selectCat: string;
	userRole?: string;
}) {
	const dispatch = useAppDispatch();
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(1);
	const [blockList, setBlockList] = useState<ICodeBlock[]>([]);
	const ref = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [partialLoading, setPartialLoading] = useState(false);

	const [clickedBlock, setClickedBlock] = useState<any>();
	const [openBlockDetails, setOpenBlogDetails] = useState(false);
	const [isLastPage, setIsLastPage] = useState<boolean>(true);

	useOutsideClickHandler(ref, () => {
		if (!openBlockDetails) {
			dispatch(setOpenBlockMenu(''));
		}
	});

	const router = useRouter();
	const isPart = router.pathname.includes('add-part');
	const paramsObj = {
		page_size: LIMIT,
		page: page,
		search: selectCat,
		block_type: isPart ? 'PART' : undefined,
	};

	const params = stringifyQueryParameter(paramsObj);

	const getCoverBlocksData = (page: number = 1) => {
		setIsLoading(true);
		setPartialLoading(true);

		getCoverBlocks(params).then(({ data }) => {
			let currentData = [...blockList];

			if (page > 1) {
				currentData = [...currentData, ...data?.results];
			} else {
				currentData = data?.results;
			}

			setBlockList(() => currentData);
			// setPage(data?.next ? page : 1);
			setCount(data?.count);
			setIsLastPage(data?.next === null);
			setIsLoading(false);
			setPartialLoading(false);
		});
	};

	const nextPage = () => {
		if (!isLastPage) {
			setPage((prev) => prev + 1);
		}
	};

	const handleClickBlock = (data: any) => {
		setOpenBlogDetails(true);
		setClickedBlock(data);
	};

	// const stopMovie = (e: any) => {
	//   e.target.pause();
	//   console.log("off");
	// };

	// const playMovie = (e: any) => {
	//   e.target.play();
	//   console.log("on");
	// };

	useEffect(() => {
		getCoverBlocksData(page);
	}, [page]);

	useEffect(() => {
		if (selectCat) getCoverBlocksData(1);
	}, [selectCat]);

	useEffect(() => {
		if (selectCat) {
			setPage(1);
		}
	}, [selectCat]);

	// const isLastPage = (page: any, total: any) => {
	// 	return page >= Math.ceil(total / LIMIT);
	// };

	return (
		<>
			<div
				className="fixed top-24 w-96 bg-gray-200 p-6 "
				style={{ left: '300px', zIndex: 1200, height: '87vh' }}
				ref={ref}
			>
				{isLoading && <Loader type="relative" />}
				{userRole !== 'Technician' && (
					<div className="w-full flex justify-center mb-[25px]">
						{/*<Button
            value="Add new part"
            className="text-[14px] text-white bg-primary px-[19px] pt-[6px] pb-[7px]"
          />*/}
						{`Add New `}{' '}
						<span
							className={'text-primary font-bold cursor-pointer'}
							style={{ marginLeft: 2, marginRight: 2 }}
							onClick={() => {
								router.push('/user/dashboard/cover/add-part');
							}}
						>
							Part
						</span>{' '}
						{` or `}{' '}
						<span
							className={'text-primary font-bold cursor-pointer'}
							style={{ marginLeft: 2, marginRight: 2 }}
							onClick={() => {
								router.push('/user/dashboard/cover/add-component');
							}}
						>
							Component
						</span>
					</div>
				)}

				{Array.isArray(blockList) && blockList.length > 0 ? (
					<>
						<ul
							className="overflow-y-auto pb-28"
							style={{ height: '73vh' }}
						>
							{blockList.map((item: ICodeBlock, index: number) => (
								<li
									key={index}
									className="cursor-pointer mb-4 pr-2"
									onClick={() => {
										//selectedBlock(item ?? {});
										handleClickBlock(item);
									}}
								>
									<div className={'mb-7'}>
										<b>{item?.name}</b>
										{/* {item?.simulation_video ? (
                          <div style={{ textAlign: "center" }}>
                            <OnHoverPlayVideo
                              poster={
                                item?.image_svg && item?.image_svg !== ""
                                  ? item?.image_svg
                                  : "/images/placeholder.jpg"
                              }
                              src={item?.simulation_video} // TODO: Remove comment after testing //src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
                            />
                          </div>
                        ) : ( */}
										<div
											className="relative"
											style={{ textAlign: 'center' }}
										>
											<img
												src={
													item?.image_svg && item?.image_svg !== ''
														? item?.image_svg
														: '/images/placeholder.jpg'
												}
												alt="Block Image"
												className={` hover:shadow-xl transition-all ease-in delay-150 h-[120px] 2xl:h-[150px] object-cover scale-y-1 scale-x-1 w-full rounded-md  ${
													clickedBlock?.id === item?.id
														? ' border-4 border-primary'
														: ''
												}`}
												style={{ display: 'inline-block' }}
											/>
											<div className=" w-80 flex justify-between items-center absolute bottom-0 pb-2">
												<div className="ml-4">
													<MdVerifiedUser className="text-primary" />
												</div>
												<div className="flex">
													<div className="flex bg-[#000000] opacity-[35%] items-center mr-[10px] px-[15px] py-[4px] ">
														<FaDownload className="text-white" />
														<span className="text-white ml-1">
															{(item as any)?.downloads ?? 0}
														</span>
													</div>
													<div className="text-white bg-[#000000] opacity-[35%] pl-[35px] pr-[27px] py-[4px]">
														{(item as any)?.price ?? 0} $
													</div>
												</div>
											</div>
										</div>
										{/* // )} */}
									</div>
								</li>
							))}

							{/* //TODO:: Fix Loadmore button visibility logic and uncomment following code */}
							{!partialLoading && blockList.length <= count && page !== 0 ? (
								// <div className={"text-center pb-5"}>
								//   <Button
								//     size={"small"}
								//     variant={"contained"}
								//     className={"bg-primary text-white"}
								//     value={"Load More"}
								//     onClick={() => getCoverBlocksData(page + 1)}
								//   />
								// </div>
								<></>
							) : partialLoading ? (
								// <div className={"text-primary text-center p-5"} style={{fontWeight: "bold"}}>Loading...</div>
								<></>
							) : null}

							{!isLastPage ? (
								<div className={'text-center'}>
									<Button
										onClick={nextPage}
										className={'bg-primary text-white'}
										variant={'outlined'}
										value={'Load More'}
										size={'small'}
									/>
								</div>
							) : null}
						</ul>
					</>
				) : (
					<>
						{!isLoading && (
							<p className="text-xl font-semibold text-center py-10">
								No block found!
							</p>
						)}
					</>
				)}
			</div>
			{openBlockDetails && (
				<BlockDetails
					clickedBlock={clickedBlock}
					selectedBlock={selectedBlock}
					blockType={'cover'}
					blockData={clickedBlock}
					onClose={() => setOpenBlogDetails(false)}
				/>
			)}
		</>
	);
}
