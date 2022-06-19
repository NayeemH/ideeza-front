import React, { useEffect, useState } from 'react';
import TabsMolecule from '@molecules/tabs';
import NewsFeedSection from '@organisms/news-feed-section';
import NewsCard from '@molecules/news-card';
import NewsConnect from '@molecules/news-connect';
import WorldInnovation from '@organisms/world-innovation';
import { apiService } from '../../../utils/request';
import Button from '@atoms/button';
import Loader from '@atoms/loader';
// import Button from "@atoms/button";

function NewsFeedHome() {
	const initTabIndex = 0; // initTabIndex 0 should be for Following news
	const initCurrentPage = 0;
	const initPerPage = 5;
	const sortByOptions = [
		{ value: '', name: 'None' },
		{ value: '-views', name: 'Most Viewed' },
		{ value: '-likes', name: 'Most Liked' },
		// { value: "-dislikes", name: "Most Disliked" },
		{ value: '-created_at', name: 'Most Recent' },
	];

	const [index, setIndex] = useState(initTabIndex);
	const [connect] = useState([]);
	const [loading, setLoading] = useState(false);
	const [feed, setFeed] = useState([]);
	const [projects, setProjects] = useState([]);

	const [currentPageWorld, setCurrentPageWorld] = useState(initCurrentPage);
	const [currentPageNews, setCurrentPageNews] = useState(initCurrentPage);
	const [perPage] = useState(initPerPage);
	const [searchWorld, setSearchWorld] = useState('');
	const [searchNews, setSearchNews] = useState('');
	const [sortByWorld, setSortByWorld] = useState('');
	const [sortByNews, setSortByNews] = useState('');
	const [loadMore, setLoadMore] = useState(false);
	const [followingLoading, setFollowingLoading] = useState(false);
	const [worldInnovationLoading, setWorldInnovationLoading] = useState(false);
	const [initPageRender, setInitPageRender] = useState(true);
	const [hasLoadMoreBtnWorld, setHasLoadMoreBtnWorld] = useState(false);
	const [hasLoadMoreBtnNews, setHasLoadMoreBtnNews] = useState(false);
	const [totalProjectCount, setTotalProjectCount] = useState(0);
	const [totalNewsCount, setTotalNewsCount] = useState(0);

	//initially Page Reload
	useEffect(() => {
		if (initPageRender) {
			// console.log('0. Initial ---------') //
			getActiveTabFeedData(index, true, true, false, false, () => setLoading(true));
		}
		setInitPageRender(false);
	}, []);

	// updated News's search or sortBy
	useEffect(() => {
		if (!initPageRender) {
			// console.log('0.1. Initial News ---------')
			getNewsFeedData(initCurrentPage, perPage, searchNews, sortByNews, true, false);
		}
	}, [searchNews, sortByNews]);

	// updated World's search or sortBy
	useEffect(() => {
		if (!initPageRender) {
			// console.log('0.2.  Initial Project ---------')
			getProjectsData(initCurrentPage, perPage, searchWorld, sortByWorld, true, false);
		}
	}, [searchWorld, sortByWorld]);

	// Checking News's Has LoadMore button
	useEffect(() => {
		setHasLoadMoreBtnNews(getHasReadMoreButton(totalNewsCount, currentPageNews, perPage));
	}, [totalNewsCount, currentPageNews]);

	// Checking World's Has LoadMore button
	useEffect(() => {
		setHasLoadMoreBtnWorld(getHasReadMoreButton(totalProjectCount, currentPageWorld, perPage));
	}, [totalProjectCount, currentPageWorld]);

	const getHasReadMoreButton = (totalDataCount: number, currentPage: number, perPage: number) => {
		const totalPageCount = totalDataCount > perPage ? Math.ceil(totalDataCount / perPage) : 1;
		return currentPage < totalPageCount;
	};

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		const newIndex = Number(newValue);
		setIndex(newIndex);
		getActiveTabFeedData(newIndex, false, false, true);
	};

	const getActiveTabFeedData = (
		tabIndex: number,
		increamentPageNum = true,
		concatResult = true,
		tabSwitched = false,
		isLoadMore = false,
		initPageLoadCallback?: () => void
	) => {
		if (tabIndex === initTabIndex) {
			// console.log('1. News ---------') //
			getNewsFeedData(
				!tabSwitched ? currentPageNews : 0,
				perPage,
				searchNews,
				sortByNews,
				increamentPageNum,
				concatResult,
				isLoadMore,
				initPageLoadCallback
			);
		} else {
			// console.log('2. Project ---------')
			getProjectsData(
				!tabSwitched ? currentPageWorld : 0,
				perPage,
				searchWorld,
				sortByWorld,
				increamentPageNum,
				concatResult,
				isLoadMore,
				initPageLoadCallback
			);
		}
	};

	const handleLoadMore = () => {
		getActiveTabFeedData(index, true, true, false, true);
	};

	const getNewsFeedData = (
		page: number = initCurrentPage,
		pageSize: number = initPerPage,
		search = '',
		sortBy = '',
		increamentPageNum = true,
		concatResult = true,
		isLoadMore = true,
		initPageLoadCallback?: () => void
	) => {
		// console.log('1.1. News Data ---------') //
		if (initPageLoadCallback) initPageLoadCallback();
		!isLoadMore ? setFollowingLoading(true) : setLoadMore(concatResult);
		page = increamentPageNum ? page + 1 : !page ? page + 1 : page; // Checking if increamentPageNum is true then increamenting page number else if page number is zero or falsy then increamenting page number
		const params = `?page=${page}&page_size=${pageSize}${search ? `&search=${search}` : ''}${
			sortBy ? `&ordering=${sortBy}` : ''
		}`;

		apiService(
			{
				method: 'get',
				url: `/account/news-feed/${params}`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const newFeed = res?.data?.results || [];
					const feedList = concatResult ? [...feed, ...newFeed] : newFeed;
					setTotalNewsCount(res?.data?.count || 0);
					setFeed(feedList);
					setCurrentPageNews(page);
					setLoading(false);
					setFollowingLoading(false);
					return setLoadMore(false);
				}
				setFollowingLoading(false);
				setLoading(false);
				setLoadMore(false);
			}
		);
	};

	const getProjectsData = (
		page: number = initCurrentPage,
		pageSize: number = initPerPage,
		search = '',
		sortBy = '',
		increamentPageNum = true,
		concatResult = true,
		isLoadMore = true,
		initPageLoadCallback?: () => void
	) => {
		// console.log('2.1. Project Data ---------') //
		if (initPageLoadCallback) initPageLoadCallback();
		!isLoadMore ? setWorldInnovationLoading(true) : setLoadMore(concatResult);
		page = increamentPageNum ? page + 1 : !page ? page + 1 : page; // Checking if increamentPageNum is true then increamenting page number else if page number is zero or falsy then increamenting page number
		const params = `?page=${page}&page_size=${pageSize}${search ? `&search=${search}` : ''}${
			sortBy ? `&ordering=${sortBy}` : ''
		}`;

		apiService(
			{
				method: 'get',
				url: `project/${params}`,
			},
			(res: any) => {
				if (res) {
					const newProjects = res?.data?.results || [];
					const projectList = concatResult ? [...projects, ...newProjects] : newProjects;
					setTotalProjectCount(res?.data?.count || 0);
					setProjects(projectList);
					setCurrentPageWorld(page);
					setWorldInnovationLoading(false);
					setLoading(false);
					return setLoadMore(false);
				}
				setWorldInnovationLoading(false);
				setLoading(false);
				setLoadMore(false);
			}
		);
	};

	return (
		<>
			{loading ? (
				<>
					<Loader />
				</>
			) : (
				// </div>
				<div className="grid lg:grid-cols-10 gap-y-8 md:pl-0 md:pt-[44px] items-start">
					<div className="lg:col-span-7 lg:order-1 order-0 2xl:pr-[50px] h-screen 2xl:h-[calc(100vh+40px)] xl:h-[calc(100vh+600px)] overflow-y-auto xl:pr-[10px] pr-[10px]">
						<TabsMolecule
							index={index}
							handleChange={handleChange}
							tabsRootClasses=""
							tabsWrapClasses="grid grid-cols-10 gap-2"
							tabsClasses="lg:col-span-9 col-span-10 sm:col-span-8 rounded px-2"
							tabClasses=" w-full bg-white texl-lg 2xl:text-2xl font-proxima-nova tracking-tight news-tabs capitalize text-gray-350 mb-[10px] sm:mb-0"
							tabsData={[
								{
									name: 'Following',
									component: (
										<div className="px-2 h-100vh pb-3 overflow-y-auto">
											<NewsFeedSection
												loading={followingLoading}
												state={feed}
												search={searchNews}
												sortBy={sortByNews}
												onChangeSearch={(e: any) =>
													setSearchNews(e?.target?.value)
												}
												onChangeSortBy={(e: any) =>
													setSortByNews(e?.target?.value)
												}
												sortByOptions={sortByOptions}
												handleLoadMore={handleLoadMore}
												loadMore={loadMore}
											/>
											{hasLoadMoreBtnNews &&
												!followingLoading &&
												feed?.length > 0 && (
													<div className="my-8 text-center flex justify-center">
														<Button
															loading={loadMore}
															value={
																loadMore
																	? 'Loading More...'
																	: 'Load More'
															}
															className={`text-white rounded-full bg-primary uppercase font-semibold px-7 md:px-14 py-2 hover:shadow-lg outline-none border-0 text-base hidden md:block ${
																loadMore
																	? 'pointer-events-none cursor-not-allowed'
																	: ''
															}`}
															variant="contained"
															color="primary"
															onClick={handleLoadMore}
														/>
													</div>
												)}
										</div>
									),
								},
								{
									name: 'World innovation',
									component: (
										<>
											<div className="px-2 h-100vh pb-3 overflow-y-auto">
												<WorldInnovation
													// loading={worldInnovationLoading}
													// state={projects}
													loading={followingLoading}
													state={feed}
													search={searchWorld}
													sortBy={sortByWorld}
													onChangeSearch={(e: any) =>
														setSearchWorld(e?.target?.value)
													}
													onChangeSortBy={(e: any) =>
														setSortByWorld(e?.target?.value)
													}
													sortByOptions={sortByOptions}
													handleLoadMore={handleLoadMore}
													loadMore={loadMore}
												/>
												{/* {hasLoadMoreBtnNews && !followingLoading && feed?.length > 0 && ( */}
												{hasLoadMoreBtnNews &&
													!followingLoading &&
													// hasLoadMoreBtnWorld &&
													// 	!worldInnovationLoading &&
													projects?.length > 0 && (
														<div className="my-8 text-center flex justify-center">
															<Button
																loading={loadMore}
																value={
																	loadMore
																		? 'Loading More...'
																		: 'Load More'
																}
																className={`${hasLoadMoreBtnWorld}${worldInnovationLoading} text-white rounded-full bg-primary uppercase font-semibold px-7 md:px-14 py-2 hover:shadow-lg outline-none border-0 text-base hidden md:block ${
																	loadMore
																		? 'pointer-events-none cursor-not-allowed'
																		: ''
																}`}
																variant="contained"
																color="primary"
																onClick={handleLoadMore}
															/>
														</div>
													)}
											</div>
										</>
									),
								},
							]}
						/>
					</div>
					<div className="lg:col-span-3 gap-7 pl-[15px] xl:pl-4 2xl:pl-[50px] grid lg:grid-cols-1 sm:grid-cols-2 order-1 lg:order-0 pr-[30px] sm:pr-0">
						<NewsCard
							spnsrValue="Sponsored"
							uprValue="Ahmed Doe's new way of Tech Product"
							desc="Lorem ipsum dolores sit, amanet dolisi isilti as hat why souriti lalola. That's why he wanted to create something unordinary...."
							datevalue="Nov 12, 2018 • Electronics"
						/>
						<NewsConnect
							value="PEOPLE YOU SHOULD CONNECT"
							connect={connect}
							clickHandlerid={'clickHandler'}
						/>
					</div>
				</div>
			)}
		</>
	);
}

export default NewsFeedHome;
