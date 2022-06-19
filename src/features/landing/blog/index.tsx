import Button from '@atoms/button';
import Label from '@atoms/label';
import BlogNewsBottomLeft from '@organisms/blog-news-bottom-left';
import BlogNews from '@organisms/blog-news';
import { useRouter } from 'next/router';
import { forwardRef, useEffect, useState } from 'react';
import IFramePopup from '@organisms/iframe-popup';
import Image from 'next/image';
import { getBlogCategories } from './api';
import { ICoreCategory } from '@models/core';
import CustomPagination from '@molecules/custom-pagination';
import BlogCount from '@molecules/blog-count';
import { ApiDataType, apiService } from 'utils/request';
import { useThrottle } from 'utils/utils';
import Loader from '@atoms/loader';
import { ButtonBase } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AiOutlineSearch } from 'react-icons/ai';

export const MyTabScrollButton = forwardRef((props: any, ref: any) => {
	const { direction, ...other } = props;

	return (
		<ButtonBase
			component="div"
			ref={ref}
			style={{ opacity: other.disabled ? 0 : 1 }}
			{...other}
		>
			{direction === 'left' ? (
				<div className="">
					<img
						src="/images/icon/arrow-left-tab.svg"
						className="w-[30px] h-[30px] mr-12 rounded-[4px] bg-primary px-2"
						alt="icon"
					/>
				</div>
			) : (
				<div className="">
					<img
						src="/images/icon/arrow-right-tab.svg"
						className="w-[30px] h-[30px] ml-4 mr-6 rounded-[4px] bg-primary px-2"
						alt="icon"
					/>
				</div>
			)}
		</ButtonBase>
	);
});

