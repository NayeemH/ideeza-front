import ProjectPage from '@organisms/project-page';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
// import { useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useRouteMatch } from "react-router-dom";
// import { ProjectPage, ProjectPageContributed } from "orgasms";
// import { withReducer } from "service";
// import { getMyProjects } from "./store/action";
// import reducer from "./store/reducer";

function SeeAllContributed(): JSX.Element {
	const router = useRouter();
	const myContributedProjects = useAppSelector((state) => state.projects.myProjects.contributed);

	// const dispatch = useDispatch();
	// const myPrivateProjects = useAppSelector(
	//   (state) => state?.auth?.userData?.projects?.private
	// );
	// const myPrivateProjects = useSelector(
	//   (state: any) => state?.auth?.userData?.projects?.private
	// );
	// const myPublicProjects = useAppSelector(
	//   (state) => state.auth.userData?.projects?.public
	// );
	// const myContributedProjects = useAppSelector(
	//   (state) => state.auth.userData?.projects?.contributed
	// );
	// console.log("here is my data", myContributedProjects);

	// const myPrivateProjects = useSelector(
	//   (state) => state.UserPrivateProjects.my_projects.data?.private
	// );

	// const myPublicProjects = useSelector(
	//   (state) => state.UserPrivateProjects.my_projects.data?.public
	// );
	// const myContributedProjects = useSelector(
	//   (state) => state.UserPrivateProjects.my_projects.data?.contributed
	// );
	// const myProjectLoading = useSelector(
	//   (state) => state.UserPrivateProjects.my_projects.loading
	// );
	// , project: any
	const gotoProjectDetails = (id: any) => {
		router.push(`${router.pathname}/${id}`);
	};

	const gotoProductDetails = (project: any) => {
		router.push(
			`${router.pathname}/project-details/products/${project.id}?project_id=${project.id}`
		);
	};

	//   useEffect(() => {
	//     dispatch(getMyProjects());
	//     // eslint-disable-next-line react-hooks/exhaustive-deps
	//   }, []);

	return (
		<>
			<ProjectPage
				onclickSeeAll={() => {
					('');
				}}
				loaded={true}
				loader={false}
				showAll={true}
				value="Projects I contribute to"
				projects={myContributedProjects}
				gotoProjectDetails={gotoProjectDetails}
				gotoProductDetails={gotoProductDetails}
				type={'contributed'}
				isSeeAll={false}
				goto=""
				seeAllMode={true}
			/>
		</>
	);
}
//  withReducer("UserPrivateProjects", reducer)
export default SeeAllContributed;
