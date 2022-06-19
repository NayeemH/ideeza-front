import Button from '@atoms/button';
//import CustomBlockly from "@organisms/blockly/index";
import CreateProjectPopupPublic from '@organisms/create-project-popup-public';
import GeneralView from '@organisms/product-detail/general-view';
import ProductHeader from '@organisms/product-header';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ThreeJs from '@organisms/threejs';
import { useRouter } from 'next/router';
import { setBlock, setCustomizeMenu } from '@layouts/private/sidebar/reducer';
import { ApiDataType, apiService } from 'utils/request';
import { IoClose } from 'react-icons/io5';
import Modal from '@atoms/modal';
import CreateProjectPopupSell from '@organisms/create-project-popup-sell';
import {
	// loadFile,
	loadGltf,
} from '@organisms/threejs/layout/functions/onLoadFunctions/functions';
import { Grid } from '@mui/material';
import Steppers from '@molecules/steppers';
import {
	loadPcbSchamaticPackage,
	renderPcbSchematic,
} from '@organisms/threejs/layout/functions/onLoadFunctions/electronicComponent/schematic';
import {
	drawPcb,
	pcbDesignViewType,
} from '@organisms/threejs/layout/functions/onLoadFunctions/electronicComponent/design';
import { renderUserGeneral } from '@organisms/threejs/layout/functions/onLoadFunctions/userNewPackage/newProduct';
import Loader from '@atoms/loader';
import CreateProjectPopupSave from '@organisms/create-project-popup-save';
// import Label from "@atoms/label";
// import CustomDropDownMenu from "@molecules/custom-dropdown";
// import { FORMINPUT } from "utils/styles";
// import CheckboxAtom from "@atoms/checkbox";
import NetworkProperties from '@molecules/network-properties';
import { FaNetworkWired } from 'react-icons/fa';
import { AiOutlineRight } from 'react-icons/ai';
import PricingPaymentPopup from '@organisms/pricing-payment-popup';
import PricingPopup from '@organisms/pricing-popup';
import { setDataAsync } from 'reducers/auth';
import { useSession } from 'next-auth/react';
import { renderAnimation } from '@organisms/threejs/layout/functions/GlobalFunctions';
import { saveUserGeneral } from '@organisms/threejs/layout/functions/onLoadFunctions/userNewPackage/newProduct';
import CreateComponentWorkspace from '@features/blockly/Shared/createComponentWorkspace';

