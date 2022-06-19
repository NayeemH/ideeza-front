import Button from '@atoms/button';
import Label from '@atoms/label';
import IFramePopup from '@organisms/iframe-popup';
import LoginPopup from '@organisms/login-popup';
import SignUpPopup from '@organisms/signup-popup';
import ManufacturerSignUpPopup from '@organisms/manufacturer-signup';
import FreelancerSignUpPopup from '@organisms/freelancer-signup-popup';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import PublicLayout from 'layouts/public';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { openSignUpOptions } from 'reducers/signup';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import {openLoginPopup} from "../../../reducers/login";
import {
	AskingToLoginPopup,
	LoginSignUpPopup,
	ProgressPopup,
} from '@organisms/login-sign-up-prompt-popup';
import { landingPageSearchTimes } from '../../../utils/utils';
import {
	closeProgressPopup,
	openAskingToLoginPopup,
	openLoginSignUpPopup,
	openProgressPopup,
} from 'reducers/loginSignUpPromptPopup';
import { IProject } from '@models/projects';
import { openLoginPopup, updateLoginRef } from 'reducers/login';
// import { IMAGE_PLACEHOLDER } from "enums/common";
import TopRated from '@organisms/landing/top-rated';
import TopCollections from '@organisms/landing/top-collections';
import { toast } from 'react-toastify';
import {
	AiFillFacebook,
	AiFillInstagram,
	AiFillLinkedin,
	AiFillTwitterSquare,
} from 'react-icons/ai';
import ThumbnailImageOrVideo from '@molecules/thumbnail-image-or-video';
import { RiMailAddLine } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';

