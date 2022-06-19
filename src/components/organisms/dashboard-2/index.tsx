import React from 'react';
import DashboardCard from '@molecules/dashboard-card';
// import { Router } from "next/router";
// import Button from "@atoms/button";
import { useRouter } from 'next/router';

function Dashboard2({ id, contact, score, projects, badge }: any) {
	const router = useRouter();
	// const handleWebCollaboration = () => {
	//   //   dispatch(previewData({ ...preview, attachment, category }));
	//   router.push("/web-collaboration");
	// };
	return (
		<>
			<div className="md:grid md:grid-cols-12 2xl:flex 2xl:justify-between 2xl:items-end gap-x-6 gap-y-4 md:gap-y-0 hidden">
				<DashboardCard
					className="2xl:w-[28%] cursor-pointer lg:col-span-6 sm:col-span-4 third-step"
					value={projects}
					text="Projects"
					iconSet={
						<div className="bg-[#FFE8FA] p-[15px] rounded-[5px] mr-2 ">
							<img
								src="/images/icon/user-projects.svg"
								className="md:w-[40px] md:h-[40px] w-4 "
								alt="image"
							/>
						</div>
					}
					handleClick={() => router.push('/user/dashboard/projects')}
				/>
				<DashboardCard
					className="2xl:w-[28%] cursor-pointer lg:col-span-6  mt-4 sm:mt-0 sm:col-span-4 fourth-step"
					value={contact}
					text="Contacts"
					iconSet={
						<div className="bg-[#FFE8FA] p-[15px] rounded-[5px] mr-2 ">
							<img
								src="/images/icon/user-person.svg"
								className="md:w-[40px] md:h-[40px] w-4"
								alt="image"
							/>
						</div>
					}
					handleClick={() => router.push(`/user/profile/${id}?position=6`)}
				/>
				<DashboardCard
					className="2xl:w-[44%] cursor-pointer lg:mt-8 2xl:mt-0 lg:col-span-8 mt-4 sm:mt-0 lg:col-start-3 sm:col-span-4 fifth-step"
					value={score}
					text="My score"
					iconSet={
						<div className="bg-[#FFE8FA] p-[15px] rounded-[5px] mr-2 ">
							<img
								src="/images/icon/radio-btn.svg"
								className="md:w-[40px] md:h-[40px] w-4"
								alt="image"
							/>
						</div>
					}
					badge={badge}
					isBadge={true}
				/>
				{/* <Button
            value={badge}
            size="large"
            className="capitalize text-white bg-primary font-medium py-1 md:py-2 md:px-7 tracking-tighter text-sm"
            onClick={handleWebCollaboration}
          /> */}
			</div>
			<div className="grid grid-cols-12 gap-4 md:hidden">
				<div className="sm:col-span-6 col-span-12">
					<DashboardCard
						className="2xl:w-[28%] cursor-pointer lg:col-span-6 sm:col-span-4 third-step"
						value={projects}
						text="Projects"
						iconSet={
							<div className="bg-[#FFE8FA] p-[15px] rounded-[5px] mr-2 ">
								<img
									src="/images/icon/user-projects.svg"
									className="md:w-[40px] md:h-[40px] w-4 "
									alt="image"
								/>
							</div>
						}
						handleClick={() => router.push('/user/dashboard/projects')}
					/>
				</div>

				<div className="sm:col-span-6 col-span-12">
					<DashboardCard
						className="2xl:w-[28%] cursor-pointer lg:col-span-6  mt-4 sm:mt-0 sm:col-span-4 fourth-step"
						value={contact}
						text="Contacts"
						iconSet={
							<div className="bg-[#FFE8FA] p-[15px] rounded-[5px] mr-2 ">
								<img
									src="/images/icon/user-person.svg"
									className="md:w-[40px] md:h-[40px] w-4"
									alt="image"
								/>
							</div>
						}
						handleClick={() => router.push(`/user/profile/${id}?position=6`)}
					/>
				</div>

				<div className="sm:col-start-4 sm:col-span-6 col-span-12">
					<DashboardCard
						className="2xl:w-[44%] cursor-pointer lg:mt-8 2xl:mt-0 lg:col-span-8 mt-4 sm:mt-0 lg:col-start-3 sm:col-span-4 fifth-step"
						value={score}
						text="My score"
						iconSet={
							<div className="bg-[#FFE8FA] p-[15px] rounded-[5px] mr-2 ">
								<img
									src="/images/icon/radio-btn.svg"
									className="md:w-[40px] md:h-[40px] w-4"
									alt="image"
								/>
							</div>
						}
						badge={badge}
						isBadge={true}
					/>
				</div>

				{/* <Button
            value={badge}
            size="large"
            className="capitalize text-white bg-primary font-medium py-1 md:py-2 md:px-7 tracking-tighter text-sm"
            onClick={handleWebCollaboration}
          /> */}
			</div>
		</>
	);
}

export default Dashboard2;
