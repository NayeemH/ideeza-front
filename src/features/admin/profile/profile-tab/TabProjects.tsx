import Tab from '@atoms/tab';
import TabPanel from '@atoms/tab-panel';
import Tabs from '@atoms/tabs';
import { AppBar } from '@mui/material';
import TabPrivate from '@organisms/tab-project/TabPrivate';
import TabPublic from '@organisms/tab-project/TabPublic';
import { useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { checkSelfUser } from '../../../../utils/utils';
import { apiService } from '../../../../utils/request';

function TabProjects() {
	const router = useRouter();
	const authUserData = useAppSelector((state) => state.auth?.userData);
	const user_id: number = Number(router.query.id);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [projects, setProjects] = useState<{ public: any[]; private: any[] }>({
		public: [],
		private: [],
	});

	const getProjectList = async () => {
		let url = '';

		if (checkSelfUser(authUserData?.id, user_id)) {
			url = `/project/my-project/`;
			console.log('MY FRIENDS');
		} else {
			url = `/project/?user__id=${user_id}`;
			console.log('OPPONENT FRIENDS');
		}

		await apiService(
			{
				method: 'get',
				url,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;

					setProjects(data);
					setLoading(false);
					return;
				}

				setLoading(false);
			}
		);
	};

	useEffect(() => {
		getProjectList();
	}, []);

	const getProjectTabs = () => {
		return [
			{
				name: (
					<>
						<div className="flex items-center">
							<div>
								<AiFillUnlock className="text-2xl" />
							</div>
							<div className="text-base 2xl:text-xl1 font-sans ml-1 font-semibold">
								Public
							</div>
						</div>
					</>
				),
				component: (
					<div className={`xl:pl-8 pt-8 p-5`}>
						<TabPublic
							data={projects?.public ?? {}}
							loader={loading}
						/>
					</div>
				),
			},

			{
				name: (
					<>
						<div className="flex items-center">
							<div>
								<AiFillLock className="text-2xl" />
							</div>
							<div className="text-base 2xl:text-xl1 font-sans ml-1 font-semibold">
								Private
							</div>
						</div>
					</>
				),
				component: (
					<div className={`xl:pl-8 pt-10 py-5`}>
						{projects && <TabPrivate data={projects?.private ?? {}} />}
					</div>
				),
			},
		];
	};

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setIndex(newValue);
	};

	return (
		<div className={`w-full`}>
			<AppBar
				className="bg-transparent"
				position="static"
				color="transparent"
				elevation={0}
			>
				<Tabs
					variant="fullWidth"
					value={index}
					onChange={handleChange}
					aria-label="simple tabs example"
				>
					{getProjectTabs().map((value, key) => {
						return (
							<Tab
								key={key}
								classes={{
									root: ` outline-none w-full`, //${tabClasses}
									selected: ` text-current tx-primary-color custom-border-color cus-border-bottom-none border-solid border-t-2 border-l-2 border-r-2 border-b-0`, //${selected}
								}}
								label={value.name}
								{...a11yProps(key)}
							/>
						);
					})}
				</Tabs>
			</AppBar>
			{getProjectTabs().map((value, key: number) => {
				return (
					<TabPanel
						value={index}
						key={key}
						index={key}
					>
						{value.component}
					</TabPanel>
				);
			})}
		</div>
	);
}

TabProjects.defaultProps = {
	selectedTabIndex: 0,
};

export default TabProjects;

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