const Home = (props: any) => {
	const { projects, topProducts, topRatedProjects } = props;
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { data: session, status } = useSession();
	// console.log(session, status);

	const [open, setOpen] = useState(false);
	const [searchText, setSearchText] = useState<any>('');
	const [showMessageField, setShowMessageField] = useState(false);
	const auth_data = useAppSelector((state) => state.auth);

	const toggleOpen = () => setOpen((state) => !state);

	// const handleSignUp = (e: any) => {};

	const handleSignUpPopUp = () => {
		dispatch(openSignUpOptions());
	};

	const handleSearch = (event: any) => {
		const key = event.key || event.keyCode;
		if (key === 13 || key === 'Enter') {
			if (
				typeof auth_data !== 'undefined' &&
				auth_data !== null &&
				auth_data.userData !== undefined &&
				auth_data.userData !== null
			) {
				if (auth_data?.userData?.role !== 'User') {
					return toast.error('You are not logged in as a User!');
				}

				router.push(
					`/user/dashboard/search-result?query=${encodeURIComponent(event.target.value)}`
				);
			} else {
				dispatch(
					updateLoginRef(
						event.target.value !== ''
							? `/user/dashboard/search-result?query=${encodeURIComponent(
									event.target.value
							  )}`
							: ''
					)
				);

				if (
					landingPageSearchTimes().get() > 0 &&
					landingPageSearchTimes().getLastSearchAgo() < 45
				) {
					dispatch(openLoginSignUpPopup());
					return;
				}

				dispatch(openProgressPopup());

				setTimeout(() => {
					dispatch(closeProgressPopup());
					dispatch(openAskingToLoginPopup());
				}, 3000);

				/*dispatch(openLoginPopup({
		  ref: `/user/dashboard/search-result?query=${encodeURIComponent(event.target.value)}`,
		}));*/
			}

			// update the status of the total search times
			landingPageSearchTimes().set(landingPageSearchTimes().get() + 1);
		}
	};
	function SampleNextArrow(props: any) {
		const { onClick } = props;
		return (
			<div
				className="absolute left-[51%] bottom-[0] z-10 cursor-pointer hidden xl:block"
				onClick={onClick}
			>
				<img
					src="/images/icon/arrow-left-tab.svg"
					className="w-[35px] h-[35px] mr-12 rounded-[4px] bg-primary px-2"
					alt="icon"
				/>
			</div>
			// className={className}
			// style={{ ...style, display: "block", background: "red" }}
			// onClick={onClick}
		);
	}

	function SamplePrevArrow(props: any) {
		const { onClick } = props;
		return (
			<div
				className="absolute 2xl:left-[54%] z-10 xl:left-[55%] 2xl:top-[415px] xl:top-[295px] cursor-pointer hidden xl:block"
				onClick={onClick}
			>
				<img
					src="/images/icon/arrow-right-tab.svg"
					className="w-[35px] h-[35px] ml-4 mr-6 rounded-[4px] bg-primary px-2"
					alt="icon"
				/>
			</div>
			// className={className}
			// style={{ ...style, display: "block", background: "green" }}
			// onClick={onClick}
		);
	}
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	const handleLoginPopUp = () => {
		dispatch(openLoginPopup({ ref: '' }));
	};

	const onClickProjectItem = (item: any) => {
		const products: any = item?.products;
		const productCount: any = products?.length;
		const projectId = item?.id;
		const prouductId: any = productCount > 0 ? products[0].id : null;
		const projectUrl = `project/${projectId}`;
		const productUrl = `/product/${prouductId}`;
		// const redirectUrl = productCount > 0 ? productUrl : projectUrl;
		const redirectUrl = projectUrl;
		if (status === 'unauthenticated') {
			router.query.redirect_db = redirectUrl;
			router.push(router, undefined, { scroll: false });
			handleLoginPopUp();
		} else if (session?.user?.role) {
			router.push(`/${session?.user?.role.toLowerCase()}/dashboard/${redirectUrl}`);
		}
	};
	const handleWebCollaboration = () => {
		//   dispatch(previewData({ ...preview, attachment, category }));
		router.push('/web-collaboration');
	};

	return (
		<PublicLayout>
			<ProgressPopup />
			<AskingToLoginPopup searchText={searchText} />
			<LoginSignUpPopup />
			<LoginPopup />
			<SignUpPopup />
			<ManufacturerSignUpPopup />
			<FreelancerSignUpPopup />
			<IFramePopup
				open={open}
				toggleOpen={toggleOpen}
			/>

			<div className=" bg-landing bg-white pl-0 lg:pl-[50px] xl:pl-[100px] relative">
				<div className="lg:flex flex-col gap-[20px] items-center justify-end icon absolute 2xl:top-[45%] top-[40%] 2xl:right-[8%] md:right-[11%] sm:right-[8%] right-[1%] border border-solid border-[#E6E6E6] px-[10px] py-[15px] lg:px-[15px] lg:py-[25px] rounded-full hidden">
					<a
						target="_blank"
						rel="noreferrer"
						href="https://twitter.com/MAKE_IDEEZA"
					>
						<AiFillTwitterSquare
							className="rounded-[5px]"
							size="24"
							color="#461185"
						/>
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.linkedin.com/company/makeideeza/"
					>
						<AiFillLinkedin
							className="rounded-[5px]"
							size="24"
							color="#461185"
						/>
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.instagram.com/the_ideeza/"
					>
						<AiFillInstagram
							className="rounded-[5px]"
							size="24"
							color="#461185"
						/>
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.facebook.com/makeideeza"
					>
						<AiFillFacebook
							className="rounded-[5px]"
							size="24"
							color="#461185"
						/>
					</a>
				</div>
				<div className="relative lg:hidden">
					<img
						src="/images/landing/hero-image.png"
						alt=""
					/>
					{/* <Image
            src="/images/landing/bg-landing-image.png"
            className="w-[100%]"
            alt="image"
            width={"130%"}
            height={"80%"}
            layout="responsive"
          /> */}
				</div>
				<div className="sm:pt-[20px] md:pt-[30px] lg:pt-[220px] xl:pt-[255px] 2xl:pt-[342px] sm:pb-[100px] pb-[30px] 2xl:pb-[200px] xl:pb-[50px] md:pt-auto xl:pr-10 sm:px-0 px-6 lg:w-2/3 md:text-left text-center 2xl:w-1/2 xl:w-[55%] h-full flex flex-col lg:align-self-center justify-start lg:justify-center lg:items-start items-start md:px-[50px] lg:pl-0 ">
					<Label
						value={
							<>
								{/* text-primary */}
								<span className=" mt-5 text-primary text-[22px] md:text-[35px] xl:text-[42px] 2xl:text-[68px] md:mr-1 leading-[40px] xl:leading-[60px] 2xl:leading-[87px]">
									You dream it.
								</span>
								<span className="text-purple-900 first-letter:text-[#9006] pl-1 md:text-[35px] xl:text-[42px] 2xl:text-[68px] md:mr-1 text-[22px] leading-[40px] xl:leading-[60px] 2xl:leading-[87px]">
									IDEEZA designs it.
								</span>
								<span className="text-xl md:text-[35px] xl:text-[42px] 2xl:text-[68px] font-semibold leading-[40px] xl:leading-[60px] 2xl:leading-[87px]">
									Our Service providers executes it.
								</span>
							</>
						}
						className="text-xl text-center md:text-left md:text-[35px] xl:text-[42px] 2xl:text-[68px] font-semibold text-gray-700 leading-[40px] xl:leading-[60px] 2xl:leading-[87px] 2xl:w-full xl:w-[80%] lg:w-[70%]"
					/>
					<div className="mt-[30px] lg:w-[80%] xl:w-[87%]">
						<Label
							value="IDEEZA is an end-to-end hardware product development platform."
							className="text-gray-600 text-[16px] 2xl:text-[20px] text-center md:text-left leading-[34px]"
						/>
						<Label
							value="Enables anyone to generate a new product from a simple description for free and within minutes by using automatic and AI processes."
							className="text-[16px] font-medium text-gray-700 md:pr-2 leading-[34px] text-center md:text-left 2xl:text-[20px]"
						/>
					</div>

					<div className=" md:pr-[5px] md:w-[500px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px] bg-white mt-[28px] py-0 flex w-full rounded-md border pr-[5px] border-[#461185]">
						<svg
							className="2xl:w-[81px] h-[45px] 2xl:h-[56px] py-[10px] 2xl:py-[14px] px-[20px] bg-[#461185] rounded-tl-[5px] rounded-bl-[5px]"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 31.651 26.018"
						>
							<g
								xmlns="http://www.w3.org/2000/svg"
								id="Group_4455"
								data-name="Group 4455"
								transform="translate(-121 -782)"
							>
								<path
									id="Path_128"
									data-name="Path 128"
									d="M31.623,10.551C31.623,4.723,24.476,0,15.661,0c-6.612,0-12,2.853-14.44,6.333a6.662,6.662,0,0,0,.567,8.386c1.925,2.24,2.7,3.59,4.352,7.554C7.33,25.133,9.886,26,12.73,26.02c2.341.017,4.518-1.608,5.909-3.246a17.633,17.633,0,0,1,6.57-4.283c4.048-1.335,6.418-4.161,6.418-7.938"
									transform="translate(121 782)"
									fill="#fff"
								/>
								<path
									id="Path_129"
									data-name="Path 129"
									d="M11.484,5.78c-.2-.209-2.052-1.277-2.707-1.746A30.7,30.7,0,0,0,4.366,1.671C3.937,1.494,3.554,1.209,3.138,1,2.553.7,1.961.42,1.365.147A.879.879,0,0,0,.005.975c-.017.468.052,11.1.039,11.861A1.488,1.488,0,0,0,1.8,14.472a3.545,3.545,0,0,0,1.266-.536,19.22,19.22,0,0,0,2.16-1.343c1.043-.719,5.479-4.943,6.136-5.4a.886.886,0,0,0,.125-1.418"
									transform="translate(131.452 786.483)"
									fill="#461185"
								/>
							</g>
						</svg>

						<input
							type="text"
							className="text-gray-600  outline-none placeholder-[#f301c3] w-full md:text-md  xl:text-lg 2xl:text-xl font-poppins border-l lg:pl-4 pl-2 focus:placeholder-[#f57fdd44]"
							placeholder="Start now – type your idea here..."
							defaultValue={searchText}
							onKeyDown={(e: any) => handleSearch(e)}
							onChange={(e: any) => setSearchText(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div
				className=" rounded-full fixed right-5 bottom-5 bg-gradient-to-r from-[#5A1E81] to-[#E704BE] p-[10px] cursor-pointer z-[400]"
				onClick={() => setShowMessageField(!showMessageField)}
			>
				<RiMailAddLine className="xl:text-[35px] text-white" />
				{/* <img
            src="/images/technician-profile/Group-4452.svg"
            className="cursor-pointer"
            alt=""
          /> */}
			</div>
			<div className=" xl:pt-[60px] 2xl:pt-[122px] pb-[50px] 2xl:pb-[112px] bg-[#FBFBFB] w-full text-center inner-shadow-top">
				{/* <div className="absolute invisible bg-[#561F80] w-full md:w-[650px] text-white right-0 -top-56 p-8 rounded-tl-[50px]"> */}
				<div
					className={`messageField  ${
						showMessageField ? 'active-messageField' : ''
					} bg-[#561F80] w-[100%] md:w-[50%] xl:w-[500px] 2xl:w-[650px] text-white p-8 rounded-tl-[50px]`}
				>
					<IoClose
						className="text-white ml-auto mt-2 mr-2 relative top-[-15px] cursor-pointer"
						onClick={() => setShowMessageField(!showMessageField)}
						size="30px"
					/>
					<div className="flex items-center">
						<input
							type="text"
							className=" rounded-[32px] focus:outline-none w-full py-[10px] 2xl:py-6 px-4 text-zinc-500"
							placeholder="Enter your email address for notifying you.."
						/>
						<img
							src="images/technician-profile/Group-4452.svg"
							className="2xl:-ml-16 ml-[-40px] h-[35px] w-[35px] 2xl:h-[60px] 2xl:w-[60px] cursor-pointer"
							alt=""
						/>
					</div>

					<div className="2xl:text-2xl text-[16px] mt-3 text-left	">
						<p>"We are coming soon</p>
						<p>And going to change everything you know about</p>
						<p>the Hardware industry </p>
						<p>join us to be part of the movement" </p>
					</div>
				</div>
				<Label
					value="AI Maker for"
					className="text-[#461185] text-[16px] md:text-[20px] font-normal text-center leading-[34px]"
				/>
				<Label
					value="Connected Devices"
					className="text-[#333333] text-[20px] md:text-[30px] xl:text-[48px] md:mt-[10px] font-semibold text-center"
				/>
				<Label
					value="Building IoT prototypes used to need months, engineers, hair-ripping
                    budgets and dev tools creep. Good times."
					className="text-center text-[#787878] w-[100%] lg:w-[40%] 2xl:w-[30%] mx-auto text-[16px] leading-[29px] mt-[6px] 2xl:mb-[77px] mb-[30px]"
				/>
				<div className="connect-dev ">
					<div
						className="p-0 m-auto video-screen cursor-pointer mt-[75px] lg:mt-0"
						onClick={toggleOpen}
					></div>
				</div>
			</div>
			<div className="top-rated">
				<TopRated
					products={topProducts}
					projects={topRatedProjects}
				/>
			</div>
			<div className="top-collections bg-white">
				<TopCollections />
			</div>
			<div className=" xl:py-[120px] p-[20px] lg:p-0 lg:mt-[30px] xl:mt-[151px] mt-[20px] idea-sec-bg-img bg-cover bg-white">
				<div className="clip w-[100%] pt-[15px] h-[170px] sm:h-[190px] md:h-[225px] lg:h-[280px] xl:h-[145px] 2xl:h-[280px] flex flex-col justify-center items-center text-center">
					<Label
						value="Create something amazing"
						className="text-white text-[20px] lg:text-[30px] 2xl:text-[48px] text-center font-semibold lg:leading-[72px] leading-[22px]"
					/>
					<Label
						value="Join free, launch project and start building your smart prototype."
						className="text-white xl:mt-[14px] mb-[26px] text-base text-center px-2 leading-[29px]"
					/>
					<Button
						value="Launch your IDEEZA"
						className="text-white rounded-[5px] mb-10 lg:mb-0 bg-primary capitalize md:px-[30px] px-8 md:py-[15px] py-1 shadow-2xl outline-none border-0 text-[18px] leading-[21px]"
						variant="contained"
						color="primary"
						// onClick={toggleSPSignUp}
						onClick={handleSignUpPopUp}
					/>
				</div>
			</div>
			<div>
				<div className="w-full text-center md:mt-[50px] xl:mt-[130px] bg-white">
					<Label
						value="Top notch public projects"
						className="text-purple-900 w-full text-center text-[24px] lg:text-[30px] xl:text-[48px] font-semibold leading-[40px] xl:leading-[72px] mt-[30px] sm:mt-0"
					/>
					<Label
						value="made with IDEEZA"
						className="text-gray-700 w-full text-center tracking-wide text-[24px] lg:text-[30px] xl:text-[48px] font-semibold my-[10px] md:my-0 leading-[40px] xl:leading-[72px]"
					/>
					<Label
						value="Success Stories from Ideeza's growing community"
						className="text-gray-900 w-full text-center text-base font-light tracking-tight"
					/>
				</div>
				<div className="flex w-full flex-wrap items-start xl:mt-[75px] md:px-[100px] px-6 2xl:px-[267px] bg-white ">
					{/* <Carousal :carousalData="carouselData" className="w-full md:w-1/2" /> */}
					<div className="w-full custom-slick-slider ">
						{projects?.length > 0 && (
							<Slider {...settings}>
								{projects.map((item: IProject, index: number) => (
									<div
										key={index}
										className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-[31px] h-[615px] sm:h-[565px] xl:h-[330px] 2xl:h-[450px] mt-[20px] xl:mt-0"
									>
										<div
											className="cursor-pointer border border-gray-100 w-[90%] xl:w-[50%]"
											onClick={() => onClickProjectItem(item)}
										>
											<ThumbnailImageOrVideo
												data={item}
												height="450px"
												xlHeight="330px"
												imgXlHeight="330px"
											/>
										</div>
										<div className="xl:w-[50%] 2xl:mt-[70px] mt-[10px] xl:text-left">
											<Label
												value={item?.name}
												className="text-center text-xl xl:text-[35px] leading-[35px] 2xl:leading-[52px] lg:text-left w-full text-[#333333] font-[500]"
											/>
											<Label
												value={
													item?.description &&
													item?.description?.length > 160
														? item?.description?.slice(0, 160) + '...'
														: item?.description
												}
												className="text-[#787878] h-[87px] text-center lg:text-left text-[12px] md:text-[16px] mb-[27px] leading-[29px] font-poppins xl:w-[80%]"
											/>

											<Button
												// onClick={() => router.push("/success-story")}
												onClick={() => onClickProjectItem(item)}
												value="View Project"
												className="text-white  m-auto lg:m-0 flex items-center justify-center lg:block rounded-[5px] bg-primary uppercase font-normal shadow-none py-[15px] px-[30px] hover:shadow-lg outline-none border-0 text-base 2xl:text-xl"
												variant="contained"
												color="primary"
											/>
										</div>
									</div>
								))}
							</Slider>
						)}
					</div>
				</div>
			</div>
			<div className="w-full md:px-[100px] 2xl:px-[267px] flex items-center lg:flex-row flex-col xl:mb-32 mt-[50px] lg:mt-[150px] 2xl:mt-[220px]">
				<div className="w-full text-center md:text-left lg:w-1/2 py-8 md:py-16 lg:py-0 lg:pt-0 ">
					<div className="flex flex-col items-start 2xl:pr-[180px]">
						<Label
							value="Empower your ideas"
							className="text-purple-900 w-full text-center md:text-left text-[24px] 2xl:text-[35px] font-[500] md:mb-1 leading-[35px] 2xl:leading-[52px]"
						/>
						<Label
							value="BY YOURSELF!"
							className="text-gray-700 w-full text-center md:text-left text-[24px] 2xl:text-[35px] font-[500] leading-[35px] 2xl:leading-[52px]"
						/>
						<Label
							value="IDEEZA enables anyone, even without technology knowledge to 
              take full ownership on their products development process, 
              by using its powerful AI engine and an automated process 
              to fulfill any dream!"
							className="text-[#787878] w-full text-center md:text-left md:w-fit text-[16px] pt-2 mb-0 md:mb-8 leading-8  lg:px-0"
						/>

						<Button
							value="Try Free"
							className="text-white rounded-[5px] bg-primary capitalize font-normal py-[15px] px-[30px] hover:shadow-lg outline-none border-0 text-[16px] hidden md:block shadow-none leading-[21px]"
							variant="contained"
							color="primary"
							onClick={
								status === 'authenticated'
									? () =>
											router.push(
												`/${auth_data?.userData?.role?.toLocaleLowerCase()}/dashboard/projects`
											)
									: handleSignUpPopUp
							}
						/>
					</div>
				</div>
				<div className="lg:w-1/2 lg:pl-[20px] w-full px-[50px] md:px-0">
					{/* <img
            className="ml-auto w-full"
            src="/images/landing/ref_img_1242.png"
            alt="image"
          /> */}
					<Image
						src="/images/landing/img_landing_Empower.png"
						className="ml-auto w-full "
						alt="image"
						width={'100%'}
						height={'75%'}
						layout="responsive"
					/>
				</div>
				<Button
					value="Try Free"
					className="text-white rounded-full bg-primary uppercase font-semibold py-[5px] px-[30px]  hover:shadow-lg outline-none border-0 text-[16px] block md:hidden mt-[20px] m-auto md:m-0 font-poppins shadow-none"
					variant="contained"
					color="primary"
					// onClick={toggleSPSignUp}
					onClick={
						status === 'authenticated'
							? handleSignUpPopUp
							: () =>
									router.push(
										`/${auth_data?.userData?.role?.toLocaleLowerCase()}/dashboard/projects`
									)
					}
				/>
			</div>
			<div className="flex items-center flex-wrap lg:flex-row flex-col-reverse xl:my-32 mt-14 xl::mt-20">
				<div className="lg:w-1/2 lg:pl-[100px] 2xl:pl-[267px] w-full px-[50px] md:px-[100px] md:pr-0">
					{/* <img
            className="w-full mb-2"
            alt=""
            src="/images/landing/ref_img_1243.png"
          /> */}
					<Image
						src="/images/landing/img_landing_tech.png"
						className="ml-auto w-full"
						alt="image"
						width={'100%'}
						height={'75%'}
						layout="responsive"
					/>
					<Link
						passHref
						href="/freelancer"
					>
						<a className="text-white rounded-full bg-primary uppercase font-semibold py-[5px] px-[30px]  hover:shadow-lg outline-none border-0 text-[16px] block md:hidden w-40 m-auto text-center mt-[25px] mb-[50px]">
							Read More
						</a>
						{/* <Button
                value="Read More"
                className="text-white rounded-full bg-primary uppercase font-medium px-7 md:px-14 py-2 hover:shadow-lg outline-none border-0 text-base 2xl:text-xl"
                variant="contained"
                color="primary"
                // onClick={toggleSPSignUp}
              /> */}
					</Link>
				</div>

				<div className="w-full text-center px-4 md:text-left lg:w-1/2 py-0 md:py-[20px] lg:pt-0 2xl:pr-[260px] xl:pl-[65px] md:pr-[100px] md:pl-[100px] lg:pl-0">
					<div className="flex flex-col items-start lg:pr-0 lg:pl-[50px] 2xl:pr-0 xl:pl-0">
						<Label
							value="Creating better technology,"
							className="text-purple-900 w-full text-center md:text-left text-[24px] 2xl:text-[35px] font-[500] font-poppins leading-[35px] 2xl:leading-[52px] md:mb-1"
						/>
						<Label
							value="TOGETHER!"
							className="text-gray-700 w-full text-center md:text-left text-[24px] 2xl:text-[35px] mb-0 font-[500] font-poppins leading-[35px] 2xl:leading-[52px]"
						/>
						<Label
							value="We believe in collaboration and together with the power of Artificial Intelligence it leads to amazing results, empowering the full potential of the world! For the first time, you can use, contribute, and empower the community knowledge - by a click, thousands of brains will come together to provide the unique solution for your idea!"
							className="text-[#787878] w-full text-center md:text-left text-[16px] leading-[29px] md:w-fit mb-[27px] font-poppins "
						/>
						<Link
							passHref
							href="/web-collaboration"
						>
							<a
								className="text-white rounded-[5px] bg-primary capitalize font-normal py-[15px] px-[30px] hover:shadow-lg outline-none border-0 text-[16px] hidden md:block"
								onClick={handleWebCollaboration}
							>
								Read More
							</a>
							{/* <Button
                value="Read More"
                className="text-white rounded-full bg-primary uppercase font-medium px-7 md:px-14 py-2 hover:shadow-lg outline-none border-0 text-base 2xl:text-xl"
                variant="contained"
                color="primary"
                // onClick={toggleSPSignUp}
              /> */}
						</Link>
					</div>
				</div>
			</div>
			<div className="lg:px-[100px] 2xl:px-[267px] flex items-center flex-wrap flex-col lg:flex-row md:mt-20 mb-[30px] md:mb-[115px]">
				<div className="w-full text-center md:text-left lg:w-1/2 py-8 md:py-16 lg:py-0 lg:pt-0 md:px-[100px] lg:px-0">
					<div className="flex flex-col items-start lg:pr-[48px]">
						<Label
							value="Work your way,"
							className="text-purple-900 w-full text-center md:text-left text-[20px] xl:text-[24px] 2xl:text-[35px] font-[500] font-poppins leading-[35px] 2xl:leading-[52px] md:mb-1"
						/>
						<Label
							value="TODAY!"
							className="text-gray-700 w-full text-center md:text-left text-[20px] xl:text-[24px] 2xl:text-[35px] mb-3  font-[500] font-poppins leading-[35px] 2xl:leading-[52px]"
						/>
						<Label
							value="You bring the skill. We'll make earning easy.With IDEEZA you have the freedom to work on any project that suits your exact ability, whether you are an open source engineer, designer, manufacturer, patent attorney or any other supplier. From our many and diverse projects you can easily find your way to success and rapid growth. "
							className="text-[#787878] w-full text-center md:text-left text-[16px] leading-[29px] md:w-fit mb-[27px] font-poppins px-4 md:px-0"
						/>

						<Link
							passHref
							href="/contact"
						>
							<a className="text-white rounded-[5px] bg-primary capitalize font-normal px-[30px] py-[15px] hover:shadow-lg outline-none border-0 text-[16px] hidden md:block">
								Connect Us
							</a>
							{/* <Button
                value="Connect Us"
                className="text-white rounded-full bg-primary uppercase font-medium px-7 md:px-14 py-2 hover:shadow-lg outline-none border-0 text-base 2xl:text-xl"
                variant="contained"
                color="primary"
                // onClick={toggleSPSignUp}
              /> */}
						</Link>
					</div>
				</div>
				<div className=" lg:w-1/2 w-full lg:pl-[20px] px-[50px] md:px-[100px] md:pr-0">
					{/* <img
            className="ml-auto w-full"
            src="/images/landing/ref_img_1244.png"
            alt=""
          /> */}
					<Image
						src="/images/landing/img_landing_work.png"
						className="ml-auto w-full"
						alt="image"
						width={'100%'}
						height={'75%'}
						layout="responsive"
					/>
				</div>
				<Link
					passHref
					href="/contact"
				>
					<a className="text-white rounded-full bg-primary uppercase font-semibold px-7 md:px-14 md:py-2 py-1 hover:shadow-lg outline-none border-0 text-base 2xl:text-xl block m-auto md:m-0 md:hidden my-[30px]">
						Connect Us
					</a>
					{/* <Button
                value="Connect Us"
                className="text-white rounded-full bg-primary uppercase font-medium px-7 md:px-14 py-2 hover:shadow-lg outline-none border-0 text-base 2xl:text-xl"
                variant="contained"
                color="primary"
                // onClick={toggleSPSignUp}
              /> */}
				</Link>
			</div>
		</PublicLayout>
	);
};

export default Home;
