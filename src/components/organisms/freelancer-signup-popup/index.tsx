import React, { useState } from 'react';

import Modal from '@atoms/modal';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
	//   closeSignUpPopupManufacturer,
	closeSignUpPopupFreelancer,
	// closeSignUpPopctu
} from 'reducers/signup';

import Steppers from '@molecules/steppers';
import { AiOutlineUser } from 'react-icons/ai';
// import { RiAttachment2 } from "react-icons/ri";
import Label from '@atoms/label';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { Fade, FormControlLabel, FormHelperText, TextField } from '@mui/material';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { isValid } from 'date-fns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from '@atoms/button';
import CheckboxAtom from '@atoms/checkbox';
import { IoClose } from 'react-icons/io5';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

function FreelancerSignUpPopup() {
	const dispatch = useAppDispatch();
	const [step, setStep] = useState(0);
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
	const isSignUpPopUp = useAppSelector(
		({ signupPopUp }) => signupPopUp.openSignUpPopupFreelancer
	);

	return (
		<div>
			<Modal
				className={{
					paper: 'pb-[25px] px-[10px] md:px-[30px] pt-[25px] rounded-xl w-[700px]',
				}}
				width="md"
				close={() => dispatch(closeSignUpPopupFreelancer())}
				header={
					<>
						<div className="flex justify-between items-center mb-[24px] pr-[15px]">
							<div className="text-[24px] leading-[41px] text-[#333333] font-poppins">
								Freelancer sign up
							</div>
							<IoClose
								className="text-red-600 text-2xl cursor-pointer"
								onClick={() => dispatch(closeSignUpPopupFreelancer())}
							/>
						</div>
						<div className="flex justify-center freelancer-signup">
							<Steppers
								currentStep={step}
								className="md:w-3/4 w-full eina-font-sb03 md:text-2xl pb-4"
								options={['step 1', 'step 2']}
								stepStyle=" w-[50px] h-[50px] text-center font-poppins rounded-full border-2 border-[#E6E6E6] text-2xl flex items-center justify-center overflow-hidden"
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
												} placeholder-[#B9B9B9] text-black text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none`}
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
												} placeholder-[#B9B9B9] text-black text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none`}
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
												} placeholder-[#B9B9B9] text-black text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
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
												} placeholder-[#B9B9B9] text-black text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
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
												} placeholder-[#B9B9B9] text-black text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none`}
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
														className="placeholder-[#B9B9B9] text-black"
														renderInput={(params) => (
															<TextField
																// rows={1}
																placeholder="Enter your birthday"
																className={`w-full border border-solid bg-[#FBFBFB] rounded-[6px] font-poppins ${
																	errors?.dob?.message
																		? ' border-red-300'
																		: 'border-[#E6E6E6]'
																} placeholder-[#B9B9B9] text-black text-lg focus:outline-none`}
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
										className="text-[18px] font-poppins mt-[30px] leading-[27px] bg-primary text-white rounded-md tracking-tight w-full shadow-none transform-none py-[15px]"
									/>
								</form>
							</div>
						)}
						{step === 1 && (
							<div className="pr-2">
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
										className="text-[18px]  font-poppins mt-[16px] leading-[27px] bg-primary text-white rounded-md tracking-tight w-full shadow-none transform-none py-[15px] "
									/>
									{/* ENDs: Newsletter Checkbox */}
								</div>
							</div>
						)}
					</>
				}
				actions={<></>}
				open={isSignUpPopUp}
			/>
		</div>
	);
}
export default FreelancerSignUpPopup;
