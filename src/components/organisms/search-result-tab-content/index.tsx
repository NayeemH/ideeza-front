import React, { useState } from 'react';

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
import { Box } from '@mui/material';
// import { BsFillHeartFill } from 'react-icons/bs';

// import "@brainhubeu/react-carousel/lib/style.css";
import { useRouter } from 'next/router';
import Label from '@atoms/label';
// import ProductSmallCard from '@organisms/product-small-card';
// import { useFetch } from "../../../../app/api";
// import { AiFillEye } from "react-icons/ai";
// import Dropdown from "@atoms/drop-down";
import Loader from '@atoms/loader';
import { useFetch } from 'app/api';
// import { ClickAwayListener } from "@mui/material";
import OnHoverPlayVideo from '@molecules/on-hover-play';
// import IconLabel from '@molecules/icon-label';
import ProjectCarouselContent from '@organisms/project-small-carousel';
import Button from '@atoms/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { IMAGE_PLACEHOLDER } from 'enums/common';
import { apiService } from 'utils/request';

function SingleSearchResultTabContent() {
	const history = useRouter();
	const [loading, setLoading] = useState(true);
	const [videoData, setVideoData] = useState<any>([]);
	// const [loadMoreClicked, setLoadMoreClicked] = useState(false);
	const [searchResult, setSearchResult] = React.useState<{
		project: any;
		products: any[];
	}>({
		project: null,
		products: [],
	});

	const productsLimit = 8;
	const [products, setProducts] = useState<any[]>([]);
	const [productsNextPage, setProductsNextPage] = useState<any>(1);
	const [productsLoading, setProductsLoading] = useState<boolean>(true);
	// const [openFilter, setOpenFilter] = useState<any>(false);
	// const handleOpenFilter = () => {
	//   setOpenFilter(!openFilter);
	// };
	// const handleClickAway = () => {
	//   setOpenFilter(false);
	// };
	const search_query = history?.query?.query;

	//   const [auth, setAuth] = useState(false);
	//   const [searchResults, setSearchResults] = useState([]);
	//   const dispatch = useDispatch();
	//   const state = useSelector((state) => state?.Auth?.authenticated);
	//   const projectdata = useSelector(({ User }) => User?.projectsList?.product);
	// const getProjects = () => dispatch(searchResultsGet());
	//   const searchResult = useSelector(
	//     ({ User }) => User?.projectsList?.project
	//   );

	//   useEffect(() => {
	//     setAuth(state);
	//   }, [state]);
	//   console.log('searchResults', searchResults);
	//   useEffect(() => {
	//     if (auth) {
	//       // getProjects();
	//     }
	//   }, [auth]);
	//   useEffect(() => {
	//     if (searchResult) {
	//       setSearchResults(searchResult);
	//     }
	//   }, [searchResult]);

	// const gotoProjectDetails = (id: any) => {
	//     history.push(`/user/dashboard/project/project-detail/${id}`,
	//         // {
	//         //   projectDetails: project,
	//         // }
	//     );
	// };

	//   const gotoProductDetails = (project:any) => {
	//     history.push(
	//       `/user/dashboard/project/product-detail/${project?.product[0]?.id || project.id}`,
	//     //   { productDetails: project }
	//     );
	//   };

	const getProjectsBySearchQuery = async () => {
		try {
			if (search_query !== undefined && search_query !== '') {
				setLoading(true);

				const { data } = await useFetch.get(`/project/search/?q=${search_query}`);
				// console.log(data);

				setSearchResult({
					project: data.project,
					products: data.products,
				});
				const results: any = await useFetch.get(
					`/project/video/?project__id=${data.project.id}`
				);
				setVideoData(results.data.results);
			}
		} catch (error) {
			setLoading(false);
			return;
		}
		setLoading(false);
	};

	// const productsToShow = loadMoreClicked
	// 	? searchResult?.products
	// 	: searchResult?.products.slice(0, 8);

	// const handleLoadMore = () => {
	// 	setLoadMoreClicked((prev) => !prev);
	// };

	const getSearchedProducts = () => {
		const page_params = productsNextPage ? `page=${productsNextPage}` : '';

		setProductsLoading(true);
		apiService(
			{
				method: 'get',
				url: `/product/?search=${search_query}&page_size=${productsLimit}&${page_params}`,
			},
			(res: any) => {
				if (res) {
					setProducts((prev) => [...prev, ...res.data.results]);

					setProductsNextPage(res?.data?.next ? productsNextPage + 1 : null);
				}
				// setLoading(false);
				setProductsLoading(false);
			}
		);
	};

	React.useEffect(() => {
		if (search_query) {
			getProjectsBySearchQuery();
			getSearchedProducts();
		}
	}, [search_query]);
	// console.log(searchResult?.products);
	// console.log(searchResult?.project);

	return (
		<>
			{loading ? (
				<Loader
					type={'relative'}
					transparentBg={'bg-white/0'}
					isTransparentBg
				/>
			) : searchResult?.project ? (
				<div className="bg-white rounded-xl px-[30px] relative pt-[41px]">
					<div className="flex justify-between">
						<div>
							<Label
								className=" text-[24px] font-semibold  pb-1  text-[#333333] tracking-tight"
								value={` Your great idea is one step ahead: `}
							/>
							<Label
								className=" text-[24px] font-semibold py-2 text-primary tracking-tight"
								value={`${
									searchResult?.project?.name.length > 30
										? searchResult?.project?.name.slice(0, 30) + '... '
										: searchResult?.project?.name
								} By ${searchResult?.project.user?.first_name} ${
									searchResult?.project.user?.last_name
								}`}
							/>
						</div>
						<div>
							<p className=" text-[24px] font-semibold  pb-1  text-[#333333] tracking-tight">
								Estimated Price for private parts:{' '}
								<span className="text-primary"> 100$</span>
							</p>
							<p className=" text-[24px] font-semibold  pb-1  text-[#333333] tracking-tight">
								Prefer to use only free parts?
								<span className="underline cursor-pointer"> click here</span>
							</p>
						</div>
					</div>

					{/* <ClickAwayListener onClickAway={handleClickAway}>
          <div className="absolute flex justify-end w-full top-[-45px] right-[30px]">
            <div
              className="p-[8px] rounded-[5px] flex items-center ml-2 cursor-pointer"
              onClick={handleOpenFilter}
            >
              <img src="/images/icon/filter.svg" className="w-4" alt="" />
              <span className=" font-normal pl-1 text-[20px] font-proxima-nova">
                Filters
              </span>
            </div>
            <div className="absolute top-[35px] right-0  bg-white border rounded-[10px] my-[10px] note-date-picker">
              {openFilter && (
                <>
                  <div className="px-[25px] py-[10px] border rounded-[5px] border-[#D7D7D7] text-[20px] font-proxima-nova cursor-pointer">
                    My Cost
                  </div>
                </>
              )}
            </div>
          </div>
        </ClickAwayListener> */}

					{/* <Label
          className="text-[#333333] text-[24px] font-proxima-nova tracking-tight font-[600] border-b pb-[20px]"
          value={
            <>
              Top 3 Ideeza's for <span className="text-primary">{"drone"}</span>
            </>
          }
        /> */}
					<div className="py-6">
						<Box
							sx={{
								'& video': {
									height: '403px !important',
									position: 'relative',
								},
							}}
						>
							<OnHoverPlayVideo
								hideScaleView={true}
								// poster={searchResult?.project?.three_d_file}
								poster={IMAGE_PLACEHOLDER}
								src={videoData[0]?.video} // TODO: Remove comment after testing //src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
							/>
							<div className="absolute  right-10">
								<Button
									className="px-[88px] rounded-lg bottom-24 pt-[17px] pb-[20px] bg-primary font-proxima-nova text-xl font-semibold text-white"
									value="Continue"
									// onClick={() =>
									// 	history.push(
									// 		`/user/dashboard/project/${searchResult?.project?.id}/`
									// 	)
									// }
									onClick={() => {
										history.push('/user/dashboard/project/create');
									}}
								/>
							</div>

							{/* <Box
								className={`lg:w-52 absolute right-[10%] 2xl:right-[8%] z-50 cursor-text	top-[50%] bg-gradient-to-r from-[#FA00C5] to-[#550F8A] text-white rounded-2xl px-2 lg:px-4 py-1 flex justify-between
                      }`}
							>
								<IconLabel
									mainClass="flex items-center"
									iconContanerClass="bg-transparent mr-2"
									lableClass={{
										root: ' text-sm lg:text-md  text-white',
									}}
									labelValue={searchResult?.project?.views || '0'}
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
									labelValue={searchResult?.project?.views || '0'}
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
									labelValue={searchResult?.project?.likes || '0'}
									iconComponent={
										<BsFillHeartFill className="text-md lg:text-lg" />
									}
								/>
							</Box> */}
						</Box>
					</div>
					<Label
						className="text-gray-600 text-2xl font-proxima-nova tracking-tight font-semibold border-t mt-[30px] py-1.5 2xl:pt-[24px] border-gray-425"
						value={`${products.length} Search Results form exist projects for:`}
					/>
					<div className="grid xl:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 py-3 mt-4 md:gap-1.5 2xl:gap-[30px] gap-2">
						{!loading ? (
							<>
								{products?.map((product: any, index: number) => (
									<div
										className=""
										key={index}
									>
										<ProjectCarouselContent
											mainClass="p-0"
											iconContanerClass="border-none flex items-center justify-center text-lg rounded-full 2xl:w-7 2xl:h-7 w-5 h-5"
											numbering="hidden"
											imageSettingIcon="2xl:w-4 2xl:h-4 w-full"
											imagesIdeezaIcon="2xl:w-4 2xl:h-4 w-full"
											imagesIdeezaEye="2xl:w-4 2xl:h-4 w-full"
											mainIconClass="flex items-center"
											lableIconClass={{
												root: 'font-extrabold ml-[4px] 2xl:ml-0 mr-1 text-sm lg:text-md  text-gray-300',
											}}
											// projectId={project?.id}
											data={product}
											projectData={product}
											carouselHeight="h-42 pb-0 relative "
											titleClass="text-lg"
											nameClass="text-md "
											avatarClass="w-8 h-8"
											topIconContainer="hidden"
											bottomIconContainer="flex absolute bottom-[25px] xl:bottom-[50px] 2xl:bottom-[40px] right-7 lg:right-[15%] pl-1 w-[80%] lg:w-[70%] rounded-full project-icon-bg-custom justify-around py-[5px] 2xl:py-0"
											handleProjectClick={() =>
												history.push(
													`/user/dashboard/project/${searchResult?.project?.id}/product/${product?.id}`
												)
											}
											videoClasses="rounded-t-xl"
											contentCreatorWrapper="cursor-pointer p-2 bg-[#F6F6F6] rounded-b-xl pl-5"
											// ImageHeight="h-[320px]"
											// gotoProductDetails={gotoProductDetails}
											productThreeDView={true}
											threeDScript={product?.three_d_file}
											threeDHeight={250}
											initialVideoFor={'project'}
											creatorNameClass="text-[#666666] text-[17px] font-proxima-nova ml-2"
											projectNameClasses=" text-base 2xl:text-lg font-bold text-[#666666]"
										/>
									</div>

									// <ProductSmallCard
									// 	key={index}
									// 	handleProjectClick={() => {
									// 		history.push(
									// 			`/user/dashboard/project/${searchResult.project?.id}/product/${product.id}?project_id=${searchResult.project?.id}`
									// 		);
									// 	}}
									// 	productId={product.id}
									// 	data={{
									// 		name: product.name,
									// 		image: product.image,
									// 		likes: product.likes,
									// 		views: product.views,
									// 		dislikes: product.dislikes,
									// 		user: product.user,
									// 	}}
									// 	mainClass="rounded-2xl border bg-[#F6F6F6] shadow overflow-hidden cursor-pointer"
									// 	iconContanerClass="text-xl text-white"
									// 	iconMainClass="flex bottom-0  mb-2 justify-between w-4/5 m-auto md:p-2 2xl:px-3 rounded-full project-icon-bg-custom py-1"
									// 	numbering="hidden"
									// 	imageSettingIcon="w-4 h-4"
									// 	imagesIdeezaIcon="md:w-4 md:h-4 2xl:w-6 2xl:h-6 w-4 h-4"
									// 	mainIconClass="flex items-center space-x-1 pr-1"
									// 	lableIconClass={{
									// 		root: 'font-extrabold mr-1 text-base pl-1 text-white',
									// 	}}
									// 	titleClass="text-lg"
									// 	nameClass="text-md text-gray-600"
									// 	avatarMainClass="p-1 flex items-center"
									// 	avatarClass="w-8 h-8"
									// />
								))}

								{searchResult?.project?.products?.length === 0 && (
									<div>No result found</div>
								)}
							</>
						) : (
							<div>Loading</div>
						)}
					</div>

					<div className="w-full flex justify-center mt-4 2xl:mt-10 pb-4 2xl:pb-[95px]">
						{productsLoading && <h3>Loading</h3>}

						{products.length > 0 && !productsLoading && productsNextPage && (
							<Button
								value={
									<>
										<span>load more</span>
										<AiOutlinePlus className="ml-1 text-xl font-bold" />
									</>
								}
								className="bg-primary text-white rounded-lg text-lg font-proxima-nova pl-[30px] pr-[25px] pt-[12px] pb-[14px]"
								variant="outlined"
								onClick={getSearchedProducts}
							/>
						)}
					</div>
				</div>
			) : !loading ? (
				<div className="bg-white rounded-xl relative pt-[41px] pb-[100px] w-full px-[32px]">
					<div className="flex ">
						<div className="w-[55%]">
							<p className="font-proxima-nova font-semibold text-[30px] mb-[69px]">
								I didn't find any results Matched your great idea..
							</p>
							<div className="flex justify-center items-center flex-col mb-[68px]">
								<p className="font-proxima-nova font-semibold text-primary text-[35px]">
									But never stop dreaming big,
								</p>
								<p className="font-proxima-nova font-semibold text-[35px] mb-[36px]">
									soon I'll get more food from{' '}
								</p>
								<p className="font-proxima-nova text-[50px] font-semibold mb-[20px] text-primary">
									Eli Haddad{' '}
								</p>
								<p className="font-proxima-nova font-semibold text-[35px]">
									and then I'll never disappoint you again..
								</p>
							</div>
							<p className="font-proxima-nova font-semibold text-[24px]">
								Meanwhile,{' '}
								<span className="text-primary underline cursor-pointer">
									{' '}
									Do It Yourself
								</span>{' '}
							</p>
							<p className="font-proxima-nova font-semibold text-[24px]">
								{' '}
								Or use one of our exist projects as a resource{' '}
							</p>
						</div>
						<div className="w-[45%] ml-[80px]">
							<img
								src="/images/not-found-img.svg"
								alt="image"
							/>
						</div>
					</div>
					<Label
						className="text-gray-600 text-2xl font-proxima-nova tracking-tight font-semibold border-t mt-[30px] py-1.5 2xl:pt-[24px] border-gray-425"
						value={`${products.length} Search Results form exist projects`}
					/>
				</div>
			) : null}
		</>
	);
}

export default SingleSearchResultTabContent;
