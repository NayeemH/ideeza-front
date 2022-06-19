import React, { FC, useEffect, useState } from 'react';
import Button from '@atoms/button';
import Label from '@atoms/label';
import InvestorPopup from '@organisms/investorPopUp';
import { BiCaretDown } from 'react-icons/bi';
import Image from 'next/image';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import { Instance } from '@popperjs/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import IFramePopup from '@organisms/iframe-popup';
import { tabsClasses } from '@mui/material/Tabs';
// import { ButtonBase } from "@mui/material";
// import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import InvestorIconOne from '@atoms/investor-icon-one';
import InvestorIconTwo from '@atoms/investor-icon-two';
import InvestorIconThree from '@atoms/investor-icon-three';
import InvestorIconFour from '@atoms/investor-icon-four';
import InvestorCategoryFilterItem from '@organisms/investor-category-filter-item';
import { IInvestoryCategory, IInvestorNewsSingle } from '@models/investor';
import InvestorNewsSingle from '@molecules/investor-news-single';
import { getLastMonths } from 'utils/utils';
import { ApiDataType, apiService } from 'utils/request';
import Loader from '@atoms/loader';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MyTabScrollButton } from '@organisms/landing/top-rated';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}
// const MyTabScrollButton = forwardRef((props: any, ref: any) => {
//   const { direction, ...other } = props;

//   return (
//     <ButtonBase
//       component="div"
//       ref={ref}
//       style={{ opacity: other.disabled ? 0 : 1 }}
//       {...other}
//     >
//       {direction === "left" ? (
//         <BsArrowLeftShort className="text-xl bg-primary text-white rounded-full h-8 w-8 mr-3" />
//       ) : (
//         <BsArrowRightShort className="text-xl bg-primary text-white rounded-full h-8 w-8 ml-3" />
//       )}
//     </ButtonBase>
//   );
// });
function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

interface InvestorHomeType {
	categories: any;
	newsData: any;
	initPaginateMeta: any;
	tractionData: any;
}

