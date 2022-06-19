import { useEffect, useState } from 'react';
import AboutCareerJobForm from '@organisms/about-career-job-form';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AboutCareerJobDesc from '@molecules/about-career-job-desc';
import { ApiDataType, apiService } from 'utils/request';
// import {
//   validateEmail,
//   // validateWebUrl
// } from "utils/utils";
import { toast } from 'react-toastify';

type AboutCareerJobType = any;

const AboutCareerJob = (props: AboutCareerJobType) => {
	const {
		info,
		jobIndex,
		// expanded, handleChange
	} = props;
	const jobId = info?.id;

	const [showJobDesc, setShowJobDesc] = useState<boolean>(false);
	const [showJobForm, setShowJobForm] = useState<boolean>(false);
	const [loadingJobSubmit, setLoadingJobSubmit] = useState<boolean>(false);
	const [formGlobalError, setFormGlobalError] = useState<string>('');
	const [firstName, setFirstName] = useState<string>('');
	const [firstNameError, setFirstNameError] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [lastNameError, setLastNameError] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [emailError, setEmailError] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [phoneError, setPhoneError] = useState<string>('');
	const [gender, setGender] = useState<string>('');
	const [genderError, setGenderError] = useState<string>('');
	const [location, setLocation] = useState<string>('');
	const [locationError, setLocationError] = useState<string>('');
	const [website, setWebsite] = useState<string>('');
	const [websiteError, setWebsiteError] = useState<string>('');
	const [source, setSource] = useState<string>('');
	const [sourceError, setSourceError] = useState<string>('');

	useEffect(() => {
		initialFormDisplay();
	}, []);

	const resetErrors = () => {
		setFirstNameError('');
		setLastNameError('');
		setEmailError('');
		setPhoneError('');
		setGenderError('');
		setLocationError('');
		setWebsiteError('');
		setSourceError('');
		setFormGlobalError('');
	};

	const resetformdata = () => {
		setFirstName('');
		setLastName('');
		setEmail('');
		setPhone('');
		setLocation('');
		setGender('');
		setWebsite('');
		setSource('');
	};

	const getSplittedText = (string: string): string => {
		if (!string) return '';
		const splittedString: string = string.split('_').join(' ');
		const lowercaseString: string = splittedString.trim().toLowerCase();
		return lowercaseString.charAt(0).toUpperCase() + lowercaseString.slice(1);
	};

	const onClickApplyBtn = () => {
		setShowJobDesc(false);
		setShowJobForm(true);
	};

	const onClickCancel = () => {
		initialFormDisplay();
	};

	const initialFormDisplay = () => {
		setShowJobDesc(true);
		setShowJobForm(false);
	};

	const applyErrors = (data: any) => {
		setFirstNameError((data?.first_name && data.first_name[0]) || '');
		setLastNameError((data?.last_name && data.last_name[0]) || '');
		setEmailError((data?.email && data.email[0]) || '');
		setGenderError((data?.gender && data.gender[0]) || '');
		setLocationError((data?.location && data.location[0]) || '');
		setPhoneError((data?.phone && data.phone[0]) || '');
		setWebsiteError((data?.website && data.website[0]) || '');
	};

	// const checkFormValidation = (
	//   firstName: string,
	//   lastName: string,
	//   email: string,
	//   phone: string,
	//   gender: string,
	//   // location: string,
	//   website: string,
	// ) => {
	//   let checkFirstname, checkLastName, checkEmail, checkPhone, checkGender, checkWebsite = false
	//   //--------------- Checking Fistname
	//   if(!firstName.trim()) {
	//     setFirstNameError('Please enter firstname')
	//     checkFirstname = false
	//   } else {
	//     setFirstNameError('')
	//     checkFirstname = true
	//   }
	//   //--------------- Checking Lastname
	//   if(!lastName.trim()) {
	//     setLastNameError('Please enter lastname')
	//     checkLastName = false
	//   } else {
	//     setLastNameError('')
	//     checkLastName = true
	//   }
	//   //--------------- Checking email
	//   if (!email.trim()) {
	//     setEmailError('Please enter email')
	//     checkEmail = false
	//   } else if (!validateEmail(email.trim())) {
	//     setEmailError('Please enter a valid email')
	//     checkEmail = false
	//   } else {
	//     setEmailError('')
	//     checkEmail = true
	//   }
	//   //--------------- Checking Phone number
	//   if(!phone.trim()) {
	//     setPhoneError('Please enter phone number')
	//     checkPhone = false
	//   } else {
	//     setPhoneError('')
	//     checkPhone = true
	//   }
	//   //--------------- Checking Gender
	//   if(!gender.trim()) {
	//     setGenderError('Please select gender')
	//     checkGender = false
	//   } else {
	//     setGenderError('')
	//     checkGender = true
	//   }
	//   //--------------- Checking location
	//   // if(!location.trim()) {
	//   //   setLocationError('Please enter location')
	//   //   checkLocation = false
	//   // }
	//   // // else if(location && location.trim().length > 255) {
	//   // //   setLocationError('Location must be within 255 characters')
	//   // //   checkLocation = false
	//   // // }
	//   //  else {
	//   //   setLocationError('')
	//   //   checkLocation = true
	//   // }
	//   //--------------- Checking Website
	//   if(!website.trim()) {
	//     setWebsiteError('')
	//     checkWebsite = true
	//   }
	//   // else if (website && !validateWebUrl(website.trim())) {
	//   //   setWebsiteError('Please enter a valid web address (e.g. http://johndoe.com)')
	//   //   checkWebsite = false
	//   // }
	//   else {
	//     setWebsiteError('')
	//     checkWebsite = true
	//   }

	// 	if( checkFirstname && checkLastName && checkEmail && checkPhone && checkGender && checkWebsite) return true
	//   return false
	// }

	const onSubmitJobForm = async () => {
		setLoadingJobSubmit(true);
		resetErrors();

		// if ( ! checkFormValidation( firstName, lastName, email, phone, gender, website ) ) {
		//   // console.log('checking validation---')
		//   return setLoadingJobSubmit(false)
		// }

		const formData = {
			first_name: firstName,
			last_name: lastName,
			email,
			phone,
			gender,
			location,
			website,
			source,
			job: jobId,
		};

		// return console.log('Job Post Details------', formData)
		const apiData: ApiDataType = {
			method: 'post',
			url: `/job/applicant/`,
			data: formData,
		};

		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				resetformdata();
				setFormGlobalError('');
				initialFormDisplay();
				setLoadingJobSubmit(false);
				return toast.success('Successfully applied for this job.');
			}
			applyErrors(err?.response?.data);
			// console.log('error----', err.response)
			toast.error('Failed to submit application');
			setFormGlobalError('Failed to submit application, please try again');
			setLoadingJobSubmit(false);
		});
	};

	return (
		<>
			<Accordion
				// expanded={expanded}
				// onChange={handleChange}
				className="p-0"
				// classes={{expanded: expanded ? 'text-white focus:bg-[#8f06ae]' : ''}}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon className="w-[50px] h-[40px]" />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					className={`${jobIndex == 0 ? 'first-job-custom ' : ''} bg-[#FBFBFB]`}
				>
					<div className="flex flex-col items-start">
						{info?.title && (
							<div className="text-base xl:text-[20px] capitalize text-[#101010] leading-[34px] font-[500]">
								{info?.title}
							</div>
						)}
						{(info?.position?.name || info?.job_type) && (
							<div className="text-[16px] capitalize text-[#787878] leading-[29px]">
								{`${info?.position?.name}, ${getSplittedText(info?.job_type)}`}
							</div>
						)}
					</div>
				</AccordionSummary>

				<AccordionDetails className="p-0">
					<div className="w-full shadow-lg ">
						<div className="w-full text-left bg-white md:pb-14 pb-6">
							<div className="md:px-16 p-5 overflow-y-auto w-full custom-height">
								{showJobDesc && (
									<AboutCareerJobDesc
										description={info?.description}
										onClickApply={onClickApplyBtn}
									/>
								)}
								{showJobForm && (
									<AboutCareerJobForm
										firstName={firstName}
										handleFirstName={(e: any) => setFirstName(e.target.value)}
										firstNameError={firstNameError}
										lastName={lastName}
										handleLastName={(e: any) => setLastName(e.target.value)}
										lastNameError={lastNameError}
										email={email}
										handleEmail={(e: any) => setEmail(e.target.value)}
										emailError={emailError}
										phone={phone}
										handlePhone={(e: any) => setPhone(e.target.value)}
										phoneError={phoneError}
										gender={gender}
										handleGender={(e: any) => setGender(e.target.value)}
										genderError={genderError}
										location={location}
										handleLocation={(e: any) => setLocation(e.target.value)}
										locationError={locationError}
										website={website}
										handleWebsite={(e: any) => setWebsite(e.target.value)}
										websiteError={websiteError}
										source={source}
										handleSource={(e: any) => setSource(e.target.value)}
										sourceError={sourceError}
										onSubmitForm={onSubmitJobForm}
										onClickCancel={onClickCancel}
										submitError={formGlobalError}
										loading={loadingJobSubmit}
									/>
								)}
							</div>
						</div>
					</div>
				</AccordionDetails>
			</Accordion>
		</>
	);
};

export default AboutCareerJob;
