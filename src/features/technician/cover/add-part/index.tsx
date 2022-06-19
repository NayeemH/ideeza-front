import React, { useEffect, useRef, useState } from 'react';
import Confirmation from '@organisms/confirmation';
import Button from '@atoms/button';
import Steppers from '@molecules/steppers';
import AddPartForm from './addPartForm';
import { useForm } from 'react-hook-form';

import ThreeJs from '@organisms/threejs';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setCustomizeMenu } from '@layouts/private/sidebar/reducer';
import { useRouter } from 'next/router';
import { ApiDataType, apiService } from 'utils/request';
import {
	// loadFile,
	loadGltf,
} from '@organisms/threejs/layout/functions/onLoadFunctions/functions';

function AddPart() {
	const methods = useForm();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [step, setStep] = useState(0);
	// const selected_three_d_script = useAppSelector(
	//   (state) => state.sidebar.selected_three_d_script
	// );
	const editorRef = useRef<any>(null);

	const selected_block_data = useAppSelector((state) => state.sidebar.selected_block_data);
	const [threeJsEditorFile] = useState(1);

	const handleNext = () => {
		setStep(1);
	};

	const handleReset = () => {
		methods.reset();
		setStep(0);
	};

	useEffect(() => {
		setStep(0);
	}, []);

	// useEffect(() => {
	//   console.log('selected_three_d_script', selected_three_d_script);
	//   setThreeDData(selected_three_d_script);
	// }, [selected_three_d_script]);

	useEffect(() => {
		if (step === 0) {
			dispatch(setCustomizeMenu('cover'));
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
		else partTypeStr = `part/cover-part`;

		const fun = async () => {
			const apiData: ApiDataType = {
				method: 'get',
				url: `/${partTypeStr}/${selected_block_data.id}/`,
				token: true,
			};
			await apiService(apiData, (res: any, err: any) => {
				console.log(res);

				if (res) {
					if (editorRef?.current) {
						editorRef?.current?.clear();

						loadGltf(editorRef?.current, {
							id: selected_block_data.id,
							type: selected_block_data.block_type,
							file: res.data.three_d_file,
						});

						// loadFile(editorRef?.current, {
						//   id: selected_block_data.id,
						//   type: selected_block_data.block_type,
						//   file: res.data.three_d_script,
						// });
					}
					return;
				}
				console.log(err);
			});
		};
		if (selected_block_data?.id) {
			fun();
		}
	}, [selected_block_data]);

	return (
		<div className="w-full">
			<div className="flex justify-center">
				{/* <CoverStepper currentStep={step} /> */}
				<Steppers
					currentStep={step}
					className="md:w-2/4 w-full eina-font-sb03 md:text-2xl"
					options={['Add Part', 'Add Description', 'Added Successfully']}
					icons={{
						1: <span>1</span>,
						2: <span>2</span>,
						3: <span>3</span>,
					}}
				/>
			</div>
			{/* <div className=" "> */}
			<div className="pt-4 mt-[50px]">
				{step === 0 && (
					<>
						<div
							className="h-96 2xl:h-[600px] mb-6"
							style={{ position: 'relative' }}
						>
							<ThreeJs
								containerClass="h-[600px]"
								{...{
									editorRef,
									editorName: 'Cover',
									editorFile: threeJsEditorFile,
									toolbar: 'default',
									noPopup: editorRef?.current ? true : false,
								}}
							/>
						</div>
						<div className="w-full flex items-center justify-end mt-4 ">
							<Button
								onClick={handleNext}
								value="Next"
								classes={{ root: 'shadow-none' }}
								variant="contained"
								size="large"
								color="primary"
								className="bg-primary w-40 transform-none text-white text-base 2xl:text-[18px] font-proxima-nova py-[12px] min-h-0"
							/>
						</div>
					</>
				)}
				{step === 1 && (
					<>
						<div className="">
							<AddPartForm
								{...{
									editorRef,
									methods,
									setStep,
								}}
							/>
						</div>
					</>
				)}
				{step === 2 && (
					<div className=" h-[400px] 2xl:h-[600px] mb-6">
						<Confirmation
							iconEnd=""
							src="/images/success-add.png"
							value="Your Cover part is added."
							lableClass="text-[#333333] font-sans text-xl xl:text-3xl 2xl:text-4xl tracking-normal"
							lableClass2="text-[#333333] font-sans text-xl xl:text-3xl 2xl:text-4xl tracking-normal"
							btnValue="+ Add new part"
							btnClass="bg-primary rounded-[6px] px-[30px] mt-5 py-[15px] text-base 2xl:text-[18px] font-sans tracking-tight transform-none text-white"
							clickHandler={() => handleReset()}
							mainClass="bg-white h-[400px] 2xl:h-[600px] justify-center rounded-md p-7 py-20 flex flex-col items-center"
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default AddPart;
