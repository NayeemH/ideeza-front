import Label from '@atoms/label';
import LoginPopup from '@organisms/login-popup';
import { Badge, Drawer, styled } from '@mui/material';
import {
	AiFillEdit,
	AiFillRead,
	AiOutlineBulb,
	AiOutlineLogin,
	AiOutlineSmile,
	AiOutlineTrophy,
} from 'react-icons/ai';

interface PrivateDrawerProps {
	toggleDrawer: () => void;
	open: boolean;
	isSelected: boolean;
	handleLogin: boolean;
	openLogin: boolean;
	toggleOpen: () => void;
	handleSignInSignUpToggle: boolean;
	handlefbLogin: boolean;
	responseFacebook: boolean;
	onGoogleSignInSuccess: boolean;
	onGoogleSignInFailure: boolean;
	submiting: boolean;
	openSignUp: boolean;
	toggleSignUp: boolean;
	handleSignUpClick: boolean;
}

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

function PrivateDrawer({
	toggleDrawer,
	open,
	// isSelected,
	// handleLogin,
	// openLogin,
	toggleOpen,
	// handleSignInSignUpToggle,
	// handlefbLogin,
	// responseFacebook,
	// onGoogleSignInSuccess,
	// onGoogleSignInFailure,
	// submiting,
	handleSignUpClick,
}: PrivateDrawerProps) {
	const handleRoute = () => {
		// if (User) {
		//     setUser(User);
		//     if (User?.role === "User") {
		//         history.push("/user/dashboard/home");
		//     } else if (User?.role === "Technician") {
		//         history.push("/technician/dashboard/home");
		//     }
		// }
	};

	return (
		<div>
			<Drawer
				anchor={'left'}
				open={open}
				onClose={toggleDrawer}
				transitionDuration={2000}
				// hideBackdrop={true}
			>
				{/* <LoginPopup
                    open={openLogin}
                    handleLogin={handleLogin}
                    toggleOpen={toggleOpen}
                    handleSignInSignUpToggle={handleSignInSignUpToggle}
                    handlefbLogin={handlefbLogin}
                    responseFacebook={responseFacebook}
                    onGoogleSignInSuccess={onGoogleSignInSuccess}
                    onGoogleSignInFailure={onGoogleSignInFailure}
                    submiting={submiting}
                /> */}
				<LoginPopup
				//    open={openLogin}
				//     toggleOpen={toggleOpen}
				// handleSignInSignUpToggle={handleSignInSignUpToggle}
				// submiting={submiting}
				/>
				{/* <SignUpPopup
                    openSignUp={openSignUp}
                    toggleSignUp={toggleSignUp}
                    handleSignInSignUpToggle={handleSignInSignUpToggle}
                    onGoogleSignInSuccess={onGoogleSignInSuccess}
                    onGoogleSignInFailure={onGoogleSignInFailure}
                /> */}
				<div className="pt-2 w-80">
					<div className="flex items-center flex-col justify-end text-white xl:pr-8 pr-1">
						<div
							// onClick={push}
							onClick={handleRoute}
							className="flex flex-col cursor-pointer h-48 justify-center items-center mx-2"
						>
							<div className="">
								<span className="capitalize text-base 2xl:text-xl font-sans text-gray-700">
									{/* {user ? (user?.first_name)[0] : ""}H */}
									{/* user image */}
									<StyledBadge
										overlap="circular"
										anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
										variant="dot"
									>
										{/* <Avatar
                                            alt="Remy Sharp"
                                            src="https://www.befunky.com/images/prismic/ccab4757a0d4a48fa2093d8b295a7a8857e3cd7f_landing-photo-to-cartoon-img-2-before.jpg?auto=webp&format=jpg&width=863"
                                            sx={{ width: 56, height: 56 }}
                                        /> */}
									</StyledBadge>
								</span>
							</div>
							<span className="capitalize text-primary font-bold text-xl whitespace-nowrap font-sans tracking-tight ml-2">
								{/* {`${user?.first_name} ${user?.last_name}`} */}
								Test User
							</span>
						</div>
						<hr />
						<div className="w-full">
							<div className="flex w-full shadow items-center">
								<AiOutlineSmile
									className="text-primary ml-5"
									size="20px"
								/>
								<Label
									// onClick={routing.bind(this, "manufacturer")}
									// value={
									//     isSelected?.isManufacturer ? "I'm user" : "I'm manufacturer"
									// }
									className={
										'transform-none whitespace-nowrap font-sans font-semibold xl:py-1 py-2 text-base 2xl:text-xl xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0 '
									}
								/>
							</div>
							<div className="flex w-full shadow items-center">
								<AiFillRead
									className="text-primary ml-5"
									size="20px"
								/>
								<Label
									// onClick={routing.bind(this, "about")}
									value="About"
									className={
										'transform-none w-full whitespace-nowrap font-sans font-semibold xl:py-1 py-2 text-base 2xl:text-xl xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0'
									}
								/>
							</div>
							<div className="flex w-full shadow items-center">
								<AiOutlineBulb
									className="text-primary ml-5"
									size="20px"
								/>
								<Label
									// onClick={routing.bind(this, "blog")}
									value="Blog"
									className={
										' transform-none w-full whitespace-nowrap font-sans font-semibold  xl:py-1 py-2 text-base 2xl:text-xl xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0'
										// isSelected?.isBlog
										//   ? "text-white transform-none rounded-full whitespace-nowrap font-sans bg-secondary xl:py-1 py-2 text-base 2xl:text-xl xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0"
										//   : "px-1 xl:px-4 text-white whitespace-nowrap text-base 2xl:text-xl font-sans cursor-pointer"
									}
								/>
							</div>
							<div className="flex w-full shadow items-center">
								<AiOutlineTrophy
									className="text-primary ml-5"
									size="20px"
								/>
								<Label
									// onClick={routing.bind(this, "success-story")}
									value="Success story"
									className={
										' transform-none w-full whitespace-nowrap font-sans font-semibold xl:py-1 py-2 text-base 2xl:text-xl xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0'
										// isSelected?.successStory
										//   ? "text-white transform-none rounded-full whitespace-nowrap font-sans bg-secondary xl:py-1 py-2 text-base 2xl:text-xl xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0"
										//   : "px-1 xl:px-4 text-white whitespace-nowrap text-base 2xl:text-xl font-sans cursor-pointer"
									}
								/>
							</div>
							<div className="flex w-full shadow items-center">
								<AiOutlineLogin
									className="text-primary ml-5"
									size="20px"
								/>
								<Label
									// onClick={routing.bind(this, "success-story")}
									onClick={toggleOpen}
									value="Login"
									className={
										' transform-none w-full whitespace-nowrap font-sans font-semibold xl:py-1 py-2 text-base 2xl:text-xl xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0'
										// isSelected?.successStory
										//   ? "text-white transform-none rounded-full whitespace-nowrap font-sans bg-secondary xl:py-1 py-2 text-base 2xl:text-xl xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0"
										//   : "px-1 xl:px-4 text-white whitespace-nowrap text-base 2xl:text-xl font-sans cursor-pointer"
									}
								/>
							</div>
							<div className="flex w-full shadow items-center">
								<AiFillEdit
									className="text-primary ml-5"
									size="20px"
								/>
								<Label
									onClick={handleSignUpClick}
									value="Sign Up"
									className={
										' transform-none w-full whitespace-nowrap font-sans font-semibold xl:py-1 py-2 text-base 2xl:text-xl xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0 '
										// isSelected?.successStory
										//   ? "text-white transform-none rounded-full whitespace-nowrap font-sans bg-secondary xl:py-1 py-2 text-base 2xl:text-xl xl:leading-8 xl:px-5 px-3 xl:mx-3 outline-none border-0"
										//   : "px-1 xl:px-4 text-white whitespace-nowrap text-base 2xl:text-xl font-sans cursor-pointer"
									}
								/>
							</div>
						</div>
						<div className="flex items-center space-x-3 mt-5 justify-end icon">
							<a
								target="_blank"
								rel="noreferrer"
								href="https://www.facebook.com/makeideeza"
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
								rel="noreferrer"
								href="https://www.instagram.com/the_ideeza/"
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
								rel="noreferrer"
								href="https://www.linkedin.com/company/makeideeza/"
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
								rel="noreferrer"
								href="https://twitter.com/MAKE_IDEEZA"
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
			</Drawer>
		</div>
	);
}

export default PrivateDrawer;
