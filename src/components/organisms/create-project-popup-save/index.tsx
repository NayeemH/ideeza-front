import React, { useEffect, useState } from 'react';
import Modal from '@atoms/modal';
import Label from '@atoms/label';
import Button from '@atoms/button';
import { Controller, useForm } from 'react-hook-form';
import { ICreateProjectPopup } from '@models/user-dashboard';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import UiFormHelperText from '@atoms/ui-form-helper-text';
import { createProductFlow, createProjectFlow } from '@features/user/project/create/utils';
import Steppers from '@molecules/steppers';
import { AiOutlineEye, AiOutlineUser } from 'react-icons/ai';
import { Fade, FormControlLabel, FormHelperText } from '@mui/material';
import CheckboxAtom from '@atoms/checkbox';
import { capitalize, getTextExcerpt } from 'utils/utils';
import { IMAGE_PLACEHOLDER } from 'enums/common';
import OnHoverPlayVideo from '@molecules/on-hover-play';
import { Box } from '@mui/system';

function CreateProjectPopupSave(props: ICreateProjectPopup) {
	const {
		open,
		close,
		name,
		onChangeName,
		nameEdited,
		is_visible,
		onChangeNameEdited,
		editor_script,
		video,
		snapshot,
		file,
		electronic,
		cover,
		onCreateSuccess,
		onCreateFailed,
		gEditorRef,
		productCreateMode,
		// eEditorRef,
		// cEditorRef,
	} = props;

	const router = useRouter();
	const {
		handleSubmit,
		control,
		watch,
		register,
		setValue,
		getValues,
		setError,
		formState: { errors },
	} = useForm();

	const chainOptions = [
		{ value: 'ethereum', name: 'Ethereum' },
		{ value: 'polygon', name: 'Polygon' },
	];
	const collectionOptions = [
		{ value: '', name: 'None' },
		{ value: 'coll1', name: 'My Collection 1' },
		{ value: 'coll2', name: 'My Collection 2' },
	];

	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState<number>(0);
	const [chain, setChain] = useState<any>('polygon');
	const [collection, setCollection] = useState<any>(null);
	const [chainError, setChainError] = useState(false);
	const [collectionError, setCollectionError] = useState(false);
	const [initRender, setInitRender] = useState(true);
	const [video64, setVideo64] = useState<string>('');

	const project_id = router?.query?.project_id;
	const [mode, setMode] = useState<string>('');

	// console.log('Save video, snapshot---------', snapshot, video)

	const watchName = watch('name');

	// console.log('----------generalThreeDData', generalThreeDData)

	const handleCreateProject = async (data: any) => {
		if (data?.name.toString().length > 235) {
			toast.error('The project name you entered is too long!');
			return;
		}

		setLoading(true);

		const gEditorScene: any = { ...gEditorRef?.current };
		let gJson;
		if (gEditorScene?.scene) {
			gEditorScene.scene.children = [...gEditorScene.scene.children]; // to fix array bug
			gJson = { ...gEditorScene.scene.toJSON(), file };
		}

		const createData = {
			is_visible,
			name: data.name,
			description: data.description,
			three_d_script: gJson,
			video,
			image: snapshot,
			editor_script,
			electronicThreeDData: electronic,
			coverThreeDData: cover,
		};
		// console.log('createData-------', createData);
		await createProjectFlow(createData, false, createSuccessCallback, createFailedCallback);
	};

	const handleCreateProduct = async (data: any) => {
		setLoading(true);
		// Starts Creating 3D script file -------------
		const gEditorScene: any = { ...gEditorRef?.current };
		let threeDScript;
		if (gEditorScene?.scene) {
			gEditorScene.scene.children = [...gEditorScene.scene.children]; // to fix array bug
			threeDScript = { ...gEditorScene.scene.toJSON(), file };
		}
		// Ends Creating 3D script file -------------

		const createData: any = {
			project_id,
			is_visible,
			name: data.name,
			three_d_script: threeDScript,
			video,
			image: snapshot,
			editor_script,
			electronicThreeDData: electronic,
			coverThreeDData: cover,
		};
		// console.log('createData-------', createData)
		await createProductFlow(
			createData,
			false,
			async () => {
				toast.success(`${capitalize(mode)} created successfully!`);
				if (typeof onCreateSuccess === 'function') onCreateSuccess();
				setLoading(false);
				router.back();
				if (typeof close === 'function') close();
			},
			async (error?: any) => {
				toast.error(`Error while creating ${mode}!`);
				if (typeof onCreateFailed === 'function') onCreateFailed(error);
				setLoading(false);
			}
		);
	};

	const createSuccessCallback = async () => {
		toast.success(`${mode} created successfully!`);
		if (typeof onCreateSuccess === 'function') onCreateSuccess();
		await router.push('/user/dashboard/projects');
		setLoading(false);
		if (typeof close === 'function') close();
	};

	const createFailedCallback = async (error?: any) => {
		toast.error(`Error while creating ${mode}!`);
		if (typeof onCreateFailed === 'function') onCreateFailed(error);
		setLoading(false);
	};

	const onClickNext = () => {
		setError('name', {
			type: 'manual',
			message: !getValues('name')?.trim() ? `Enter ${mode} name` : '',
		});
		if (!chain) setChainError(true);
		if (!collection) setCollectionError(true);
		if (!getValues('name')?.trim() || !chain || !collection) return;
		setStep((prev) => prev + 1);
	};

	const getBase64Video = (file: any) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const videoUrl: any = reader?.result;
			setVideo64(videoUrl);
		};
		reader.onerror = () => {
			// console.log('Error: ', error);
			setVideo64('');
		};
		return;
	};

	useEffect(() => {
		if (video) {
			getBase64Video(video);
		}
		return () => {
			setVideo64('');
		};
	}, [video]);

	useEffect(() => {
		if (nameEdited) {
			setValue('name', name);
			if (onChangeNameEdited) {
				onChangeNameEdited(false);
			}
		}
		setInitRender(false);
	}, [nameEdited]);

	useEffect(() => {
		if (onChangeName) {
			onChangeName(watchName);
		}

		setError('name', {
			type: 'manual',
			message: !getValues('name')?.trim() ? `Enter ${mode} name` : '',
		});
	}, [watchName]);

	useEffect(() => {
		if (!initRender) {
			setChainError(!chain ? true : false);
		}
	}, [chain]);

	useEffect(() => {
		if (!initRender) {
			setCollectionError(!collection ? true : false);
		}
	}, [collection]);

	useEffect(() => {
		setMode(productCreateMode ? 'product' : 'project');
	}, [productCreateMode]);

	return (
		<div>
			<Modal
				width="sm"
				open={open}
				close={close}
				className={{ paper: 'rounded-lg md:px-8 p-4 py-0 md:py-4' }}
				// header={
				//   <div className="flex justify-end -mt-3 -mr-3 pb-2">
				//     <IoClose
				//       className="text-red-250 text-3xl cursor-pointer"
				//       // onClick={toggleOpen}
				//       onClick={close}
				//     />
				//   </div>
				// }
				header={
					<div className="flex justify-end mt-3 -mr-3 pb-2">
						<Steppers
							currentStep={step}
							className="md:w-1/2 mx-auto"
							options={['Step 1', 'Step 2']}
							icons={{
								1: (
									<span className="p-1 w-12 flex items-center justify-center h-12 rounded-full border-current">
										<AiOutlineUser />
									</span>
								),
								2: (
									<span className="p-1 w-12 flex items-center justify-center h-12 rounded-full border-current">
										<AiOutlineEye />
									</span>
								),
							}}
						/>
					</div>
				}
				content={
					<div className="w-full flex flex-col">
						<div className="pt-2 px-4">
							{step === 0 && (
								<>
									<div className="relative mb-4">
										<Label
											value={`${capitalize(mode)} Name`}
											className="text-[#333333] font-medium text-base 2xl:text-xl font-sans tracking-tight w-2/4 mb-2"
										/>
										<input
											{...register('name', {
												required: `Enter ${capitalize(mode)} name`,
											})}
											className={`w-full h-14 rounded-lg px-4 outline-none text-base 2xl:text-xl txt-c-color tracking-tight font-sans border border-solid ${
												errors?.name?.message
													? ' border-red-300'
													: 'border-[#CCCCCC]'
											}`}
											placeholder={`${capitalize(mode)} Name`}
										/>
										{errors?.name?.message && (
											<UiFormHelperText message={errors?.name?.message} />
										)}
									</div>
									<div className="relative mb-4">
										<Label
											value={`${capitalize(mode)} Description`}
											className="text-[#333333] font-medium text-base 2xl:text-xl font-sans tracking-tight w-2/4 mb-2 mt-5"
										/>

										<textarea
											{...register('description')}
											placeholder="Type here..."
											//   maxLength={255}
											className={`${
												errors?.description?.message
													? 'border-red-300'
													: 'border-[#CCCCCC]'
											} border outline-none rounded-lg bg-white w-full pl-4 pt-2 text-base resize-none 2xl:text-xl`}
											rows={4}
										/>
										{
											// errors?.description?.message &&
											<UiFormHelperText
												message={errors?.description?.message}
											/>
										}
									</div>
									<div className="relative mb-4">
										<Label
											value="Blockchain Mint"
											className="text-[#333333] font-medium text-base 2xl:text-xl font-sans tracking-tight w-2/4 mb-2"
										/>
										<select
											// {...register('blockchain', {
											//   required: `Enter ${mode} name`,
											// })}
											value={chain}
											onChange={(e: any) => setChain(e.target.value)}
											className="h-14 w-full p-4 py-3 outline-0 font-sans tracking-wider text-lg cursor-pointer bg-white border border-solid rounded-lg"
										>
											{chainOptions.map((item: any, index: number) => (
												<option
													className="text-gray-600"
													key={index}
													value={item.value}
												>
													{item.name}
												</option>
											))}
										</select>
										{chainError && (
											<UiFormHelperText
												message={chainError ? 'Select a blockchain' : ''}
											/>
										)}
									</div>

									<div className="relative mb-4">
										<Label
											value="Collection"
											className="text-[#333333] font-medium text-base 2xl:text-xl font-sans tracking-tight w-2/4 mb-2"
										/>
										<select
											// {...register('blockchain', {
											//   required: `Enter ${mode} name`,
											// })}
											value={collection}
											onChange={(e: any) => setCollection(e.target.value)}
											className="h-14 w-full p-4 py-3 outline-0 font-sans tracking-wider text-lg cursor-pointer bg-white border border-solid rounded-lg"
										>
											{collectionOptions.map((item: any, index: number) => (
												<option
													className="text-gray-600"
													key={index}
													value={item.value}
												>
													{item.name}
												</option>
											))}
										</select>
										{collectionError && (
											<UiFormHelperText
												message={
													collectionError ? 'Select your collection' : ''
												}
											/>
										)}
									</div>
								</>
							)}

							{step === 1 && (
								<>
									<div className="text-center text-lg font-medium my-5 pb-5 border-b-2 border-gray-100">
										{`${capitalize(mode)} Preview`}
									</div>
									<div className="mb-6 text-lg font-medium">
										{getValues('name')}
									</div>
									<div className="mb-6">
										{getTextExcerpt(getValues('description'), 350)}
									</div>
									<div className="mb-6">
										<Box
											sx={{
												'& video': {
													width: `100% !important`,
													height: `auto !important`,
												},
											}}
										>
											<OnHoverPlayVideo
												poster={snapshot || IMAGE_PLACEHOLDER}
												src={video64} // TODO: Remove comment after testing //src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
												hideScaleView={true}
											/>
										</Box>
									</div>
									{errors?.agree_confirm?.message && (
										<div className="mt-3">
											<Fade
												in={
													(errors?.agree_confirm?.message && true) ||
													false
												}
											>
												<FormHelperText
													className={
														'text-base italic eina-font-r03 mt-1 text-red-500'
													}
												>
													*{errors?.agree_confirm?.message}
												</FormHelperText>
											</Fade>
										</div>
									)}
									<div className="mb-6">
										<Controller
											name="agree_confirm"
											control={control}
											rules={{
												required: 'Please confirm by clicking checkbox',
											}}
											render={({ field }) => (
												<FormControlLabel
													className="items-start mt-2"
													control={<CheckboxAtom {...field} />}
													label={
														<div className="text-[#999999] mt-2 text-sm">
															I confirm that I'm the rightful owner of
															this virtually or physically and any
															part of it. I know I have all
															responsibility in all legal and/or
															intellectual property issues that will
															occur because my product.
														</div>
													}
												/>
											)}
										/>
									</div>
								</>
							)}
						</div>
					</div>
				}
				actions={
					<div className="grid grid-cols-2 md:flex space-x-2 w-full px-2">
						{step === 0 && (
							<Button
								value="Next"
								onClick={onClickNext}
								className="text-white h-14 bg-primary bg-ideeza-100 p-2 tracking-tight font-sans capitalize w-full"
								color="primary"
							/>
						)}
						{step === 1 && (
							<>
								<Button
									value="Back"
									onClick={() => {
										setStep((prev) => prev - 1);
									}}
									classes={{
										root: `h-14 border border-solid border-gray-550 text-gray-550 p-2 capitalize font-normal md:w-1/2 mr-5`,
									}}
								/>
								<Button
									value="Save"
									loading={loading}
									disabled={loading}
									type="submit"
									onClick={handleSubmit(
										!productCreateMode
											? handleCreateProject
											: handleCreateProduct
									)}
									className="h-14 text-white bg-primary bg-ideeza-100 p-2 tracking-tight font-sans capitalize md:w-1/2"
									color="primary"
								/>
							</>
						)}
					</div>
				}
			/>
		</div>
	);
}

export default React.memo(CreateProjectPopupSave);
