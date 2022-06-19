import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'app/hooks';
import Dashboard from './dashboard/home';
import { useDispatch } from 'react-redux';
import { toggleIdezzaModal, togglemodel, toggleMySelfModel } from './reducer';
import { getProjects } from './request';
import { useRouter } from 'next/router';

const UserHome = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [user, setUser] = useState<any>(null);
	const [dashboard, setDashboard] = useState<any>(null);
	const [project, setProject] = useState(false);
	const [mySelf, setMySelf] = useState(false);
	const [ideeza, setIdeeza] = useState(false);
	const [mySelfLoading, setMySelfLoader] = useState(false);
	const [loading, setLoading] = useState(false);
	const projectModel = useAppSelector(({ dashboard }) => dashboard?.project?.model);
	const mySelfModel = useAppSelector(({ dashboard }) => dashboard?.project?.self?.model);
	const ideezaModel = useAppSelector(({ dashboard }) => dashboard?.project?.ideeza?.modal);
	const mySelfLoader = useAppSelector(({ dashboard }) => dashboard?.project?.self?.loading);
	const User = useAppSelector((state) => state?.auth?.userData);
	const dashData = useAppSelector(({ dashboard }) => dashboard);
	// console.log(dashData);

	const push = () => router.push('/technician/dashboard/new-project');
	const toggleProjectModel = (e: any) => {
		e.preventDefault();
		return dispatch(togglemodel(e));
	};
	const handler = (e: any) => {
		return dispatch(getProjects(e));
	};
	const toggleMySelfProject = (e: any) => dispatch(toggleMySelfModel(e));
	const toggleIdeezaProject = () => dispatch(toggleIdezzaModal());

	useEffect(() => {
		if (dashData) {
			setDashboard(dashData);
		}
	}, [dashData]);
	useEffect(() => {
		setLoading(dashData.loading);
	}, [dashData.loading]);
	useEffect(() => {
		setProject(projectModel);
	}, [projectModel]);

	useEffect(() => {
		setMySelfLoader(mySelfLoader);
	}, [mySelfLoader]);
	useEffect(() => {
		setMySelf(mySelfModel);
	}, [mySelfModel]);
	useEffect(() => {
		setIdeeza(ideezaModel);
	}, [ideezaModel]);
	useEffect(() => {
		if (typeof User !== 'undefined') {
			setUser(User);
		}
	}, [User]);
	return (
		<Dashboard
			loading={loading}
			push={push}
			open={project}
			mySelf={mySelf}
			ideeza={ideeza}
			handler={handler}
			loader={mySelfLoading}
			toggleOpen={toggleProjectModel}
			toggleMySelftProject={toggleMySelfProject}
			toggleIdeezaProject={toggleIdeezaProject}
			state={dashboard}
			user={user}
		/>
	);
};

export default UserHome;
