import Button from '@atoms/button';
import Label from '@atoms/label';
//import CategorySelector from "@organisms/category-selector";
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
// import { FORMINPUT } from 'utils/styles';
import { useThrottle } from 'utils/utils';
import CategoryMultipleSelector from '@organisms/category-selector/CategoryMultipleSelector';

type IProps = {
	setFormStep: () => void;
	color?: any;
};

const Basic = ({ setFormStep, color }: IProps) => {
	const [colorInput, setColorInput] = useState('');
	const throttleColor = useThrottle(colorInput, 2000);
	const {
		register,
		handleSubmit,
		setValue,
		//control,
		formState: { errors },
	} = useFormContext();

	const submit = () => {
		setFormStep();
	};

	useEffect(() => {
		if (throttleColor) {
			color(throttleColor);
			setValue('color', throttleColor);
		}
	}, [throttleColor]);

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className="h-full"
		>
			<div className="bg-white border rounded-[10px] p-5 h-full">
				<div className="flex items-center w-full border-b py-[20px]">
					<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
						Block Name
					</label>

					<div className="w-full">
						<input
							type="text"
							className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-[100%] outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
							placeholder="Block Name"
							{...register('name', {
								required: 'Enter Name',
								maxLength: 255,
							})}
						/>
						{errors.name && (
							<p className="text-red-400 text-xs">{errors.name.message}</p>
						)}
					</div>
				</div>
				<div className="flex items-center w-full border-b py-[20px]">
					<Label
						value="Color"
						className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]"
					/>
					<div className="w-full">
						<input
							type="color"
							{...register('color', { required: 'Select color' })}
							className="h-10 w-10 border border-gray-725 cursor-pointer"
							defaultValue="#ff24c7"
							onChange={(e: any) => setColorInput(e.target.value)}
						/>
						{errors.color && (
							<p className="text-red-400 text-xs">{errors.color.message}</p>
						)}
					</div>
				</div>

				<div className="flex items-center w-full py-[20px]">
					<Label
						value={'Category'}
						classes={{
							root: 'text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]',
						}}
					/>
					<div className="w-full">
						{/*<CategorySelector control={control} />*/}
						<CategoryMultipleSelector
							categoryType={'CODE'}
							onSelect={(id) => setValue('category', id)}
						/>
						{errors?.category && (
							<p className="text-red-400 text-xs">{errors.category.message}</p>
						)}
					</div>
				</div>
				<div className="flex items-center w-full  pb-[20px]">
					<Label
						value={'Type'}
						classes={{
							root: 'text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[42%]',
						}}
					/>
					<select className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-[100%] outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova form-select">
						{[
							{
								name: 'Public',
								value: 'public',
							},
							{
								name: 'Private',
								value: 'private',
							},
						].map((item) => (
							<option
								key={item.value}
								value={item.value}
							>
								{item.name}
							</option>
						))}
					</select>
				</div>
				{/* TODO Input PIn */}
				{/* <div className="flex items-center w-full border-b pb-[20px]">
					<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">Input Pin</label>

					<div className="w-full">
						<input
							type="number"
							className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-[100%] outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
							placeholder="10"
							{...register('number', {
								required: 'Enter Pin Number',
								maxLength: 255,
							})}
						/>
						{errors.number && (
							<p className="text-red-400 text-xs">{errors.number.message}</p>
						)}
					</div>
				</div> */}

				<div className="flex items-center justify-end w-full pt-6 lg:px-16 md:px-8">
					<Button
						value="Next Step"
						type="submit"
						className="bg-primary w-40 transform-none text-white text-base 2xl:text-[18px] py-[12px] font-proxima-nova tracking-tight"
						color="primary"
					/>
				</div>
			</div>
		</form>
	);
};

export default Basic;
