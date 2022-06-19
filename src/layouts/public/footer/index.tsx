import Button from '@atoms/button';
import Label from '@atoms/label';
// import { useState } from "react";
import Link from 'next/link';
// import Image from "next/image";
import LoginPopup from '@organisms/login-popup';
import { useAppDispatch } from 'app/hooks';
import { openSignUpOptions } from 'reducers/signup';
import SignUpPopup from '@organisms/signup-popup';

function PublicFooter() {
	// const [openLogin, setOpenLogin] = useState(false);
	// const toggleOpen = () => {
	//   setOpenLogin(!openLogin);
	// };
	const dispatch = useAppDispatch();
	// const handleLogin = () => {
	// Promise.all([dispatch(Actions.onLogin(e))]).then(() => toggleOpen());
	// };
	// const handleSignInSignUpToggle = () => {
	//   toggleOpen();
	//   // toggleSignUp();
	// };

	// const onGoogleSignInSuccess = () => {
	// console.log("Google signin success response = ", JSON.stringify(e));
	// setLoginType("google");
	//setfbResponseObj(e);
	// toggleOpen();
	/*dispatch(
      onSocialLogin({
        provider: e?.graphDomain,
        access_token: e?.accessToken,
        social_id: e?.userID,
      })
    );*/
	// };

	// const responseFacebook = (e: any) => {
	//   // console.log("facebook response = ", JSON.stringify(e));
	//   if (e?.status === "unknown") {
	//     return;
	//   }

	//   toggleOpen();
	//   // dispatch(
	//   //   onSocialLogin({
	//   //     provider: e?.graphDomain,
	//   //     access_token: e?.accessToken,
	//   //     social_id: e?.userID,
	//   //   })
	//   // );
	// };

	return (
		<div className="bg-white">
			{/* <img src="/images/footer.png" alt="" /> */}
			<footer className="w-full pb-4 font-pop">
				<SignUpPopup
				// open={openSignUp}
				// toggleSignUp={toggleSignUp}
				// handleSignInSignUpToggle={handleSignInSignUpToggle}
				// onGoogleSignInSuccess={onGoogleSignInSuccess}
				// onGoogleSignInFailure={onGoogleSignInFailure}
				/>
				<LoginPopup
				// open={openLogin}
				// // handleLogin={handleLogin}
				// toggleOpen={toggleOpen}
				// handleSignInSignUpToggle={handleSignInSignUpToggle}
				// // handlefbLogin={handlefbLogin}
				// responseFacebook={responseFacebook}
				// onGoogleSignInSuccess={onGoogleSignInSuccess}
				// onGoogleSignInFailure={onGoogleSignInFailure}
				/>
				<div className="md:pt-[90px] pt-[70px] md:pb-[60px] md:px-8 lg:pb-20 w-full text-center">
					<Label
						value="Join our growing fabulous community"
						className="text-white text-base text-[20px] xl:text-[35px] leading-[52px] font-[500] text-center mb-[42px]"
					/>
					<Button
						value="Join now"
						className="text-white mb-6 md:mb-10 lg:mb-0 font-normal bg-primary capitalize px-12 md:px-[30px] md:py-[15px] shadow-xl outline-none rounded-[6px] text-[18px] leading-[21px]"
						// onClick={toggleSPSignUp}
						// onClick={toggleSPSignUp}
						onClick={() => dispatch(openSignUpOptions())}
						variant="contained"
						color="primary"
					/>
				</div>
				<div className="w-full lg:px-[100px] px-[20px]">
					<div className="w-full py-4 flex items-end flex-wrap border-t-2 border-primary ">
						<div className="w-full md:w-[80%] lg:w-[60%] md:m-auto text-white font-light text-base 2xl:text-xl flex flex-wrap justify-between items-center">
							<Link href="/about">
								<a className="md:px-3 cursor-pointer  text-[13px] md:text-base ">
									About
								</a>
							</Link>
							<Link href="/pricing">
								<a className="md:px-3 cursor-pointer  text-[13px] md:text-base">
									Pricing
								</a>
							</Link>
							<Link href="/contact">
								<a className="md:px-3 cursor-pointer  text-[13px] md:text-base">
									Contact{' '}
								</a>
							</Link>
							<Link href="/investor">
								<a className="md:px-3 cursor-pointer  text-[13px] md:text-base">
									Investor
								</a>
							</Link>
							<Link href="/agreement">
								<a className="md:px-3 cursor-pointer  text-[13px] md:text-base">
									Legal
								</a>
							</Link>
							<Link href="/faq">
								<a className="md:px-3 cursor-pointer  text-[13px] md:text-base">
									FAQ
								</a>
							</Link>
						</div>
						<div className="w-full flex md:flex-row md:m-0 md:pt-[45px] flex-col md:items-end md:justify-between xl:px-[100px] 2xl:px-[170px]">
							<div className=" w-full hidden xl:block">
								<Link href="/">
									<a>
										<img
											src="/images/logo/ideeza-footer-logo.svg"
											alt=""
										/>
										{/* <Image
                      className="text-white w-full"
                      width={115}
                      height={"100"}
                      src="/images/logo/ideeza-footer-logo.svg"
                      alt="logo"
                      // layout="responsive"
                    /> */}
									</a>
								</Link>
							</div>
							<div className="text-center md:m-0 mt-[8px] md:my-0 text-[13px] md:text-base md:ml-0 md:text-center w-full text-white">
								© 2016 Ideeza All rights reserved
							</div>
							<div className="text-center flex items-center md:justify-end justify-center w-full text-white">
								<Link href="/agreement">
									<a className="text-white pr-1 text-[13px] md:text-base cursor-pointer">
										Privacy Policy
									</a>
								</Link>
								|
								<Link href="/agreement">
									<a className="text-white text-[13px] md:text-base cursor-pointer pl-1">
										Terms & Condition
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default PublicFooter;
