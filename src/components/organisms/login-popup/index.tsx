import React, { FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import Modal from '@atoms/modal';
import Button from '@atoms/button';
import Label from '@atoms/label';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import CheckboxFields from '@molecules/checkbox-fields';
import { signIn, useSession } from 'next-auth/react';
import { closeLoginPopup, openLoginPopup } from 'reducers/login';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { useRouter } from 'next/router';
import { openSignUpPopup } from 'reducers/signup';
import { AiFillCheckCircle } from 'react-icons/ai';
import { apiService } from '../../../utils/request';
import { toast } from 'react-toastify';
import UiFormHelperText from '@atoms/ui-form-helper-text';
import { BsFacebook } from 'react-icons/bs';

const LoginPopup: FC = () => {
	const { data: session, status }: any = useSession();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [forgetPasswordModalOpen, setForgetPasswordModalOpen] = useState(false);
	const [forgetPasswordEmailCheckError, setForgetPasswordEmailCheckError] = useState(false);
	// const [userTypesEmail, setUserTypesEmail] = useState("");
	const [emailSentPopup, setEmailSentPopup] = useState(false);
	const [openNewPasswordOpen, setOpenNewPasswordOpen] = useState(false);
	const [passwordResetEmail, setPasswordResetEmail] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const loginPopUp = useAppSelector(({ loginPopUp }) => loginPopUp);
	const password = useRef({});

	const redirect = router?.query?.redirect;
	const redirectPb = router?.query?.redirect_pb;
	const redirectDb = router?.query?.redirect_db;

	const {
		handleSubmit,
		register,
		setError,
		getValues,
		clearErrors,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
	});
	const {
		register: register2,
		formState: { errors: errors2 },
		handleSubmit: handleSubmit2,
	} = useForm({
		mode: 'onChange',
	});
	const {
		register: register3,
		formState: { errors: errors3 },
		watch,
		handleSubmit: handleSubmit3,
	} = useForm({
		mode: 'onChange',
	});

	password.current = watch('password', '');

	const openForgetPasswordModal = () => {
		onClosePopupModal();
		setForgetPasswordModalOpen((prev) => !prev);
	};

	const newPasswordSubmitted = async (data: any) => {
		await apiService(
			{
				method: 'post',
				url: `/account/user/password_reset_confirmation/`,
				data: {
					hash: data?.verification_code,
					password: data?.password,
				},
			},
			(res: any, error: any) => {
				if (res) {
					onClosePopupModal();
					setOpenNewPasswordOpen(false);
					toast.dismiss();
					toast.success('Password reset successfully!');
					return;
				}

				if (error && error.response && error.response.status === 400) {
					toast.dismiss();
					toast.error('The reset code was invalid!');
				}
			}
		);
	};

	const forgetPasswordSubmitted = async (data: any) => {
		const email = data?.recover_email;
		setPasswordResetEmail(email);
		if (email.trim() !== '') {
			await apiService(
				{
					method: 'post',
					url: `/account/user/password_reset/`,
					data: {
						email,
					},
				},
				(res: any, error: any) => {
					if (res) {
						setForgetPasswordModalOpen(false);
						// setOpenNewPasswordOpen(true);
						setEmailSentPopup(true);
						toast.dismiss();
						toast.success('You will receive a confirmation email shortly!');
						return;
					}

					if (error && error.response && error.response.status === 400) {
						toast.dismiss();
						toast.error('The email you entered did not match any account!');
					}
				}
			);
		}
	};

	const goToLogin = () => {
		dispatch(openLoginPopup({ ref: '' }));
		setForgetPasswordModalOpen(false);
	};

	const handlerSubmit = (data: any) => {
		setSubmitting(true);
		signIn('credentials', {
			...data,
			redirect: false,
		}).then((res: any) => {
			if (res.error) {
				setSubmitting(false);
				setError('email', {
					type: 'manual',
					message: 'Email or password is wrong',
				});
				toast.error('Email or password is wrong');
			} else {
				setLoggedIn(true);
				setTimeout(() => {
					if (loginPopUp.loginRef && loginPopUp.loginRef !== '') {
						//router.push(loginPopUp.loginRef);
						window.location.href = loginPopUp.loginRef;
					}
				}, 200);
			}
		});
	};

	const onClosePopupModal = (): void => {
		clearErrors();
		// removeRedirectQuery(); //TODO: Remove this commented line after successful testing
		dispatch(closeLoginPopup());
	};

	const removeRedirectQuery = (): void => {
		if (redirect && redirect === 'false') delete router.query.redirect;
		if (redirectPb) delete router.query.redirect_pb;
		if (redirectDb) delete router.query.redirect_db;
	};

	// console.warn('router----------', router);
	const redirectAfterLogin = async () => {
		if (loggedIn && session?.user?.role) {
			localStorage.setItem('_t', session?.user?.access);
			localStorage.setItem('_r', session?.user?.refresh);

			let url = '/';

			if (redirect && redirect === 'false') {
				removeRedirectQuery();
				router.replace(router, undefined, { scroll: false });
				dispatch(closeLoginPopup());
				return;
			}

			if (redirectDb) {
				url = `/${session?.user?.role.toLowerCase()}/dashboard/${redirectDb}`;
			} else if (redirectPb) {
				url = `/${redirectPb}`;
			} else {
				url = `/${session?.user?.role.toLowerCase()}/dashboard`;
			}

			removeRedirectQuery();
			await router.push(url, undefined);
			onClosePopupModal();
			setSubmitting(false);
		}
	};

	useEffect(() => {
		redirectAfterLogin();
	}, [loggedIn, session?.user?.role]);

	useEffect(() => {
		// console.log("values", getValues("email"));
		if (!getValues('email')) {
			setError('email', {
				type: 'manual',
			});
		}
	}, [status]);

	return (
		<div>
			<Modal
				className={{
					paper: 'pb-0 px-[10px] md:pl-[30px] md:pb-[30px] pr-[15px] pt-[20px] shadow-none rounded-xl w-[700px]',
				}}
				width="md"
				close={onClosePopupModal}
				header={
					<div className="flex justify-between items-center mb-[30px] pr-[15px]">
						<div className="text-[24px] leading-[41px] text-[#333333] font-poppins">
							Log in
						</div>
						<IoClose
							className="text-red-600 text-2xl cursor-pointer"
							onClick={onClosePopupModal}
						/>
					</div>
				}
				content={
					<div className=" space-y-[20px] pr-[15px]">
						<div className="flex justify-center items-center py-[15px] rounded-[6px] bg-[#4568B2] cursor-pointer">
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

						<div className="flex items-center">
							<div className="w-[299px] h-[1px] bg-[#E6E6E6]"></div>
							<div className="text-[20px] leading-[34px] text-center text-[#999999] px-[9px]">
								or
							</div>
							<div className="w-[299px] h-[1px] bg-[#E6E6E6]"></div>
						</div>

						<>
							<form
								onSubmit={handleSubmit(handlerSubmit)}
								className="w-100"
							>
								<div className=" relative mb-4">
									<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
										Email address
									</div>
									<input
										type="email"
										{...register('email', {
											required: 'Email field is required',
											minLength: {
												value: 5,
												message: 'Please enter a valid email',
											},
											pattern: {
												value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
												message: 'Please enter a valid email',
											},
										})}
										placeholder="Email"
										// onChange={(e?: any) => setUserTypesEmail(e.target.value)}
										className={`text-[#333333] leading-[29px] texl-[16px] pl-2 py-1 md:py-3 md:pl-3 md:p-3 w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
											errors?.email?.message ? 'border-red-800' : ''
										}`}
									/>
									{!errors?.email && (
										// <AiFillCheckCircle className="text-2xl absolute top-2 xl:top-[49px] right-5 text-blue-800 md:mb-4" />
										<img
											src="/images/icon/check-circle.svg"
											className="text-2xl absolute top-[41px] md:top-[49px] right-5 md:mb-4"
											alt=""
										/>
									)}
									{errors?.email?.message && (
										<div className="w-full">
											<UiFormHelperText message={errors?.email?.message} />
										</div>
									)}
								</div>

								<div className=" relative">
									<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
										Password
									</div>
									<input
										type={passwordVisible ? 'text' : 'password'}
										{...register('password', {
											required: 'Enter your password',
										})}
										placeholder="Password"
										className={`text-[#333333] leading-[29px] texl-[16px] pl-2 py-1 md:py-3 md:pl-3 md:p-3 w-full border bg-[#FBFBFB] rounded-[6px] font-poppins ${
											errors?.password?.message ? 'border-red-800' : ''
										}`}
									/>

									{passwordVisible ? (
										<FaRegEye
											onClick={() => setPasswordVisible((prev) => !prev)}
											className="mt-3 text-2xl absolute right-5 top-[29px] md:top-[36px] cursor-pointer"
										/>
									) : (
										<FaRegEyeSlash
											onClick={() => setPasswordVisible((prev) => !prev)}
											className="mt-3 text-2xl absolute right-5 top-[29px] md:top-[36px] cursor-pointer"
										/>
									)}
									{errors?.password?.message && (
										<div className="w-full">
											<UiFormHelperText message={errors?.password?.message} />
										</div>
									)}
								</div>

								<div className="mt-3">
									<CheckboxFields
										value="Remember me"
										labelClass="texl-lg 2xl:text-xl tracking-normal font-poppins text-gray-700"
										name="Remember me"
										// checked={false}
										rules={''}
									/>
								</div>

								<Button
									type="submit"
									value="Log in"
									className="bg-primary text-[18px] mt-1 md:mt-3 h-[56px] font-poppins rounded-md pt-[15px] pb-[14px] w-full text-white transform-none leading-[27px] shadow-none"
									color={'primary'}
									loading={submitting}
									disabled={submitting}
									// size="large"
								/>
								<Label
									classes={{
										root: 'text-primary text-[16px] leading-[29px] mt-2  font-poppins text-center pt-1 cursor-pointer',
									}}
									value="Forgot Password?"
									onClick={openForgetPasswordModal}
								/>
							</form>
							<Label
								classes={{
									root: 'flex items-center text-[16px] leading-[29px] md:w-11/12 mx-auto justify-center font-poppins text-[#787878] text-center',
								}}
								value={
									<>
										{`Don't have an account? `}
										<span className="pl-2 text-primary cursor-pointer">
											Sign up
										</span>
									</>
								}
								onClick={() => {
									dispatch(openSignUpPopup());
									dispatch(closeLoginPopup());
								}}
							/>
						</>
					</div>
				}
				actions={<></>}
				open={loginPopUp.loginPopup}
			/>
			<Modal
				className={{
					paper: 'pb-0 px-[10px] md:pl-[30px] md:pb-[30px] pr-[15px] pt-[20px] rounded-xl 2xl:w-[700px]',
				}}
				width="md"
				close={() => setForgetPasswordModalOpen(false)}
				header={
					<div className="flex justify-between items-center">
						<Label
							value="Reset Password"
							className="text-[24px] leading-[41px] text-[#333333] font-poppins"
						/>
						<IoClose
							className="text-red-600 text-3xl cursor-pointer"
							// onClick={toggleOpen}
							onClick={onClosePopupModal}
						/>
					</div>
				}
				content={
					<div className=" pt-2 pr-1">
						<Label
							classes={{
								root: 'flex items-center my-2 texl-xs 2xl:texl-lg text-[#999999]',
							}}
							value="Enter the email address associated with your account, and we’ll email you a link to reset your password"
						/>

						<>
							<form
								onSubmit={handleSubmit2(forgetPasswordSubmitted)}
								className="w-100"
							>
								<div className="relative">
									<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
										Email address
									</div>
									<input
										type="email"
										{...register2('recover_email', {
											required: 'Please provide a valid email address.',
											minLength: {
												value: 5,
												message: 'Please provide a valid email address.',
											},
											pattern: {
												value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
												message: 'Please provide a valid email address.',
											},
										})}
										defaultValue=""
										placeholder="Email"
										className="text-[#333333] leading-[29px] texl-[16px] pl-2 py-1 md:py-3 md:pl-3 md:p-3 w-full border bg-[#FBFBFB] rounded-[6px] font-poppins"
										onKeyUp={() => {
											if (!forgetPasswordEmailCheckError) {
												setForgetPasswordEmailCheckError(true);
											}
										}}
									/>
									{forgetPasswordEmailCheckError && !errors2?.recover_email && (
										<AiFillCheckCircle className="text-2xl absolute top-[50px] right-5 text-blue-800 md:mb-4" />
									)}
								</div>

								<p className="text-red-400 text-center">
									{errors2?.recover_email
										? errors2?.recover_email?.message
										: null}
								</p>

								<div className="w-full mt-5 mb-2 gap-4 ">
									<Button
										type="submit"
										value="Send Reset Link"
										className="bg-primary text-[16px] mt-1 md:mt-3 font-poppins rounded-md py-[15px] w-full text-white transform-none leading-[27px] shadow-none font-normal"
										color={'primary'}
										loading={submitting}
										disabled={
											submitting ||
											(forgetPasswordEmailCheckError &&
												errors2?.recover_email)
										}
										size="large"
									/>
									<Button
										onClick={goToLogin}
										value="Back to Login"
										className="bg-white px-2 text-[16px] md:mt-3 font-poppins rounded-md tracking-tight py-[15px] w-full text-gray transform-none border-0 text-primary font-normal"
										loading={submitting}
										disabled={submitting}
										size="large"
										variant="outlined"
									/>
								</div>
							</form>
						</>
					</div>
				}
				actions={<></>}
				open={forgetPasswordModalOpen}
			/>
			<Modal
				className={{
					paper: 'pb-0 px-[10px] md:pl-[30px] md:pb-[30px] pr-[15px] pt-[20px] rounded-xl w-[700px]',
				}}
				width="md"
				close={() => setEmailSentPopup(false)}
				header={
					<div className="flex justify-end items-center">
						{/* <Label
              value="Check Your email!"
              className="text-2xl md:text-4xl font-medium pt-2"
            /> */}
						<IoClose
							className="text-red-600 text-3xl cursor-pointer"
							// onClick={toggleOpen}
							onClick={() => setEmailSentPopup(false)}
						/>
					</div>
				}
				content={
					<div className=" pt-2 pr-1">
						<div className="">
							<div className="flex justify-center items-center flex-col w-full">
								<img
									src="/images/landing/reset/reset-pass-img.svg"
									alt=""
								/>
								<div className="text-[#333333] text-[24px] leading-[41px] font-[500] mt-[15px]">
									"Your account is under review"
								</div>
								<div className="text-[#333333] text-[16px] leading-[29px] font-[400] mt-[8px] text-center">
									in the next 24 hours you will receive knowledge email from us.
									For any issuse please contact to our support center
								</div>
								<div className="text-primary text-[16px] leading-[29px] font-[400] text-center">
									review@IDEEZA.com
								</div>
								<div className="text-[#333333] text-[16px] leading-[29px] font-[400] mt-[8px] text-center">
									{`To confirm your email address,tap the button in the email we sent to ${passwordResetEmail}`}
								</div>
							</div>

							{/* <Label
                classes={{
                  root: "flex items-center font-medium my-2 texl-xs 2xl:texl-lg text-[#030303]",
                }}
                value={`To confirm your email address,tap the button in the email we sent to ${passwordResetEmail}`}
              /> */}
							<div className="w-full flex justify-center mt-3 mb-2 gap-4 ">
								<Button
									// type="submit"
									value="Click To Verify"
									className="bg-primary text-md 2xl:text-lg  md:mt-3 font-poppins rounded-md tracking-tight py-2 font-medium text-[27px] text-white transform-none shadow-none"
									color={'primary'}
									loading={submitting}
									onClick={() => {
										setOpenNewPasswordOpen(true);
										setEmailSentPopup(false);
									}}
									// disabled={
									//   submitting ||
									//   (forgetPasswordEmailCheckError && errors2?.recover_email)
									// }
									size="large"
								/>
							</div>
							<div className="w-full flex justify-center mb-2 mt-4 text-[#030303]">
								<a
									onClick={goToLogin}
									className="underline text-lg font-medium"
								>
									Sign In Manually
								</a>
							</div>
						</div>
					</div>
				}
				actions={<></>}
				open={emailSentPopup}
			/>

			<Modal
				className={{
					paper: 'pb-0 px-[10px] md:pl-[30px] md:pb-[30px] pr-[15px] pt-[20px] rounded-xl w-[700px]',
				}}
				width="md"
				close={() => setOpenNewPasswordOpen(false)}
				header={
					<div className="flex justify-between items-center">
						<Label
							value="Set New Password"
							className="text-[24px] leading-[41px] text-[#333333] font-poppins"
						/>
						<IoClose
							className="text-red-600 text-3xl cursor-pointer"
							// onClick={toggleOpen}
							onClick={() => setOpenNewPasswordOpen(false)}
						/>
					</div>
				}
				content={
					<div className="mt-5 pt-2 pr-1">
						<>
							<form
								onSubmit={handleSubmit3(newPasswordSubmitted)}
								className="w-100"
							>
								<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
									Enter verification code
								</div>
								<div className="flex items-center relative">
									<input
										type={'text'}
										{...register3('verification_code', {
											required: 'Enter verification code',
										})}
										name="verification_code"
										defaultValue=""
										placeholder="Verification code"
										className="text-[#333333] leading-[29px] texl-[16px] pl-2 py-1 md:py-3 md:pl-3 md:p-3 w-full border bg-[#FBFBFB] rounded-[6px] font-poppins mb-[8px]"
									/>
								</div>

								<div className="text-[#333333] text-[16px] leading-[29px] font-poppins mb-[4px]">
									Enter Your new password
								</div>
								<div className="flex items-center relative">
									<input
										type={passwordVisible ? 'text' : 'password'}
										{...register3('password', {
											required: 'Enter new password',
											validate: (value) => {
												return value.length >= 8
													? true
													: 'Password must be at least 8 characters!';
											},
										})}
										name="password"
										defaultValue=""
										placeholder="Enter Your new password"
										className="text-[#333333] leading-[29px] texl-[16px] pl-2 py-1 md:py-3 md:pl-3 md:p-3 w-full border bg-[#FBFBFB] rounded-[6px] font-poppins mb-[8px]"
									/>

									{passwordVisible ? (
										<FaRegEye
											onClick={() => setPasswordVisible((prev) => !prev)}
											className="text-2xl absolute right-5 cursor-pointer"
										/>
									) : (
										<FaRegEyeSlash
											onClick={() => setPasswordVisible((prev) => !prev)}
											className="text-2xl absolute right-5 cursor-pointer"
										/>
									)}
								</div>
								<p className="text-red-400 text-center">
									{errors3?.password ? errors3?.password?.message : null}
								</p>

								<Label
									value="Retype Your password"
									className="text-md text-gray-700 my-2"
								/>
								<div className="flex items-center relative">
									<input
										type={passwordVisible ? 'text' : 'password'}
										{...register3('retyped_password', {
											validate: (value) =>
												value === password.current ||
												'The passwords do not match',
										})}
										defaultValue=""
										placeholder="Retype Your password"
										className="text-[#333333] leading-[29px] texl-[16px] pl-2 py-1 md:py-3 md:pl-3 md:p-3 w-full border bg-[#FBFBFB] rounded-[6px] font-poppins mb-[8px]"
									/>

									{passwordVisible ? (
										<FaRegEye
											onClick={() => setPasswordVisible((prev) => !prev)}
											className="text-2xl absolute right-5 cursor-pointer"
										/>
									) : (
										<FaRegEyeSlash
											onClick={() => setPasswordVisible((prev) => !prev)}
											className="text-2xl absolute right-5 cursor-pointer"
										/>
									)}
								</div>
								<p className="text-red-400 text-center">
									{errors3?.retyped_password
										? errors3?.retyped_password?.message
										: null}
								</p>

								<div className="w-full flex justify justify-between mt-5 mb-2 gap-4 ">
									<Button
										onClick={() => setOpenNewPasswordOpen(false)}
										value="cancel"
										className="bg-white px-2 text-md 2xl:text-lg  md:mt-3 font-poppins rounded-md tracking-tight py-[15px] w-full text-gray transform-none"
										loading={submitting}
										disabled={submitting}
										size="large"
										variant="outlined"
									/>
									<Button
										type="submit"
										value="confirm"
										className="bg-primary text-[16px] mt-1 md:mt-3 font-poppins rounded-md py-[15px] w-full text-white transform-none leading-[27px] shadow-none font-normal"
										color={'primary'}
										loading={submitting}
										disabled={submitting}
										size="large"
									/>
								</div>
							</form>
						</>
					</div>
				}
				actions={<></>}
				open={openNewPasswordOpen}
			/>
		</div>
	);
};
export default LoginPopup;
