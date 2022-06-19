import Label from '@atoms/label';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import ProjectCarousel from '@molecules/project-carousel';
// import ProjectPageItem from '@organisms/project-page/item';
import { ApiDataType, apiService } from '../../../utils/request';
import Loader from '@atoms/loader';
import { IoIosArrowDown } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import NewsFeedSingleItem from '@organisms/news-feed-single-item';

const SharedProjects = () => {
	const router = useRouter();
	const user_id = Number(router.query.id);

	const [projects, setProjects] = useState<any>([]);
	const [loading, setLoading] = useState(true);

	const sortByOptions = [
		{ value: '', name: 'None' },
		{ value: '-views', name: 'Most Viewed' },
		{ value: '-likes', name: 'Most Liked' },
		// { value: "-dislikes", name: "Most Disliked" },
		{ value: '-created_at', name: 'Most Recent' },
	];

	const getSharedProjects = async () => {
		setLoading(true);
		const apiData: ApiDataType = {
			method: 'get',
			url: `/project/news-feed/?user__id=${user_id}&ordering=created_at&page=1&page_size=10`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				const projects = res?.data?.results?.map((result: any) => result?.project);
				setProjects(projects);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		getSharedProjects();
	}, []);
	// console.log(projects);

	// const gotoProjectDetails = (project: any) => {
	// 	router.push({
	// 		pathname: `/user/dashboard/project/${project.id}`,
	// 	});
	// };

	return (
		<div className="font-proxima-nova">
			<div className="relative">
				<input
					type="text"
					className="w-full border border-[#E6E6E6] px-[20px] pt-[13px] pb-[15px] rounded-md focus:outline-none placeholder:text-[#B9B9B9]"
					placeholder="search..."
				/>
				<FiSearch className="absolute right-4 top-4 text-xl font-extrabold text-[#999999] cursor-pointer" />
				<div className="flex items-center gap-[15px] w-full pb-4 mt-6 lg:justify-start 2xl:justify-between">
					<div className="flex flex-wrap justify-between 2xl:justify-center">
						<div className=" whitespace-nowrap mr-2 text-[#101010] font-proxima-nova text-base 2xl:text-xl flex items-center">
							Browse by Tag
						</div>
						<div className="relative">
							<IoIosArrowDown className="absolute right-[10px] xl:right-[8px] top-[8px] xl:top-[14px]" />
							<select
								//   value={sortBy}
								//   onChange={onChangeSortBy}
								className="px-5 pt-3 pb-[14px] border border-[#E6E6E6] rounded-md appearance-none focus:outline-none"
							>
								{/* {sortByOptions.map((item: any, index: number) => ( */}
								<option
									className="text-[#999999] text-lg"
									value="category1"
								>
									category1
								</option>
								<option
									className="text-[#999999] text-lg"
									value="category2"
								>
									category2
								</option>
								<option
									className="text-[#999999] text-lg"
									value="category3"
								>
									category3
								</option>
								<option
									className="text-[#999999] text-lg"
									value="category4"
								>
									category4
								</option>
							</select>
						</div>
					</div>
					<div className="flex flex-wrap justify-between 2xl:justify-center">
						<div className="mr-2 text-[#101010] font-proxima-nova text-base 2xl:text-xl flex items-center">
							Sort by
						</div>
						<div className="relative">
							<IoIosArrowDown className="absolute right-[10px] xl:right-[8px] top-[8px] xl:top-[14px]" />
							<select
								// value={sortBy}
								// onChange={onChangeSortBy}
								className="px-5 pt-3 pb-[14px] border border-[#E6E6E6] rounded-md appearance-none focus:outline-none"
							>
								{sortByOptions.map((item: any, index: number) => (
									<option
										className="text-[#999999]"
										key={index}
										value={item.value}
									>
										{item.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="flex flex-wrap justify-between 2xl:justify-center">
						<div className="mr-2 text-[#101010] font-proxima-nova text-base 2xl:text-xl flex items-center">
							From
						</div>
						<div className="relative">
							<IoIosArrowDown className="absolute right-[10px] xl:right-[8px] top-[8px] xl:top-[14px]" />
							<select
								//   value={sortBy}
								//   onChange={onChangeSortBy}
								className="px-6 pt-3 pb-[14px] border border-[#E6E6E6] rounded-md appearance-none focus:outline-none"
							>
								{/* {sortByOptions.map((item: any, index: number) => ( */}
								<option
									className="text-[#999999]"
									value="Last week"
								>
									Last week
								</option>
								<option
									className="text-[#999999]"
									value="category2"
								>
									category2
								</option>
								<option
									className="text-[#999999]"
									value="category3"
								>
									category3
								</option>
								<option
									className="text-[#999999]"
									value="category4"
								>
									category4
								</option>

								{/* ))} */}
							</select>
						</div>
					</div>
				</div>
			</div>

			<div className="max-h-96 overflow-y-auto">
				{loading ? (
					<div className="relative h-96 w-full ">
						<Loader type="relative" />
					</div>
				) : projects?.length !== 0 ? (
					<>
						{projects?.map((item: any, index: number) => {
							return (
								<div
									key={index}
									className={`sm:grid pr-2 sm:grid-cols-10 gap-1 xl:gap-2 ${
										index !== 0 ? 'mt-10' : ''
									}`}
								>
									<NewsFeedSingleItem
										project={item}
										type={'following'}
										user={item?.user}
										text={item?.description}
										objectType={'PROJECT'}
										vidoes={item?.project_videos}
										images={item?.project_images}
									/>
								</div>
							);
						})}
					</>
				) : (
					<Label
						value="No Project Found !"
						className="text-lg text-zinc-500 font-semibold"
					/>
				)}
			</div>

			{/* {projects?.length > 0 ? (
				<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:pt-6 pt-6">
					{projects.map((v: any, i: number) => {
						return v?.products?.length > 1 ? (
							<ProjectCarousel
								key={i}
								onClick={() => gotoProjectDetails(v)}
								projects={v?.products}
								projectId={v?.id}
							/>
						) : (
							// TODO:: no actions/notification_count/activities, dislikes icon
							<ProjectPageItem
								key={i}
								item={v}
								goToDetailPage={(item: any) => gotoProjectDetails(item)}
								thumbnailOrVideoHeight={'200px'}
								containerHeight={'233px'}
								toolbarContainerStyle={{
									left: '10%',
								}}
							/>
						);
					})}
				</div>
			) : !loading && projects?.length === 0 ? (
				<Label
					value="No Project Found !"
					className="text-lg text-zinc-500 font-semibold"
				/>
			) : (
				<div className="relative">
					<Loader type="relative" />
				</div>
			)} */}
		</div>
	);
};

export default SharedProjects;
