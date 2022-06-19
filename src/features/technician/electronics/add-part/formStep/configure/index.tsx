import Button from '@atoms/button';
// import { Grid } from '@mui/material';
import ThreeJs from '@organisms/threejs';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IUseAddPart } from '../../useAddPart';
import AddPackage from './dimension-form/AddPackage';
import FormOne from './dimension-form/FormOne';
import FormTwo from './dimension-form/FormTwo';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setCustomizeMenu, setNewModule, setPackage } from '@layouts/private/sidebar/reducer';
// import align = doc.builders.align;
import { apiService, ApiDataType } from '../../../../../../utils/request';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
// import CategoryMultipleSelector from '@organisms/category-selector/CategoryMultipleSelector';
import { renderPackage } from '@organisms/threejs/layout/functions/onLoadFunctions/electronicParts/renderPackage';
import {
	addPackagePoints,
	currentPackagePoints,
	deletePackagePoints,
	updatePackagePoints,
} from '@organisms/threejs/layout/functions/onLoadFunctions/electronicParts/packagePoints';
import { loadFile } from '@organisms/threejs/layout/functions/onLoadFunctions/functions';
import { Dialog } from '@mui/material';
import Loader from '@atoms/loader';

export default function Configure({
	setStep,
	threeDData,
	editorRef,
}: {
	setStep: IUseAddPart;
	threeDData: any;
	editorRef: any;
}): JSX.Element {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [formNumber, setFormNumber] = useState(1);
	const [viewType, setViewType] = useState('3d');
	const [currentPackagePoint, setCurrentPackagePoint] = useState<number>();
	const [deletePackagePoint, setDeletePackagePoint] = useState<number>();
	const [addPackagePoint, setPackagePoint] = useState<any>({});
	const [updatePackagePoint, setUpdatePackagePoint] = useState<any>({});
	const [valuePackagePoint, setValuePackagePoint] = useState<number>();
	const [formData, setFormData] = useState({});

	const packageData = useAppSelector((state) => state.sidebar.package);
	const [packageAddSavePopupOpen, setPackageAddSavePopupOpen] = useState(false);
	// const [coreCategories, setCoreCategories] = useState<any[]>([]);
	const [packageName, setPackageName] = useState<string>('');
	/* const [selectedCoreCategory, setSelectedCoreCategory] = useState<
	number | null
  >(null); */
	const [selectedThreeDData, setSelectedThreeDData] = useState<any>('');
	const [editSchematic, setEditSchematic] = useState(false);

	const [addPackageFile, setAddPackageFile] = useState<any>({});
	const addEditorRef = useRef<any>(null);
	const [editorLoaded, setEditorLoaded] = useState(false);
	const [addEditorLoaded, setAddEditorLoaded] = useState(false);

	const [loaderStr, setLoaderStr] = useState('');

	const { setError, clearErrors, getValues } = useFormContext();
	const [editorLoading, setEditorLoading] = useState(false);

	const validateForm = () => {
		const values: any = getValues();

		console.log('values', values);

		if (!values?.package_type || values?.package_type === '') {
			return setError('package_type', {
				message: 'Please select package type!',
			});
		} else {
			clearErrors('package_type');
		}

		if (!values?.body_type || values?.body_type === '') {
			return setError('body_type', { message: 'Please select body type!' });
		} else {
			clearErrors('body_type');
		}

		if (!values?.package_name || values?.package_name === '') {
			return setError('package_name', {
				message: 'Please select package name!',
			});
		} else {
			clearErrors('package_name');
		}

		if (!values?.name || values?.name === '') {
			return setError('name', { message: 'Please input name!', type: 'focus' });
		} else {
			clearErrors('name');
		}

		if (!values?.pin1_location || values?.pin1_location === '') {
			return setError('pin1_location', {
				message: 'Please input pin 1 location!',
				type: 'focus',
			});
		} else {
			clearErrors('pin1_location');
		}

		if (
			Number(values?.total_pins) === 0 ||
			!(Number(values?.total_pins) % Number(values?.pin1_location) === 0)
		) {
			return setError('total_pins', {
				message: 'Enter a valid pin!',
				type: 'focus',
			});
		} else {
			clearErrors('total_pins');
		}

		setStep.nextStep();
	};

	useEffect(() => {
		setAddPackageFile({});
		// threeDData.current = {};
		if (addEditorRef?.current && addEditorLoaded) addEditorRef?.current?.clear();
		if (editorRef?.current && editorLoaded && !formData) editorRef?.current?.clear();
	}, [addEditorRef, editorRef, threeDData, editorLoaded, addEditorLoaded]);

	useEffect(() => {
		if (editorRef?.current) {
			const editorType =
				formNumber === 3
					? 'newPackage'
					: editSchematic
					? 'editPackageSchematic'
					: 'packageDesign';

			renderPackage(
				editorRef.current,
				threeDData,
				formData,
				viewType,
				editorType,
				null,
				addPackageFile
			);
		}
	}, [editorRef, threeDData, formData, viewType, formNumber, editSchematic, addPackageFile]);

	useEffect(() => {
		if (addPackagePoint?.id !== undefined)
			addPackagePoints(editorRef.current, addPackagePoint, setValuePackagePoint, threeDData);
	}, [editorRef, addPackagePoint, setValuePackagePoint, threeDData]);

	useEffect(() => {
		if (currentPackagePoint !== undefined) {
			currentPackagePoints(editorRef.current, currentPackagePoint);
		}
	}, [editorRef, currentPackagePoint]);

	useEffect(() => {
		if (updatePackagePoint !== undefined) {
			updatePackagePoints(editorRef.current, updatePackagePoint, threeDData);
		}
	}, [updatePackagePoint, threeDData]);

	useEffect(() => {
		if (deletePackagePoint !== undefined) {
			deletePackagePoints(editorRef.current, deletePackagePoint);
		}
	}, [deletePackagePoint]);

	useEffect(() => {
		console.log('---LoaderString---', loaderStr);
	}, [loaderStr]);

	const selected_modules = useAppSelector((state) => state.sidebar?.package?.selected_modules);

	useEffect(() => {
		if (formNumber === 3) {
			setViewType('3d');
			setAddPackageFile({});
			editorRef.current.clear();
			if (threeDData.current)
				threeDData.current = {
					...threeDData.current,
					['3d']: {},
				};
		}
	}, [formNumber]);

	const { watch } = useFormContext();
	useEffect(() => {
		const subscription = watch((data) => {
			setFormData({
				// packageType: data.package_type,
				packageType: 'tht',
				bodyType: 'rectangle', // Todo: data.body_type
				packageName: data?.package_name,
				packageWidth: 0.2,
				noOfPins: data?.total_pins,
				pinLocation: data?.pin1_location,
				pinSides: data?.pin1_location,
			});
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	const closeAddPackage = () => {
		addEditorRef?.current?.clear();
		dispatch(
			setPackage({
				edit: null,
				addPackageOpen: false,
				selected_module_type: '',
				selected_module_is_visible: true,
			})
		);
	};

	/* const getCoreCategories = async () => {
	await apiService(
	  {
		method: 'get',
		url: `/core/category/`,
		token: true,
	  },
	  (res: any) => {
		if (res) {
		  const { data } = res;
		  const results = data.results;
		  setCoreCategories(results);
		  return;
		}
	  }
	);
  }; */

	const packageEditMode = packageData.edit && Number(packageData?.edit?.id) > 0;

	useEffect(() => {
		if (packageData.addPackageOpen) {
			setAddPackageFile({});
			addEditorRef?.current?.clear();
		}
	}, [packageData.addPackageOpen]);

	useEffect(() => {
		if (packageData.edit && packageData?.edit?.name) {
			setPackageName(packageData?.edit?.name);
		}
	}, [packageData.edit]);

	const createPackage = async () => {
		setEditorLoading(true);
		let method: any = 'post',
			url = `/ic-package/module/`;
		const data: any = {
			image_svg: selectedThreeDData?.snapshot,
			is_visible: packageData?.selected_module_is_visible,
			module_type: packageData?.selected_module_type,
			// three_d_script: JSON.stringify(selectedThreeDData),
			three_d_script: JSON.stringify(addEditorRef?.current?.selected?.toJSON()),
			family: getValues()?.qfn_dimensions?.package_type,
			name: packageName,
		};

		if (packageEditMode) {
			url = `/ic-package/module/${packageData?.edit?.id}/`;
			method = 'patch';

			data.id = packageData?.edit?.id;
		}

		await apiService(
			{
				method,
				url,
				data,
				token: true,
			},
			(res: any, error: any) => {
				if (res) {
					toast.dismiss();
					addEditorRef?.current?.clear();
					setAddPackageFile({});
					setPackageName('');
					setEditorLoading(false);
					toast.success('Saved successfully!');
					setPackageAddSavePopupOpen(false);
					closeAddPackage();
					dispatch(
						setNewModule({
							isSucceed: true,
							type: res?.data?.module_type,
							visible: res?.data?.is_visible,
						})
					);
					loadFile(editorRef?.current, {
						id: res?.data?.id,
						type: res?.data?.module_type,
						file: JSON.parse(res?.data?.three_d_script),
					});
					setEditorLoading(false);
					return;
				}

				if (error.response) {
					setEditorLoading(false);
					toast.dismiss();
					setEditorLoading(false);
					toast.error('Failed to save package!');
				}
			}
		);
	};

	useEffect(() => {
		const handleRouteChange = () => {
			closeAddPackage();
			dispatch(setCustomizeMenu('none'));
		};
		router.events.on('routeChangeStart', handleRouteChange);
	}, []);

	useEffect(() => {
		if (addPackageFile?.body?.id !== selected_modules?.body?.id) {
			if (addEditorRef?.current && addEditorLoaded)
				loadFile(addEditorRef.current, {
					id: selected_modules.body?.id,
					type: 'Package_parts',
					file: { ...selected_modules.body?.three_d_script },
				});
		}

		if (addPackageFile?.leg?.id !== selected_modules?.leg?.id) {
			if (addEditorRef?.current && addEditorLoaded)
				loadFile(addEditorRef.current, {
					id: selected_modules.leg?.id,
					type: 'Package_parts',
					file: { ...selected_modules.leg?.three_d_script },
				});
		}

		setAddPackageFile(selected_modules);
	}, [selected_modules]);

	useEffect(() => {
		console.log('PACKAGE-DATA', packageData);
		if (packageData.selected_modules.body?.id) {
			setEditorLoading(true);
			const id = packageData.selected_modules.body.id;
			const apiData: ApiDataType = {
				method: 'get',
				url: `ic-package/module/${id}/`,
				token: true,
			};
			apiService(apiData, (res: any) => {
				if (res) {
					loadFile(addEditorRef.current, {
						id: res.data.id,
						type: res.data.module_type,
						file: JSON.parse(res.data.three_d_script),
					});
					setEditorLoading(false);
				}
			});
		} else if (packageData?.selected_modules?.leg?.id) {
			const id = packageData?.selected_modules?.body?.id;
			const apiData: ApiDataType = {
				method: 'get',
				url: `ic-package/module/${id}/`,
				token: true,
			};
			apiService(apiData, (res: any) => {
				if (res) {
					loadFile(addEditorRef.current, {
						id: res.data?.id,
						type: res.data?.module_type,
						file: JSON.parse(res.data?.three_d_script),
					});
					setEditorLoading(false);
				}
			});
		}
	}, [packageData]);

	return (
		<div>
			{packageData.addPackageOpen ? (
				<div>
					<div style={{ marginTop: '10px', position: 'relative', height: 500 }}>
						{editorLoading && (
							<Loader
								type="relative"
								isTransparentBg
							/>
						)}
						<ThreeJs
							{...{
								editorRef: addEditorRef,
								setThreeDData: setSelectedThreeDData,
								toolbar: 'default',
								editorFile: 10,
								setEditorLoaded: setAddEditorLoaded,
								noPopup: true,
							}}
						/>
					</div>
					<div style={{ padding: '20px', textAlign: 'center' }}>
						<Button
							value="Back"
							type="button"
							onClick={closeAddPackage}
							classes={{ root: 'shadow-none' }}
							variant="contained"
							color="primary"
							className="bg-white w-40 transform-none text-black text-base 2xl:text-xl font-proxima-nova mr-5"
						/>
						<Button
							value="Save"
							type="button"
							onClick={() => {
								setPackageAddSavePopupOpen(true);
							}}
							classes={{ root: 'shadow-none' }}
							variant="contained"
							color="primary"
							className="bg-primary w-40 transform-none text-white text-base 2xl:text-xl font-proxima-nova"
						/>
					</div>

					<Dialog
						open={packageAddSavePopupOpen}
						onClose={() => setPackageAddSavePopupOpen(false)}
						maxWidth="lg"
						scroll="body"
						sx={{
							'& .MuiPaper-root': {
								width: 400,
							},
						}}
					>
						<div className="p-7">
							<h3>{packageEditMode ? 'Edit' : 'Create'} Package</h3>

							<div className="mt-5">
								<div className="flex items-center mb-[20px]">
									<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
										Name
									</label>
									<input
										value={packageName}
										onChange={(e: any) => setPackageName(e?.target?.value)}
										className="pl-[20px] py-[12px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
									/>
								</div>
							</div>

							<div className="mt-5 text-center">
								<Button
									value={'Save'}
									className="bg-primary text-white"
									onClick={createPackage}
								/>
							</div>
						</div>
					</Dialog>
				</div>
			) : (
				<div>
					<div>
						<div className="pt-4 bg-white mt-[60px] pb-[30px] px-[30px] rounded-[6px]">
							<div className="flex lg:flex-row flex-col mb-8 justify-between items-center ">
								<div className="leading-tight font-proxima-nova texl-lg 2xl:text-2xl font-bold text-primary">
									Package Properties
								</div>
								<div className="text-[#999999] text-[24px] font-normal text-right 2xl:ml-[420px]">
									{`${formNumber}`} / 2
								</div>
								<div className="bg-white items-center overflow-hidden py-[15px] sm:w-[100%]  2xl:w-[630px] flex md:flex-row flex-col justify-center md:justify-between">
									<span
										onClick={() => setViewType('schematic')}
										className={`${
											viewType === 'schematic'
												? 'bg-[#441184] text-[#fff] z-[500]'
												: 'bg-white'
										} font-proxima-nova text-base 2xl:text-[18px] text-[#999999] text-center transition-all  cursor-pointer select-none duration-700 ease-in rounded-full px-[50px] py-[12px] w-full border border-solid border-[#E6E6E6]`}
									>
										Schematic Preview
									</span>
									<span
										onClick={() => setViewType('2d')}
										className={`${
											viewType === '2d'
												? 'bg-[#441184] text-[#fff] z-[500]'
												: 'bg-white'
										} font-proxima-nova text-base 2xl:text-[18px] text-[#999999] text-center transition-all  cursor-pointer select-none duration-700 ease-in rounded-full px-[30px] py-[12px] w-full border border-solid border-[#E6E6E6] md:ml-[-40px]`}
									>
										2D Preview
									</span>

									<span
										onClick={() => setViewType('3d')}
										className={`${
											viewType === '3d'
												? 'bg-[#441184] text-[#fff] '
												: 'bg-white'
										} font-proxima-nova text-base 2xl:text-[18px] text-[#999999] text-center transition-all cursor-pointer  select-none duration-700 ease-in rounded-full px-[30px] py-[12px] w-full border border-solid border-[#E6E6E6] md:ml-[-40px]`}
									>
										3D Preview
									</span>
								</div>
							</div>
							<div className="grid grid-cols-1 lg:grid-cols-2">
								<div className="pr-[40px] border-r border-solid border-[#E6E6E6] lg:mb-0 mb-[30px]">
									{formNumber === 1 ? (
										<FormOne
											next={() => setFormNumber(2)}
											addPkg={() => {
												dispatch(setCustomizeMenu('packages'));
												setFormNumber(3);
											}}
										/>
									) : formNumber === 2 ? (
										<FormTwo back={() => setFormNumber(1)} />
									) : (
										<AddPackage
											back={() => {
												dispatch(setCustomizeMenu('none'));
												setFormNumber(1);
											}}
											setPoint={setCurrentPackagePoint}
											deletePoint={setDeletePackagePoint}
											choose3d={setPackagePoint}
											updatePoint={setUpdatePackagePoint}
										/>
									)}
								</div>

								{/* <Grid
									item
									xs={12}
									md={6}
									style={{
										position: 'relative',
										height: '500px',
									}}
									className="md:mt-[105px] "
								> */}
								<div className="relative h-[500px] ml-[40px] rounded-[10px]">
									{viewType === 'schematic' && (
										<div
											style={{
												position: 'absolute',
												top: '0',
												right: '0',
												zIndex: 99999999999,
											}}
										>
											{editSchematic ? (
												<>
													<button
														type="button"
														style={{
															padding: '5px',
															margin: '5px',
															backgroundColor: 'white',
															border: '1px solid black',
															borderRadius: '4px',
														}}
														onClick={() => {
															if (threeDData.current)
																threeDData.current = {
																	...threeDData.current,
																	schematic: null,
																};
															setEditSchematic(false);
														}}
													>
														Cancel
													</button>
													<button
														type="button"
														style={{
															padding: '5px',
															margin: '5px',
															backgroundColor: 'white',
															border: '1px solid black',
															borderRadius: '4px',
														}}
														onClick={() => {
															setEditSchematic(false);
														}}
													>
														Done
													</button>
												</>
											) : (
												<button
													type="button"
													style={{
														padding: '5px',
														margin: '5px',
														backgroundColor: 'white',
														border: '1px solid black',
														borderRadius: '4px',
													}}
													onClick={() => {
														setEditSchematic(true);
													}}
												>
													Edit
												</button>
											)}
										</div>
									)}

									<ThreeJs
										containerClass="rounded-[10px]"
										{...{
											editorRef,
											toolbar: editSchematic
												? 'electronicPartEditSchematic'
												: '',
											editorFile: 3,
											setEditorLoaded,
											noPopup: true,
											setLoaderStr,
										}}
									/>
								</div>

								{/* </Grid> */}
							</div>
						</div>
					</div>
					{/* <img src={threeDData?.snapshot} /> */}

					{formNumber !== 3 && (
						<div className="flex justify-between mt-8">
							<Button
								value="Back"
								onClick={() => setStep.backStep()}
								classes={{ root: 'shadow-none' }}
								variant="contained"
								color="inherit"
								className="bg-white border-opacity-50 border border-solid border-[#E6E6E6] w-40 transform-none text-gray-600 text-base 2xl:text-[18px] font-proxima-nova min-h-0 py-[12px]"
							/>
							<Button
								value="Next"
								type="button"
								onClick={() => {
									validateForm();
								}}
								classes={{ root: 'shadow-none' }}
								variant="contained"
								color="primary"
								className="bg-primary w-40 transform-none text-white text-base 2xl:text-[18px] font-proxima-nova py-[12px]"
								disabled={
									getValues().package_type === '' ||
									getValues().body_type === '' ||
									getValues().package_id === ''
								}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
