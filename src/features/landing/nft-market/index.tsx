import React, { forwardRef, useEffect, useState } from 'react';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ButtonBase, Typography } from '@mui/material';
// import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
// import TabsProjectGeneral from "@organisms/tabs-projects-general-info";
import ItemsTabContent from '@organisms/nft-Items-tab-content';
// import SearchInput from "@molecules/search-input";
import ChartActivitiesNFT from '@organisms/tab-content-chart-activities';
import CustomSelect from '@molecules/custom-select';
import { ApiDataType, apiService } from 'utils/request';
import { AiOutlineSearch } from 'react-icons/ai';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}
interface TabPanelPropsSecond {
	children?: React.ReactNode;
	index: number;
	value: number;
}
function TabPanelSecond(props: TabPanelPropsSecond) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yPropsSecond(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const MyTabScrollButton = forwardRef((props: any, ref: any) => {
	const { direction, ...other } = props;

	return (
		<ButtonBase
			component="div"
			ref={ref}
			style={{ opacity: other.disabled ? 0 : 1 }}
			{...other}
		>
			{direction === 'left' ? (
				// <BsArrowLeftShort className="text-xl bg-primary text-white rounded-[10px] h-8 w-8 mr-8" />
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

const NftMarketHome = (props: any) => {
	const { projects } = props;

	const projectCategories = [
		{ id: 1, name: 'Electronics' },
		{ id: 2, name: 'Code' },
		{ id: 3, name: 'Cover' },
		{ id: 4, name: 'Cover' },
		{ id: 5, name: 'Cover' },
	];
	const [secondTabValue, setSecondTabValue] = useState(0);

	const handleChangeSecondTab = (event: React.SyntheticEvent, newValue: number) => {
		setSecondTabValue(newValue);
	};
	const perPage = 6;
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [totalPageCount, setTotalPageCount] = useState(0);
	const [value, setValue] = useState(0);
	const [search, setSearch] = useState<string>('');
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [isInitPageRender, setIsInitPageRender] = useState<boolean>(true); //Todo:: later uncomment to improve binding logic
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	// const [index, setIndex] = useState<number>(0);

	useEffect(() => {
		setFilteredProjects(projects);
		getTopProjects(currentPage, perPage);
		setIsInitPageRender(false);
	}, [projects]);

	useEffect(() => {
		if (!isInitPageRender) {
			getTopProjects();
		}
	}, [search]);

	// const handleChangeTab = (event: any, newValue: any): void => {
	//   setIndex(newValue);
	// };

	const getTopProjects = async (page = 0, pageSize = perPage, concat = false) => {
		const pageNum = page + 1;
		const params = `?page=${pageNum}&page_size=${pageSize}${search ? `&search=${search}` : ''}`;
		let result: any = [];
		setLoading(true);
		const apiData: ApiDataType = {
			method: 'get',
			url: `project/${params}`,
		};

		await apiService(apiData, (res: any) => {
			if (res) result = res?.data?.results;
			const count = res?.data?.count;
			setTotalPageCount(count > pageSize ? Math.ceil(count / pageSize) : 1);
			setCurrentPage(pageNum);
			setFilteredProjects(concat ? [...filteredProjects, ...result] : result);
		});

		setLoading(false);
	};

	const handleLoadMore = () => {
		getTopProjects(currentPage, perPage, true);
	};

	return (
		<div className="lg:pt-[190px] pt-[85px] bg-white px-[15px] lg:px-[100px] 2xl:px-[265px] mb-[115px]">
			{/* <div className="bg-header pt-20"></div> */}

			<div className="text-center">
				<h2 className=" text-[24px] xl:text-[48px] uppercase font-semibold text-[#333333] leading-[30px] xl:leading-[72px] pb-[15px]">
					NFT MARKETPALCE
				</h2>
				<p className="text-[#787878] text-[16px] leading-[29px] pb-[18px] px-[30px]">
					Your One stop PAAS to Mint and Trade NFT’s of your very own Product design,{' '}
					<br /> Collaborate on product innovation and development.
				</p>
				<p className=" text-primary text-[18px] leading-[32px] pb-[70px]">
					Dream it, Mint it, Own it, Make it. IDEEZA Helps you with every step.
				</p>
			</div>

			<div className="custom-nft-market-tab">
				<Box
					sx={{
						// maxWidth: 480,
						bgcolor: 'background.paper',
						flexGrow: 1,
						backgroundColor: '#ffffff',
						// paddingTop: "70px",
						// textDecoration: "capitalize",
					}}
				>
					<div className="flex flex-col items-center justify-center 2xl:justify-start 2xl:items-start 2xl:flex-row border-b pb-[30px] 2xl:gap-[55px]">
						<Tabs
							value={value}
							onChange={handleChange}
							variant="scrollable"
							scrollButtons
							ScrollButtonComponent={MyTabScrollButton}
							aria-label="scrollable auto tabs example"
							className="capitalize w-full xl:w-[561px] mb-[20px] xl:mb-0 border border-solid border-[#EEEEEE] px-[8px] rounded-[10px] bg-[#FAFAFA]"
							sx={{
								[`& .${tabsClasses.scrollButtons}`]: {
									'&.Mui-disabled': { opacity: 0.3 },
								},
							}}
						>
							{projectCategories.map((category, index) => (
								<Tab
									className="py-[8px] px-[20px] min-h-[0] mr-[16px]"
									key={index}
									label={category.name}
									{...a11yProps(0)}
								/>
							))}
						</Tabs>
						<div className="custom-second-tab">
							<Box sx={{ width: '100%' }}>
								<Box sx={{ borderColor: 'divider' }}>
									<Tabs
										value={secondTabValue}
										onChange={handleChangeSecondTab}
										aria-label="basic tabs example"
										className="capitalize mb-[20px] xl:mb-0 border border-solid border-[#EEEEEE] px-[8px] rounded-[10px] bg-[#fff]"
									>
										<Tab
											label="Items"
											{...a11yPropsSecond(0)}
											className="py-[8px] px-[20px] min-h-[0] mr-[16px]"
										/>
										<Tab
											label="Activites"
											{...a11yPropsSecond(1)}
											className="py-[8px] px-[20px] min-h-[0] mr-[16px]"
										/>
									</Tabs>
								</Box>
							</Box>
						</div>
						<div className="col-span-2 relative 2xl:w-[487px]">
							<AiOutlineSearch className="text-3xl absolute left-5 top-[15px] text-[#999999]" />
							<input
								type="text"
								value={search}
								onChange={(e: any) => setSearch(e.target.value)}
								className="placeholder-[#B9B9B9] text-[16px] focus:outline-none text-lg font-normal py-[15px] pl-[61px] border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA] 2xl:w-[487px]"
								placeholder="Search..."
							/>
						</div>
					</div>

					<div className="">
						<div className="custom-tab-nft-frist">
							<TabPanel
								value={value}
								index={Number(value)}
							>
								<TabPanelSecond
									value={secondTabValue}
									index={0}
								>
									<div>
										<div className="flex items-center justify-center xl:justify-start flex-wrap py-[30px] border-b">
											<div className="flex justify-center mr-[20px]">
												<CustomSelect
													options={[
														{ name: 'Car', value: 'Car' },
														{ name: 'Mobile', value: 'Mobile' },
														{ name: 'NFT', value: 'NFT' },
													]}
													inputClassName="focus:outline-none w-[150px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
													placeholder="Select a tag"
													unorderedList="absolute overflow-y-auto w-full bg-white rounded border mt-2 shadow-lg flex flex-wrap gap-4 z-10  top-10 text-xl"
													arrowColor=" text-[#333333] ml-[-2rem]"
													arrowColorTop=" text-primary ml-[-2rem]"
												/>
											</div>
											<div className="flex justify-center mr-[20px]">
												<CustomSelect
													options={[
														{ name: 'Car', value: 'Car' },
														{ name: 'Mobile', value: 'Mobile' },
														{ name: 'NFT', value: 'NFT' },
													]}
													inputClassName="focus:outline-none w-[150px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
													placeholder="Most viewed"
													unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 rounded border mt-2 top-10 text-xl"
													arrowColor=" text-[#333333] ml-[-2rem]"
													arrowColorTop=" text-primary ml-[-2rem]"
												/>
											</div>
											<div className="flex justify-center mr-[20px]">
												<CustomSelect
													options={[
														{ name: 'Car', value: 'Car' },
														{ name: 'Mobile', value: 'Mobile' },
														{ name: 'NFT', value: 'NFT' },
													]}
													inputClassName="focus:outline-none w-[150px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
													placeholder="Last viewed"
													unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 rounded border mt-2 top-10 text-xl"
													arrowColor=" text-[#333333] ml-[-2rem]"
													arrowColorTop=" text-primary ml-[-2rem]"
												/>
											</div>
											<div className="flex justify-center mr-[20px]">
												<CustomSelect
													options={[
														{ name: 'Car', value: 'Car' },
														{ name: 'Mobile', value: 'Mobile' },
														{ name: 'NFT', value: 'NFT' },
													]}
													inputClassName="focus:outline-none w-[150px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
													placeholder="Single Item"
													unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 rounded border mt-2 top-10 text-xl"
													arrowColor=" text-[#333333] ml-[-2rem]"
													arrowColorTop=" text-primary ml-[-2rem]"
												/>
											</div>
											<div className="flex justify-center mr-[20px]">
												<CustomSelect
													options={[
														{ name: 'Car', value: 'Car' },
														{ name: 'Mobile', value: 'Mobile' },
														{ name: 'NFT', value: 'NFT' },
													]}
													inputClassName="focus:outline-none w-[150px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
													placeholder="Price"
													unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 rounded border mt-2 top-10 text-xl"
													arrowColor=" text-[#333333] ml-[-2rem]"
													arrowColorTop=" text-primary ml-[-2rem]"
												/>
											</div>
											<div className="flex justify-center mr-[20px]">
												<CustomSelect
													options={[
														{ name: 'Car', value: 'Car' },
														{ name: 'Mobile', value: 'Mobile' },
														{ name: 'NFT', value: 'NFT' },
													]}
													inputClassName="focus:outline-none w-[150px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
													placeholder="Chain Type"
													unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 rounded border mt-2 top-10 text-xl"
													arrowColor=" text-[#333333] ml-[-2rem]"
													arrowColorTop=" text-primary ml-[-2rem]"
												/>
											</div>
											<div className="flex justify-center mr-[20px]">
												<CustomSelect
													options={[
														{ name: 'ETH', value: 'ETH' },
														{ name: 'WETH', value: 'WETH' },
														{ name: 'DAI', value: 'DAI' },
														{ name: 'USDC', value: 'USDC' },
													]}
													inputClassName="focus:outline-none w-[150px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
													placeholder="On Sale In"
													unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 rounded border mt-2 top-10 text-xl"
													arrowColor=" text-[#333333] ml-[-2rem]"
													arrowColorTop=" text-primary ml-[-2rem]"
												/>
											</div>
										</div>
										<ItemsTabContent
											loading={loading}
											projects={filteredProjects}
											hasLoadMore={currentPage < totalPageCount}
											handleLoadMore={handleLoadMore}
										/>
									</div>
								</TabPanelSecond>
								<TabPanelSecond
									value={secondTabValue}
									index={1}
								>
									<div className="w-[880px] m-auto mt-[50px]">
										<ChartActivitiesNFT />
									</div>
								</TabPanelSecond>

								{/* <TabsProjectGeneral
                    tabsClasses="border-none mb-[20px] custom-border-project-tabs flex justify-center w-full"
                    tabClasses="bg-transparent focus:bg-transparent focus:text-primary text-xl tracking-tight eina-font-sb03 max-w-[0] custom-border-nft-tab mr-2 transform-none py-1 px-0"
                    handleChange={handleChangeTab}
                    selected="text-[#ff09d0]"
                    index={index}
                    tabsData={[
                      {
                        name: <div className="text-base">Items</div>,
                        textColor: "primary",
                        component: (
                          <div>
                            <ItemsTabContent
                              loading={loading}
                              projects={filteredProjects}
                              hasLoadMore={currentPage < totalPageCount}
                              handleLoadMore={handleLoadMore}
                            />
                          </div>
                        ),
                      },
                      {
                        name: <div className="text-base">Activities</div>,
                        textColor: "primary",

                        component: (
                          <div className="w-[50%] m-auto">
                            <ChartActivitiesNFT />
                          </div>
                        ),
                      },
                    ]}
                  /> */}
							</TabPanel>
						</div>
					</div>
				</Box>
			</div>
		</div>
	);
};

export default NftMarketHome;
