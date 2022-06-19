import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Label from 'components/atoms/label';
import {
	AiFillEdit,
	AiFillRead,
	AiOutlineBulb,
	AiOutlineLogin,
	AiOutlineSmile,
	AiOutlineTrophy,
	AiOutlineUser,
} from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { FaMobileAlt } from 'react-icons/fa';
import LoginPopup from '@organisms/login-popup';
import { AppBar } from '@mui/material';
import { useRouter } from 'next/router';
import { IUserData } from 'models/auth';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useSession } from 'next-auth/react';
import SignUpPopup from '@organisms/signup-popup';
import { openLoginPopup } from 'reducers/login';
import { openSignUpPopup, openSignUpOptions } from 'reducers/signup';
import Loader from '@atoms/loader';
import Button from '@atoms/button';
import AvatarAtom from '@atoms/avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { CgMenuRight } from 'react-icons/cg';

type IISelected = {
	isSignup: boolean;
	isLogin: boolean;
};
interface PublicHeaderProps {
	// toggleSPSignUp?: () => void;
	// toggleSignUp?: boolean;
	// // openSPSignUp:(e?:any)=>void;
	// openSPSignUp:boolean|undefined;
	isSelected: IISelected;
	isSupport?: string;
	showMenuMobile?: any;
	setShowMenuMobile?: any;
}

