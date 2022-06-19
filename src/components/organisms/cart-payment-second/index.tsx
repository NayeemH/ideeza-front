import Input from '@atoms/input';
import Label from '@atoms/label';
import CheckboxFields from '@molecules/checkbox-fields';
import IconLabel from '@molecules/icon-label';
import TwoLabels from '@molecules/two-levels';
import React from 'react';
import { IoLocationSharp, IoArrowForwardCircleOutline } from 'react-icons/io5';
function CartPaymentSecond() {
	return (
		<div>
			<div className="grid md:grid-cols-2 lg:gap-x-32 md:gap-x-20 gap-y-5 pr-10">
				<div className="space-y-2 mt-10">
					<Label
						value="DELIVERY"
						className="text-base 2xl:text-xl font-bold uppercase text-primary font-semibold tracking-tight font-sans border-b-2 border-white pb-1"
					/>
					<div className="flex items-center justify-between w-full">
						<IconLabel
							tooltipProps={{ open: false }}
							labelValue="Express Delivery"
							iconContanerClass="text-lg w-8"
							lableClass={{
								root: `text-gray-600 tracking-tight text-base 2xl:text-xl leading-5 font-sans ml-2`,
							}}
							iconComponent={
								<img
									src="/images/icon/delivery-truck.svg"
									className="w-full"
									alt=""
								/>
							}
						/>
						<TwoLabels
							mainClass="flex items-center space-x-2"
							value="Price:"
							value2="$50"
							labelClass="text-gray-900 text-base 2xl:text-xl tracking-tight font-sans"
							labelClass2="text-gray-600 text-base 2xl:text-xl tracking-tight font-sans"
						/>
					</div>
					<IconLabel
						mainClass="flex items-start"
						tooltipProps={{ open: false }}
						labelValue="Keas 69 Str. 15234, Chalandri Athens, Greece"
						iconContanerClass="text-lg w-8"
						lableClass={{
							root: `text-gray-600 tracking-tight text-base 2xl:text-xl leading-5 font-sans ml-2 w-28`,
						}}
						iconComponent={<IoLocationSharp className="text-gray-910 text-3xl" />}
					/>
				</div>
				<div className="space-y-2">
					<Label
						value="PAYMENT"
						className="text-base 2xl:text-xl font-bold uppercase text-primary font-semibold tracking-tight font-sans border-b-2 border-white pb-1"
					/>
					<IconLabel
						tooltipProps={{ open: false }}
						labelValue={`VISA XXXX XXXX XXXX 3734`}
						iconContanerClass="text-lg w-6"
						lableClass={{
							root: `text-gray-600 tracking-tight text-base 2xl:text-xl leading-5 font-sans ml-2`,
						}}
						iconComponent={
							<img
								src="/assets/images/credit-card.svg"
								className="w-full"
								alt=""
							/>
						}
					/>
				</div>
			</div>
			<div className="md:flex items-center justify-between w-full pt-3">
				<CheckboxFields
					size="small"
					color="secondary"
					mainClass="-ml-2 items-start pr-20"
					// containerClass={` ${value1Class}`}
					labelClass={`text-base 2xl:text-xl tracking-tight leading-7 text-gray-600 pl-1`}
					checked={false}
					name=""
					value={
						<>
							I know due to my{' '}
							<span className="text-primary text-base 2xl:text-xl font-semibold">
								quote request & manufacture process
							</span>{' '}
							the final cost can be change and be notify under my orders.
						</>
					}
				/>
				<TwoLabels
					mainClass="flex items-center space-x-2 text-right justify-end w-64"
					value="Total Price:"
					value2="$40,000"
					labelClass="text-gray-600 text-base 2xl:text-xl tracking-tight font-sans"
					labelClass2="text-gray-600 text-base 2xl:text-xl tracking-tight font-sans font-semibold"
				/>
			</div>
			<div className="flex justify-end w-full">
				<div className="border border-primary rounded flex items-center p-2">
					<IconLabel
						tooltipProps={{ open: false }}
						labelValue="Promo Code"
						// mainClass="flex items-center"
						iconContanerClass="text-lg w-8"
						lableClass={{
							root: `text-gray-600 tracking-tight text-base 2xl:text-xl leading-5 font-sans ml-2`,
						}}
						iconComponent={
							<img
								src="/images/icon/sale.svg"
								className="w-full"
								alt=""
							/>
						}
					/>
					<div className="flex items-center space-x-1 pr-2">
						<Input
							className={{
								root: `text-sm tracking-tight font-sans border-b border-primary bg-transparent p-0 rounded-none w-6 h-6`,
							}}
							position="start"
						/>
						<Input
							className={{
								root: `text-sm tracking-tight font-sans border-b border-primary bg-transparent p-0 rounded-none w-6 h-6`,
							}}
							position="start"
						/>
						<Input
							className={{
								root: `text-sm tracking-tight font-sans border-b border-primary bg-transparent p-0 rounded-none w-6 h-6`,
							}}
							position="start"
						/>
						<Input
							className={{
								root: `text-sm tracking-tight font-sans border-b border-primary bg-transparent p-0 rounded-none w-6 h-6`,
							}}
							position="start"
						/>
						<Input
							className={{
								root: `text-sm tracking-tight font-sans border-b border-primary bg-transparent p-0 rounded-none w-6 h-6`,
							}}
							position="start"
						/>
					</div>
					<IoArrowForwardCircleOutline className="text-2xl text-primary" />
				</div>
			</div>
			<TwoLabels
				mainClass="flex items-center space-x-2 text-right justify-end pt-2"
				value="Total Price:"
				value2="$45,000"
				labelClass="text-gray-600 text-base 2xl:text-xl tracking-tight font-sans"
				labelClass2="text-primary text-base 2xl:text-xl tracking-tight font-sans font-semibold"
			/>
		</div>
	);
}
export default CartPaymentSecond;
