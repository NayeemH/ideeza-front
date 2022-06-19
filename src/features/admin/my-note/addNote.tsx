import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import Button from '@atoms/button';
// import { IconButton } from '@mui/material';

import { CalendarPicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useAppSelector } from 'app/hooks';
import SearchInputAsync from '@molecules/search-field-asyn';
import { createNote } from '@features/technician/notes/request';
import { toast } from 'react-toastify';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import IconLabel from '@molecules/icon-label';
import { apiService } from 'utils/request';
import { notesBg } from '@organisms/notes-detail';
import TextEditorNew from '@organisms/editor-new/TextEditor';
// import AddAvatar from '@molecules/add-avatar';

// import ReactSelect from "@atoms/select";
// import CheckboxAtom from "@atoms/checkbox";
// import CheckboxFields from "@molecules/checkbox-fields";
// import Calendar from "@atoms/date-picker";

type IProps = {
	toggleOpen: () => void;
	getNotes: () => void;
	open: boolean;
};
const hoursDurationArray = [
	{ name: '12:30', value: '12:30' },
	{ name: '01:00', value: '01:00' },
	{ name: '01:30', value: '01:30' },
	{ name: '02:00', value: '02:00' },
	{ name: '03:00', value: '03:00' },
	{ name: '03:30', value: '03:30' },
	{ name: '04:00', value: '04:00' },
	{ name: '04:30', value: '04:30' },
	{ name: '05:00', value: '05:00' },
	{ name: '05:30', value: '05:30' },
	{ name: '06:00', value: '06:00' },
	{ name: '06:30', value: '06:30' },
	{ name: '07:00', value: '07:00' },
	{ name: '07:30', value: '07:30' },
	{ name: '08:00', value: '08:00' },
	{ name: '08:30', value: '08:30' },
	{ name: '09:00', value: '09:00' },
	{ name: '09:30', value: '09:30' },
	{ name: '10:00', value: '10:00' },
	{ name: '10:30', value: '10:30' },
	{ name: '11:00', value: '11:00' },
	{ name: '11:30', value: '11:30' },
	{ name: '12:00', value: '12:00' },
];
// helper function for 12 hour to 24 hour convertor;
export const convert24Hour = (val: string) => {
	const hour = val.slice(0, 2);
	const integerHour = parseInt(hour) + 12;

	return integerHour === 24 ? '00'.concat(val.slice(2)) : integerHour + ''.concat(val.slice(2));
};
function AddNotePopup({ toggleOpen, open, getNotes }: IProps) {
	const [isImportant, setIsImportant] = useState(false);
	const [timeStamp, setTimeStamp] = useState<any>({ period: 'AM' });

	const [selectAvatar, setSelectAvatar] = useState(false);
	const [addNoteLoading, setAddNoteLoading] = useState(false);
	const [date, setDate] = useState<Date | null>(new Date());
	const [assign, setAssign] = useState([]);
	const [attachments, setAttachments] = useState<any[]>([]);
	const [description, setDescription] = useState('');
	const [selectedNoteBg, setSelectedNoteBg] = useState('');

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm();

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
		if (!selectedNoteBg) {
			toast.error('please select an image for your note background');
			return;
		}
		setAddNoteLoading(true);
		const reqBody = {
			...formData,
			deadline: date,
			start_time:
				timeStamp.period === 'AM'
					? timeStamp?.start_time
					: convert24Hour(timeStamp?.start_time),
			note_period: timeStamp.note_period * timeStamp.time,

			assigned_to: assign,
			color: selectedNoteBg,
			is_important: isImportant,
		};
		try {
			createNote(reqBody).then(async (res: any) => {
				res?.status === 201
					? toast.success('Note created successfully!')
					: toast.warning('Something goes wrong!');
				const id = res?.data?.id;
				attachments.forEach(async (file: any) => {
					const formData = new FormData();
					formData.append('file', file);
					formData.append('name', file?.name);
					await apiService(
						{
							method: 'post',
							url: `note/${id}/add-file/`,
							token: true,
							data: formData,
						},
						(res: any, err: any) => {
							if (res) {
								// console.log(res);
								// const id = res?.data?.file_attachments;
								// toast.dismiss();
								// toast.success("File uploaded successfully!");
								// setAttachments(id);
							}
							if (err) {
								console.log(err);
							}
						}
					);
				});

				getNotes();
				toggleOpen();
			});
		} catch (err) {
			console.log(err);
		}
		// dispatch(reset());
	};
	const openAvaters = () => {
		setSelectAvatar((prev) => !prev);
	};

	const addAttachment = async (e: any) => {
		const data = attachments;
		data.push(e.target.files[0]);

		return setAttachments([...data]);
	};
	const removeAttachment = (e: any) => {
		let data = attachments;
		data = data.filter((v: any, k: any) => k !== e);
		setAttachments([...data]);
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
				width="md"
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
						<SearchInputAsync id="Add New User" />
					</div>
				}
				actions={
					<div className="flex w-full justify-end">
						<Button
							onClick={openAvaters}
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
				className={{ paper: ' rounded-xl p-[40px]' }}
				close={toggleOpen}
				header={
					<div className="flex justify-between items-center mb-[30px]">
						<Label
							value="Add New Note"
							className="text-primary texl-lg xl:text-[24px] font-semibold font-proxima-nova"
						/>
						<IoClose
							className="text-primary text-[25px]"
							onClick={toggleOpen}
						/>
					</div>
				}
				content={
					<form
						onSubmit={handleSubmit(handlerSubmit)}
						className="px-2"
					>
						<div className="grid md:grid-cols-2 xl:grid-cols-5 md:gap-x-[39px] gap-y-5 md:gap-y-0 mt-5 pr-2 md:pr-0">
							<div className="xl:col-span-3 ">
								<label className="">
									<span className="mb-[10px] text-base font-[500] block">
										Link to (Option)
									</span>
									<input
										{...register('link_to', { required: false })}
										className="placeholder-[#B9B9B9] mb-[18px] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] w-full border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
										placeholder="Project or layer"
									/>
								</label>
								<label>
									<span className="mb-[10px] text-base font-[500] block">
										Name
									</span>
									<input
										{...register('title', { required: 'Please enter title' })}
										className="placeholder-[#B9B9B9] text-[16px] mb-[18px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] w-full border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
										placeholder="Enter Your Name"
									/>
									{errors?.title ? (
										<p className="text-primary text-xs">
											{errors?.title?.message}
										</p>
									) : (
										''
									)}
								</label>
								<label>
									<span className="mb-[10px] text-base font-[500] block">
										Description
									</span>
									<TextEditorNew
										height={300}
										// placeholder={'Type your description here...'}
										defaultValue={description || ''}
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
									{errors?.description ? (
										<p className="text-primary text-xs">
											{errors?.description?.message}
										</p>
									) : (
										''
									)}
								</label>
								<div className="relative">
									{/* <Label
                    value="Add new note"
                    classes={{
                      root: "font-proxima-nova text-base xl:text-[20px] mb-[10px] font-semibold text-gray-700 tracking-normal",
                    }}
                  /> */}
									{/* <AddAvatar
										click={toggleUser}
										assign={assign}
										value="Taskers"
										mainClass="space-x-2 mb-2"
										labelClass="text-base 2xl:text-xl font-semibold text-gray-700 tracking-tight py-1"
										avatarClass="w-10 h-10"
									/>
									<IconButton
										onClick={openAvaters}
										className={`bg-primary outline-none font-bold rounded-full text-lg items-center justify-center flex text-white w-10 h-10`}
									>
										+
									</IconButton> */}
								</div>

								<div className="mt-[18px]">
									<Label
										value="Attachments"
										classes={{
											root: 'font-proxima-nova text-base 2xl:text-xl mb-[10px] font-semibold text-gray-700 tracking-normal',
										}}
									/>
									<label className="placeholder-[#B9B9B9] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] w-full xl:w-72 border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA] flex items-center justify-between">
										<span className="text-[#CBCBCB]">Add more files..</span>
										<span className="mr-2">
											<img
												src="/images/icon/attach.svg"
												className="w-[16px] h-[16px]"
												alt="icon"
											/>
										</span>
										<input
											type="file"
											className="hidden"
											onChange={(e?: any) => {
												addAttachment(e);
												e.target.value = '';
											}}
											multiple
										/>
									</label>
									{attachments?.map((v: any, k: number) => {
										return (
											<IconLabel
												key={k}
												tooltipProps={{ open: false }}
												mainClass="flex mt-2 flex-row-reverse justify-end items-center text-left "
												contentName={
													v?.name.length > 25
														? v?.name.slice(0, 25)
														: v?.name
												}
												uploadContentContainer={{
													root: `text-primary text-md tracking-tighter font-proxima-nova mr-2`,
												}}
												isUploadContent={true}
												iconContentLeft={
													<img
														src="/images/icon/attach.svg"
														className="w-[16px] h-[16px]"
														alt="icon"
													/>
												}
												iconContentRight={
													<RiDeleteBinLine
														className="text-red-500 cursor-pointer text-md"
														onClick={() => removeAttachment(k)}
													/>
												}
											/>
										);
									})}
								</div>
							</div>
							<div className="w-full overflow-hidden xl:col-span-2 pr-2">
								<Label
									value="Deadline"
									variant="h6"
									className="font-proxima-nova text-base font-semibold text-gray-700 tracking-tight"
								/>
								<div className="w-full h-[300px] flex items-start border rounded-[10px] my-[10px] justify-center">
									{/* <Calendar /> */}
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<CalendarPicker
											date={date}
											onChange={(newDate) => setDate(newDate)}
										/>
									</LocalizationProvider>
								</div>
								<div className="mt-16 flex justify-between">
									<select
										className="text-[#787878] w-[180px] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
										name="hour"
										onChange={getHour}
										defaultValue=""
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
											>
												{hour.value}
											</option>
										))}
									</select>
									<select
										className="text-[#787878] w-[100px] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
										name="time"
										onChange={timePeriod}
									>
										<option value="AM">AM</option>
										<option value="PM">PM</option>
									</select>
								</div>
								<div className="mt-[10px] flex justify-between mb-[80px]">
									<select
										className="text-[#787878] w-[180px] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
										name="note_period"
										onChange={notePeriod}
										defaultValue=""
									>
										<option
											value=""
											disabled
											hidden
										>
											Note Period
										</option>
										<option value={1}>01</option>
										<option value={2}>02</option>
									</select>
									<select
										className="text-[#787878] w-[100px] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
										name="minute"
										onChange={time}
										defaultValue=""
									>
										<option
											value=""
											disabled
											hidden
										>
											Min
										</option>
										<option value="00">00</option>
										<option value="15">15</option>
									</select>
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

								{/* <Input
                  name="start_date"
                  register={register}
                  classes={{ root: "hidden" }}
                  className="hidden"
                /> */}
							</div>
						</div>
						<div className="flex flex-col justify-start items-start gap-y-3 xl:gap-y-7 2xl:gap-y-[30px] w-full md:px-6 pt-2 3xl:pt-[30px] 2xl:pt-5 px-4 pb-1">
							<div className="flex my-2 items-center">
								{/* <CheckboxAtom
                  checked={false}
                  onChange={(e: any) => setIsImportant(e.target.checked)}
                /> */}
								<input
									onChange={(e: any) => setIsImportant(e.target.checked)}
									type="checkbox"
									name=""
									id=""
									className="accent-pink-500 custom-checkbox-note"
								/>
								<label className="text-[#999999] ml-2 tracking-tighter font-medium text-base 2xl:text-lg font-proxima-nova">
									Mark as an important
								</label>
							</div>

							{/* <CheckboxFields
                value="Mark as an important"
                labelClass="text-gray-900 tracking-tighter font-medium text-base 2xl:text-xl font-proxima-nova"
                name="Important"
                checked={false}
                rules={""}
              /> */}
							<Button
								type="submit"
								value="Add Note"
								classes={{
									root: `text-white w-[135px] h-[50px] md:text-md xl:text-xl bg-primary xl:py-2 shadow-none leading-7 px-6 rounded-md tracking-tight font-proxima-nova transform-none`,
								}}
								loading={addNoteLoading}
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

export default AddNotePopup;
