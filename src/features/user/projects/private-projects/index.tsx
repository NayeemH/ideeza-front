import ProjectPage from '@organisms/project-page';
// import { getBearerToken } from 'app/hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ApiDataType, apiService } from 'utils/request';

function SeeAllPrivate(): JSX.Element {
	const router = useRouter();
	// const token = getBearerToken();

	const [myProjects, setMyProjects] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		getMyProjects();
	}, []);

	const getMyProjects = async () => {
		const apiData: ApiDataType = {
			method: 'get',
			url: `project/my-project/?is_visible=false`,
			token: true,
		};

		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				const results = res?.data?.results;
				setMyProjects(results?.length > 0 ? results : []);

				setLoading(false);
				setLoaded(true);
				return;
			}
			if (err) {
				alert(err);
			}

			setLoading(false);
			setLoaded(true);
		});
	};

	const gotoProjectDetails = (project: any) => {
		router.push(`/user/dashboard/project/${project?.id}`);
	};

	const gotoProductDetails = (project: any) => {
		router.push(
			`/user/dashboard/project/${project.id}/product/${project.id}?project_id=${project.id}`
		);
	};

	return (
		<>
			<ProjectPage
				onclickSeeAll={() => false}
				loader={loading}
				loaded={loaded}
				showAll={true}
				value="My private projects"
				projects={myProjects}
				gotoProjectDetails={gotoProjectDetails}
				gotoProductDetails={gotoProductDetails}
				type={'private'}
				isSeeAll={false}
				seeAllMode={true}
				goto=""
			/>
		</>
	);
}

export default SeeAllPrivate;
