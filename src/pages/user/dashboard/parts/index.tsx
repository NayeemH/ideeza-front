// import SeeAllPrivate from '@features/user/projects/private-projects';

import UserLayout from '@layouts/private/template/user';
import ProjectPage from '@organisms/project-page';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { ApiDataType, apiService } from 'utils/request';

const PrivateProjects = () => {
	const router = useRouter();
	const visibility = router?.query?.visibility;
	// console.log('visibility--------', visibility)
	const [parts, setParts] = useState<any>([]);
	const [loadingParts, setLoadingParts] = useState<boolean>(false);

	useEffect(() => {
		// console.log("00. test============")

		// if (visibility) {
		// console.log("0. test============")

		getMyParts(visibility == 'private' ? 'private' : 'public');
		// }
	}, [visibility]);

	const getMyParts = async (visibility?: string) => {
		setLoadingParts(true);
		// console.log("1. test============")
		const apiData: ApiDataType = {
			method: 'get',
			url: `/component/part/combined/?is_visible=${
				visibility === 'public'
			}&owner=true&page=1&page_size=10`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				// console.log("2. test============")

				let results = res?.data?.results || [];
				if (results?.length > 0) {
					results = results.map((item: any) => {
						return {
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
				setParts(results);
				// console.log('results==========', results)

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

	const gotoPartsDetails = (project: any) => {
		router.push(`parts/${project.id}`);
	};

	return (
		<UserLayout title="Project-details">
			<>
				{/* issue happens when real images are in used */}
				<ProjectPage
					loader={loadingParts}
					loaded={!loadingParts}
					value={`My ${visibility == 'private' ? 'private' : 'public'} parts`}
					projects={parts}
					gotoProjectDetails={gotoPartsDetails}
					type={visibility == 'private' ? 'private' : 'public'}
					seeAllMode={true}
					isSeeAll={false}
					onclickSeeAll={() => {
						('');
					}}
					goto=""
				/>
			</>
		</UserLayout>
	);
};

export default PrivateProjects;
