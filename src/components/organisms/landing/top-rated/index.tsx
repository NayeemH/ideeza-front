import React, { useEffect, useState, forwardRef } from 'react';
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import TabsMoleculeAbout from "@molecules/tabs-about";
//import TopratedProducts from "../top-rated-product";

// import CustomSelect from "@molecules/custom-select";
import { AiOutlineSearch } from 'react-icons/ai';
// import { useThrottle } from "utils/utils";
import { ApiDataType, apiService } from 'utils/request';
import { ButtonBase } from '@mui/material';
// import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Label from '@atoms/label';
import TopratedProjects from '../top-rated-projects';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}
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
				// <BsArrowLeftShort className="text-xl bg-primary text-white rounded-[10px] h-8 w-8 mr-8" />
				<div className="bg-transparent">
					<img
						src="/images/icon/arrow-left-tab.svg"
						className="w-[30px]  h-[30px] mr-12 rounded-[4px] bg-primary px-2"
						alt="icon"
					/>
				</div>
			) : (
				<div className="bg-transparent">
					<img
						src="/images/icon/arrow-right-tab.svg"
						className="w-[30px]  h-[30px] ml-4 mr-6 rounded-[4px] bg-primary px-2"
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

const TopRated = (props: any) => {
	const { projects: initProjects } = props;
	// const [index, setIndex] = useState<number>(0);
	const [search, setSearch] = useState<string>('');
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [isInitPageRender, setIsInitPageRender] = useState<boolean>(true);
	const [value, setValue] = useState(0);
	// const throttleSearch = useThrottle(search, 2000);
	useEffect(() => {
		setFilteredProjects(initProjects);
		setIsInitPageRender(false);
	}, [initProjects]);

	useEffect(() => {
		if (!isInitPageRender) {
			getTopProjects();
		}
	}, [search]);

	// const handleChange = (event: any, newValue: any): void => {
	//   setIndex(newValue);
	// };
	const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	const getTopProjects = async (page = 1, pageSize = 5) => {
		const params = `?page=${page}&page_size=${pageSize}${search ? `&search=${search}` : ''}`;
		let result: any = [];
		setLoading(true);
		const apiData: ApiDataType = {
			method: 'get',
			url: `project/${params}`,
		};

		await apiService(apiData, (res: any) => {
			if (res) result = res?.data?.results;
		});

		setFilteredProjects(result);
		setLoading(false);
	};
	const projectCategories = [
		{ id: 1, name: 'Electronics' },
		{ id: 2, name: 'Code' },
		{ id: 3, name: 'Cover' },
		{ id: 4, name: 'Cover' },
		{ id: 5, name: 'Cover' },
	];

	return (
		<div className=" bg-white pt-[50px] 2xl:pt-[151px] md:pb-12 top-rated-container">
			<div className="flex justify-center">
				<Label
					value="Top Rated"
					className=" text-[24px] lg:text-[30px] 2xl:text-[45px] text-[#561F80] font-semibold"
				/>
				{/* <CustomSelect
          options={[
            { name: "Top Rated", value: "Top Rated" },
            { name: "7 days", value: "7 days" },
            { name: "last year", value: "last year" },
          ]}
          inputClassName="focus:outline-none w-36 md:w-56 rounded p-4 text-[#561F80] text-xl lg:text-4xl font-semibold placeholder-[#561F80]"
          placeholder="Top Rated"
          unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 mt-5 top-10 text-xl lg:text-4xl"
          arrowColor="text-[#561F80]"
        /> */}
			</div>

			<div className="custom-top-rated-tab ">
				<Box
					sx={{
						// maxWidth: 480,
						bgcolor: 'background.paper',
						// paddingLeft: "40px",
						// paddingRight: "40px",
						flexGrow: 1,
						backgroundColor: '#fff',
						paddingTop: '50px',
						'@media screen and (max-width: 425px)': {
							paddingTop: '20px',
						},
						// textDecoration: "capitalize",
					}}
				>
					<div className="flex flex-col items-center md:items-start xl:flex-row justify-center xl:justify-between mb-[55px]">
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
							{projectCategories.map((category) => (
								<Tab
									className="py-[8px] px-[20px] min-h-[0] mr-[16px]"
									key={category.id}
									label={category.name}
									{...a11yProps(value)}
								/>
							))}
						</Tabs>
						<div className="md:mt-2 md:col-span-2 relative">
							<AiOutlineSearch className="text-3xl absolute left-5 top-[13px] text-[#999999]" />
							<input
								type="text"
								value={search}
								onChange={(e: any) => setSearch(e.target.value)}
								className="sm:w-[375px] lg:w-[200px] xl:w-[442px] placeholder-[#B9B9B9] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[61px] border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA] mr-[12px]"
								placeholder="Search..."
							/>
						</div>
					</div>
					<div className="">
						<div className="flex items-center md:items-start flex-col sm:flex-row">
							<div className="custom-tab-nft-frist w-full">
								{/* {projectCategories.map((category) => ( */}
								<TabPanel
									value={value}
									index={value}
								>
									{/* <TopratedProducts
                  loading={loading}
                  product={filteredProjects}
                /> */}

									<TopratedProjects
										loading={loading}
										projects={filteredProjects}
									/>
								</TabPanel>
								{/* ))} */}
							</div>
						</div>
					</div>
				</Box>
			</div>
			{/* <div className="">
        <TabsMoleculeAbout
          tabsClasses="w-full 2xl:w-1/5 xl:w-2/5 lg:w-2/6 md:w-1/2"
          tabClasses=" text-lg xl:text-xl 2xl:text-2xl eina-font-sb03 font-semibold tracking-tight transform-none text-[#101010] "
          appbarClassName="bg-transparent flex justify-between  col-span-3 md:col-span-6"
          indicatorColor="primary"
          selected="bottom-border"
          handleChange={handleChange}
          index={index}
          hasSideAppBarContent={true}
          sideAppBarContent={
            <div className="ml-3 lg:ml-0 mt-2 place-self-center lg:place-self-start lg:col-span-2 relative ">
              <input
                type="text"
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                className="w-full rounded-xl py-1 border border-gray-600 focus:outline-none  pl-4 shadow-md text-base lg:text-xl font-semibold bg-white focus:shadow-2xl "
                placeholder="Search here..."
              />
              <AiOutlineSearch className="text-xl lg:text-2xl -ml-2 absolute right-5 top-2  text-primary" />
            </div>
          }
          tabsData={[
            {
              name: "Cat1",
              textColor: "primary",
              component: (
                <TopratedProducts
                  loading={loading}
                  product={filteredProjects}
                />
              ),
            },
            {
              name: "Cat2",
              textColor: "primary",
              component: (
                <TopratedProducts
                  loading={loading}
                  product={filteredProjects}
                />
              ),
            },
            {
              name: "Cat3",
              textColor: "primary",
              component: (
                <TopratedProducts
                  loading={loading}
                  product={filteredProjects}
                />
              ),
            },
          ]}
        />
      </div> */}
		</div>
	);
};

export default TopRated;