const UserPro = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { data: session, status } = useSession({ required: true });

	const eEditorRef = useRef<any>(null);
	const cEditorRef = useRef<any>(null);
	const sEditorRef = useRef<any>(null);
	const gEditorRef = useRef<any>(null);
	const nEditorRef = useRef<any>(null);
	const tempEditorRef = useRef<any>(null);

	const selectedBlocks = useAppSelector((state) => state.sidebar.block);
	const userCurrentPlan = useAppSelector((state) => state?.auth?.userData?.current_subscription);
	const states = useAppSelector((ProjectDetail: any) => ProjectDetail?.projectDetail);
	const selected_block_data = useAppSelector((state) => state.sidebar.selected_block_data);

	const [activeView, setActiveView] = useState('electronic');
	const [visitedGeneralView, setVisitedGeneralView] = useState(false);
	const [openPopupProjectType, setOpenPopupProjectType] = useState(false);
	const [openPopupPublic, setOpenPopupPublic] = useState(false);
	const [openPopupSave, setOpenPopupSave] = useState(false);
	const [openPopupSell, setOpenPopupSell] = useState(false);
	const [openPopupPricing, setOpenPopupPricing] = useState(false);
	const [openPopupPayment, setOpenPopupPayment] = useState(false);

	const [step, setStep] = useState(0);
	const [name, setName] = useState('Anonymous Project');
	const [isVisible, setIsVisible] = useState(false);
	const [nameEdited, setNameEdited] = useState(true);
	const [blocklyCodeString, setBlocklyCodeString] = useState<any>(null);
	const [snapshot, setSnapshot] = useState<any>(null);
	const [video, setVideo] = useState<any>(null);
	const [file, setFile] = useState<any>(null);
	const [electronic, setElectronic] = useState<any>(null);
	const [cover, setCover] = useState<any>(null);

	const [scripts, setScripts] = useState<Array<object>>([]);
	const [viewType, setViewType] = useState('2d');
	const [showNetworkProperties, setShowNetworkProperties] = useState(false);

	const [addObj, setAddObj] = useState(undefined);

	const [tempEditorLoaded, setTempEditorLoaded] = useState(false);
	const [sEditorLoaded, setSEditorLoaded] = useState(false);
	const [eEditorLoaded, setEEditorLoaded] = useState(false);
	const [nEditorLoaded, setNEditorLoaded] = useState(false);
	const [editorLoading, setEditorLoading] = useState(false);
	const [isRestored, setIsRestored] = useState(false);

	const project_id = router?.query?.project_id;
	// const project_is_visible = router?.query?.is_visible;
	const [productCreateMode, setProductCreateMode] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [networkProperties, setNetworkProperties] = useState({});

	const [passEditorScriptData, setPassEditorScriptData] = useState<any>(null);

	useEffect(() => {
		if (activeView === 'cover') {
			if (eEditorRef.current) {
				const layer1 = eEditorRef.current.scene.children.filter((el: any) =>
					el.name.includes('Layer1')
				);
				const corePCB = layer1[0].children.filter((el: any) => el.name.includes('Core'));
				corePCB[0].scale.set(0.8, 0.5, 0.05);
				corePCB[0].position.set(0, 0, 0);
			}
		}
		if (activeView === 'code') {
			if (blocklyCodeString) {
				setPassEditorScriptData(blocklyCodeString);
			}
		}
	}, [activeView]);

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

	const addSelectedBlock = (block_data: any) => {
		if (block_data && block_data !== '') {
			return;
		}
		const blocks = [...selectedBlocks];
		blocks.push(block_data);
		dispatch(setBlock(blocks));
	};

	const handleActiveView = (e: any) => {
		setActiveView(e);
	};
	const togglePublicPrivate = () => {
		return;
	};

	const handler = () => {
		toast.dismiss();
		toast.success('Project Created Successfully!');
	};

	const onClickSellBtn = () => {
		if (!(userCurrentPlan?.pricing_plan && userCurrentPlan?.is_active)) {
			return setOpenPopupPricing(true);
		}
		setOpenPopupSell(true);
		setIsVisible(false);
		setOpenPopupProjectType(false);
	};

	const onProjectCreateSuccess = () => {
		if (gEditorRef) gEditorRef?.current?.clear();
		if (eEditorRef) eEditorRef?.current?.clear();
		if (cEditorRef) cEditorRef?.current?.clear();
		setTempEditorLoaded(false);
	};

	const onProjectCreateFailed = () => {
		// console.log('onProjectCreateFailed error-------', error?.response)
		return;
	};

	const saveProductForNetwork = () => {
		return;
		// const data = {
		//   ...networkProperties,
		// };

		// console.log("NET PROPS", data);

		/* apiService({
	  method: "get",
	  url: `/part/electronic-part/${id}/`,
	  token: true,
	}, (res: any, err: any) => {
	  if (res) {
	    
	  }

	  return null;
	}); */
	};

	useEffect(() => {
		if (step !== 0) setSEditorLoaded(false);
		if (step !== 1) {
			setEEditorLoaded(false);
			setViewType('2d');
		}
	}, [step]);

	useEffect(() => {
		if (sEditorLoaded && sEditorRef?.current && step === 0) {
			setEditorLoading(true);
			renderPcbSchematic(sEditorRef.current, { ...eEditorRef?.current }, setEditorLoading);
		}
	}, [sEditorLoaded, sEditorRef, step, eEditorRef]);

	useEffect(() => {
		if (eEditorRef?.current && eEditorLoaded && step === 1) {
			setEditorLoading(true);
			drawPcb(eEditorRef?.current, { ...sEditorRef?.current }, getPackageFile).then(
				(res: any) => {
					if (res) {
						setAddObj(res);
						pcbDesignViewType(eEditorRef?.current, '2d', setEditorLoading);
					}
				}
			);
		}
	}, [eEditorRef, eEditorLoaded, getPackageFile, sEditorRef, step]);

	useEffect(() => {
		if (eEditorRef?.current && eEditorLoaded) {
			setEditorLoading(true);
			pcbDesignViewType(eEditorRef?.current, viewType, setEditorLoading);
		}
	}, [eEditorRef, viewType]);

	useEffect(() => {
		if (nEditorRef?.current && nEditorLoaded)
			renderUserGeneral(
				nEditorRef?.current,
				eEditorRef?.current,
				{ ...cEditorRef?.current },
				true
			);
	}, [nEditorLoaded, nEditorRef, eEditorRef, cEditorRef]);

	useEffect(() => {
		if (activeView !== 'electronic') {
			setSEditorLoaded(false);
			setEEditorLoaded(false);
			setViewType('2d');
			setStep(0);
		}

		if (activeView !== 'network') {
			setNEditorLoaded(false);
		}

		if (activeView === 'cover') {
			dispatch(setCustomizeMenu('cover'));
			return;
		}
		if (activeView === 'electronic') {
			dispatch(setCustomizeMenu('electronics'));
			return;
		}
		if (activeView === 'code') {
			dispatch(setCustomizeMenu('blockly'));
			return;
		}
		if (activeView === 'general') {
			setVisitedGeneralView(true);
			dispatch(setCustomizeMenu('none'));
			return;
		}
		if (activeView === 'network') {
			setVisitedGeneralView(true);
			dispatch(setCustomizeMenu('product'));
			return;
		}

		dispatch(setCustomizeMenu('none'));
	}, [activeView]);

	useEffect(() => {
		const handleRouteChange = () => {
			dispatch(setCustomizeMenu('none'));
			dispatch(setBlock([]));
		};
		router.events.on('routeChangeStart', handleRouteChange);
	}, []);

	useEffect(() => {
		// console.log("SELECTED_BLOCK_DATA", selected_block_data);
		let partTypeStr = 'component';
		const partType = selected_block_data.block_type.toLowerCase();
		if (partType === 'component') {
			partTypeStr = partType;
		} else {
			partTypeStr = `part/${activeView}-part`;
		}

		const fun = async () => {
			setEditorLoading(true);
			const apiData: ApiDataType = {
				method: 'get',
				url: `/${partTypeStr}/${selected_block_data.id}/`,
				token: true,
			};

			await apiService(apiData, (res: any, err: any) => {
				if (res) {
					let ref;

					console.log('EDITOR_SCRIPT', res?.data?.editor_script);

					switch (activeView) {
						case 'cover':
							ref = cEditorRef?.current;
							break;

						case 'electronic':
							if (step === 0) {
								const file =
									res.data.three_d_script?.object ||
									res.data.three_d_script?.threeD
										? res.data.three_d_script
										: JSON.parse(res.data.three_d_script);
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
												id: selected_block_data.id,
												type: selected_block_data.block_type,
												schematic: file.schematic,
											},
											setEditorLoading
										);
								}
							}

							break;

						case 'general':
							ref = gEditorRef?.current;
							break;

						case 'network':
							ref = nEditorRef?.current;
							break;
					}

					// if (file?.threeD) file = file.threeD;

					if (ref) {
						loadGltf(ref, {
							id: selected_block_data.id,
							type: selected_block_data.block_type,
							file: res.data.three_d_file,
						});
					}
					// loadFile(ref, {
					//   id: selected_block_data.id,
					//   type: selected_block_data.block_type,
					//   file,
					// });

					const editor_script = res.data?.editor_script;
					addSelectedBlock(editor_script);
					setEditorLoading(false);

					return;
				}
				if (err) {
					return; // console.log(err);
				}
			});
		};
		if (selected_block_data?.id) {
			fun();
		}
	}, [selected_block_data]);

	useEffect(() => {
		if (tempEditorRef?.current && tempEditorLoaded && openPopupProjectType) {
			renderAnimation(
				tempEditorRef?.current,
				gEditorRef?.current?.scene,
				setVideo,
				setSnapshot,
				setFile
			);
			saveUserGeneral(gEditorRef?.current, setCover, setElectronic);
		}
	}, [tempEditorLoaded, tempEditorRef, gEditorRef, openPopupProjectType]);

	useEffect(() => {
		if (project_id && Number(project_id) > 0) {
			setProductCreateMode(true);
		}
	}, [project_id]);

	return (
		<>
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
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					lg={12}
					sm={12}
				>
					<CreateProjectPopupPublic
						handler={handler}
						open={openPopupPublic}
						name={name}
						is_visible={isVisible}
						onChangeName={setName}
						nameEdited={nameEdited}
						componentType={activeView}
						editor_script={blocklyCodeString}
						onChangeNameEdited={(status) => setNameEdited(status)}
						close={() => setOpenPopupPublic(false)}
						gEditorRef={gEditorRef}
						eEditorRef={eEditorRef}
						cEditorRef={cEditorRef}
						openPopup={openPopupPublic}
						onCreateSuccess={onProjectCreateSuccess}
						onCreateFailed={onProjectCreateFailed}
						video={video}
						snapshot={snapshot}
						file={file}
						electronic={electronic}
						cover={cover}
						productCreateMode={productCreateMode}
					/>

					<CreateProjectPopupSave
						handler={handler}
						open={openPopupSave}
						name={name}
						is_visible={isVisible}
						onChangeName={setName}
						nameEdited={nameEdited}
						componentType={activeView}
						editor_script={blocklyCodeString}
						onChangeNameEdited={(status) => setNameEdited(status)}
						close={() => setOpenPopupSave(false)}
						gEditorRef={gEditorRef}
						eEditorRef={eEditorRef}
						cEditorRef={cEditorRef}
						openPopup={openPopupSave}
						onCreateSuccess={onProjectCreateSuccess}
						onCreateFailed={onProjectCreateFailed}
						video={video}
						snapshot={snapshot}
						file={file}
						electronic={electronic}
						cover={cover}
						productCreateMode={productCreateMode}
					/>

					<CreateProjectPopupSell
						open={openPopupSell}
						close={() => setOpenPopupSell(false)}
						name={name}
						is_visible={isVisible}
						onChangeName={setName}
						nameEdited={nameEdited}
						componentType={activeView}
						editor_script={blocklyCodeString}
						onChangeNameEdited={(status: any) => setNameEdited(status)}
						gEditorRef={gEditorRef}
						eEditorRef={eEditorRef}
						cEditorRef={cEditorRef}
						openSell={openPopupSell}
						onCreateSuccess={onProjectCreateSuccess}
						onCreateFailed={onProjectCreateFailed}
						video={video}
						snapshot={snapshot}
						file={file}
						electronic={electronic}
						cover={cover}
						productCreateMode={productCreateMode}
					/>

					<ProductHeader
						ProjectName={states?.name}
						inputClass="hidden"
						//   onEdit={toggleMySelftProject}
						state={states}
						handleActiveView={handleActiveView}
						view={activeView}
						togglePublicPrivate={togglePublicPrivate}
						//   togglePublicPrivate={"togglePublicPrivate"}
						//   update={titleHandler}
						update={'titleHandler'}
						name={name}
						onChangeName={(e: any) => {
							setName(e.target.value);
							setNameEdited(true);
						}}
						nameEdited={nameEdited}
						onChangeNameEdited={(status: boolean) => setNameEdited(status)}
						// toggleMySelftProject={toggleMySelftProject}
						networkTabHidden={true}
						appTabHidden={true}
						// networkTabHidden={productCreateMode}
						// appTabHidden={productCreateMode}
					/>

					{activeView === 'general' && (
						<div
							className={`${
								activeView === 'general'
									? 'opacity-100 z-10'
									: 'opacity-0 h-0 w-0 overflow-hidden'
							}`}
						>
							<div className="w-full border border-gray-225 mx-auto overflow-hidden">
								{/* 
                  <img
                    style={{ width: "100%", height: 400 }}
                    src="/assets/images/cars.png"
                    alt="car"
                  /> 
                */}
								<GeneralView
									project_id={project_id}
									hideContributor={true}
									{...{
										eEditorRef,
										cEditorRef,
										gEditorRef,
										isRestored,
									}}
									// gEditorRef={gEditorRef}
									// electronicThreeDData={electronicThreeDData}
									// coverThreeDData={coverThreeDData}
									// setGeneralThreeDData={setGeneralThreeDData}
								/>
							</div>
							<div className="w-full flex items-center justify-end">
								<Button
									value="Create"
									type="submit"
									onClick={() => {
										if (!visitedGeneralView) {
											toast.error('Please check general tab!');
										} else {
											setOpenPopupProjectType(true);
										}
									}}
									classes={{
										root: `text-white bg-primary p-2 px-10 font-proxima-nova capitalize text-lg font-bld mt-5 mr-1 shadow-none`,
									}}
									color="primary"
								/>
							</div>
						</div>
					)}

					{activeView === 'electronic' && (
						<div
							className={`${
								activeView === 'electronic'
									? 'opacity-100 z-10'
									: 'opacity-0 h-0 w-0 overflow-hidden'
							}`}
						>
							<div
								className="flex justify-center w-full mb-6 "
								style={{ position: 'relative' }}
							>
								<Steppers
									currentStep={step}
									className="w-full md:w-1/3 mx-auto"
									options={['Step 1', 'Step 2']}
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
							</div>
							{step === 0 && (
								<>
									<div className="bg-shemetic relative max-h-screen">
										{editorLoading && (
											<Loader
												type="relative"
												isTransparentBg
											/>
										)}
										<ThreeJs
											{...{
												editorRef: sEditorRef,
												setEditorLoaded: setSEditorLoaded,
												editorFile: 19,
												toolbar: 'electronicComponentSchematic',
												noPopup: sEditorRef?.current ? true : false,
												setIsRestored,
											}}
										/>
									</div>
									<div className="w-full flex items-center justify-end mt-4 md:pr-14">
										<Button
											type="button"
											onClick={() => setStep((prev) => prev + 1)}
											value={'Next'}
											className="text-white bg-primary p-2 px-12 font-proxima-nova capitalize text-lg font-bld mt-5"
											variant="contained"
											size="large"
											color="primary"
										/>
									</div>
								</>
							)}
							{step === 1 && (
								<>
									<div className="bg-shemetic relative">
										<div className="w-60 grid grid-cols-2 bg-white ml-auto my-4 items-center border overflow-hidden absolute z-10 right-20 top-0 border-solid border-[#441184] rounded-full">
											<span
												onClick={() => setViewType('2d')}
												className={`${
													viewType === '2d'
														? 'bg-[#441184] text-white'
														: ''
												} font-proxima-nova text-base 2xl:text-lg text-center transition-all bg-white cursor-pointer select-none duration-700 ease-in rounded-full px-6 pb-0`}
											>
												2D
											</span>

											<span
												onClick={() => setViewType('3d')}
												className={`${
													viewType === '3d'
														? 'bg-[#441184] text-white'
														: ''
												} font-proxima-nova text-base 2xl:text-lg text-center transition-all cursor-pointer bg-white select-none duration-700 ease-in rounded-full px-6`}
											>
												3D
											</span>
										</div>
										{editorLoading && (
											<Loader
												type="relative"
												isTransparentBg
											/>
										)}
										<ThreeJs
											{...{
												editorRef: eEditorRef,
												setEditorLoaded: setEEditorLoaded,
												editorFile: 15,
												toolbar: 'electronicComponentDesign',
												noPopup: true,
												noRestore: eEditorRef?.current
													? false
													: !isRestored,
												toolbarObj: addObj,
											}}
										/>
									</div>
									<div className="w-full flex items-center justify-between mt-4 md:pr-14 ">
										<Button
											onClick={() => setStep((prev) => prev - 1)}
											value="Back"
											className="bg-white border-opacity-50 border border-solid border-gray-325 w-40 transform-none text-gray-600 text-base 2xl:text-xl font-proxima-nova tracking-tight eina-font-sb03 shadow-none"
											variant="contained"
											size="large"
											color="inherit"
										/>
										<Button
											value="Create"
											type="submit"
											onClick={() => {
												if (!visitedGeneralView) {
													toast.error('Please check general tab!');
												} else {
													setOpenPopupProjectType(true);
												}
											}}
											classes={{
												root: `text-white bg-primary p-2 px-10 font-proxima-nova capitalize text-lg font-bld mt-5 mr-1 shadow-none`,
											}}
											color="primary"
										/>
									</div>
								</>
							)}
						</div>
					)}

					{activeView === 'app' && (
						<div
							className={`${
								activeView === 'app'
									? 'w-full border border-gray-225 mx-auto max-h-80vh overflow-hidden opacity-100 z-10'
									: 'opacity-0 h-0 w-0 overflow-hidden'
							}`}
						>
							<div className="w-full">
								<h2>app</h2>
							</div>
						</div>
					)}

					{activeView === 'network' && (
						<div
							className={`${
								activeView === 'network'
									? 'opacity-100 z-10'
									: 'opacity-0 h-0 w-0 overflow-hidden'
							}`}
						>
							<div
								className="mb-6"
								style={{ position: 'relative', height: 470 }}
							>
								<ThreeJs
									{...{
										// setThreeDData: setCoverThreeDData,
										editorRef: nEditorRef,
										setEditorLoaded: setNEditorLoaded,
										editorFile: 20,
										noPopup: true,
										noRestore: nEditorRef?.current ? false : !isRestored,
									}}
								/>
							</div>
							<div className="w-full flex items-center justify-center mt-2 ">
								<Button
									value="Create"
									type="submit"
									onClick={() => {
										if (!visitedGeneralView) {
											toast.error('Please check general tab!');
										} else {
											saveProductForNetwork();
										}
									}}
									classes={{
										root: `text-white bg-primary p-2 px-10 font-proxima-nova capitalize text-lg font-bld mt-5 mr-1 shadow-none`,
									}}
									color="primary"
								/>
							</div>
						</div>
					)}

					{activeView === 'cover' && (
						<div
							className={`${
								activeView === 'cover'
									? 'opacity-100 z-10'
									: 'opacity-0 h-0 w-0 overflow-hidden'
							}`}
						>
							<div
								className="h-90 mb-6"
								style={{ position: 'relative', height: 470 }}
							>
								<ThreeJs
									{...{
										// setThreeDData: setCoverThreeDData,
										editorRef: cEditorRef,
										// setEditorLoaded: setCEditorLoaded,
										editorFile: 16,
										noPopup: true,
										noRestore: cEditorRef?.current ? false : !isRestored,
									}}
								/>
							</div>
							<div className="w-full flex items-center justify-end mt-2 ">
								<Button
									value="Create"
									type="submit"
									onClick={() => {
										if (!visitedGeneralView) {
											toast.error('Please check general tab!');
										} else {
											setOpenPopupProjectType(true);
										}
									}}
									classes={{
										root: `text-white bg-primary p-2 px-10 font-proxima-nova capitalize text-lg font-bld mt-5 mr-1 shadow-none`,
									}}
									color="primary"
								/>
							</div>
						</div>
					)}

					{/* {activeView === 'code' && ( */}
					<div
						className={`${
							activeView === 'code'
								? 'opacity-100 z-10 w-full'
								: // : 'absolute opacity-0 w-full h-0 overflow-hidden'
								  'opacity-0 h-0 w-full overflow-hidden'
						}`}
					>
						{/* <div
							className={`${activeView === 'code' ? 'opacity-100 z-10' : 'opacity-0'
								} h-96`}
						> */}
						<div
							className="w-full"
							// className='w-full'
							style={{ height: 470 }}
						>
							<CreateComponentWorkspace
								// editorScript={passEditorScriptData}
								onChangeXml={(code: any, partBlocks: any[]) => {
									setBlocklyCodeString(
										JSON.stringify({
											partBlocks,
											xmlData: code,
										})
									);

									// console.log('COMPONENT SCRIPT', {
									// 	partBlocks,
									// 	xmlData: code,
									// });
								}}
							/>
						</div>
						<div className="w-full flex items-center justify-end mt-2 ">
							<Button
								value="Create"
								type="submit"
								onClick={() => {
									if (!visitedGeneralView) {
										toast.error('Please check general tab!');
									} else {
										setOpenPopupProjectType(true);
									}
								}}
								classes={{
									root: `text-white bg-primary p-2 px-10 font-proxima-nova capitalize text-lg font-bld mt-5 mr-1 shadow-none`,
								}}
								color="primary"
							/>
						</div>
						{/* </div> */}
					</div>
					{/* )} */}

					<Modal
						open={openPopupProjectType}
						close={() => setOpenPopupProjectType(false)}
						width="md"
						header={
							<div className="flex justify-end md:-mt-3 md:-mr-3 pb-2">
								<IoClose
									className="text-red-250 text-3xl cursor-pointer"
									// onClick={toggleOpen}
									onClick={() => setOpenPopupProjectType(false)}
								/>
							</div>
						}
						content={
							<div className="space-y-3 pt-2 mb-8 font-proxima-nova">
								<div className="text-center text-[#101010] font-bold tracking-wider text-2xl 2xl:text-[32px]">
									IF YOU CAN'T <span className="text-primary">SELL</span> YOUR
									DREAM,
								</div>
								<div className="text-center text-[#101010] font-bold tracking-wider text-2xl 2xl:text-[32px]">
									YOU DON'T <span className="text-primary">OWN</span> THEM
								</div>
							</div>
						}
						actions={
							<div className="w-full flex flex-col mt-2 font-proxima-nova">
								<div className="">
									<div className="w-full flex flex-col gap-2 sm:flex-row justify-center mb-8">
										<Button
											value="Give to the community"
											type="submit"
											onClick={() => {
												setOpenPopupProjectType(false);
												setIsVisible(true);
												setOpenPopupPublic(true);
											}}
											classes={{
												root: `text-white bg-primary py-3 px-5 capitalize text-base md:w-60 mx-2`,
											}}
											color="primary"
										/>
										<div className="">
											<Button
												value="Sell"
												type="submit"
												onClick={onClickSellBtn}
												classes={{
													root: `text-white bg-primary py-3 px-5  capitalize text-lg md:w-60 w-[95%] mx-2`,
												}}
												color="primary"
											/>
										</div>
									</div>

									<div className="flex justify-center text-[#686868]">
										Or Click Here to
										<span
											className={'text-[#080892] hover:underline ml-2'}
											style={{ cursor: 'pointer' }}
											onClick={() => {
												setOpenPopupProjectType(false);
												setIsVisible(false);
												setOpenPopupSave(true);
											}}
										>
											save
										</span>
									</div>
								</div>
							</div>
						}
					/>

					<PricingPopup
						open={openPopupPricing}
						toggleOpen={() => setOpenPopupPricing(!openPopupPricing)}
						onSuccessAddToCart={() => {
							setOpenPopupPayment(true);
							setOpenPopupPricing(false);
						}}
					/>

					<PricingPaymentPopup
						open={openPopupPayment}
						toggleOpen={() => setOpenPopupPayment(!openPopupPayment)}
						onClickCancelPaymentCards={() => setOpenPopupPayment(false)}
						onClickCancelPaymentPaypal={() => setOpenPopupPayment(false)}
						onSuccesPaymentPaypal={async () => {
							if (status === 'authenticated') {
								await dispatch(setDataAsync(Number(session?.user.id)));
							}
							setIsVisible(false);
							setOpenPopupPayment(false);
							setOpenPopupSell(true);
							setOpenPopupProjectType(false);
						}}
						// onSuccesPaymentCards={() => false} // TODO: uncomment and write logic when fix card payment
					/>
				</Grid>
				{activeView === 'network' && (
					<Grid style={{ position: 'absolute' }}>
						<>
							<div
								className=" rounded-full fixed right-5 top-32 bg-gradient-to-r from-[#5A1E81] to-[#E704BE] p-[10px] cursor-pointer"
								onClick={() => setShowNetworkProperties(!showNetworkProperties)}
							>
								{!showNetworkProperties ? (
									<FaNetworkWired className="text-[35px] text-white" />
								) : (
									<AiOutlineRight className="text-[35px] text-white" />
								)}
							</div>

							<div
								className={`networkProperties  ${
									showNetworkProperties ? 'active-messageField' : ''
								} max-w-[320px] bg-white h-[600px] px-2 overflow-y-scroll rounded-md`}
							>
								{/* <IoClose
                  className="text-primary ml-auto mt-2 mr-2 cursor-pointer"
                  onClick={() =>
                    setShowNetworkProperties(!showNetworkProperties)
                  }
                  size="30px"
                /> */}
								<NetworkProperties
									onChangeProperties={(properties) =>
										setNetworkProperties(properties)
									}
								/>
							</div>
						</>
					</Grid>
				)}
			</Grid>
		</>
	);
};

export default UserPro;
