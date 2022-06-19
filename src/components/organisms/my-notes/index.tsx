import React, { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import Modal from '@atoms/modal';
import Label from '@atoms/label';
import TextField from '@molecules/text-field';
import IconLabel from '@molecules/icon-label';
import IconButton from '@atoms/icon-button';
// import Date from "@atoms/date";
import Upload from '@molecules/upload';
import Button from '@atoms/button';
import AddAvatar from '@molecules/add-avatar';
import CheckboxAtom from '@atoms/checkbox';
import { CalendarPicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { IconButton } from "@material-ui/core";
// import { hoursDurationArray } from "service/store/constant";
const hoursDurationArray = [
	{ name: '00:00', value: '00:00' },
	{ name: '00:30', value: '00:30' },
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
function MyNotesPopup(props: any) {
	// const {
	//   open,
	//   toggleOpen,
	//   project,
	//   handler,
	//   users,
	//   removeAttachment,
	//   onEdit,
	// } = props;
	const { open, toggleOpen } = props;
	const [user, setUser] = useState(false);
	// const [date, setDate] = useState<any>(new Date(""));
	// const [assign, setAssign] = useState([]);
	const [attachment, setAttachment] = useState([]);
	const [date, setDate] = useState<Date | null>(new Date());
	const [timeStamp, setTimeStamp] = useState<any>({});

	// const { register, control, handleSubmit, setValue } = useForm();
	// const handleDate = (e: any) => setDate(e);
	// const handlerSubmit = (e:any) =>
	//   handler({ ...e, files: attachment, assigned_to: assign.map((v) => v.id) });

	const toggleUser = () => setUser(!user);
	const getHour = (e: any) => {
		setTimeStamp({ ...timeStamp, start_time: e.target.value });
	};
	const timePeriod = (e: any) => {
		setTimeStamp({ ...timeStamp, period: e.target.value });
	};
	const notePeriod = (e: any) => {
		setTimeStamp({ ...timeStamp, note_period: e.target.value });
	};
	const time = (e: any) => {
		setTimeStamp({ ...timeStamp, time: e.target.value });
	};
	// const addAsign = (e: any) => {
	//   let find = assign.find((v) => v.id === e.id);
	//   if (!find) {
	//     let data = assign;
	//     data.push(e);
	//     setAssign(data);
	//   }
	//   return toggleUser();
	// };
	const addAttachment = () => {
		const data = attachment;
		// data.push(e.target.files[0]);
		return setAttachment([...data]);
	};
	// const removeAttachment = (e: any) => {
	//   let data = attachment;
	//   data = data.filter((v, k) => k !== e);
	//   setAttachment([...data]);
	// };
	//   useEffect(() => {
	//     const id = setInterval(() => setDate(new Date()), 1000);
	//     return () => {
	//         clearInterval(id);
	//     }
	// }, []);
	// useEffect(() => {
	//   setValue("start_date", format(new Date(date), "MM.dd.yyyy") ??
	// "12.02.2021";
	// }, [date]);
	// useEffect(() => {
	//   return () => {
	//     setAssign([]);
	//     return setAttachment([]);
	//   };
	// }, []);
	return (
		<>
			{/* TODO */}
			{/* <SearchPopup
        // add={addAsign}
        open={user}
        user={users}
        toggle={toggleUser}
      /> */}
			<Modal
				width="md"
				close={toggleOpen}
				header={
					<>
						<Label
							value="Add New Note"
							className="text-primary texl-lg 2xl:text-2xl font-semibold font-sans tracking-tight"
						/>
					</>
				}
				content={
					// <form onSubmit={handleSubmit(handlerSubmit)}>
					<form>
						<div className="grid md:grid-cols-5 md:gap-x-10 gap-y-5 md:gap-y-0 mt-5 pr-2 md:pr-0">
							<div className="flex flex-col space-y-2 md:col-span-3">
								<TextField
									name="title"
									// error={errors}
									// register={register({ required: "Title Is Required" })}
									mainClass="flex-col"
									labelvalue="Link to (Option)"
									placeholder="Project or layer"
									inputClasses="text-base 2xl:text-xl font-sans h-12 p-0 border"
									labelClasses="font-sans text-base 2xl:text-xl text-black font-semibold pb-1 tracking-tight"
									type="text"
								/>

								<TextField
									name="title"
									// error={errors}
									// register={register({ required: "Title Is Required" })}
									mainClass="flex-col"
									labelvalue="Name"
									inputClasses="text-base 2xl:text-xl font-sans h-12 p-0 border"
									labelClasses="font-sans text-base 2xl:text-xl text-black font-semibold pb-1 tracking-tight"
									type="text"
								/>
								<TextField
									name="description"
									// register={register({ required: "Description is Required!" })}
									// error={errors}
									mainClass="flex-col"
									labelvalue="Description"
									inputClasses="text-base 2xl:text-xl font-sans p-0 border"
									labelClasses="font-sans text-base 2xl:text-xl text-black font-semibold pb-1 tracking-tight"
									multiline={true}
									rows={4}
								/>
								{/* TODO */}
								<AddAvatar
									click={toggleUser}
									// assign={assign}
									value="Taskers"
									mainClass="space-x-2 mb-2"
									labelClass="text-base 2xl:text-xl font-semibold text-gray-700 tracking-tight py-1"
									avatarClass="w-10 h-10"
								/>

								<div>
									<Label
										value="Attachments"
										classes={{
											root: 'font-sans text-base 2xl:text-xl pb-1 font-semibold text-gray-700 tracking-normal',
										}}
									/>
									{/* TODO */}
									<Upload
										change={addAttachment}
										value="Add more files.."
										labelClass="text-gray-900 pl-1 text-base 2xl:text-xl h-12 pt-2 py-1"
									/>
									{attachment?.map((v, k) => {
										return (
											<IconLabel
												key={k}
												tooltipProps={{ open: false }}
												mainClass="flex mt-2 flex-row-reverse justify-end items-center text-left"
												labelValue={'ss'}
												lableClass={{
													root: `text-primary text-md tracking-tighter font-sans mr-2`,
												}}
												onClick={() => 'goto'}
												iconComponent={
													<IconButton
														// onClick={removeAttachment.bind(this, k)}
														// className="outline-none"
														page={10}
														handlePage={() => {
															'page';
														}}
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
									className="font-sans text-base 2xl:text-xl font-semibold text-gray-700 tracking-tight"
								/>
								<hr />
								<div className="w-full flex items-start justify-center">
									{/* <Calendar /> */}
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<CalendarPicker
											date={date}
											onChange={(newDate) => setDate(newDate)}
										/>
									</LocalizationProvider>
								</div>
								{/* <div className="w-full flex items-start justify-center">
             
                  <Date />
                </div> */}
								<div className="flex justify-between">
									<select
										className="bg-gray-150 w-48 h-10 text-base text-gray-900 p-2 rounded bg-[#F6F6F6] font-sans border border-primary border-r overflow-hidden focus:outline-none"
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
										className="h-10 text-base text-gray-900 p-2 rounded bg-[#F6F6F6] font-sans border border-primary overflow-hidden focus:outline-none"
										name="time"
										onChange={timePeriod}
									>
										<option value="AM">AM</option>
										<option value="PM">PM</option>
									</select>

									{/* <ReactSelect
                    containerClass="bg-gray-150 w-48 h-10 text-base text-gray-900 font-sans border border-primary border-r overflow-hidden"
                    placeholder="Starting Hour"
                    options={hoursDurationArray}
                  /> */}
									{/* <ReactSelect
                    containerClass="bg-gray-150 h-10 text-base text-gray-900 font-sans border border-primary overflow-hidden"
                    defaultValue="AM"
                    placeholder="AM"
                    options={[
                      { name: "AM", value: "AM" },
                      { name: "PM", value: "PM" },
                    ]}
                  /> */}
								</div>
								<div className="mt-5 flex justify-between">
									<select
										className="bg-gray-150 h-10 w-48 text-base p-2 rounded bg-[#F6F6F6] text-gray-900 font-sans border border-primary overflow-hidden focus:outline-none"
										name="note_period"
										onChange={notePeriod}
										defaultValue=""
									>
										<option
											value=""
											hidden
										>
											Note Period
										</option>
										<option value={1}>01</option>
										<option value={2}>02</option>
									</select>
									<select
										className="bg-gray-150 h-10 text-base text-gray-900 p-2 rounded bg-[#F6F6F6] font-sans border border-primary overflow-hidden focus:outline-none"
										name="minute"
										onChange={time}
									>
										<option
											selected
											disabled
											hidden
										>
											Min
										</option>
										<option value="00">00</option>
										<option value="15">15</option>
									</select>
								</div>

								<div className="flex flex-col justify-end items-end w-full md:px-2  pb-1">
									<div className="mt-3 md:mt-0">
										<div className="flex my-2 items-center">
											{/* <CheckboxAtom
                  checked={true}
                  // onChange={(e: any) => setIsImportant(e.target.checked)}
                /> */}
											<CheckboxAtom />
											<label className="text-gray-900 tracking-tighter font-medium text-base 2xl:text-xl font-sans">
												Mark as an important
											</label>
										</div>
									</div>

									<Button
										type="submit"
										value="Add Note"
										classes={{
											root: `text-white md:text-md xl:text-xl bg-primary xl:py-2 shadow-none leading-7 px-6 rounded-md tracking-tight font-sans transform-none`,
										}}
										// loading={loading}
										color="primary"
									/>
								</div>
							</div>
						</div>
					</form>
				}
				open={open}
				actions={<></>}
			/>
		</>
	);
}

export default MyNotesPopup;
