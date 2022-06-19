// import ProjectPageContributed from '@organisms/project-contributed-page';
import ProjectPage from '@organisms/project-page';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ApiDataType, apiService } from 'utils/request';
import Loader from '@atoms/loader';
import { PART_COMPONENT_TYPE } from 'enums/common';

const ProjectHome = (): JSX.Element => {
	const router = useRouter();
	const activeTabRoute = router?.query?.active;

	//const [myProjects, setMyProjects] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(true);
	const [loadingProjects, setLoadingProjects] = useState<boolean>(false);
	const [loadingParts, setLoadingParts] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<string>('projects');
	const [publicProjects, setPublicProjects] = useState<any>([]);
	const [privateProjects, setPrivateProjects] = useState<any>([]);
	const [privateParts, setPrivateParts] = useState<any>([]);
	const [publicParts, setPublicParts] = useState<any>([]);
	const [contributedProjects, setContributedProjects] = useState<any>([]);
	const [initRender, setInitRender] = useState<boolean>(true);

	useEffect(() => {
		if (initRender) {
			if (activeTabRoute && (activeTabRoute == 'projects' || activeTabRoute == 'parts')) {
				setActiveTab(activeTabRoute);
			}

			if (activeTabRoute == 'parts') fetchInitialPartData();
			else fetchInitialProjectData();
		}
		setInitRender(false);
	}, [activeTabRoute]);

	const fetchInitialProjectData = async () => {
		setLoading(true);
		await getMyProjects('public');
		await getMyProjects('private');
		await getMyProjectsContributed();
		setLoading(false);
	};
	const fetchInitialPartData = async () => {
		setLoading(true);
		await getMyParts('public');
		await getMyParts('private');
		setLoading(false);
	};

	const getMyProjects = async (type: 'public' | 'private') => {
		setLoadingProjects(true);
		const apiData: ApiDataType = {
			method: 'get',
			url: `project/my-project/?is_visible=${
				type === 'public'
			}&ordering=-created_at&page=1&page_size=3`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				if (type === 'public') {
					setPublicProjects(res?.data?.results);
				} else if (type === 'private') {
					setPrivateProjects(res?.data?.results);
				}

				setTimeout(() => {
					setLoadingProjects(false);
				}, 3000);
				return;
			}

			setTimeout(() => {
				setLoadingProjects(false);
			}, 3000);
		});
	};

	const getMyProjectsContributed = async () => {
		setLoadingProjects(true);
		const apiData: ApiDataType = {
			method: 'get',
			url: `project/my-project/?user_project=contributed&ordering=-created_at&page=1&page_size=3`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				// console.log('contributedProjects------', res);

				setContributedProjects(res?.data?.results);

				setTimeout(() => {
					setLoadingProjects(false);
				}, 3000);
				return;
			}

			setTimeout(() => {
				setLoadingProjects(false);
			}, 3000);
		});
	};

	const getMyParts = async (type?: 'public' | 'private') => {
		setLoadingParts(true);
		const apiData: ApiDataType = {
			method: 'get',
			url: `/component/part/combined/?is_visible=${
				type === 'public'
			}&owner=true&page=1&page_size=3`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				let results = res?.data?.results || [];
				if (results?.length > 0) {
					results = results.map((item: any) => {
						return {
							block_type: item?.block_type,
							category: item?.category,
							comments_count: item?.comments_count,
							contract_address: item?.contract_address,
							contribute_score: item?.contribute_score,
							created_at: item?.created_at,
							description: item?.description,
							dislikes: item?.dislikes,
							file_attachments: item?.file_attachments,
							id: item?.id,
							ipfs_link: item?.ipfs_link,
							is_verified: item?.is_verified,
							is_visible: item?.is_visible,
							likes: item?.likes,
							name: item?.name,
							on_sale: item?.on_sale,
							project_images: [
								{
									image: item?.image_svg,
									is_default: true,
								},
							],
							project_videos: [
								{
									video: item?.simulation_video,
									is_default: true,
									video_type: 'VIDEO',
								},
							],
							views: item?.views,
						};
					});
				}
				if (type === 'public') {
					setPublicParts(results);
				} else if (type === 'private') {
					setPrivateParts(results);
				}

				setTimeout(() => {
					setLoadingParts(false);
				}, 3000);
				return;
			}

			setTimeout(() => {
				setLoadingParts(false);
			}, 3000);
		});
	};

	const onclickSeeAll = (projectType: any) => {
		router.push(`/user/dashboard/projects/${projectType}-projects`);
	};
	const partOnclickSeeAll = (visibilty: 'public' | 'private' | 'contributed') => {
		router.push(`/user/dashboard/parts?visibilty=${visibilty}`);
	};

	const gotoProjectDetails = (project: any) => {
		router.push(`project/${project.id || project}`);
	};
	const gotoPartsDetails = (part: any) => {
		router.push(`parts/${part.id}?type=${PART_COMPONENT_TYPE[part?.block_type]}`);
	};

	const gotoProductDetails = (project: any) => {
		if (project.products.length > 0) {
			const product = project.products[0];

			router.push(
				`${router.pathname}/project-details/products/${product.id}?project_id=${project.id}`
			);
		}
	};

	const removeRouterParams = () => {
		router.replace('/user/dashboard/projects', undefined, { shallow: true });
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="lg:mt-0 font-proxima-nova">
					<div className="w-full flex justify-center ">
						<span
							onClick={() => {
								if (activeTab === 'projects') return;
								if (activeTabRoute) removeRouterParams();
								setActiveTab('projects');
								getMyProjects('public');
								getMyProjects('private');
								getMyProjectsContributed();
							}}
							className={`${
								activeTab === 'projects'
									? ' text-[#333333] bg-white'
									: ' bg-[#F1F1F1] text-[#9A9A9A]'
							}   text-[24px] cursor-pointer  border-[#CBCBCB] font-semibold rounded-tl-2xl px-4 2xl:px-[60px] 2xl:py-[13px] py-2 border-r-2 border-r-[#707070]`}
						>
							Projects
						</span>
						<span
							onClick={() => {
								if (activeTab === 'parts') return;
								if (activeTabRoute) removeRouterParams();
								setActiveTab('parts');
								getMyParts('public');
								getMyParts('private');
							}}
							className={`${
								activeTab === 'parts'
									? ' text-[#333333] bg-white'
									: ' bg-[#F1F1F1] text-[#9A9A9A]'
							}   text-[24px] cursor-pointer border-[#CBCBCB] font-semibold rounded-tr-2xl px-4 2xl:px-[60px] 2xl:py-[13px] py-2  `}
						>
							Parts/Component
						</span>
					</div>
					{activeTab === 'projects' ? (
						<>
							{loadingProjects ? (
								<div className="relative min-h-[600px]">
									<Loader
										type="relative"
										transparentBg="bg-white/80"
										isTransparentBg
									/>
								</div>
							) : (
								<>
									<div>
										<ProjectPage
											value="My private projects"
											projects={privateProjects}
											gotoProjectDetails={gotoProjectDetails}
											gotoProductDetails={gotoProductDetails}
											type={'private'}
											isSeeAll={privateProjects?.length >= 3}
											onclickSeeAll={onclickSeeAll}
											goto={'private'}
											numberOfProjectToShow={3}
										/>

										{/* issue happens when real images are in used */}
										<ProjectPage
											value="My public projects"
											projects={publicProjects}
											gotoProjectDetails={gotoProjectDetails}
											gotoProductDetails={gotoProductDetails}
											type={'public'}
											isSeeAll={publicProjects?.length >= 3}
											onclickSeeAll={onclickSeeAll}
											goto={'public'}
											numberOfProjectToShow={3}
										/>
										<ProjectPage
											value="Projects I contribute to"
											projects={contributedProjects}
											gotoProjectDetails={gotoProjectDetails}
											gotoProductDetails={gotoProductDetails}
											type={'contributed'}
											isSeeAll={contributedProjects?.length > 0}
											onclickSeeAll={onclickSeeAll}
											goto={'contributed'}
											numberOfProjectToShow={3}
										/>
									</div>

									{/* TODO:: Cotribute need separate component */}
									{/* <ProjectPageContributed
										value="Projects I contribute to"
										projects={contributedProjects}
										gotoProjectDetails={gotoProjectDetails}
										gotoProductDetails={gotoProductDetails}
										type={'contributed'}
										isSeeAll={contributedProjects?.length > 0}
										onclickSeeAll={onclickSeeAll}
										goto={'contributed'}
									/> */}
								</>
							)}
						</>
					) : (
						<>
							{loadingParts ? (
								<div className="relative min-h-[600px]">
									<Loader
										type="relative"
										transparentBg="bg-white/80"
										isTransparentBg
									/>
								</div>
							) : (
								<>
									<ProjectPage
										value="My private parts"
										projects={privateParts}
										gotoProjectDetails={gotoPartsDetails}
										type={'private'}
										isSeeAll={privateParts?.length >= 3}
										onclickSeeAll={() => partOnclickSeeAll('private')}
										goto={'private'}
										numberOfProjectToShow={3}
									/>

									{/* issue happens when real images are in used */}
									<ProjectPage
										value="My public parts"
										projects={publicParts}
										gotoProjectDetails={gotoPartsDetails}
										type={'public'}
										isSeeAll={publicParts?.length >= 3}
										onclickSeeAll={() => partOnclickSeeAll('public')}
										goto={'public'}
										numberOfProjectToShow={3}
									/>
								</>
							)}
						</>
					)}
				</div>
			)}
		</>
	);
};

export default ProjectHome;
