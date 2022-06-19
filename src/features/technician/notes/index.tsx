import { CalendarPicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DailyNotes from '@organisms/daily-notes';
import DailyNotesList from '@organisms/daily-notes-list';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import AddNotePopup from './addNote';
import { apiService } from '../../../utils/request';
import { toast } from 'react-toastify';
import EditNotePopup from '@features/user/my-note/EditNote';
import WeeklyNotes from '@organisms/weekly-notes';
import Label from '@atoms/label';
// import { Fade, Popper, PopperPlacementType } from "@mui/material";
// import { BsFillGrid3X3GapFill } from 'react-icons/bs';
// import { AiOutlineUnorderedList } from 'react-icons/ai';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
import Modal from '@atoms/modal';
import Button from '@atoms/button';
// import { WeeklyCalendar } from 'react-week-picker';
import 'react-week-picker/src/lib/calendar.css';
import Loader from '@atoms/loader';

export default function Notes() {
	const [popup, setPopup] = useState(false);
	const dispatch = useAppDispatch();
	const { status } = useSession();
	const [initialrenderDays, setInitialRenderDays] = useState(30);
	const [startDate, setStartDate] = useState(
		new Date(Date.now() - initialrenderDays * 24 * 60 * 60 * 1000).toISOString() + ''
	);
	const [endDate, setEndDate] = useState(new Date().toISOString() + '');
	const [date, setDate] = useState<Date | null>(null);
	const [disabledButton, setDisabledButton] = useState(false);
	const [notes, setNotes] = useState<any>({});
	const [weeklyNotes, setWeeklyNotes] = useState<any>({});
	const [singleNote, setSingleNote] = useState<any>();
	const [editPopup, setEditPopup] = useState(false);
	const [loading, setLoading] = useState(true);
	const [active, setActive] = useState('daily');
	const [pager, setPager] = useState<any>({ page: 1, count: 1 });
	const [deleteNotePopup, setDeleteNotePopup] = useState<boolean>(false);
	const [deletedId, setDeletedId] = useState<number>();

	const [openCalender, setOpenCalender] = useState<any>(true);
	const [gridView, setGridView] = useState<any>(true);

	const notesToShare = date ? notes : notes;

	const userId = useAppSelector((state) => state?.auth?.userData?.id);

	const handleOpenCalender = () => {
		setOpenCalender(!openCalender);
	};

	const toggleOpen = () => setPopup(!popup);

	const handleClickAway = () => {
		setOpenCalender(false);
	};

	const handleDelete = async (id: number) => {
		setDeleteNotePopup(true);
		setDeletedId(id);
	};

	const getNotes = async () => {
		if (userId) {
			await apiService(
				{
					method: 'get',
					url: `/note/?user__id=${userId}&page=${pager.page}&page_size=15`,
					token: true,
				},
				(res: any) => {
					if (res) {
						const { data } = res;
						setNotes(data?.results);
						setPager({
							...pager,
							count: Math.ceil(data?.count / 15),
							totalBlogs: data?.count,
						});
						setLoading(false);
						return;
					}
				}
			);
		}
	};
	const getWeeklyNotes = async () => {
		// console.log(startDate);
		// console.log(endDate);|| '2022-01-04T11:51:51.016201Z'
		// // console.log('weekly is calling');|| '2022-05-12T11:51:51.016201Z

		if (userId) {
			await apiService(
				{
					method: 'get',
					url: `/note/?created_at__lte=${endDate}&created_at__gte=${startDate}&user__id=${userId}&page=${pager.page}&page_size=100000`,
					token: true,
				},
				(res: any) => {
					// console.log('weekly is calling', res);

					if (res) {
						const { data } = res;
						// console.log(data);

						setWeeklyNotes(data?.results);
						// setPager({ ...pager, count: Math.ceil(data?.count / 15) },total);
						setLoading(false);
						return;
					}
				}
			);
		}
	};

	const handleEdit = async (id: any) => {
		await apiService(
			{
				method: 'get',
				url: `/note/${id}/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					setSingleNote(data);
					return;
				}
			}
		);
		setEditPopup(true);
	};

	useEffect(() => {
		if (status === 'authenticated') {
			getNotes();
			getWeeklyNotes();
		}
		// console.log('initial reder days....', initialrenderDays);
	}, [status, dispatch, userId, pager?.page, startDate, active, initialrenderDays]);

	const handleWeekPick = (startDate: any, endDate: any) => {
		const start: any = new Date(startDate);
		const end: any = new Date(endDate);
		setStartDate(start.toISOString() + '');
		setEndDate(end.toISOString() + '');
	};
	const updateWeeklyDate = () => {
		setStartDate(
			new Date(Date.now() - (initialrenderDays + 30) * 24 * 60 * 60 * 1000).toISOString() + ''
		);
		setInitialRenderDays((prev) => prev + 30);
		if (pager?.count === weeklyNotes.length) {
			toast.warn('No more notes to load');
			setDisabledButton(true);
		}
	};

	return (
		<div className="font-proxima-nova">
			<div className="">
				<div className="">
					<h1 className="text-lg xl:text-[32px]  text-primary font-bold mb-4 2xl:mb-[50px]">
						My Notes
					</h1>
					<div className="max-w-full 2xl:max-w-[1200px] flex flex-wrap justify-between border-b border-[#E9E9E9] pb-[10px] ">
						<div className="">
							<h1 className="text-sm md:text-md xl:text-xl font-medium">
								{new Date().toDateString()}
							</h1>
						</div>

						<div className="flex gap-[30px] items-center">
							<Label
								value="Daily"
								classes={{
									root:
										(active === 'daily' ? 'text-primary ' : '') +
										' font-proxima-nova cursor-pointer',
								}}
								onClick={() => setActive('daily')}
							/>
							<Label
								value="Weekly"
								classes={{
									root:
										(active === 'weekly' ? 'text-primary ' : '') +
										(loading ? 'cursor-none' : 'cursor-pointer') +
										' font-proxima-nova ',
								}}
								onClick={() => setActive('weekly')}
							/>

							{/* <div
								className="p-[8px] bg-[#F7DDF1] rounded-[5px] cursor-pointer"
								onClick={() => setGridView(!gridView)}
							>
								{gridView ? (
									<AiOutlineUnorderedList color="#ff52be" />
								) : (
									<BsFillGrid3X3GapFill color="#ff52be" />
								)}
							</div> */}
						</div>
					</div>
					<div
						className={` w-full flex gap-1 2xl:gap-2  3xl:gap-[26px] items-start justify-between`}
					>
						{/* {loading && (
							<div className="relative h-full w-full mt-20">
								<Loader type="relative" />
							</div>
						)} */}
						{active === 'daily' ? (
							gridView ? (
								<DailyNotes
									date={format(new Date(), 'dd MM yyyy')}
									onClick={toggleOpen}
									notes={notesToShare}
									select={date}
									onday={format(new Date(), 'dd MM yyyy')}
									toggleOpen={toggleOpen}
									onDeleteClicked={(id: number) => {
										handleDelete(id);
									}}
									onEditClicked={handleEdit}
									loading={loading}
									pager={pager}
									setPager={setPager}
								/>
							) : (
								<DailyNotesList
									notes={notesToShare}
									loading={loading}
									pager={pager}
									setPager={setPager}
									toggleOpen={toggleOpen}
								/>
							)
						) : (
							<div className="">
								<WeeklyNotes
									date={format(new Date(), 'dd MM yyyy')}
									onClick={toggleOpen}
									notes={weeklyNotes}
									select={date}
									onday={format(new Date(), 'dd MM yyyy')}
									toggleOpen={toggleOpen}
									onDeleteClicked={(id: number) => handleDelete(id)}
									onEditClicked={(id: number) => handleEdit(id)}
								/>
								{/* <Button
									value="Load More"
									className="bg-primary text-white px-2 py-1 font-md font-semibold"
									onClick={updateWeeklyDate}
									// disabled={disabledButton}
									variant="text"
								/> */}
							</div>
						)}

						<div
							className={`${openCalender ? '' : 'hidden '}
												
												     bg-white border rounded-[10px] 3xl:pt-[20px] xl:mt-[45px] note-date-picker`}
						>
							{openCalender && (
								<>
									<div className="text-primary text-center py-[20px] text-[20px] font-semibold border-b-2 border-[#F3F3F3]">
										Calendar
									</div>
									{active === 'daily' ? (
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<CalendarPicker
												date={date}
												onChange={(newDate) => setDate(newDate)}
											/>
										</LocalizationProvider>
									) : (
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<CalendarPicker
												date={date}
												onChange={(newDate) => setDate(newDate)}
											/>
										</LocalizationProvider>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			{editPopup && (
				<EditNotePopup
					previousData={singleNote}
					open={editPopup}
					toggleOpen={() => setEditPopup((prev) => !prev)}
					getNotes={getNotes}
					// setThreeDotCloseEdit={() => setThreeDotCloseEdit("closed")}
					// handleClose={handleClose}
				/>
			)}
			{popup ? (
				<AddNotePopup
					open={popup}
					toggleOpen={toggleOpen}
					getNotes={getNotes}
				/>
			) : null}
			<Modal
				width="xs"
				close={() => setDeleteNotePopup(false)}
				open={deleteNotePopup}
				header={
					<Label
						value="Deleting Note"
						className="text-xl text-gray-600 mb-5 font-semibold"
					/>
				}
				content={
					<>
						<Label
							value="Are you want to delete note? "
							className="text-md text-gray-400 mb-8"
						/>
						<div className="w-full grid grid-cols-2 gap-8">
							<Button
								value="Cancel"
								className="text-gray-400 text-lg bg-white"
								variant="outlined"
								onClick={() => setDeleteNotePopup(false)}
							/>
							<Button
								value="Yes"
								className="text-white bg-primary text-lg"
								variant="outlined"
								onClick={async () => {
									setDeleteNotePopup(false);
									await apiService(
										{
											method: 'delete',
											url: `/note/${deletedId}/`,
											token: true,
										},
										(res: any) => {
											if (res) {
												getNotes();
												toast.dismiss();
												toast.success('Deleted successfully!');

												return;
											} else {
												toast.dismiss();
												toast.error('Something went wrong!');
											}
										}
									);
									// handleDeleteNote(item.id);
									// setOpenConfirmationModal(false);
								}}
							/>
						</div>
					</>
				}
			/>
		</div>
	);
}

// {active === 'daily' ? (
// 	<LocalizationProvider dateAdapter={AdapterDateFns}>
// 		<CalendarPicker
// 			date={date}
// 			onChange={(newDate) => setDate(newDate)}
// 		/>
// 	</LocalizationProvider>
// ) : (
// 	<LocalizationProvider dateAdapter={AdapterDateFns}>
// 		<WeeklyCalendar onWeekPick={handleWeekPick} />
// 	</LocalizationProvider>
// )}
