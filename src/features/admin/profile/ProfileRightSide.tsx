import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineStar, AiOutlineBars, AiOutlineShareAlt } from 'react-icons/ai';
import { IoIosRocket } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { BsBook, BsGearFill, BsPeople } from 'react-icons/bs';
import TabAbout from '@organisms/about-tab-user-profile';
import TabReviews from '@organisms/user-profile-tab-reviews';
import IconLabel from '@molecules/icon-label';
import Label from '@atoms/label';
import TabsMoleculeProfile from '@molecules/tabs-molecule-profile';
import TabArticle from './profile-tab/TabArticle';
import TabActivities from './profile-tab/TabActivities';
import TabFriends from './profile-tab/TabFriends';
import { useAppSelector, useDetectSelfUser } from '../../../app/hooks';
import { checkSelfUser } from '../../../utils/utils';
import { useRouter } from 'next/router';
import UserProfileProjects from '@organisms/user-profile-projects';
import SharedProjects from '@organisms/user-profile-shared-projects';

function ProfileRightSide(props: any) {
	const router = useRouter();
	const [index, setIndex] = useState<number | undefined>(props.selectedTabIndex);

	const authUserData = useAppSelector((state) => state.auth?.userData);
	// const userProjects = useAppSelector((state) => state?.projects);
	const user_id = Number(router.query.id);
	const visitor_is_a_friend = !checkSelfUser(authUserData?.id, user_id);
	const isSelfUser = useDetectSelfUser(user_id);

	const { tabBody, profile, isFreelancerProfile } = props;

	/* const getMyProjects = async () => {
    const apiData: ApiDataType = {
      method: "get",
      url: `project/?user__id=${user_id}&${!isSelfUser ? "is_visible=true&" : ""
        }ordering=created_at&page=1&page_size=10`,
      token: true,
    };

    await apiService(apiData, (res: any, err: any) => {
      if (res) {
        setProjects(res?.data?.results);
      }
    });
  }; */

	/* const getMyPrivateProjects = async () => {
    const apiData: ApiDataType = {
      method: "get",
      url: `project/my-project/?is_visible=false&ordering=created_at&page=1&page_size=10`,
      token: true,
    };

    await apiService(apiData, (res: any, err: any) => {
      if (res) {
        setProjects(res?.data?.results);
      }
    });
  }; */

	const userTabs = () => {
		let tabs: any = [
			{
				name: (
					<>
						<div className="flex items-center">
							<div>
								<AiOutlineUser className="text-sm" />
							</div>
							<div className="tab-text   ">About</div>
						</div>
					</>
				),
				textColor: 'text-primary',
				component: (
					<div className={` px-4 pt-8 w-2/3 xl:w-1/2  ${tabBody}`}>
						<TabAbout profile={profile} />
					</div>
				),
			},
		];

		if (!visitor_is_a_friend) {
			tabs.push({
				name: (
					<>
						<div className="flex items-center">
							<div>
								<AiOutlineShareAlt className="text-sm lg:text-base 2xl:text-md 3xl:text-lg" />
							</div>
							<div className="tab-text ">Shared Projects</div>
						</div>
					</>
				),
				component: (
					<div className={`xl:pl-8 2.5xl:pl-0 pt-10 pb-4 ${tabBody}`}>
						{/* {props.sharedProjects} */}
						<SharedProjects />
					</div>
				),
			});
		}

		tabs = tabs.concat([
			{
				name: (
					<>
						<div className="flex items-center ">
							<div>
								<AiOutlineStar className="text-sm" />
							</div>
							<div className="tab-text">Reviews</div>
						</div>
					</>
				),
				component: (
					<div className={` pt-8 ${tabBody}`}>
						<TabReviews />
					</div>
				),
			},
			{
				name: (
					<>
						<div className="flex items-center ">
							<div>
								<BsBook className="text-sm" />
							</div>
							<div className="tab-text ">Blog</div>
						</div>
					</>
				),
				component: (
					<div className={`sm:px-4 2xl:px-0 pt-0 ${tabBody}`}>
						<TabArticle />
					</div>
				),
			},
		]);

		if (!visitor_is_a_friend) {
			tabs.push({
				name: (
					<>
						<div className="flex items-center ">
							<div>
								<AiOutlineBars className="text-sm" />
							</div>
							<div className="tab-text">Activities</div>
						</div>
					</>
				),
				component: (
					<div className={`xl:pl-8 pt-12 ${tabBody}`}>
						<TabActivities />
					</div>
				),
			});
		}

		tabs.push({
			name: (
				<>
					<div className="flex items-center ">
						<div>
							<BsPeople className="text-sm" />
						</div>
						<div className="tab-text   ">Friends</div>
					</div>
				</>
			),
			component: (
				<div className={`lg:px-4 2xl:px-0 ${tabBody}`}>
					<TabFriends />
				</div>
			),
		});

		return tabs;
	};

	const getTabs = () => {
		const tabs = userTabs();
		tabs.splice(1, 0, {
			name: (
				<>
					<div className="flex items-center ">
						<div>
							<IoIosRocket className="text-sm" />
						</div>
						<div className="tab-text ">Projects</div>
					</div>
				</>
			),
			component: (
				<div className={`pt-[30px] sm:px-4 2xl:px-0 ${tabBody}`}>
					<UserProfileProjects isSelfUser={isSelfUser} />
				</div>
			),
		});

		return props.tabs || tabs;
	};

	const handleChange = (event: any, newValue: any) => {
		setIndex(newValue);
	};

	return (
		<>
			<div className="bg-right font-proxima-nova">
				<div className="h-72 p-2 md:p-8 md:px-10">
					{profile?.address && (
						<div className="flex items-center justify-between md:mb-4">
							<div className="flex items-center">
								<IconLabel
									tooltipProps={{ open: false }}
									labelValue={profile?.address}
									iconContanerClass="text-2xl"
									mainClass="flex items-center mr-3 "
									lableClass={{
										root: 'text-white text-sm 2xl:text-base uppercase tracking-tight ml-1 ',
									}}
									iconComponent={<IoLocationOutline className="text-white" />}
								/>
								<div className="text-white text-sm 2xl:text-base uppercase tracking-tight ml-1 ">
									{new Date().toLocaleTimeString()}
								</div>
							</div>
							<div className="">
								<BsGearFill className="text-2xl text-white  cursor-pointer" />
							</div>
						</div>
					)}
					{(profile?.first_name || profile?.last_name) && (
						<Label
							value={`${profile?.first_name} ${profile?.last_name}`}
							className="text-white md:text-2xl xl:text-3xl 2xl:text-5xl font-bold pt-1 pb-2 "
						/>
					)}
					{/* {profile?.about_me && (
            <Label
              value={
                profile?.about_me?.length > 30
                  ? profile?.about_me?.slice(0, 30)
                  : profile?.about_me
              }
              className="text-white  font-semibold underline text-lg 2xl:text-2xl"
            />
          )} */}
				</div>
			</div>

			{(visitor_is_a_friend && profile?.is_visible) || isSelfUser ? (
				<TabsMoleculeProfile
					index={index}
					handleChange={handleChange}
					tabClasses="max-width-for-tabs min-w-0 bg-white tab-padding cus-border-bottom pb-[17px] text-[#333333] whitespace-nowrap focus:text-primary tracking-tight font-proxima-nova"
					tabsClasses="w-full cus-border-bottom-tabs"
					// selected="text-primary"
					tabsData={isFreelancerProfile ? userTabs() : getTabs()}
				/>
			) : (
				<div className="flex items-center flex-col md:w-8/12 w-11/12 mx-auto pb-8">
					<img
						src="/images/private.svg"
						alt=""
						className="w-full"
					/>
					<Label
						value="This Profile under private mode"
						className="md:text-4xl text-3xl font-bold text-center md:px-10 py-4 text-gray-700 "
					/>
				</div>
			)}
		</>
	);
}

ProfileRightSide.defaultProps = {
	tabBar: 'flex items-center text-gray-700',
	tabContent: 'pl-1 text-base 2xl:text-xl text-gray-700',
	tabBody: ' ',
	selectedTabIndex: 0,
};
export default ProfileRightSide;
