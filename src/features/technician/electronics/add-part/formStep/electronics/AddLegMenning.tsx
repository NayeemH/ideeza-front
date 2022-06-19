import React, { useEffect, useState } from 'react';
import Button from '@atoms/button';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import ThreeJs from '@organisms/threejs';
import { renderPackage } from '@organisms/threejs/layout/functions/onLoadFunctions/electronicParts/renderPackage';
import {
	selectLeg,
	setLegValues,
} from '@organisms/threejs/layout/functions/onLoadFunctions/electronicParts/legMeaning';
import { toast } from 'react-toastify';
import { getExceptedArray } from 'utils/utils';

export default function AddLegMenning({
	viewType,
	// formData,
	threeDData,
	// setThreeDData,
	setViewType,
	editorRef,
	onPinRowsHasError,
}: any) {
	const {
		register,
		control,
		getValues,
		watch,
		setValue,
		// setError,
		clearErrors,
		// trigger,
		formState: { errors },
	} = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'leg_meaning',
	});

	const legMeaningFields = watch('leg_meaning');

	const { editData, formLegMeaningDataPlaced } = getValues();

	const [currentleg, setCurrentLeg] = useState<any>();
	const [focusedLeg, setFocusedLeg] = useState<any>('');
	// const [legValues, setLegValues] = useState<any>({});

	// const __leg_meaning_values = getValues()?.leg_meaning;

	// const [viewType, setViewType] = useState("");

	let legMeanings = getValues()?.leg_meaning;

	const getNewPinNo = () => {
		let newPinNo: number | string = '';
		const totalPins = Number(getValues()?.total_pins);
		const possiblePinsArray = Array.from({ length: totalPins }, (_, i) => i + 1);

		if (legMeanings && legMeanings?.length > 0) {
			legMeanings = legMeanings.map((item: any) => {
				return Number(item?.pin_no);
			});

			const excepted = getExceptedArray(possiblePinsArray, legMeanings);
			if (excepted && excepted.length > 0) {
				newPinNo = excepted[0];
			}
		}

		return newPinNo;
	};

	const pinNoIsValid = (pinRow: any) => {
		const totalPins = Number(getValues()?.total_pins);
		const pin_no = Number(pinRow?.pin_no);

		let pinNoIndex = -1;
		const indexOfRowsExceptThis = legMeaningFields?.indexOf(pinRow);
		if (indexOfRowsExceptThis > -1) {
			const clonnedLegMeanings = [...legMeaningFields];
			clonnedLegMeanings?.splice(indexOfRowsExceptThis, 1);

			pinNoIndex = clonnedLegMeanings?.findIndex((x: any) => Number(x?.pin_no) === pin_no);
		}

		if (pin_no === 0 || pin_no > totalPins || pinNoIndex > -1) {
			return false;
		}

		return true;
	};

	const pinNumbersHasError = () => {
		let hasError = false;

		if (legMeaningFields && legMeaningFields?.length > 0) {
			legMeaningFields?.forEach((field: any) => {
				if (!pinNoIsValid(field)) {
					hasError = true;
				}
			});
		}

		return hasError;
	};

	const pinRowsHasError = pinNumbersHasError();

	useEffect(() => {
		if (typeof onPinRowsHasError === 'function') {
			onPinRowsHasError(pinRowsHasError);
		}
	}, [pinRowsHasError]);

	useEffect(() => {
		const subscription = watch((data) => {
			setLegValues(editorRef.current, data);
		});
		return () => subscription.unsubscribe();
	}, [getValues('leg_meaning')]);

	useEffect(() => {
		if (editorRef?.current) {
			renderPackage(editorRef.current, threeDData, undefined, viewType, 'legMeaning');
		}
	}, [editorRef, threeDData, viewType]);
	useEffect(() => {
		if (editorRef.current.scene.children[1]?.children[1]?.children.length === 32) {
			const pinZero = editorRef.current.scene.children[1]?.children[1].children[0].position;
			editorRef.current.scene.children[1]?.children[1]?.children[0].position.set(
				pinZero.x,
				0.378,
				pinZero.z
			);

			const pinSeven = editorRef.current.scene.children[1]?.children[1].children[7].position;
			editorRef.current.scene.children[1]?.children[1]?.children[7].position.set(
				pinSeven.x,
				-0.378,
				pinSeven.z
			);

			const pinSixteen =
				editorRef.current.scene.children[1]?.children[1].children[16].position;
			editorRef.current.scene.children[1]?.children[1]?.children[16].position.set(
				pinSixteen.x,
				-0.378,
				pinSixteen.z
			);

			const pinTwentyThree =
				editorRef.current.scene.children[1]?.children[1].children[23].position;
			editorRef.current.scene.children[1]?.children[1]?.children[23].position.set(
				pinTwentyThree.x,
				0.378,
				pinTwentyThree.z
			);
		}
	}, [editorRef.current.scene.children[1]?.children[1]?.children]);

	useEffect(() => {
		console.log('CurrentLeg', 0);
		selectLeg(editorRef.current, 0);
	}, []);

	useEffect(() => {
		selectLeg(editorRef.current, focusedLeg);
	}, [focusedLeg]);

	useEffect(() => {
		console.log('EDIT DATA', editData);

		if (editData && editData?.id) {
			const leg_meaning = editData?.leg_meaning ?? [];
			const _leg_meaning: any = [];

			if (leg_meaning.length > 0) {
				leg_meaning.forEach((item: any) => {
					_leg_meaning.push({
						max_value: item?.max_value,
						min_value: item?.min_value,
						pin_name: item?.pin_name,
						pin_no: item?.pin_no,
						pin_property_one: '',
						pin_property_two: '',
					});
				});
			}

			setValue('leg_meaning', _leg_meaning);
			setValue('formLegMeaningDataPlaced', true);
		}
	}, [editData]);

	// const formValues = getValues();
	// useEffect(() => {
	// 	console.log('Form Values', formValues);
	// }, [formValues]);

	return (
		<div className="w-full grid lg:grid-cols-2 grid-cols-1 items-start gap-y-2 md:gap-y-0 divide-x-[1px] divide-[#E6E6E6]">
			<div className="pr-[30px]">
				<div className="bg-white w-full pt-4 pl-0 overflow-x-auto h-full border rounded-[10px]">
					<div className="grid grid-cols-6 mb-4">
						<h4 className="text-base lg:text-[14px] xl:text-base ml-5 md:pr-4">
							Pin No
						</h4>
						<h4 className="text-base lg:text-[14px] xl:text-base">Pin Name</h4>
						<h4 className="text-base lg:text-[14px] xl:text-base col-span-2 text-center">
							Pin Property
						</h4>
						<h4 className="text-base lg:text-[14px] xl:text-base">Min Value</h4>
						<h4 className="text-base lg:text-[14px] xl:text-base">Max Value</h4>
					</div>
					{legMeaningFields.map((field: any, index: number) => (
						<div
							className="w-full grid grid-cols-6 gap-2 relative mb-2"
							key={field.id}
						>
							<div>
								<input
									//value={index + 1}
									className="w-12 h-10 ml-5 lg:h-9 2xl:h-12 lg:py-0 2xl:py-3 pl-[20px] py-[15px] border border-solid rounded-[6px] bg-[#FBFBFB] outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova border-[#E6E6E6] "
									style={{
										border: pinNoIsValid(field)
											? '1px solid #000000'
											: '1px solid red',
										outline: 0,
									}}
									{...register(`leg_meaning.${index}.pin_no` as const)}
									onClick={() => setFocusedLeg(field?.pin_no)}
								/>
							</div>
							<div>
								<input
									type="text"
									placeholder="Name"
									className="h-10 flex-1 w-[5rem] xl:w-24 2xl:w-28 text-gray-700 lg:h-9 2xl:h-12 lg:py-0 2xl:py-3 lg:pr-7 2xl:pr-10 text-[14px] 2xl:text-base pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] outline-none placeholder-[#B9B9B9] font-proxima-nova"
									{...register(`leg_meaning.${index}.pin_name` as const)}
									onClick={() => setFocusedLeg(index + 1)}
								/>
								{errors?.leg_meaning?.[index]?.pin_name && (
									<p className="text-red-400 text-xs">
										{errors?.leg_meaning?.[index]?.pin_name.message}
									</p>
								)}
							</div>
							<div className="mx-auto xl:m-auto gap-1 2xl:gap-0 2xl:mx-auto justify-center  flex flex-wrap col-span-2">
								<div>
									<select
										className="form-select mr-2 lg:h-9 2xl:h-12 lg:py-0 2xl:py-3 lg:pr-7 2xl:pr-10 text-[14px] 2xl:text-base py-[8px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] outline-none placeholder-[#B9B9B9] font-proxima-nova"
										// style={{ width: 60 }}
										{...register(
											`leg_meaning.${index}.pin_property_one` as const
										)}
										onClick={() => setFocusedLeg(index + 1)}
									>
										<option value="">Select</option>
										{[
											{ title: 'G', value: 'G' },
											{ title: 'M', value: 'M' },
											{ title: 'K', value: 'K' },
											{ title: '0', value: '0' },
											{ title: 'm', value: 'm' },
											{ title: 'u', value: 'u' },
											{ title: 'n', value: 'n' },
											{ title: 'A', value: 'A' },
											{ title: 'p', value: 'p' },
										].map((item, i) => (
											<option
												value={item?.value}
												key={i}
											>
												{item?.title}
											</option>
										))}
									</select>
									{errors?.leg_meaning?.[index]?.pin_property_one && (
										<p className="text-red-400 text-xs">
											{errors?.leg_meaning?.[index]?.pin_property_one.message}
										</p>
									)}
								</div>
								<div>
									<select
										className="form-select mr-2 lg:h-9 2xl:h-12 lg:py-0 2xl:py-3 lg:pr-7 2xl:pr-10 text-[14px] 2xl:text-base py-[8px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] outline-none placeholder-[#B9B9B9] font-proxima-nova"
										// style={{ width: 60 }}
										{...register(
											`leg_meaning.${index}.pin_property_two` as const,
											{
												required: 'Required',
											}
										)}
										disabled={
											getValues(`leg_meaning.${index}.pin_property_one`) ===
											'0'
										}
										onChange={(e) => {
											setValue(
												`leg_meaning.${index}.pin_property`,
												getValues(`leg_meaning.${index}.pin_property_one`) +
													e.target.value
											);
											clearErrors(`leg_meaning.${index}.pin_property_two`);
										}}
										onClick={() => setFocusedLeg(index + 1)}
									>
										<option value="">Select</option>
										{['A', 'V', 'f', 's', 'Hz', 'ppm', 'C', '%'].map(
											(item, i) => (
												<option
													value={item}
													key={i}
												>
													{item}
												</option>
											)
										)}
									</select>
									{errors?.leg_meaning?.[index]?.pin_property_two && (
										<p className="text-red-400 text-xs">
											{errors?.leg_meaning?.[index]?.pin_property_two.message}
										</p>
									)}
								</div>
							</div>

							<div>
								<input
									type="number"
									placeholder="Min"
									className="flex-1 xl:w-[4rem] 2xl:w-[5rem] h-10 text-gray-700 form-input lg:h-9 2xl:h-12 lg:py-0 2xl:py-3 text-[14px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] outline-none placeholder-[#B9B9B9] font-proxima-nova"
									{...register(`leg_meaning.${index}.min_value` as const)}
									onClick={() => setFocusedLeg(index + 1)}
									step="0.01"
								/>
								{errors?.leg_meaning?.[index]?.min_value && (
									<p className="text-red-400 text-xs">
										{errors?.leg_meaning?.[index]?.min_value.message}
									</p>
								)}
							</div>
							<div>
								<input
									type="number"
									placeholder="Max"
									className="flex-1 xl:w-[4rem] 2xl:w-[5rem] h-10 text-gray-700 form-input lg:h-9 2xl:h-12 lg:py-0 2xl:py-3 text-[14px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] outline-none placeholder-[#B9B9B9] font-proxima-nova"
									{...register(`leg_meaning.${index}.max_value` as const)}
									onClick={() => setFocusedLeg(index + 1)}
									step="0.01"
								/>
								{errors?.leg_meaning?.[index]?.min_value && (
									<p className="text-red-400 text-xs">
										{errors?.leg_meaning?.[index]?.min_value.message}
									</p>
								)}
							</div>

							{/* {(legMeanings[index]?.pin_property_one === 'Analog' ||
								legMeanings[index]?.pin_property_one === 'Digital') && (
									<>
										<div>
											<input
												type="number"
												placeholder="Min"
												className="flex-1 border rounded-none border-gray-725  xl:w-24 2xl:w-[5rem] h-10 text-gray-700 bg-white form-input lg:h-9 2xl:h-12 lg:py-0 2xl:py-3 text-[14px] "
												{...register(
													`leg_meaning.${index}.min_value` as const,
													{
														required: 'Required',
													}
												)}
												onClick={() => setFocusedLeg(index + 1)}
											/>
											{errors?.leg_meaning?.[index]?.min_value && (
												<p className="text-red-400 text-xs">
													{errors?.leg_meaning?.[index]?.min_value.message}
												</p>
											)}
										</div>
										<div>
											<input
												type="number"
												placeholder="Max"
												className="flex-1 border rounded-none border-gray-725 xl:w-24 2xl:w-[5rem] h-10 text-gray-700 bg-white form-input lg:h-9 2xl:h-12 lg:py-0 2xl:py-3 text-[14px] "
												{...register(
													`leg_meaning.${index}.max_value` as const,
													{
														required: 'Required',
													}
												)}
												onClick={() => setFocusedLeg(index + 1)}
											/>
											{errors?.leg_meaning?.[index]?.min_value && (
												<p className="text-red-400 text-xs">
													{errors?.leg_meaning?.[index]?.min_value.message}
												</p>
											)}
										</div>
									</>
								)}

							{(legMeanings[index]?.pin_property_one === 'Clock' ||
								legMeanings[index]?.pin_property_one === 'Power' ||
								legMeanings[index]?.pin_property_one === 'Positive' ||
								legMeanings[index]?.pin_property_one === 'Negative') && (
									<>
										<div>
											<input
												type="number"
												placeholder="Value"
												className="flex-1 border rounded-none border-gray-725  xl:w-24 2xl:w-[5rem] h-10 text-gray-700 bg-white form-input lg:h-9 2xl:h-12 lg:py-0 2xl:py-3 text-[14px] "
												{...register(
													`leg_meaning.${index}.min_value` as const,
													{
														required: 'Required',
													}
												)}
												onClick={() => setFocusedLeg(index + 1)}
											/>
											{errors?.leg_meaning?.[index]?.min_value && (
												<p className="text-red-400 text-xs">
													{errors?.leg_meaning?.[index]?.min_value.message}
												</p>
											)}
										</div>
									</>
								)} */}

							{/* <div>
								<Button
									value="Origin"
									className="bg-primary w-10 transform-none text-white text-base 2xl:text-sm"
									variant="contained"
									color="primary"
									onClick={() => {
										if (editorRef.current.selected) {
											editorRef.current.selected.position.set(0, 0, 0);
											editorRef.current.selected = null;
											editorRef.current.signals.reRender.dispatch();
											editorRef.current.signals.objectSelected.dispatch(null);
										}
									}}
								/>
							</div> */}
							{fields.length > 1 && (
								<button
									type="button"
									onClick={() => remove(index)}
									className="hover:text-red-400 absolute right-0 p-2 hover:cursor-pointer"
								>
									<IoClose
										size="20"
										className="text-primary"
									/>
								</button>
							)}
						</div>
					))}

					<div className="flex justify-end items-end h-[250px]">
						{getValues()?.leg_meaning?.length < Number(getValues()?.total_pins) &&
							!pinRowsHasError && (
								<Button
									onClick={() => {
										const data = getValues()?.leg_meaning;
										for (let i = 0; i < data.length; i++) {
											if (data[i]?.pin_name === '') {
												toast.error('Enter pin name!');
												return;
											}

											/* if(data[i]?.pin_property_one === "") {
						  toast.error("Select pin property one!");
						  return;
						} */

											if (
												data[i]?.pin_property_one !== '0' &&
												data[i]?.pin_property_two === ''
											) {
												toast.error('Select pin property two!');
												return;
											}

											if (
												data[i]?.pin_property_one === 'Analog' ||
												data[i]?.pin_property_one === 'Digital'
											) {
												if (data[i]?.min_value === '') {
													toast.error('Enter min value!');
													return;
												}

												if (data[i]?.max_value === '') {
													toast.error('Enter max value!');
													return;
												}
											}

											if (
												data[i]?.pin_property_one === 'Clock' ||
												data[i]?.pin_property_one === 'Power' ||
												data[i]?.pin_property_one === 'Positive' ||
												data[i]?.pin_property_one === 'Negative'
											) {
												if (data[i]?.min_value === '') {
													toast.error('Enter value!');
													return;
												}
											}

											if (data[i]?.pin_property === '') {
												toast.error('Select pin property!');
												return;
											}
										}

										append({
											pin_no: getNewPinNo(),
											pin_name: '',
											pin_property: '',
											min_value: undefined,
											max_value: undefined,
										});
									}}
									value=" + Add new leg meaning"
									className="bg-gray-375 w-full transform-none py-3 rounded-none text-md text-primary tracking-tight mt-4"
								/>
							)}
					</div>
				</div>
			</div>

			{/* <div className="h-[403px] bg-[#E6E6E6] w-[1px] absolute right-[42%]"></div> */}
			<div className="pl-[30px]">
				<div
					className="relative"
					style={{ width: '100%', position: 'relative', height: '400px' }}
				>
					<ThreeJs
						{...{
							editorFile: 3,
							editorRef,
							editorType: 'legMeaning',
							hideSidePanel: true,
							setCurrentLeg,
							noPopup: true,
						}}
					/>
					<div className="w-[250px] absolute top-0 right-1 grid grid-cols-2 bg-white ml-auto my-4 items-center border overflow-hidden border-solid border-grey-135 rounded-full md:-mb-24 mr-5 md:mr-8">
						<span
							onClick={() => setViewType('2d')}
							className={`${
								viewType === '2d' ? 'bg-[#441184] text-white' : 'bg-white'
							} text-base 2xl:text-lg text-center transition-all cursor-pointer select-none duration-700 ease-in rounded-full px-6`}
						>
							2D
						</span>

						<span
							onClick={() => setViewType('3d')}
							className={`${
								viewType === '3d' ? 'bg-[#441184] text-white ' : 'bg-white'
							} text-base 2xl:text-lg text-center transition-all cursor-pointer  select-none duration-700 ease-in rounded-full px-6`}
						>
							3D
						</span>
					</div>
				</div>
			</div>

			{/* <img
        src="https://image.shutterstock.com/image-vector/high-tech-electronic-circuit-board-260nw-1191768775.jpg"
        style={{ width: "100%" }}
        className="shadow-custom-textarea p-3"
        alt="img"
      /> */}
		</div>
	);
}
