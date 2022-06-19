import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import Modal from '@atoms/modal';
import Button from '@atoms/button';
import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
	closeSignUpOptions,
	closeSignUpPopup,
	openSignUpPopup,
	openSignUpPopupManufacturer,
	openSignUpPopupFreelancer,
} from 'reducers/signup';
import { openLoginPopup } from 'reducers/login';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

import { useRouter } from 'next/router';
import CheckboxAtom from '@atoms/checkbox';
import { Fade, FormControlLabel, FormHelperText, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { format, isValid } from 'date-fns';
import { ApiDataType, apiService } from 'utils/request';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

function SignUpPopup() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { data: session }: any = useSession(); //Todo Uncomment after fixing useEffect issue
	const userRole = session?.user?.role;

	const [passwordVisible, setPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false); //Todo Uncomment after fixing useEffect issue

	const loginPopUp = useAppSelector(({ loginPopUp }) => loginPopUp);
	const isSignUpPopUp = useAppSelector(({ signupPopUp }) => signupPopUp.signupOptions);
	const isSignUpPopUpForm = useAppSelector(({ signupPopUp }) => signupPopUp.signupPopup);

	const redirect = router?.query?.redirect;
	const redirectPb = router?.query?.redirect_pb;
	const redirectDb = router?.query?.redirect_db;

	const helpTextClasses = 'text-base italic eina-font-r03 mt-1';

	interface IRegisterUser {
		first_name: string;
		last_name: string;
		email: string;
		password: string;
		dob: string | Date;
		role: string;
		newsletter?: boolean;
	}

	const {
		register,
		handleSubmit,
		control,
		setError,
		getValues,
		resetField,
		clearErrors,
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
		},
	});

	// console.log('userRole-----', userRole)

	const handlerSubmit = (data: any) => {
		const formData: IRegisterUser = {
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			password: data.password,
			dob: isValid(data.dob) ? format(new Date(data.dob), 'yyyy-MM-dd') : '',
			role: 'User',
		};
		if (data.newsletter) {
			formData.newsletter = data.newsletter;
		}
		if (data.agree_policy) {
			// console.log('2. FormData----', formData, data)
			registerUser(formData);
		}
	};

	const registerUser = async (formData: IRegisterUser) => {
		setLoading(true);
		const apiData: ApiDataType = {
			method: 'post',
			url: `/account/user/`,
			data: formData,
		};

		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				return handleLoginSubmit(formData);
			}
			if (err?.response) {
				setSubmitErrors(err?.response?.data);
				toast.error('Something went wrong to register, please try again');
				return setLoading(false);
			}
		});
	};

	const handleLoginSubmit = (formData: IRegisterUser) => {
		const data: any = {
			email: formData.email,
			password: formData.password,
		};
		signIn('credentials', {
			...data,
			redirect: false,
		}).then((res: any) => {
			if (res.error) {
				setLoading(false);
				dispatch(openLoginPopup({ ref: '' }));
				setError('email', {
					type: 'manual',
					message: 'Email or password is wrong',
				});
				toast.error('Email or password is wrong');
			} else {
				setLoggedIn(true); //Todo Uncomment after fixing useEffect issue
				toast.success(res?.data?.details || 'Successfully registered');
				resetAllFields();
				if (isSignUpPopUp) dispatch(closeSignUpOptions());
				onCloseSignUpPopup();
				setLoading(false);

				setTimeout(() => {
					if (loginPopUp.loginRef && loginPopUp.loginRef !== '') {
						window.location.href = loginPopUp.loginRef;
					}
				}, 200);
			}
		});
	};

	const onCloseSignUpPopup = () => {
		resetAllFields();
		clearErrors();
		removeRedirectQuery();
		dispatch(closeSignUpPopup());
	};

	const resetAllFields = () => {
		resetField('first_name');
		resetField('last_name');
		resetField('email');
		resetField('password');
		resetField('password_confirm');
		resetField('dob');
		resetField('newsletter');
		resetField('agree_policy');
	};

	const setSubmitErrors = (errors: any) => {
		setError('first_name', {
			type: 'manual',
			message: (errors?.first_name && errors?.first_name[0]) || '',
		});
		setError('last_name', {
			type: 'manual',
			message: (errors?.last_name && errors?.last_name[0]) || '',
		});
		setError('email', {
			type: 'manual',
			message: (errors?.email && errors?.email[0]) || '',
		});
		setError('password', {
			type: 'manual',
			message: (errors?.password && errors?.password[0]) || '',
		});
		setError('dob', {
			type: 'manual',
			message: (errors?.dob && errors?.dob[0]) || '',
		});
	};

	const removeRedirectQuery = (): void => {
		if (redirect && redirect === 'false') delete router.query.redirect;
		if (redirectPb) delete router.query.redirect_pb;
		if (redirectDb) delete router.query.redirect_db;
		router.push(router, undefined, { scroll: false });
	};

	/* @ts-ignore */
	useEffect(() => {
		if (loggedIn && userRole) {
			localStorage.setItem('_t', session?.user?.access);
			localStorage.setItem('_r', session?.user?.refresh);

			let url = '';

			if (redirect && redirect === 'false') {
				return removeRedirectQuery();
			}

			if (redirectDb) {
				url = `/${userRole.toLowerCase()}/dashboard/${redirectDb}`;
			} else if (redirectPb) {
				url = `/${redirectPb}`;
			} else {
				url = `/${userRole.toLowerCase()}/dashboard`;
			}
			router.push(url, undefined);
		}
	}, [loggedIn, userRole, session?.user?.access, session?.user?.refresh]);

	return (
		<div>
			<Modal
				className={{ paper: 'md:p-[30px] pt-5 rounded-[16px] w-[700px]' }}
				width="md"
				close={() => dispatch(closeSignUpOptions())}
				header={
					<>
						<div className="flex justify-end w-full cursor-pointer">
							<IoClose
								className="text-[25px] text-[#FF5353]"
								onClick={() => dispatch(closeSignUpOptions())}
							/>
						</div>

						<Link href="/">
							<a className="w-full flex justify-center custom-resp-logo pt-[25px] ">
								<img
									src="/images/logo/logo.svg"
									width="120px"
									alt="logo"
								/>
							</a>
						</Link>
					</>
				}
				content={
					<div className="mt-[40px]">
						<div
							className=" flex items-center cursor-pointer p-[30px] bg-[#FBFBFB] rounded-[16px] border mb-[16px]"
							onClick={() => dispatch(openSignUpPopup())}
						>
							<div className="p-[15px] border-2 border-primary rounded-xl ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="26.515"
									height="28.414"
									viewBox="0 0 26.515 28.414"
								>
									<g
										id="Group_4288"
										data-name="Group 4288"
										transform="translate(0.5 0.5)"
									>
										<path
											id="Path_16683"
											data-name="Path 16683"
											d="M-330.891,263.232c1.533,0,3.067-.039,4.6.008a8.543,8.543,0,0,1,7.972,7.036,30.158,30.158,0,0,1,.17,3.9.945.945,0,0,1-.974.971.981.981,0,0,1-.937-1.019c-.017-.823.009-1.647-.008-2.47a6.724,6.724,0,0,0-6.583-6.546q-4.28-.044-8.561,0a6.722,6.722,0,0,0-6.516,6.522c-.01.795,0,1.59-.012,2.385-.007.679-.392,1.125-.958,1.127a1,1,0,0,1-.966-1.117,17.067,17.067,0,0,1,.325-4.482,8.632,8.632,0,0,1,8.063-6.321c1.461-.037,2.924-.006,4.387-.006Z"
											transform="translate(343.665 -247.736)"
											fill="#ff00c7"
											stroke="#ff00c7"
											strokeWidth="1"
										/>
										<path
											id="Path_16684"
											data-name="Path 16684"
											d="M-301.715,171.922a6.832,6.832,0,0,1,6.812,6.827,6.853,6.853,0,0,1-6.77,6.792,6.836,6.836,0,0,1-6.849-6.791A6.822,6.822,0,0,1-301.715,171.922Zm.013,11.7a4.887,4.887,0,0,0,4.88-4.906,4.887,4.887,0,0,0-4.868-4.878,4.874,4.874,0,0,0-4.919,4.863A4.875,4.875,0,0,0-301.7,183.62Z"
											transform="translate(314.479 -171.922)"
											fill="#ff00c7"
											stroke="#ff00c7"
											strokeWidth="1"
										/>
									</g>
								</svg>
							</div>
							<div className="ml-[20px]">
								<Label
									value="User"
									className="font-[400] text-[20px] leading-[34px] text-[#3E3E3E] capitalize"
								/>
								<Label
									value="Creating account in IDEEZA as a user"
									className=" text-[16px] leading-[29px] font-poppins text-[#787878]"
								/>
							</div>
						</div>
						<div
							className=" flex items-center cursor-pointer p-[30px] bg-[#FBFBFB] rounded-[16px] border mb-[16px]"
							onClick={() => {
								dispatch(openSignUpPopupManufacturer());
								dispatch(closeSignUpOptions());
							}}
						>
							<div className="p-[15px] border-2 border-primary rounded-xl ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32.717"
									height="36.644"
									viewBox="0 0 32.717 36.644"
								>
									<g
										id="Group_5161"
										data-name="Group 5161"
										transform="translate(4771.952 -11727.8)"
									>
										<g
											id="factory"
											transform="translate(-4771.202 11728.182)"
										>
											<path
												id="Path_16685"
												data-name="Path 16685"
												d="M7.6,35.447H7.557a.478.478,0,0,1-.433-.518L8.163,23.318a.478.478,0,0,1,.478-.435h3.57a.478.478,0,0,1,.478.43l.881,8.5a.478.478,0,0,1-.951.1l-.836-8.069H9.074l-1,11.172a.478.478,0,0,1-.475.435Z"
												transform="translate(-5.792 -10.843)"
												fill="#FF00C7"
												stroke="#FF00C7"
												strokeWidth="1.5"
											/>
											<path
												id="Path_16686"
												data-name="Path 16686"
												d="M35.077,53.616H4.816a.478.478,0,0,1-.478-.478V42.983a.478.478,0,0,1,.242-.416l10.087-5.716a.478.478,0,0,1,.713.416v4.9l9.374-5.312a.478.478,0,0,1,.713.416v4.9l9.374-5.312a.478.478,0,0,1,.713.416V53.138A.478.478,0,0,1,35.077,53.616ZM5.294,52.66H34.6V38.087L25.226,43.4a.478.478,0,0,1-.713-.416v-4.9L15.139,43.4a.478.478,0,0,1-.713-.416v-4.9L5.294,43.261Z"
												transform="translate(-4.338 -18.104)"
												fill="#FF00C7"
												stroke="#FF00C7"
												strokeWidth="1.5"
											/>
											<path
												id="Path_16687"
												data-name="Path 16687"
												d="M55.383,60.588H51.378a.478.478,0,0,1-.478-.478V57.44a.478.478,0,0,1,.478-.478h4.006a.478.478,0,0,1,.478.478v2.67A.478.478,0,0,1,55.383,60.588Zm-3.528-.956h3.05V57.918H51.856Z"
												transform="translate(-28.649 -28.636)"
												fill="#FF00C7"
											/>
											<path
												id="Path_16688"
												data-name="Path 16688"
												d="M40.017,60.588H36.012a.478.478,0,0,1-.478-.478V57.44a.478.478,0,0,1,.478-.478h4.006a.478.478,0,0,1,.478.478v2.67A.478.478,0,0,1,40.017,60.588Zm-3.528-.956h3.05V57.918H36.49Z"
												transform="translate(-20.626 -28.636)"
												fill="#FF00C7"
											/>
											<path
												id="Path_16689"
												data-name="Path 16689"
												d="M24.652,60.588H20.647a.478.478,0,0,1-.478-.478V57.44a.478.478,0,0,1,.478-.478h4.005a.478.478,0,0,1,.478.478v2.67A.478.478,0,0,1,24.652,60.588Zm-3.527-.956h3.049V57.918H21.125Z"
												transform="translate(-12.604 -28.636)"
												fill="#FF00C7"
											/>
											<path
												id="Path_16690"
												data-name="Path 16690"
												d="M14.495,10.54a.478.478,0,0,1-.47-.566l.635-3.4A2.273,2.273,0,0,1,16.871,3.34a2.272,2.272,0,0,1,3.75-.6,2.226,2.226,0,0,1,.567-.072A2.269,2.269,0,0,1,22.932,6.4,2.228,2.228,0,0,1,23,6.946a2.279,2.279,0,0,1-2.277,2.277,2.2,2.2,0,0,1-.621-.09,2.282,2.282,0,0,1-2.049,1.285,2.254,2.254,0,0,1-1.124-.3l-2.353.414a.47.47,0,0,1-.082.008ZM15.61,6.694l-.518,2.778L16.9,9.154a.478.478,0,0,1,.4.068,1.308,1.308,0,0,0,.755.239A1.322,1.322,0,0,0,19.349,8.4a.478.478,0,0,1,.711-.319,1.3,1.3,0,0,0,.665.187A1.316,1.316,0,0,0,21.948,6.45a.478.478,0,0,1,.122-.534,1.3,1.3,0,0,0,.439-.975,1.315,1.315,0,0,0-1.858-1.2.478.478,0,0,1-.6-.177,1.316,1.316,0,0,0-2.395.424.478.478,0,0,1-.592.357A1.313,1.313,0,0,0,15.58,6.273a.478.478,0,0,1,.03.421Z"
												transform="translate(-8.705 -2)"
												fill="#FF00C7"
												stroke="#FF00C7"
												strokeWidth="0.75"
											/>
										</g>
									</g>
								</svg>
							</div>
							<div className="ml-[20px]">
								<Label
									value="Manufacturer"
									className="font-[400] text-[20px] leading-[34px] text-[#3E3E3E] capitalize"
								/>
								<Label
									value="Creating account in IDEEZA as a Manufacturer"
									className="text-[16px] leading-[29px] font-poppins text-[#787878]"
								/>
							</div>
						</div>
						<div
							className=" flex items-center cursor-pointer p-[30px] bg-[#FBFBFB] rounded-[16px] border "
							onClick={() => {
								dispatch(openSignUpPopupFreelancer());
								dispatch(closeSignUpOptions());
							}}
						>
							<div className="p-[15px] border-2 border-primary rounded-xl ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="29.214"
									height="34.948"
									viewBox="0 0 29.214 34.948"
								>
									<path
										id="working-at-home"
										d="M51.964,8.191a4.1,4.1,0,1,0-4.1-4.1A4.1,4.1,0,0,0,51.964,8.191Zm0-5.461A1.365,1.365,0,1,1,50.6,4.1,1.367,1.367,0,0,1,51.964,2.73Zm15.29,30.258A1.365,1.365,0,1,1,64.8,34.177l-4.086-8.444H51.555a4.1,4.1,0,0,1-4.1-4.1V13.583a4.1,4.1,0,0,1,8.191,0v5.324a1.365,1.365,0,0,1-2.73,0V13.583a1.365,1.365,0,1,0-2.73,0v8.054A1.367,1.367,0,0,0,51.555,23H61.567a1.365,1.365,0,0,1,1.229.771ZM61.3,32.963A1.365,1.365,0,1,1,58.871,34.2l-1.531-3.008H51.555a9.5,9.5,0,0,1-4.734-1.257L44.649,34.2a1.365,1.365,0,0,1-2.433-1.239l2.416-4.745A9.523,9.523,0,0,1,42,21.637V10.853a1.365,1.365,0,1,1,2.73,0V21.637a6.833,6.833,0,0,0,6.826,6.826h6.621a1.365,1.365,0,0,1,1.217.746Zm9.839-21.815-2.73,8.191a1.365,1.365,0,0,1-1.3.933H59.541a1.365,1.365,0,0,1,0-2.73h6.593l2.419-7.257a1.365,1.365,0,0,1,2.59.863Z"
										transform="translate(-41.999)"
										fill="#ff00c7"
									/>
								</svg>
							</div>
							<div className="ml-[20px]">
								<Label
									value="freelancer"
									className="font-[400] text-[20px] leading-[34px] text-[#3E3E3E] capitalize"
								/>
								<Label
									value="Creating account in IDEEZA as a freelancer"
									className=" text-[16px] leading-[29px] font-poppins text-[#787878]"
								/>
							</div>
						</div>
					</div>
				}
				actions={<></>}
				open={isSignUpPopUp}
			/>
			{/* <Modal
        className={{ paper: "pb-0 px-[10px] md:px-10 pt-5 rounded-xl" }}
        width="sm"
        close={() => dispatch(closeSignUpOptions())}
        header={
          <div className="flex justify-end md:-mt-3 md:-mr-5 pb-2">
            <IoClose
              className="text-red-600 text-2xl cursor-pointer"
              // onClick={toggleSignUp}
              onClick={() => dispatch(closeSignUpOptions())}
            />
          </div>
        }
        content={
          <div className="mx-2 space-y-2 pt-6 pb-4">
            <Button
              iconStart={<FaFacebookF className="text-2xl" />}
              value="Continue with Facebook"
              className="bg-[#4568B2] border text-lg 2xl:text-2xl tracking-tight md:py-3 w-full rounded-xl text-white transform-none shadow-none "
              color="info"
            />
            <Button
              iconStart={<FcGoogle className="text-2xl" />}
              value="Continue with Google"
              className="bg-white text-lg 2xl:text-2xl tracking-tight md:py-3 w-full rounded-xl text-gray-700 border border-solid border-gray-900 transform-none shadow-none"
            />
            <Label
              classes={{
                root: "flex items-center text-lg 2xl:text-2xl grid grid-cols-5 text-center text-gray-300",
              }}
              value={
                <>
                  <span className="col-span-2 border-b block" />
                  or <span className="col-span-2 border-b block" />
                </>
              }
            />
            <Button
              iconStart={<AiOutlineMail className="text-2xl" />}
              value="Sign up with Email"
              className="bg-primary text-lg 2xl:text-2xl tracking-tight md:py-3 w-full rounded-xl text-white  transform-none outline-none shadow-none"
              color="primary"
              onClick={() => dispatch(openSignUpPopup())}
            />

            <Label
              value={
                <div className="flex items-center text-base 2xl:text-lg justify-center pt-4 tracking-tight text-[#999999] text-center">
                  {" "}
                  Already have an IDEEZA account ?{" "}
                  <span className="pl-2 text-primary cursor-pointer">
                    Log in
                  </span>{" "}
                </div>
              }
              onClick={() => dispatch(openLoginPopup({ ref: "" }))}
            />
          </div>
        }
        actions={<></>}
        open={isSignUpPopUp}
      /> */}
			<Modal
				className={{
					paper: 'pb-0 px-[10px] md:pl-[30px] pr-[15px] pt-[20px] shadow-none rounded-xl w-[700px]',
				}}
				width="md"
				close={onCloseSignUpPopup}
				actions={<></>}
				// open={open}
				open={isSignUpPopUpForm}
				header={
					<div className="flex justify-between items-center mb-[30px] pr-[15px]">
						<div className="text-[24px] leading-[41px] text-[#333333] font-poppins">
							Sign Up
						</div>
						<IoClose
							className="text-red-600 text-2xl cursor-pointer"
							onClick={onCloseSignUpPopup}
						/>
					</div>
				}
				content={
					<div className=" space-y-[20px]  pb-4 pr-[15px]">
						<>
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
											} text-gray-700 text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none`}
											{...register('first_name', {
												required: 'Enter first name',
											})}
										/>
										{errors?.first_name?.message && (
											<Fade
												in={(errors?.first_name?.message && true) || false}
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
											} text-gray-700 text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none`}
											{...register('last_name', {
												required: 'Enter last name',
											})}
										/>
										{errors?.last_name?.message && (
											<Fade
												in={(errors?.last_name?.message && true) || false}
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
								{/* ENDs: LastName Input ---------------*/}

								{/* STARTs: Email Input ---------------*/}
								<div>
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
											} text-gray-700 text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
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
													errors?.email?.message ? ' text-red-500' : ''
												}`}
											>
												{errors?.email?.message}
											</FormHelperText>
										</Fade>
									)}
								</div>
								{/* ENDs: Email Input ---------------*/}

								{/* STARTs: Password Help Text ---------------*/}
								<IconLabel
									mainClass="flex items-center mt-3 mb-2"
									tooltipProps={{ open: false }}
									// labelValue="The password must be be atleast 8 characters"
									iconContanerClass="text-base w-4"
									lableClass={{
										root: `text-[#999999] tracking-tighter text-base eina-font-r03 font-normal ml-3`,
									}}
									// iconComponent={
									//   <BiInfoCircle className="text-red-100 text-2xl " />
									// }
									// TODO
									onClick={() => {
										'goto';
									}}
								/>
								{/* ENDs: Password Help Text ---------------*/}

								{/* STARTs: Password Input ---------------*/}
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
											} text-gray-700 text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3  focus:outline-none`}
										/>
										{passwordVisible ? (
											<FaRegEye
												onClick={() => setPasswordVisible((prev) => !prev)}
												className="text-[24px] absolute right-5 top-[41px] md:top-[50px] cursor-pointer"
											/>
										) : (
											<FaRegEyeSlash
												onClick={() => setPasswordVisible((prev) => !prev)}
												className="text-[24px] absolute right-5 top-[41px] md:top-[50px] cursor-pointer"
											/>
										)}
									</div>
									{errors?.password?.message && (
										<Fade in={(errors?.password?.message && true) || false}>
											<FormHelperText
												className={`${helpTextClasses}${
													errors?.password?.message ? ' text-red-500' : ''
												}`}
											>
												{errors?.password?.message}
											</FormHelperText>
										</Fade>
									)}
								</div>
								{/* ENDs: Password Input ---------------*/}

								{/* STARTs: Confirm Password ---------------*/}
								<div>
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
											} text-gray-700 text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none`}
										/>
										{passwordVisible ? (
											<FaRegEye
												onClick={() => setPasswordVisible((prev) => !prev)}
												className="text-[24px] absolute right-5 top-[41px] md:top-[50px] cursor-pointer"
											/>
										) : (
											<FaRegEyeSlash
												onClick={() => setPasswordVisible((prev) => !prev)}
												className="text-[24px] absolute right-5 top-[41px] md:top-[50px] cursor-pointer"
											/>
										)}
									</div>
									{errors?.password_confirm?.message && (
										<Fade
											in={
												(errors?.password_confirm?.message && true) || false
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
								{/* ENDs: Confirm Password ---------------*/}

								{/* STARTs: Birth Date Input ---------------*/}
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
													className="text-gray-700"
													renderInput={(params) => (
														<TextField
															// rows={1}
															placeholder="Enter your birthday"
															className={`w-full border border-solid bg-[#FBFBFB] rounded-[6px] font-poppins ${
																errors?.dob?.message
																	? ' border-red-300'
																	: 'border-[#E6E6E6]'
															} text-gray-700 text-lg focus:outline-none`}
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
								{/* ENDs: Birth Date Input ---------------*/}

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
															dispatch(closeSignUpPopup());
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
								{/* ENDs: Privacy Policy Checkbox ---------------*/}

								{/* starts: Newsletter Checkbox ---------------*/}
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
															dispatch(closeSignUpPopup());
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
								{/* ENDs: Newsletter Checkbox */}

								{errors?.agree_policy?.message && (
									<div className="mt-3">
										<Fade in={(errors?.agree_policy?.message && true) || false}>
											<FormHelperText
												className={`${helpTextClasses}${
													errors?.agree_policy?.message
														? ' text-red-500'
														: ''
												}`}
											>
												*{errors?.agree_policy?.message}
											</FormHelperText>
										</Fade>
									</div>
								)}
								<Button
									type="submit"
									value="Register"
									variant="contained"
									color="primary"
									loading={loading}
									className="text-[18px] font-poppins mt-2 leading-[27px] bg-primary text-white rounded-md tracking-tight w-full shadow-none transform-none py-[15px]"
								/>
							</form>
						</>

						<Label
							classes={{
								root: 'flex items-center text-base 2xl:text-lg font-poppins py-3 justify-center  tracking-tight text-[#999999]  text-center',
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
								dispatch(closeSignUpPopup());
							}}
						/>
					</div>
				}
			/>
		</div>
	);
}
export default SignUpPopup;
