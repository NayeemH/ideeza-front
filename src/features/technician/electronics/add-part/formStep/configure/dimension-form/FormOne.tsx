import Button from '@atoms/button';
import { setNewPackageFamily } from '@layouts/private/sidebar/reducer';
import { ICFamily, ICPackage } from '@models/electronics';
import { CustomPopover } from '@molecules/custom-popover';
import { useAppDispatch } from 'app/hooks';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getICFamily, getICPackage } from 'request/electronics';
import { isDataInArray } from 'utils/utils';
import { Box } from '@mui/material';

export default function FormOne({ next, addPkg }: { next: () => void; addPkg: () => void }) {
	const dispatch = useAppDispatch();
	const [selectedPkg, setSelectedPkg] = useState<ICPackage>({});
	const {
		control,
		register,
		setValue,
		handleSubmit,
		getValues,
		clearErrors,
		// setError,
		formState: { errors },
	} = useFormContext();

	const { editData, formOneDataPlaced } = getValues();

	const { data, isSuccess, isLoading } = useQuery([`ic-family`], () => getICFamily(''), {
		keepPreviousData: false,
		staleTime: Infinity,
	});
	const icPackageData = useQuery([`ic-package`], () => getICPackage(''), {
		keepPreviousData: false,
		staleTime: Infinity,
	});

	const icFamily: ICFamily[] = isSuccess ? data?.data.results : [];
	const icPackage: ICPackage[] = icPackageData.isSuccess ? icPackageData.data?.data.results : [];

	const formSubmit = () => {
		next();
	};

	const handlePackage = (item: ICPackage) => {
		setValue('package_id', item.id);
		setValue('package_name', item.name);
		setSelectedPkg(item);
	};
	const { package_name } = getValues();

	const handleAddpkg = () => {
		// const hasPkgType = getValues("package_type");
		// if (hasPkgType) {
		//   clearErrors("package_type");
		//   dispatch(setNewPackageFamily(getValues("package_type")));
		//   addPkg();
		// }

		dispatch(setNewPackageFamily(getValues('package_type')));
		addPkg();

		// else {
		//   setError("package_type", {
		//     type: "manual",
		//     message: "Select package type",
		//   });
		// }
	};

	const [showTotalsPinValidationError, setShowTotalsPinValidationError] =
		useState<boolean>(false);
	const validateNoOfPins = () => {
		const { pin1_location, total_pins } = getValues();

		return Number(total_pins) % Number(pin1_location) === 0;
	};

	useEffect(() => {
		if (editData && editData?.id && !formOneDataPlaced) {
			setValue('package_type', editData?.package?.family?.id);
			setValue('body_type', editData?.qfn_dimensions?.body_type);
			setValue('package_name', editData?.package?.name);
			setValue('pin1_location', editData?.qfn_dimensions?.pin1_location);
			setValue('total_pins', editData?.qfn_dimensions?.total_pins);
			setValue('name', editData?.name);
			setValue('formOneDataPlaced', true);
		}
	}, [editData]);

	return (
		<div className="bg-white">
			<form onSubmit={handleSubmit(formSubmit)}>
				<div className="flex items-center w-full mb-[20px] ">
					<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
						Package Type
					</label>
					<div className="w-full">
						{isLoading ? (
							'Loading...'
						) : (
							<select
								className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova form-select"
								{...register('package_type', {
									required: 'Select package type',
								})}
							>
								<option value="">Select Package Type</option>
								{isDataInArray(icFamily) &&
									icFamily.map((item) => (
										<option
											key={item.id}
											value={item.id}
											onClick={() => setValue('family_id', item.id)}
										>
											{item.name}
										</option>
									))}
							</select>
						)}

						{errors?.package_type && (
							<p className="text-sm text-red-400">{errors?.package_type.message}</p>
						)}
					</div>
				</div>
				<div className="flex items-center w-full mb-[20px]">
					<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
						Body Type
					</label>
					<div className="w-full">
						<select
							className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova form-select"
							{...register('body_type', {
								required: 'Select package type',
							})}
							disabled={getValues().package_type === ''}
							defaultValue=""
							// disabled
						>
							<option value="">Select</option>
							{[
								{
									name: 'Rectangular',
									value: 'rectangle',
								},
								// {
								//   name: "Circular",
								//   value: "circular",
								// },
							].map((item) => (
								<option
									key={item.value}
									value={item.value}
								>
									{item.name}
								</option>
							))}
						</select>
						{errors?.body_type && (
							<p className="text-sm text-red-400">{errors?.body_type.message}</p>
						)}
					</div>
				</div>
				<div className="flex items-center w-full mb-[20px]">
					<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
						Package name
					</label>
					<Box className="w-full">
						<CustomPopover
							renderRef={(toggle) => (
								<div
									className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova form-select cursor-pointer focus:border-primary"
									style={{
										pointerEvents:
											getValues().body_type === '' ? 'none' : 'auto',
										color:
											getValues().body_type === ''
												? 'rgb(143 143 143)'
												: '#000000',
									}}
									onClick={() => {
										toggle();
									}}
								>
									<Controller
										name="package_id"
										defaultValue=""
										control={control}
										rules={{ required: 'Select package' }}
										render={({ field }) => {
											return (
												<input
													placeholder="Select package"
													hidden
													{...field}
												/>
											);
										}}
									/>
									{selectedPkg.name || package_name || 'Select package'}
								</div>
							)}
							renderBody={(toggle) => (
								<div className="bg-white shadow-md">
									<ul className="max-h-60 overflow-y-auto">
										{icPackage &&
											icPackage.map((item) => (
												<li
													key={item.id}
													value={item.id}
													className="px-4 py-2 cursor-pointer hover:bg-gray-100"
													onClick={() => {
														handlePackage(item);
														clearErrors('package_id');
														toggle();
													}}
												>
													{item.name}
												</li>
											))}
									</ul>
									<span
										className="px-4 py-2 block text-primary cursor-pointer hover:bg-pink-50"
										onClick={() => handleAddpkg()}
									>
										Make new package
									</span>
								</div>
							)}
						/>
						{errors?.package_name && (
							<p className="text-sm text-red-400">{errors?.package_name.message}</p>
						)}
					</Box>
				</div>
				<div className="flex items-center w-full mb-[20px]">
					<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
						Name
					</label>
					<div className="w-full">
						<input
							disabled={
								getValues().package_type === '' ||
								getValues().body_type === '' ||
								getValues().package_id === ''
							}
							{...register('name', {
								required: 'Enter your package name',
							})}
							type="text"
							placeholder="Part Name"
							className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
						/>
						{errors?.name && (
							<p className="text-sm text-red-400">{errors?.name.message}</p>
						)}
					</div>
				</div>
				<div className="flex items-center w-full mb-[20px]">
					<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
						Pin 1 location
					</label>
					<div className="w-full">
						<select
							disabled={
								getValues().package_type === '' ||
								getValues().body_type === '' ||
								getValues().package_id === ''
							}
							className=" pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova form-select "
							{...register('pin1_location', {
								required: 'Enter total pins',
							})}
							defaultValue=""
						>
							<option value="">Select</option>
							{[
								{
									name: '2',
									value: 2,
								},
								{
									name: '4',
									value: 4,
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
						{errors?.pin1_location && (
							<p className="text-sm text-red-400">{errors?.pin1_location.message}</p>
						)}
					</div>
				</div>

				<div className="flex items-center w-full mb-[20px]">
					<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
						No of Pins
					</label>
					<div className="w-full">
						<input
							disabled={
								getValues().package_type === '' ||
								getValues().body_type === '' ||
								getValues().package_id === ''
							}
							{...register('total_pins', {
								required: 'Enter total pins',
								onChange() {
									setShowTotalsPinValidationError(true);
								},
							})}
							type="number"
							placeholder="No of Pins"
							className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova "
						/>
						{!errors?.total_pins &&
							showTotalsPinValidationError &&
							!validateNoOfPins() && (
								<p className="text-sm text-red-400">Enter a valid pin</p>
							)}
						{errors?.total_pins && (
							<p className="text-sm text-red-400">{errors?.total_pins.message}</p>
						)}
					</div>
				</div>

				<div className="flex justify-center p-6 pb-0">
					<Button
						value="Next Step"
						type={showTotalsPinValidationError ? 'submit' : 'button'}
						classes={{ root: 'shadow-none' }}
						variant="contained"
						color="primary"
						className="bg-primary w-40 transform-none text-white text-base 2xl:text-[18px] font-proxima-nova py-[12px] min-h-0"
						disabled={
							(showTotalsPinValidationError && !validateNoOfPins()) ||
							getValues().package_type === '' ||
							getValues().body_type === '' ||
							getValues().package_id === ''
						}
						onClick={() => setShowTotalsPinValidationError(true)}
					/>
				</div>
			</form>
		</div>
	);
}
