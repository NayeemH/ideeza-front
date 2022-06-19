import Button from '@atoms/button';
import Label from '@atoms/label';
import PublicLayout from '@layouts/public';
import { useAppDispatch } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import { openSignUpOptions } from 'reducers/signup';
// import Carousel from "@brainhubeu/react-carousel";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IProject } from '@models/projects';
import { useRouter } from 'next/router';
import { openLoginPopup } from 'reducers/login';
import { useSession } from 'next-auth/react';
import { ApiDataType, apiService } from 'utils/request';
import ThumbnailImageOrVideo from '@molecules/thumbnail-image-or-video';
import ManufacturerSignUpPopup from '@organisms/manufacturer-signup';
import FreelancerSignUpPopup from '@organisms/freelancer-signup-popup';

const Freelancer = () => {
	const [projects, setProjects] = useState<any>([]);
	const dispatch = useAppDispatch();
	const handleSignUpPopUp = () => {
		dispatch(openSignUpOptions());
	};
	function SampleNextArrow(props: any) {
		const { onClick } = props;
		return (
			<div
				className="absolute left-[51%] bottom-[67px] z-10 cursor-pointer hidden lg:block"
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
				className="absolute 2xl:left-[54%] xl:left-[55%] 2xl:top-[358px] xl:top-[357px] cursor-pointer hidden lg:block"
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
	const router = useRouter();
	const { data: session, status } = useSession();
	const onClickProjectItem = (item: any) => {
		const products: any = item?.products;
		const productCount: any = products?.length;
		const projectId = item?.id;
		const prouductId: any = productCount > 0 ? products[0].id : null;
		const projectUrl = `project/${projectId}`;
		const productUrl = `project/${projectId}/product/${prouductId}?project_id=${projectId}`;
		const redirectUrl = productCount > 0 ? productUrl : projectUrl;
		if (status === 'unauthenticated') {
			router.query.redirect_db = redirectUrl;
			router.push(router, undefined, { scroll: false });
			handleLoginPopUp();
		} else if (session?.user?.role) {
			router.push(`/${session?.user?.role.toLowerCase()}/dashboard/${redirectUrl}`);
		}
	};
	useEffect(() => {
		getMyProjects('public');
	}, []);

	const getMyProjects = async (type: 'public') => {
		const apiData: ApiDataType = {
			method: 'get',
			url: `project/?is_visible=${type === 'public'}&ordering=created_at&page=1&page_size=3`,
			token: false,
		};

		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				if (type === 'public') {
					return setProjects(res?.data?.results);
				}
			}

			return err;
		});
	};

	return (
		<PublicLayout title="IDEEZA | AI Based SAAS - Freelancer">
			<ManufacturerSignUpPopup />
			<FreelancerSignUpPopup />
			<div className="bg-freelancer md:pl-[100px]">
				<div className="md:w-[70%] pt-[50px] text-left lg:w-1/2 h-full flex flex-col justify-end md:justify-center md:items-start">
					<div className="mx-[20px] md:mx-0 xl:pt-[152px]  2xl:pt-[352px]">
						<p className="text-[#561F80] pt-[300px] lg:pt-[50px] text-[12px] md:text-[20px] leading-[34px] mb-[25px]">
							Together we grow the community knowledge to a new level.
						</p>
						<h2 className="text-[20px] 2xl:text-[68px] text-[#000000] font-[600] leading-[34px] 2xl:leading-[88.4px]">
							It's more then <br /> technology, it's your <br /> home!
						</h2>
						<Button
							value="Join Now"
							className="text-white bg-primary rounded-[5px] capitalize font-[400] hover:shadow-lg outline-none text-[16px] px-[30px] py-[15px] mt-[22px] shadow-none mb-[111px]"
							onClick={handleSignUpPopUp}
							color="primary"
						/>
					</div>
				</div>
			</div>
			<div className="px-[50px] lg:px-[0px]">
				<div className="flex items-center flex-wrap lg:flex-row pt-[20px] md:pt-[354px] lg:pt-[154px]">
					<div className=" lg:w-1/2 lg:pr-[77px] w-full ">
						<img
							src="/images/landing/landing_open_source.png"
							className="xl:w-full w-[80%] mx-auto"
							alt="image"
						/>
					</div>
					<div className="w-full px-[100px] lg:px-4 md:text-left lg:w-1/2 pt-[20px] 2xl:pt-[0px]">
						<div className="lg:pl-0 ">
							<div className="flex items-center">
								<img
									src="/images/landing/landing_open_icon.png"
									width="60px"
									alt="image"
								/>
								<div className="pl-4  flex gap-2">
									<Label
										value="The power of"
										className="text-[#561F80] text-[14px] xl:text-[35px] font-[500] xl:leading-[52px]"
									/>
									<Label
										value="OPEN SOURCE"
										className="text-gray-700 text-[14px] xl:text-[35px] font-[500] xl:leading-[52px]"
									/>
								</div>
							</div>
							<Label
								value="The power of collaboration leads to amazing results, empowering
                the full potential of the world! It happens everywhere!
                especially in the knowledge field, where this movement created
                the 'Open Source Code' revolution to disrupt the traditional
                Code industry. Now we can give and receive from the community
                for the benefit of all of us"
								className="text-[#787878] text-[16px] leading-[29px] my-[27px] pr-[20px] 2xl:pr-[267px]"
							/>
							<Label
								value="Still if your goal is a physical product it might require more
                knowledge that you don't always have."
								className="text-[#787878] font-[400] text-base leading-[34px] xl:text-[20px] pb-[20px] md:pb-[0px] w-[90%] md:w-[60%]"
							/>
						</div>
					</div>
				</div>
				<div className="flex items-center lg:px-4 flex-wrap lg:flex-row flex-col-reverse py-0 sm:pb-0 lg:pt-[130px] pt-[20px] md:pt-[0px]">
					<div className="w-full md:text-left lg:w-1/2 px-6 sm:px-0 2xl:pl-[284px] 2xl:pr-[70px]">
						<div className="flex flex-col">
							<div className="flex items-center mt-[20px] 2xl:mt-[0px]">
								<img
									src="/images/landing/landing_product_icon.png"
									width="60px"
									alt="image"
								/>
								<div className="pl-4 flex gap-2 ">
									<Label
										value="Open source"
										className="text-[#561F80] text-[14px] xl:text-[35px] font-[500] md:leading-[52px]"
									/>
									<Label
										value="PRODUCT"
										className="text-gray-700 text-[14px] xl:text-[35px] font-[500] md:leading-[52px]"
									/>
								</div>
							</div>
							<Label
								value="This is how the Open Source Product industry was created, where
                the collaboration enhanced to a higher level, so whether you are
                a Do It Yourself maker, a hobbyist or an engineer you will feel
                at home in the multi-disciplinary collaborations."
								className="text-[#787878] text-[16px] leading-[29px] my-[27px] font-poppins"
							/>
							<Label
								value="But what if you want to realize a unique idea?"
								className="text-[#461185] font-[500] text-[20px] leading-[34px] font-poppins"
							/>
							<Label
								value="And it's not exactly the same. What if you want to produce it?"
								className="text-primary font-[500] text-[20px] leading-[34px] font-poppins"
							/>
						</div>
					</div>
					<div className="lg:w-1/2 w-full mt-[100px] lg:mt-[0px]">
						<img
							src="/images/landing/landing_product.png"
							className="xl:w-full w-[80%] mx-auto"
							alt="image"
						/>
					</div>
				</div>
				<div className="flex px-[50px] lg:px-[0px] items-center flex-wrap font-pop bg-[#fff] lg:flex-row py-0 sm:px-[30px] lg:px-0 sm:py-8 lg:py-20">
					<div className="lg:w-1/2  w-full">
						<img
							src="/images/landing/landing_laptop.png"
							className="xl:w-full w-[80%] mx-auto"
							alt="image"
						/>
					</div>
					<div className="w-full px-[100px] lg:px-4 sm:px-0 md:text-left lg:w-1/2 sm:py-0 py-8 lg:py-0 lg:pt-0 lg:pr-24">
						<div className="">
							<div className="flex items-center">
								<img
									src="/images/landing/landing_knowladge_icon.png"
									width="60px"
									alt="image"
								/>
								<div className="pl-4 flex gap-2">
									<Label
										value="Open source"
										className="text-[#561F80] text-[14px] xl:text-[35px] font-[500] leading-[52px]"
									/>
									<Label
										value="KNOWLEDGE"
										className="text-gray-700 text-[14px] xl:text-[35px] font-[500] leading-[52px]"
									/>
								</div>
							</div>
							<Label
								value="Welcome to the future!"
								className="text-[#787878] text-[16px] leading-[29px] mt-[27px]"
							/>
							<Label
								value="IDEEZA develops the new age of open source collaboration! We
                packed the crowd knowledge in small packages, and by using our
                Artificial Intelligence engines you will get the most precise
                hardware, code and coverage components for developing your idea
                by yourself!"
								className="text-[#787878] text-[16px] leading-[29px] mb-[27px]"
							/>
							<Label
								value="No more imitation of what is already done!"
								className="text-[#461185] font-[500] text-[20px] leading-[34px]"
							/>
							<Label
								value="No more limitation!"
								className="text-primary font-[500] text-[20px] leading-[34px]"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full text-center md:mt-[130px] mt-[20px] bg-white">
				<Label
					value="Top notch public projects"
					className="text-purple-900 w-full text-center text-xl xl:text-[48px] font-semibold leading-[72px]"
				/>
				<Label
					value="made with IDEEZA"
					className="text-gray-700 w-full text-center tracking-wide xl:text-[48px]  font-semibold my-[10px] md:my-0 leading-[72px]"
				/>
				<Label
					value="Success Stories from Ideeza's growing community"
					className="text-gray-900 w-full text-center text-base font-light tracking-tight"
				/>
			</div>
			<div className="flex w-full flex-wrap items-start py-5 lg:py-[100px] mt-[75px] lg:px-[100px] px-6 2xl:px-[267px] bg-white">
				{/* <Carousal :carousalData="carouselData" className="w-full md:w-1/2" /> */}
				<div className="w-full custom-slick-slider custom-freelancer-slider">
					{projects?.length > 0 && (
						<Slider {...settings}>
							{projects.map((item: IProject, index: number) => (
								<div
									key={index}
									className="md:flex block gap-[31px] h-[460px]"
								>
									<div
										className="cursor-pointer border border-gray-100 md:w-[50%] w-full"
										onClick={() => onClickProjectItem(item)}
									>
										<ThumbnailImageOrVideo
											data={item}
											height="450px"
										/>
									</div>
									<div className="md:w-[50%] w-full mt-[70px] text-left">
										<Label
											value="John Does Dreams"
											className="text-center text-xl xl:text-[35px] leading-[52px] lg:text-left w-full text-[#333333] font-[500]"
										/>
										<Label
											value="If you are on the fence on whether you need a big company behinf you
                                 to succeed, these individuals prove hat having vission and the drive
                                 is more than enough"
											className="text-[#787878] text-center lg:text-left text-[16px] mb-[27px] leading-[29px]"
										/>

										<Button
											// onClick={() => router.push("/success-story")}
											onClick={() => onClickProjectItem(item)}
											value="View Story"
											className="text-white  m-auto lg:m-0 flex items-center justify-center lg:block rounded-[5px] bg-primary uppercase font-semibold py-[15px] px-[30px] hover:shadow-lg outline-none border-0 text-base 2xl:text-xl"
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
			<div className="bg-[#FAFAFA]">
				<div className="flex items-center flex-wrap">
					<div className="w-full md:text-left lg:w-2/5 md:w-1/2 py-8 px-6 2xl:pl-[250px]">
						<div className="">
							<h3 className="text-[#461185] text-center md:text-left text-lg xl:text-[48px] font-semibold leading-[72px]">
								Make your
							</h3>
							<h2 className="text-black-300 text-center md:text-left text-lg xl:text-[48px]  leading-[72px] font-semibold">
								DREAMS COME TRUE
							</h2>
							<p className="text-[#787878] text-[16px] leading-[29px] my-[27px]">
								On top of this amazing capability, IDEEZAs platform uses an
								automated processes for PCB and 3D design, production optimization
								and a marketplace with the top notch service providers for
								production and more. For the first time, by one click, thousands of
								brains will come together to help you and provide your unique
								solution.
							</p>
							<p className="text-primary text-[20px] leading-[34px] mb-[22px]">
								Thats all?
							</p>
							<Button
								value="Launch your Ideeza"
								className="text-white text-[16px] flex m-auto md:m-0 bg-primary rounded-[6px] capitalize mt-8 px-[30px] py-[15px] shadow-none"
								onClick={handleSignUpPopUp}
								color="primary"
							/>
						</div>
					</div>
					<div className="lg:w-3/5 md:w-1/2 w-full items-center justify-end hidden md:flex md:mt-0 lg:-my-10 lg:mt-20">
						<img
							src="/images/landing/landing_dream.png"
							className="h-full"
							width="100%"
							alt="image"
						/>
					</div>
				</div>
			</div>
			<div className="flex items-center flex-wrap font-pop lg:py-16">
				<div className="xl:w-3/5 lg:w-1/2 w-full items-center justify-end hidden md:flex pr-[120px]">
					<img
						src="/images/landing/landing_assesment.png"
						className="h-full"
						width="100%"
						alt="image"
					/>
				</div>
				<div className="w-full md:text-left xl:w-2/5 lg:w-1/2  md:pr-0 md:pl-0  lg:pt-0">
					<div className="">
						<h3 className="text-[#461185] text-center lg:text-left text-lg xl:text-[48px] font-semibold leading-[72px]">
							IDEEZAS
						</h3>
						<h2 className="text-black-300  text-center lg:text-left text-lg xl:text-[48px] font-semibold leading-[72px] mb-[20px]">
							Assessment Certificate
						</h2>
						<p className="text-[#333333] font-[500] text-center lg:text-left text-[16px] xl:text-[20px] leading-[34px] mb-[12px]">
							There is more!
						</p>

						<p className="text-[#787878] text-[16px] leading-[29px] px-[30px] lg:px-[0px] text-center lg:text-left">
							With us you are not transparent!
						</p>
						<p className="text-[#787878] text-[16px] leading-[29px] text-center px-[30px] lg:px-[0px] lg:text-left">
							Your contribution to the community is not getting lost in crowd!
						</p>
						<p className="text-[#787878] text-[16px] px-[30px] lg:px-[0px] leading-[29px] text-center lg:text-left">
							To give you the full reward for contributing to the community, you will
							get points according to your activities. That way you can stand out in
							our service providers list, so clients can find you easily in our
							marketplace for private jobs.
						</p>
						<p className="text-[#787878] text-[16px] leading-[29px] pt-4 mb-[30px] px-[30px] lg:px-[0px] text-center lg:text-left">
							In this way, we believe that we can thank you on behalf of the global
							open knowledge community.
						</p>
						<Button
							value="LEARN MORE"
							className="text-white bg-primary flex  lg:m-0 rounded-[6px] capitalize font-normal mx-auto lg:mx-[0px] px-[30px] py-[15px] shadow-none text-[16px]"
							onClick={handleSignUpPopUp}
							color="primary"
						/>
					</div>
				</div>
			</div>
		</PublicLayout>
	);
};

export default Freelancer;
