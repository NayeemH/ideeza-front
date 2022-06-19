import TopRatedSingleProduct from '@molecules/top-rated-product';
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import Button from '@atoms/button';
import { useRouter } from 'next/router';
import Loader from '@atoms/loader';
import NftBidPopup from '@organisms/nft-bid-product-popup';

const TopratedProducts = (props: any) => {
	const { products, loading } = props;
	const router = useRouter();

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
					slidesToShow: 2,
					slidesToScroll: 2,
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

	const goToProductDetailPage = (id: any) => {
		router.push(`/product/details/${id}`);
	};
	return (
		<div className="relative project-home-slider-container">
			{!loading ? (
				<>
					{products?.length > 0 ? (
						<>
							<Slider {...settings}>
								{products.map((product: any, index: any) => (
									<div
										className="p-3"
										key={index}
										onClick={() => goToProductDetailPage(product?.id)}
									>
										<TopRatedSingleProduct
											product={product}
											onClickPlaceBid={toggleBidPopup}
										/>
									</div>
								))}
							</Slider>
							<div className="w-full mt-12 flex justify-center">
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
							No product found!
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
					<div className="lg:mt-5 mx-5 ">
						<Slider {...settings}>
							<div className="p-3">
								<TopRatedSingleProduct />
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

export default TopratedProducts;
