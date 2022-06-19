import Label from '@atoms/label';
//import CategorySelector from "@organisms/category-selector";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOutsideClickHandler } from 'utils/utils';
import CategoryMultipleSelector from '@organisms/category-selector/CategoryMultipleSelector';

const AddDetailPart: React.FC<any> = (props) => {
	const [toggle, setToggle] = useState(false);
	//const [selectedImage, setSelectedImage] = useState(1);
	const {
		register,
		// control,
		// getValues,
		setValue,
		formState: { errors },
	} = useForm<any>({
		defaultValues: { autocomplete: [], select: [] },
	});

	const { state } = props;

	useEffect(() => {
		if (state) {
			setValue('name', state?.sheet?.name);
			setValue('description', state?.sheet?.snippet);
		}
	}, [state, setValue]);
	const ref = React.useRef(null);
	useOutsideClickHandler(ref, () => setToggle(!toggle));
	return (
		<div className="mt-3">
			<div className="flex items-center w-full mb-[20px]">
				<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%] ">
					Type
				</label>
				<select
					{...register('type')}
					onChange={props.onSelectType}
					className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova form-select"
				>
					<option value="">Select Type</option>
					<option value="true">Public</option>
					<option value="false">Private</option>
				</select>
			</div>
			{/*  */}
			<div className="flex items-center w-full mb-[20px] mt-2">
				<Label
					value={'Category'}
					className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%] "
				/>
				<div className="w-full">
					{/*<CategorySelector control={control} />*/}
					<CategoryMultipleSelector
						categoryType={'ELECTRONIC'}
						onSelect={(id) => props.onSelectCategory(id)}
					/>
					{errors?.category && (
						<p className="text-red-400 text-xs">{errors.category.message}</p>
					)}
				</div>
			</div>
			{/*  */}

			<div className="flex items-center w-full mb-[20px]">
				<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
					Name
				</label>
				<input
					value={props.name}
					onChange={(e: any) => props.onChangeName(e.target.value)}
					placeholder="Type the name here"
					className=" pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
				/>
			</div>

			<div className="flex items-center w-full mb-[20px]">
				<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
					Description
				</label>

				<textarea
					value={props.description}
					onChange={(e: any) => props.onChangeDescription(e.target.value)}
					className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
					id=""
					rows={4}
					placeholder="Type the description here"
				/>
			</div>
		</div>
	);
};
AddDetailPart.defaultProps = {
	mainClass: 'bg-white rounded shadow p-4 space-y-2',
	nameClass: 'text-gray-600',
	nameInputClass:
		'w-full p-0 h-8 text-sm tracking-tight rounded-none font-sans border border-solid border-gray-725 text-black-300',
	selectClass: 'w-full py-0.5 text-sm tracking-tight rounded-none font-sans',
};
export default AddDetailPart;
