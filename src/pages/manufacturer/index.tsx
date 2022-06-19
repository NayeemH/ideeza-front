import FreelancerSignUpPopup from '@organisms/freelancer-signup-popup';
import IFramePopup from '@organisms/iframe-popup';
import ManufacturerSignUpPopup from '@organisms/manufacturer-signup';
import PublicLayout from 'layouts/public';
import Image from 'next/image';
import { useState } from 'react';
// import Image from "next/image";

export default function Manufacturer() {
	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen((state) => !state);
	return (
		<PublicLayout>
			<IFramePopup
				open={open}
				toggleOpen={toggleOpen}
			/>
			<ManufacturerSignUpPopup />
			<FreelancerSignUpPopup />
			<div className="service">
				<div className="bg-sp-landing">
					{/* <Header
            isSelected={isSelected}
            toggleSignUp={handleSignUp}
            openSignUp={openSignUp}
            openManfOne={openManfOne}
            handleManufOne={handleManufOne}
            openSPSignUp={openSPSignUp}
            toggleSPSignUp={toggleSPSignUp}
          /> */}
					<div className="flex justify-center items-center">
						<div className="2xl:w-1/2 sm:w-[80%] lg:w-[80%] w-full text-center lg:text-left flex flex-col md:items-center px-6 md:px-0 items-center py-10 pt-[100px] xl:pt-[200px] 2xl:pt-[370px] pb-[100px] xl:pb-[200px] 2xl:pb-[350px]">
							<h2 className="sm:text-white text-xl lg:text-center w-full md:text-3xl xl:text-4xl 2xl:text-[68px] 2xl:leading-[88px] font-[600] custom-resp-header font-poppins">
								Become the 4th industrial revolution deriver
							</h2>
							<div className="2xl:w-[85%] lg:w-[71%] xl:w-[70%] font-poppins md:pr-10 mt-[26px] lg:pr-0">
								<p className="texl-lg 2xl:text-[20px] 2xl:leading-[34px] mx-auto lg:text-center text-white text-center xl:w-[70%] 2xl:w-full font-poppins font-normal">
									Ideeza is first in kind that using the power of AI and automatic
									process for fast development and industrial connection. Beat
									competitors with massive and growing work channels that match to
									your expertise.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="lg:my-16 pt-6 xl:mt-[130px] w-full text-center">
					<h3 className="px-6 text-xl md:text-3xl xl:text-4xl 2xl:text-[48px] 2xl:leading-[72px] font-meri text-purple-900 font-semibold">
						Connect your skills to Ideeza
					</h3>
					<p
						className="md:px-6 xl:mt-3 px-4 text-[#787878] text-md xl:text-lg 2xl:text-xl font-poppins pt-2 md:mb-14 m-auto lg:w-1/4 mb-[30px]"
						// style="max-width: 370px"
					>
						and start winning works automatically!
					</p>
					{/* <div className="connect-dev-manufecturer lg:py-10 flex items-center justify-center w-full">
            <div className="relative vid-sec top-0 left-0 ">
              <iframe
                className="absolute"
                src="https://www.youtube.com/embed/KlfbwRCRZmA"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div> */}
					<div className="connect-dev ">
						<div
							className="p-0 mt-[75px] lg:mt-0 m-auto video-screen cursor-pointer"
							onClick={toggleOpen}
						></div>
					</div>
				</div>
				<div className="mt-20 mb-[30px] md:mb-[130px] skill-bg-img font-pop">
					<div className="clip py-[13px] sm:py-[65px] 2xl:pt-[240px] 2xl:pb-[136px] text-center">
						<div className="flex lg:w-[70%] w-full lg:mx-auto xl:w-full items-center xl:px-[100px] 2xl:px-[327px] lg:pt-0 flex-col h-full justify-center ">
							<h1 className="text-white text-base xl:text-3xl 2xl:text-4xl w-full md:text-left text-center xl:ml-20 sm:ml-[50px] ml-0">
								If you offer one of these abilities
							</h1>
							<h1 className="text-base xl:text-3xl 2xl:text-4xl pb-1 px-4  lg:my-20 xl:-ml-[-100px] md:-ml-48 my-[10px] text-center xl:text-left  text-primary font-bold border-b-2 border-primary border-solid ">
								PCB Manufacturer
							</h1>
							<h1 className="text-white text-base xl:text-3xl 2xl:text-4xl md:text-left text-center ml-[0px]  sm:ml-[24px] xl:ml-[400px] 2xl:ml-[700px]">
								Your place is with us!
							</h1>
						</div>
					</div>
				</div>
				<div className="flex items-center flex-wrap lg:flex-row flex-col-reverse px-[30px] md:px-[100px] 2xl:px-[267px]">
					<div className="w-full text-center md:text-left lg:w-1/2 md:pr-[30px] xl:pr-[155px]">
						<h3 className="text-[#461185] font-medium text-center lg:text-left text-xl md:text-2xl xl:text-3xl 2xl:text-4xl">
							Easy Earning
						</h3>
						<p className="text-[#333333] mt-3 text-center lg:text-left font-normal text-base xl:text-[20px] font-poppins leading-[34px] pt-2 mb-[15px]">
							Receive works automatically based on your tools and capabilities.
						</p>
						<p className="text-[#787878] mt-3 text-center lg:text-left  text-[14px] 2xl:text-[16px] custom-line-height-28">
							Ideeza's platform generates a blueprint based on machines' abilities and
							pushes work to you based on user optimization and your score.
						</p>
					</div>
					<div className=" sm:w-[60%] lg:w-1/2 w-full ">
						{/* <Image
              className="w-full"
              alt="some new technology"
              // layout="fill"
              // width="100%"
              // height="100%"

              src="/images/landing/img_ref_2335.png"
            /> */}
						{/* here img should be replaced by Image tag */}
						{/* <img
              className="w-full"
              src="/images/landing/img_landing_earn.png"
              alt="image"
            /> */}
						<Image
							src="/images/landing/img_landing_earn.png"
							className="w-full h-[200px] md:h-[65%]"
							alt="image"
							width={'100%'}
							height={'65%'}
							layout="responsive"
						/>
					</div>
				</div>
				<div className="flex items-center flex-wrap lg:flex-row flex-col px-[50px] md:px-[100px] 2xl:px-[267px] mt-[30px] xl:mt-[130px] ">
					<div className=" sm:w-[60%] lg:w-1/2 w-full lg:pr-[100px] xl:pr-[210px]">
						{/* <img
              className="lg:pl-20 w-full"
              src="/images/landing/img_landing_effi_work.png"
              alt="image"
            /> */}
						<Image
							src="/images/landing/img_landing_effi_work.png"
							className="w-full"
							alt="image"
							width={496}
							height={455}
							// layout="responsive"
						/>
					</div>
					<div className="w-full text-center md:text-left lg:w-1/2">
						<h3 className="text-[#461185] font-medium text-center lg:text-left text-xl md:text-2xl xl:text-3xl 2xl:text-4xl">
							Efficiently work
						</h3>
						<p className="text-[#333333] mt-3 text-center lg:text-left font-normal text-base xl:text-[20px] font-poppins leading-[34px] pt-2 mb-[15px] ">
							Less Idle time, more capacity.
						</p>
						<p className="text-[#787878] mt-3 text-center lg:text-left  text-[14px] 2xl:text-[16px] custom-line-height-28 w-full xl:w-[90%]">
							Ideeza's process finds works that fits in your feasibility and
							automatically connects to your potential customers.
						</p>
					</div>
				</div>
				<div className="flex items-center flex-wrap lg:flex-row flex-col-reverse px-[30px] md:px-[100px] 2xl:px-[267px] mt-[30px] xl:mt-[130px] mb-[50px] xl:mb-[150px]">
					<div className="w-full text-center lg:text-left lg:w-1/2 md:pr-[50px] xl:pr-[150px]">
						<h3 className="text-[#461185] font-medium text-center lg:text-left text-xl md:text-2xl xl:text-3xl 2xl:text-4xl">
							Futurist supply chain
						</h3>
						<p className="text-[#333333] mt-3 text-center lg:text-left font-normal text-base xl:text-[20px] font-poppins leading-[34px] pt-2 mb-[15px]">
							No more time wasted. Be part of collaborative tracking space
						</p>
						<p className="text-[#787878] mt-3 text-center lg:text-left  text-[14px] 2xl:text-[16px] custom-line-height-28">
							Ideeza's platform stores key manufacturing and delivery data across the
							entire supply chain to track any issues that may arise.
						</p>
					</div>
					<div className=" sm:w-[60%] lg:w-1/2 w-full lg:pl-[100px] 2xl:pl-[225px]">
						{/* <img
              src="/images/landing/img_landing_future.png"
              width="100%"
              alt="image"
            /> */}
						<Image
							src="/images/landing/img_landing_future.png"
							className="w-full"
							alt="image"
							width={480}
							height={490}
							// layout="responsive"
						/>
					</div>
				</div>
				{/* <ResetPopup open={popup} toggleOpen={toggleOpen} />
        <ContinuePopup open={popup1} toggleOpen={toggleOpen1} />
        <AccountReviewPopup open={popup2} toggleOpen={toggleOpen2} />
        <CreateAccountPopup open={popup3} toggleOpen={toggleOpen3} /> */}
			</div>
		</PublicLayout>
	);
}
