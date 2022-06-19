import ProjectPage from '@organisms/project-page';
// import { getBearerToken } from "app/hooks";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ApiDataType, apiService } from 'utils/request';

function SeeAllPublic(): JSX.Element {
	const router = useRouter();

	const [myProjects, setMyProjects] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [loaded, setLoaded] = useState<boolean>(false);

	const getMyProjects = async () => {
		const apiData: ApiDataType = {
			method: 'get',
			url: `project/my-project/?is_visible=true`,
			token: true,
		};
		setLoading(true);

		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				setMyProjects(res?.data?.results);
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
		router.push({
			pathname: `/user/dashboard/project/${project.id}`,
		});
	};

	const gotoProductDetails = (project: any) => {
		if (project.products.length > 0) {
			const product = project.products[0];

			router.push({
				pathname: `/user/dashboard/project/${project.id}/product/${product.id}?project_id=${project.id}`,
			});
		}
	};

	useEffect(() => {
		getMyProjects();
	}, []);

	return (
		<>
			<ProjectPage
				onclickSeeAll={() => {
					('');
				}}
				loader={loading}
				loaded={loaded}
				showAll={true}
				value="My public projects"
				projects={myProjects}
				gotoProjectDetails={gotoProjectDetails}
				gotoProductDetails={gotoProductDetails}
				type={'public'}
				isSeeAll={false}
				seeAllMode={true}
				goto=""
			/>
		</>
	);
}

//  withReducer("UserPrivateProjects", reducer)
export default SeeAllPublic;
