import React, { useEffect, useRef, useState } from 'react';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import Button from '@atoms/button';
import { useMutation } from 'react-query';
import { createCoverPart } from '../request';
import { toast } from 'react-toastify';
import ThreeJs from '@organisms/threejs';
import CategoryMultipleSelector from '@organisms/category-selector/CategoryMultipleSelector';
import { renderAnimation } from '@organisms/threejs/layout/functions/GlobalFunctions';
import Modal from '@atoms/modal';
import Label from '@atoms/label';
import { IoClose } from 'react-icons/io5';

const AddPartForm: React.FC<any> = ({ editorRef, methods, setStep }) => {
	const {
		register,
		setValue,
		// control,
		handleSubmit,
		formState: { errors },
	} = methods;
	const [categoryId, setCategoryId] = useState('');
	const tempEditorRef = useRef<null>(null);
	const [tempEditorLoaded, setTempEditorLoaded] = useState(false);
	const [video, setVideo] = useState('');
	const [file, setFile] = useState('');
	const [snapshot, setSnapshot] = useState('');
	const [openAgreeModal, setOpenAgreeModal] = useState(false);

	useEffect(() => {
		if (tempEditorRef?.current && tempEditorLoaded)
			renderAnimation(
				tempEditorRef?.current,
				editorRef?.current?.scene,
				setVideo,
				setSnapshot,
				setFile
			);
	}, [tempEditorLoaded, tempEditorRef, editorRef]);

	const { mutate, isLoading } = useMutation(createCoverPart, {
		onSuccess: (result: any) => {
			if (result?.is_error) {
				toast.error('Failed to create the part!');
				return;
			}

			if (editorRef?.current) editorRef?.current?.clear();
			setVideo('');
			setSnapshot('');
			toast.success('Cover Part Added successfully');
			setStep(2);
		},
		onError: (err: any) => {
			console.error(err);
			toast.error(err.response.data.message);
		},
	});

	const submit = (data: IFormData) => {
		if (!snapshot || snapshot === '' || !file || file === '' || !video || file === '') {
			toast.error('Please check your design!');
			return;
		}

		if (!data?.name || data?.name.trim() === '') {
			toast.error('Please enter name!');
			return;
		}

		if (!categoryId || Number(categoryId) === 0) {
			toast.error('Please select a category!');
			return;
		}

		const reqBody: any = new FormData();
		reqBody.append('name', data?.name ?? '');
		reqBody.append('image_svg', snapshot);
		reqBody.append('three_d_file', file);
		reqBody.append('simulation_video', video);
		reqBody.append('category', categoryId);

		if (data.category) {
			reqBody.append('category', data.category);
		}
		if (data.description) {
			reqBody.append('description', data.description);
		}
		/*if (data.visible) {
	  reqBody.append('is_visible', data.visible === 'public');
	}*/

		reqBody.append('is_visible', true);

		mutate(reqBody);
		setOpenAgreeModal(false);
	};

	return (
		<div className="w-full">
			<Modal
				open={openAgreeModal}
				width="md"
				className={{ paper: ' rounded-[10px] p-[45px] 2xl:w-[800px]' }}
				header={
					<div
						className="w-full flex justify-end"
						onClick={() => setOpenAgreeModal(false)}
					>
						<IoClose className="text-primary text-2xl cursor-pointer relative -top-5 -right-5" />
					</div>
				}
				content={
					<>
						<Label
							value="I hereby warrant and confirm that all materials are original and I am the rightful owner of this product"
							className="text-xl text-zinc-500"
						/>
						<Label
							value="I hereby warrant and confirm that in any case of confidential or IP issues, I have all responsibility for my work"
							className="text-xl text-zinc-500"
						/>
						<div className="w-full flex justify-start mt-[25px]">
							<button
								type="submit"
								form="hook-form"
								className="bg-primary text-white font-semibold rounded-lg py-2 px-3"
							>
								Agree
							</button>
						</div>
					</>
				}
				close={() => setOpenAgreeModal(false)}
			/>
			<form
				id="hook-form"
				onSubmit={handleSubmit(submit)}
			>
				<div className="w-full mb-6 bg-white px-[30px] py-[20px] rounded-[10px]">
					<div className="mb-4">
						<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap font-bold mb-2">
							Name
						</label>
						<input
							{...register('name', { required: 'Enter name' })}
							type="text"
							placeholder="Component Name"
							maxLength={255}
							className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
						/>
						{errors?.name && (
							<p className="text-red-400 text-xs">{errors.name.message}</p>
						)}
					</div>

					<div className="flex gap-8 items-center mb-4">
						<div className="flex-1">
							<div className="mb-2">
								<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap font-bold ">
									Category
								</label>
							</div>

							{/*<CategorySelector control={control} />*/}

							<CategoryMultipleSelector
								categoryType={'COVER'}
								onSelect={(id) => setCategoryId(id)}
							/>
						</div>
						<div>
							<label className="text-gray-600 tracking-tight text-base 2xl:text-xl font-sans font-bold mr-3">
								Type
							</label>
							<CustomDropDownMenu
								// className={classessort}
								selectOptions={[
									{
										name: 'Public',
										value: 'public',
									},
									{
										name: 'Private',
										value: 'private',
									},
								]}
								inputClasses="h-12 rounded-sm w-48 pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
								labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 pt-[12px] text-sm font-medium focus:outline-none text-gray-700"
								labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
								labelWrapperClass="flex cursor-pointer md:relative"
								dropDownClasses="origin-top-right z-20 mt-0 w-48 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
								placeholder="Select Type"
								change={(e) => setValue('visible', e)}
							/>
						</div>
					</div>
					<div className="mb-6">
						<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap font-bold mb-2 ">
							Description
						</label>
						<textarea
							{...register('description', { require: 'Enter description' })}
							placeholder="Type the description here..."
							maxLength={255}
							className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
							rows={10}
						/>
					</div>
				</div>
				<div className="w-full flex items-center justify-between mt-4 ">
					<Button
						onClick={() => setStep(0)}
						value="Back"
						classes={{ root: 'shadow-none' }}
						variant="contained"
						size="large"
						color="primary"
						className="bg-[#FBFBFB] border-opacity-50 border border-solid border-[#E6E6E6] w-40 transform-none text-gray-600 text-base 2xl:text-xl font-proxima-nova min-h-0 py-[12px]"
					/>
					<Button
						// type="submit"
						onClick={() => setOpenAgreeModal(true)}
						value="Finish"
						classes={{ root: 'shadow-none' }}
						variant="contained"
						size="large"
						color="primary"
						loading={isLoading}
						className="bg-primary w-40 transform-none text-white text-base 2xl:text-[18px] font-proxima-nova py-[12px] min-h-0"
					/>
				</div>
			</form>
			<div
				style={{
					width: '640px',
					height: '360px',
					position: 'absolute',
					// top: 0,
					// left: 0,
					top: '-110%',
					left: '-150%',
					pointerEvents: 'none',
				}}
				className="fixed-canvas"
			>
				<ThreeJs
					{...{
						editorFile: 9999,
						editorRef: tempEditorRef,
						setEditorLoaded: setTempEditorLoaded,
					}}
				/>
			</div>
		</div>
	);
};

export default AddPartForm;

export interface IFormData {
	is_visible?: boolean;
	name?: string;
	description?: string;
	editor_script?: string;
	image_svg?: string;
	three_d_script?: any;
	component?: number;
	visible?: string;
	simulation_video?: any;
	category?: any;
}
