import Loader from '@atoms/loader';
import ElectroAddedParts from '@features/technician/electronics/add-component/electroAddedParts';
import ThreeJs from '@organisms/threejs';
import { deleteObject, hideObjects } from '@organisms/threejs/layout/functions/GlobalFunctions';
import {
	drawPcb,
	pcbDesignViewType,
} from '@organisms/threejs/layout/functions/onLoadFunctions/electronicComponent/design';
import React, { useEffect, useState } from 'react';

const ElectronicsAddComponent = ({
	dEditorRef,
	sEditorRef,
	getPackageFile,
}: //isRestored,
any) => {
	// const [active, setActive] = useState<"blockly" | "code" | "3D">("blockly");
	// const [threeDData, setThreeDData] = useState({});
	const [viewType, setViewType] = useState('2d');

	const [editorLoaded, setEditorLoaded] = useState(false);
	const [addObj, setAddObj] = useState(undefined);
	const [editorLoading, setEditorLoading] = useState(false);

	const [pcbComponents, setPcbComponents] = useState<any>([]);
	const [deleteObj, setDeleteObj] = useState<any>('');
	const [hideObj, setHideObj] = useState<any>({
		name: '',
		visible: true,
	});
	const [file, setFile] = useState(null);

	const getTxtFile = (type: any) => {
		// type = "line" || "package"
		console.warn('Type', type);

		//fetch and return file url
	};

	useEffect(() => {
		console.warn('pcbComponents', pcbComponents, setDeleteObj, setHideObj);
	}, [pcbComponents]);

	useEffect(() => {
		console.warn('svgFile', file);
	}, [file]);

	useEffect(() => {
		setEditorLoading(true);
		if (dEditorRef?.current && editorLoaded)
			drawPcb(dEditorRef?.current, { ...sEditorRef?.current }, getPackageFile).then(
				(res: any) => {
					if (res) {
						setAddObj({ ...res, getTxtFile });
						pcbDesignViewType(dEditorRef?.current, '2d', setEditorLoading);
					}
				}
			);
	}, [dEditorRef, editorLoaded, getPackageFile, sEditorRef]);

	useEffect(() => {
		if (dEditorRef?.current) {
			setEditorLoading(true);
			pcbDesignViewType(dEditorRef?.current, viewType, setEditorLoading, false);
		}
	}, [dEditorRef, viewType]);

	useEffect(() => {
		if (deleteObj) {
			deleteObject(dEditorRef?.current, deleteObj);
			deleteObject(sEditorRef?.current, deleteObj);
		}
	}, [deleteObj, dEditorRef, sEditorRef]);

	useEffect(() => {
		if (hideObj) hideObjects(dEditorRef?.current, hideObj);
	}, [hideObj, dEditorRef]);

	return (
		<>
			<ElectroAddedParts
				data={pcbComponents}
				onDelete={setDeleteObj}
			/>
			<div className="md:px-16 pt-4">
				<div className=" ml-auto my-4 absolute z-10 right-20 top-0 sm:rounded-full bg-white items-center overflow-hidden sm:w-[70%] 2xl:w-[630px] flex flex-col sm:flex-row md:justify-between">
					<span
						onClick={() => setViewType('schematic')}
						className={`${
							viewType === 'schematic'
								? 'bg-[#441184] text-[#fff] z-[500]'
								: 'bg-white'
						} font-proxima-nova text-base 2xl:text-[18px] text-center transition-all cursor-pointer select-none duration-700 ease-in rounded-full px-[50px] py-[12px] w-full`}
					>
						Schematic Preview
					</span>
					<span
						onClick={() => setViewType('2d')}
						className={`${
							viewType === '2d' ? 'bg-[#441184] text-white z-[500]' : 'bg-white'
						} font-proxima-nova text-base 2xl:text-[18px] text-center transition-all  cursor-pointer select-none duration-700 ease-in rounded-full px-[30px] py-[12px] w-full sm:ml-[-40px]`}
					>
						2D Preview
					</span>

					<span
						onClick={() => setViewType('3d')}
						className={`${
							viewType === '3d' ? 'bg-[#441184] text-white ' : 'bg-white'
						} font-proxima-nova text-base 2xl:text-[18px] text-center transition-all cursor-pointer  select-none duration-700 ease-in rounded-full px-[30px] py-[12px] w-full sm:ml-[-40px]`}
					>
						3D Preview
					</span>
					{/* <span
						onClick={() => setViewType('2d')}
						className={`${
							viewType === '2d' ? 'bg-[#441184] text-white' : ''
						} font-sans text-base 2xl:text-lg text-center transition-all bg-white cursor-pointer select-none duration-700 ease-in rounded-full px-6 pb-0`}
					>
						2D
					</span>

					<span
						onClick={() => setViewType('3d')}
						className={`${
							viewType === '3d' ? 'bg-[#441184] text-white' : ''
						} font-sans text-base 2xl:text-lg text-center transition-all cursor-pointer bg-white select-none duration-700 ease-in rounded-full px-6`}
					>
						3D
					</span> */}
				</div>
				<div className="bg-shemetic">
					{editorLoading && (
						<Loader
							type="relative"
							isTransparentBg
						/>
					)}
					<ThreeJs
						{...{
							editorFile: 5,
							editorRef: dEditorRef,
							setEditorLoaded,
							editorName: 'Pcb',
							toolbar: 'electronicComponentDesign',
							noPopup: true,
							// noRestore: dEditorRef?.current ? false : !isRestored,
							noRestore: true,
							toolbarObj: addObj,
							setPcbComponents,
							setFile,
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default ElectronicsAddComponent;
