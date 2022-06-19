import React, { useState } from 'react';

import Modal from '@atoms/modal';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
	closeSignUpPopupManufacturer,
	// closeSignUpPopctu
} from 'reducers/signup';
import { openLoginPopup } from 'reducers/login';
import { Fade, FormControlLabel, FormHelperText, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { isValid } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import Steppers from '@molecules/steppers';
// import { GiBigGear } from "react-icons/gi";
import { AiOutlineUser } from 'react-icons/ai';

import Label from '@atoms/label';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import Button from '@atoms/button';
// import { RiAttachment2 } from "react-icons/ri";
import CheckboxAtom from '@atoms/checkbox';
import { useRouter } from 'next/router';
import { IoClose } from 'react-icons/io5';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

function ManufacturerSignUpPopup() {
	const dispatch = useAppDispatch();
	const [step, setStep] = useState(0);

	const isSignUpPopUp = useAppSelector(
		({ signupPopUp }) => signupPopUp.openSignUpPopupManufacturer
	);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const router = useRouter();
	const helpTextClasses = 'text-base italic eina-font-r03 mt-1';
	const {
		register,
		handleSubmit,
		control,
		// setError,
		getValues,
		// resetField,
		// clearErrors,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			password_confirm: '',
			dob: '',
			newsletter: false,
			agree_policy: false,
			company_name: '',
			manufacturer_email: '',
			phone_number: '',
			address: '',
			preferred_language: '',
			website: '',
			company_description: '',
			number_of_employees: '',
			business_line: '',
			expertise: '',
		},
	});

	const handlerSubmit = () => {
		setStep(1);
	};
	const handlerManufacturerInformationSubmit = () => {
		setStep(2);
	};

	return (
		<div>
			<Modal
				className={{
					paper: 'pb-[25px] px-[10px] md:px-[30px] pt-[25px] rounded-xl w-[700px]',
				}}
				width="md"
				close={() => {
					dispatch(closeSignUpPopupManufacturer());
					setStep(0);
				}}
				header={
					<>
						<div className="flex justify-between items-center mb-[24px] pr-[15px]">
							<div className="text-[24px] leading-[41px] text-[#333333] font-poppins">
								Manufacturer sign up
							</div>
							<IoClose
								className="text-red-600 text-2xl cursor-pointer"
								onClick={() => dispatch(closeSignUpPopupManufacturer())}
							/>
						</div>
						<div className="flex justify-center manufacturer-signup">
							<Steppers
								currentStep={step}
								className="md:w-3/4 w-full eina-font-sb03 md:text-2xl"
								options={['step 1', 'step 2', 'step 3']}
								stepStyle=" w-[50px] h-[50px] text-center font-sans rounded-full border-2 border-[#E6E6E6] text-2xl flex items-center justify-center overflow-hidden"
								trueStyle="border-none"
								icons={{
									1: (
										<span>
											<AiOutlineUser />
										</span>
									),
									2: (
										<span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="25"
												height="26"
												viewBox="0 0 25 26"
												fill="#F301C3"
												stroke="#F301C3"
											>
												<path
													d="M21.8019 11.0008C21.341 11.0014 20.8944 11.1609 20.5374 11.4524C20.1804 11.7439 19.9348 12.1495 19.842 12.601H14.9608C14.8683 12.163 14.6309 11.769 14.2871 11.4823L15.6387 9.0012H17.042C17.1411 9.48687 17.4171 9.91844 17.8163 10.2122C18.2155 10.506 18.7096 10.6411 19.2028 10.5913C19.6959 10.5415 20.153 10.3104 20.4855 9.94268C20.8179 9.57499 21.0019 9.09697 21.0019 8.60129C21.0019 8.10561 20.8179 7.62759 20.4855 7.25991C20.153 6.89222 19.6959 6.66107 19.2028 6.61126C18.7096 6.56146 18.2155 6.69655 17.8163 6.99035C17.4171 7.28414 17.1411 7.71571 17.042 8.20138H15.8015V5.56354L17.1669 4.20048H19.0422C19.1413 4.68615 19.4172 5.11772 19.8164 5.41152C20.2157 5.70531 20.7097 5.8404 21.2029 5.7906C21.6961 5.74079 22.1532 5.50964 22.4856 5.14196C22.818 4.77427 23.0021 4.29625 23.0021 3.80057C23.0021 3.30489 22.818 2.82687 22.4856 2.45919C22.1532 2.0915 21.6961 1.86035 21.2029 1.81054C20.7097 1.76074 20.2157 1.89583 19.8164 2.18963C19.4172 2.48342 19.1413 2.91499 19.0422 3.40066H17.1669C16.9549 3.40114 16.7516 3.4853 16.6013 3.63484L16.2584 3.97831C15.9773 3.87432 15.6911 3.78454 15.401 3.7093V1.80042C15.4008 1.58829 15.3165 1.38488 15.1666 1.23483C15.0166 1.08477 14.8133 1.00032 14.6011 1L11.4007 1C11.1886 1.00032 10.9854 1.08469 10.8355 1.23461C10.6855 1.38454 10.6012 1.58779 10.6008 1.79982V3.7081C9.73141 3.92938 8.89784 4.27307 8.12512 4.72889L6.78308 3.38865C6.70899 3.31237 6.6203 3.25179 6.52229 3.21053C6.42429 3.16926 6.31898 3.14816 6.21264 3.14847C6.10717 3.14799 6.00269 3.16874 5.90541 3.20949C5.80813 3.25024 5.72004 3.31015 5.6464 3.38565L3.38865 5.6422C3.31276 5.71614 3.25238 5.80448 3.21104 5.90204C3.16971 5.9996 3.14824 6.10443 3.14791 6.21038C3.14757 6.31634 3.16837 6.4213 3.20909 6.51912C3.24981 6.61694 3.30963 6.70566 3.38505 6.78008L4.73009 8.12512C4.27443 8.89814 3.93075 9.73188 3.7093 10.6014H1.79982C1.58779 10.6018 1.38454 10.6861 1.23461 10.8361C1.08469 10.986 1.00032 11.1892 1 11.4013L1 14.6017C1.00032 14.8138 1.08469 15.017 1.23461 15.1669C1.38454 15.3169 1.58779 15.4012 1.79982 15.4016H3.7075C3.92894 16.2711 4.27263 17.1049 4.72829 17.8779L3.38865 19.2193C3.31285 19.2933 3.25255 19.3816 3.21127 19.4791C3.16998 19.5766 3.14855 19.6813 3.14821 19.7872C3.14788 19.8931 3.16865 19.998 3.20931 20.0957C3.24998 20.1935 3.30972 20.2822 3.38505 20.3566L5.6416 22.6131C5.71553 22.6895 5.80411 22.7501 5.90203 22.7913C5.99994 22.8326 6.10518 22.8537 6.21144 22.8533C6.31715 22.854 6.42191 22.8334 6.51949 22.7928C6.61708 22.7521 6.70549 22.6923 6.77948 22.6168L8.12512 21.2717C8.89785 21.7275 9.73142 22.0712 10.6008 22.2925V24.2002C10.6012 24.4122 10.6855 24.6155 10.8355 24.7654C10.9854 24.9153 11.1886 24.9997 11.4007 25H14.6011C14.8132 24.9997 15.0164 24.9153 15.1663 24.7654C15.3163 24.6155 15.4006 24.4122 15.401 24.2002V22.2937C15.6911 22.2185 15.9773 22.1287 16.2584 22.0247L16.6013 22.3682C16.7516 22.5177 16.9549 22.6019 17.1669 22.6023H19.0422C19.1413 23.088 19.4172 23.5196 19.8164 23.8134C20.2157 24.1072 20.7097 24.2423 21.2029 24.1925C21.6961 24.1427 22.1532 23.9115 22.4856 23.5438C22.818 23.1761 23.0021 22.6981 23.0021 22.2024C23.0021 21.7068 22.818 21.2287 22.4856 20.861C22.1532 20.4934 21.6961 20.2622 21.2029 20.2124C20.7097 20.1626 20.2157 20.2977 19.8164 20.5915C19.4172 20.8853 19.1413 21.3169 19.0422 21.8025H17.1669L15.8015 20.4365V17.8016H17.042C17.1411 18.2873 17.4171 18.7189 17.8163 19.0127C18.2155 19.3065 18.7096 19.4415 19.2028 19.3917C19.6959 19.3419 20.153 19.1108 20.4855 18.7431C20.8179 18.3754 21.0019 17.8974 21.0019 17.4017C21.0019 16.906 20.8179 16.428 20.4855 16.0603C20.153 15.6926 19.6959 15.4615 19.2028 15.4117C18.7096 15.3619 18.2155 15.497 17.8163 15.7908C17.4171 16.0846 17.1411 16.5161 17.042 17.0018H15.6387L14.2871 14.5207C14.6309 14.234 14.8683 13.84 14.9608 13.402H19.842C19.918 13.7727 20.0976 14.1142 20.3598 14.3869C20.6221 14.6595 20.9564 14.8523 21.3238 14.9426C21.6912 15.0329 22.0767 15.0172 22.4356 14.8972C22.7944 14.7773 23.1119 14.558 23.3511 14.2648C23.5903 13.9717 23.7414 13.6167 23.787 13.2411C23.8326 12.8655 23.7706 12.4847 23.6084 12.1428C23.4462 11.801 23.1904 11.5122 22.8706 11.3099C22.5509 11.1077 22.1803 11.0002 21.8019 11.0001V11.0008ZM21.0021 2.60024C21.2396 2.60024 21.4718 2.67067 21.6693 2.80263C21.8668 2.93459 22.0207 3.12215 22.1116 3.34159C22.2025 3.56104 22.2263 3.8025 22.18 4.03546C22.1336 4.26842 22.0192 4.4824 21.8513 4.65036C21.6833 4.81831 21.4693 4.93269 21.2364 4.97903C21.0034 5.02536 20.762 5.00158 20.5425 4.91069C20.3231 4.81979 20.1355 4.66586 20.0036 4.46837C19.8716 4.27088 19.8012 4.03869 19.8012 3.80117C19.8012 3.48266 19.9277 3.1772 20.1529 2.95198C20.3781 2.72677 20.6836 2.60024 21.0021 2.60024ZM21.0021 21.0021C21.2396 21.0021 21.4718 21.0725 21.6693 21.2045C21.8668 21.3365 22.0207 21.524 22.1116 21.7435C22.2025 21.9629 22.2263 22.2044 22.18 22.4373C22.1336 22.6703 22.0192 22.8843 21.8513 23.0522C21.6833 23.2202 21.4693 23.3345 21.2364 23.3809C21.0034 23.4272 20.762 23.4034 20.5425 23.3125C20.3231 23.2217 20.1355 23.0677 20.0036 22.8702C19.8716 22.6727 19.8012 22.4406 19.8012 22.203C19.8012 21.8845 19.9277 21.5791 20.1529 21.3538C20.3781 21.1286 20.6836 21.0021 21.0021 21.0021ZM13.0009 14.2012C12.7634 14.2012 12.5312 14.1308 12.3337 13.9988C12.1362 13.8669 11.9823 13.6793 11.8914 13.4599C11.8005 13.2404 11.7767 12.999 11.823 12.766C11.8694 12.5331 11.9838 12.3191 12.1517 12.1511C12.3197 11.9832 12.5337 11.8688 12.7666 11.8224C12.9996 11.7761 13.241 11.7999 13.4605 11.8908C13.6799 11.9817 13.8675 12.1356 13.9994 12.3331C14.1314 12.5306 14.2018 12.7628 14.2018 13.0003C14.2018 13.3188 14.0753 13.6243 13.8501 13.8495C13.6249 14.0747 13.3194 14.2012 13.0009 14.2012ZM19.0014 7.40096C19.2389 7.40096 19.4711 7.47139 19.6686 7.60335C19.866 7.73531 20.02 7.92287 20.1109 8.14232C20.2018 8.36176 20.2255 8.60322 20.1792 8.83618C20.1329 9.06914 20.0185 9.28312 19.8505 9.45108C19.6826 9.61903 19.4686 9.73341 19.2356 9.77975C19.0027 9.82609 18.7612 9.8023 18.5418 9.71141C18.3223 9.62051 18.1348 9.46658 18.0028 9.26909C17.8709 9.0716 17.8004 8.83941 17.8004 8.60189C17.8004 8.28338 17.9269 7.97792 18.1522 7.75271C18.3774 7.52749 18.6828 7.40096 19.0014 7.40096ZM14.9146 21.5876C14.8257 21.6072 14.7462 21.6566 14.6892 21.7276C14.6323 21.7986 14.6012 21.8868 14.6011 21.9779V24.1996H11.4007V21.9779C11.4007 21.8866 11.3695 21.798 11.3123 21.7269C11.255 21.6558 11.1752 21.6064 11.086 21.587C10.0895 21.3685 9.13923 20.9762 8.27884 20.4281C8.20203 20.3795 8.11101 20.3585 8.02069 20.3684C7.93036 20.3783 7.84609 20.4186 7.78166 20.4827L6.21144 22.0517L3.95129 19.7886L5.5191 18.2207C5.58337 18.1564 5.62381 18.0721 5.63374 17.9818C5.64368 17.8914 5.62251 17.8003 5.57374 17.7236C5.02576 16.8631 4.63348 15.9128 4.41485 14.9164C4.39541 14.8273 4.34611 14.7475 4.27512 14.6903C4.20413 14.6331 4.11572 14.6018 4.02454 14.6017H1.80282V11.4013H4.02454C4.11572 11.4012 4.20413 11.3699 4.27512 11.3127C4.34611 11.2555 4.39541 11.1757 4.41485 11.0866C4.63347 10.0902 5.02575 9.13993 5.57374 8.27944C5.62262 8.20274 5.64385 8.11164 5.63391 8.02123C5.62398 7.93082 5.58347 7.84651 5.5191 7.78226L3.95129 6.21144L6.21384 3.95129L7.78166 5.5191C7.84597 5.58337 7.93027 5.62381 8.02065 5.63374C8.11103 5.64368 8.2021 5.62251 8.27884 5.57374C9.13979 5.02551 10.0907 4.63341 11.0878 4.41545C11.1769 4.39588 11.2567 4.34647 11.3139 4.27538C11.3712 4.20429 11.4024 4.1158 11.4025 4.02454V1.80282H14.6029V4.02454C14.603 4.11556 14.6341 4.20384 14.691 4.2748C14.748 4.34577 14.8275 4.39517 14.9164 4.41485C15.1638 4.47009 15.4016 4.53494 15.6315 4.6064L15.2376 5.0003C15.1631 5.07441 15.1041 5.16256 15.0639 5.25965C15.0237 5.35675 15.0031 5.46085 15.0035 5.56594V6.08414C13.9308 5.77361 12.8007 5.7168 11.7023 5.91821C10.604 6.11961 9.56749 6.5737 8.67482 7.24459C7.78215 7.91549 7.05775 8.7848 6.55886 9.78383C6.05996 10.7829 5.80026 11.8842 5.80026 13.0009C5.80026 14.1176 6.05996 15.2189 6.55886 16.218C7.05775 17.217 7.78215 18.0863 8.67482 18.7572C9.56749 19.4281 10.604 19.8822 11.7023 20.0836C12.8007 20.285 13.9308 20.2282 15.0035 19.9177V20.4359C15.0032 20.5409 15.0237 20.645 15.0639 20.7421C15.1041 20.8392 15.1632 20.9274 15.2376 21.0015L15.6315 21.3954C15.3998 21.4681 15.162 21.5329 14.9146 21.5876ZM19.002 16.2014C19.2395 16.2014 19.4717 16.2718 19.6692 16.4038C19.8666 16.5357 20.0206 16.7233 20.1115 16.9427C20.2024 17.1622 20.2261 17.4036 20.1798 17.6366C20.1335 17.8696 20.0191 18.0835 19.8511 18.2515C19.6832 18.4195 19.4692 18.5338 19.2362 18.5802C19.0033 18.6265 18.7618 18.6027 18.5424 18.5118C18.3229 18.4209 18.1354 18.267 18.0034 18.0695C17.8715 17.872 17.801 17.6398 17.801 17.4023C17.801 17.0839 17.9275 16.7785 18.1526 16.5533C18.3776 16.3281 18.6829 16.2015 19.0014 16.2014H19.002ZM15.0017 17.5032V19.074C14.0399 19.3929 13.0161 19.4788 12.0146 19.3248C11.0131 19.1707 10.0625 18.7811 9.241 18.188C8.41948 17.5949 7.75052 16.8151 7.28916 15.913C6.8278 15.0109 6.58723 14.0121 6.58723 12.9988C6.58723 11.9855 6.8278 10.9867 7.28916 10.0846C7.75052 9.18246 8.41948 8.40275 9.241 7.80961C10.0625 7.21647 11.0131 6.82686 12.0146 6.67283C13.0161 6.51879 14.0399 6.60474 15.0017 6.92359V8.49681L13.5858 11.0962C13.397 11.0347 13.2 11.0019 13.0015 10.9989C12.471 10.9989 11.9623 11.2097 11.5872 11.5848C11.2121 11.9599 11.0014 12.4686 11.0014 12.9991C11.0014 13.5296 11.2121 14.0383 11.5872 14.4134C11.9623 14.7885 12.471 14.9992 13.0015 14.9992C13.2 14.9963 13.397 14.9635 13.5858 14.902L15.0017 17.5032ZM21.8025 14.2006C21.565 14.2006 21.3328 14.1302 21.1353 13.9982C20.9378 13.8663 20.7839 13.6787 20.693 13.4593C20.6021 13.2398 20.5783 12.9984 20.6247 12.7654C20.671 12.5325 20.7854 12.3185 20.9533 12.1505C21.1213 11.9826 21.3353 11.8682 21.5682 11.8218C21.8012 11.7755 22.0427 11.7993 22.2621 11.8902C22.4815 11.9811 22.6691 12.135 22.8011 12.3325C22.933 12.53 23.0035 12.7622 23.0035 12.9997C23.0035 13.1575 22.9725 13.3138 22.9122 13.4596C22.8518 13.6054 22.7633 13.7379 22.6517 13.8495C22.5401 13.9611 22.4076 14.0496 22.2618 14.1099C22.116 14.1703 21.9597 14.2013 21.8019 14.2012L21.8025 14.2006Z"
													// fill="#F301C3"

													strokeWidth="0.5"
												/>
											</svg>
										</span>
									),
									3: (
										<span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="26"
												height="26"
												viewBox="0 0 26 26"
												fill="#F301C3"
												stroke="#F301C3"
											>
												<path
													d="M15.3725 10.6279L14.7474 10.0028C14.2717 9.52695 13.7069 9.14952 13.0853 8.89201C12.4637 8.6345 11.7974 8.50195 11.1246 8.50195C10.4518 8.50195 9.78554 8.6345 9.16394 8.89201C8.54234 9.14952 7.97756 9.52695 7.50185 10.0028L2.50081 15.0038C2.025 15.4795 1.64756 16.0443 1.39005 16.6659C1.13254 17.2875 1 17.9537 1 18.6266C1 19.2994 1.13254 19.9656 1.39005 20.5872C1.64756 21.2088 2.025 21.7736 2.50081 22.2493L3.75107 23.4996C4.22678 23.9754 4.79156 24.3528 5.41316 24.6103C6.03476 24.8679 6.701 25.0004 7.37383 25.0004C8.04666 25.0004 8.7129 24.8679 9.33449 24.6103C9.95609 24.3528 10.5209 23.9754 10.9966 23.4996L12.872 21.6242C12.9395 21.5594 12.9935 21.4818 13.0307 21.3959C13.0678 21.3101 13.0875 21.2176 13.0885 21.124C13.0895 21.0304 13.0718 20.9376 13.0364 20.851C13.001 20.7643 12.9487 20.6856 12.8826 20.6194C12.8164 20.5532 12.7377 20.5009 12.651 20.4656C12.5644 20.4302 12.4715 20.4125 12.3779 20.4135C12.2844 20.4145 12.1919 20.4341 12.106 20.4713C12.0201 20.5085 11.9425 20.5624 11.8778 20.63L10.0024 22.5054C9.3049 23.2016 8.35968 23.5926 7.37419 23.5926C6.38871 23.5926 5.44349 23.2016 4.74602 22.5054L3.49722 21.2551C2.80078 20.5576 2.40962 19.6122 2.40962 18.6266C2.40962 17.6409 2.80078 16.6955 3.49722 15.998L8.49826 10.997C9.19576 10.3006 10.1411 9.90939 11.1268 9.90939C12.1125 9.90939 13.0578 10.3006 13.7553 10.997L14.3805 11.6221C14.5132 11.7494 14.6906 11.8196 14.8745 11.8177C15.0584 11.8158 15.2343 11.7418 15.3643 11.6118C15.4944 11.4817 15.5683 11.3059 15.5703 11.1219C15.5722 10.938 15.502 10.7607 15.3747 10.6279H15.3725Z"
													// fill="#F301C3"
													// stroke="#F301C3"
													strokeWidth="0.5"
												/>
												<path
													d="M23.5001 3.75107L22.2469 2.50081C21.7712 2.025 21.2064 1.64756 20.5848 1.39005C19.9632 1.13254 19.297 1 18.6242 1C17.9513 1 17.2851 1.13254 16.6635 1.39005C16.0419 1.64756 15.4771 2.025 15.0014 2.50081L13.1289 4.3762C13.0016 4.50896 12.9314 4.68632 12.9334 4.87025C12.9353 5.05417 13.0092 5.23001 13.1393 5.36007C13.2693 5.49013 13.4452 5.56405 13.6291 5.56599C13.813 5.56792 13.9904 5.49772 14.1231 5.37042L15.9985 3.49503C16.696 2.79882 17.6412 2.40779 18.6267 2.40779C19.6122 2.40779 20.5574 2.79882 21.2549 3.49503L22.5051 4.74529C23.2016 5.44279 23.5927 6.38817 23.5927 7.37383C23.5927 8.35949 23.2016 9.30487 22.5051 10.0024L17.5056 15.0056C16.8081 15.702 15.8627 16.0932 14.877 16.0932C13.8914 16.0932 12.946 15.702 12.2485 15.0056L11.6234 14.3805C11.5586 14.3129 11.481 14.259 11.3951 14.2218C11.3092 14.1846 11.2168 14.165 11.1232 14.164C11.0296 14.163 10.9368 14.1807 10.8501 14.2161C10.7635 14.2514 10.6847 14.3037 10.6185 14.3699C10.5524 14.4361 10.5001 14.5148 10.4647 14.6014C10.4294 14.6881 10.4117 14.7809 10.4126 14.8745C10.4136 14.9681 10.4333 15.0605 10.4704 15.1464C10.5076 15.2323 10.5616 15.3099 10.6291 15.3747L11.2543 15.9998C11.73 16.4756 12.2948 16.8531 12.9164 17.1106C13.538 17.3681 14.2042 17.5006 14.877 17.5006C15.5498 17.5006 16.2161 17.3681 16.8377 17.1106C17.4593 16.8531 18.0241 16.4756 18.4998 15.9998L23.5008 10.9988C23.9766 10.5231 24.3541 9.95828 24.6116 9.33668C24.8691 8.71508 25.0016 8.04885 25.0016 7.37602C25.0016 6.70319 24.8691 6.03695 24.6116 5.41535C24.3541 4.79375 23.9766 4.22897 23.5008 3.75325L23.5001 3.75107Z"
													// fill="#F301C3"
													// stroke="#F301C3"
													strokeWidth="0.5"
												/>
											</svg>
										</span>
									),
								}}
							/>
						</div>
					</>
				}
				content={
					<>
						{step === 0 && (
							<div className=" mx-2  pb-4 mt-5 md:mt-14">
								<Label
									className="text-[#999999] font-sans text-center text-lg 2xl:text-2xl eina-font-r03 mb-4"
									value={
										<div>
											<div className="flex justify-center items-center py-[15px] rounded-[6px] bg-[#4568B2] cursor-pointer mb-[20px]">
												<BsFacebook
													className="text-white mr-[17px]"
													size={20}
												/>
												<div className="text-[18px] leading-[27px] font-[500] text-white">
													Continue with Facebook
												</div>
											</div>
											<div className="flex justify-center items-center py-[15px] border rounded-[6px] bg-[#FBFBFB] cursor-pointer">
												<FcGoogle
													className="mr-[17px] ml-[-25px]"
													size={20}
												/>
												<div className="text-[18px] leading-[27px] font-[500] text-[#333333]">
													Continue with Google
												</div>
											</div>
										</div>
									}
								/>
								<div className="flex items-center mb-[10px]">
									<div className="w-[299px] h-[1px] bg-[#E6E6E6]"></div>
									<div className="text-[20px] leading-[34px] text-center text-[#999999] px-[9px]">
										or
									</div>
									<div className="w-[299px] h-[1px] bg-[#E6E6E6]"></div>
								</div>
								{/* <Label
                  classes={{
                    root: " font-bold text-2xl 2xl:text-3xl text-[#3E3E3E] mb-5",
                  }}
                  value={"Contact information"}
                /> */}
								<form
									onSubmit={handleSubmit(handlerSubmit)}
									className="w-100 mb-3"
								>
									<div className="grid grid-cols-2 gap-2 mb-3">
										{/* STARTs: FirstName Input ---------------*/}
										<div>
											<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
												First name
											</div>
											<input
												type="text"
												placeholder="Enter your first name"
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.first_name?.message
														? ' border-red-300'
														: 'border-[#E6E6E6]'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none`}
												{...register('first_name', {
													required: 'Enter first name',
												})}
											/>
											{errors?.first_name?.message && (
												<Fade
													in={
														(errors?.first_name?.message && true) ||
														false
													}
												>
													<FormHelperText
														className={`${helpTextClasses}${
															errors?.first_name?.message
																? ' text-red-500'
																: ''
														}`}
													>
														{errors?.first_name?.message}
													</FormHelperText>
												</Fade>
											)}
										</div>
										{/* ENDs: FirstName Input ---------------*/}

										{/* STARTs: LastName Input ---------------*/}
										<div>
											<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
												Last name
											</div>
											<input
												type="text"
												placeholder="Enter your last Name"
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.last_name?.message
														? ' border-red-300'
														: 'border-[#E6E6E6]'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none`}
												{...register('last_name', {
													required: 'Enter last name',
												})}
											/>
											{errors?.last_name?.message && (
												<Fade
													in={
														(errors?.last_name?.message && true) ||
														false
													}
												>
													<FormHelperText
														className={`${helpTextClasses}${
															errors?.last_name?.message
																? ' text-red-500'
																: ''
														}`}
													>
														{errors?.last_name?.message}
													</FormHelperText>
												</Fade>
											)}
										</div>
									</div>
									<div className="mb-3">
										<div className="relative">
											<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
												Email address
											</div>
											<input
												type="email"
												placeholder="Enter your email address"
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.email?.message
														? ' border-red-300'
														: 'border-[#E6E6E6]'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
												{...register('email', {
													required: 'Enter email address',
												})}
											/>
											{/* {!errors?.email && (
                      <AiFillCheckCircle className="text-lg absolute right-5 text-[#561f80] font-bold" />
                    )} */}
										</div>
										{errors?.email?.message && (
											<Fade in={(errors?.email?.message && true) || false}>
												<FormHelperText
													className={`${helpTextClasses}${
														errors?.email?.message
															? ' text-red-500'
															: ''
													}`}
												>
													{errors?.email?.message}
												</FormHelperText>
											</Fade>
										)}
									</div>
									<div className="mb-3">
										<div className="relative">
											<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
												Create a Password
											</div>
											<input
												type={passwordVisible ? 'text' : 'password'}
												placeholder="Create a Password"
												{...register('password', {
													required: 'Enter valid password',
													minLength: {
														value: 8,
														message:
															'Password must be be atleast 8 characters',
													},
												})}
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.password?.message
														? ' border-red-300'
														: 'border-[#E6E6E6]'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
											/>
											{passwordVisible ? (
												<FaRegEye
													onClick={() =>
														setPasswordVisible((prev) => !prev)
													}
													className="text-[24px] absolute right-5 top-[41px] md:top-[50px] cursor-pointer"
												/>
											) : (
												<FaRegEyeSlash
													onClick={() =>
														setPasswordVisible((prev) => !prev)
													}
													className="text-[24px] absolute right-5 top-[41px] md:top-[50px] cursor-pointer"
												/>
											)}
										</div>
										{errors?.password?.message && (
											<Fade in={(errors?.password?.message && true) || false}>
												<FormHelperText
													className={`${helpTextClasses}${
														errors?.password?.message
															? ' text-red-500'
															: ''
													}`}
												>
													{errors?.password?.message}
												</FormHelperText>
											</Fade>
										)}
									</div>
									<div className="mb-3">
										<div className="relative">
											<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
												Confirm Password
											</div>
											<input
												type={passwordVisible ? 'text' : 'password'}
												placeholder="Confirm your password"
												{...register('password_confirm', {
													required: 'Confirm your password',
													validate: (value) =>
														value === getValues('password') ||
														'Confirm password does not match',
												})}
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.password_confirm?.message
														? ' border-red-300'
														: 'border-[#E6E6E6]'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none`}
											/>
											{passwordVisible ? (
												<FaRegEye
													onClick={() =>
														setPasswordVisible((prev) => !prev)
													}
													className="text-[24px] absolute right-5 top-[41px] md:top-[50px] cursor-pointer"
												/>
											) : (
												<FaRegEyeSlash
													onClick={() =>
														setPasswordVisible((prev) => !prev)
													}
													className="text-[24px] absolute right-5 top-[41px] md:top-[50px] cursor-pointer"
												/>
											)}
										</div>
										{errors?.password_confirm?.message && (
											<Fade
												in={
													(errors?.password_confirm?.message && true) ||
													false
												}
											>
												<FormHelperText
													className={`${helpTextClasses}${
														errors?.password_confirm?.message
															? ' text-red-500'
															: ''
													}`}
												>
													{errors?.password_confirm?.message}
												</FormHelperText>
											</Fade>
										)}
									</div>
									<div>
										<Label
											value="Birthday"
											className="mt-3 text-[#333333] font-[500] leading-[41px] text-[24px] font-poppins"
										/>
										<Label
											value="Other people won't see your birthday."
											className=" mb-2 text-[#787878] leading-[29px] text-[16px] font-poppins"
										/>
										<Controller
											name="dob"
											control={control}
											rules={{
												required: 'Enter date of birth',
												validate: (value) =>
													isValid(value) == true || 'Enter a valid date',
											}}
											render={({ field }) => (
												<LocalizationProvider dateAdapter={AdapterDateFns}>
													<DatePicker
														{...field}
														inputFormat="dd-MM-yyyy"
														mask="__-__-____"
														className="text-[#B9B9B9]"
														renderInput={(params) => (
															<TextField
																// rows={1}
																placeholder="Enter your birthday"
																className={`w-full border border-solid bg-[#FBFBFB] rounded-[6px] font-poppins ${
																	errors?.dob?.message
																		? ' border-red-300'
																		: 'border-[#E6E6E6]'
																} text-[#B9B9B9] text-lg focus:outline-none`}
																{...params}
															/>
														)}
													/>
												</LocalizationProvider>
											)}
										/>
										{errors?.dob?.message && (
											<Fade in={(errors?.dob?.message && true) || false}>
												<FormHelperText
													className={`${helpTextClasses}${
														errors?.dob?.message ? ' text-red-500' : ''
													}`}
												>
													{errors?.dob?.message}
												</FormHelperText>
											</Fade>
										)}
									</div>
									<Button
										type="submit"
										value="Next"
										variant="contained"
										color="primary"
										// loading={loading}
										className="text-[18px] font-poppins mt-2 leading-[27px] bg-primary text-white rounded-md tracking-tight w-full shadow-none transform-none py-[15px]"
									/>
								</form>
							</div>
						)}
						{step === 1 && (
							<div className=" mx-2  pb-4 mt-5 md:mt-14">
								<Label
									classes={{
										root: ' font-500 font-poppins leading-[41px] text-[24px] text-[#3E3E3E]',
									}}
									value={'Manufacturer information'}
								/>
								<Label
									classes={{
										root: ' font-normal text-[16px] text-[#787878] leading-[29px] mb-[22px]',
									}}
									value={'Please feel out this for additional info about you'}
								/>
								<form
									onSubmit={handleSubmit(handlerManufacturerInformationSubmit)}
									className="mb-4"
								>
									<div className="mb-3">
										<div className="relative">
											<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
												Company name
											</div>
											<input
												type="text"
												placeholder="Enter your company name"
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.company_name?.message
														? ' border-red-300'
														: 'border-[#E6E6E6]'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none`}
												{...register('company_name', {
													required: 'Enter your company name',
												})}
											/>
											{/* {!errors?.email && (
                      <AiFillCheckCircle className="text-lg absolute right-5 text-[#561f80] font-bold" />
                    )} */}
										</div>
									</div>
									<div className="mb-3">
										<div className="relative">
											<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
												Email address
											</div>
											<input
												type="email"
												placeholder="Enter your email address"
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.email?.message
														? ' border-red-300'
														: 'border-[#E6E6E6]'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
												{...register('email', {
													required: 'Enter email address',
												})}
											/>
											{/* {!errors?.email && (
                      <AiFillCheckCircle className="text-lg absolute right-5 text-[#561f80] font-bold" />
                    )} */}
										</div>
									</div>
									<div className="mb-3">
										<div className="relative">
											<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
												Phone Number
											</div>
											<input
												type="number"
												placeholder="Enter your phone number"
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.phone_number?.message
														? ' border-red-300'
														: 'border-[#E6E6E6]'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
												{...register('email', {
													required: 'Enter your phone number',
												})}
											/>
											{/* {!errors?.email && (
                      <AiFillCheckCircle className="text-lg absolute right-5 text-[#561f80] font-bold" />
                    )} */}
										</div>
									</div>
									<div className="mb-3">
										<div className="relative">
											<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
												Address
											</div>
											<input
												type="text"
												placeholder="Enter your address"
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.address?.message
														? ' border-red-300'
														: 'border-[#E6E6E6]'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
												{...register('address', {
													required: 'Enter your address',
												})}
											/>
										</div>
									</div>
									<div className="mb-3">
										<div className="relative">
											<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
												Website
											</div>
											<input
												type="text"
												placeholder="Enter your website"
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.website?.message
														? ' border-red-300'
														: 'border-[#E6E6E6]'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
												{...register('website', {
													required: 'Enter your website',
												})}
											/>
										</div>
									</div>
									<div className="mb-3">
										<div className="relative">
											<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
												Preferred language
											</div>
											<input
												type="text"
												placeholder="Enter your preferred language"
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.preferred_language?.message
														? ' border-red-300'
														: 'border-[#E6E6E6]'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
												{...register('preferred_language', {
													required: 'Enter your preferred language',
												})}
											/>
										</div>
									</div>
									<div className="mb-3">
										<div className="relative">
											<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
												Describe your company
											</div>
											<textarea
												placeholder="Enter your describe your company..."
												cols={40}
												rows={5}
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.company_description?.message
														? ' border-red-300'
														: 'border-[#E6E6E6]'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
												{...register('company_description', {
													required: false,
												})}
											></textarea>
										</div>
									</div>
									<div className="mb-[16px]">
										<div className="relative">
											<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
												Number of employees
											</div>
											<input
												type="text"
												placeholder="Enter your number of employees"
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.number_of_employees?.message
														? ' border-red-300'
														: 'border-[#E6E6E6]'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
												{...register('number_of_employees', {
													required: false,
												})}
											/>
										</div>
									</div>
									<div className="mb-[17px]">
										<Label
											value="Business information"
											className="font-500 font-poppins leading-[41px] text-[24px] text-[#3E3E3E]"
										/>
									</div>
									<div className="mb-[14px]">
										<div className="relative">
											<input
												type="text"
												placeholder="Line of business"
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.business_line?.message
														? ' border-red-300'
														: 'border-[#E6E6E6]'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
												{...register('business_line', {
													required: false,
												})}
											/>
										</div>
									</div>
									<div className="mb-14">
										<div className=" relative">
											<input
												type="text"
												placeholder="Expertise"
												className={`w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
													errors?.expertise?.message
														? ' border-red-300'
														: 'border-gray-300'
												} text-[#B9B9B9] text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
												{...register('expertise', {
													required: false,
												})}
											/>
										</div>
									</div>
									<Controller
										name="agree_policy"
										control={control}
										rules={{
											required:
												'Please agree with privacy policy and terms & conditon',
										}}
										render={({ field }) => (
											<FormControlLabel
												className="items-start mt-2"
												control={
													<CheckboxAtom
														color="primary"
														{...field}
													/>
												}
												label={
													<div className="text-[#787878] text-[16px] leading-[29px] font-poppins font-poppins mt-2">
														I'am agree to the{' '}
														<span
															className="text-primary cursor-pointer "
															onClick={() => {
																router.push('/agreement');
																dispatch(
																	closeSignUpPopupManufacturer()
																);
															}}
														>
															privacy policy and terms & conditon
														</span>{' '}
														of IDEEZA.
													</div>
												}
											/>
										)}
									/>
									<Controller
										name="newsletter"
										control={control}
										rules={{ required: false }}
										render={({ field }) => (
											<FormControlLabel
												className="items-start mt-2"
												control={
													<CheckboxAtom
														color="primary"
														{...field}
													/>
												}
												label={
													<div className="text-[#787878] text-[16px] leading-[29px] font-poppins font-poppins">
														I’d like to receive{' '}
														<span
															onClick={() => {
																router.push('/contact');
																dispatch(
																	closeSignUpPopupManufacturer()
																);
															}}
															className="text-primary cursor-pointer"
														>
															marketing promotions, special offers,
															inspiration and policy updates
														</span>{' '}
														from Ideeza. You can opt out any time.{' '}
													</div>
												}
											/>
										)}
									/>
									<div className="w-full flex justify-between">
										{/* <Button
                      value="Back"
                      variant="outlined"
                      color="primary"
                      // loading={loading}
                      className="text-lg 2xl:text-2xl eina-font-sb03 mt-2 bg-white text-[#707070] font-sans rounded-md tracking-tight px-20 shadow-none transform-none"
                      onClick={() => setStep((prev) => prev - 1)}
                    /> */}
										<Button
											type="submit"
											value="Next"
											variant="contained"
											color="primary"
											// loading={loading}
											className="text-[18px] font-poppins mt-[16px] leading-[27px] bg-primary text-white rounded-md tracking-tight w-full shadow-none transform-none py-[15px]"
										/>
									</div>
								</form>
							</div>
						)}
						{step === 2 && (
							<>
								<div className="px-[30px] py-[20px] border rounded-xl mt-[35px]">
									<Label
										value="Social Media Accounts"
										className="font-500 font-poppins leading-[41px] text-[24px] text-[#3E3E3E]"
									/>
									<div className="my-[30px]">
										<div className="flex justify-between items-center border-b border-[#E6E6E6] pb-[18px]">
											<Label
												value="Facebook"
												className="text-[20px] text-[#333333] font-normal leading-[34px]"
											/>
											<Button
												// type="submit"
												value="Disconnect"
												variant="contained"
												color="inherit"
												// loading={loading}
												className="text-[18px] font-poppins leading-[27px] bg-[#E6E6E6] text-[#787878] shadow-none transform-none py-[10px] px-[30px] rounded-[6px]"
											/>
										</div>

										<div className="w-full mt-[8px] items-center">
											<Label
												value="Sign in with Facebook and discover your trusted connections to people all over the world."
												className="text-[14px] font-normal text-[#999999] font-poppins leading-[21px]"
											/>
										</div>
									</div>

									<div className="mb-[30px]">
										<div className="flex justify-between items-center border-b border-[#E6E6E6] pb-[18px]">
											<Label
												value="LinkedIn"
												className="text-[20px] text-[#333333] font-normal leading-[34px]"
											/>
											<Button
												// type="submit"
												value="Connect"
												variant="contained"
												color="inherit"
												// loading={loading}
												className="text-[18px] font-poppins leading-[27px] bg-primary text-white shadow-none transform-none py-[10px] px-[30px] rounded-[6px]"
											/>
										</div>

										<div className="w-full mt-[8px] items-center">
											<Label
												value="Create a link to your professional life by connecting your Ideeza and LinkedIn accounts."
												className="text-[14px] font-normal text-[#999999] font-poppins leading-[21px]"
											/>
										</div>
									</div>

									<div className="mb-[30px]">
										<div className="flex justify-between items-center border-b border-[#E6E6E6] pb-[18px]">
											<Label
												value="Google"
												className="text-[20px] text-[#333333] font-normal leading-[34px]"
											/>
											<Button
												// type="submit"
												value="Disconnect"
												variant="contained"
												color="inherit"
												// loading={loading}
												className="text-[18px] font-poppins leading-[27px] bg-[#E6E6E6] text-[#787878] shadow-none transform-none py-[10px] px-[30px] rounded-[6px]"
											/>
										</div>

										<div className="w-full mt-[8px] items-center">
											<Label
												value="Connect your Ideeza account to your Google account for simplicity and ease."
												className="text-[14px] font-normal text-[#999999] font-poppins leading-[21px]"
											/>
										</div>
									</div>
									<div className="w-full flex justify-start mt-16">
										{/* <Button
                      value="Add more social accounts"
                      className="px-10 py-2 bg-white text-primary text-xl"
                      variant="outlined"
                    /> */}
										<Button
											// type="submit"
											value="Add more social accounts"
											variant="contained"
											color="inherit"
											// loading={loading}
											className="text-[18px] font-poppins leading-[27px] bg-primary text-white shadow-none transform-none py-[10px] px-[30px] rounded-[6px] font-normal"
										/>
									</div>
								</div>
								<div className="mt-[20px]">
									{/* <Button
                    value="Back"
                    className="bg-white text-[#161515] py-3 px-16 border-2 rounded-lg"
                    variant="outlined"
                    onClick={() => setStep((prev) => prev - 1)}
                  /> */}
									<div className="w-full flex justify-start">
										<Button
											// type="submit"
											value="Back"
											variant="contained"
											color="inherit"
											// loading={loading}
											className="text-[18px] font-poppins leading-[27px] bg-[#E6E6E6] text-[#787878] shadow-none transform-none py-[10px] px-[30px] rounded-[6px]"
											onClick={() => setStep((prev) => prev - 1)}
										/>
									</div>

									{/* STARTs: Privacy Policy Checkbox ---------------*/}
									<Controller
										name="agree_policy"
										control={control}
										rules={{
											required:
												'Please agree with privacy policy and terms & conditon',
										}}
										render={({ field }) => (
											<FormControlLabel
												className="items-start mt-2"
												control={<CheckboxAtom {...field} />}
												label={
													<div className="text-[#999999] mt-2">
														I'am agree to the{' '}
														<span
															className="text-primary underline cursor-pointer "
															onClick={() =>
																router.push('/agreement')
															}
														>
															privacy policy and terms & conditon
														</span>{' '}
														of IDEEZA.
													</div>
												}
											/>
										)}
									/>
									{/* ENDs: Privacy Policy Checkbox ---------------*/}

									{/* starts: Newsletter Checkbox ---------------*/}
									<Controller
										name="newsletter"
										control={control}
										rules={{ required: false }}
										render={({ field }) => (
											<FormControlLabel
												className="items-start mt-2"
												control={<CheckboxAtom {...field} />}
												label={
													<div className="text-[#999999] mt-2">
														I’d like to receive{' '}
														<span
															onClick={() => router.push('/contact')}
															className="text-primary cursor-pointer"
														>
															marketing promotions, special offers,
															inspiration and policy updates
														</span>{' '}
														from Ideeza. You can opt out any time.{' '}
													</div>
												}
											/>
										)}
									/>
									<Button
										type="submit"
										value="Register"
										variant="contained"
										color="primary"
										// loading={loading}
										className="text-[18px] font-poppins mt-[16px] leading-[27px] bg-primary text-white rounded-md tracking-tight w-full shadow-none transform-none py-[15px] "
									/>
									{/* ENDs: Newsletter Checkbox */}
								</div>
							</>
						)}
					</>
				}
				actions={
					<>
						<Label
							classes={{
								root: 'flex items-center text-base 2xl:text-lg font-poppins py-3 border-b justify-center  tracking-tight text-[#999999]  text-center w-full',
							}}
							value={
								<>
									{' '}
									Already have an IDEEZA account ?{' '}
									<span className="pl-2 text-primary cursor-pointer">
										Log in
									</span>{' '}
								</>
							}
							onClick={() => {
								dispatch(openLoginPopup({ ref: '' }));
								dispatch(closeSignUpPopupManufacturer());
							}}
						/>
					</>
				}
				open={isSignUpPopUp}
			/>
		</div>
	);
}
export default ManufacturerSignUpPopup;
