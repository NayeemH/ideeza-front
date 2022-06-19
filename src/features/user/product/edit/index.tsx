import Button from '@atoms/button';
// import CustomBlockly from '@organisms/blockly';
import GeneralView from '@organisms/product-detail/general-view';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ProjectEditHeader from '@organisms/project-edit-header';
import { ApiDataType, apiService } from '../../../../utils/request';
import { useAppDispatch, useAppSelector, useDetectSelfUser } from '../../../../app/hooks';
import { checkSelfUser } from '../../../../utils/utils';
import ThreeJs from '@organisms/threejs';
import { setBlock, setCustomizeMenu } from '@layouts/private/sidebar/reducer';
// import Contributors from '@organisms/contributor-project-general';
// import NetworkProperties from "@molecules/network-properties";
//import {loadPcbSchamaticPackage} from "@organisms/threejs/layout/functions/onLoadFunctions/electronicComponent/schematic";
import { loadGltf } from '@organisms/threejs/layout/functions/onLoadFunctions/functions';
import CreateComponentWorkspace from '@features/blockly/Shared/createComponentWorkspace';
// import { useHistory } from "react-router-dom";

const UserPro = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const selectedBlocks = useAppSelector((state) => state.sidebar.block);
	const addSelectedBlock = (block_data: any) => {
		if (block_data && block_data !== '') {
			return;
		}

		const blocks = [...selectedBlocks];
		blocks.push(block_data);
		dispatch(setBlock(blocks));
	};

	// const projectId = router.query.id;
	const productId = router.query.productId;
	//   const history = useHistory();
	const [productData, setProductData] = useState<any>(null);
	const isSelfUser = useDetectSelfUser(productData?.user?.id);
	const [activeView, setActiveView] = useState('electronic');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [electronicComponentId, setElectronicComponentId] = useState<any>('');
	const [electronicThreeDData, setElectronicThreeDData] = useState({});
	const [coverComponentId, setCoverComponentId] = useState<any>('');
	const [coverThreeDData, setCoverThreeDData] = useState({});
	const [blocklyComponentId, setBlocklyComponentId] = useState('');
	const [blocklyCodeString, setBlocklyCodeString] = useState('');
	const [editorScript, setEditorScript] = useState('');
	// const [nEditorLoaded, setNEditorLoaded] = useState(false);

	const eEditorRef = useRef<any>(null);
	const cEditorRef = useRef<any>(null);
	const gEditorRef = useRef<any>(null);
	// const sEditorRef = useRef<any>(null);
	// const nEditorRef = useRef<any>(null);

	const [addPackageFile, setAddPackageFile] = useState<any>({});

	const selected_block_data = useAppSelector((state) => state.sidebar.selected_block_data);
	const authUserData = useAppSelector((state) => state.auth?.userData);
	//const projectData = useAppSelector((state) => state.editProject.projectData);

	const handleActiveView = (e: any) => {
		setActiveView(e);
	};
	// const togglePublicPrivate = (e: any) => {
	//   console.warn(e);
	// };

	const getProductData = async () => {
		if (productId) {
			await apiService(
				{
					method: 'get',
					url: `/product/${productId}/`,
					token: true,
				},
				(res: any) => {
					if (res) {
						const { data } = res;

						setProductData(data);

						setName(data.name);
						setDescription(data.description);

						const productData = data;

						if (productData.id) {
							const components = productData.components;
							for (let i = 0; i < components.length; i++) {
								if (components[i].component_type === 'CODE') {
									setBlocklyCodeString(components[i].editor_script);
									setBlocklyComponentId(components[i].id);
									setActiveView('code');
								}

								if (components[i].component_type === 'COVER') {
									setCoverThreeDData(components[i].three_d_file);
									setCoverComponentId(components[i].id);
									setActiveView('cover');
								}

								if (components[i].component_type === 'ELECTRONIC') {
									setElectronicThreeDData(
										JSON.parse(components[i].three_d_script)
									);
									setElectronicComponentId(components[i].id);
									setActiveView('electronic');
								}
							}
						}

						return;
					}
				}
			);
		}
	};

	const saveProduct = async () => {
		if (name.toString().length > 235) {
			toast.error('The product name you entered is too long!');
			return;
		}

		await apiService(
			{
				method: 'patch',
				url: `/product/${productId}/`,
				token: true,
				data: {
					name,
					description,
				},
			},
			async () => {
				if (blocklyComponentId !== '') {
					await apiService(
						{
							method: 'patch',
							url: `/component/${blocklyComponentId}/`,
							token: true,
							data: {
								editor_script: editorScript,
								component_type: 'CODE',
							},
						},
						() => {
							// nothing
						}
					);
				}

				if (electronicComponentId !== '') {
					await apiService(
						{
							method: 'patch',
							url: `/component/${electronicComponentId}/`,
							token: true,
							data: {
								three_d_script: JSON.stringify(electronicThreeDData),
								component_type: 'ELECTRONIC',
							},
						},
						() => {
							// nothing
						}
					);
				}

				if (coverComponentId !== '') {
					await apiService(
						{
							method: 'patch',
							url: `/component/${coverComponentId}/`,
							token: true,
							data: {
								three_d_script: JSON.stringify(coverThreeDData),
								component_type: 'COVER',
							},
						},
						() => {
							// nothing
						}
					);
				}

				toast.dismiss();
				toast.success('Product Saved Successfully!');
			}
		);
	};

	// const ContributorsPopup = () => {
	// 	const [open, setOpen] = useState(false);

	// 	return (
	// 		<div className="cursor-pointer absolute md:top-2 md:right-5 ">
	// 			<img
	// 				src="/images/user_account_profile_avatar.svg"
	// 				onClick={() => setOpen(!open)}
	// 				alt=""
	// 				srcSet=""
	// 				className={(open ? 'animate-pulse' : '') + ' w-24 relative '}
	// 			/>
	// 			<div className=" absolute right-20">
	// 				{open && (
	// 					<Contributors
	// 					// project_id={projectId}
	// 					/>
	// 				)}
	// 			</div>
	// 		</div>
	// 	);
	// };

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (addPackageFile?.id) {
				setAddPackageFile({});
			}
		}, 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, [addPackageFile]);

	useEffect(() => {
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
		if (activeView === 'network') {
			dispatch(setCustomizeMenu('product'));
			return;
		}

		dispatch(setCustomizeMenu('none'));
	}, [activeView]);

	useEffect(() => {
		const handleRouteChange = () => {
			dispatch(setCustomizeMenu('none'));
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
			const apiData: ApiDataType = {
				method: 'get',
				url: `/${partTypeStr}/${selected_block_data.id}/`,
				token: true,
			};

			await apiService(apiData, (res: any) => {
				if (res) {
					let ref;

					switch (activeView) {
						case 'cover':
							ref = cEditorRef?.current;
							break;

						case 'electronic':
							ref = cEditorRef?.current;
							break;

							break;

						case 'general':
							ref = gEditorRef?.current;
							break;

						// case "network":
						//   ref = nEditorRef?.current;
						//   break;
					}

					let file =
						res.data.three_d_script?.object || res.data.three_d_script?.threeD
							? res.data.three_d_script
							: JSON.parse(res.data.three_d_script);

					if (file?.threeD) file = file.threeD;

					setAddPackageFile({
						id: selected_block_data.id,
						type: selected_block_data.block_type,
						file,
					});

					if (ref) {
						loadGltf(ref, {
							id: selected_block_data.id,
							type: selected_block_data.block_type,
							file: res.data.three_d_file,
						});
					}

					const editor_script = res.data?.editor_script;
					addSelectedBlock(editor_script);

					return;
				}
				// console.log(err);
			});
		};
		if (selected_block_data?.id) {
			fun();
		}
	}, [selected_block_data]);

	useEffect(() => {
		getProductData();
	}, [router.query.id]);

	return (
		<>
			<ProjectEditHeader
				inputClass="hidden"
				handleActiveView={handleActiveView}
				view={activeView}
				nameEditDisabled={!isSelfUser}
				name={name}
				onChangeName={(e: any) => {
					setName(e.target.value);
				}}
			/>

			{activeView === 'general' && (
				<div className="w-full border border-gray-225 mx-auto max-h-80vh overflow-hidden">
					{/* <img
              style={{ width: "100%", height: 400 }}
              src="/assets/images/cars.png"
              alt="car"
            ></img> */}
					<GeneralView
						// project_id={projectId}
						electronicThreeDData={electronicThreeDData}
						coverThreeDData={coverThreeDData}
						{...{
							eEditorRef,
							cEditorRef,
							gEditorRef,
						}}
					/>
				</div>
			)}

			{activeView === 'electronic' && (
				<div
					className="mb-6"
					style={{ position: 'relative', height: 470 }}
				>
					<ThreeJs
						{...{
							editorFile: 1,
							editorRef: eEditorRef,
							toolbar: 'default',
							viewFile: {
								electronic: electronicThreeDData,
							},
						}}
					/>
					{/* <ContributorsPopup /> */}
				</div>
			)}

			{activeView === 'cover' && (
				<div
					className="mb-6"
					style={{ position: 'relative', height: 470 }}
				>
					<ThreeJs
						{...{
							editorFile: 2,
							editorRef: cEditorRef,
							toolbar: 'default',
							viewFile: {
								cover: coverThreeDData,
							},
						}}
					/>
					{/* <ContributorsPopup /> */}
				</div>
			)}

			{activeView === 'code' && (
				<div
					className={`${activeView === 'code' ? 'opacity-100 z-10' : 'opacity-0'}`}
					style={{ position: 'relative' }}
				>
					<div
						className="w-full"
						style={{ height: 470 }}
					>
						<CreateComponentWorkspace
							editorScript={blocklyCodeString}
							onChangeXml={(code: any, partBlocks: any[]) => {
								setEditorScript(
									JSON.stringify({
										partBlocks,
										xmlData: code,
									})
								);
							}}
						/>
					</div>
					{/* <ContributorsPopup /> */}
				</div>
			)}

			{
				// activeView === "app" && (
				// <div className="w-full border border-gray-225 mx-auto max-h-80vh overflow-hidden">
				//   <div className="h-96 w-full">
				//     <h2>app</h2>
				//   </div>
				// </div>
				// )
			}

			{
				// activeView === "network" && (
				//   <div className="w-full grid grid-cols-9 gap-4">
				//     <div
				//       className="mb-6 col-span-7"
				//       style={{ position: "relative", height: 470 }}
				//     >
				//       {/* todo */}
				//       <ThreeJs
				//         {...{
				//           // setThreeDData: setCoverThreeDData,
				//           editorRef: nEditorRef,
				//           setEditorLoaded: setNEditorLoaded,
				//           editorFile: 20,
				//           noPopup: true,
				//           noRestore: nEditorRef?.current ? false : true,
				//         }}
				//       />
				//     </div>
				//     <div className="h-full overflow-y-auto relative w-full bg-white col-span-2">
				//       <NetworkProperties />
				//     </div>
				//   </div>
				// )
			}

			{/*<h1 style={{ fontSize: 22, fontWeight: "bold" }}>Description</h1>
      <textarea
        placeholder={"Description"}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%" }}
      />*/}

			{productData !== null && checkSelfUser(authUserData?.id, productData?.user?.id) && (
				<div className="text-right">
					<Button
						value="Save"
						type="submit"
						//   TODO
						onClick={saveProduct}
						//   onClick={() => "goto"}
						classes={{
							root: `text-white bg-primary py-[10px] px-[50px] font-proxima-nova capitalize font-normal mt-5 shadow-none text-[16px] min-h-0`,
						}}
						color="primary"
					/>
				</div>
			)}
		</>
	);
};

export default UserPro;
