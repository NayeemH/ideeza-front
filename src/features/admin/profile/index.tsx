import React, { useEffect, useState } from 'react';
import TabProjects from './profile-tab/TabProjects';
import ProfileLeftSide from './ProfileLeftSide';
import ProfileRightSide from './ProfileRightSide';
import { useRouter } from 'next/router';
import Loader from '@atoms/loader';
import { apiService } from '../../../utils/request';

interface IMyProfileProps {}

const MyProfile: React.FC<IMyProfileProps> = () => {
	const router = useRouter();
	//   const {
	//     query: { position },
	//   } = router;

	const position = router.query.position;

	const user_id = Number(router?.query?.id);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState();
	const [notFound, setNotFound] = useState(false);

	const getProfileData = async () => {
		await apiService(
			{
				method: 'get',
				url: `/account/user/${user_id}/`,
				token: true,
			},
			(res: any, error: any) => {
				if (res) {
					const { data } = res;
					setProfile(data);
					setLoading(false);
					return;
				}

				if (error.response && error.response.status === 404) {
					setNotFound(true);
				}

				setLoading(false);
			}
		);
	};

	useEffect(() => {
		if (user_id > 0) {
			getProfileData();
		}
	}, [user_id]);

	return (
		<>
			{/* grid lg:grid-cols-12 ,2xl:col-span-3 lg:col-span-4 lg:col-span-8 2xl:col-span-9 */}
			{/* 2xl:grid-cols-[400px_minmax(1068px,_1fr)] 320px_minmax(640px,_1fr) */}
			{/* md:px-8 lg:px-12 xl:px-14 */}
			<div className=" max-w-full grid xl:grid-cols-[29%_71%] 2xl:grid-cols-[24%_76%]   gap-x-4 2xl:gap-x-[29px]  xl:gap-x-[14px] ">
				{loading ? (
					<Loader type="relative" />
				) : !notFound ? (
					<>
						<div className="bg-white rounded-lg ">
							<ProfileLeftSide
								profile={profile}
								onReload={getProfileData}
							/>
						</div>
						<div className=" bg-white rounded-lg">
							<ProfileRightSide
								selectedTabIndex={Number(position ? position : '0')}
								profile={profile}
								projects={<TabProjects />}
							/>
						</div>
					</>
				) : (
					<p>Not found!</p>
				)}
			</div>
		</>
	);
};

// export default withReducer("UserProjects", reducer)(MyProfile);
export default MyProfile;
