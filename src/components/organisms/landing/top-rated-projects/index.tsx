import TopRatedSingleProject from '@molecules/top-rated-project';
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import Button from '@atoms/button';
import { useRouter } from 'next/router';
import Loader from '@atoms/loader';
import NftBidPopup from '@organisms/nft-bid-product-popup';

const TopratedProjects = (props: any) => {
	const { projects, loading } = props;
	const router = useRouter();

	// const { status } = useSession();

	const [popup, SetPopup] = useState(false);
	const toggleBidPopup = () => SetPopup(!popup);

	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		initialSlide: 0,
		arrows: false,
		responsive: [
			{
				breakpoint: 1192,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
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
		appendDots: (dots: any) => (
			<div
				style={{
					borderRadius: '10px',
					padding: '10px',
				}}
			>
				<ul style={{ margin: '0px' }}> {dots} </ul>
			</div>
		),
		nextArrow: <GrCaretNext className="text-xl text-gray-300" />,
		prevArrow: <GrCaretPrevious className="text-xl text-primary" />,
	};

	// const goToProductDetailPage = (id: any) => {
	//   if (status === "authenticated") {
	//     router.push(`/user/dashboard/project/${id}`);
	//   } else {
	//     router.push(`/project/details/${id}`);
	//   }
	// };

	return (
		<div className="relative project-home-slider-container">
			{!loading ? (
				<>
					{projects?.length > 0 ? (
						<>
							<Slider {...settings}>
								{projects.map((project: any, index: any) => (
									<div
										className="p-3"
										key={index}
										// onClick={() => goToProductDetailPage(project?.id)}
									>
										<TopRatedSingleProject
											project={project}
											onClickPlaceBid={toggleBidPopup}
										/>
									</div>
								))}
							</Slider>
							<div className="w-full md:mt-[73px] mt-[40px] flex justify-center">
								<Button
									value="See More"
									className="text-base shadow-none font-medium capitalize text-white py-[16px] px-[70px] bg-primary rounded-[5px] hidden md:block"
									variant="contained"
									color="primary"
									onClick={() => router.push(`nft-market`)}
								/>
							</div>
						</>
					) : (
						<div
							className="flex items-center justify-center text-3xl font-semibold py-20"
							style={{ minHeight: '650px' }}
						>
							No project found!
						</div>
					)}
				</>
			) : (
				<div
					className="flex items-center justify-center text-xl font-medium py-20"
					style={{ minHeight: '650px' }}
				>
					<Loader
						type={'relative'}
						transparentBg={'bg-white/0'}
						isTransparentBg
					/>
					<div className="lg:mt-0 mx-5 hidden ">
						<Slider {...settings}>
							<div className="p-3">
								<TopRatedSingleProject />
							</div>
						</Slider>
					</div>
				</div>
			)}

			<NftBidPopup
				open={popup}
				toggleOpen={toggleBidPopup}
			/>
		</div>
	);
};

export default TopratedProjects;
