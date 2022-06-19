import { useEffect, useState } from 'react';
import TabsMoleculeAbout from '@molecules/tabs-about';
import AboutTeam from '@organisms/about-team';
import { setTeam } from './teamReducer';
import { useAppDispatch } from 'app/hooks';
import { setJobs } from './jobReducer';
import AboutCompany from '@organisms/about-company';
import AboutCareer from '@organisms/about-career';
import Image from 'next/image';

interface AboutProps {
	teamMembers: any[];
	jobsDeveloper: any[];
}

export default function AboutPage(props: AboutProps) {
	const { teamMembers, jobsDeveloper } = props;
	const dispatch = useAppDispatch();

	const [index, setIndex] = useState<number>(0);

	const handleChange = (event: any, newValue: any): void => {
		setIndex(newValue);
	};
	// const handleChangeTeam = (event: any, newValue: any): void => {
	//   setTeam(newValue);
	// };
	// const handleChangeCareer = (event: any, newValue: any): void => {
	//   setCareer(newValue);
	// };
	// const [openSignUp, setOpenSignUp] = useState(false);

	// const handleSignUp = (e) => {
	//   toggleSignUp(openSignUp);
	// };

	// const toggleSignUp = (signupState) => setOpenSignUp(!signupState);
	// const requir = [
	//   {
	//     text: "2+ years industry experience",
	//   },
	//   {
	//     text: "Bachelor’s and/or Master’s degree, preferably in CS, or equivalent experience",
	//   },
	//   {
	//     text: "Experience shipping one or more Android apps, ideally currently available in the Google Play Store",
	//   },
	//   {
	//     text: "Proficiency in Java or Kotlin and knowledge of the Android SDK and open-source Android    ",
	//   },
	//   {
	//     text: "Personal projects that show an aptitude for technical excellence or product sense",
	//   },
	//   {
	//     text: "Advanced analytical thinking; experienced with making product decisions based on data and A/B",
	//   },
	//   {
	//     text: "Interest in innovations within the mobile industry",
	//   },
	// ];
	// const requir2 = [
	//   {
	//     text: "Stock",
	//   },
	//   {
	//     text: "Competitive salaries",
	//   },
	//   {
	//     text: "Quarterly employee travel coupon",
	//   },
	//   {
	//     text: "Paid time off",
	//   },
	// ];
	// const isSelected = {
	//   isManufacturer: false,
	//   isAbout: true,
	//   isBlog: false,
	//   successStory: false,
	//   isSignup: false,
	//   isLogin: false,
	// };

	useEffect(() => {
		dispatch(setTeam(teamMembers));
	}, [teamMembers]);

	useEffect(() => {
		dispatch(setJobs(jobsDeveloper));
	}, [jobsDeveloper]);

	return (
		<>
			<div className="bg-about md:pl-[100px]">
				<div className=" md:w-[70%] text-left lg:w-1/2 h-full flex flex-col justify-end md:justify-center md:items-start">
					<div className="banner-img md:hidden w-full mb-[30px]">
						{/* <img
              src="/images/landing/freelancer_landing.png"
              className="w-full"
              alt=""
            /> */}
						<Image
							src="/images/landing/freelancer_landing.png"
							className="w-[100%]"
							alt="image"
							width={'100%'}
							height={'60%'}
							layout="responsive"
						/>
					</div>
					<div className="mx-[20px] md:mx-0 md:pt-[371px]">
						<h2 className="text-[#000000] text-center md:text-left font-semibold text-[20px] xl:text-[35px] 2xl:text-[68px] leading-[88px]">
							IoT for EVERYONE
						</h2>
						<p className="text-[#787878] text-center md:text-left mt-[3px] text-[16px] 2xl:text-[20px] md:w-[100%] lg:w-10/12 leading-[34px]">
							Our vision is to empower everyone to create their own IoT Connected
							products without needing to have the related engineering knowledge. We
							store thousands of existing possible puzzle pieces. Let us help you
							create beautiful combinations.
						</p>
						<p className="text-primary text-[16px] xl:text-[20px] leading-[34px] mt-[12px] mb-[30px]">
							What will you make?
						</p>
						<div className="xl:pr-48 lg:pr-32 md:pr-10 2xl:w-[600px] bg-white mb-[30px] 2xl:mb-[272px] py-0 flex rounded-md border border-[#461185]">
							<svg
								className="w-[81px] h-[56px] py-[14] px-[20px] bg-[#461185] rounded-tl-[5px] rounded-bl-[5px]"
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
								className="text-gray-600  outline-none placeholder-[#f301c3] w-full md:text-md  xl:text-lg 2xl:text-xl font-sans border-l pl-4"
								placeholder="Search ideas, products, makers"
								// defaultValue={searchText}
								// onKeyDown={(e: any) => handleSearch(e)}
								// onChange={(e: any) => setSearchText(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="relative overflow-hidden about-tabs-custom pt-[50px] 2xl:pt-[100px] bg-[#FAFAFA]">
				<TabsMoleculeAbout
					// tabsClasses="2xl:w-1/5 xl:w-2/5 lg:w-2/6 md:w-1/2 mx-auto mx-10 px-10 md:px-0 pb-3"
					tabsClasses="lg:w-[347px] md:w-1/2 md:mx-auto border p-[8px] mx-[10px] rounded-[6px] bg-white mb-[30px] 2xl:mb-[80px]"
					tabClasses=" text-[16px] rounded-[6px] px-[20px] py-[6px] min-h-0 transform-none text-gray-600 focus:text-white leading-[29px]"
					indicatorColor="primary"
					// textColor="primary"
					selected="bg-primary text-white "
					// selected="text-[#ff09d0]"
					handleChange={handleChange}
					index={index}
					tabsData={[
						{
							name: 'Company',
							textColor: 'primary',
							component: <AboutCompany />,
						},
						{
							name: 'Team',
							textColor: 'primary',
							component: <AboutTeam />,
						},
						{
							name: 'Career',
							textColor: 'primary',
							component: <AboutCareer />,
						},
					]}
				/>
			</div>
		</>
	);
}
