import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AboutCompany = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		padding: 10,
	};
	return (
		<>
			<div className="text-center bg-[#FAFAFA]">
				<h3 className="text-[#787878] mb-[15px] md:mb-[2px] text-[20px] xl:text-[35px] font-[500] capitalize leading-[20px] 2xl:leading-[52px]">
					Our mission
				</h3>
				<h2 className="text-[20px] font-[600] xl:text-[35px] 2xl:text-[48px] text-[#101010] leading-[30px] 2xl:leading-[72px]">
					Making it together
				</h2>
				<hr className="bg-[#E6E6E6] mt-[26px] mb-[21px] w-8/12 lg:w-[457px] m-auto" />
				<p className="text-base xl:text-[20px] leading-[34px] text-[#101010] font-[500] font-poppins">
					We belive in a world were technology is at the service of people, not the other
					way around.
				</p>
				<p className="mt-[22px] text-[#656565] text-[16px] leading-[29px] w-[90%] md:w-[80%] 2xl:w-[45%] mx-auto">
					We spoke to hundreds of entrepreneurs, creators, makers, small and medium
					businesses and we realised the heavy costs and efforts required to bring an IoT
					product to life. Yet we know the IOT revolution is the best way to make tech
					benefit directly to people’s lives.
				</p>

				<div className="md:hidden mt-[20px]">
					<Slider {...settings}>
						<div className="p-3">
							<Image
								src="/images/landing/about-2.png"
								className="ml-auto w-full"
								alt="image"
								width={'100%'}
								height={'60%'}
								layout="responsive"
							/>
						</div>
						<div className="p-3">
							<Image
								src="/images/landing/about-3.png"
								className="ml-auto w-full"
								alt="image"
								width={'100%'}
								height={'60%'}
								layout="responsive"
							/>
						</div>
						<div className="p-3">
							<Image
								src="/images/landing/about-1.png"
								className="ml-auto w-full"
								alt="image"
								width={'100%'}
								height={'60%'}
								layout="responsive"
							/>
						</div>
					</Slider>
				</div>

				<div className="md:flex md:flex-row mt-10 gap-[24px] md:mt-[65px] px-[100px] 2xl:px-[300px] pb-[50px] 2xl:pb-[130px] hidden">
					<div className="flex-1 mb-4 md:mb-0 ">
						{/* <img
                        className="w-full"
                        src="/images/landing/about-2.png"
                        alt="image"
                    /> */}
						<Image
							src="/images/landing/about-2.png"
							className="ml-auto w-full"
							alt="image"
							width={'100%'}
							height={'60%'}
							layout="responsive"
						/>
					</div>
					<div className="flex-1 mb-4 md:mb-0">
						{/* <img
              className="w-full"
              src="/images/landing/about-3.png"
              alt="image"
            /> */}
						<Image
							src="/images/landing/about-3.png"
							className="ml-auto w-full"
							alt="image"
							width={'100%'}
							height={'60%'}
							layout="responsive"
						/>
					</div>
					<div className="flex-1">
						{/* <img
              className="w-full"
              src="/images/landing/about-1.png"
              alt="image"
            /> */}
						<Image
							src="/images/landing/about-1.png"
							className="ml-auto w-full"
							alt="image"
							width={'100%'}
							height={'60%'}
							layout="responsive"
						/>
					</div>
				</div>
			</div>
			<div className="bg-company relative text-center bg-white">
				<div className="left-company-bg absolute">
					<img
						className="w-1/2 lg:w-[475px]"
						src="/images/landing/left-gears.png"
						alt="left-gear"
					/>
					{/* <Image
              src="/images/landing/left-gears.png"
              className="w-full"
              alt="image"
              width={"100%"}
              height={"60%"}
              layout="responsive"
            /> */}
				</div>
				<div className="right-company-bg absolute">
					<img
						className="w-1/2 lg:w-[475px]"
						src="/images/landing/right-gears.png"
						alt="right-gear"
					/>
				</div>
				<div className="text-center md:text-left pt-[50px] 2xl:pt-[110px] w-full md:px-0 2xl:w-3/4 mx-auto">
					<h2 className="text-center text-[#101010] text-[25px] xl:text-[35px] 2xl:text-[48px] leading-[30px] 2xl:leading-[72px] font-semibold mb-[19px] px-[10px]">
						Made by Makers for Makers.
					</h2>
					<p className="text-[#656565] text-[16px] text-center leading-[29px] px-[20px] 2xl:px-[170px] mb-[23px]">
						Product design used to be the affair of product development teams, engineers
						in R&D, those building prototypes, CAD designs, issuing blueprints,
						Mechanical design. Working with a factory who might in turn dictate its own
						changes and then after thousands of dollars in expenses and hundreds of
						people involved you would finally get into a production ready sample.
						Whether you are one of those guys/girls or just a maker in a garage this
						service is for you.
					</p>
				</div>
				<div className=" px-6 lg:pb-[130px] leading-none text-center">
					<h2 className="text-primary text-lg xl:text-[24px] pb-2 leading-[41px] font-[500]">
						Welcome to the 4TH INDUSTRIAL REVOLUTION.
					</h2>
					<h2 className="text-[#AB10D2] text-lg xl:text-[24px] text-center leading-[41px] font-[500]">
						Where technology re-invents and re-defines simplicity.
					</h2>
				</div>
			</div>
		</>
	);
};

export default AboutCompany;
