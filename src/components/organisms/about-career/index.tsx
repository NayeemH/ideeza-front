import { useState } from 'react';
import TabsMoleculeAbout from '@molecules/tabs-about';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getJobsAsync } from '@features/landing/about/jobReducer';
import CareerJobList from '@molecules/about-career-job-list';

const AboutCareer = () => {
	const dispatch = useAppDispatch();

	const [tabIndex, setTabIndex] = useState<number>(0);

	const jobs = useAppSelector((state) => state?.jobs?.data || []);

	const jobPosition: any = {
		0: 'Developer',
		1: 'Marketing',
		2: 'Designer',
	};

	const handleChangeCareer = (event: any, newValue: any): void => {
		setTabIndex(newValue);
		dispatch(getJobsAsync(jobPosition[newValue]));
	};

	return (
		<div>
			<div className="text-center ">
				<h2 className="2xl:text-[48px] xl:text-[30px] text-[24px] leading-[30px] 2xl:leading-[72px] text-[#101010] font-[600] mb-[20px] 2xl:mb-[47px]">
					Our Culture
				</h2>
				<hr className="bg-[#E6E6E6] mt-[26px] mb-[21px] w-8/12 lg:w-[457px] m-auto" />
				<p className="text-[16px] leading-[29px] w-[95%] lg:w-[51%] mx-auto text-[#333333] mb-[20px] 2xl:mb-[90px]">
					Our business is young, our heart is young, therefore we are young at heart.
					Driven by passion and our one passion to use technology to abolish barriers of
					resources (time, money and skills). We serve people, makers, inventors,
					innovators and engineers. We serve businesses, yours, the large and the small
					ones out of a garage.The ones with the wisdom to create and the ones who create
					wisely.{' '}
					<span className="text-primary text-[16px] font-semibold">
						{' '}
						At IDEEZA, we want to give back the power to create to everyone
					</span>
				</p>
			</div>
			<div
				id="career"
				className="bg-career bg-white"
			>
				<div className="left-career-bg absolute">
					<img
						className="w-full"
						src="/images/landing/picasso-left-art.png"
						alt="E-about1"
					/>
				</div>
				<div className="right-career-bg absolute">
					<img
						className="w-full"
						src="/images/landing/picasso-right-art.png"
						alt="E-about2"
					/>
				</div>
				<div className="text-center lg:pt-[120px] lg:pb-[80px] p-6 w-full">
					<h2 className="2xl:text-[48px] xl:text-[30px] text-[24px] leading-[30px] 2xl:leading-[72px] text-[#101010] font-[600] mb-[34px]">
						Opened Positions
					</h2>
					<TabsMoleculeAbout
						tabsClasses="border rounded-full lg:w-1/3 md:w-1/2 mx-auto bg-[#FAFAFA] min-h-0"
						tabClasses="hover:bg-primary hover:text-white rounded-full w-full focus:bg-primary focus:text-white text-[16px] py-[6px] 2xl:py-[10px] transform-none leading-[29px] min-h-0"
						handleChange={handleChangeCareer}
						index={tabIndex}
						indicatorColor="primary"
						textColor="primary"
						selected="bg-primary text-white "
						tabsData={[
							{
								name: 'Developer',
								textColor: 'primary',
								component: <CareerJobList jobs={jobs} />,
							},
							{
								name: 'Marketing',
								textColor: 'primary',
								component: <CareerJobList jobs={jobs} />,
							},
							{
								name: 'Designer',
								textColor: 'primary',
								component: <CareerJobList jobs={jobs} />,
							},
						]}
					/>
				</div>
				<div className="md:text-2xl text-lg px-6 xl:w-7/12 md:w-9/12 mx-auto text-center pb-[115px]">
					<h2 className="md:text-lg xl:text-2xl 2xl:text-3xl txt-c11-color pb-5">
						It was Picasso who was saying we are all born artists,
					</h2>
					<h2 className="text-primary md:text-lg xl:text-2xl 2xl:text-3xl">
						but what was difficult was to remain an Artist while growing up.
					</h2>
				</div>
			</div>
		</div>
	);
};

export default AboutCareer;