const InvestorHome: FC<InvestorHomeType> = (props) => {
	const { categories, newsData, tractionData } = props;

	const defaultCategory = 'All Categories';

	const [popup, SetPopup] = useState(false);
	const [openBanner, setOpenBanner] = useState(false);
	const [value, setValue] = useState(0);
	const [isInitPageRender, setIsInitPageRender] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);
	const [news, setNews] = useState<IInvestorNewsSingle[]>(newsData?.results || []);
	const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
	const [dateFilterTabs, setDateFilterTabs] = useState<any>([]);
	const [selectedMonth, setSelectedMonth] = useState<any>([]);
	const [avgSessionDuration, setAvgSessionDuration] = useState<string>('');
	const [growthData, setGrowthData] = useState([]);

	// Slick Carosel

	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		initialSlide: 0,
		arrows: false,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
		appendDots: (dots: any) => (
			<div
				style={{
					borderRadius: '10px',
					padding: '10px',
				}}
			>
				<ul style={{ margin: '0px' }}> {dots} </ul>
			</div>
		),
		nextArrow: <GrCaretNext className="text-xl text-gray-300" />,
		prevArrow: <GrCaretPrevious className="text-xl text-primary" />,
	};

	// console.log('categories, news----', categories, newsData, initPaginateMeta)
	// console.log('categories, news----', categories, news)
	const settingsSecond = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		padding: 10,
	};
	useEffect(() => {
		if (isInitPageRender) {
			getLastTwelveMonths();
			setIsInitPageRender(false);
			setAvgSessionDuration(tractionData?.avg_session_duration);
			setMonthGrowthData();
			setValue(0);
		}
	}, [newsData]);

	useEffect(() => {
		if (!isInitPageRender) {
			getInvestorNews();
		}
	}, [selectedMonth, selectedCategory]);

	const toggleOpen = () => SetPopup(!popup);
	const toggleOpenBanner = () => setOpenBanner((state: any) => !state);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
		setSelectedMonth(dateFilterTabs[newValue]);
	};
	// const positionRef = React.useRef<{ x: number; y: number }>({
	// 	x: 0,
	// 	y: 0,
	// });
	// const popperRef = React.useRef<Instance>(null);
	// // const areaRef = React.useRef<HTMLDivElement>(null);

	// const handleMouseMove = (event: React.MouseEvent) => {
	// 	positionRef.current = { x: event.clientX, y: event.clientY };

	// 	if (popperRef.current != null) {
	// 		popperRef.current.update();
	// 	}
	// };

	const getInvestorNews = async (pageNum = 1, perSize = 5) => {
		setLoading(true);
		const firstDay: any = selectedMonth?.firstDay
			? `&created_at__lte=${selectedMonth?.firstDay}`
			: '';
		const lastDay: any = selectedMonth?.lastDay
			? `&created_at__gte=${selectedMonth?.lastDay}`
			: '';
		const dateQuery: any = firstDay + lastDay;
		const categoryQuery: any =
			selectedCategory && selectedCategory != defaultCategory
				? `&category__name=${selectedCategory}`
				: '';

		const apiData: ApiDataType = {
			method: 'get',
			url: `/investor/news/?page=${pageNum}&page_size=${perSize}${dateQuery}${categoryQuery}`,
		};

		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				setNews(res?.data?.results || []);
			}
			if (err) setNews([]);
			// console.log('error---', err)
		});
		setLoading(false);
	};

	const getLastTwelveMonths = () => {
		const months = getLastMonths();
		const all = {
			name: 'All',
			firstDay: '',
			lastDay: '',
		};
		const newData = [all, ...months];
		return setDateFilterTabs(newData);
	};

	const setMonthGrowthData = () => {
		const label = tractionData?.label;
		const users = tractionData?.users;
		const manufacturers = tractionData?.manufacturers;
		const freelancers = tractionData?.freelancers;
		const initData: any = [];
		if (
			label?.length > 0 &&
			users?.length > 0 &&
			manufacturers?.length > 0 &&
			freelancers?.length > 0
		) {
			label.map((item: any) => initData.push({ name: item }));
			users.map(
				(item: any, index: number) =>
					(initData[index] = { ...initData[index], ...{ user: item } })
			);
			manufacturers.map(
				(item: any, index: number) =>
					(initData[index] = { ...initData[index], ...{ manufacturer: item } })
			);
			freelancers.map(
				(item: any, index: number) =>
					(initData[index] = { ...initData[index], ...{ freelancer: item } })
			);
			// console.log('initData-----', initData)
			return setGrowthData(initData);
		}
		return setGrowthData([]);
	};

	const onClickFilter = (item: IInvestoryCategory) => {
		const selected: string = item?.name || '';
		setSelectedCategory(selected == selectedCategory ? defaultCategory : selected);
	};

	const CATEGORY_ICON: any = {
		0: <InvestorIconOne />,
		1: <InvestorIconTwo />,
		2: <InvestorIconThree />,
		3: <InvestorIconFour />,
	};

	return (
		<>
			<IFramePopup
				open={openBanner}
				toggleOpen={toggleOpenBanner}
			/>
			<div>
				<div className="md:pt-14 investor mt-20">
					{/* <div className="flex flex-col-reverse md:flex-row xl:h-screen"> */}
					<div className="xl:grid 2xl:grid-cols-[745px_1150px] xl:grid-cols-[40%_60%] investor-banner relative flex flex-col px-[15px] md:px-[50px] 2xl:px-0">
						<div className="my-auto custom-box-shadow-investor bg-white relative z-20 rounded-xl 2xl:mr-[-100px] md:mr-[5px] xl:mr-0 xl:ml-[100px]">
							<div className=" bg-white text-center xl:text-left p-[15px] md:pl-[100px] md:pt-[80px] ">
								<Label
									value="We make it easy for everyone to invest in Ideeza"
									className="text-2xl text-[#333333] font-semibold text-[24px] xl:text-[30px] 2xl:text-[48px] 2xl:mb-3 2xl:mr-12 leading-[40px] 2xl:leading-[72px] text-center xl:text-left"
								/>
								<Label
									value="With Ideeza we go together to invest in everything. You receive a
              huge amount of profit by investing in us by giving people the
              ability to make the things happen."
									className="text-[##787878] mt-4 text-lg xl:text-xl leading-8 2xl:mr-28 2xl:mb-24 text-center xl:text-left"
								/>
							</div>
						</div>
						<div className="w-full hidden md:block">
							<Slider {...settingsSecond}>
								<div>
									<div className="md:w-full  custom-img-banner relative">
										<Image
											src="/images/landing/investor-bg.png"
											className="w-[100%]"
											alt="image"
											width={'90%'}
											height={'70%'}
											layout="responsive"
										/>
										<div className="center-position cursor-pointer z-50">
											<img
												src="/images/landing/playbtn.png"
												className=" h-[120px] w-[120px] banner-playbtn"
												alt="image"
												onClick={toggleOpenBanner}
											/>
										</div>
										{/* <div className="absolute w-full h-full custom-bg-banner-overlay top-0 left-0"></div> */}
									</div>
								</div>
								<div>
									<div className="md:w-full  custom-img-banner relative">
										<Image
											src="/images/landing/investor-bg.png"
											className="w-[100%]"
											alt="image"
											width={'90%'}
											height={'70%'}
											layout="responsive"
										/>
										<div className="center-position cursor-pointer z-50">
											<img
												src="/images/landing/playbtn.png"
												className=" h-[120px] w-[120px] banner-playbtn"
												alt="image"
												onClick={toggleOpenBanner}
											/>
										</div>
										{/* <div className="absolute w-full h-full custom-bg-banner-overlay top-0 left-0"></div> */}
									</div>
								</div>
								<div>
									<div className="md:w-full  custom-img-banner relative">
										<Image
											src="/images/landing/investor-bg.png"
											className="w-[100%]"
											alt="image"
											width={'90%'}
											height={'70%'}
											layout="responsive"
										/>
										<div className="center-position cursor-pointer z-50">
											<img
												src="/images/landing/playbtn.png"
												className=" h-[120px] w-[120px] banner-playbtn"
												alt="image"
												onClick={toggleOpenBanner}
											/>
										</div>
										{/* <div className="absolute w-full h-full custom-bg-banner-overlay top-0 left-0"></div> */}
									</div>
								</div>
							</Slider>
						</div>
						<div className="w-full md:hidden px-[10px]">
							<Slider {...settingsSecond}>
								<div>
									<div className="md:w-full  custom-img-banner relative">
										<Image
											src="/images/landing/investor-bg.png"
											className="w-[100%]"
											alt="image"
											width={'100%'}
											height={'70%'}
											layout="responsive"
										/>
										<div className="center-position cursor-pointer z-50">
											<img
												src="/images/landing/playbtn.png"
												className=" h-[50px] w-[50px] md:h-[120px] md:w-[120px] banner-playbtn"
												alt="image"
												onClick={toggleOpenBanner}
											/>
										</div>
										{/* <div className="absolute w-full h-full custom-bg-banner-overlay top-0 left-0"></div> */}
									</div>
								</div>
								<div>
									<div className="md:w-full  custom-img-banner relative">
										<Image
											src="/images/landing/investor-bg.png"
											className="w-[100%]"
											alt="image"
											width={'100%'}
											height={'70%'}
											layout="responsive"
										/>
										<div className="center-position cursor-pointer z-50">
											<img
												src="/images/landing/playbtn.png"
												className=" h-[50px] w-[50px] md:h-[120px] md:w-[120px] banner-playbtn"
												alt="image"
												onClick={toggleOpenBanner}
											/>
										</div>
										{/* <div className="absolute w-full h-full custom-bg-banner-overlay top-0 left-0"></div> */}
									</div>
								</div>
								<div>
									<div className="md:w-full  custom-img-banner relative">
										<Image
											src="/images/landing/investor-bg.png"
											className="w-[100%]"
											alt="image"
											width={'100%'}
											height={'70%'}
											layout="responsive"
										/>
										<div className="center-position cursor-pointer z-50">
											<img
												src="/images/landing/playbtn.png"
												className=" h-[50px] w-[50px] md:h-[120px] md:w-[120px] banner-playbtn"
												alt="image"
												onClick={toggleOpenBanner}
											/>
										</div>
										{/* <div className="absolute w-full h-full custom-bg-banner-overlay top-0 left-0"></div> */}
									</div>
								</div>
							</Slider>
						</div>
					</div>

					<div className="flex flex-col w-full mt-28">
						<div className="w-full mt-8 p-6">
							<Label
								value="Our achievments"
								className="text-center text-[#333333] font-semibold text-2xl xl:text-[40px] 2xl:text-[48px] leading-[72px]"
							/>

							<Label
								value="With Ideeza we go together to invest in everything. You receive a huge amount of profit by investing in us by giving people the ability to make the things happen."
								className="text-[##787878] text-center mt-3 text-sm 2xl:text-base leading-8 md:px-8 lg:px-12 lg:w-2/6 md:w-2/4 w-full mx-auto  text-auto mb-8 font-sans"
							/>
						</div>

						<div className="mt-20 custom-investor-tabpanel">
							<Box
								sx={{
									// maxWidth: 1920,
									bgcolor: 'background.paper',
									// paddingLeft: "240px",
									// paddingRight: "140px",
									// textDecoration: "capitalize",
								}}
							>
								<div className=" px-[30px] lg:px-[100px] 2xl:px-[300px]">
									{dateFilterTabs?.length > 0 && (
										<Tabs
											value={value}
											onChange={handleChange}
											variant="scrollable"
											scrollButtons
											ScrollButtonComponent={MyTabScrollButton}
											aria-label="scrollable auto tabs example"
											className="capitalize w-full 2xl:w-[1320px] mb-[20px] xl:mb-0 border border-solid border-[#EEEEEE] px-[8px] rounded-[10px] bg-[#FAFAFA]"
											sx={{
												[`& .${tabsClasses.scrollButtons}`]: {
													'&.Mui-disabled': { opacity: 1 },
												},
											}}
										>
											{dateFilterTabs.map((item: any, index: number) => (
												<Tab
													key={index}
													className="py-[8px] px-[20px] min-h-[0] mr-[16px]"
													label={item?.name}
													{...a11yProps(index)}
												/>
											))}
										</Tabs>
									)}
								</div>

								<div className="grid grid-cols-12 pb-[30px] md:mt-16 2xl:pl-[170px] ">
									<div className=" col-span-12 lg:col-span-4 ">
										{categories?.length > 0 && (
											<div className="">
												<div className="text-center">
													<Label
														value={selectedCategory}
														className="text-gray-700 text-center font-bold text-lg font-muli -mb-1"
													/>
													<BiCaretDown className="text-primary mx-auto text-2xl" />
												</div>
												<div className="text-center pt-6 w-full flex flex-col items-center justify-center">
													<div className="grid grid-cols-2 gap-6 md:gap-3 lg:gap-6 ">
														{categories.map(
															(
																category: IInvestoryCategory,
																index: number
															) => (
																<InvestorCategoryFilterItem
																	key={index}
																	category={category}
																	isActive={
																		selectedCategory ==
																		category?.name
																	}
																	categoryIndex={index}
																	icon={CATEGORY_ICON[index]}
																	onClickFilter={() =>
																		onClickFilter(category)
																	}
																	// areaRef={areaRef}
																	// handleMouseMove={handleMouseMove}
																	// popperProps={{
																	//   popperRef,
																	//   anchorEl: { getBoundingClientRect: () => {
																	//     return new DOMRect( positionRef.current.x, areaRef.current!.getBoundingClientRect().y, 0, 0 );
																	//   } }
																	// }}
																/>
															)
														)}
													</div>
												</div>
											</div>
										)}
									</div>
									<div className=" col-span-12 lg:col-span-8 gap-16 mx-[15px] md:mx-0 mt-[20px] md:mt-16 2xl:ml-[-60px]">
										<TabPanel
											value={value}
											index={value}
										>
											<div className=" investor-news-content">
												{loading && (
													<Loader
														type="fixed"
														// isTransparentBg
													/>
												)}
												{news?.length > 0 ? (
													<>
														<Slider {...settings}>
															{news?.map(
																(item: any, index: number) => (
																	<>
																		<InvestorNewsSingle
																			item={item}
																			key={index}
																		/>
																	</>
																)
															)}
														</Slider>
													</>
												) : (
													<Label
														value="No news found!!"
														className="text-xl md:text-2xl xl:text-3xl 2xl:text-3xl my-32 text-black-300 font-meri xl:mx-32 md:mx-20 font-normal text-center"
													/>
												)}
											</div>
										</TabPanel>
									</div>
								</div>
							</Box>
						</div>
					</div>

					<div className="w-full mt-28 p-6">
						<Label
							value="User traction"
							className="text-center text-[#333333] font-semibold text-3xl xl:text-[48px]  "
						/>

						<Label
							value="With Ideeza we go together to invest in everything. You receive a huge amount of profit"
							className="text-gray-700 text-center leading-6 md:px-8 lg:px-12 lg:w-2/6 md:w-2/4 w-full mx-auto md:text-md text-auto mb-8 mt-5"
						/>
					</div>
					<div className="flex md:px-20 px-4 md:py-16 w-full flex-wrap 2xl:px-[300px]">
						<div className="md:w-1/4 md:my-0 my-6 w-full shadow-full md:p-5 p-4 md:px-8 shadow-custom-textarea">
							<Label
								value="Avg. session duration"
								className="text-gray-600 text-xl"
							/>
							<Label
								value={avgSessionDuration}
								className="text-primary text-3xl my-6"
							/>
							{/* TODO:: uncomment if necessary to show chart for session duration */}
							{/* <ResponsiveContainer width="100%" height={400}>
                <LineChart data={growthData}>
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#FC00C5"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer> */}
						</div>
						<div className="md:w-3/4 md:my-0 my-6 md:pl-5 w-full">
							<div className="shadow-full md:p-5 p-4 md:px-8 shadow-custom-textarea">
								<Label
									value={
										<>
											Growth Chart{' '}
											<span className="ml-2 text-md text-gray-400">
												This Month
											</span>
										</>
									}
									className="text-gray-600 text-xl"
								/>
								<div className="flex flex-wrap mt-10 mb-12">
									<div className="flex items-center mr-8">
										<div className="bg-[#7460EE] h-5 w-5 rounded-full mr-3"></div>
										<div className=" text-base 2xl:text-xl text-[#8399A4]">
											Users
										</div>
									</div>
									<div className="flex items-center mr-8">
										<div className="bg-[#FFBB44] h-5 w-5 rounded-full mr-3"></div>
										<div className=" text-base 2xl:text-xl text-[#8399A4]">
											Service providers
										</div>
									</div>
									<div className="flex items-center mr-8">
										<div className="bg-[#FC00C5] h-5 w-5 rounded-full mr-3"></div>
										<div className=" text-base 2xl:text-xl text-[#8399A4]">
											Freelancers
										</div>
									</div>
								</div>
								<ResponsiveContainer
									width="100%"
									height={400}
								>
									<LineChart data={growthData}>
										<XAxis dataKey="name" />
										<YAxis />
										<CartesianGrid
											stroke="#eee"
											strokeDasharray="5 5"
										/>
										<Line
											type="monotone"
											dataKey="user"
											stroke="#7460EE"
										/>
										<Line
											type="monotone"
											dataKey="manufacturer"
											stroke="#FFBB44"
										/>
										<Line
											type="monotone"
											dataKey="freelancer"
											stroke="#FC00C5"
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						</div>
					</div>
					<div className="flex items-start flex-col md:flex-row mt-28 px-[20px] lg:px-[100px] 2xl:px-[300px] relative">
						<div className="lg:w-[873px] w-full pb-10 md:pb-0">
							<div className="relative">
								<Image
									src="/images/landing/investor-btm.png"
									className="w-[100%]"
									alt="image"
									width={'100%'}
									height={'70%'}
									layout="responsive"
								/>
								<div className="center-position cursor-pointer z-50">
									<img
										src="/images/landing/playbtn.png"
										className="2xl:h-[100px] 2xl:w-[100px] h-20 w-20 banner-playbtn"
										alt="image"
										onClick={toggleOpenBanner}
									/>
								</div>
								{/* <div className="absolute w-full h-full custom-bg-banner-overlay top-0 left-0"></div> */}
							</div>
						</div>
						<div className=" absolute right-[300px] top-[-100px] lg:w-[735px] w-full md:pb-16 flex items-center z-50 ">
							<div className="shadow-xl rounded-xl border bg-white pl-[110px] pr-[115px] py-[95px]">
								<Label
									value="Know more about us"
									className="text-gray-700 text-2xl md:pr-20 md:text-4xl mb-3 font-medium leading-11"
								/>
								<Label
									value="With Ideeza we go together to invest in everything.
              You receive a huge amount of profit by investing in us by giving
              people the ability to make the things happen."
									className="text-gray-700 md:text-base mb-3 font-sans leading-8 md:pr-3"
								/>
								<div className="flex justify-between text-center mt-[50px]">
									<div className="text-center w-[100%] xl:w-[190px]">
										{/* <img
                      src="/images/landing/download.png"
                      className="mx-auto"
                      width="60%"
                      alt="image"
                    /> */}
										<Image
											src="/images/landing/download.png"
											className="mx-auto w-[2px]"
											alt="image"
											width={115}
											height={'100%'}
											// layout="responsive"
										/>
										<p className="pt-2 text-gray-900 text-base xL:text-[20px] font-[500] font-poppins">
											Download the pitchdeck
										</p>
									</div>
									<div className="text-center w-[70%] xl:w-[190px]">
										{/* <img
                      src="/images/landing/download.png"
                      className="mx-auto"
                      width="60%"
                      alt="image"
                    /> */}
										<Image
											src="/images/landing/download.png"
											className="mx-auto"
											alt="image"
											width={115}
											height={'100%'}
											// layout="responsive"
										/>
										<p className="pt-2 text-gray-900 text-base xL:text-[20px] font-[500] font-poppins">
											Download Executive summary
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full text-center mt-8 p-6 sm:pb-0 py-10 2xl:pb-[115px] lg:pt-20 lg:pb-16">
						<Label
							value="Want to work with us?"
							className="text-center font-semibold text-gray-700 text-xl sm:text-2xl lg:text-4xl mb-4 lg:mb-12 font-meri"
						/>
						<Button
							onClick={toggleOpen}
							value="Yes, Continue"
							className=" bg-primary text-white rounded capitalize text-base px-14 py-2 lg:py-5 lg:pt-6 hover:shadow-lg outline-none border-0 shadow-none"
						/>
					</div>
				</div>
				<InvestorPopup
					open={popup}
					toggleOpen={toggleOpen}
				/>
			</div>
		</>
	);
};

export default InvestorHome;
