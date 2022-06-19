import React, { useState, useEffect } from 'react';
import Last_Inovation from '@molecules/last-innovation';
import Label from '@atoms/label';
import DashboardPopup from '@organisms/dashboard-popup';
import DashboardImgCard from '@molecules/dashboard-img-card';
import Dashboard2 from '@organisms/dashboard-2';
import { useAppSelector } from 'app/hooks';
import { useDispatch } from 'react-redux';
import {
	// getActivitiessAsync,
	getBlogsAsync,
	getProjectsAsync,
} from '@features/user/reducer';
import ProjectCarouselContent from '@organisms/project-small-carousel';
// import Loader from "@atoms/loader";
import LabelFields from '@molecules/label-field';
import DashboardActivity from '@organisms/activites';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { IProject } from '@models/projects';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
// import CreateNewIdeezaProject from "@organisms/create-new-idezza-project";
// import CreateProjectInput from "@molecules/create-project-input";
import { STATUS } from 'react-joyride';
import { IoIosArrowDown } from 'react-icons/io';
import { apiService } from '../../../../utils/request';

const JoyRideNoSSR = dynamic(() => import('react-joyride'), { ssr: false });

const OPTIONS = [
	{ value: '-views', name: 'Most viewed' },
	{ value: '-likes', name: 'Most liked' },
	// { value: "-dislikes", name: "Most disliked" },
	{ value: '-created_at', name: 'Most recent' },
];

