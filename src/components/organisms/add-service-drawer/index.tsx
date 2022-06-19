import Button from '@atoms/button';
import Label from '@atoms/label';
import WorkingRequest from '@molecules/working-request';
import OfferPopup from '@organisms/offer-popup';
import React, { useState } from 'react';
import { IoIosCheckmarkCircle, IoMdClose } from 'react-icons/io';
export default function AddServiceDrawer(props: any) {
	const { onClick, value } = props;
	const [popup, SetPopup] = useState(true);
	const toggleOpen = () => SetPopup(!popup);
	return (
		<div
			className="rounded-lg shadow-md bg-gray-100 ml-auto"
			// style={{ MaxWidth: "600px" }}
		>
			<div className="md:p-5 p-4 md:pr-3">
				<Label
					value={value}
					className="tracking-tight pb-1 text-gray-600 font-semibold font-sans text-base"
				/>
				<div className="max-h-48 overflow-y-auto space-y-5 pr-5">
					<WorkingRequest
						mainClass="flex items-center flex-wrap md:flex-nowrap space-y-2 space-x-2"
						avatarClass="md:h-11 h-10 md:w-11 w-10"
						label1Class="md:text-md text-base text-gray-600 font-sans tracking-tight"
						label2Class="md:text-sm text-sm text-primary font-thin tracking-tight font-sans -mt-1"
						statusClass="text-primary font-bold whitespace-nowrap md:px-4"
						btnClass="bg-white shadow-md text-gray-600 md:py-2 py-1 px-2 mr-1 transform-none md:text-md text-sm tracking-tight font-sans"
						namevalue="Natalia Roblox"
						Compvalue="Frizty Studio LTD"
						statusValue="Patent"
						btnvalue="Send Offer"
						click={toggleOpen}
						size="18px"
						services={
							<>
								<Button
									value="6 days"
									classes={{
										root: `bg-transparent border border-solid border-gray-770 border-opacity-50 text-gray-600 w-8 transform-none md:text-sm text-xs tracking-tight leading-3 font-sans`,
									}}
									color="inherit"
								/>
								<Button
									value="$220"
									classes={{
										root: `bg-transparent border border-solid border-gray-770 border-opacity-50 text-gray-600 w-8 transform-none md:text-sm text-xs tracking-tight leading-3 font-sans`,
									}}
									color="inherit"
								/>
							</>
						}
					/>
					<WorkingRequest
						mainClass="flex items-center flex-wrap md:flex-nowrap space-y-2 space-x-2"
						avatarClass="md:h-11 h-10 md:w-11 w-10"
						label1Class="md:text-md text-base text-gray-600 font-sans tracking-tight"
						label2Class="md:text-sm text-sm text-primary font-thin tracking-tight font-sans -mt-1"
						statusClass="text-primary font-bold whitespace-nowrap md:px-4"
						btnClass="bg-white shadow-md text-gray-600 md:py-2 py-1 px-2 mr-1 transform-none md:text-md text-sm tracking-tight font-sans"
						namevalue="Natalia Roblox"
						Compvalue="Frizty Studio LTD"
						statusValue="Patent"
						btnvalue="Send Offer"
						size="18px"
						services={
							<>
								<Button
									value="6 days"
									classes={{
										root: `bg-transparent border border-solid border-gray-770 border-opacity-50 text-gray-600 w-8 transform-none md:text-sm text-xs tracking-tight leading-3 font-sans`,
									}}
									color="inherit"
								/>
								<Button
									value="$220"
									classes={{
										root: `bg-transparent border border-solid border-gray-770 border-opacity-50 text-gray-600 w-8 transform-none md:text-sm text-xs tracking-tight leading-3 font-sans`,
									}}
									color="inherit"
								/>
							</>
						}
					/>
					<WorkingRequest
						mainClass="flex items-center flex-wrap md:flex-nowrap space-y-2 space-x-2"
						avatarClass="md:h-11 h-10 md:w-11 w-10"
						label1Class="md:text-md text-base text-gray-600 font-sans tracking-tight"
						label2Class="md:text-sm text-sm text-primary font-thin tracking-tight font-sans -mt-1"
						statusClass="text-primary font-bold whitespace-nowrap md:px-4"
						btnClass="bg-white shadow-md text-gray-600 md:py-2 py-1 px-2 mr-1 transform-none md:text-md text-sm tracking-tight font-sans"
						namevalue="Natalia Roblox"
						Compvalue="Frizty Studio LTD"
						statusValue="Patent"
						btnvalue="Send Offer"
						size="18px"
						services={
							<>
								<Button
									value="6 days"
									classes={{
										root: `bg-transparent border border-solid border-gray-770 border-opacity-50 text-gray-600 w-8 transform-none md:text-sm text-xs tracking-tight leading-3 font-sans`,
									}}
									color="inherit"
								/>
								<Button
									value="$220"
									classes={{
										root: `bg-transparent border border-solid border-gray-770 border-opacity-50 text-gray-600 w-8 transform-none md:text-sm text-xs tracking-tight leading-3 font-sans`,
									}}
									color="inherit"
								/>
							</>
						}
					/>
					<WorkingRequest
						mainClass="flex items-center flex-wrap md:flex-nowrap space-y-2 space-x-2"
						avatarClass="md:h-11 h-10 md:w-11 w-10"
						label1Class="md:text-md text-base text-gray-600 font-sans tracking-tight"
						label2Class="md:text-sm text-sm text-primary font-thin tracking-tight font-sans -mt-1"
						statusClass="text-primary font-bold whitespace-nowrap md:px-4"
						btnClass="bg-green-100 text-white md:py-2 py-1 px-2 mr-1 transform-none md:text-md text-sm tracking-tight font-sans"
						namevalue="Natalia Roblox"
						Compvalue="Frizty Studio LTD"
						statusValue="Patent"
						btnvalue="Sent"
						iconStart={<IoIosCheckmarkCircle />}
						size="18px"
						icon="opacity-0"
						services={
							<>
								<Button
									value="6 days"
									classes={{
										root: `bg-transparent border border-solid border-gray-770 border-opacity-50 text-gray-600 w-8 transform-none md:text-sm text-xs tracking-tight leading-3 font-sans`,
									}}
									color="inherit"
								/>
								<Button
									value="$220"
									classes={{
										root: `bg-transparent border border-solid border-gray-770 border-opacity-50 text-gray-600 w-8 transform-none md:text-sm text-xs tracking-tight leading-3 font-sans`,
									}}
									color="inherit"
								/>
							</>
						}
					/>
				</div>
			</div>
			<div className="flex items-center space-x-3 pr-6">
				<IoMdClose
					className="text-white bg-red-500 h-12 px-1 w-8 rounded-r-2xl flex items-center justify-center cursor-pointer"
					onClick={onClick}
				/>
				<hr className="border w-full" />
			</div>
			<div className="md:p-5 p-4 md:pr-3">
				<div className="max-h-48 overflow-y-auto space-y-5 pr-5">
					<WorkingRequest
						mainClass="flex items-center flex-wrap md:flex-nowrap space-y-2 space-x-3"
						avatarClass="md:h-11 h-10 md:w-11 w-10"
						label1Class="md:text-md text-base text-gray-600 font-sans tracking-tight"
						label2Class="md:text-sm text-sm text-primary font-thin tracking-tight font-sans -mt-1"
						statusClass="text-primary font-bold"
						btnClass="bg-white shadow-md text-gray-600 md:py-2 py-1 px-2 mr-1 transform-none md:text-md text-sm tracking-tight font-sans"
						namevalue="Natalia Roblox"
						Compvalue="Frizty Studio LTD"
						statusValue="Patent"
						btnvalue="Request Quote"
						size="18px"
					/>
					<WorkingRequest
						mainClass="flex items-center flex-wrap md:flex-nowrap space-y-2 space-x-3"
						avatarClass="md:h-11 h-10 md:w-11 w-10"
						label1Class="md:text-md text-base text-gray-600 font-sans tracking-tight"
						label2Class="md:text-sm text-sm text-primary font-thin tracking-tight font-sans -mt-1"
						statusClass="text-primary font-bold"
						btnClass="bg-white shadow-md text-gray-600 md:py-2 py-1 px-2 mr-1 transform-none md:text-md text-sm tracking-tight font-sans"
						namevalue="Natalia Roblox"
						Compvalue="Frizty Studio LTD"
						statusValue="Patent"
						btnvalue="Request Quote"
						size="18px"
					/>
					<WorkingRequest
						mainClass="flex items-center flex-wrap md:flex-nowrap space-y-2 space-x-3"
						avatarClass="md:h-11 h-10 md:w-11 w-10"
						label1Class="md:text-md text-base text-gray-600 font-sans tracking-tight"
						label2Class="md:text-sm text-sm text-primary font-thin tracking-tight font-sans -mt-1"
						statusClass="text-primary font-bold"
						btnClass="bg-white shadow-md text-gray-600 md:py-2 py-1 px-2 mr-1 transform-none md:text-md text-sm tracking-tight font-sans"
						namevalue="Natalia Roblox"
						Compvalue="Frizty Studio LTD"
						statusValue="Patent"
						btnvalue="Request Quote"
						size="18px"
					/>
					<WorkingRequest
						mainClass="flex items-center flex-wrap md:flex-nowrap space-y-2 space-x-3"
						avatarClass="md:h-11 h-10 md:w-11 w-10"
						label1Class="md:text-md text-base text-gray-600 font-sans tracking-tight"
						label2Class="md:text-sm text-sm text-primary font-thin tracking-tight font-sans -mt-1"
						statusClass="text-primary font-bold"
						btnClass="bg-green-100 text-white md:py-2 py-1 px-2 mr-1 transform-none md:text-md text-sm tracking-tight font-sans"
						namevalue="Natalia Roblox"
						Compvalue="Frizty Studio LTD"
						statusValue="Patent"
						btnvalue="Request Sent"
						size="18px"
					/>
				</div>
			</div>
			<OfferPopup
				open={popup}
				toggleOpen={toggleOpen}
			/>
		</div>
	);
}
