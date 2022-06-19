import Label from '@atoms/label';
import DueDate from '@molecules/due-date';
// import { Grid } from "@mui/material";
import { getBearerToken, useAppDispatch, useAppSelector } from 'app/hooks';
import { INote } from 'models/notes';
import React, { useEffect, useState } from 'react';
// import { useSession } from "next-auth/react";
import { greeting, timeComp } from 'utils/utils';
import { FORMINPUT } from 'utils/styles';
import Analytics from './analytics';
import NotesList from './notes';
import { RiFolderUnknowLine } from 'react-icons/ri';
import TaskDashboardTable from '@organisms/technician-dashboard-table';
import Calendar from '@atoms/date-picker';
import { ITaskItem } from 'models/tasks';
import { apiService } from '../../../utils/request';
import { getNote } from '@features/technician/notes/request';
import { toast } from 'react-toastify';
import EmptyPlaceHolder from '@organisms/empty-placeholder';
import Loader from '@atoms/loader';
import Pagination from '@molecules/pagination';
import Modal from '@atoms/modal';
import Button from '@atoms/button';
import { Popover } from '@mui/material';
import SimpleToolTip from '@atoms/simple-tooltip';

// import { RiFolderUnknowLine } from "react-icons/ri";

export type ITableData = {
	id?: number;
	title?: string;
	domain?: string | 'electronic' | 'code' | 'cover';
	date?: JSX.Element;
	status?: string | 'active' | 'inactive';
	timeOver?: boolean;
};

