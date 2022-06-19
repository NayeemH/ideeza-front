import React, { useEffect, useRef, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';
import Button from '@atoms/button';
import Steppers from '@molecules/steppers';
import { CircularProgress } from '@mui/material';
import Confirmation from '@organisms/confirmation';
import ThreeJs from '@organisms/threejs';
import { useForm } from 'react-hook-form';
import AddComponentForm from './AddComponentForm';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setCustomizeMenu } from '@layouts/private/sidebar/reducer';
import { useRouter } from 'next/router';
import { ApiDataType, apiService } from 'utils/request';
import {
	// loadFile,
	loadGltf,
} from '@organisms/threejs/layout/functions/onLoadFunctions/functions';
// import AddedParts from "@features/technician/code/add-component/addedParts";

interface AddedPartsProps {
	data?: any;
	setParts?: any;
}

const CoverAddComponent: React.FC = () => {
	const componentEditorFile = 101;
	const methods = useForm();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [step, setStep] = useState(1);
	const selected_block_data = useAppSelector((state) => state.sidebar.selected_block_data);
	// const selected_three_d_script = useAppSelector(
	//   (state) => state.sidebar.selected_three_d_script
	// );

	const editorRef = useRef<any>(null);

	const handleNext = () => {
		setStep((prev) => prev + 1);
	};

	const handleFinish = () => {
		methods.reset();
		setStep(1);
	};

	useEffect(() => {
		setStep(1);
	}, []);

	// useEffect(() => {
	//   setThreeDData(selected_three_d_script);
	//   console.log('selected_three_d_script', threeDData);
	// }, [selected_three_d_script]);

	useEffect(() => {
		if (step === 1) {
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
		console.log('SELECTED_BLOCK_DATA', selected_block_data);
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
				if (res) {
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
					return;
				}
				console.log(err);
			});
		};
		if (selected_block_data?.id) {
			fun();
		}
	}, [selected_block_data]);

	useEffect(() => {
		if (step === 1) {
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

	return (
		<div className="w-full">
			<div className="flex justify-center">
				<Steppers
					currentStep={step - 1}
					className="md:w-2/4 w-full eina-font-sb03 md:text-2xl"
					options={['Add Part', 'Add Description', 'Added Successfully']}
					icons={{
						1: <span>1</span>,
						2: <span>2</span>,
						3: <span>3</span>,
					}}
				/>
			</div>
			{/* data={data} should be passed as props in AddedParts  */}
			{step === 1 && <AddedParts />}
			{/* <div className="md:px-16 pt-4"> */}
			<div className="pt-4 mt-[50px]">
				{step === 1 && (
					<>
						<div className="w-72 grid grid-cols-2 ml-auto my-4 items-center border overflow-hidden bg-white border-solid border-grey-135 rounded-full"></div>
						<div
							className="w-full relative h-96 2xl:h-[600px] mb-6"
							style={{ position: 'relative' }}
						>
							<ThreeJs
								containerClass="h-[600px]"
								{...{
									editorRef,
									editorName: 'Cover',
									editorFile: componentEditorFile,
									toolbar: 'default',
									noPopup: editorRef?.current ? true : false,
								}}
							/>
						</div>
						<div className="w-full flex items-center justify-end">
							<Button
								onClick={handleNext}
								value="Next"
								classes={{ root: 'shadow-none' }}
								variant="contained"
								color="primary"
								className="bg-primary w-40 transform-none text-white text-base 2xl:text-[18px] font-proxima-nova py-[12px] min-h-0"
							/>
						</div>
					</>
				)}

				{step === 2 && (
					<>
						<div className="">
							<AddComponentForm
								{...{
									editorRef,
									methods,
									setStep,
								}}
							/>
						</div>
					</>
				)}
				{step === 3 && (
					<div className="h-96 my-6">
						<Confirmation
							iconEnd=""
							src="/images/success-add.png"
							value="Your Cover component is added."
							lableClass="text-[#333333] font-sans text-xl xl:text-3xl 2xl:text-4xl tracking-normal"
							lableClass2="text-[#333333] font-sans text-xl xl:text-3xl 2xl:text-4xl tracking-normal"
							btnValue="+ Add new component"
							btnClass="bg-primary rounded-[6px] px-[30px] mt-5 py-[15px] text-base 2xl:text-[18px] font-sans tracking-tight transform-none text-white"
							clickHandler={() => handleFinish()}
							mainClass="bg-white h-[400px] 2xl:h-[600px] justify-center rounded-md p-7 py-20 flex flex-col items-center"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default React.memo(CoverAddComponent);

const AddedParts: React.FC<AddedPartsProps> = ({ data, setParts }) => {
	const [show, setShow] = useState(false);

	return (
		<div>
			<div
				className={`w-96 bg-white rounded-bl-md shadow-md p-6 fixed z-20 transition-all ${
					show ? 'right-0' : '-right-96'
				}`}
			>
				<button
					className="bg-white px-4 py-3 rounded-l-md absolute -left-12 top-0 shadow-md z-10"
					onClick={() => setShow(!show)}
				>
					<FiShoppingCart size="20" />
				</button>
				<h3 className="text-primary text-md font-bold text-center mb-4">Added Parts</h3>
				<div className="h-60 overflow-y-auto">
					{Array.isArray(data) && data.length > 0 ? (
						<table className="w-full text-center">
							{data.map((item) => (
								<tr
									key={item.name}
									className="even:bg-gray-100"
								>
									<td
										className="text-gray-630 cursor-pointer"
										onClick={() => setParts(item?.source_code)}
									>
										{item?.name}
									</td>
									<td>
										<img
											src="https://via.placeholder.com/40/40/"
											alt="block"
										/>
									</td>
									<td>
										<button className="text-gray-630">
											<MdDeleteForever size="20" />
										</button>
									</td>
								</tr>
							))}
						</table>
					) : (
						<div className="flex justify-center h-full items-center">
							<CircularProgress size={50} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
