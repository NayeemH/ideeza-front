// import Label from "@atoms/label";
import Label from '@atoms/label';
import SimpleToolTip from '@atoms/simple-tooltip';
//import AddMoreInformationSkill from "@molecules/add-more-information-skill";
import IconLabel from '@molecules/icon-label';
// import IconLabel from "@molecules/icon-label";
// import SelectField from "@molecules/select-field";
import { Fade } from '@molecules/spring-fade';
import TextField from '@molecules/text-field';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Popper } from '@mui/material';
// import { Popper } from "@mui/material";
import { Box } from '@mui/system';
import GeneralSkill from '@organisms/general-skill';
import React, { useState, useEffect, useRef } from 'react';
import { BsFillLockFill } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';
// import { FaChevronDown } from "react-icons/fa";
import { useOutsideClickHandler } from 'utils/utils';

const EditProfileInformation: React.FC<any> = ({
	firstName,
	setFirstName,
	lastName,
	setLastName,
	email,
	setEmail,
	gender,
	setGender,
	dob,
	setDOB,
	phone,
	setPhone,
	website,
	setWebsite,
	about,
	setAbout,
	address,
	setAddress,
	skillList,
	// value,
	change,
	// postSkill,
	userCurrentSkills,
	getUserSkills,
}) => {
	const [open2, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<any>();
	const ref = useRef(null);
	const [errors, setErrors] = useState({});

	useOutsideClickHandler(ref, () => setOpen(!open2));
	const selectedSkills = userCurrentSkills?.map((skill: any) => skill?.skill?.name);
	let selectedSkillsString = '';
	if (selectedSkills?.length !== 0) {
		selectedSkillsString =
			selectedSkills?.length < 3
				? selectedSkills?.join(',')
				: selectedSkills?.slice(0, 3).join(',') + '...';
	}

	// const handleClick = (event: any) => {
	//   setAnchorEl(event.currentTarget);
	// };
	useEffect(() => {
		setErrors(errors);
	}, [errors]);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event?.currentTarget);
		setOpen((previousOpen) => !previousOpen);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : 'undefined';
	return (
		<div className="rounded-lg bg-white  space-y-4 p-7 pb-10 md:px-7 px-4 w-full">
			<TextField
				error={errors}
				name="first_name"
				mainClass="flex items-center"
				inputClasses="w-full h-11 rounded-md placeholder-[#999999] text-[#333333] p-0 py-2 md:text-base text-sm tracking-tight  bg-[#FBFBFB] focus:bg-red-300 border border-[#E6E6E6] border-opacity-40"
				labelClasses="text-gray-700 flex items-center md:text-base text-sm  tracking-tight md:w-2/4 w-[70%]"
				labelvalue={
					<>
						First Name <BsFillLockFill className="text-[#999999] text-base ml-2" />{' '}
					</>
				}
				value={firstName}
				onChange={(e?: any) => setFirstName(e.target.value)}
				placeholder="Enter first name"
			/>
			<TextField
				error={errors}
				name="last_name"
				mainClass="flex items-center"
				inputClasses="w-full h-11 rounded-md placeholder-[#999999] text-[#333333] p-0 py-2 md:text-base text-sm tracking-tight  bg-[#FBFBFB] border border-[#E6E6E6] border-opacity-40"
				labelClasses="text-gray-700 flex items-center md:text-base text-sm  tracking-tight md:w-2/4 w-[70%]"
				value={lastName}
				onChange={(e?: any) => setLastName(e.target.value)}
				labelvalue={
					<>
						Last Name <BsFillLockFill className="text-[#999999] text-base ml-2" />{' '}
					</>
				}
				placeholder="Enter last name"
			/>
			<div className="flex items-center ">
				<label className="text-gray-800 flex items-center md:text-base text-sm  tracking-tight md:justify-start pb-4 sm:pb-0 md:w-2/4 w-[70%]">
					I am
				</label>
				<select
					className={
						'w-full block bg-[#FBFBFB] border border-[#E6E6E6] border-opacity-40  text-[#333333] custom-placeholder-color md:text-base text-sm pl-3  px-2 py-2.5 rounded-md focus:outline-none  focus:border-primary decorated'
					}
					// className="w-full border h-11 rounded border-solid border-gray-850 border-opacity-40 text-sm pl-6 text-gray-600 font-bold focus:outline-none"
					onChange={(e?: any) => setGender(e.target.value)}
					value={gender === 'MALE' ? 'MALE' : gender === 'FEMALE' ? 'FEMALE' : ''}
				>
					<option
						disabled
						value=""
					>
						Choose One
					</option>
					<option
						className="bg-gray-200 "
						// selected={userData?.gender === "MALE"}
						value="MALE"
					>
						Male
					</option>
					<option
						// selected={userData?.gender === "FEMALE"}
						value="FEMALE"
					>
						Female
					</option>
				</select>
			</div>

			<div className="flex items-center">
				<label className="text-gray-800 flex items-center md:text-base text-sm  tracking-tight md:justify-start pb-4 sm:pb-0 md:w-2/4 w-[70%]">
					Birth date
					<BsFillLockFill className="text-[#999999] ml-2 text-base" />
				</label>

				<div className="sm:w-full bg-[#FBFBFB] border border-[#E6E6E6] border-opacity-40 placeholder-[#999999] text-[#333333] pl-4 custom-date-input py-1 rounded-md text-base w-[59%]">
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DesktopDatePicker
							label="Custom input"
							value={dob}
							onChange={(newValue: any) => {
								setDOB(new Date(newValue).toLocaleDateString('fr-CA'));
							}}
							renderInput={({ inputRef, inputProps, InputProps }: any) => (
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										// width: "60%",
									}}
								>
									{/* <input
                          className="focus:outline-none"
                          // placeholder={userData?.dob}
                          // defaultValue={userData?.dob}
                          // ref={inputRef}
                          // {...inputProps}

                        />
                        {InputProps?.endAdornment} */}
									<input
										className="focus:outline-none bg-[#FBFBFB] h-8 sm:w-full w-[155px] overflow-hidden"
										ref={inputRef}
										{...inputProps}
									/>
									{InputProps?.endAdornment}
								</Box>
							)}
						/>
					</LocalizationProvider>
				</div>
			</div>

			<TextField
				error={errors}
				name="email"
				mainClasses="flex items-center"
				inputClasses="w-full h-11 rounded-md p-0 py-2 md:text-base text-sm tracking-tight  bg-[#FBFBFB] border border-[#E6E6E6] placeholder-[#999999] text-[#333333] border-opacity-40"
				labelClasses="text-gray-700 flex items-center md:text-base text-sm  tracking-tight md:w-2/4 w-[70%]"
				labelvalue={
					<>
						Email Address <BsFillLockFill className="text-[#999999] text-base ml-2" />{' '}
					</>
				}
				value={email}
				onChange={(e?: any) => setEmail(e.target.value)}
				disable={true}
				placeholder="enter your email"
			/>
			<TextField
				error={errors}
				name="phone"
				mainClass="flex items-center"
				inputClasses="w-full h-11 rounded-md p-0 py-2 md:text-base text-sm tracking-tight  bg-[#FBFBFB] border border-[#E6E6E6] placeholder-[#999999] text-[#333333] border-opacity-40"
				labelClasses="text-gray-700 flex items-center md:text-base text-sm  tracking-tight md:w-2/4 w-[70%]"
				labelvalue={
					<>
						Phone Number <BsFillLockFill className="text-[#999999] text-base ml-2 " />{' '}
					</>
				}
				value={phone}
				onChange={(e?: any) => setPhone(e.target.value)}
				placeholder="+123 12512 33213"
			/>

			<TextField
				error={errors}
				name="address"
				mainClass="flex items-center"
				inputClasses="w-full h-11 rounded-md p-0 py-2 md:text-base text-sm tracking-tight  bg-[#FBFBFB] border border-[#E6E6E6] placeholder-[#999999] text-[#333333] border-opacity-40"
				labelClasses="text-gray-700 flex items-center md:text-base text-sm  tracking-tight md:w-2/4 w-[70%]"
				labelvalue={
					<>
						Address <BsFillLockFill className="text-[#999999] text-base ml-2" />{' '}
					</>
				}
				value={address}
				onChange={(e?: any) => setAddress(e.target.value)}
				placeholder="Enter your current address"
			/>
			<TextField
				error={errors}
				name="website"
				mainClass="flex items-center"
				inputClasses="w-full h-11 rounded-md p-0 py-2 md:text-base text-sm tracking-tight  bg-[#FBFBFB] border border-[#E6E6E6] placeholder-[#999999] text-[#333333] border-opacity-40"
				labelClasses="text-gray-700 md:text-base text-sm  tracking-tight md:w-2/4 w-[70%]"
				labelvalue="Website"
				value={website}
				onChange={(e?: any) => setWebsite(e.target.value)}
				placeholder="Your website"
			/>
			{/* <AddMoreInformationSkill
        mainClass="grid grid-cols-3 "
        labelClasses="text-gray-600 md:text-base text-sm"
        change={change}
        value={value}
        skillList={skillList}
      /> */}
			<div className="flex items-center">
				<Label
					value="Skills"
					classes={{
						root: `text-gray-700 md:text-base text-sm  tracking-tight md:w-2/4 w-[70%]`,
					}}
				/>
				<SimpleToolTip
					title={selectedSkills?.join(',') || ''}
					arrow
				>
					<IconLabel
						rawClick={true}
						onClick={handleClick}
						//   id={id}
						labelValue={selectedSkillsString || 'Skills & Experience'}
						mainClass="flex items-center flex-row-reverse justify-between ml-1 pl-3 pr-4 w-full overflow-hidden cursor-pointer bg-[#FBFBFB] border border-[#E6E6E6]  border-opacity-40 space-x-2 p-2 pl-1 rounded-lg"
						iconContanerClass="text-2xl text-gray-800"
						lableClass={{
							root: 'md:text-base text-sm  pr-8 tracking-tight w-full text-ellipsis	 placeholder-[#999999] text-[#333333]',
						}}
						tooltipProps={{ open: false }}
						iconComponent={
							<>
								<FaChevronDown className="text-[#999999] text-base cursor-pointer" />
							</>
						}
					/>
				</SimpleToolTip>
				<Popper
					ref={ref}
					id={id}
					open={open2}
					anchorEl={anchorEl}
					transition
					className=""
				>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps}>
							<GeneralSkill
								refSkills={skillList}
								setSkillNew={() => {
									('');
								}}
								changeSelectedSkills={change}
								userCurrentSkills={userCurrentSkills}
								getUserSkillsData={getUserSkills}
								setOpen={setOpen}
							/>
						</Fade>
					)}
				</Popper>
				{/* <PopOver
          open={open}
          handleClick={handleClick}
          onClose={handleClose}
          id={id}
          anchorEl={anchorEl}
        >
          <GeneralSkill
            setSkillNew={() => ""}
            refSkills={userData?.user_skills}
          />
        </PopOver> */}
			</div>

			<TextField
				error={errors}
				name="description"
				mainClass="flex items-start"
				inputClasses="w-full rounded-md p-0 py-2 md:text-base text-sm tracking-tight  bg-[#FBFBFB] border border-[#E6E6E6] placeholder-[#999999] text-[#333333] border-opacity-40"
				labelClasses="text-gray-700 md:text-base text-sm  tracking-tight pt-1 md:w-2/4 w-[70%]"
				labelvalue="Describe Yourself"
				placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
				multiline={true}
				value={about}
				onChange={(e?: any) => setAbout(e.target.value)}
				rows={5}
			/>
		</div>
	);
};

export default EditProfileInformation;
