import { FC } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import Button from '@atoms/button';
import UploadButton from '@molecules/upload-button';
import TextField from '@molecules/text-field';
// import SelectField from "@molecules/select-field";
import { IoCloseCircle } from 'react-icons/io5';
import Label from '@atoms/label';
// import SelectBasic from '@molecules/select-basic';
import { Fade, FormHelperText } from '@mui/material';

interface AboutCareerJobFormProps {
	firstName?: string;
	handleFirstName?: any;
	firstNameError?: string;
	lastName?: string;
	handleLastName?: any;
	lastNameError?: string;
	email?: string;
	handleEmail?: any;
	emailError?: string;
	phone?: string;
	handlePhone?: any;
	phoneError?: string;
	gender?: string;
	handleGender?: any;
	genderError?: string;
	location?: string;
	handleLocation?: any;
	locationError?: string;
	website?: string;
	handleWebsite?: any;
	websiteError?: string;
	source?: string;
	handleSource?: any;
	sourceError?: string;
	onSubmitForm?: (e: React.MouseEvent<HTMLElement>) => void;
	onClickCancel?: (e: React.MouseEvent<HTMLElement>) => void;
	submitError?: string;
	loading?: boolean;
}

const AboutCareerJobForm: FC<AboutCareerJobFormProps> = (props) => {
	const {
		firstName,
		handleFirstName,
		firstNameError,
		lastName,
		handleLastName,
		lastNameError,
		email,
		handleEmail,
		emailError,
		phone,
		handlePhone,
		phoneError,
		gender,
		handleGender,
		genderError,
		location,
		handleLocation,
		locationError,
		website,
		handleWebsite,
		websiteError,
		source,
		handleSource,
		sourceError,
		onSubmitForm,
		onClickCancel,
		submitError,
		loading,
	} = props;

	// const genderOptions = [
	// 	{
	// 		name: 'Male',
	// 		value: 'MALE',
	// 	},
	// 	{
	// 		name: 'Female',
	// 		value: 'FEMALE',
	// 	},
	// 	{
	// 		name: 'Other',
	// 		value: 'OTHER',
	// 	},
	// ];

	return (
		<div className="">
			{/* <label>
        <span className="mb-[10px] text-base font-[500] block">Name</span>
        <input
          {...register("title", { required: "Please enter title" })}
          className="placeholder-[#B9B9B9] text-[16px] focus:outline-none text-lg font-normal py-[10px] pl-[20px] w-full border border-solid border-[#EEEEEE] rounded-[10px] bg-[#FAFAFA]"
          placeholder="Enter Your Name"
        />

      </label> */}
			<TextField
				mainClass="flex flex-col mb-[20px] custom-job-container"
				inputClasses="w-full py-0 text-[#333333] text-[16px] tracking-tight rounded-none font-sans border border-[#ECECEC] bg-[#FBFBFB]"
				labelClasses="text-[16px] font-[500] leading-[29px] "
				labelvalue="First Name"
				placeholder="Enter your First Name "
				inputProps="text-[#B9B9B9] py-[15px] text-[16px] font-[500] leading-[29px]"
				value={firstName}
				onChange={handleFirstName}
				error={firstNameError ? true : false}
				helperText={firstNameError}
				noLabelTabIndex
			/>
			<TextField
				mainClass="flex flex-col mb-[20px]"
				inputClasses="w-full py-0 text-[#333333] text-[16px] tracking-tight rounded-none font-sans border border-[#ECECEC] bg-[#FBFBFB]"
				labelClasses="text-[16px] font-[500] leading-[29px] "
				labelvalue="Last Name"
				placeholder="Enter your Last Name "
				inputProps="text-[#B9B9B9] py-[15px] text-[16px] font-[500] leading-[29px]"
				value={lastName}
				onChange={handleLastName}
				error={lastNameError ? true : false}
				helperText={lastNameError}
				noLabelTabIndex
			/>
			<TextField
				mainClass="flex flex-col mb-[20px]"
				inputClasses="w-full py-0 text-[#333333] text-[16px] tracking-tight rounded-none font-sans border border-[#ECECEC] bg-[#FBFBFB]"
				labelClasses="text-[16px] font-[500] leading-[29px] "
				labelvalue="Email address"
				placeholder="Enter your Email address "
				inputProps="text-[#B9B9B9] py-[15px] text-[16px] font-[500] leading-[29px]"
				value={email}
				onChange={handleEmail}
				error={emailError ? true : false}
				helperText={emailError}
				noLabelTabIndex
			/>
			<TextField
				mainClass="flex flex-col mb-[20px]"
				inputClasses="w-full py-0 text-[#333333] text-[16px] tracking-tight rounded-none font-sans border border-[#ECECEC] bg-[#FBFBFB]"
				labelClasses="text-[16px] font-[500] leading-[29px] "
				labelvalue="Phone"
				placeholder="+12 232 3213 "
				inputProps="text-[#B9B9B9] py-[15px] text-[16px] font-[500] leading-[29px]"
				value={phone}
				onChange={handlePhone}
				error={phoneError ? true : false}
				helperText={phoneError}
				noLabelTabIndex
			/>
			<TextField
				mainClass="flex flex-col mb-[20px]"
				inputClasses="w-full py-0 text-[#333333] text-[16px] tracking-tight rounded-none font-sans border border-[#ECECEC] bg-[#FBFBFB]"
				labelClasses="text-[16px] font-[500] leading-[29px] "
				labelvalue="Location"
				placeholder="Enter your loaction "
				inputProps="text-[#B9B9B9] py-[15px] text-[16px] font-[500] leading-[29px]"
				value={location}
				onChange={handleLocation}
				error={locationError ? true : false}
				helperText={locationError}
				noLabelTabIndex
			/>
			<TextField
				mainClass="flex flex-col mb-[20px]"
				inputClasses="w-full py-0 text-[#333333] text-[16px] tracking-tight rounded-none font-sans border border-[#ECECEC] bg-[#FBFBFB]"
				labelClasses="text-[16px] font-[500] leading-[29px] "
				labelvalue="Website"
				placeholder="https://www.facebook.com "
				inputProps="text-[#B9B9B9] py-[15px] text-[16px] font-[500] leading-[29px]"
				value={website}
				onChange={handleWebsite}
				error={websiteError ? true : false}
				helperText={websiteError}
				noLabelTabIndex
			/>
			<TextField
				mainClass="flex flex-col mb-[20px]"
				inputClasses="w-full py-0 text-[#333333] text-[16px] tracking-tight rounded-none font-sans border border-[#ECECEC] bg-[#FBFBFB]"
				labelClasses="text-[16px] font-[500] leading-[29px] "
				labelvalue="How did you hear about this job"
				placeholder="Enter your first name"
				inputProps="text-[#B9B9B9] py-[15px] text-[16px] font-[500] leading-[29px]"
				value={source}
				onChange={handleSource}
				error={sourceError ? true : false}
				helperText={sourceError}
				disabled={loading}
				noLabelTabIndex
			/>
			<div className="flex flex-col mb-[20px]">
				<Label
					tabIndex="-1"
					value={'Gender'}
					classes={{
						root: `text-[16px] font-[500] leading-[29px]`,
					}}
				/>
				<div className="flex-1">
					{/* <SelectBasic
						value={gender}
						options={genderOptions}
						handleChange={handleGender}
						placeholder={'Select gender'}
						error={genderError ? true : false}
						helpText={genderError}
						selectClasses="w-full py-0 text-[#333333] text-[16px] tracking-tight rounded-none font-sans border border-[#ECECEC] bg-[#FBFBFB]"
					/> */}

					<select
						className={` form-select w-full py-[15px] text-[#333333] text-[16px] outline-none rounded-none font-proxima-nova border border-[#ECECEC] bg-[#FBFBFB] ${
							genderError ? ' border-red-600' : ''
						}`}
						// className="w-full border h-11 rounded border-solid border-gray-850 border-opacity-40 text-sm pl-6 text-gray-600 font-bold focus:outline-none"
						onChange={handleGender}
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

					<Fade in={genderError ? true : false}>
						<FormHelperText
							className={`text-lg mt-1 ${genderError ? ' text-red-600' : ''}`}
						>
							{genderError}
						</FormHelperText>
					</Fade>
				</div>
			</div>

			{/* TODO: Dynamic the file upload input fields after resolving api dependency */}
			<div className="hidden">
				<div className="grid grid-cols-1 md:grid-cols-2 space-y-2 md:space-x-4 md:space-y-0 lg:flex justify-between w-full pt-4">
					<div className="flex items-start space-x-3">
						<h2 className="text-[#101010] font-semibold texl-lg 2xl:text-2xl font-sans whitespace-nowrap tracking-tight w-48 pt-2">
							Resume/ CV
						</h2>
						<UploadButton
							mainClass="pb-2 w-full"
							btnClass="border bg-gray-375 border-gray-200 border-dashed xl:w-48 w-full cursor-pointer rounded-full px-2 flex items-center justify-center"
							iconMainClass="flex flex-row-reverse justify-end w-full items-center"
							lableClass="text-gray-670 pl-2 text-base 2xl:text-xl tracking-tight"
							labelClass="text-gray-670 p-1 py-2 text-base 2xl:text-xl font-sans tracking-tight"
							value="Add file"
							btnValue="Choose"
							labelValue="pdf,2..."
							icon={<BsFillCloudUploadFill className="text-primary text-3xl mr-1" />}
							iconComponent={<IoCloseCircle className="text-2xl" />}
						/>
					</div>
					<div className="flex items-start space-x-3">
						<h2 className="text-[#101010] font-semibold texl-lg 2xl:text-2xl font-sans whitespace-nowrap tracking-tight w-48 pt-2">
							Cover Letter
						</h2>
						<UploadButton
							mainClass="pb-2 w-full"
							btnClass="border bg-gray-375 border-gray-200 border-dashed xl:w-48 w-full cursor-pointer rounded-full px-2 flex items-center justify-center"
							iconMainClass="flex flex-row-reverse justify-end w-full items-center"
							lableClass="text-gray-670 pl-2 text-base 2xl:text-xl tracking-tight"
							labelClass="text-gray-670 p-1 py-2 text-base 2xl:text-xl font-sans tracking-tight"
							value="Add file"
							btnValue="Choose"
							labelValue="pdf,2..."
							icon={<BsFillCloudUploadFill className="text-primary text-3xl mr-1" />}
							iconComponent={<IoCloseCircle className="text-2xl" />}
						/>
					</div>
				</div>
			</div>
			<div className="text-right">
				<p className="text-red-700 text-base mt-2">{submitError}</p>
			</div>
			<div className="flex items-center justify-between w-full">
				<Button
					value="Cancel"
					className="border border-solid  border-gray-400 text-gray-700 mt-4 text-[16px] capitalize px-[30px] py-[15px] shadow-none"
					onClick={onClickCancel}
				/>
				<Button
					type="button"
					onClick={onSubmitForm}
					value="Apply Now"
					className="text-white text-[16px] mt-4 bg-primary capitalize px-[30px] py-[15px] shadow-none"
					color="primary"
					loading={loading}
				/>
			</div>
		</div>
	);
};

export default AboutCareerJobForm;
