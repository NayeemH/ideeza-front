import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import Image from 'next/image';
import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

function Phone() {
	return (
		<>
			<div className="bg-white rounded-lg p-4 px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className=" rounded-lg ">
					<iframe
						className="mx-auto rounded-lg"
						src={
							'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d843.0350215535246!2d34.879185829250886!3d32.30808999881979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc86a6d990d26dd3c!2zMzLCsDE4JzI5LjEiTiAzNMKwNTInNDcuMCJF!5e0!3m2!1sen!2sbd!4v1642949098614!5m2!1sen!2sbd'
						}
						width={'100%'}
						height={'100%'}
						style={{ border: 0 }}
						loading="lazy"
					/>
				</div>
				<div className="md:p-3 py-3 space-y-4 text-center  hidden lg:block">
					<Label
						value="City Name, Netanya"
						className="text-[#101010] text-[40px] text-center"
					/>
					{/* <Label
            value="IOTG LTD"
            classes={{
              root: "text-current text-lg md:text-2xl lg:text-left text-center tracking-tight font-sans",
            }}
          /> */}
					{/* TODO: Uncomment these following lines when information will available */}
					<Label
						value="+972505905910"
						classes={{
							root: 'text-primary text-sm md:text-base mt-6 text-center tracking-tight ',
						}}
					/>
					<Label
						value={
							<>
								<span>IOTG LTD</span>
								{/* <span>The unreachable Building,</span>
								<span>Happy Lane, LS1 2A0</span>
								<span>(+1) 0123 45678990</span> */}
							</>
						}
						classes={{
							root: 'text-[#787878] text-center flex flex-col space-y-3 text-md md:text-lg tracking-tight font-sans',
						}}
					/>
					<IconLabel
						labelValue="Get directions"
						mainClass="flex flex-row-reverse justify-center items-center my-4 pt-12 cursor-pointer"
						iconContanerClass="text-sm md:text-md text-[#333333]"
						lableClass={{ root: 'text-md tracking-tight text-[#333333] pr-1' }}
						iconComponent={<MdKeyboardArrowRight className="text-primary text-2xl" />}
						tooltipProps={{ open: false }}
					/>
				</div>
				<Image
					src="/images/landing/phone_pic_2.png"
					className="mx-auto"
					alt="image"
					width={'100%'}
					height={'100%'}
					layout="responsive"
				/>
			</div>
			<div className="md:p-3 py-3 space-y-4 order-0 md:order-2 lg:hidden">
				<Label
					value="Netanya, Israel"
					classes={{
						root: 'text-gray-700 font-sans lg:text-left text-center font-bold text-3xl md:text-5xl tracking-tight',
					}}
				/>
				<Label
					value="IOTG LTD"
					classes={{
						root: 'text-current text-lg md:text-2xl lg:text-left text-center tracking-tight font-sans',
					}}
				/>
				{/* TODO: Uncomment these following lines when information will available */}
				{/* <Label
          value="+99555111234125"
          classes={{
            root: "text-current text-lg md:text-2xl tracking-tight font-sans",
          }}
        />
        <Label
          value={
            <>
              <span>IOTG LTD,</span>
              <span>The unreachable Building,</span>
              <span>Happy Lane, LS1 2A0</span>
              <span>(+1) 0123 45678990</span>
            </>
          }
          classes={{
            root: "text-blue-550 flex flex-col space-y-3 text-md md:text-lg tracking-tight font-sans",
          }}
        />
        <IconLabel
          labelValue="Get directions"
          mainClass="flex flex-row-reverse justify-end items-center my-4 pt-12 cursor-pointer"
          iconContanerClass="text-sm md:text-md text-gray-700"
          lableClass={{ root: "text-md tracking-tight text-gray-700 pr-1" }}
          iconComponent={
            <MdKeyboardArrowRight className="text-primary text-2xl" />
          }
          tooltipProps={{ open: false }}
        /> */}
			</div>
		</>
	);
}

export default Phone;
