import React, { useEffect, useState } from 'react';
import ProjectHeader from '@organisms/project-header';
import { ProjectPageContributedProps } from 'models/user-project';
import EmptyPlaceHolder from '@organisms/empty-placeholder';
import ProjectPageItem from './item';
import Loader from '@atoms/loader';

const ProjectPage: React.FC<ProjectPageContributedProps> = ({
	value,
	projects,
	gotoProjectDetails,
	isSeeAll,
	seeAllMode,
	goto,
	showAll,
	onclickSeeAll,
	noProjectsBorder,
	numberOfProjectToShow,
	loader,
}) => {
	const [projectList, setProjectList] = useState<any>([]);

	useEffect(() => {
		if (projects && projects?.length > (numberOfProjectToShow || 0)) {
			return setProjectList(showAll ? projects : projects.slice(0, numberOfProjectToShow));
		} else return setProjectList(projects);
	}, [projects]);

	const goToDetailPage = (project: any) => {
		gotoProjectDetails(project);
	};
	// console.log(loader);

	return (
		<div
			className={`${
				noProjectsBorder ? '' : ' border-b border-[#CBCBCB] '
			}  mb-4 2xl:mb-[40px] pb-4 2xl:pb-[40px] px-[15px] 2xl:px-[30px] pt-[20px] rounded-lg 2xl:pt-[70px] bg-[#FFFFFF]`}
		>
			<ProjectHeader
				isSeeAll={isSeeAll}
				hideSeeAll={projects?.length <= 3 || projects === undefined}
				value={value}
				goto={goto}
				onclickSeeAll={onclickSeeAll}
				showBackButton={seeAllMode}
			/>
			{loader ? (
				<div className="w-full h-screen relative">
					<Loader
						type="relative"
						isTransparentBg
					/>
				</div>
			) : (
				<>
					{!loader && projectList?.length === 0 ? (
						<EmptyPlaceHolder />
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-5 lg:pt-[40px] 2xl:pt-[82px] pt-4">
							{projectList?.map((v: any, i: number) => {
								return v?.products?.length > 1 ? (
									<ProjectPageItem
										key={i}
										item={v}
										goToDetailPage={(item: any) => goToDetailPage(item)}
									/>
								) : (
									// TODO:: no actions/notification_count/activities, dislikes icon
									<ProjectPageItem
										key={i}
										item={v}
										goToDetailPage={(item: any) => goToDetailPage(item)}
									/>
								);
							})}
						</div>
					)}
				</>
			)}
		</div>
	);
};

ProjectPage.defaultProps = {
	numberOfProjectToShow: 3,
};

export default ProjectPage;