const PublicHeader = ({
	// toggleSPSignUp,
	isSelected,
	isSupport,
	showMenuMobile,
	setShowMenuMobile,
}: // openSPSignUp:openSignUp,
// toggleSignUp,
PublicHeaderProps) => {
	const router = useRouter();
	const pathName = router.pathname;
	const dispatch = useAppDispatch();

	const loading = useAppSelector(({ auth }) => auth?.loading);
	const userData = useAppSelector((state: any) => state?.auth?.userData);
	const [isScrolling, setIsScrolling] = useState<boolean>(false);
	const [user, setUser] = useState<IUserData>();
	const { data: session, status }: any = useSession();

	const scrollBackground = () => {
		if (typeof window !== 'undefined' && window.scrollY >= 100) {
			setIsScrolling(true);
		} else {
			setIsScrolling(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', scrollBackground);
		return () => {
			window.removeEventListener('scroll', scrollBackground);
		};
	}, []);

	const isActive = (path: string) => {
		if (router.pathname === path) {
			return true;
		}
	};
	const onClickProCreate = (e: any) => {
		if (status === 'unauthenticated') {
			router.query.redirect_db = 'project/create';
			router.push(router, undefined, { scroll: false });
			return handleSignUpPopUp();
		} else {
			router.push(
				userData?.role === 'Technician'
					? '/technician/dashboard/project/create'
					: '/user/dashboard/project/create'
			);
		}
	};
	const handleSignUpPopUp = () => {
		dispatch(openLoginPopup({ ref: '' }));
	};

	useEffect(() => {
		if (userData) {
			setUser(userData);
		}
	}, [userData]);

	const StyledBadge = styled(Badge)(({ theme }: any) => ({
		'& .MuiBadge-badge': {
			backgroundColor: '#E904BC',
			color: '#E904BC',
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			'&::after': {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				borderRadius: '50%',
				animation: 'ripple 1.2s infinite ease-in-out',
				border: '1px solid currentColor',
				content: '""',
			},
		},
		'@keyframes ripple': {
			'0%': {
				transform: 'scale(.8)',
				opacity: 1,
			},
			'100%': {
				transform: 'scale(2.4)',
				opacity: 0,
			},
		},
	}));
	// console.log(user?.first_name?.charAt(0));

	return (
		<>
			{loading ? <Loader /> : null}
			<AppBar
				position="fixed"
				className={
					`${isSupport ? 'bg-header' : ''} bg-black ` +
					`${isScrolling ? 'bg-header' : ''} bg-black`
				}
			>
				{/* Mobile SideBar */}
				<div className={`drawerMblMenu  ${showMenuMobile ? 'active-drawerMblMenu' : ''} `}>
					<IoClose
						className=" text-[9px] text-primary ml-auto mt-2 mr-2 z-[100]"
						onClick={() => setShowMenuMobile(!showMenuMobile)}
						size="20px"
					/>
					<div className="pt-2">
						<div className="flex items-center flex-col justify-end text-white xl:pr-8 pr-1">
							<div className="flex flex-col cursor-pointer h-40 justify-center items-center mx-2">
								<div className="">
									<span className="capitalize text-base font-sans text-black-100">
										<StyledBadge
											overlap="circular"
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right',
											}}
											variant="dot"
										>
											<AvatarAtom
												alt="Remy Sharp"
												src="https://www.befunky.com/images/prismic/ccab4757a0d4a48fa2093d8b295a7a8857e3cd7f_landing-photo-to-cartoon-img-2-before.jpg?auto=webp&format=jpg&width=863"
												// sx={{ width: 56, height: 56 }}
												variant="circular"
											/>
										</StyledBadge>
									</span>
								</div>
								<span className="capitalize  text-[9px] xl:text-primary font-bold text-xl whitespace-nowrap font-sans tracking-tight ml-2">
									{/* {`${user?.first_name} ${user?.last_name}`} */}
									Test User
								</span>
							</div>
							<hr />
							<div className="w-full">
								<div className="flex w-full shadow items-center">
									<FaMobileAlt
										className=" text-[9px] text-primary ml-5"
										size="20px"
									/>
									<a
										href="https://drive.google.com/file/d/1spi9f6DJwc3Qx3QYTObODz8j8gpb5ly4/view?usp=sharing"
										target="_blank"
										rel="noreferrer"
										className="transform-none whitespace-nowrap font-sans font-semibold xl:py-1 py-2 text-base xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0 text-[#333333]"
									>
										Mobile App
									</a>
								</div>

								<div className="flex w-full shadow items-center">
									<AiOutlineSmile
										className=" text-[9px] text-primary ml-5"
										size="20px"
									/>
									<Label
										onClick={() => {
											router.push('/nft-market');
										}}
										value={
											// isSelected?.isManufacturer ? "I'm user" : "I'm manufacturer"
											'NFT marketplace'
										}
										className="transform-none whitespace-nowrap font-sans font-semibold xl:py-1 py-2 text-base xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0 text-[#333333]"
									/>
								</div>
								<div className="flex w-full shadow items-center">
									<AiFillRead
										className=" text-[9px] text-primary ml-5"
										size="20px"
									/>
									<Label
										// onClick={routing.bind(this, "about")}
										onClick={() => {
											router.push('/about');
										}}
										value="About"
										className={
											'transform-none w-full whitespace-nowrap font-sans font-semibold xl:py-1 py-2 text-base xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0'
											// isSelected?.isAbout
											//   ? "text-white transform-none rounded-full whitespace-nowrap font-sans bg-secondary xl:py-1 py-2 text-base xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0"
											//   : "px-1 xl:px-2 2xl:px-4 text-white whitespace-nowrap text-base font-sans cursor-pointer"
										}
									/>
								</div>

								<div className="flex w-full shadow items-center">
									<AiOutlineSmile
										className=" text-[9px] text-primary ml-5"
										size="20px"
									/>
									<Label
										onClick={() => {
											router.push('/manufacturer');
										}}
										value={
											// isSelected?.isManufacturer ? "I'm user" : "I'm manufacturer"
											"I'm manufacturer"
										}
										className={
											'transform-none whitespace-nowrap font-sans font-semibold xl:py-1 py-2 text-base xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0 '
										}
									/>
								</div>

								<div className="flex w-full shadow items-center">
									<AiOutlineBulb
										className=" text-[9px] text-primary ml-5"
										size="20px"
									/>
									<Label
										// onClick={routing.bind(this, "blog")}
										onClick={() => {
											router.push('/blog');
										}}
										value="Blog"
										className={
											' transform-none w-full whitespace-nowrap font-sans font-semibold  xl:py-1 py-2 text-base xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0'
											// isSelected?.isBlog
											//   ? "text-white transform-none rounded-full whitespace-nowrap font-sans bg-secondary xl:py-1 py-2 text-base xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0"
											//   : "px-1 xl:px-2 2xl:px-4 text-white whitespace-nowrap text-base font-sans cursor-pointer"
										}
									/>
								</div>
								<div className="flex w-full shadow items-center">
									<AiOutlineTrophy
										className=" text-[9px] text-primary ml-5"
										size="20px"
									/>
									<Label
										// onClick={routing.bind(this, "success-story")}
										onClick={() => {
											router.push('/success-story');
										}}
										value="Success story"
										className={
											' transform-none w-full whitespace-nowrap font-sans font-semibold xl:py-1 py-2 text-base xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0'
											// isSelected?.successStory
											//   ? "text-white transform-none rounded-full whitespace-nowrap font-sans bg-secondary xl:py-1 py-2 text-base xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0"
											//   : "px-1 xl:px-2 2xl:px-4 text-white whitespace-nowrap text-base font-sans cursor-pointer"
										}
									/>
								</div>
								<div className="flex w-full shadow items-center">
									<MdOutlineCreateNewFolder
										className=" text-[9px] text-primary ml-5"
										size="20px"
									/>
									<Label
										onClick={onClickProCreate}
										value="Start Project"
										className={
											' transform-none w-full whitespace-nowrap font-sans font-semibold xl:py-1 py-2 text-base xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0'
										}
									/>
								</div>
								{session ? (
									<div className="flex w-full shadow items-center">
										<AiOutlineUser
											className=" text-[9px] text-primary ml-5"
											size="20px"
										/>
										<Link
											href={`/${session?.user?.role?.toLowerCase()}/dashboard`}
										>
											<a className="flex cursor-pointer items-center mx-2 py-2 ">
												<div className="xl:w-8 w-6 xl:h-8 h-6 flex items-center justify-center  bg-gray-200 rounded-full">
													<span className="capitalize text-base font-sans text-black">
														{user ? user?.first_name?.charAt(0) : 'O'}
													</span>
												</div>
												<span className="capitalize text-[#333333] font-semibold text-base whitespace-nowrap font-sans tracking-tight ml-2">{`${
													user?.first_name ?? 'Loading'
												} ${user?.last_name ?? '...'}`}</span>
											</a>
										</Link>
									</div>
								) : (
									<>
										<div className="flex w-full shadow items-center">
											<AiOutlineLogin
												className=" text-[9px] text-primary ml-5"
												size="20px"
											/>
											<Label
												onClick={() =>
													dispatch(openLoginPopup({ ref: '' }))
												}
												value="Login"
												className={
													' transform-none w-full whitespace-nowrap font-sans font-semibold xl:py-1 py-2 text-base xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0'
												}
											/>
										</div>

										<div className="flex w-full shadow items-center">
											<AiFillEdit
												className=" text-[9px] text-primary ml-5"
												size="20px"
											/>
											<Label
												onClick={() => dispatch(openSignUpPopup())}
												value="Sign Up"
												className={
													' transform-none w-full whitespace-nowrap font-sans font-semibold xl:py-1 py-2 text-base xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0 '
												}
											/>
										</div>
									</>
								)}
							</div>
							<div className="flex items-center space-x-3 mt-5 justify-end icon">
								<a
									target="_blank"
									href="https://www.facebook.com/makeideeza"
									rel="noreferrer"
								>
									<svg
										id="facebook-app-logo"
										className="w-5 h-5 svg"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 27.609 27.609"
									>
										<path
											id="Path_49"
											data-name="Path 49"
											d="M26.084,0H1.524A1.524,1.524,0,0,0,0,1.525v24.56A1.524,1.524,0,0,0,1.524,27.61H14.746V16.918h-3.6V12.751h3.6V9.678c0-3.565,2.177-5.508,5.358-5.508a29.841,29.841,0,0,1,3.214.164V8.06H21.113c-1.73,0-2.063.822-2.063,2.028v2.66h4.127l-.54,4.167H19.049V27.609h7.035a1.525,1.525,0,0,0,1.525-1.523V1.524A1.524,1.524,0,0,0,26.084,0Z"
											transform="translate(0 -0.001)"
											fill="#ccc"
										/>
									</svg>
								</a>
								<a
									target="_blank"
									href="https://www.instagram.com/the_ideeza/"
									rel="noreferrer"
								>
									<svg
										id="instagram-logo"
										className="w-5 h-5 svg"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 27.365 27.365"
									>
										<path
											id="Path_50"
											data-name="Path 50"
											d="M19.813,0H7.552A7.56,7.56,0,0,0,0,7.552V19.813a7.56,7.56,0,0,0,7.552,7.552H19.813a7.56,7.56,0,0,0,7.552-7.552V7.552A7.56,7.56,0,0,0,19.813,0Zm5.124,19.813a5.13,5.13,0,0,1-5.124,5.124H7.552a5.129,5.129,0,0,1-5.124-5.124V7.552A5.13,5.13,0,0,1,7.552,2.428H19.813a5.13,5.13,0,0,1,5.124,5.124V19.813Z"
											fill="#ccc"
										/>
										<path
											id="Path_51"
											data-name="Path 51"
											d="M48.019,40.97a7.051,7.051,0,1,0,7.051,7.051A7.059,7.059,0,0,0,48.019,40.97Zm0,11.674a4.623,4.623,0,1,1,4.623-4.623A4.628,4.628,0,0,1,48.019,52.644Z"
											transform="translate(-34.337 -34.338)"
											fill="#ccc"
										/>
										<path
											id="Path_52"
											data-name="Path 52"
											d="M120.7,28.251a1.78,1.78,0,1,0,1.259.521A1.788,1.788,0,0,0,120.7,28.251Z"
											transform="translate(-99.672 -23.678)"
											fill="#ccc"
										/>
									</svg>
								</a>

								<a
									target="_blank"
									href="https://www.linkedin.com/company/makeideeza/"
									rel="noreferrer"
								>
									<svg
										id="linkedin-logo"
										className="w-5 h-5 svg"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 27.365 27.365"
									>
										<g id="post-linkedin">
											<path
												id="Path_53"
												data-name="Path 53"
												d="M24.629,0H2.737A2.745,2.745,0,0,0,0,2.737V24.629a2.745,2.745,0,0,0,2.737,2.737H24.629a2.745,2.745,0,0,0,2.737-2.737V2.737A2.745,2.745,0,0,0,24.629,0ZM8.21,23.26H4.1V10.946h4.1ZM6.157,8.62A2.463,2.463,0,1,1,8.62,6.157,2.453,2.453,0,0,1,6.157,8.62Zm17.1,14.64h-4.1V16.009a2.052,2.052,0,0,0-4.1,0V23.26h-4.1V10.946h4.1v1.642a4.42,4.42,0,0,1,3.421-1.916,4.848,4.848,0,0,1,4.789,4.789Z"
												fill="#ccc"
											/>
										</g>
									</svg>
								</a>
								<a
									target="_blank"
									href="https://twitter.com/MAKE_IDEEZA"
									rel="noreferrer"
								>
									<svg
										id="twitter-logo-on-black-background"
										className="w-5 h-5 svg"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 27.365 27.365"
									>
										<g id="post-twitter">
											<path
												id="Path_54"
												data-name="Path 54"
												d="M24.629,0H2.737A2.745,2.745,0,0,0,0,2.737V24.629a2.745,2.745,0,0,0,2.737,2.737H24.629a2.745,2.745,0,0,0,2.737-2.737V2.737A2.745,2.745,0,0,0,24.629,0ZM21.482,9.988c-.137,6.294-4.1,10.672-10.125,10.946a9.959,9.959,0,0,1-5.884-1.642,7.264,7.264,0,0,0,5.336-1.505,3.7,3.7,0,0,1-3.421-2.6,5.519,5.519,0,0,0,1.505,0A3.727,3.727,0,0,1,6.02,11.493a2.758,2.758,0,0,0,1.505.41A4.046,4.046,0,0,1,6.431,6.978a10.842,10.842,0,0,0,7.525,3.831C13,6.978,18.2,4.926,20.25,7.525A9.218,9.218,0,0,0,22.576,6.7a3.868,3.868,0,0,1-1.505,2.052,7.843,7.843,0,0,0,1.916-.547C22.85,8.894,22.166,9.441,21.482,9.988Z"
												fill="#ccc"
											/>
										</g>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>
				<LoginPopup />
				<SignUpPopup
				// open={openSignUp}
				// toggleSignUp={toggleSPSignUp}
				// handleSignInSignUpToggle={handleSignInSignUpToggle}
				// onGoogleSignInSuccess={onGoogleSignInSuccess}
				// onGoogleSignInFailure={onGoogleSignInFailure}
				/>

				<div className="xl:px-[100px] md:px-10 px-6 lg:py-[12px] 2xl:py-[26px] flex items-center justify-between w-full custom-header relative py-[5px]">
					<Link href="/">
						<a className=" w-[50px] sm:w-[80px] xl:w-[100px] custom-resp-logo">
							<img
								src="/images/logo/logo-white.svg"
								className="xl:w-[90px]"
								alt="logo"
							/>
						</a>
					</Link>
					<div className="lg:hidden lg:pt-3 flex f items-center justify-end w-full float-right custom-humburger-btn">
						<Button
							// onClick={() => {
							//   // console.log("clicking");
							//   // setShowMenuMobile((prev) => !prev);
							// }}
							onClick={() => setShowMenuMobile(!showMenuMobile)}
							value={
								<>
									{/* <svg className=" m-auto w-6 hamburger-icon" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  </svg> */}
									<CgMenuRight className="text-3xl" />
								</>
							}
							className="block p-1 px-1 bg-transparent shadow-none text-white focus:outline-none"
						/>
					</div>
					<div className="lg:flex items-center justify-end hidden">
						<div className="flex items-center justify-end text-white xl:pr-8 pr-1 gap-2">
							<a
								href="https://drive.google.com/file/d/1spi9f6DJwc3Qx3QYTObODz8j8gpb5ly4/view?usp=sharing"
								target="_blank"
								rel="noreferrer"
								className={`text-white p-1 xl:px-2 2xl:px-4 py-2 cursor-pointer transition-all hover:bg-[#561F80] rounded-full ${
									isActive('/success-story')
										? 'bg-secondary rounded-full text-[12px] xl:text-[14px] 2xl:text-base'
										: 'text-[12px] xl:text-[14px] 2xl:text-base'
								}`}
							>
								Mobile App
							</a>
							<a
								// href="/nft-market"
								onClick={() => {
									router.push('/nft-market');
								}}
								className={`text-white p-1 xl:px-2 2xl:px-4 py-2 cursor-pointer transition-all hover:bg-[#561F80] rounded-full ${
									isActive('/nft-market')
										? 'bg-secondary rounded-full text-[12px] xl:text-[14px] 2xl:text-base'
										: 'text-[12px] xl:text-[14px] 2xl:text-base'
								}`}
							>
								NFT marketplace
							</a>

							<a
								onClick={() => {
									router.push('/about');
								}}
								className={`text-white p-1 xl:px-2 2xl:px-4 py-2 cursor-pointer transition-all hover:bg-[#561F80] rounded-full ${
									isActive('/about')
										? 'bg-secondary rounded-full text-[12px] xl:text-[14px] 2xl:text-base'
										: 'text-[12px] xl:text-[14px] 2xl:text-base'
								}`}
							>
								About
							</a>

							<a
								onClick={() => {
									router.push(
										`${isActive('/manufacturer') ? '/' : '/manufacturer'}`
									);
								}}
								className={`text-white p-1 xl:px-2 2xl:px-4 py-2 cursor-pointer transition-all hover:bg-[#561F80] rounded-full ${
									isActive('/manufacturer')
										? 'bg-secondary rounded-full text-[12px] xl:text-[14px] 2xl:text-base'
										: 'text-[12px] xl:text-[14px] 2xl:text-base'
								}`}
							>
								{' '}
								{isActive('/manufacturer') ? "I'm user" : "I'm manufacturer"}
							</a>

							<a
								onClick={() => {
									router.push('/blog');
								}}
								className={`text-white p-1 xl:px-2 2xl:px-4 py-2 cursor-pointer transition-all hover:bg-[#561F80] rounded-full ${
									isActive('/blog')
										? 'bg-secondary rounded-full text-[12px] xl:text-[14px] 2xl:text-base'
										: 'text-[12px] xl:text-[14px] 2xl:text-base'
								}`}
							>
								Blog
							</a>

							<a
								onClick={() => {
									router.push('/success-story');
								}}
								className={`text-white p-1 xl:px-2 2xl:px-4 py-2 cursor-pointer transition-all hover:bg-[#561F80] rounded-full ${
									isActive('/success-story')
										? 'bg-secondary rounded-full text-[12px] xl:text-[14px] 2xl:text-base'
										: 'text-[12px] xl:text-[14px] 2xl:text-base'
								}`}
							>
								Success story
							</a>

							{/* <Link href="/user/dashboard/project/create"> */}
							<a
								className="text-white p-1 xl:px-2 2xl:px-4 py-2 cursor-pointer bg-secondary rounded-full text-[12px] xl:text-[14px] 2xl:text-base transition-all hover:bg-[#561F80]"
								onClick={onClickProCreate}
							>
								Start Project
							</a>
							{/* </Link> */}

							{session ? (
								<a
									onClick={() =>
										router.push(
											`/${session?.user?.role?.toLowerCase()}/dashboard`
										)
									}
									className="flex cursor-pointer items-center mx-2"
								>
									{user?.profile_photo ? (
										<AvatarAtom
											className="capitalize w-6 h-6 md:w-10 md:h-10 text-xl"
											// src={user?.first_name[0]}
											src={[user?.profile_photo]}
											variant="circular"
										/>
									) : (
										<div className="xl:w-8 w-6 xl:h-8 h-6 flex items-center justify-center bg-gray-200 rounded-full">
											<span className="capitalize text-[12px] xl:text-[14px] 2xl:text-base font-sans text-black ">
												{user ? user?.first_name?.charAt(0) : 'O'}
											</span>
										</div>
									)}
									<span className="capitalize text-white text-base whitespace-nowrap font-sans tracking-tight ml-2 ">{`${
										user?.first_name ?? 'Loading'
									} ${user?.last_name ?? '...'}`}</span>
								</a>
							) : (
								<>
									<Label
										// onClick={() => handleSignUpClick()}
										onClick={() => {
											if (pathName === '/') {
												dispatch(openSignUpPopup());
											} else {
												dispatch(openSignUpOptions());
											}
										}}
										value="Sign up"
										className={
											isSelected?.isSignup
												? 'text-white transform-none rounded-full whitespace-nowrap  bg-secondary xl:py-1 py-2 text-base font-medium 2xl:text-xl xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0'
												: 'px-1 xl:px-2 2xl:px-4 xl:pr-1 py-2 text-white whitespace-nowrap text-base font-medium cursor-pointer transition-all hover:bg-[#561F80] rounded-full'
										}
									/>
									<span>|</span>
									<Label
										// onClick={toggleOpen}
										onClick={() => dispatch(openLoginPopup({ ref: '' }))}
										value="Log in"
										className={
											isSelected?.isLogin
												? 'text-white transform-none font-medium rounded-full whitespace-nowrap  bg-secondary xl:py-1 py-2 text-base 2xl:text-xl xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0'
												: 'px-1 xl:px-2 2xl:px-4 xl:pl-1 py-2 text-white whitespace-nowrap text-base font-medium cursor-pointer hover:bg-[#561F80] rounded-full'
										}
									/>
								</>
							)}
						</div>
					</div>
				</div>
			</AppBar>
		</>
	);
};

export default PublicHeader;
