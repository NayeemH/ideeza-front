import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import Button from '@atoms/button';
import { IconButton } from '@mui/material';

import { CalendarPicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { BsPaperclip } from 'react-icons/bs';
import { useAppSelector } from 'app/hooks';
import SearchInputAsync from '@molecules/search-field-asyn';

// import { FORMINPUT } from "utils/styles";
// import { createNote } from "@features/technician/notes/request";
import { toast } from 'react-toastify';
import { RiDeleteBinLine } from 'react-icons/ri';
import IconLabel from '@molecules/icon-label';
import { apiService } from 'utils/request';
import TextEditorNew from '@organisms/editor-new/TextEditor';
import { convert24Hour } from './addNote';
import { notesBg } from '@organisms/notes-detail';
// import CheckboxAtom from "@atoms/checkbox";
// import CheckboxFields from "@molecules/checkbox-fields";
// import Calendar from "@atoms/date-picker";

type IProps = {
	previousData: any;
	toggleOpen: () => void;
	getNotes: () => void;
	open: boolean;
	handleClose?: (e?: any) => void;
};
const hoursDurationArray = [
	{ name: '12:30', value: '12:30:00' },
	{ name: '01:00', value: '01:00:00' },
	{ name: '01:30', value: '01:30:00' },
	{ name: '02:00', value: '02:00:00' },
	{ name: '03:00', value: '03:00:00' },
	{ name: '03:30', value: '03:30:00' },
	{ name: '04:00', value: '04:00:00' },
	{ name: '04:30', value: '04:30:00' },
	{ name: '05:00', value: '05:00:00' },
	{ name: '05:30', value: '05:30:00' },
	{ name: '06:00', value: '06:00:00' },
	{ name: '06:30', value: '06:30:00' },
	{ name: '07:00', value: '07:00:00' },
	{ name: '07:30', value: '07:30:00' },
	{ name: '08:00', value: '08:00:00' },
	{ name: '08:30', value: '08:30:00' },
	{ name: '09:00', value: '09:00:00' },
	{ name: '09:30', value: '09:30:00' },
	{ name: '10:00', value: '10:00:00' },
	{ name: '10:30', value: '10:30:00' },
	{ name: '11:00', value: '11:00:00' },
	{ name: '11:30', value: '11:30:00' },
	{ name: '12:00', value: '12:00:00' },
];
function EditNotePopup({ previousData, toggleOpen, open, getNotes, handleClose }: IProps) {
	const previouslyNoteStartingHour = (val: string) => {
		return parseInt(val.slice(0, 2));
	};
	const checkTime = (val: string) => {
		let hour = previouslyNoteStartingHour(val);
		if (hour > 12) {
			hour -= 12;
		}

		return hour
			? hour > 9
				? hour + ''.concat(val.slice(2))
				: '0' + hour + val.slice(2)
			: '12'.concat(val.slice(2));
	};
	const checkTimePeriod = (val: string) => {
		const hour = previouslyNoteStartingHour(val);
		if (!hour) {
			return 'PM';
		}
		return hour > 12 ? 'PM' : 'AM';
	};

	const [isImportant, setIsImportant] = useState(previousData?.is_important);
	const [timeStamp, setTimeStamp] = useState<any>({
		start_time: checkTime(previousData?.start_time) || '',
		period: checkTimePeriod(previousData?.start_time) || '',
		note_period: previousData?.note_period > 15 ? 2 : 1,
		time: previousData?.note_period ? '15' : '00',
	});

	const { loading, success } = useAppSelector(({ notes }) => notes);
	const [selectedNoteBg, setSelectedNoteBg] = useState<any>(previousData?.color);
	const [selectAvatar, setSelectAvatar] = useState(false);
	const [date, setDate] = useState<Date | null>(new Date(previousData?.deadline || ''));
	const [assign, setAssign] = useState([]);
	const [attachments, setAttachments] = useState<any[]>(previousData?.file_attachments);
	const [description, setDescription] = useState(previousData?.description);

	const { handleSubmit, setValue, register } = useForm();
	//   const handleDate = (e) => setDate(e);
	const getHour = (e: any) => {
		setTimeStamp({ ...timeStamp, start_time: e.target.value });
	};
	const timePeriod = (e: any) => {
		setTimeStamp({ ...timeStamp, period: e.target.value });
		// console.log(timeStamp);
	};
	const notePeriod = (e: any) => {
		setTimeStamp({ ...timeStamp, note_period: e.target.value });
	};
	const time = (e: any) => {
		setTimeStamp({ ...timeStamp, time: e.target.value });
	};
	const handlerSubmit = async (formData: any) => {
		const reqBody = {
			...formData,
			deadline: date,
			start_time:
				timeStamp.period === 'AM'
					? timeStamp?.start_time
					: convert24Hour(timeStamp?.start_time),
			note_period: timeStamp.note_period
				? parseInt(timeStamp.time) * timeStamp.note_period
				: parseInt(timeStamp.time),

			color: selectedNoteBg,
			is_important: isImportant,
		};

		await apiService(
			{
				method: 'patch',
				url: `note/${previousData?.id}/`,
				token: true,
				data: reqBody,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					getNotes();
					handleClose && handleClose();
					toast.dismiss();
					toast.success('Updated successfully!');

					return;
				}
			}
		);
		toggleOpen();
	};
	const openAvaters = () => {
		setSelectAvatar((prev) => !prev);
	};

	//     handler({ ...e, files: attachment, assigned_to: assign.map((v) => v.id) });

	//   const toggleUser = () => setUser(!user);
	//   const addAsign = (e) => {
	//     let find = assign.find((v) => v.id === e.id);
	//     if (!find) {
	//       let data = assign;
	//       data.push(e);
	//       setAssign(data);
	//     }
	//     return toggleUser();
	//   };

	const addAttachment = async (e: any) => {
		const formData = new FormData();
		formData.append('file', e.target.files[0]);
		formData.append('name', e.target.files[0].name);

		await apiService(
			{
				method: 'post',
				url: `note/${previousData?.id}/add-file/`,
				token: true,
				data: formData,
			},
			(res: any) => {
				if (res) {
					const id = res?.data?.file_attachments;
					toast.dismiss();
					toast.success('File uploaded successfully!');
					setAttachments(id);
				}
			}
		);
		// let data = attachments;
		// data.push(e.target.files[0]);
		// return setAttachments([...formData]);
	};
	const removeAttachment = async (e: number) => {
		await apiService(
			{
				method: 'delete',
				url: `note/${previousData?.id}/delete-file/${e}/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const id = res?.data?.file_attachments;

					toast.dismiss();
					toast.error('File Deleted successfully!');
					setAttachments(id);
				}
			}
		);
	};

	useEffect(() => {
		// setValue("start_date", format(new Date(), "YYYY-MM-DD[T]HH:mm:ss"));
	}, [date]);

	useEffect(() => {
		return () => {
			setAssign([]);
			return setAttachments([]);
		};
	}, []);

	return (
		<>
			{/* <SearchPopup
        add={addAsign}
        open={user}
        user={users}
        toggle={toggleUser}
      /> */}

			<Modal
				open={selectAvatar}
				close={openAvaters}
				width="sm"
				header={
					<Label
						color="primary"
						variant="h6"
						className="pl-3"
						value=""
					/>
				}
				content={
					<div className="w-full pt-6">
						<SearchInputAsync
							id="Add New User"
							// className="border border-solid border-gray-500"
						/>
					</div>
				}
				actions={
					<div className="flex w-full justify-end">
						<Button
							// onClick={toggle}
							value="Cancel"
							color="primary"
							className="bg-primary"
						/>
						<Button
							// onClick={add.bind(this, selected)}
							value="Add"
							color="primary"
							variant="contained"
							className="shadow-none bg-primary w-32 ml-2"
						/>
					</div>
				}
			/>

			<Modal
				width="md"
				close={toggleOpen}
				header={
					<>
						<Label
							value="Edit Note"
							className="text-primary texl-lg 2xl:text-2xl font-semibold font-sans"
						/>
					</>
				}
				content={
					<form
						onSubmit={handleSubmit(handlerSubmit)}
						className="px-2"
					>
						<div className="grid md:grid-cols-5 md:gap-x-10 gap-y-5 md:gap-y-0 mt-5 pr-2 md:pr-0">
							<div className="flex flex-col space-y-[20px] items-start md:col-span-3">
								<label className="w-full">
									<span className="mb-[10px] text-base font-[500] block">
										Link to (Option)
									</span>
									<input
										{...register('link_to', { required: false })}
										defaultValue={previousData?.title}
										className="placeholder-[#B9B9B9] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] w-full border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
										placeholder="Project or layer"
									/>
								</label>
								<label className="w-full">
									<span className="mb-[10px] text-base font-[500] block">
										Name
									</span>
									<input
										{...register('title', { required: 'Title Is Required' })}
										defaultValue={previousData?.title}
										className="placeholder-[#B9B9B9] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] w-full border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
										placeholder="Edit Name"
									/>
								</label>
								<label className="w-full">
									<span className="mb-[10px] text-base font-[500] block">
										Description
									</span>
									<TextEditorNew
										height={300}
										// placeholder={'Type your description here...'}
										defaultValue={
											description || 'Type your description here...'
										}
										action={(text) => {
											setDescription(text);
											setValue(
												'description',
												text === '<p><br></p>' ? '' : text,
												{
													shouldValidate: true,
												}
											);
										}}
									/>
								</label>

								<div className="w-full">
									<Label
										value="Attachments"
										classes={{
											root: 'font-sans text-base 2xl:text-xl mb-[10px] font-semibold text-gray-700 tracking-normal',
										}}
									/>
									<label className="placeholder-[#B9B9B9]  text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] w-full border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA] flex justify-between">
										<span className="text-gray-300">Add more files..</span>
										<span>
											<BsPaperclip
												className="text-primary"
												size="25"
											/>
										</span>
										<input
											type="file"
											className="hidden"
											multiple
											onChange={addAttachment}
										/>
									</label>
									{attachments?.map((v: any, k: number) => {
										return (
											<IconLabel
												key={k}
												tooltipProps={{ open: false }}
												mainClass="flex mt-2 flex-row-reverse justify-end items-center text-left"
												labelValue={v?.name}
												lableClass={{
													root: `text-primary text-md tracking-tighter font-sans mr-2`,
												}}
												iconComponent={
													<IconButton
														className="outline-none"
														onClick={() => removeAttachment(v?.id)}
													>
														<RiDeleteBinLine className="text-gray-600 cursor-pointer text-md" />
													</IconButton>
												}
											/>
										);
									})}
								</div>
							</div>
							<div className="w-full md:col-span-2 overflow-hidden">
								<Label
									value="Deadline"
									variant="h6"
									className="font-proxima-nova text-base 2xl:text-xl font-semibold text-gray-700 tracking-tight"
								/>

								<div className="w-full h-[290px] flex items-start border rounded-[10px] my-[10px] justify-center">
									{/* <Calendar /> */}
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<CalendarPicker
											date={date}
											onChange={(newDate) => setDate(newDate)}
										/>
									</LocalizationProvider>
								</div>
								<div className="flex justify-between mt-16">
									<select
										className="text-[#787878] w-48 text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
										name="hour"
										onChange={getHour}
									>
										<option
											value=""
											disabled
											hidden
										>
											Starting Hour
										</option>
										{hoursDurationArray.map((hour: any) => (
											<option
												key={hour.name}
												value={hour.value}
												selected={hour.value === timeStamp?.start_time}
											>
												{hour.value}
											</option>
										))}
									</select>
									<select
										className="text-[#787878] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
										name="time"
										onChange={timePeriod}
										defaultValue={timeStamp?.period}
									>
										<option value="AM">AM</option>
										<option value="PM">PM</option>
									</select>
								</div>
								<div className="mt-[10px] flex justify-between mb-[80px]">
									<select
										className="text-[#787878] w-48 text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
										name="note_period"
										onChange={notePeriod}
									>
										<option
											value=""
											disabled
											hidden
										>
											Note Period
										</option>
										<option
											selected={timeStamp.note_period === 1}
											value={1}
										>
											01
										</option>
										<option
											selected={timeStamp.note_period === 2}
											value={2}
										>
											02
										</option>
									</select>
									<select
										className="text-[#787878] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
										name="minute"
										onChange={time}
									>
										<option
											value=""
											disabled
											hidden
										>
											Min
										</option>
										<option
											selected={timeStamp.note_period === 0}
											value="00"
										>
											00
										</option>
										<option
											selected={timeStamp.note_period > 0}
											value="15"
										>
											15
										</option>
									</select>
									{/* <ReactSelect
                    containerClass="bg-gray-150 h-10 w-48 text-base text-gray-900 font-sans border border-primary overflow-hidden"
                    placeholder="Note Period"
                    options={[
                      { name: "01", value: "01" },
                      { name: "02", value: "02" },
                    ]}
                  /> */}
									{/* <ReactSelect
                    containerClass="bg-gray-150 h-10 text-base text-gray-900 font-sans border border-primary overflow-hidden"
                    placeholder="Min"
                    options={[
                      { name: "00", value: "00" },
                      { name: "15", value: "15" },
                    ]}
                  /> */}
								</div>
								<div className=" p-3">
									<Label
										value="Card"
										className="font-proxima-nova text-base mb-2"
									/>
									<div className="grid grid-cols-4 gap-1 2xl:gap-4">
										{notesBg.map(({ bgImg }: any) => (
											<div
												onClick={() => setSelectedNoteBg(bgImg)}
												key={bgImg}
												className={`${
													selectedNoteBg === bgImg
														? 'border-2 border-primary '
														: ''
												} `}
											>
												<img
													src={bgImg}
													alt=""
												/>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col justify-start items-start gap-y-3 xl:gap-y-7 2xl:gap-y-[30px] w-full pt-2 3xl:pt-[30px] 2xl:pt-5 pb-1">
							<div className="flex my-2 items-center">
								<input
									onChange={(e: any) => setIsImportant(e.target.checked)}
									type="checkbox"
									name=""
									id=""
									checked={isImportant}
									className="accent-pink-500 custom-checkbox-note"
								/>
								<label className="text-gray-900 ml-2 tracking-tighter font-medium text-base 2xl:text-xl font-sans">
									Mark as an important
								</label>
							</div>

							<Button
								type="submit"
								value="Edit note"
								classes={{
									root: `text-white md:text-md xl:text-xl bg-primary xl:py-2 shadow-none leading-7 px-6 rounded-md tracking-tight font-sans transform-none`,
								}}
								loading={loading}
								color="primary"
							/>
						</div>
					</form>
				}
				// actions={}
				open={open}
			/>
		</>
	);
}

export default EditNotePopup;
