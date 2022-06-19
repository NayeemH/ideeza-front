import Button from '@atoms/button';
import Label from '@atoms/label';
import AvatarLabels from '@molecules/avatar-label';
import IconLabel from '@molecules/icon-label';
import TwoLabels from '@molecules/two-levels';
import ProceedPopup from '@organisms/proceed-popup';
import React, { useState } from 'react';

import { GoStar } from 'react-icons/go';

function AddServiceSection(props: any) {
	const [popup, SetPopup] = useState(false);
	const toggleOpen = () => SetPopup(!popup);
	const { isUnavailable } = props;
	return (
		<div className="flex items-start space-x-5">
			<AvatarLabels
				src="/images/cart-h-add1.png"
				mainClasses="flex flex-col items-center"
				avaterClasses="w-16 h-16"
				subtitle={
					<>
						<IconLabel
							mainClass="flex items-center pt-1"
							tooltipProps={{ open: false }}
							labelValue="(5.0)"
							iconContanerClass="text-lg"
							lableClass={{
								root: `text-gray-600 tracking-tight text-base 2xl:text-xl pl-1 font-sans`,
							}}
							iconComponent={
								<GoStar className="text-yellow-600 text-base 2xl:text-xl -ml-2" />
							}
						/>
					</>
				}
			/>
			<div className="space-y-3">
				<div className="md:flex items-center justify-between w-full space-x-2">
					<div className="flex items-center space-x-2">
						<TwoLabels
							mainClass="flex flex-col"
							value="John Doe"
							value2="Frizty Studio LTD"
							labelClass="text-gray-600 texl-lg 2xl:text-2xl tracking-tight font-sans"
							labelClass2="text-primary text-base 2xl:text-xl tracking-tight font-sans md:leading-4"
						/>
						{isUnavailable ? (
							<Label
								value="Unavailable"
								className=" text-base 2xl:text-xl font-sans txt-c-color tracking-tight pl-2"
							/>
						) : (
							<>
								<Button
									value="Select"
									classes={{
										root: `bg-primary text-white rounded px-5 py-3 leading-4 whitespace-nowrap tracking-tight transform-none text-base 2xl:text-xl font-sans`,
									}}
									color="primary"
								/>
								<Label
									value="Available"
									className="text-primary text-base 2xl:text-xl font-sans tracking-tight pl-2"
								/>
							</>
						)}
					</div>
					<div className="flex items-center justify-end space-x-2">
						<Label
							value="33.00 /hr"
							className="text-gray-900 font-bold font-sans text-base 2xl:text-xl tracking-tight"
						/>
					</div>
				</div>
				<Label
					value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus"
					className="text-gray-880 text-md font-sans text-base 2xl:text-xl tracking-tight"
				/>
				<Button
					value="Patent"
					classes={{
						root: `bg-gray-600 text-white px-6 transform-none text-base 2xl:text-xl py-3 tracking-tight leading-4 font-sans`,
					}}
					color="secondary"
				/>
			</div>
			<ProceedPopup
				open={popup}
				toggleOpen={toggleOpen}
			/>
		</div>
	);
}

export default AddServiceSection;
