import React from 'react';
// import { AiFillEye, AiTwotoneDislike, AiTwotoneLike } from 'react-icons/ai';
// import ImgCard from '@organisms/image-card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProjectPageItem from '@organisms/project-page/item';
function ProjectCarousel({ projects, goToDetailPage, projectId }: any) {
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 0,
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
	// console.log(projectId);

	return (
		<Slider {...settings}>
			{projects?.map((v: any, k: any) => {
				return (
					<ProjectPageItem
						key={k}
						item={v}
						goToDetailPage={() => goToDetailPage(projectId)}
					/>
					// <ImgCard
					// 	onClick={onClick}
					// 	key={k}
					// 	// carouselHeight="h-72"
					// 	carouselHeight=""
					// 	imgClasses="rounded-2xl"
					// 	iconComponent3={
					// 		// <img src="/assets/images/like_white_icon.png"  />
					// 		<AiTwotoneLike className="text-white text-lg lg:text-2xl" />
					// 	}
					// 	iconComponent2={
					// 		// <img src="/assets/images/ideeza_icon_white.png"  />
					// 		<AiTwotoneDislike className="text-white text-lg lg:text-2xl" />
					// 	}
					// 	iconContanerClass="bg-transparent mr-2"
					// 	iconValue1={v?.views || '0'}
					// 	iconValue2={v?.dislikes || '0'}
					// 	iconValue3={v?.likes || '0'}
					// 	mainIconClass="flex items-center"
					// 	lableClass={{
					// 		root: ' text-sm lg:text-md  text-white',
					// 	}}
					// 	iconComponent1={<AiFillEye className="text-white text-lg lg:text-2xl" />}
					// 	iconsClass="flex sm:justify-end justify-center space-x-5 pr-2"
					// 	imgSrc={v?.project?.image ? v?.project?.image : '/images/car.png'}
					// 	projectId={v?.project?.id}
					// 	title={v?.project?.name}
					// />
				);
			})}
		</Slider>
	);
	// <div className="relative w-full cursor-pointer">

	{
		/* <Carousel
        value={value}
        onChange={handleChange}
        plugins={[
          "clickToChange",
          "centered",
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 1,
            },
          },
        ]}
        slides={projects?.map((v: any, k: any) => {
          return (
            <ImgCard
              onClick={onClick}
              key={k}
              // carouselHeight="h-72"
              carouselHeight=""
              imgClasses="rounded-xl"
              iconComponent3={
                // <img src="/assets/images/like_white_icon.png"  />
                <AiTwotoneLike className="text-white text-lg lg:text-2xl" />
              }
              iconComponent2={
                // <img src="/assets/images/ideeza_icon_white.png"  />
                <AiTwotoneDislike className="text-white text-lg lg:text-2xl" />
              }
              iconContanerClass="bg-transparent mr-2"
              iconValue1={v.views}
              iconValue2={v.dislikes}
              iconValue3={v.likes}
              mainIconClass="flex items-center"
              lableClass={{
                root: " text-sm lg:text-md  text-white",
              }}
              iconComponent1={
                <AiFillEye className="text-white text-lg lg:text-2xl" />
              }
              iconsClass="flex sm:justify-end justify-center space-x-5 pr-2"
              imgSrc={v?.project?.image ? v?.project?.image : "/images/car.png"}
              projectId={v?.project?.id}
              title={v?.project?.name}
            />
          );
        })}
      />
      <div className="dot absolute top-[8rem] xl:top-[9rem] 2xl:top-[14rem] w-full flex items-center justify-center">
        {projects?.map((v: any, k: any) => (
          <IconButton
            key={k}
            // onClick={handleChange.bind(this, k)}
            className={` mx-1 transition-all p-0 outline-none rounded-full bg-primary shadow-lg ${
              value === k
                ? "border-2 border-solid border-white w-4 h-4"
                : "opacity-50 w-3 h-3"
            }`}
          />
        ))}
      </div> */
	}
	// </div>
}

ProjectCarousel.defaultProps = {
	projects: [],
};

export default ProjectCarousel;
