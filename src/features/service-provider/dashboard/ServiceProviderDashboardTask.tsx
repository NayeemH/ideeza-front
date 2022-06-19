import Button from '@atoms/button';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import DescriptionHeader from '@molecules/description-header';
import Conversation from '@organisms/service-provider/dashboard/Conversation';
import Offer from '@organisms/service-provider/dashboard/Offer';
import Image from 'next/image';
import Router from 'next/router';
import React, { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const ServiceProviderDashboardTask = () => {
	const [open, setOpen] = useState(false);
	const [pageShown, setPageShown] = useState<string>('offer');
	const toggleOpen = () => {
		setOpen((prev) => !prev);
	};
	return (
		<>
			<Modal
				width={'xs'}
				close={toggleOpen}
				header={
					<div className=" flex flex-col justify-between pb-2 p-6 pl-0">
						<Label
							value={
								pageShown === 'offer'
									? 'Offer for project Toy Car'
									: 'Proposel for project Toy Car'
							}
							className="text-3xl text-gray-600 font-bold"
						/>
					</div>
				}
				content={
					<>
						{pageShown === 'offer' && <Offer />}
						{pageShown === 'conversation' && <Conversation />}
					</>
				}
				// actions={}
				open={open}
			/>
			<div className="flex justify-between">
				<Label
					value="Project: Metal Making"
					className="text-3xl text-primary font-bold"
				/>
				<div className="">
					<Button
						onClick={() => {
							setOpen(true);
							setPageShown('offer');
						}}
						value="See offer"
						className="bg-primary text-white text-xl px-4 mr-2"
					/>
					<Button
						onClick={() => {
							setOpen(true);
							setPageShown('conversation');
						}}
						value="Start conversation"
						className="bg-primary text-white text-xl px-4 mr-2"
					/>
					<Button
						value={
							<>
								<AiOutlineArrowLeft className="bg-white text-sm md:text-lg rounded-full text-gray-600 md:mr-1 " />
								<span className="text-sm md:text-lg">Back</span>
							</>
						}
						onClick={() => Router.back()}
						className="bg-gray-400 text-sm md:text-lg text-white md:px-6"
					/>
				</div>
			</div>
			<div className="w-full h-[2px] bg-primary my-2"></div>
			<div className="">
				<Label
					value={
						<>
							Status: <span className="text-primary">Offer</span>{' '}
						</>
					}
					className="font-xl my-2 "
				/>
				<Image
					src="/images/technician-profile/Layer 5.png"
					alt="Picture of the author"
					width={'100%'}
					height={'50%'}
					layout="responsive"
				/>
				<div className="grid  md:grid-cols-3 gap-6 mt-5">
					<div className="col-span-2">
						<DescriptionHeader value="Project Description" />
						<div className="w-full bg-white p-4 text-base md:text-xl	">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus tempora
							veritatis qui deserunt sed soluta, mollitia dolores blanditiis error
							aspernatur nulla. Optio qui iusto incidunt! Magni, ratione animi quos
							corrupti similique, magnam modi unde beatae ab dolorem dolor adipisci
							asperiores quia! Accusantium commodi dolor, expedita sunt facere
							ducimus? Iste, libero. Lorem ipsum dolor sit amet, consectetur
							adipisicing elit.
						</div>
					</div>
					<div className="w-full">
						<DescriptionHeader value="Project Attachment" />
						<div className="w-full bg-white p-4 text-lg md:text-xl	">
							<Label value="3 Pic added" />
							<div className="images flex justify-between">
								<img
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRo32toLQgVHCxraq5_QrMaDR5EJOIUbam6A&usqp=CAU"
									width="100"
									alt="img1"
								/>
								<img
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRo32toLQgVHCxraq5_QrMaDR5EJOIUbam6A&usqp=CAU"
									width="100"
									alt="img2"
								/>
								<img
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRo32toLQgVHCxraq5_QrMaDR5EJOIUbam6A&usqp=CAU"
									width="100"
									alt="img3"
								/>
							</div>
							<Label value="Link attached:" />
							<a
								href="https://www.youtube.com/watch?v=0SPwwpruGIA"
								className="text-xs md:text-sm text-zinc-500"
							>
								https://www.youtube.com/watch?v=0SPwwpruGIA
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ServiceProviderDashboardTask;
