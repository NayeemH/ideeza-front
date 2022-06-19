import React, { useEffect, useState } from 'react';
import Label from '@atoms/label';
// import ProjectCarousel from '@molecules/project-carousel';
import ProjectPageItem from '@organisms/project-page/item';
import { useRouter } from 'next/router';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';
import EmptyPlaceHolder from '@organisms/empty-placeholder';
import { ApiDataType, apiService } from '../../../utils/request';
import Loader from '@molecules/loader';
import { IoIosArrowDown } from 'react-icons/io';

const UserProfileProjects = ({ isSelfUser }: any) => {
	const router = useRouter();
	const user_id = Number(router.query.id);

	const [activeProjectType, setActiveProjectType] = useState('public');
	const [userProjectType, setUserProjectType] = useState<'owner' | 'contributed'>('owner');
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);

	const getProjects = async () => {
		setLoading(true);

		const apiData: ApiDataType = {
			method: 'get',
			url: `/project/my-project/?user__id=${user_id}&is_visible=${
				activeProjectType === 'public'
			}${
				isSelfUser ? `&user_project=${userProjectType}` : ''
			}&ordering=created_at&page=1&page_size=10`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				setLoading(false);
				setProjects(res?.data?.results);
			}
		});
	};

	const handleProjectTypeChanger = (projectType: string) => {
		setActiveProjectType(projectType);
	};

	const gotoProjectDetails = (project: any) => {
		router.push({
			pathname: `/user/dashboard/project/${project.id}`,
		});
	};

	useEffect(() => {
		getProjects();
	}, [activeProjectType, userProjectType]);

	return (
		<div className="font-proxima-nova">
			{isSelfUser && (
				<div className="w-full flex justify-between">
					<div className="relative">
						<IoIosArrowDown className="absolute text-[#999999] right-[10px] xl:right-[12px] top-[8px] xl:top-[16px]" />
						<select
							className="w-[90%] md:w-[315px] pl-4 focus:outline-none border border-[#E6E6E6] rounded-md py-4 pr-2 text-[#999999] text-md xl:text-lg appearance-none"
							name="Type"
							id=""
							onChange={(e: any) => {
								setUserProjectType(e.target.value);
							}}
						>
							<option
								className="py-1"
								value="owner"
							>
								Owner
							</option>
							<option
								className="py-1"
								value="contributed"
							>
								Contributor
							</option>
						</select>
					</div>

					<div className="flex">
						{projects?.length > 0 && (
							<>
								<div
									className={`${
										activeProjectType === 'public'
											? 'text-primary '
											: ' text-[#333333] '
									}  flex items-center mr-7 cursor-pointer`}
									onClick={() => handleProjectTypeChanger('public')}
								>
									<AiFillUnlock className="text-xl mr-1" />
									<Label
										value="Public"
										className={`${
											activeProjectType === 'public'
												? 'text-primary '
												: ' text-[#333333] '
										}  text-base xl:text-xl`}
									/>
								</div>

								{isSelfUser && (
									<div
										className={`${
											activeProjectType === 'private'
												? 'text-primary '
												: ' text-[#333333] '
										}  flex items-center cursor-pointer`}
										onClick={() => handleProjectTypeChanger('private')}
									>
										<AiFillLock className="text-xl mr-1" />
										<Label
											value="Private"
											className={`${
												activeProjectType === 'private'
													? 'text-primary '
													: ' text-[#333333] '
											}  text-base xl:text-xl`}
										/>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			)}

			{loading && (
				<div className={'pt-20 pb-20'}>
					<Loader />
				</div>
			)}

			{!loading && projects?.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 2.5xl:grid-cols-3 gap-3 md:pt-6 pt-6">
					{projects.map((v: any, i: number) => {
						return v?.products?.length > 1 ? (
							<ProjectPageItem
								key={i}
								item={v?.products[0]}
								goToDetailPage={(item: any) => gotoProjectDetails(item)}
								thumbnailOrVideoHeight={'200px'}
								containerHeight={'233px'}
								iconsContainerClasses="min-w-[204px] absolute right-[20px] xl:bottom-[60px] 2.5xl:bottom-[50px] bottom-[20px] z-50 cursor-text bg-gradient-to-r from-[#FA00C5] to-[#550F8A] text-white rounded-2xl px-2 lg:px-4 py-1 flex justify-between"
								// toolbarContainerStyle={{
								// 	left: '10%',
								// }}
							/>
						) : (
							// <ProjectCarousel
							// 	key={i}
							// 	onClick={() => gotoProjectDetails(v)}
							// 	projects={v?.products}
							// 	projectId={v?.id}
							// />
							// TODO:: no actions/notification_count/activities, dislikes icon
							<ProjectPageItem
								key={i}
								item={v}
								goToDetailPage={(item: any) => gotoProjectDetails(item)}
								thumbnailOrVideoHeight={'200px'}
								containerHeight={'233px'}
								iconsContainerClasses="min-w-[204px] absolute right-[20px] z-50 cursor-text xl:bottom-[60px] 2.5xl:bottom-[50px] bottom-[20px] bg-gradient-to-r from-[#FA00C5] to-[#550F8A] text-white rounded-2xl px-2 lg:px-4 py-1 flex justify-between"
								// toolbarContainerStyle={{
								// 	left: '10%',
								// }}
							/>
						);
					})}
				</div>
			) : !loading ? (
				<EmptyPlaceHolder />
			) : null}
		</div>
	);
};

export default UserProfileProjects;
