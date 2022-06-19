import Button from '@atoms/button';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import PatentQuestionnaire from '@organisms/patent-questionnaire-popup';
import TechnicianProjectDescription from '@organisms/technician-project-description';
import TrademarkQuestionnaire from '@organisms/trademark-questionnaire-popup';
import React, { useState } from 'react';
import Router from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import FinishedTask from '@organisms/finished-task';
import TimeLine from '@organisms/time-line';
import GenericTable from '@organisms/generic-table';
import EditableInput from '@molecules/editable-input';
import { RiPencilFill } from 'react-icons/ri';
import ProjectDurationPicker from '@organisms/project-duration-picker';
import { ImCheckmark } from 'react-icons/im';
import { useAppSelector } from 'app/hooks';
import DescriptionHeader from '@molecules/description-header';

const ProjectDetails = () => {
	const [open, setOpen] = useState(false);
	// const [projectDuration, setProjectDuration] = useState<any>();
	const [projectNameEdit, setProjectNameEdit] = useState(false);
	// const [projectName, setProjectName] = useState("");
	const [title, setTitle] = useState('Default Project Title');
	const [projectView, setProjectView] = useState('Timeline');
	const [pageShown, setPageShown] = useState('Patent Questionnaire');
	const projectData = useAppSelector((state) => state.projects.project.detail);
	// const isSelfUser = useDetectSelfUser(projectData?.user?.id);
	const isSelfUser = true;
	const editComponet = projectNameEdit ? (
		<ImCheckmark className="cursor-pointer" />
	) : (
		<RiPencilFill className="cursor-pointer" />
	);
	const changeQuestionnaire = () => {
		setPageShown((prev) =>
			prev === 'Patent Questionnaire' ? 'TradeMark Questionnaire' : 'Finished Task'
		);
	};
	const toggleOpen = () => {
		setOpen((prev) => !prev);
		setPageShown('Patent Questionnaire');
	};
	// const editProjectName = async (name: any) => {
	//   try {
	//     const user_id = projectData?.user?.id;

	//     if (checkSelfUser(authUserData?.id, user_id)) {
	//       await apiService(
	//         {
	//           method: "patch",
	//           url: `/project/${projectData?.id}/`,
	//           data: { name },
	//           token: true,
	//         },
	//         (res: any) => {
	//           if (res) {
	//             getProjectData();
	//             setProjectNameEdit(false);
	//             toast.dismiss();
	//             toast.success("Saved successfully!");
	//             return;
	//           }
	//         }
	//       );
	//     } else {
	//       toast.error("You can not edit this project!");
	//     }
	//   } catch (error) {
	//     // console.log(error);
	//   }
	// };

	return (
		<>
			<Modal
				width={pageShown === 'Finished Task' ? 'md' : 'xl'}
				close={toggleOpen}
				header={
					pageShown !== 'Finished Task' ? (
						<>
							<div className=" flex flex-col justify-between pb-2 p-6 pl-0">
								<Label
									value={`${pageShown}: User fill out`}
									className="text-3xl text-primary font-bold mb-3"
								/>
								<div className="w-full flex justify-between text-xl">
									<span className="font-semibold ">Project : iron making</span>
									<span className="flex justify-end items-center text-2xl">
										Task Duration: <ProjectDurationPicker />
										{/* <span className="text-primary"> 29 Sep - 2 oct</span>{" "} */}
									</span>
								</div>
							</div>
							<div className="w-full bg-primary h-[2px]"></div>
						</>
					) : (
						<></>
					)
				}
				content={
					<>
						{pageShown === 'Patent Questionnaire' && <PatentQuestionnaire />}
						{pageShown === 'TradeMark Questionnaire' && <TrademarkQuestionnaire />}
						{pageShown === 'Finished Task' && <FinishedTask />}
					</>
				}
				actions={
					<>
						<div className="flex justify-end w-full p-4 pl-0 space-x-3">
							<Button
								onClick={changeQuestionnaire}
								value="Complete task"
								classes={{
									root: `text-white bg-primary py-3 px-6 leading-5 text-base 2xl:text-xl tracking-tight font-sans capitalize rounded`,
								}}
								color="primary"
							/>
						</div>
					</>
				}
				open={open}
			/>
			<div className="flex justify-between flex-wrap">
				<div className="md:flex items-center">
					{isSelfUser ? (
						<EditableInput
							headerMainClasses="ml-2 flex items-center"
							headerLabel="Edit"
							mainClass="flex items-center flex-row-reverse "
							// editContanerClass="bg-gray-100 flex items-center justify-center text-2xl rounded-full w-8 h-8"
							editContanerClass="bg-transparent flex items-center justify-center text-2xl rounded-full w-8 h-8"
							edit={projectNameEdit}
							editComponent={isSelfUser ? editComponet : undefined}
							lableClass={{
								root: 'text-primary tracking-tight font-sans text-xl xl:text-2xl 2xl:text-3xl font-bold mr-1',
							}}
							inputClasses={{ root: 'mr-2' }}
							handleChange={() => setProjectNameEdit(!projectNameEdit)}
							setTitle={setTitle}
							labelValue={title}
							onSubmit={(value) => setTitle(value)}
						/>
					) : (
						<div
							className={
								'flex items-center flex-row-reverse bg-transparent justify-center text-2xl rounded-full w-8 h-8'
							}
						>
							{projectData && projectData?.name}
						</div>
					)}
				</div>
				<div className="custom-btn-container">
					<Button
						value="Open 3D"
						className="bg-primary text-white text-sm md:text-lg mr-2 md:px-6"
						onClick={toggleOpen}
						color="primary"
					/>
					<Button
						value="Complete project"
						className="bg-primary text-white text-sm md:text-lg mr-2 md:px-6"
						// onClick={toggleOpen}
						color="primary"
					/>
					<Button
						value={
							<>
								<AiOutlineArrowLeft className="bg-white text-sm md:text-lg rounded-full text-gray-600 md:mr-1 " />
								<span className="text-sm md:text-lg ml-2">Back</span>
							</>
						}
						onClick={() => Router.back()}
						className="bg-gray-400 text-sm md:text-lg text-white md:px-6 custom-back-btn"
						color="secondary"
					/>
				</div>
			</div>
			<div className="w-full h-[2px] md:h-1 my-2 bg-primary"></div>
			<div className=" flex justify-between items-start flex-wrap">
				<div className="text-base md:text-xl flex md:mb-8">
					<Label
						value="Status :"
						className=""
					/>
					<Label
						value="Active"
						className="text-primary ml-1"
					/>
				</div>
				<div className="flex items-center">
					<Label
						value="Project Duration: "
						className="text-base w-[130px] sm:w-[40%] xl:text-lg md:text-2xl"
					/>
					<ProjectDurationPicker />
				</div>
			</div>
			<div className="h-[480px] overflow-y-scroll">
				<TechnicianProjectDescription />
				<div className="w-full flex  flex-row-reverse  ">
					<div className="border border-primary rounded-md mr-2 mt-5 lg:mt-0">
						<Button
							value="Timeline"
							className={
								(projectView === 'Timeline'
									? 'text-white bg-primary hover:bg-primary'
									: 'bg-white text-gray-600') +
								'  px-4 py-2 font-semibold overflow-hidden'
							}
							onClick={() => setProjectView('Timeline')}
							// variant="outlined"
							color="inherit"
						/>
						<Button
							value="List"
							className={
								(projectView === 'List'
									? 'text-white bg-primary hover:bg-primary'
									: 'bg-white text-gray-600') + '  px-8 py-2 font-semibold'
							}
							onClick={() => setProjectView('List')}
							color="inherit"
							// variant="outlined"
						/>
					</div>
				</div>
				<div className="my-5">
					<div className="mb-2">
						<DescriptionHeader value="Task" />
					</div>

					{projectView === 'Timeline' ? (
						<TimeLine />
					) : (
						<GenericTable
							rowClicked="/technician/dashboard/project"
							tableHeaderClass="header-gradient  rounded-t-lg "
							tableHeaderColor="text-white"
						/>
						// <Table
						//   tableHeader="header-gradient  rounded-t-lg"
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
			</div>
		</>
	);
};

export default ProjectDetails;
