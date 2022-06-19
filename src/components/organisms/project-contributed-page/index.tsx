import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import ProjectHeader from '@organisms/project-header';
import ImgCard from '@organisms/image-card';
import ProjectCarousel from '@molecules/project-carousel';
import Loader from '@atoms/loader';
import { ProjectPageContributedProps } from 'models/user-project';
import EmptyPlaceHolder from '@organisms/empty-placeholder';

const ProjectPageContributed: React.FC<ProjectPageContributedProps> = (props) => {
	const {
		value,
		loader,
		loaded,
		projects,
		gotoProjectDetails,
		gotoProductDetails,
		isSeeAll,
		goto,
		onclickSeeAll,
		showAll,
	} = props;

	const __projects =
		typeof projects !== 'undefined' && projects !== null
			? showAll
				? projects
				: projects?.slice(0, 3)
			: [];

	return (
		<div className=" mb-8 pb-10">
			<ProjectHeader
				value={value}
				hideSeeAll={projects?.length <= 3 || projects === undefined}
				isSeeAll={isSeeAll}
				goto={goto}
				onclickSeeAll={onclickSeeAll}
				// onclickSeeAll={onclickSeeAll}
			/>

			{loader && !loaded && <Loader />}

			{!loader && loaded && (
				<React.Fragment>
					{__projects.length === 0 ? (
						<EmptyPlaceHolder />
					) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:pt-6 pt-6">
							{__projects?.slice(0, 3).map((v: any, k: any) => {
								return v?.project?.products?.length > 1 ? (
									<ProjectCarousel
										key={k}
										onClick={() => {
											gotoProjectDetails(v?.id, v);
										}}
										projects={v?.project?.products}
										projectId={v?.project?.id}
									/>
								) : (
									// TODO:: no actions/notification_count/activities, dislikes icon
									<div
										onClick={() => {
											if (gotoProductDetails) gotoProductDetails(v.project);
										}}
									>
										<ImgCard
											key={k}
											// carouselHeight="h-72"
											carouselHeight=""
											imgClasses="rounded-xl"
											iconComponent3={
												<img
													src="/images/icon/like_white_icon.png"
													alt="icon"
												/>
											}
											iconComponent2={
												<img
													src="/images/icon/ideeza_icon_white.png"
													alt="icon"
												/>
											}
											iconContanerClass="bg-transparent mr-2"
											iconValue1={v?.project?.views}
											iconValue2={v?.project?.dislikes}
											iconValue3={v?.project?.likes}
											mainIconClass="flex items-center"
											lableClass={{ root: 'sm:text-md  text-xl text-white' }}
											iconComponent1={
												<AiFillEye className="text-white text-2xl" />
											}
											iconsClass="flex sm:justify-end justify-center space-x-5 pr-2"
											// img="/assets/images/car.png"
											imgSrc={
												v?.project?.image
													? v?.project?.image
													: 'images/car.png'
											}
											projectId={v?.project?.id}
											title={v?.project?.name}
										/>
									</div>
								);
							})}
						</div>
					)}
				</React.Fragment>
			)}
		</div>
	);
};

export default ProjectPageContributed;
