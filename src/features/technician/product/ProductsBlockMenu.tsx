import Loader from '@atoms/loader';
import { setOpenBlockMenu } from '@layouts/private/sidebar/reducer';
import { ICodeBlock } from '@models/code';
import OnHoverPlayVideo from '@molecules/on-hover-play';
import { useAppDispatch } from 'app/hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Waypoint } from 'react-waypoint';
import { getBlocks } from 'request/electronics';
import { filterQueryParams, useOutsideClickHandler } from 'utils/utils';

const LIMIT = 100;

const stringifyQueryParameter = (param: any) => {
	const filterdParam = filterQueryParams(param);
	const searchParams = new URLSearchParams(filterdParam);

	return `?${searchParams.toString()}`;
};

export default function ProductsBlockMenu({
	selectedBlock,
	selectCat,
}: {
	selectedBlock: (item: ICodeBlock) => void;
	selectCat: string;
}) {
	const dispatch = useAppDispatch();
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(1);
	const [blockList, setBlockList] = useState<ICodeBlock[]>([]);
	const ref = React.useRef(null);
	useOutsideClickHandler(ref, () => dispatch(setOpenBlockMenu('')));
	const router = useRouter();
	const isPart = router.pathname.includes('add-part');
	const paramsObj = {
		page_size: LIMIT,
		page: page,
		search: selectCat,
		block_type: isPart ? 'PART' : undefined,
	};

	const params = stringifyQueryParameter(paramsObj);

	const { data, isLoading, isSuccess } = useQuery(
		[`block-category`, params],
		() => getBlocks(params),
		{
			keepPreviousData: true,
			enabled: Boolean(params),
		}
	);

	useEffect(() => {
		if (isSuccess) {
			setBlockList(data?.data?.results);
			setCount(data?.data?.count);
		}
	}, [isSuccess, data?.data]);

	const nextPage = (page: number, count: number) => {
		if (!isLastPage(page, count)) {
			setPage((prev) => prev + 1);
		}
	};

	useEffect(() => {
		if (selectCat) {
			setPage(1);
		}
	}, [selectCat]);

	const isLastPage = (page: any, total: any) => {
		return page >= Math.ceil(total / LIMIT);
	};

	return (
		<div
			className="fixed top-32 w-96 bg-gray-200 p-6 overflow-y-auto"
			style={{ left: '300px', zIndex: 1200, height: 'calc(100vh - 150px)' }}
			ref={ref}
		>
			{isLoading && <Loader type="relative" />}

			<ul className="h-full">
				{Array.isArray(blockList) && blockList.length > 0 ? (
					blockList.map((item: ICodeBlock, index: number) => (
						<li
							key={index}
							className="cursor-pointer mb-4"
							onClick={() => {
								selectedBlock(item ?? {});
								dispatch(setOpenBlockMenu(''));
							}}
						>
							<div className={'mb-7'}>
								<b>{item?.name}</b>
								{item?.simulation_video ? (
									<div style={{ textAlign: 'center' }}>
										<OnHoverPlayVideo
											poster={
												item?.image_svg && item?.image_svg !== ''
													? item?.image_svg
													: '/images/placeholder.jpg'
											}
											src={item?.simulation_video} // TODO: Remove comment after testing //src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
										/>
									</div>
								) : (
									<div style={{ textAlign: 'center' }}>
										<img
											src={
												item?.image_svg && item?.image_svg !== ''
													? item?.image_svg
													: '/images/placeholder.jpg'
											}
											alt="Block Image"
											className=" hover:shadow-xl transition-all ease-in delay-150 h-[120px] 2xl:h-[150px] object-cover scale-y-1 scale-x-1 w-full"
											style={{ display: 'inline-block' }}
										/>
									</div>
								)}
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
			</ul>
			{count > LIMIT ? <Waypoint onEnter={() => nextPage(page, count)} /> : null}
		</div>
	);
}