function a11yProps(index: number) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}
interface BlogPropsType {
	blogPosts: any;
	topBlogPosts: any;
	paginateMeta: any;
	blogPostsCount: number;
}
export default function Blog(props: BlogPropsType) {
	const { blogPosts, topBlogPosts, paginateMeta, blogPostsCount } = props;

	const router = useRouter();
	const perPage = paginateMeta?.perPage;

	const [search, setSearch] = useState<string>('');
	const throttleSearch = useThrottle(search, 2000);
	const [open, setOpen] = useState<boolean>(false);
	const [pageCount, setPageCount] = useState<number>(paginateMeta?.pageCount);
	const [isInitPageRender, setIsInitPageRender] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(paginateMeta?.currentPage);
	const [categories, setCategories] = useState<ICoreCategory[]>([]);
	const [blogPostList, setBlogPostList] = useState<any>(blogPosts);
	const [activeCategory, setActiveCategory] = useState<any>('all');
	const [loading, setLoading] = useState<boolean>(false);
	const [value, setValue] = useState(0);
	const [totalBlogs, setTotalBlogs] = useState(blogPostsCount);

	// console.log("ww", paginateMeta);
	useEffect(() => {
		getBlogCategoryList();
	}, []);

	useEffect(() => {
		setIsInitPageRender(false);
	}, [blogPostList]);

	useEffect(() => {
		if (!isInitPageRender) {
			if (currentPage !== 1) return setCurrentPage(1);
			getBlogPosts();
		}
	}, [throttleSearch, activeCategory]);

	useEffect(() => {
		if (!isInitPageRender) getBlogPosts();
	}, [currentPage]);

	const toggleOpen = () => {
		setOpen((prev) => !prev);
	};

	const getBlogPosts = async () => {
		setLoading(true);
		const pageNum = currentPage ? `?page=${currentPage}` : '';
		const pageSize = perPage ? `&page_size=${perPage}` : '';
		const searchTerm = search ? `&search=${search}` : '';
		const CategoryName =
			activeCategory && activeCategory != 'all' ? `&category__name=${activeCategory}` : '';
		const apiData: ApiDataType = {
			method: 'get',
			url: `blog/${pageNum}${pageSize}${searchTerm}${CategoryName}`,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				const result = res?.data?.results || [];
				setPageCount(
					res?.data?.count > perPage ? Math.ceil(res?.data?.count / perPage) : 1
				);
				setTotalBlogs(res?.data?.count);
				setBlogPostList(result);

				return setLoading(false);
			}

			setBlogPostList([]);
			setLoading(false);
		});
	};

	const getBlogCategoryList = async () => {
		const categoryList = await getBlogCategories();
		setCategories(categoryList);
	};

	const onClickCategoryItem = (e: any, catName?: string) => {
		setActiveCategory(catName || '');
	};

	const handlePageChange = (e?: any, value?: any) => {
		setCurrentPage(value);
	};

	const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<>
			<IFramePopup
				open={open}
				toggleOpen={toggleOpen}
			/>
			<div className=" pt-[85px] xl:text-[100px] 2xl:pt-[180px]"></div>
			<div
				id="blog"
				className="blog font-popin"
			>
				<div className="flex justify-center items-center flex-col mb-[45px]">
					<Label
						value="ENJOY OUR ARTICLES"
						className="text-[#000000] font-[600] 2xl:text-[48px] text-[24px] leading-[40px] 2xl:leading-[72px]"
					/>
					<Label
						value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum euismod nulla pretium elit
            Iaculis pellentesque vulputate at venenatis non. Dignissim molestie ac nec mi"
						className="text-[#747474] font-[400] text-[16px] leading-[29px] w-[90%] lg:w-[70%] 2xl:w-[48%] mx-auto text-center"
					/>
				</div>

				<div className="rounded-[20px] border bg-[#FBFBFB] px-[20px] lg:px-[70px] py-[40px] flex lg:flex-row flex-col items-center gap-[30px] mx-[20px] lg:mx-[100px]">
					<div className="flex flex-col lg:w-[485px]">
						<div className="flex justify-center lg:justify-start items-center mt-8 mb-6  ">
							<Image
								src="/images/landing/ArticleWriter.png"
								className="w-[60px] h-[60px]"
								alt="image"
								width={60}
								height={60}
								// layout="responsive"
							/>
							<div className="flex flex-col pl-[18px]">
								<Label
									value={'Written by'}
									className=" text-[16px] text-[#787878] leading-[29px]"
								/>
								<Label
									value={'Samantha'}
									className=" text-[18px] leading-[32px]"
								/>
							</div>
						</div>
						<div className="text-[24px] lg:text-[30px] 2xl:text-[48px] 2xl:leading-[62px] font-[600] text-[#333333] text-center lg:text-left">
							How Ideeza <br /> can make the world a better place
						</div>
						<Label
							value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Pellentesque sollicitudin fermentum velit, elementum 
              luctus est ornare sit amet. "
							className="text-[16px] leading-[29px] font-[400] text-[#787878] text-center lg:text-left"
						/>
						<div className="flex justify-center lg:justify-start">
							<Button
								onClick={() => router.push(`/blog/3`)}
								value="Read more"
								className="text-white bg-primary transform-none text-base rounded-[5px] md:py-[11px] hover:shadow-lg outline-none shadow-none mt-[12px] w-[160px] min-h-0 font-normal font-poppins"
								color="primary"
							/>
						</div>
					</div>
					<div
						className="cursor-pointer pl-[40px]"
						onClick={toggleOpen}
					>
						<Image
							src="/images/landing/blog/blog-head-video.png"
							className="rounded-md w-full"
							alt="image"
							width={680}
							height={530}
							// layout="responsive"
						/>
					</div>
					<div className="cursor-pointer lg:block hidden">
						<Image
							src="/images/landing/blog/blog-head-img.png"
							className="rounded-md w-full"
							alt="image"
							width={315}
							height={530}
							// layout="responsive"
						/>
					</div>
				</div>
			</div>
			<div className="custom-blog-tab px-[50px] lg:px-[100px] 2xl:px-[295px]">
				<Box
					sx={{
						bgcolor: 'background.paper',
						flexGrow: 1,
						backgroundColor: '#fff',
						paddingTop: '50px',
					}}
				>
					<div className="flex flex-col items-center md:items-start xl:flex-row justify-center xl:justify-between mb-[75px]">
						<Tabs
							value={value}
							onChange={handleChangeTab}
							variant="scrollable"
							scrollButtons
							ScrollButtonComponent={MyTabScrollButton}
							aria-label="scrollable auto tabs example"
							className="capitalize w-full xl:w-[561px] mb-[20px] xl:mb-0 border border-solid border-[#EEEEEE] px-[8px] rounded-[10px] bg-[#FAFAFA]"
							sx={{
								[`& .${tabsClasses.scrollButtons}`]: {
									'&.Mui-disabled': { opacity: 1 },
								},
							}}
						>
							{categories && categories.length > 0 && (
								<>
									<Tab
										className={`py-[8px] px-[20px] min-h-[0] mr-[16px] opacity-100 ${
											activeCategory == 'all'
												? 'bg-primary text-white'
												: 'bg-white'
										}`}
										// key={index}
										label="All"
										onClick={(e: any) => onClickCategoryItem(e, 'all')}
										{...a11yProps(0)}
									/>
									{categories.map((item: any, index: number) => {
										// TODO: Remove condition and Add a slider to show all categories
										// if (index <= NUMBER_OF_CATEGORY_BLOG_PAGE_FILTER - 1)
										return (
											<Tab
												key={index}
												onClick={(e: any) =>
													onClickCategoryItem(e, item.name)
												}
												className={`py-[8px] px-[20px] min-h-[0] mr-[16px] opacity-100 ${
													activeCategory == item.name
														? 'bg-primary text-white'
														: 'bg-white'
												}`}
												label={item.name}
											/>
										);
									})}
								</>
							)}
						</Tabs>
						<div className="md:mt-2 col-span-2 relative">
							<AiOutlineSearch className="text-3xl absolute left-5 top-[13px] text-[#999999]" />
							<input
								type="text"
								value={search}
								onChange={(e: any) => setSearch(e.target.value)}
								className="w-[375px] xl:w-[442px] placeholder-[#B9B9B9] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[61px] border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
								placeholder="Search..."
							/>
						</div>
					</div>
				</Box>
			</div>

			<div className="flex flex-wrap  px-[50px] lg:px-[100px] 2xl:px-[295px] text-left mb-[115px]">
				<div className="flex flex-col lg:w-[895px] w-full">
					<div className="lg:gap-[50px] md:pr-12 w-full md:grid md:grid-cols-1 relative">
						{loading && (
							<Loader
								type="relative"
								isTransparentBg
							/>
						)}
						<>
							{blogPostList?.length > 0 ? (
								blogPostList?.map((item: any, i: any) => {
									return (
										<BlogNewsBottomLeft
											key={i}
											post={item}
											title={item?.title || ''}
											commentCount={item?.comments_count || 0}
											likeCount={item?.likes || 0}
											userName={
												item?.user?.first_name + ' ' + item?.user?.last_name
											}
											htmlValue={item?.description}
											date={item?.created_at}
											readTime={item?.min_read}
											avatar={item?.user?.profile_photo}
											img={item?.image}
										/>
									);
								})
							) : (
								<Label
									value="No blog matches your search"
									className="text-xl md:text-2xl xl:text-3xl 2xl:text-3xl my-32 text-black-300 font-meri xl:mx-32 md:mx-20 font-normal text-center"
								/>
							)}
						</>
					</div>

					{pageCount > 1 && (
						<div className="flex justify-between items-center mt-12">
							{/* <Label
								value={`Showing ${(currentPage - 1) * perPage + 1} - ${currentPage === pageCount ? totalBlogs : perPage * currentPage
									} of ${totalBlogs}`}
								classes={{
									root: 'text-md md:text-lg text-[#333333]  tracking-tight',
								}}
							/> */}
							<BlogCount
								currentPage={currentPage}
								perPage={perPage}
								pageCount={pageCount}
								totalBlogs={totalBlogs}
							/>

							<CustomPagination
								pageCount={pageCount}
								currentPage={currentPage}
								handleChange={handlePageChange}
							/>
						</div>
					)}
				</div>
				<div className="flex md:px-10 lg:px-0 lg:w-[425px] w-full flex-col">
					<Label
						value="Popular on Ideeza"
						className="text-[#333333] text-[16px] leading-[41px] pb-[15px] xl:text-[24px] font-[500] border-b"
					/>
					{topBlogPosts?.length > 0 &&
						topBlogPosts.slice(0, 5).map((item: any, i: any) => {
							return (
								<BlogNews
									key={i}
									details={item}
								/>
							);
						})}
				</div>
			</div>
		</>
	);
}
