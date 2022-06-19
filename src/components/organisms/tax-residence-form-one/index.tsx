import Label from '@atoms/label';
import { ITaxInformation } from '@models/auth';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { COUNTRIES } from 'utils/countries';
import Button from '@atoms/button';

function TaxResidenceFormOne({
	methods,
	taxInfo,
}: {
	methods: UseFormReturn<any, object>;
	taxInfo: ITaxInformation | undefined;
}) {
	const {
		formState: { errors },
	} = methods;
	return (
		<div className={`pt-2`}>
			<Label
				value="This address will be displayed on the invoice set to clients."
				classes={{
					root: `text-base 2xl:text-xl text-[#333333]  font-semibold mb-5 mt-[38px]`,
				}}
			/>
			<label className="block mb-4">
				<input
					type="checkbox"
					className="w-5 h-5 mr-2  accent-slate-50"
				/>
				<span className="text-[#646464]  text-base ">Use my existing location address</span>
			</label>
			<div className="mt-[60px] flex items-center gap-[134px]">
				<label className="pb-1  text-[#333333] block text-base">Country</label>
				<select
					className="border rounded border-solid border-[#E6E6E6] bg-[#FBFBFB] px-4 py-3"
					{...methods.register('country', { required: 'Select your country' })}
				>
					<option
						value=""
						disabled
						selected
					>
						Select Country
					</option>
					{COUNTRIES.map((country) => (
						<option
							key={country.code}
							value={country.name}
							selected={country.name === taxInfo?.country}
						>
							{country.name}
						</option>
					))}
				</select>
				{errors?.country && (
					<p className="text-sm text-red-400">{errors?.country.message}</p>
				)}
			</div>
			<label className=" mt-5 flex items-center gap-[130px]">
				<span className="pb-1 text-[#333333] block text-base">Address</span>
				<input
					{...methods.register('address', { required: 'Enter your address' })}
					defaultValue={taxInfo?.address}
					placeholder="Enter your address"
					className="bg-[#FBFBFB] rounded mr-8 pl-5 py-3 text-lg hover:bg-white border border-[#E6E6E6] hover:border-primary hover:shadow transition-all duration-500 ease-in-out w-full focus:border-primary focus-visible:outline-none placeholder-[#D6D6D6]"
				/>
				{errors?.address && (
					<p className="text-sm text-red-400">{errors?.address.message}</p>
				)}
			</label>
			<label className=" mt-5 flex items-center gap-40">
				<span className="pb-1 text-[#333333] block text-base">City</span>
				<input
					{...methods.register('city', { required: 'Enter your city' })}
					className="bg-[#FBFBFB] rounded mr-8 pl-5 py-3 text-lg hover:bg-white border border-[#E6E6E6] hover:border-primary hover:shadow transition-all duration-500 ease-in-out w-full focus:border-primary focus-visible:outline-none placeholder-[#D6D6D6]"
					defaultValue={taxInfo?.city}
					placeholder="Enter your city"
				/>
				{errors?.city && <p className="text-sm text-red-400">{errors?.city.message}</p>}
			</label>
			<label className=" mt-5 grid grid-cols-3 mr-9">
				<span className="pb-1 text-[#333333] block text-base w-full">Postal Code</span>
				<input
					{...methods.register('postal_code', {
						required: 'Enter your postal code',
					})}
					name="postal_code"
					className="bg-[#FBFBFB] rounded pl-5 py-3 col-span-2 text-lg hover:bg-white border border-[#E6E6E6] hover:border-primary hover:shadow transition-all duration-500 ease-in-out w-full focus:border-primary focus-visible:outline-none placeholder-[#D6D6D6]"
					defaultValue={taxInfo?.postal_code}
					placeholder="Enter your postal code"
				/>
				{errors?.postal_code && (
					<p className="text-sm text-red-400">{errors?.postal_code.message}</p>
				)}
			</label>
			<div className="py-10  flex w-full gap-5">
				<Button
					value="Save"
					className="text-lg text-white bg-primary  px-12 py-3 rounded-lg"
					variant="outlined"
				/>
				<Button
					value="Cancel"
					className="text-lg text-[#787878] px-12 py-3 rounded-lg"
					variant="outlined"
				/>
			</div>
		</div>
	);
}
export default TaxResidenceFormOne;
