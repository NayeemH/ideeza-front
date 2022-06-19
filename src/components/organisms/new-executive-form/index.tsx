import Label from '@atoms/label';
import { NewExecutive } from '@models/auth';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import Button from '@atoms/button';

function NewExecutiveForm({
	methods,
	addNewExecutiveData,
	loading,
}: {
	methods: UseFormReturn<any, object>;
	addNewExecutiveData: NewExecutive | undefined;
	loading: any;
}) {
	const {
		formState: { errors },
	} = methods;
	return (
		// <div className={`pt-2`}>
		<div>
			<input
				{...methods.register('email', { required: 'Email Address' })}
				type="email"
				defaultValue={addNewExecutiveData?.email}
				placeholder="Email Address"
				className="bg-[#FBFBFB] rounded mr-8 pl-5 py-3 mt-3 text-lg hover:bg-white border border-[#E6E6E6] hover:border-primary hover:shadow transition-all duration-500 ease-in-out w-full focus:border-primary focus-visible:outline-none placeholder-[#D6D6D6]"
			/>
			{errors?.email && <p className="text-sm text-red-400">{errors?.email.message}</p>}
			<input
				{...methods.register('firstname', { required: 'First Name' })}
				defaultValue={addNewExecutiveData?.firstname}
				placeholder="First Name"
				className="bg-[#FBFBFB] rounded mr-8 pl-5 py-3 mt-3 text-lg hover:bg-white border border-[#E6E6E6] hover:border-primary hover:shadow transition-all duration-500 ease-in-out w-full focus:border-primary focus-visible:outline-none placeholder-[#D6D6D6]"
			/>
			{errors?.firstname && (
				<p className="text-sm text-red-400">{errors?.firstname.message}</p>
			)}
			<input
				{...methods.register('lastname', { required: 'Last Name' })}
				defaultValue={addNewExecutiveData?.lastname}
				placeholder="Last Name"
				className="bg-[#FBFBFB] rounded mr-8 pl-5 py-3 mt-3 text-lg hover:bg-white border border-[#E6E6E6] hover:border-primary hover:shadow transition-all duration-500 ease-in-out w-full focus:border-primary focus-visible:outline-none placeholder-[#D6D6D6]"
			/>
			{errors?.lastname && <p className="text-sm text-red-400">{errors?.lastname.message}</p>}
			<input
				{...methods.register('password', { required: 'Choose a password' })}
				defaultValue={addNewExecutiveData?.password}
				type="password"
				placeholder="Choose a password"
				className="bg-[#FBFBFB] rounded mr-8 pl-5 py-3 mt-3 text-lg hover:bg-white border border-[#E6E6E6] hover:border-primary hover:shadow transition-all duration-500 ease-in-out w-full focus:border-primary focus-visible:outline-none placeholder-[#D6D6D6]"
			/>
			{errors?.password && <p className="text-sm text-red-400">{errors?.password.message}</p>}
			<div className="mt-[20px] items-center">
				<Label
					value="Other people won't see your birthday."
					classes={{
						root: `text-base 2xl:text-xl text-[#333333]  font-semibold mt-[20px]`,
					}}
				/>
				<label className="flex items-center">
					<input
						{...methods.register('month', { required: 'Month' })}
						defaultValue={addNewExecutiveData?.birthdate.month}
						type="number"
						min={1}
						max={12}
						placeholder="Month"
						className="bg-[#FBFBFB] rounded mr-3 pl-5 py-3 mt-3 text-lg hover:bg-white border border-[#E6E6E6] hover:border-primary hover:shadow transition-all duration-500 ease-in-out w-full focus:border-primary focus-visible:outline-none placeholder-[#D6D6D6]"
					/>
					{errors?.month && (
						<p className="text-sm text-red-400">{errors?.month.message}</p>
					)}
					<input
						{...methods.register('day', { required: 'Day' })}
						defaultValue={addNewExecutiveData?.birthdate.day}
						type="number"
						min={1}
						max={31}
						placeholder="Day"
						className="bg-[#FBFBFB] rounded mr-3 pl-5 py-3 mt-3 text-lg hover:bg-white border border-[#E6E6E6] hover:border-primary hover:shadow transition-all duration-500 ease-in-out w-full focus:border-primary focus-visible:outline-none placeholder-[#D6D6D6]"
					/>
					{errors?.day && <p className="text-sm text-red-400">{errors?.day.message}</p>}
					<input
						{...methods.register('year', { required: 'Year' })}
						defaultValue={addNewExecutiveData?.birthdate.year}
						placeholder="Year"
						type="number"
						min={1}
						max={new Date().getFullYear()}
						className="bg-[#FBFBFB] rounded pl-5 py-3 mt-3 text-lg hover:bg-white border border-[#E6E6E6] hover:border-primary hover:shadow transition-all duration-500 ease-in-out w-full focus:border-primary focus-visible:outline-none placeholder-[#D6D6D6]"
					/>
					{errors?.year && <p className="text-sm text-red-400">{errors?.year.message}</p>}
				</label>
				<select
					className="border rounded border-solid border-[#E6E6E6] mt-3 bg-[#FBFBFB] py-3 w-full"
					{...methods.register('permissionType', { required: 'Permission Type' })}
				>
					<option
						value=""
						disabled
						selected
					>
						Permission Type
					</option>
					<option
						key="0"
						value="CTO"
						selected={'CTO' === addNewExecutiveData?.permissionType}
					>
						CTO
					</option>
					<option
						key="1"
						value="CMO"
						selected={'CMO' === addNewExecutiveData?.permissionType}
					>
						CMO
					</option>
					<option
						key="2"
						value="CFO"
						selected={'CFO' === addNewExecutiveData?.permissionType}
					>
						CFO
					</option>
					<option
						key="3"
						value="CSO"
						selected={'CSO' === addNewExecutiveData?.permissionType}
					>
						CSO
					</option>
				</select>
				{errors?.permissionType && (
					<p className="text-sm text-red-400">{errors?.permissionType.message}</p>
				)}
			</div>
			<div className="py-5 flex w-full gap-5 items-center">
				<Button
					type="submit"
					value="Sign Up"
					loading={loading}
					disabled={loading}
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
export default NewExecutiveForm;