function Dashboard({
	open,
	mySelf,
	handler,
	loader,
	toggleOpen,
	toggleMySelftProject,
	toggleIdeezaProject,
	ideeza,
	state,
	user,
	push,
	loading,
}: any) {
	const dispatch = useDispatch();
	const authUserData = useAppSelector((state) => state.auth?.userData);
	const numberOfItemsToShow = 6;
	const [params] = useState(`page_size=${numberOfItemsToShow}`);
	const router = useRouter();
	const [sortBy, setSortBy] = useState<string>('-views');
	const [lodingSortedData, setLoadingSortedData] = useState(false);
	const { topProjects, latestArticles } = useAppSelector(({ dashboard }) => dashboard);
	const [activities, setActivities] = useState<any[]>([]);
	const [showJoyRide, setShowJoyRide] = useState(false);
	// const [search, setSearch] = useState('');
	const [selectedBlog, setSelectedBlog] = useState<string | number | undefined>();

	// const handleSubmition = (e: any) => {
	// 	if (e.key === 'Enter') {
	// 		//   dispatch(searchProject(search));
	// 		router.push(`/user/dashboard/search-result?query=${search}`);
	// 		close();
	// 	}
	// };

	const getActivities = () => {
		apiService(
			{
				method: 'get',
				url: `account/user/${authUserData?.id}/recent-activities/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;

					setActivities(data);
					return;
				}
			}
		);
	};

	// const onChangeSearch = (e: any) => {
	// 	e.preventDefault();
	// 	setSearch(e.target.value);
	// };
	const userData = useAppSelector(({ auth }) => auth?.userData);
	// TODO: When is_visible and status query will be Added in '/blog' get API, remove latestArticles filter logic from bellow line
	const articles = latestArticles?.results?.length ? latestArticles?.results : [];
	const projects = topProjects?.results?.length ? topProjects?.results : [];

	const totalArticleCount = latestArticles?.count || 0;
	const totalProjectCount = topProjects?.count || 0;
	const { status } = useSession();

	// console.log('home', loading);
	// console.log('home', projects);

	useEffect(() => {
		dispatch(getProjectsAsync(`ordering=${sortBy}&page_size=${numberOfItemsToShow}`));
		setLoadingSortedData(false);
	}, [sortBy]);
	useEffect(() => {
		if (status === 'authenticated') {
			dispatch(getBlogsAsync(params));
		}
	}, [status]);
	const handleJoyRideApprove = () => {
		typeof window !== 'undefined' &&
			localStorage.setItem('joy_ride', JSON.stringify({ show_joy_ride: true }));
	};
	useEffect(() => {
		const joyRide =
			typeof window !== 'undefined' && localStorage?.getItem('joy_ride')
				? JSON.parse(localStorage?.getItem('joy_ride') || '')
				: null;
		joyRide?.show_joy_ride ? setShowJoyRide(false) : setShowJoyRide(true);
	}, [status]);

	useEffect(() => {
		if (authUserData?.id) {
			getActivities();
		}
	}, [authUserData]);
	// console.log(userData);

	return (
		<>
			{showJoyRide && (
				<JoyRideNoSSR
					callback={({ status }) => {
						if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
							typeof window !== 'undefined' &&
								localStorage.setItem(
									'joy_ride',
									JSON.stringify({ show_joy_ride: true })
								);
						}
					}}
					steps={[
						{
							target: '.first-step',
							content: 'Press next to create your first project',
							disableBeacon: true,
						},
						// {
						//   target: ".second-step",
						//   content: (
						//     <CreateProjectInput
						//       defaultValue={search}
						//       onChange={onChangeSearch}
						//       handleSearchProject={handleSubmition}
						//       handleJoyRideApprove={handleJoyRideApprove}
						//     />
						//   ),
						//   disableBeacon: true,
						// },
						{
							target: '.third-step',
							content: 'Here is your projects',
							disableBeacon: true,
						},
						{
							target: '.fourth-step',
							content: 'Here is your contacts',
							disableBeacon: true,
						},
						{
							target: '.fifth-step',
							content: 'Your score',
							disableBeacon: true,
						},
					]}
					floaterProps={{ placement: 'bottom' }}
					disableOverlayClose
					// stepIndex={0}
					continuous
					showProgress
					showSkipButton
					run={true}
				/>
			)}

			<DashboardPopup
				open={open}
				mySelf={mySelf}
				ideeza={ideeza}
				handler={handler}
				loader={loader}
				toggleOpen={toggleOpen}
				toggleMySelftProject={toggleMySelftProject}
				toggleIdeezaProject={toggleIdeezaProject}
				state={state}
				history={push}
				handleJoyRideApprove={handleJoyRideApprove}
			/>

			<div className="space-y-5 ">
				{/* <button id="first-step">Click me</button> */}
				<Label
					value={
						typeof user?.first_name !== 'undefined' &&
						typeof user?.last_name !== 'undefined'
							? `Good Morning, ${user?.first_name} ${user?.last_name}`
							: ``
					}
					classes={{
						root: 'text-primary text-xl xl:text-3xl 2xl:text-[32px] font-bold mb-0 tracking-normal ',
					}}
				/>
				<div className="lg:grid lg:grid-cols-2 md:gap-6 gap-4 pt-[6px] ">
					<DashboardImgCard onClick={toggleIdeezaProject} />

					<div className="pt-4 lg:pt-0">
						<Dashboard2
							contact={userData?.friends_count ?? 0}
							score={userData?.score ?? 0}
							projects={userData?.projects_count ?? 0}
							badge={userData?.badge ?? 'N/A'}
							id={userData?.id}
						/>

						<DashboardActivity
							activities={activities}

							// badge={userData?.badge ?? "N/A"}
						/>
					</div>
				</div>
				<div className="md:grid md:grid-cols-12 md:gap-6 gap-4 pt-4">
					<div className="md:col-span-4 2xl:col-span-6">
						<div className=" pt-[3px]">
							<LabelFields
								mainClass=" pb-[15px] xl:pb-[16px] 2xl:pb-[20px] border-b border-[#E6E6E6] mb-[20px]"
								value="World's last innovation"
								labelseeall={
									totalArticleCount > numberOfItemsToShow ? 'See all' : ''
								}
								labelClasses="text-xl xl:text-2xl 2xl:text-[26px] font-semibold text-[#333333]"
								selectdivclass="hidden"
								buttonclasses="hidden"
								handleClick={() => router.push('/blog')}
							/>
						</div>
						<div className=" gap-3 xl:gap-4 2xl:gap-6 xl:mt-7 max-h-[50vh] pr-2 xl:pr-[30px] overflow-y-auto grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2 relative">
							{loading ? (
								<div className="w-full min-h-[200px]">
									{/* <Loader type="relative" /> */}
									<Label
										value="Loading..."
										className="text-xl w-full justify-center"
									/>
								</div>
							) : articles.length !== 0 ? (
								<>
									{articles?.map((v, k) => {
										return (
											<Last_Inovation
												key={k}
												imageSrc={
													v?.image
														? // ? `http://api.ideeza.com/${v?.image}`
														  v?.image
														: '/images/placeholder.jpg'
												}
												userName={`${v?.user?.first_name} ${v?.user?.last_name}`}
												id={v?.id}
												selectedBlog={selectedBlog}
												setSelectedBlog={setSelectedBlog}
												postDate={
													format(
														new Date(
															v?.created_at
																? v?.created_at
																: '12.02.2021'
														),
														'MM.dd.yyyy'
													) ?? '12.02.2021'
												}
												postTitle={v?.title || ' '}
												postDescription={v?.description} //descriptionText || "No description found"
												comments={v?.comments_count || 0}
												buttonValue={'Read More'}
											/>
										);
									})}
								</>
							) : (
								<Label
									value="No articles found"
									className="text-xl text-gray-700 font-semibold"
								/>
							)}
						</div>
					</div>
					<div className="pt-5 md:pt-0 md:col-span-8 2xl:col-span-6">
						<div className=" mb-[20px] pb-[10px] xl:pb-[16px] 2xl:pb-[12px] border-b text-center border-[#E6E6E6] flex sm:flex-row flex-col items-center md:items-start sm:justify-between px-[10px] lg:px-0">
							<h1>
								<span className="font-semibold text-xl xl:text-2xl 2xl:text-[26px] text-[#333333]">
									Top Projects
								</span>
								<Link href="/user/dashboard/top-projects">
									<a className="text-primary underline text-base 2xl:text-xl ml-3 cursor-pointer ">
										{totalProjectCount > numberOfItemsToShow ? 'See all' : ''}
									</a>
								</Link>
							</h1>
							{/* <div>
                <Link href="/">
                  <a className="text-primary underline text-base 2xl:text-xl cursor-pointer md:hidden ">
                    See all
                  </a>
                </Link>
              </div> */}
							{projects && projects?.length > 0 && (
								<div className=" flex items-center justify-center mt-1 md:mt-0">
									<span className="ml-[17px] md:ml-0 text-gray-600">Sort by</span>
									<div className="relative">
										<IoIosArrowDown className="absolute right-[1px] md:right-[6px] 2xl:right-[10px] top-[10px] 2xl:top-[14px]" />
										<select
											className=" pl-[15px] pr-[25px] 2xl:pr-[35px] 2xl:py-[9px] py-[5px] border border-[#707070] rounded bg-white ml-2  text-base text-[#333333] focus:outline-none focus:border-primary appearance-none"
											onChange={(e) => {
												setLoadingSortedData(true);
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
						</div>

						<div className="gap-4 2xl:gap-6 max-h-[50vh] xl:mt-7 pr-2 md:pr-[30px] overflow-y-auto grid sm:grid-cols-2 relative">
							{loading || !topProjects ? (
								// <div className="h-6 ">
								<div className="w-full min-h-[400px]">
									<Label
										value="Loading..."
										className="text-xl w-full justify-center"
									/>
									{/* <Loader type="relative" isTransparentBg={true} /> */}
								</div>
							) : projects?.length !== 0 ? (
								// <Loader type="relative" />
								projects?.map((project: IProject) => {
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
													root: 'font-extrabold ml-[4px] 2xl:ml-0 mr-1 text-sm lg:text-md  text-gray-300',
												}}
												// projectId={project?.id}
												data={project}
												projectData={project}
												carouselHeight="pb-3 relative"
												titleClass="text-lg"
												nameClass="text-md "
												avatarClass="w-8 h-8"
												topIconContainer="hidden"
												bottomIconContainer="flex absolute bottom-[24px] right-[50px] md:right-0 lg:right-[10px] 2xl:right-[10px] 2.5xl:right-[40px] 3xl:right-[50px] max-w-full rounded-full project-icon-bg-custom justify-around pl-[9px] pr-[13px] pt-[5px] pb-[6px]"
												handleProjectClick={() =>
													router.push(
														`/user/dashboard/project/${project?.id}`
													)
												}
												// ImageHeight="h-[320px]"
												// gotoProductDetails={gotoProductDetails}
												projectNameClasses="text-base 2xl:text-xl font-bold truncate text-ellipsis"
												productThreeDView={true}
												threeDScript={project?.three_d_script}
												threeDHeight={250}
												initialVideoFor={'project'}
											/>
										</div>
									);
								})
							) : !loading ? (
								<Label
									value="No projects found"
									className="text-xl text-gray-700 font-semibold"
								/>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Dashboard;

// {
// 	projects?.length === 0 && (
// 		<>
// 			<div className="w-full min-h-[400px]">
// 				<Label
// 					value="Loading..."
// 					className="text-xl w-full justify-center"
// 				/>
// 				{/* <Loader type="relative" isTransparentBg={true} /> */}
// 			</div>
// 			<Label
// 				value="No projects found"
// 				className="text-xl text-gray-700 font-semibold"
// 			/>
// 		</>
// 	);
// }

// {articles && articles?.length === 0 && (
// 	<Label
// 		value="No articles found"
// 		className="text-xl text-gray-700 font-semibold"
// 	/>
// )}
