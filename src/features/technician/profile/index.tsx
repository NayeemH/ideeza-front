import React, { useEffect, useState } from 'react';
import EmptyPlaceHolder from '@organisms/empty-placeholder';
import TabArticalTech from '@organisms/tech-profile-article';
import MyProfileLeftSideTech from '@organisms/tech-profile-left';
import { useAppDispatch, useAppSelector, useDetectSelfUser } from 'app/hooks';
import { getTechnicianProjectAsync } from './reducer';
import { useRouter } from 'next/router';
import Loader from '@atoms/loader';
import { ApiDataType, apiService } from 'utils/request';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { getBlogPost } from 'request/blog';

const Profile = () => {
	const router = useRouter();
	const userId: number = Number(router.query.id);
	const dispatch = useAppDispatch();
	const isSelfUser = useDetectSelfUser(userId);
	const profile = useAppSelector(({ auth }) => auth.userData);
	const [profileData, setProfileData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [notFound, setNotFound] = useState<boolean>(false);

	const { loading: loadingProject, projectData } = useAppSelector(
		({ technicianProject }) => technicianProject
	);

	// console.log('loading, article--------', loading, article)
	const { data: session } = useSession();

	const { data, isSuccess } = useQuery(
		[`core-category`],
		() => getBlogPost(`?user__id=${session?.user.id}&page_size=100`),
		{
			keepPreviousData: true,
			staleTime: Infinity,
		}
	);
	const blogData = isSuccess && data?.data.results;

	useEffect(() => {
		if (profileData?.id) {
			dispatch(getTechnicianProjectAsync(profileData?.id));
		}
	}, [profileData?.id, dispatch]);

	useEffect(() => {
		if (isSelfUser) {
			return setProfileData(profile);
		} else {
			if (userId) getProfileData();
		}
	}, [profile, userId]);

	const getProfileData = async () => {
		setLoading(true);
		const apiData: ApiDataType = {
			method: 'get',
			url: `/account/user/${userId}/`,
			token: true,
		};
		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				const { data } = res;
				if (data.role === 'User') {
					setNotFound(true);
				} else {
					setProfileData(data);
				}
				return setLoading(false);
			}
			if (err.response && err.response.status === 404) {
				setNotFound(true);
			}
			setLoading(false);
		});
	};

	return (
		<div className="grid lg:grid-cols-12 gap-14">
			{loading && <Loader />}
			{notFound ? (
				<p>Not found!</p>
			) : (
				<>
					<div className="bg-white rounded-xl lg:col-span-4">
						<MyProfileLeftSideTech profile={profileData} />
					</div>
					<div className="lg:col-span-8 overflow-y-scroll tech-m-height relative">
						{loadingProject && (
							<Loader
								type="relative"
								isTransparentBg
							/>
						)}
						{!loadingProject && projectData?.results?.length > 0 ? (
							<div className="py-16">
								<EmptyPlaceHolder />
							</div>
						) : (
							<TabArticalTech data={blogData} />
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Profile;
