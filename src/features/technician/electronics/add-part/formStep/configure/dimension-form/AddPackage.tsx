import Button from '@atoms/button';
import { setNewPackageFamily } from '@layouts/private/sidebar/reducer';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { createICPackage } from 'request/electronics';

type IProperties = {
	name: string;
	value: number;
};
interface IFormData {
	properties: IProperties[];
	is_visible: boolean;
	name: string;
	pin: string;
	family: number;
}

export default function AddPackage({
	back,
	setPoint,
	deletePoint,
	choose3d,
	updatePoint,
}: {
	back: () => void;
	setPoint: (id: number) => void;
	deletePoint: (id: number) => void;
	choose3d: ({ id, name }: { id: number; name: string }) => void;
	updatePoint: ({ id, name, value }: { id: number; name?: string; value?: string }) => void;
}) {
	const { getValues } = useFormContext();
	const formData = getValues();
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();
	const selectedFamilyId = useAppSelector((state) => state.sidebar.package.newPackageFamily);

	const {
		register,
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<IFormData, object>({
		defaultValues: {
			name: '',
			properties: [
				{
					name: '',
					value: 0,
				},
			],
		},
	});

	const { mutate, isLoading } = useMutation(createICPackage, {
		onSuccess: () => {
			reset();
			queryClient.invalidateQueries([`ic-package`]);
			toast.success('Package created successfully');
			dispatch(setNewPackageFamily(null));
			back();
		},
		onError: (err: any) => {
			console.error(err);
			toast.error('Faild to create Package');
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'properties',
	});
	const submit = (data: IFormData) => {
		const properties = () => {
			const arr = [];
			for (let i = 0; i < data.properties.length; i++) {
				arr.push({
					...data.properties[i],
					x1: 0,
					x2: 0,
					y1: 0,
					y2: 0,
				});
			}
			return arr;
		};

		const reqBody = {
			name: data.name,
			properties: properties(),
			family: selectedFamilyId, //formData.family_id,
		};
		mutate(reqBody);
	};

	const formPropertiesData = watch();
	return (
		<form
			className="pr-4"
			onSubmit={handleSubmit(submit)}
		>
			<div className="bg-white rounded shadow-full p-5">
				<div className="flex items-center mb-4 pb-4 relative">
					<label className="text-[#666666] text-base 2xl:text-xl whitespace-nowrap mr-[20px] w-[40%]">
						Package Name
					</label>
					<input
						{...register('name', {
							required: 'Enter package name',
						})}
						type="text"
						placeholder="Enter package name"
						className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova "
					/>
					<div className="absolute bottom-[-5px] left-[155px] ">
						{errors?.name && (
							<p className="text-sm text-red-400">{errors?.name.message}</p>
						)}
					</div>
				</div>
				<div className="border rounded-[10px] p-[20px] pt-[40px] relative">
					<div className="max-h-60 overflow-y-auto px-6 -mx-6">
						{fields.map((field, index) => (
							<div
								className="flex flex-col gap-[20px] mb-[20px] pb-[20px] border-b group"
								key={field.id}
							>
								{fields.length > 1 && (
									<div className="flex justify-end">
										<button
											onClick={() => {
												deletePoint(index);
												remove(index);
											}}
											className="bg-red-500 opacity-80 text-white px-1 py-1"
										>
											<IoClose />
										</button>
									</div>
								)}
								<div className="">
									<div className="flex items-center ">
										<label className="text-[#666666] text-base 2xl:text-xl whitespace-nowrap mr-[20px] w-[40%]">
											Property Name
										</label>
										<input
											{...register(`properties.${index}.name`, {
												required: 'Enter package name',
											})}
											type="text"
											placeholder="Name"
											className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
											onFocus={() => {
												setPoint(index);
											}}
											onChange={(e) =>
												updatePoint({ id: index, name: e.target.value })
											}
										/>
									</div>
								</div>
								<div className="flex items-center ">
									<label className="text-[#666666] text-base 2xl:text-xl whitespace-nowrap mr-[20px] w-[40%]">
										Default number
									</label>
									<input
										{...register(`properties.${index}.value`, {
											required: 'Enter property value',
										})}
										type="text"
										placeholder="Value"
										className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
										onChange={(e) =>
											updatePoint({
												id: index,
												name: formPropertiesData.properties[index].name,
												value: e.target.value,
											})
										}
									/>
								</div>
								<div className="flex justify-end">
									<Button
										variant="contained"
										color="primary"
										value="Choose 3D"
										className="min-h-0 py-[10px] px-[30px]"
										onClick={() =>
											choose3d({
												id: index,
												name: formPropertiesData.properties[index].name,
											})
										}
									/>
								</div>
							</div>
						))}
					</div>
					<button
						className="px-4 py-2 text-primary"
						onClick={() =>
							append({
								name: '',
								value: 0,
							})
						}
					>
						+ Add New Property
					</button>
				</div>
			</div>

			<div
				className="w-full flex gap-6 justify-center items-center pt-4 "
				style={{ marginTop: 150 }}
			>
				<div>
					<Button
						value="Back"
						type="button"
						onClick={back}
						classes={{ root: 'shadow-none' }}
						variant="contained"
						color="inherit"
						className="bg-white border-opacity-50 border border-solid border-[#E6E6E6] w-40 transform-none text-gray-600 text-base 2xl:text-[18px] font-proxima-nova min-h-0 py-[12px]"
					/>
				</div>
				<div>
					<Button
						value="Save"
						type="submit"
						classes={{ root: 'shadow-none' }}
						variant="contained"
						color="primary"
						className="bg-primary w-40 min-h-0 py-[10px] transform-none text-white text-base font-proxima-nova rounded-[6px] h-12"
						loading={isLoading}
						disabled={isLoading}
					/>
				</div>
			</div>
		</form>
	);
}
