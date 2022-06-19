import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import React from 'react';
import ProjectTableHeader from '@organisms/service-provider/project/ProjectTableHeader';
import GenericTable from '@organisms/generic-table';
import CheckboxAtom from '@atoms/checkbox';
import Dropdown from '@atoms/drop-down';
import { BiDotsVerticalRounded, BiMessageAlt } from 'react-icons/bi';
import { MdOutlineContactMail } from 'react-icons/md';
import { IoSettingsSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';

const ServiceProviderProjects = () => {
	const router = useRouter();
	return (
		<div className="pt-4">
			<Label
				value="Projects"
				classes={{
					root: 'text-primary text-xl xl:text-2xl 2xl:text-3xl tracking-tight font-sans font-bold pb-3',
				}}
			/>
			<div className="w-full bg-white rounded-lg shadow-lg space-y-3">
				<ProjectTableHeader />
				<GenericTable
					rows={[
						{
							id: 1,
							checkbox: <CheckboxAtom />,
							Project: 'simple project man',
							Domain: 'all',
							Assigned_to: 'everyone',
							TimeLine: 'all',
							Task_Status: 'all',
							Notifications: 'all',
							'': (
								<Dropdown
									icons={
										<BiDotsVerticalRounded className="text-3xl text-zinc-600 font-bold cursor-pointer" />
									}
									itemsClasses={{
										root: ' hover:text-primary text-zinc-500',
									}}
									options={[
										{
											value: 'Manage Dispute',
											name: (
												<span className="flex items-end ">
													<BiMessageAlt className="text-primary" />
													<BiMessageAlt className="-ml-4 relative bottom-2 text-primary" />
													<Label
														value="Manage Dispute"
														className="hover:text-primary ml-1"
													/>
												</span>
											),
											func: () =>
												router.push('/service-provider/projects/1/dispute'),
										},
										{
											value: 'Questionnaire',
											name: (
												<span className="flex items-center ">
													<MdOutlineContactMail className="text-primary" />

													<Label
														value="Questionnaire"
														className="hover:text-primary ml-1"
													/>
												</span>
											),
											func: () =>
												router.push(
													'/service-provider/projects/1/questionnaire'
												),
										},
										{
											value: 'Project Settings',
											name: (
												<span className="flex items-center ">
													<IoSettingsSharp className="text-primary" />
													<Label
														value="Project Settings"
														className="hover:text-primary ml-1"
													/>
												</span>
											),
										},
									]}
								/>
							),
						},
						{
							id: 2,
							checkbox: <CheckboxAtom />,
							Project: 'simple project man',
							Domain: 'all',
							Assigned_to: 'everyone',
							TimeLine: 'all',
							Task_Status: 'all',
							Notifications: 'all',
							'': (
								<Dropdown
									icons={
										<BiDotsVerticalRounded className="text-3xl text-zinc-600 font-bold cursor-pointer" />
									}
									itemsClasses={{
										root: ' hover:text-primary text-zinc-500',
									}}
									options={[
										{
											value: 'Manage Dispute',
											name: (
												<span className="flex items-end ">
													<BiMessageAlt className="text-primary" />
													<BiMessageAlt className="-ml-4 relative bottom-2 text-primary" />
													<Label
														value="Manage Dispute"
														className="hover:text-primary ml-1"
													/>
												</span>
											),
											func: () =>
												router.push('/service-provider/projects/1/dispute'),
										},
										{
											value: 'Questionnaire',
											name: (
												<span className="flex items-center ">
													<MdOutlineContactMail className="text-primary" />

													<Label
														value="Questionnaire"
														className="hover:text-primary ml-1"
													/>
												</span>
											),
											func: () =>
												router.push(
													'/service-provider/projects/1/questionnaire'
												),
										},
										{
											value: 'Project Settings',
											name: (
												<span className="flex items-center ">
													<IoSettingsSharp className="text-primary" />
													<Label
														value="Project Settings"
														className="hover:text-primary ml-1"
													/>
												</span>
											),
										},
									]}
								/>
							),
						},
					]}
					rowClicked="/service-provider/projects"
				/>

				<Pagination
					pager={10}
					handlePage={() => {
						('');
					}}
					mainClass="py-6"
				/>
			</div>
		</div>
	);
};

export default ServiceProviderProjects;