export default function Dashboard() {
	const [tableData, setTableData] = useState<ITableData[]>();
	const userData = useAppSelector((state) => state?.auth?.userData);
	const [editNotes, setEditNotes] = useState(false);
	//const taskList = useAppSelector(({ task }) => task?.taskList?.results);
	const [taskList, setTaskList] = useState<any>(null);
	const [loadingNotes, setLoadingNotes] = useState<boolean>(false);
	const [notes, setNotes] = useState<any>([]);
	const [updatedId, setUpdatedId] = useState<number>();
	const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
	const [notesTitle, setNotesTitle] = useState('');
	const [notesDescription, setNotesDescription] = useState('');
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	// const userId = useAppSelector((state) => state?.auth?.userData?.id);
	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	const fetchTasks = async () => {
		await apiService(
			{
				method: 'get',
				url: `manufacturing/assigned-task/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					setTaskList(data.results);
					return;
				}
			}
		);
	};

	const getNotes = async () => {
		setLoadingNotes(true);
		await apiService(
			{
				method: 'get',
				url: `/note/?user__id=${userData?.id}`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					setNotes(data.results);
					setLoadingNotes(false);
					return;
				}

				setLoadingNotes(false);
			}
		);
	};

	const handleDeleteNote = async (id: any) => {
		await apiService(
			{
				method: 'delete',
				url: `/note/${id}/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					getNotes();
					toast.dismiss();
					toast.success('Deleted successfully!');
					return;
				}
			}
		);
	};
	const editNotesHandler = (id: number) => {
		const note = notes.find((n: any) => n.id === id);
		setUpdatedId(note.id);
		setNotesTitle(note?.title);
		setNotesDescription(note?.description);
		setEditNotes(true);
	};
	const handleUpdateNotes = async () => {
		await apiService(
			{
				method: 'patch',
				url: `/note/${updatedId}/`,
				token: true,
				data: { title: notesTitle, description: notesDescription },
			},
			(res: any) => {
				if (res) {
					getNotes();
					toast.dismiss();
					toast.success('Modified successfully!');
					return;
				}
			}
		);
		// console.log(notesTitle);
		// console.log(notesDescription);
	};

	useEffect(() => {
		fetchTasks();
		getNotes();
	}, [userData]);

	useEffect(() => {
		if (taskList) {
			const dataList = taskList?.map((item: ITaskItem) => {
				const data = {
					id: item?.id,
					title: item?.title,
					domain: item?.line_of_business?.lob_type?.toLowerCase(),
					date: (
						<DueDate
							startDate={item?.created_at}
							endDate={item?.end_datetime ?? new Date()}
						/>
					),
					status: item?.status,
					timeOver: timeComp(item?.end_datetime),
				};

				return data;
			});
			setTableData(dataList);
		}
	}, [taskList]);
	// console.log(notes);

	return (
		<div className="">
			<Analytics
				greeting={greeting(userData?.first_name ?? '')}
				messages={{ title: 'Messages', count: userData?.messages_count }}
				articles={{ title: 'Articles', count: userData?.blogs_count }}
				tasks={{ title: 'Open Tasks', count: userData?.open_tasks_count }}
				score={{ title: 'My Score', count: userData?.score }}
			/>
			{/* <Grid container spacing={2}> */}
			<div className="grid grid-cols-12 gap-4">
				{/* <Grid item xs={12} md={9}> */}
				<div className="lg:col-span-6 xl:col-span-8 2xl:col-span-9 sm:col-span-12 col-span-12">
					<Label
						value="Task Management"
						classes={{
							root: `text-primary font-sans font-bold text-xl md:text-2xl py-3 md:pb-8`,
						}}
					/>
					<div className="rounded-md shadow-lg bg-white">
						<div className="lg:-mx-0.5">
							<div className="">
								{tableData && tableData.length > 0 ? (
									<>
										<TaskDashboardTable
											// loading={loading}
											data={tableData}
										></TaskDashboardTable>

										<Pagination
											mainClass="py-7"
											handlePage={() => {
												('');
											}}
											pager={{ count: 1, page: 1 }}
										/>
									</>
								) : (
									<div className="p-16 text-center text-gray-200 flex flex-col items-center">
										<RiFolderUnknowLine size="60" />
										<h2 className="text-lg">No data found!</h2>
									</div>
								)}

								{/* {tableData.length > 0 && (
                  <Pagination
                    mainClass="py-7"
                    handlePage={handlePage}
                    pager={{ count: 1, page: 1 }}
                  />
                )} */}
							</div>
						</div>
					</div>
				</div>
				{/* <Grid item xs={12} md={3}> */}
				<div className="lg:col-span-6 xl:col-span-4 2xl:col-span-3 col-span-12 sm:col-span-12 pt-5">
					<div className=" hide-calendar-technician md:mt-14 shadow-full mb-3 rounded bg-white overflow-x-auto">
						<Calendar />
					</div>
					{/*  */}
					<div className="">
						<Label
							value="3rd march"
							classes={{
								root: ` hide-calendar-technician text-white font-bold  bg-primary rounded text-center text-base w-full py-2`,
							}}
						/>
						<SimpleToolTip title="Calendar">
							<Label
								value="3rd march"
								classes={{
									root: ` show-popup-calendar text-white font-bold  bg-primary rounded text-center text-base w-full py-2`,
								}}
								onClick={handleClick}
							/>
						</SimpleToolTip>

						<Popover
							open={open}
							// handleClick={handleClick}
							onClose={handleClose}
							id={id}
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
							className="popover-container"
						>
							<div className="py-2 w-auto shadow-lg ">
								<Calendar />
							</div>
						</Popover>
						<Modal
							width="xs"
							close={() => setEditNotes(false)}
							open={editNotes}
							header={
								<Label
									value="Edit Your Note"
									className="text-xl text-gray-600 mb-5 font-semibold"
								/>
							}
							content={
								<>
									<Label
										value="Title"
										className="text-md text-gray-400 mb-2"
									/>
									<input
										type="text"
										className={FORMINPUT + ' mb-2'}
										value={notesTitle}
										onChange={(e?: any) => setNotesTitle(e.target.value)}
									/>
									<Label
										value="Description"
										className="text-md text-gray-400 mb-2"
									/>
									<textarea
										className={FORMINPUT}
										value={notesDescription}
										onChange={(e?: any) => setNotesDescription(e.target.value)}
									/>
								</>
							}
							actions={
								<div className="w-full grid grid-cols-2 gap-8 mt-8">
									<Button
										value="Cancel"
										className="text-gray-400 text-lg bg-white"
										variant="outlined"
										onClick={() => setEditNotes(false)}
									/>
									<Button
										value="Update"
										className="text-white bg-primary text-lg"
										variant="outlined"
										onClick={() => {
											handleUpdateNotes();
											setEditNotes(false);
										}}
									/>
								</div>
							}
						/>

						{loadingNotes ? (
							<div
								className="relative"
								style={{ padding: '20px 0' }}
							>
								<Loader type="relative" />
							</div>
						) : (
							<div className="bg-white shadow-full  rounded-t">
								{notes &&
									notes.map((item: INote) => {
										return (
											<div
												className=""
												key={item?.id}
											>
												<Modal
													width="xs"
													close={() => setOpenConfirmationModal(false)}
													open={openConfirmationModal}
													header={
														<Label
															value="Cancel Dispute"
															className="text-xl text-gray-600 mb-5 font-semibold"
														/>
													}
													content={
														<Label
															value="Are you want to cancel dispute? "
															className="text-md text-gray-400 mb-8"
														/>
													}
													actions={
														<div className="w-full grid grid-cols-2 gap-8">
															<Button
																value="Cancel"
																className="text-gray-400 text-lg bg-white"
																variant="outlined"
																onClick={() =>
																	setOpenConfirmationModal(false)
																}
															/>
															<Button
																value="Yes"
																className="text-white bg-primary text-lg"
																variant="outlined"
																onClick={() => {
																	handleDeleteNote(item.id);
																	setOpenConfirmationModal(false);
																}}
															/>
														</div>
													}
												/>

												<NotesList
													key={item?.id}
													title={item?.title}
													desc={item?.description}
													id={item?.id}
													deleteNote={() => {
														setOpenConfirmationModal(true);
														// if (window.confirm("Are you sure?")) {
														//   handleDeleteNote(item.id);
														// }
													}}
													editNotes={editNotesHandler}
												/>
											</div>
										);
									})}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
