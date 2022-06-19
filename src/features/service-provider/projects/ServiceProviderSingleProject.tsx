import Button from '@atoms/button';
import Date from '@atoms/date';
import Dropdown from '@atoms/drop-down';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import FinishedTask from '@organisms/finished-task';
import GenericTable from '@organisms/generic-table';
import PatentQuestionnaire from '@organisms/patent-questionnaire-popup';
import TaskDescription from '@organisms/service-provider/project/TaskDescription';
import TechnicianProjectDescription from '@organisms/technician-project-description';
import TimeLineView from '@organisms/time-line';
import TrademarkQuestionnaire from '@organisms/trademark-questionnaire-popup';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlinePlus } from 'react-icons/ai';
import { BiDotsVerticalRounded, BiMessageAlt, BiPencil } from 'react-icons/bi';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdOutlineContactMail } from 'react-icons/md';

const ServiceProviderSingleProject = () => {
	const [open, setOpen] = useState(false);
	const [projectView, setProjectView] = useState('Timeline');
	const [pageShown, setPageShown] = useState('TradeMark Questionnaire');
	const router = useRouter();
	const changeQuestionnaire = () => {
		setPageShown((prev) =>
			prev === 'Patent Questionnaire'
				? 'TradeMark Questionnaire'
				: prev === 'TradeMark Questionnaire'
				? 'Finished Task'
				: 'Task Description'
		);
	};
	const toggleOpen = () => {
		setOpen((prev) => !prev);
		setPageShown('Patent Questionnaire');
	};
	return (
		<>
			<Modal
				width={pageShown === 'Finished Task' ? 'md' : 'xl'}
				close={toggleOpen}
				header={
					<div className=" flex flex-col justify-between pb-2 p-6 pl-0">
						<Label
							value={`${pageShown}: User fill out`}
							className="text-xl md:text-3xl text-primary font-bold"
						/>
						<div className="w-full md:flex justify-between md:text-xl">
							<span className="font-semibold ">Project : iron making</span>
							<span className="text-lg md:text-2xl">
								Task Duration: <span className="text-primary"> 29 Sep - 2 oct</span>{' '}
							</span>
						</div>
					</div>
				}
				content={
					<>
						<div className="w-full bg-primary h-[2px]"></div>
						{pageShown === 'Patent Questionnaire' && <PatentQuestionnaire />}
						{pageShown === 'TradeMark Questionnaire' && <TrademarkQuestionnaire />}
						{pageShown === 'Finished Task' && <FinishedTask />}
						{/* {pageShown === "Task Description" && <TaskDescription />} */}
					</>
				}
				actions={
					<>
						<div
							className={
								pageShown === 'Patent Questionnaire'
									? 'flex  w-full p-4 pl-0 space-x-3 justify-between'
									: 'flex  w-full p-4 pl-0 space-x-3 justify-end'
							}
						>
							{pageShown === 'Patent Questionnaire' && (
								<Label
									value={
										<>
											<span className="font-medium">Shipping address:</span>{' '}
											India, Lorem Ipsum is simply dummy text of the printing
											and 23
										</>
									}
									className="mr-4"
								/>
							)}
							<Button
								onClick={changeQuestionnaire}
								value="Next"
								classes={{
									root: `text-white bg-primary py-3 px-6 leading-5 text-base 2xl:text-xl tracking-tight font-sans capitalize rounded`,
								}}
							/>
						</div>
					</>
				}
				open={open && pageShown !== 'Task Description'}
			/>
			<Modal
				width="md"
				close={toggleOpen}
				header={
					<div className=" flex flex-col justify-between pb-2 p-6 pl-0">
						<Label
							value="Add Task Name..."
							className="text-xl md:text-3xl text-primary font-bold"
						/>
					</div>
				}
				content={
					<>
						<div className="w-full bg-primary h-[2px] mt-4 mb-2"></div>

						{pageShown === 'Task Description' && <TaskDescription />}
					</>
				}
				actions={
					<>
						<div className="flex  w-full p-4 pl-0 space-x-3 justify-end">
							<Button
								onClick={() => setPageShown('')}
								value="Complete"
								classes={{
									root: `text-white bg-primary py-3 px-6 leading-5 text-base 2xl:text-xl tracking-tight font-sans capitalize rounded`,
								}}
							/>
							<Button
								onClick={() => setPageShown('')}
								value="Cancel"
								classes={{
									root: `text-zinc-800 bg-white px-6 `,
								}}
								variant="outlined"
							/>
						</div>
					</>
				}
				open={pageShown === 'Task Description'}
			/>
			<div className="md:flex justify-between">
				<div className="md:flex items-center">
					<Label
						value="Project: Metal Making"
						className="text-2xl md:text-3xl text-primary font-bold"
					/>
					<Label
						value="Edit"
						className="text-gray-400 font-bold ml-1 md:ml-2 pt-2"
					/>
					<BiPencil className=" ml-1" />
				</div>
				<div className="md:flex items-center">
					<Button
						value="Open 3D"
						className="bg-primary text-white text-sm md:text-lg mr-2 md:px-6"
						onClick={toggleOpen}
					/>
					<Button
						value="Complete Project"
						className="bg-primary text-white text-sm md:text-lg mr-2 md:px-6"
						onClick={toggleOpen}
					/>
					<Button
						value={
							<>
								<AiOutlineArrowLeft className="bg-white text-sm md:text-lg rounded-full text-gray-600 md:mr-1 " />
								<span className="text-sm md:text-lg">Back</span>
							</>
						}
						onClick={() => Router.back()}
						className="bg-gray-400 text-sm md:text-lg text-white md:px-6 custom-back-btn"
					/>
					<Dropdown
						icons={
							<BiDotsVerticalRounded className="text-3xl text-primary font-bold cursor-pointer" />
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
								func: () => router.push('/service-provider/projects/1/dispute'),
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
									router.push('/service-provider/projects/1/questionnaire'),
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
				</div>
			</div>
			<div className="w-full h-[2px] md:h-1 my-2 bg-primary"></div>
			<div className="md:flex justify-between ">
				<div className="">
					<div className="text-base md:text-xl md:flex md:mb-8">
						<Label
							value="Status: "
							className=""
						/>
						<Label
							value="Active"
							className="text-primary ml-1 mr-5"
						/>
						<Label
							value="Shipping address: India, Lorem Ipsum is simply dummy text of the printing and 23"
							className="mr-4"
						/>
					</div>
					<div className=" flex ">
						<Label
							value="Price: $210"
							className="text-base md:text-xl"
						/>
						<Label
							value="invoice"
							className="md:ml-10 ml-2 text-primary underline underline-offset-1"
						/>
					</div>
				</div>

				<Label
					value="Project Duration: 29 Sep -16 Oct"
					className="text-lg md:text-2xl"
				/>
				<div className="w-16 md:-mt-4">
					<Date />
				</div>
			</div>
			<TechnicianProjectDescription />
			<div className="w-full flex flex-row-reverse justify-start">
				<Button
					value="Timeline"
					className={
						(projectView === 'Timeline'
							? 'bg-primary text-white'
							: 'bg-white text-zinc-600') + '  px-4 py-2 font-semibold'
					}
					onClick={() => setProjectView('Timeline')}
					color="primary"
					variant="outlined"
				/>
				<Button
					value="List"
					className={
						(projectView === 'List'
							? 'bg-primary text-white'
							: 'bg-white text-zinc-600') + '  px-8 py-2 font-semibold'
					}
					onClick={() => setProjectView('List')}
					color="primary"
					variant="outlined"
				/>
			</div>
			<div className="my-5">
				{projectView === 'Timeline' ? (
					<TimeLineView />
				) : (
					<GenericTable tableHeaderClass="header-gradient rounded-t-lg" />
					// <Table
					//   tableHeader="header-gradient rounded-t-lg"
					//   theader={[
					//     "checkbox",
					//     "Project",
					//     "Domain",
					//     "Assigned to",
					//     "Timeline",
					//     "Task status",
					//     "notifications ",
					//   ]}
					//   tbody={[
					//     "checkbox",
					//     "Make iron from steal: first phase ",
					//     "domain",
					//     "avater",
					//     "timeline",
					//     "Completed",
					//     "notification",
					//     "dotIcon",
					//   ]}
					// />
				)}
			</div>
			<Button
				value={
					<>
						Add new task <AiOutlinePlus className="text-white font-extrabold ml-1" />
					</>
				}
				className="bg-[#441184] text-white text-lg font-semibold"
				onClick={() => setPageShown('Task Description')}
				variant="outlined"
			/>
		</>
	);
};

export default ServiceProviderSingleProject;
