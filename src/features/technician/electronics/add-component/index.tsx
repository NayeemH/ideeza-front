import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from '@atoms/button';
import Steppers from '@molecules/steppers';
import ElectronicsAddComponent from '@organisms/electronics-add-design';
import ElectronicsCodeAddComponent from '@organisms/electronics-code-add-component';
import ElectronicsAddComponentGeneral from '@organisms/electronics-add-component-general';
import ThreeJs from '@organisms/threejs';
//import ElectroAddedParts from './electroAddedParts';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { createComponent } from 'request/code';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setCustomizeMenu } from '@layouts/private/sidebar/reducer';
import { useRouter } from 'next/router';
import { ApiDataType, apiService } from 'utils/request';
import {
	loadPcbSchamaticPackage,
	renderPcbSchematic,
} from '@organisms/threejs/layout/functions/onLoadFunctions/electronicComponent/schematic';
//import { loadFile } from '@organisms/threejs/layout/functions/onLoadFunctions/functions';
import { renderAnimation } from '@organisms/threejs/layout/functions/GlobalFunctions';
import Loader from '@atoms/loader';
import { IoClose } from 'react-icons/io5';
import Modal from '@atoms/modal';
import Label from '@atoms/label';
import Confirmation from '@organisms/confirmation';

export default function AddComponentElectronics() {
	const methods = useForm();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [step, setStep] = useState(0);
	const [isSubmiting, setSubmiting] = useState(false);
	const [scripts, setScripts] = useState<Array<object>>([]);
	const selected_block_data = useAppSelector((state) => state.sidebar.selected_block_data);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState(0);
	const [type, setType] = useState(true);
	const [video, setVideo] = useState<any>('');
	const [snapshot, setSnapshot] = useState<any>('');

	const [isRestored, setIsRestored] = useState(false);

	const sEditorRef = useRef<any>(null);
	const [sEditorLoaded, setSEditorLoaded] = useState(false);

	const dEditorRef = useRef<any>(null);

	const tempEditorRef = useRef<any>(null);
	const [tempEditorLoaded, setTempEditorLoaded] = useState(false);

	const [editorLoading, setEditorLoading] = useState(false);
	const [openAgreeModal, setOpenAgreeModal] = useState(false);
	const [isPartComplete, setIsPartComplete] = useState(false);
	const [editor_script, setEditorScript] = useState('');

	useEffect(() => {
		if (sEditorLoaded && sEditorRef?.current && step === 0) {
			setEditorLoading(true);
			renderPcbSchematic(sEditorRef.current, { ...dEditorRef?.current }, setEditorLoading);
		}
	}, [sEditorLoaded, sEditorRef, step, dEditorRef]);

	useEffect(() => {
		if (step !== 0) setSEditorLoaded(false);
		if (step !== 3) setTempEditorLoaded(false);
	}, [step]);

	useEffect(() => {
		if (tempEditorRef?.current && tempEditorLoaded)
			renderAnimation(
				tempEditorRef?.current,
				dEditorRef?.current?.scene,
				setVideo,
				setSnapshot
			);
	}, [tempEditorLoaded, tempEditorRef, dEditorRef]);

	const getPackageFile = useCallback(
		async (id: any, type: any, scriptType: any) => {
			const file: any = scripts.find((e: any) => e.id === id && e.type === type);

			if (file) {
				return file?.file[scriptType];
			} else {
				const apiData: ApiDataType = {
					method: 'get',
					url: `/part/electronic-part/${id}/`,
					token: true,
				};
				let data;
				await apiService(apiData, (res: any) => {
					if (res) {
						const resp =
							res.data.three_d_script?.object || res.data.three_d_script?.threeD
								? res.data.three_d_script
								: JSON.parse(res.data.three_d_script);

						data = resp?.[scriptType];
						return;
					}

					return null;
				});
				if (data) {
					return data;
				} else {
					return null;
				}
			}
		},
		[scripts]
	);

	const addComponentMutation = useMutation(createComponent, {
		onSuccess: () => {
			setSubmiting(false);
			methods.reset();
			setName('');
			setDescription('');
			// setStep(0);

			if (sEditorRef?.current) sEditorRef?.current?.clear();
			if (dEditorRef?.current) dEditorRef?.current?.clear();
			setSnapshot('');
			setVideo('');
			toast.success('Component created successfully');
		},
		onError: (err: any) => {
			setSubmiting(false);
			toast.error(err.message);
			console.error(err);
		},
	});

	const formSubmit = (data: IFormData) => {
		const sEditorScene: any = { ...sEditorRef?.current };
		let sJson;
		if (sEditorScene?.scene) {
			sEditorScene.scene.children = [...sEditorScene?.scene?.children]; // to fix array bug
			sJson = sEditorScene.scene.toJSON();
		}

		const dEditorScene: any = { ...dEditorRef?.current };
		let dJson;
		if (dEditorScene?.scene) {
			dEditorScene.scene.children = [...dEditorScene?.scene?.children]; // to fix array bug
			dJson = dEditorScene.scene.toJSON();
		}

		if (sJson && Object.entries(sJson).length === 0) {
			toast.error('Please check schematic step!');
			return;
		}

		if (dJson && Object.entries(dJson).length === 0) {
			toast.error('Please check design step!');
			return;
		}

		if (!category || Number(category) < 1) {
			toast.error('Select a category!');
			return;
		}

		if (name === '') {
			toast.error('Name can not be empty!');
			return;
		}

		const reqBody: any = new FormData();
		reqBody.append('name', name ?? '');
		reqBody.append('component_type', 'ELECTRONIC');
		//reqBody.append('is_visible', type);
		reqBody.append('is_visible', true);
		reqBody.append('category', category);
		reqBody.append('three_d_script', JSON.stringify(dJson));
		reqBody.append('schema_object', JSON.stringify(sJson));
		reqBody.append('image_svg', snapshot);
		reqBody.append('simulation_video', video);
		reqBody.append('editor_script', editor_script);

		setSubmiting(true);
		if (description) {
			reqBody.description = description;
		}
		// if (data?.editor_script) {
		// 	reqBody.append('editor_script', data?.editor_script);
		// }
		addComponentMutation.mutate(reqBody);
		setIsPartComplete(true);
	};

	const goToNextStep = () => {
		// if (!schematicData) {
		//   toast.error('Add schematic data!');
		//   return;
		// }

		setStep((prev) => prev + 1);
	};

	useEffect(() => {
		if (step === 0) {
			dispatch(setCustomizeMenu('electronics'));
		} else {
			dispatch(setCustomizeMenu('none'));
		}
	}, [step]);

	useEffect(() => {
		const handleRouteChange = () => {
			dispatch(setCustomizeMenu('none'));
		};
		router.events.on('routeChangeStart', handleRouteChange);
	}, []);

	useEffect(() => {
		console.log('selected_block_data', selected_block_data);
		let partTypeStr = 'component';
		const partType = selected_block_data?.block_type?.toLowerCase();
		if (partType === 'component') partTypeStr = partType;
		else partTypeStr = `part/electronic-part`;

		const fun = async () => {
			setEditorLoading(true);
			const apiData: ApiDataType = {
				method: 'get',
				url: `/${partTypeStr}/${selected_block_data.id}/`,
				token: true,
			};

			await apiService(apiData, (res: any) => {
				if (res) {
					if (partType === 'component') {
						if (res.data?.schema_object) {
							if (sEditorRef?.current)
								loadPcbSchamaticPackage(
									sEditorRef.current,
									{
										id: selected_block_data.id,
										type: selected_block_data.block_type,
										schematic: res.data?.schema_object,
									},
									setEditorLoading
								);
						}
					} else {
						const file =
							res.data?.three_d_script?.object || res.data?.three_d_script?.threeD
								? res.data?.three_d_script
								: JSON.parse(res.data?.three_d_script);

						setScripts((prev) => [
							...prev,
							{
								id: selected_block_data.id,
								type: selected_block_data.block_type,
								file,
							},
						]);
						if (sEditorRef?.current)
							loadPcbSchamaticPackage(
								sEditorRef.current,
								{
									id: selected_block_data?.id,
									type: selected_block_data?.block_type,
									schematic: file?.schematic,
								},
								setEditorLoading
							);
					}
					return;
				}
			});
		};
		if (selected_block_data?.id) {
			fun();
		}
	}, [selected_block_data]);

	return (
		<div>
			<div className="flex justify-center w-full mb-6 mt-[40px]">
				<Steppers
					currentStep={step}
					className="md:w-2/4 w-full font-proxima-nova md:text-xl"
					options={['Schematic', 'Design', 'Code', 'General']}
					icons={{
						1: <span>1</span>,
						2: <span>2</span>,
						3: <span>3</span>,
						4: <span>4</span>,
					}}
				/>
			</div>
			<FormProvider {...methods}>
				<div>
					{step === 0 && (
						<div
							id="semantic"
							className="w-full relative"
						>
							{/* <ElectroAddedParts data={'nothing'} /> */}
							<div className="">
								<div className="bg-shemetic relative">
									{editorLoading && (
										<Loader
											type="relative"
											isTransparentBg
										/>
									)}
									<ThreeJs
										{...{
											editorFile: 4,
											editorRef: sEditorRef,
											setEditorLoaded: setSEditorLoaded,
											editorName: 'Pcb',
											toolbar: 'electronicComponentSchematic',
											noPopup: sEditorRef?.current ? true : false,
											setIsRestored,
										}}
									/>
								</div>
							</div>
							<div className="w-full flex items-center justify-end mt-4 ">
								<Button
									onClick={goToNextStep}
									value="Next"
									className="bg-primary w-40 transform-none text-white text-base 2xl:text-[18px] shadow-none font-proxima-nova py-[12px]"
									variant="contained"
									size="large"
									color="primary"
								/>
							</div>
						</div>
					)}
					{step === 1 && (
						<>
							<div
								id="semantic"
								className="w-full relative"
							>
								<ElectronicsAddComponent
									{...{
										dEditorRef,
										sEditorRef,
										getPackageFile,
										isRestored,
									}}
								/>
							</div>
							<div className="w-full flex items-center justify-between mt-4 ">
								<Button
									onClick={() => setStep((prev) => prev - 1)}
									value="Back"
									className="bg-[#FBFBFB] border border-solid border-[#E6E6E6] w-40 transform-none text-gray-600 text-base 2xl:text-[18px] font-proxima-nova min-h-0 py-[12px]"
									variant="contained"
									size="large"
									color="inherit"
								/>

								<Button
									type="button"
									onClick={() => setStep((prev) => prev + 1)}
									value={'Next'}
									className="bg-primary w-40 transform-none text-white text-base 2xl:text-[18px] font-proxima-nova py-[12px] min-h-0"
									variant="contained"
									size="large"
									color="primary"
								/>
							</div>
						</>
					)}
					{step === 2 && (
						<>
							<ElectronicsCodeAddComponent
								setStep={setStep}
								onAddPart={setEditorScript}
							/>
							<div className="w-full flex items-center justify-between mt-4 ">
								<Button
									onClick={() => setStep((prev) => prev - 1)}
									value="Back"
									className="bg-white border-opacity-50 border border-solid border-[#E6E6E6] w-40 transform-none text-gray-600 text-base 2xl:text-[18px] font-proxima-nova min-h-0 py-[12px]"
									variant="contained"
									size="large"
									color="inherit"
								/>

								<Button
									type="button"
									onClick={() => setStep((prev) => prev + 1)}
									value={'Next'}
									className="bg-primary w-40 transform-none text-white text-base 2xl:text-[18px] font-proxima-nova py-[12px] min-h-0"
									variant="contained"
									size="large"
									color="primary"
								/>
							</div>
						</>
					)}
					{step === 3 && (
						<>
							{!isPartComplete ? (
								<form
									onSubmit={methods.handleSubmit(formSubmit)}
									id="hook-form-elec-add-component"
								>
									<ElectronicsAddComponentGeneral
										name={name}
										onChangeName={setName}
										description={description}
										onChangeDescription={setDescription}
										onSelectType={(e: any) =>
											setType(JSON.parse(e.target.value))
										}
										onSelectCategory={(id: any) => setCategory(id)}
									/>
									<div className="w-full flex items-center justify-between mt-4 ">
										<Button
											onClick={() => setStep((prev) => prev - 1)}
											value="Back"
											className="bg-white border-opacity-50 border border-solid border-[#E6E6E6] w-40 transform-none text-gray-600 text-base 2xl:text-[18px] font-proxima-nova min-h-0 py-[12px]"
											variant="contained"
											size="large"
											color="inherit"
										/>
										<Button
											value={'Finish'}
											// type="submit"
											className="bg-primary w-40 transform-none text-white text-base 2xl:text-[18px] font-proxima-nova py-[12px] min-h-0"
											variant="contained"
											size="large"
											color="primary"
											loading={isSubmiting}
											// disabled={isSubmiting}
											onClick={() => setOpenAgreeModal(true)}
										/>
									</div>
									<div
										style={{
											width: '640px',
											height: '360px',
											position: 'absolute',
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
									<Modal
										open={openAgreeModal}
										width="md"
										className={{
											paper: ' rounded-[10px] p-[45px] 2xl:w-[800px]',
										}}
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
														form="hook-form-elec-add-component"
														className="bg-primary text-white font-normal font-proxima-nova rounded-[6px] py-[13px] px-[30px]"
														onClick={() => setOpenAgreeModal(false)}
													>
														Agree
													</button>
												</div>
											</>
										}
										close={() => setOpenAgreeModal(false)}
									/>
								</form>
							) : (
								<div className=" h-[400px] 2xl:h-[600px] mb-6">
									<Confirmation
										iconEnd=""
										src="/images/success-add.png"
										value="Your Electric component is added."
										lableClass="text-[#333333] font-sans text-xl xl:text-3xl 2xl:text-4xl tracking-normal"
										lableClass2="text-[#333333] font-sans text-xl xl:text-3xl 2xl:text-4xl tracking-normal"
										btnValue="+ Add new component"
										btnClass="bg-primary rounded-[6px] px-[30px] mt-5 py-[15px] text-base 2xl:text-[18px] font-sans tracking-tight transform-none text-white"
										clickHandler={() => {
											setStep(0);
											setIsPartComplete(false);
										}}
										mainClass="bg-white h-[400px] 2xl:h-[600px] justify-center rounded-md p-7 py-20 flex flex-col items-center"
									/>
								</div>
							)}
						</>
					)}
				</div>
			</FormProvider>
		</div>
	);
}

interface IFormData {
	type?: 'public' | 'private';
	name?: string;
	description?: string;
	category?: number;
	editor_script?: string;
}
