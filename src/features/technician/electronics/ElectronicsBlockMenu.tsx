import Loader from '@atoms/loader';
import { ICodeBlock } from '@models/code';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import { Waypoint } from 'react-waypoint';
import BlockDetails from '@molecules/onclick-block-details';
import { filterQueryParams, useOutsideClickHandler } from 'utils/utils';
import { MdVerifiedUser } from 'react-icons/md';
import { FaDownload, FaTimes } from 'react-icons/fa';
import { setOpenBlockMenu } from '@layouts/private/sidebar/reducer';
import { useDispatch } from 'react-redux';
import { IMAGE_PLACEHOLDER } from 'enums/common';
import { ApiDataType, apiService } from 'utils/request';
import Button from '@atoms/button';

const LIMIT = 20;

const stringifyQueryParameter = (param: any) => {
	const filterdParam = filterQueryParams(param);
	const searchParams = new URLSearchParams(filterdParam);

	return `?${searchParams.toString()}`;
};

export default function ElectronicsBlockMenu({
	selectedBlock,
	selectCat,
	userRole,
}: {
	selectedBlock: (item: ICodeBlock) => void;
	selectCat: string;
	userRole?: string;
}) {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(1);
	const [blockList, setBlockList] = useState<ICodeBlock[]>([]);
	const [openBlockDetails, setOpenBlogDetails] = useState(false);
	const [clickedBlock, setClickedBlock] = useState<any>();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const ref = React.useRef(null);

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

	useEffect(() => {
		if (selectCat) getBlocks();
	}, [selectCat]);

	useEffect(() => {
		if (selectCat) {
			setPage(1);
		}
	}, [selectCat]);

	useEffect(() => {
		getBlocks();
	}, [page]);

	const getBlocks = async () => {
		setIsLoading(true);
		const apiData: ApiDataType = {
			method: 'get',
			url: `/electronic-blocks/${params}`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				setBlockList((prev) => [...prev, ...res?.data?.results]);
				setCount(res?.data?.count);
			}
		});
		setIsLoading(false);
	};

	const nextPage = (page: number, count: number) => {
		if (!isLastPage(page, count)) {
			setPage((prev) => prev + 1);
		}
	};
	const handleClickBlock = (data: any) => {
		setOpenBlogDetails(true);
		setClickedBlock(data);
	};

	const isLastPage = (page: any, total: any) => {
		return page >= Math.ceil(total / LIMIT);
	};

	return (
		<div ref={ref}>
			<div
				className="fixed top-24 w-96 bg-gray-200 p-6 "
				style={{ left: '300px', zIndex: 1200, height: '87vh' }}
			>
				{isLoading && <Loader type="relative" />}
				<div className="flex justify-end mb-1 w-full">
					<span
						className="p-2 -mt-2 cursor-pointer"
						onClick={() => {
							if (!openBlockDetails) {
								dispatch(setOpenBlockMenu(''));
							}
						}}
					>
						<FaTimes />
					</span>
				</div>
				{userRole !== 'Technician' && (
					<div className="w-full flex justify-center mb-[25px]">
						{`Add New `}
						<span
							className={'text-primary font-bold cursor-pointer'}
							style={{ marginLeft: 2, marginRight: 2 }}
							onClick={() => {
								router.push('/user/dashboard/electronics/add-part');
							}}
						>
							Part
						</span>
						{` or `}
						<span
							className={'text-primary font-bold cursor-pointer'}
							style={{ marginLeft: 2, marginRight: 2 }}
							onClick={() => {
								router.push('/user/dashboard/electronics/add-component');
							}}
						>
							Component
						</span>
					</div>
				)}

				<ul
					className="pb-2 relative overflow-y-auto"
					style={{ height: '73vh' }}
				>
					{Array.isArray(blockList) && blockList.length > 0 ? (
						blockList.map((item: ICodeBlock, index: number) => (
							<li
								key={index}
								className="cursor-pointer mb-4 relative pr-2"
								onClick={() => {
									handleClickBlock(item);
								}}
							>
								<div className={'mb-7'}>
									<b>{item?.name}</b>
									<div
										className="relative"
										style={{ textAlign: 'center' }}
									>
										<img
											src={
												item?.image_svg && item?.image_svg !== ''
													? item?.image_svg
													: IMAGE_PLACEHOLDER
											}
											alt="Block Image"
											className={` hover:shadow-xl transition-all ease-in delay-150 h-[120px] 2xl:h-[150px] object-cover  w-full rounded-md  ${
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
								</div>
							</li>
						))
					) : (
						<>
							{!isLoading && (
								<p className="text-xl font-semibold text-center py-10">
									No block found!
								</p>
							)}
						</>
					)}

					{count > LIMIT ? (
						<div className={'text-center'}>
							<Button
								onClick={() => nextPage(page, count)}
								className={'bg-primary text-white'}
								variant={'outlined'}
								value={'Load More'}
								size={'small'}
							/>
						</div>
					) : null}
				</ul>
			</div>
			{openBlockDetails && (
				<BlockDetails
					clickedBlock={clickedBlock}
					selectedBlock={selectedBlock}
					blockType={'electronics'}
					blockData={clickedBlock}
					onClose={() => setOpenBlogDetails(false)}
				/>
			)}
		</div>
	);
}
