import TabActivities from '@features/user/profile/profile-tab/TabActivities';
import TabArticle from '@features/user/profile/profile-tab/TabArticle';
import ProfileLeftSide from '@features/user/profile/ProfileLeftSide';
import ProfileRightSide from '@features/user/profile/ProfileRightSide';
import TabAbout from '@organisms/about-tab-user-profile';
import Agents from '@organisms/service-provider/profile/agents/Agents';
import MachinesProcessMetarial from '@organisms/service-provider/profile/MachinesProcessMetarial';
import ServiceCertificateAdditionalInfo from '@organisms/service-provider/profile/ServiceCertificateAdditionalInfo';
import TabReviews from '@organisms/user-profile-tab-reviews';

import { useAppSelector } from 'app/hooks';
import React from 'react';
import { AiOutlineBars, AiOutlineShareAlt, AiOutlineStar, AiOutlineUser } from 'react-icons/ai';
import { BsBook, BsPeople } from 'react-icons/bs';

const ServiceProviderProfile = () => {
	// here should be the service provider's profile
	const profile = useAppSelector(({ auth }) => auth?.userData);

	return (
		<>
			<div className="grid lg:grid-cols-12 gap-6">
				<div className="bg-white rounded-lg 2xl:col-span-3 lg:col-span-4">
					<ProfileLeftSide profile={profile} />
				</div>
				<div className="lg:col-span-8 2xl:col-span-9 bg-white rounded-lg">
					<ProfileRightSide
						tabs={[
							{
								name: (
									<>
										<div className="flex items-center">
											<div>
												<AiOutlineUser className="text-2xl" />
											</div>
											<div className="text-base 2xl:text-xl1 font-sans ml-1 font-semibold">
												About
											</div>
										</div>
									</>
								),
								textColor: 'text-primary',
								component: (
									<div className={`xl:pl-8 pt-8 `}>
										<TabAbout profile={profile} />
									</div>
								),
							},
							{
								name: (
									<>
										<div className="flex items-center">
											<div>
												<AiOutlineShareAlt className="text-2xl" />
											</div>
											<div className="text-base 2xl:text-xl1 font-sans ml-1 font-semibold">
												Machines, Process & Material
											</div>
										</div>
									</>
								),
								textColor: 'text-primary',
								component: (
									<div className={`xl:pl-8 pt-8 `}>
										{/* <TabAbout profile={profile} /> */}
										<MachinesProcessMetarial />
									</div>
								),
							},
							{
								name: (
									<>
										<div className="flex items-center">
											<div>
												<AiOutlineShareAlt className="text-2xl" />
											</div>
											<div className="text-base 2xl:text-xl1 font-sans ml-1 font-semibold">
												Services & certifications & Additional info
											</div>
										</div>
									</>
								),
								textColor: 'text-primary',
								component: (
									<div className={`xl:pl-8 pt-8 `}>
										<ServiceCertificateAdditionalInfo />
									</div>
								),
							},

							{
								name: (
									<>
										<div className="flex items-center ">
											<div>
												<AiOutlineStar className="text-2xl" />
											</div>
											<div className="text-base 2xl:text-xl1 font-sans ml-1 font-semibold">
												Reviews
											</div>
										</div>
									</>
								),
								component: (
									<div className={`xl:pl-8 pt-8 `}>
										<TabReviews />
									</div>
								),
							},
							{
								name: (
									<>
										<div className="flex items-center ">
											<div>
												<BsBook className="text-2xl" />
											</div>
											<div className="text-base 2xl:text-xl1 font-sans ml-1 font-semibold">
												Articles
											</div>
										</div>
									</>
								),
								component: (
									<div className={`xl:pl-8 pt-0`}>
										<TabArticle />
									</div>
								),
							},
							{
								name: (
									<>
										<div className="flex items-center ">
											<div>
												<AiOutlineBars className="text-2xl" />
											</div>
											<div className="text-base 2xl:text-xl1 font-sans ml-1 font-semibold">
												Activities
											</div>
										</div>
									</>
								),
								component: (
									<div className={`xl:pl-8 pt-12 `}>
										<TabActivities />
									</div>
								),
							},
							{
								name: (
									<>
										<div className="flex items-center ">
											<div>
												<BsPeople className="text-2xl" />
											</div>
											<div className="text-base 2xl:text-xl1 font-sans ml-1 font-semibold">
												Agents
											</div>
										</div>
									</>
								),
								component: (
									<div className={`xl:pl-8 pt-12 `}>
										<Agents />
									</div>
								),
							},
						]}
						profile={profile}
					/>
				</div>
			</div>
		</>
	);
};

export default ServiceProviderProfile;
