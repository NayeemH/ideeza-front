import PointLevel from '@organisms/web-point-level';
// import Image from "next/image";
import React from 'react';
import { BsFillInfoCircleFill } from 'react-icons/bs';

// interface WebCollaborationHomeProps {

// }

export default function WebCollaborationHome() {
	return (
		<>
			<div className="">
				<div className="bg-web-collaboration lg:pl-[100px] pt-[365px] pb-[265px] hidden lg:block">
					<h1 className="2xl:text-[40px] lg:text-[30px] font-semibold text-primary">
						Points <span className="text-[#333333]">& </span>
						<span className="text-[#561F80]">Levels</span>{' '}
					</h1>
					<div className="2xl:w-[800px] xl:w-[600px] lg:w-[350px]">
						<p className="text-base xl:text-[18px] text-[#666666] pb-[40px]">
							Our point coming from: creating new project, creating new article,
							comments on public projects, adding parts or components, editing public
							projects, sharing projects on social media, etc.{' '}
						</p>
						<p className="text-base xl:text-[18px] text-[#666666]">
							The levels are according to the score counting from their contribute in
							IDEEZA platform according to points earning and Level steps in the
							website.{' '}
						</p>
					</div>
				</div>
				<div className="lg:hidden flex relative ">
					<div className="pt-[100px] z-20">
						<h1 className="text-[25px] font-semibold text-primary">
							Points <span className="text-[#333333]">& </span>
							<span className="text-[#561F80]">Levels</span>{' '}
						</h1>
						<div className="">
							<p className="sm:text-base text-[14px] w-[70%] mb-[30px]">
								Our point coming from: creating new project, creating new article,
								comments on public projects, adding parts or components, editing
								public projects, sharing projects on social media, etc.{' '}
							</p>
							<p className="sm:text-base text-[14px] z-20">
								The levels are according to the score counting from their contribute
								in IDEEZA platform according to points earning and Level steps in
								the website..{' '}
							</p>
						</div>
					</div>
					<div className="absolute right-0 top-0  sm:static z-10">
						<img
							src="/images/landing/newhomeBanner_bg.png"
							className="w-full h-full"
							alt=""
						/>
						{/* <div className="absolute top-0 right-0 w-[80%] h-[80%] z-0">
              <Image
                src="/images/landing/newhomeBanner_bg.png"
                className="w-full h-full"
                alt="image"
                width={"100%"}
                height={"87%"}
                layout="responsive"
              />
            </div> */}
					</div>
				</div>
				<div className=" bg-[#F8F8F8] px-[300px] flex gap-[110px] py-[130px]">
					<div className="sm:pr-[40px] lg:pr-0 mt-[30px] w-[560px]">
						<div className="mb-[30px]">
							<PointLevel
								lavelName="Level 1"
								lavelStatus="Novice"
								pointStart={0}
								pointEnd={50}
								img="/images/landing/web-noob-1.png"
							/>
						</div>
						<div className="mb-[30px]">
							<PointLevel
								lavelName="Level 2"
								lavelStatus="Rookie"
								pointStart={50}
								pointEnd={100}
								img="/images/landing/web-noob-2.png"
							/>
						</div>
						<div className="mb-[30px]">
							<PointLevel
								lavelName="Level 3"
								lavelStatus="Talented"
								pointStart={100}
								pointEnd={500}
								img="/images/landing/web-noob-3.png"
							/>
						</div>
						<div className="mb-[30px]">
							<PointLevel
								lavelName="Level 4"
								lavelStatus="Senior"
								pointStart={500}
								pointEnd={1000}
								img="/images/landing/web-noob-4.png"
							/>
						</div>
						<div className="mb-[30px]">
							<PointLevel
								lavelName="Level 5"
								lavelStatus="Master"
								isPointPlus={true}
								allPoints={1000}
								img="/images/landing/web-noob-5.png"
							/>
						</div>
					</div>
					<div className=" lg:py-[150px] w-[650px]">
						<h1 className="2xl:text-[40px] text-center lg:text-left lg:text-[30px] font-semibold text-[#561F80]">
							IDEEZA <span className="text-primary">Collective </span>
							<span className="text-[#333333]">Program</span>{' '}
						</h1>
						<p className="text-base xl:text-[18px] text-center lg:text-left text-[#666666]">
							Every time you contribute to IDEEZA, you receive IDEEZA Collective
							points. Here's a list of what you can contribute, and how much it's
							worth.{' '}
						</p>
						<div className="pt-[35px] ">
							<div className="flex border px-[30px] bg-transparent rounded-[15px]">
								<div className="w-1/2 ">
									<h2 className=" text-[13px] sm:text-base border-r border-b font-semibold pl-[12px] py-[18px]">
										IDEEZA contribution
									</h2>
									<div className=" text-[13px] sm:text-base border-b border-r pl-[12px] py-[18px]">
										Review
									</div>
									<div className=" text-[13px] sm:text-base border-b border-r pl-[12px] py-[18px]">
										Photo
									</div>
									<div className=" text-[13px] sm:text-base border-b border-r pl-[12px] py-[18px]">
										Video
									</div>
									<div className=" text-[13px] sm:text-base border-b border-r pl-[12px] py-[18px]">
										Forum Post{' '}
									</div>
									<div className=" text-[13px] sm:text-base border-b border-r pl-[12px] py-[18px]">
										Rating
									</div>
									<div className=" text-[13px] sm:text-base border-b border-r pl-[12px] py-[18px]">
										Ideeza Article Creation{' '}
									</div>
									<div className=" text-[13px] sm:text-base border-b border-r pl-[12px] py-[18px]">
										Ideeza Article Edits{' '}
									</div>
									<div className=" text-[13px] sm:text-base border-b border-r pl-[12px] py-[18px]">
										Helpful Vote
									</div>
									<div className=" text-[13px] sm:text-base border-b border-r pl-[12px] py-[18px]">
										Answer
									</div>
									<div className=" text-[13px] sm:text-base border-b border-r pl-[12px] py-[18px]">
										Respont to Q&As
									</div>
									<div className=" text-[13px] sm:text-base border-b border-r pl-[12px] py-[18px]">
										Product Added
									</div>
								</div>
								<div className="w-1/2 bg-transparent">
									<h2 className=" text-[13px] sm:text-base border-b font-semibold pl-[12px] py-[18px]">
										Points earned
									</h2>
									<div className=" text-[13px] sm:text-base border-b  pl-[12px] pr-[15px] py-[18px]">
										<div className="flex justify-between">
											<p>10 points per review</p>
											<BsFillInfoCircleFill className="text-lg text-[#999999]" />
										</div>
									</div>
									<div className=" text-[13px] sm:text-base border-b  pl-[12px] pr-[15px] py-[18px]">
										<div className="flex justify-between">
											<p>5 points per photo</p>
											<BsFillInfoCircleFill className="text-lg text-[#999999]" />
										</div>
									</div>
									<div className=" text-[13px] sm:text-base border-b  pl-[12px] pr-[15px] py-[18px]">
										<div className="flex justify-between">
											<p>30 points per video</p>
											<BsFillInfoCircleFill className="text-lg text-[#999999]" />
										</div>
									</div>
									<div className=" text-[13px] sm:text-base border-b  pl-[12px] pr-[15px] py-[18px]">
										<div className="flex justify-between">
											<p>5 points per post</p>
											<BsFillInfoCircleFill className="text-lg text-[#999999]" />
										</div>
									</div>
									<div className=" text-[13px] sm:text-base border-b  pl-[12px] pr-[15px] py-[18px]">
										<div className="flex justify-between">
											<p>20 points per rating</p>
											<BsFillInfoCircleFill className="text-lg text-[#999999]" />
										</div>
									</div>
									<div className=" text-[13px] sm:text-base border-b  pl-[12px] pr-[15px] py-[18px]">
										<div className="flex justify-between">
											<p>10 points per article</p>
											<BsFillInfoCircleFill className="text-lg text-[#999999]" />
										</div>
									</div>
									<div className=" text-[13px] sm:text-base border-b  pl-[12px] pr-[15px] py-[18px]">
										<div className="flex justify-between">
											<p>2 points per edit</p>
											<BsFillInfoCircleFill className="text-lg text-[#999999]" />
										</div>
									</div>
									<div className=" text-[13px] sm:text-base border-b  pl-[12px] pr-[15px] py-[18px]">
										<div className="flex justify-between">
											<p>1 point per vote</p>
											<BsFillInfoCircleFill className="text-lg text-[#999999]" />
										</div>
									</div>
									<div className=" text-[13px] sm:text-base border-b  pl-[12px] pr-[15px] py-[18px]">
										<div className="flex justify-between">
											<p>1 points per answer</p>
											<BsFillInfoCircleFill className="text-lg text-[#999999]" />
										</div>
									</div>
									<div className=" text-[13px] sm:text-base border-b  pl-[12px] pr-[15px] py-[18px]">
										<div className="flex justify-between">
											<p>10 points per response</p>
											<BsFillInfoCircleFill className="text-lg text-[#999999]" />
										</div>
									</div>
									<div className=" text-[13px] sm:text-base border-b  pl-[12px] pr-[15px] py-[18px]">
										<div className="flex justify-between">
											<p>50 points per response</p>
											<BsFillInfoCircleFill className="text-lg text-[#999999]" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
