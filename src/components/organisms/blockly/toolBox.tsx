import Loader from '@atoms/loader';
import { ICodeBlock } from '@models/code';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
//import { useQuery } from "react-query";
// import { Waypoint } from "react-waypoint";
import { getCodeBlocks } from 'request/code';
import { filterQueryParams, useOutsideClickHandler } from 'utils/utils';
// import Button from "@atoms/button";
import { setOpenBlockMenu } from '@layouts/private/sidebar/reducer';
import { useAppDispatch } from 'app/hooks';
import BlocklyBlocks from './BlocklyBlocks.json';

const LIMIT = 100;

const stringifyQueryParameter = (param: any) => {
	const filterdParam = filterQueryParams(param);
	const searchParams = new URLSearchParams(filterdParam);

	return `?${searchParams.toString()}`;
};

export default function BlocklyToolBox({
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
	const ref = React.useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [partialLoading, setPartialLoading] = useState(false);
	useOutsideClickHandler(ref, () => dispatch(setOpenBlockMenu('')));

	const router = useRouter();
	// const isCodePart = router.pathname.includes("part")
	const isPart = router.pathname.includes('add-part');
	const paramsObj = {
		page_size: LIMIT,
		page: page,
		search: selectCat,
		block_type: isPart ? 'PART' : undefined,
	};

	const params = stringifyQueryParameter(paramsObj);

	const getCodeBlocksData = (page: any = 1) => {
		setIsLoading(true);
		setPartialLoading(true);
		// console.log('params: ', params);
		getCodeBlocks(params).then(({ data }) => {
			let currentData = [...blockList];

			if (page > 1) {
				currentData = [...currentData, ...data.results];
			} else {
				currentData = data?.results;
			}
			// console.log('currentData: ', currentData);
			setBlockList(currentData);
			setPage(data?.next ? page : 1);
			setCount(data?.count);
			setIsLoading(false);
			setPartialLoading(false);
		});
	};

	const getDefaultBlocks = (selectCat: any) => {
		setIsLoading(true);
		setPartialLoading(true);

		const blockData = BlocklyBlocks.filter((blocks) => blocks.category.name === selectCat);
		// console.log('blockData: ', blockData);
		setBlockList(blockData);
		setIsLoading(false);
		setPartialLoading(false);
	};

	useEffect(() => {
		if (
			['Logic', 'Loops', 'Math', 'Text', 'Lists', 'Colour', 'Functions', 'Variables'].indexOf(
				selectCat
			) >= 0
		) {
			getDefaultBlocks(selectCat);
		} else {
			getCodeBlocksData(1);
		}
	}, [selectCat]);

	useEffect(() => {
		if (selectCat) {
			setPage(1);
		}
	}, [selectCat]);

	/* const isLastPage = (page: any, total: any) => {
	return page >= Math.ceil(total / LIMIT);
  }; */

	const SVGView = (svg: string) => {
		const buff = Buffer.from(svg);
		return buff.toString('base64');
	};

	return (
		<div
			className="fixed top-24 w-96 bg-gray-200 h-full p-6 "
			style={{ left: '300px', zIndex: 1200 }}
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
							router.push('/user/dashboard/code/add-part');
						}}
					>
						Part
					</span>{' '}
					{` or `}{' '}
					<span
						className={'text-primary font-bold cursor-pointer'}
						style={{ marginLeft: 2, marginRight: 2 }}
						onClick={() => {
							router.push('/user/dashboard/code/add-component');
						}}
					>
						Component
					</span>
				</div>
			)}

			<ul className="h-full overflow-y-auto pb-28">
				{Array.isArray(blockList) && blockList.length > 0 ? (
					<>
						{blockList.map((item: ICodeBlock, index: number) => (
							<li
								key={index}
								className="cursor-pointer mb-4 pr-2"
								onClick={() => {
									selectedBlock(item ?? {});
									dispatch(setOpenBlockMenu(''));
								}}
							>
								<div className={'mb-7'}>
									<b>{item?.name}</b>
									{item?.image_svg ? (
										<>
											<img
												src={`data:image/svg+xml;base64,${SVGView(
													item?.image_svg.replace(/&nbsp;/g, ' ')
												)}`}
												alt={item?.name}
											/>
										</>
									) : (
										<img
											src={'/images/dummy_block.svg'}
											alt={item?.name}
										/>
									)}
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
							//     onClick={() => getCodeBlocksData(page + 1)}
							//   />
							// </div>
							<></>
						) : partialLoading ? (
							// <div
							//   className={"text-primary text-center p-5"}
							//   style={{ fontWeight: "bold" }}
							// >
							//   Loading...
							// </div>
							<></>
						) : null}
					</>
				) : (
					<p>No Block found!</p>
				)}
			</ul>
		</div>
	);
}
