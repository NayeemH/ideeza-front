import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
// import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import TabsMoleculeAbout from '@molecules/tabs-about';
import AboutTeamExecutive from '@molecules/about-team-executive';
import AboutTeamContributor from '@molecules/about-team-contributor';
import { useAppSelector } from 'app/hooks';
// import Image from "next/image";

const AboutTeam = () => {
	const teamExecutives: any = useAppSelector(
		(state) => state?.team?.data.filter((member: any) => member?.role === 'Admin') || []
	);
	const teamContributors: any = useAppSelector(
		(state) => state?.team?.data.filter((member: any) => member?.role !== 'Admin') || []
	);
	const [team, setTeam] = useState<number>(0);

	const handleChangeTeam = (event: any, newValue: any): void => {
		// console.log('handle Change team', event.target.value)
		setTeam(newValue);
	};

	const SampleNextArrow = (props: any) => {
		const { onClick } = props;
		return (
			<img
				src="/images/icon/arrow-right-tab.svg"
				className="w-10 h-10 rounded-[10px] bg-primary px-2  absolute top-2/4 flex items-center justify-center right-[-55px]"
				alt="icon"
				onClick={onClick}
			/>
		);
	};

	const SamplePrevArrow = (props: any) => {
		const { onClick } = props;
		return (
			<img
				src="/images/icon/arrow-left-tab.svg"
				className="w-10 h-10 ml-4 rounded-[10px] bg-primary px-2 absolute top-2/4 flex items-center justify-center left-[-75px]"
				alt="icon"
				onClick={onClick}
			/>
		);
	};

	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<>
			<div className="text-center ">
				<h2 className=" text-[24px] lg:text-[30px] 2xl:text-[48px] leading-[30px] 2xl:leading-[72px] text-[#101010] font-[600] mb-[47px]">
					Our Team
				</h2>
				<hr className="bg-[#E6E6E6] mt-[26px] mb-[21px] w-8/12 lg:w-[457px] m-auto" />
				<p className="text-[16px] leading-[29px] lg:w-7/12 mx-auto text-[#333333] mb-[20px] 2xl:mb-[90px]">
					Exceptional ideas deserve Exceptional people. We at IDEEZA believe the power
					belongs to the people. Wether you are an engineer or just a visionary inventor
					our platform is for you. We have tried to surround ourselves with the best
					people we could find to bring this dream to reality. If you think you have what
					it takes Hit the Career tab and contact us.
				</p>
			</div>
			<div
				id="team"
				className="bg-team bg-white pt-[50px] 2xl:pt-[130px] px-[20px] lg:px-0"
			>
				<div className="left-team-bg absolute ">
					<img
						className=" w-1/2 lg:w-[525px]"
						src="/images/landing/team-left-background.png"
						alt="team-left-background"
					/>
				</div>
				<div className="right-team-bg absolute">
					<img
						className="w-1/2 lg:w-[525px]"
						src="/images/landing/team-left-background.png"
						alt="team-left-background"
					/>
				</div>
				<div className="text-center custom-team-about w-full">
					<TabsMoleculeAbout
						tabsClasses="border rounded-full lg:w-1/3 md:w-1/2 mx-auto bg-[#FAFAFA]"
						tabClasses="hover:bg-primary hover:text-white rounded-full w-full focus:bg-primary focus:text-white text-[16px] py-[10px] transform-none  leading-[29px]"
						handleChange={handleChangeTeam}
						indicatorColor="primary"
						textColor="primary"
						selected="bg-primary text-white "
						index={team}
						tabsData={[
							{
								name: 'Executives',
								textColor: 'primary',
								/****TODO*****/
								component: (
									<div
										className={`gap-[24px] pt-[70px] m-auto grid pb-[69px] ${
											teamExecutives.length === 1
												? ' md:grid-cols-1 md:w-[530px]'
												: ' md:grid-cols-2 w-[1060px] '
										}`}
									>
										{teamExecutives.length > 0 &&
											teamExecutives.map((member: any, index: number) => (
												<AboutTeamExecutive
													info={member}
													key={index}
												/>
											))}
									</div>
								),
							},
							{
								name: 'All Contributors',
								textColor: 'primary',
								component: (
									<>
										{/* TODO */}
										<div className="pb-[100px] 2xl:pb-[185px] 2xl:px-[267px] lg:px-[100px] about-contributor-slider">
											<Slider
												{...settings}
												className="mt-6 about-us"
											>
												{teamContributors.length > 0 &&
													teamContributors.map(
														(member: any, index: number) => (
															<AboutTeamContributor
																info={member}
																key={index}
															/>
														)
													)}
											</Slider>
										</div>
									</>
								),
							},
						]}
					/>
				</div>
			</div>
			<div className="bg-white w-[100%]">
				<p className=" text-[24px] leading-[41px] font-[500] text-primary md:w-[45%] text-center mx-auto pb-[115px]">
					We Know tomorrow will be made of millions of expensive connected devices
					servicing your smallest and most essential needs.
				</p>
			</div>
		</>
	);
};

export default AboutTeam;
