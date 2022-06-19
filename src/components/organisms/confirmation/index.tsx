import Button from '@atoms/button';
import Label from '@atoms/label';
import React from 'react';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
type Iprops = {
	src: string;
	value: string;
	btnValue: string;
	iconEnd?: any;
	btnClass: string;
	lableClass: string;
	lableClass2: string;
	mainClass?: string;
	clickHandler: () => void;
};

function Confirmation({
	src,
	value,
	btnValue,
	iconEnd,
	btnClass,
	lableClass,
	lableClass2,
	clickHandler,
	mainClass = 'bg-white shadow rounded-md p-7 py-20 flex flex-col items-center',
}: Iprops) {
	return (
		<div className={mainClass}>
			<img
				src={src}
				className="w-[155px] mb-4"
				alt="image"
			/>
			<Label
				value="Congratulations!"
				className={lableClass}
			/>
			<Label
				value={value}
				className={lableClass2}
			/>
			<Button
				value={btnValue}
				iconEnd={iconEnd}
				color="primary"
				className={`${btnClass}`}
				onClick={clickHandler}
			/>
		</div>
	);
}
Confirmation.defaultProps = {
	src: '/images/confirmation.png',
	value: 'Your order is accepted.',
	lableClass: 'text-xl xl:text-3xl 2xl:text-4xl text-center font-bold text-primary font-sans',
	lableClass2: 'text-xl xl:text-3xl 2xl:text-4xl text-center font-bold text-gray-700 font-sans',
	btnValue: 'Track Order',
	iconEnd: <IoArrowForwardCircleOutline className="text-2xl" />,
	btnClass:
		'text-white shadow-none bg-primary mt-8 mx-auto border border-solid border-primary tracking-tight font-sans capitalize p-2 px-4 text-base 2xl:text-xl',
};
export default Confirmation;
