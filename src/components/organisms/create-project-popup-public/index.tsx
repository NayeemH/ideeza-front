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
import { Fade, FormControlLabel, FormHelperText } from '@mui/material';
import CheckboxAtom from '@atoms/checkbox';
import { capitalize, getTextExcerpt } from 'utils/utils';
import { Box } from '@mui/system';
import OnHoverPlayVideo from '@molecules/on-hover-play';
import { IMAGE_PLACEHOLDER } from 'enums/common';
//import { AiOutlineEye, AiOutlineUser } from "react-icons/ai";
import { IoClose } from 'react-icons/io5';
// import { GiCycle } from "react-icons/gi";
import { IOSSwitch } from '@organisms/create-project-popup-sell';

function CreateProjectPopupPublic(props: ICreateProjectPopup) {
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
		getValues,
		watch,
		register,
		setError,
		clearErrors,
		setValue,
		formState: { errors },
	} = useForm();

	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState<number>(0);
	const [video64, setVideo64] = useState<string>('');
	const [mode, setMode] = useState<string>('');

	const project_id = router?.query?.project_id;

	const watchName = watch('name');

	useEffect(() => {
		if (nameEdited) {
			setValue('name', name);
			if (onChangeNameEdited) {
				onChangeNameEdited(false);
			}
		}
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
		if (video) getBase64Video(video);
	}, [video]);

	useEffect(() => {
		setMode(productCreateMode ? 'product' : 'project');
	}, [productCreateMode]);

	const getBase64Video = (file: any) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e: any) => {
			// const videoUrl: any = reader?.result;
			setVideo64(e.target.result);
		};
		reader.onerror = () => {
			// console.log('Error: ', error);
			setVideo64('');
		};
		return;
	};

	const onClickNext = () => {
		setError('name', {
			type: 'manual',
			message: !getValues('name')?.trim() ? `Enter ${mode} name` : '',
		});
		if (!getValues('name')?.trim()) return;
		setStep((prev) => prev + 1);
	};

	const handleCreateProject = async (data: any) => {
		if (data?.name.toString().length > 235) {
			toast.error('The project name you entered is too long!');
			return;
		}

		setLoading(true);
		// Starts Creating 3D script file -------------
		const gEditorScene: any = { ...gEditorRef?.current };
		let threeDScript;
		if (gEditorScene?.scene) {
			gEditorScene.scene.children = [...gEditorScene.scene.children]; // to fix array bug
			threeDScript = { ...gEditorScene.scene.toJSON(), file };
		}
		// Ends Creating 3D script file -------------

		const createData = {
			is_visible,
			name: data.name,
			description: data.description,
			three_d_script: threeDScript,
			video,
			image: snapshot,
			editor_script,
			electronicThreeDData: electronic,
			coverThreeDData: cover,
		};
		// console.log('createData-------', createData)
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
			description: data.description,
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
				toast.success('Product created successfully!');
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

	return (
		<div>
			<Modal
				width="sm"
				close={() => {
					if (typeof close === 'function') close();
					clearErrors();
					setStep(0);
				}}
				className={{ paper: 'rounded-lg md:px-4 p-4 py-0 md:py-4' }}
				header={
					<div className="flex justify-end -mr-3 pt-[36px] mb-[20px]">
						<Steppers
							currentStep={step}
							className="md:w-2/3 w-[80%] md:mx-auto"
							options={['Schematic', 'Design']}
							icons={{
								1: (
									<span className="p-1 w-12 flex items-center justify-center h-12 rounded-full border-current">
										1
									</span>
								),
								2: (
									<span className="p-1 w-12 flex items-center justify-center h-12 rounded-full border-current">
										2
									</span>
								),
							}}
						/>
						<IoClose
							className="text-primary text-3xl cursor-pointer mr-4 -mt-2.5"
							// onClick={toggleOpen}
							onClick={() => {
								if (typeof close === 'function') close();
							}}
						/>
					</div>
				}
				content={
					<div className="w-full flex flex-col pt-[27px]">
						<div className="pt-2 px-4">
							{step === 0 && (
								<>
									<div className="relative mb-4">
										<Label
											value={capitalize(`${mode} Name`)}
											className="text-[#101010] font-medium text-base  font-proxima-nova tracking-tight w-2/4 mb-2 2xl:mb-[11px]"
										/>
										<input
											{...register('name', {
												required: `Enter ${mode} name`,
											})}
											className={`w-full h-14 rounded-lg pt-[13px] pb-[16px] pl-5 outline-none text-base text-[#101010] placeholder-[#CBCBCB] bg-[#FBFBFB] tracking-tight font-proxima-nova border border-solid ${
												errors?.name?.message
													? ' border-red-300'
													: 'border-[#CCCCCC]'
											}`}
											placeholder={capitalize(`${mode} Name`)}
										/>
										{errors?.name?.message && (
											<UiFormHelperText message={errors?.name?.message} />
										)}
									</div>
									<div className="relative mb-4">
										<Label
											value={capitalize(`${mode} Description`)}
											className="text-[#101010] font-medium text-base  font-proxima-nova tracking-tight w-2/4 mb-2 2xl:mb-[11px]"
										/>

										<textarea
											{...register('description')}
											placeholder="Type here..."
											//   maxLength={255}
											className={`${
												errors?.description?.message
													? 'border-red-300'
													: 'border-[#CCCCCC]'
											} border  outline-none rounded-lg bg-[#FBFBFB] w-full pt-[13px] pb-[16px] pl-5 text-base resize-none text-[#101010] placeholder-[#CBCBCB]`}
											rows={11}
										/>
										{
											// errors?.description?.message &&
											<UiFormHelperText
												message={errors?.description?.message}
											/>
										}
									</div>
								</>
							)}
							{step === 1 && (
								<>
									<div className="text-center text-xl font-proxima-nova mt-[13px] pb-5 border-b-2 border-[#E9E9E9]">
										{capitalize(mode)} Preview
									</div>
									<div className=" text-lg font-medium pt-[19px]">
										{getValues('name')}
									</div>
									<div className="mt-[14px] mb-[18px] overflow-hidden">
										{getTextExcerpt(getValues('description'), 350)}
									</div>
									<div className="mb-[20px] relative">
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
												src={video64}
												hideScaleView={true}
											/>
										</Box>
										{/* <Button
                      value={
                        <>
                          <span>Re-Generate Video</span>
                          <GiCycle className="text-lg text-white ml-1" />
                        </>
                      }
                      className="text-lg px-[18px] py-[11px] bg-primary text-white absolute bottom-4 right-2"
                      variant="contained"
                    /> */}
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
									<div className="mt-[23px] text-[#101010]">
										<FormControlLabel
											control={
												<IOSSwitch
													sx={{ m: 1 }}
													defaultChecked
												/>
											}
											label="Shared in newsfeed"
										/>
									</div>
									<div className="mb-6 mt-[20px] border-t border-[#E9E9E9]">
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
														<div className="text-[#999999] mt-2 text-[13px]">
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
					<div className="grid grid-cols-2 md:flex space-x-2 w-full px-2 mb-[15px] md:mb-0">
						{step === 0 && (
							<Button
								value="Next"
								onClick={onClickNext}
								className="text-white md:h-14 bg-primary bg-ideeza-100 p-2 tracking-tight font-proxima-nova capitalize text-lg w-full"
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
										root: `h-14 border border-solid border-gray-550 text-gray-550 p-2 capitalize font-normal text-lg md:w-1/2 mr-5`,
									}}
								/>
								<Button
									value="Create"
									loading={loading}
									disabled={loading}
									type="submit"
									onClick={handleSubmit(
										!productCreateMode
											? handleCreateProject
											: handleCreateProduct
									)}
									className="h-14 text-white bg-primary bg-ideeza-100 p-2 tracking-tight font-proxima-nova capitalize text-lg md:w-1/2"
									color="primary"
								/>
							</>
						)}
					</div>
				}
				open={open}
			/>
		</div>
	);
}

export default React.memo(CreateProjectPopupPublic);
