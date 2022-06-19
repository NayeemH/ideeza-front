import Label from '@atoms/label';
import Loader from '@atoms/loader';
import ProjectCarouselContent from '@organisms/project-small-carousel';
import React, { useEffect, useState } from 'react';
import { ApiDataType, apiService } from 'utils/request';
import Pagination from '@molecules/pagination';
import { useRouter } from 'next/router';
// import CustomSelect from "@molecules/custom-select";
import Button from '@atoms/button';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
// import { getProjectsAsync } from "@features/user/reducer";
// import { useDispatch } from "react-redux";
// import { getProjectsAsync } from "../projects/reducer";

const OPTIONS = [
	{ value: '-views', name: 'Most viewed' },
	{ value: '-likes', name: 'Most liked' },
	// { value: "-dislikes", name: "Most disliked" },
	{ value: '-created_at', name: 'Most recent' },
];

function TopProjectsHome() {
	const router = useRouter();

	//const [myProjects, setMyProjects] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(true);
	const [TopProjects, setTopProjects] = useState<any>([]);
	const [pager, setPager] = useState<any>({ page: 1, count: 1, totalBlogs: 0 });
	const [sortBy, setSortBy] = useState<string>('-views');
	// const [lodingSortedData, setLoadingSortedData] = useState(false);

	useEffect(() => {
		getMyProjects('public');
	}, [pager.page, sortBy]);

	const getMyProjects = async (type: 'public') => {
		const apiData: ApiDataType = {
			method: 'get',
			url: `project/?is_visible=${type === 'public'}&ordering=${sortBy}&page=${
				pager.page
			}&page_size=12`,
			token: false,
		};

		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				if (type === 'public') {
					setTopProjects(res?.data?.results);
					const { data } = res;
					// console.log(data);
					setPager({
						...pager,
						count: Math.ceil(data?.count / 12),
						totalBlogs: data?.count,
					});
				}

				setTimeout(() => {
					setLoading(false);
				}, 3000);
				return err;
			}

			setTimeout(() => {
				setLoading(false);
			}, 3000);
		});
	};

	const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
		setPager({ ...pager, page: value });
	};

	return (
		<>
			<div className="flex justify-between pb-[30px] border-b items-center">
				<div className="text-primary leading-[30px] text-[32px] font-proxima-nova font-bold min-w-[360px]">
					{sortBy == '-views'
						? 'Most Viewed'
						: sortBy == '-likes'
						? 'Most Liked'
						: 'Most Recent'}{' '}
					Projects
				</div>
				{TopProjects && TopProjects?.length > 0 && (
					<div className=" flex items-center justify-center mt-1 md:mt-0">
						<span className="ml-[17px] md:ml-0 text-gray-600">Sort by</span>
						<div className="relative">
							<IoIosArrowDown className="absolute right-[1px] xl:right-[10px] top-[4px] xl:top-[14px]" />
							<select
								className="px-4 xl:px-[25px] xl:pr-[35px] xl:py-[9px] border border-[#707070] rounded bg-white ml-2  text-base text-[#333333] focus:outline-none focus:border-primary appearance-none"
								onChange={(e) => {
									// setLoadingSortedData(true);
									setSortBy(e.target.value);
								}}
							>
								{OPTIONS.map((item, index) => (
									<option
										className="text-gray-600 hover:text-primary"
										key={index}
										value={item.value}
									>
										{item.name}
									</option>
								))}
							</select>
						</div>
					</div>
				)}
				{/* <div className="flex justify-center mr-[20px] items-center">
          <div className="text-[#707070] leading-[30px] text-[16px] font-semibold font-proxima-nova mr-[20px]">
            Sort by
          </div>
          <CustomSelect
            options={[
              { name: "Most likes", value: "Most likes" },
              { name: "Newest", value: "Newest" },
              { name: "Most Viewed", value: "Most Viewed" },
            ]}
            inputClassName="focus:outline-none w-[160px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
            placeholder="Most Viewed"
            unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 mt-5 top-6 border rounded-[5px] text-xl w-[200px]"
            arrowColor=" text-[#333333] ml-[-2rem]"
            arrowColorTop=" text-primary ml-[-2rem]"
          />
        </div> */}
				<Button
					value="Go back"
					onClick={() => {
						router.back();
					}}
					className="bg-primary text-base 2xl:text-lg font-proxima-nova text-white transform-none  tracking-tight px-[14px] py-[7] 2xl:px-[30px] 2xl:py-[8px] rounded shadow-none"
					iconStart={<FaArrowCircleLeft className="text-xl" />}
					color="primary"
				/>
			</div>
			{/* <div key={TopProjects?.id} className=""> */}
			{/* <ProjectCarouselContent
        iconContanerClass="border-none flex items-center justify-center text-lg rounded-full 2xl:w-7 2xl:h-7 w-5 h-5"
        numbering="hidden"
        imageSettingIcon="2xl:w-[30px] 2xl:h-[20px] w-full"
        imagesIdeezaIcon="2xl:w-[30px] 2xl:h-[20px] w-full"
        imagesIdeezaEye="2xl:w-[30px] 2xl:h-[20px] w-full"
        mainIconClass="flex items-center"
        lableIconClass={{
          root: "font-extrabold ml-2 text-base text-gray-300",
        }}
        data={TopProjects}
        projectData={TopProjects}
        carouselHeight="h-[370px]"
        titleClass="text-lg"
        nameClass="text-md "
        avatarClass="w-8 h-8"
        topIconContainer="hidden"
        bottomIconContainer="flex absolute bottom-[25px] 2xl:bottom-[40px] right-[43%] pl-1 w-[283px]  rounded-full project-icon-bg-custom justify-around py-[5px]"
        handleProjectClick={() =>
          router.push(`/user/dashboard/project/${TopProjects?.id}`)
        }
        ImageHeight="h-[320px]"
        productThreeDView={true}
        threeDScript={TopProjects?.three_d_script}
        threeDHeight={370}
      /> */}
			{/* </div> */}
			<div className="gap-6 pr-4 md:pr-1 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative pt-[30px]">
				{loading ? (
					<div className="w-full min-h-screen ">
						<Loader
							type="relative"
							isTransparentBg={true}
						/>
					</div>
				) : TopProjects?.length === 0 ? (
					<div className="w-full min-h-screen bg-white flex justify-center items-center">
						<Label
							value="No projects found"
							className="text-xl text-gray-700 font-semibold"
						/>
					</div>
				) : (
					TopProjects?.map((project: any) => {
						// TODO:: action or notification_count not found and UI not showing. change to dislike icon
						// TODO:: icon tooltip hover count not showing
						return (
							<div
								key={project?.id}
								className=""
							>
								<ProjectCarouselContent
									iconContanerClass="border-none flex items-center justify-center text-lg rounded-full 2xl:w-7 2xl:h-7 w-5 h-5"
									numbering="hidden"
									imageSettingIcon="2xl:w-4 2xl:h-4 w-full"
									imagesIdeezaIcon="2xl:w-4 2xl:h-4 w-full"
									imagesIdeezaEye="2xl:w-4 2xl:h-4 w-full"
									mainIconClass="flex items-center"
									lableIconClass={{
										root: 'font-extrabold ml-2 text-base text-gray-300',
									}}
									data={project}
									projectId={project?.id}
									projectData={project}
									carouselHeight="h-42 pb-3 relative"
									titleClass="text-lg"
									nameClass="text-md "
									avatarClass="w-8 h-8"
									topIconContainer="hidden"
									bottomIconContainer="flex absolute bottom-[25px] 2xl:bottom-[40px] right-[15%] px-1 w-[70%] rounded-full project-icon-bg-custom justify-around"
									handleProjectClick={() =>
										router.push(`/user/dashboard/project/${project?.id}`)
									}
									ImageHeight="h-[320px]"
									productThreeDView={true}
									threeDScript={project?.three_d_script}
									threeDHeight={240}
								/>
							</div>
						);
					})
				)}
			</div>

			{Array.isArray(TopProjects) && !loading && pager?.count > 1 && (
				<Pagination
					handlePage={handlePagination}
					pager={pager}
					mainClass="py-6"
				/>
			)}
		</>
	);
}
export default TopProjectsHome;
