import Button from '@atoms/button';
import Label from '@atoms/label';
import { IElectronicsPart } from '@models/electronics';
import { Avatar } from '@mui/material';
// import CategorySelector from '@organisms/category-selector';
import React, { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { getExtensionFromFileName, useOutsideClickHandler } from 'utils/utils';
import CodeUploader from './CodeUploader';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { addElectronicsPartCode, createElectronicsPart } from 'request/electronics';
import { IFormValues } from '../..';
import { IUseAddPart } from '../../useAddPart';
import ThreeJs from '@organisms/threejs';
import { apiService } from '../../../../../../utils/request';
// import { save } from 'serialization/blocks';
import CategoryMultipleSelector from '@organisms/category-selector/CategoryMultipleSelector';
// import { AiOutlineDown } from 'react-icons/ai';
import { savePackageTypes } from '@organisms/threejs/layout/functions/onLoadFunctions/electronicParts/savePackage';
import Modal from '@atoms/modal';
// import { MdCancel } from 'react-icons/md';
import Confirmation from '@organisms/confirmation';
import { IoClose } from 'react-icons/io5';

const General = ({
	selectPart,
	setStep,
	threeDData,
	editorRef,
	partName,
	description,
	onChangePartName,
	onChangeDescription,
}: {
	selectPart?: IElectronicsPart;
	setStep: IUseAddPart;
	threeDData: any;
	editorRef: any;
	partName: any;
	description: any;
	onChangePartName(name: string): void;
	onChangeDescription(description: string): void;
}) => {
	const { register, getValues, reset, handleSubmit } = useFormContext();
	const codeUploadForm = useForm({
		mode: 'onSubmit',
	});

	const [savePackage, setSavePackage] = useState<any>({});
	const [snapshot, setSnapshot] = useState('');
	const [video, setVideo] = useState('');
	const [file, setFile] = useState('');
	const [editorLoaded, setEditorLoaded] = useState(false);
	const [openAgreeModal, setOpenAgreeModal] = useState(false);
	const [isPartComplete, setIsPartComplete] = useState(false);

	const [toggle, setToggle] = useState(false);
	const [isSubmiting, setSubmiting] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const [partCreated, setPartCreated] = useState(false);
	const [codeUploaded, setCodeUploaded] = useState(false);
	// const [selectedIcon, setSelectedIcon] = useState(0);
	const ref = React.useRef(null);
	useOutsideClickHandler(ref, () => setToggle(!toggle));

	const codeValue = codeUploadForm.watch();
	const { icon } = getValues();
	const formData = new FormData();
	useEffect(() => {
		if (codeValue?.language && codeValue?.file[0]) {
			const file = codeValue?.file[0];
			const extension = getExtensionFromFileName(file.name);
			if (extension === 'cpp' || extension === 'js') {
				formData.append('language', codeValue?.language);
				formData.append('file', codeValue?.file[0]);
			} else {
				toast.dismiss();
				toast.error('You can select only .cpp or .js files!');
			}
		}
	}, [codeValue]);

	// useEffect(() => {
	//   if (savePackage["3d"]) {
	//     setSavePackage((prev: any) => {
	//       const a = { ...prev };
	//       const newObj: any = {};
	//       Object.keys(a).forEach((e) => {
	//         if (threeDData[e] && threeDData[e].object) {
	//           newObj[e] = threeDData[e];
	//         } else {
	//           newObj[e] = a[e];
	//         }
	//       });
	//     });
	//   }
	// }, [savePackage]);

	useEffect(() => {
		if (editorRef?.current && editorLoaded)
			savePackageTypes(
				editorRef.current,
				threeDData,
				setSavePackage,
				setSnapshot,
				setVideo,
				setFile
			);
	}, [editorRef, editorLoaded]);

	const addCodeMutation = useMutation(addElectronicsPartCode, {
		onSuccess: async ({ data }) => {
			setSubmiting(false);
			reset();
			// setStep.set(0);
			if (editorRef?.current) editorRef?.current?.clear();
			setCodeUploaded(true);
			toast.success('Electronics part created successfully');
		},
		onError: (err: any) => {
			setSubmiting(false);
			toast.error('Failed to upload electronics code');
		},
	});
	const addPartMutation = useMutation(createElectronicsPart, {
		onSuccess: async (res) => {
			addCodeMutation.mutate({ id: res.data.id, reqBody: formData });

			const _formData: any = new FormData();
			_formData.append('simulation_video', video);

			await apiService(
				{
					method: 'patch',
					url: `/part/electronic-part/${res?.data?.id}/`,
					data: _formData,
					token: true,
				},
				(res: any) => {
					if (res) {
						setPartCreated(true);
						return;
					}
				}
			);

			if (editorRef?.current) editorRef?.current?.clear();
		},
		onError: (err: any) => {
			setSubmiting(false);
			toast.error('Failed to create electronics Part');
		},
	});

	const formSubmit = (data: IFormValues) => {
		if (data.package_type === '') {
			return toast.error('Please select package type!');
		}

		if (Number(data.total_pins) === 0) {
			return toast.error('Please input pin number!');
		}

		if (data.pin1_location === '') {
			return toast.error('Please select pin 1 location!');
		}

		if (data?.dimensions?.values?.length === 0) {
			return toast.error('Please input dimension values from the Add Part form 2nd step!');
		}

		/*const reqBody: any = new FormData();
	reqBody.append('qfn_dimensions', JSON.stringify({
	  package_type: data.package_type,
	  body_type: data.body_type,
	  name: data.name,
	  total_pins: data.total_pins,
	  pin1_location: data.pin1_location,
	  values: data?.dimensions?.values,
	}));

	reqBody.append('leg_meaning', JSON.stringify(data.leg_meaning));
	reqBody.append('chart', JSON.stringify(data.chart));
	reqBody.append('name', data.name);
	reqBody.append('image_svg', snapshot);
	reqBody.append('three_d_script', JSON.stringify(savePackage));
	reqBody.append('package', data.package_id);
	reqBody.append('simulation_video', video);*/

		const reqBody: any = {
			qfn_dimensions: {
				package_type: data.package_type,
				body_type: data.body_type,
				name: data.name,
				total_pins: data.total_pins,
				pin1_location: data.pin1_location,
				values: data?.dimensions?.values,
			},
			leg_meaning: data.leg_meaning,
			chart: data.chart,
			name: data.name,
			image_svg: snapshot,
			three_d_script: JSON.stringify(savePackage),
			package: data.package_id,
			//simulation_video: video,
		};

		if (partName) {
			reqBody.name = partName;
		}

		if (description) {
			reqBody.description = description;
		}

		if (data.component) {
			reqBody.component = data.component;
		}
		if (data.country) {
			reqBody.country = data.country;
		}
		if (data.category) {
			reqBody.category = data.category;
		}
		// if (data.category) {
		//   reqBody.append('category', data.category);
		// }
		if (selectedCategory) {
			reqBody.category = selectedCategory;
		}
		if (data.type) {
			//reqBody.is_visible = data.type === "public";
			reqBody.is_visible = true;
		}

		if (data.chart) {
			/*reqBody.chart = {
		...data.chart,
		label_x:
		  (data as any)?.chart?.label_x_value +
		  '' +
		  (data as any)?.chart?.label_x_option1 +
		  '' +
		  (data as any)?.chart?.label_x_option2,
		label_y:
		  (data as any)?.chart?.label_y_value +
		  '' +
		  (data as any)?.chart?.label_y_option1 +
		  '' +
		  (data as any)?.chart?.label_y_option2,
	  };

	  delete reqBody?.chart?.label_x_option1;
	  delete reqBody?.chart?.label_x_option2;
	  delete reqBody?.chart?.label_y_option1;
	  delete reqBody?.chart?.label_y_option2;
	  delete reqBody?.chart?.label_x_value;
	  delete reqBody?.chart?.label_y_value;*/
			reqBody.chart = [...(data.chart as any)];

			let chartDataHasError = false,
				chartDataErrorMessage = '';

			reqBody.chart.forEach(function (chartData: any, index: number) {
				delete reqBody?.chart[index].chart_type;
				delete reqBody?.chart[index]?.label_x_input;
				delete reqBody?.chart[index]?.label_y_input;
				delete reqBody?.chart[index]?.unit_x_one;
				delete reqBody?.chart[index]?.unit_x_two;
				delete reqBody?.chart[index]?.unit_y_one;
				delete reqBody?.chart[index]?.unit_y_two;

				if (reqBody?.chart[index]?.label_x === '') {
					chartDataHasError = true;
					chartDataErrorMessage = 'You have missed to input chart X label!';
					return;
				}

				if (reqBody?.chart[index]?.label_y === '') {
					chartDataHasError = true;
					chartDataErrorMessage = 'You have missed to input chart Y label!';
					return;
				}
			});

			if (chartDataHasError) {
				toast.error(chartDataErrorMessage);
				return;
			}
		}

		if (!reqBody?.qfn_dimensions?.values || reqBody?.qfn_dimensions?.values?.length === 0) {
			return toast.error('Pleasse input dimension values from the Add Part form 2nd step!');
		}

		if (!selectedCategory || Number(selectedCategory) < 1) {
			toast.error('Select a category!');
			return;
		}

		if (!(codeValue.language && codeValue.file[0])) {
			toast.error('Select Language and upload code file');
			return;
		}

		// console.log("submitting is false", setSubmiting);
		setSubmiting(true);
		addPartMutation.mutate(reqBody);
	};

	useEffect(() => {
		if (partCreated && codeUploaded) {
			setIsPartComplete(true);
			setPartCreated(false);
			setCodeUploaded(false);
		}
	}, [partCreated, codeUploaded]);

	return (
		<>
			<div>
				<div className="flex justify-between items-center py-[25px] px-[30px] bg-white border rounded-[6px] mb-4">
					<div className="flex items-center gap-4">
						<Avatar src="/images/choose-your-avatar/avatar7.png" />
						<div className="text-gray-600">
							<p className="text-base font-proxima-nova">{selectPart?.name}</p>
						</div>
					</div>
					<div className="flex gap-4 flex-wrap">
						<span className="px-[30px] py-[10px] border border-solid border-[#E7E7E7] text-[#787878] flex items-center gap-2 bg-[#FBFBFB] rounded-[5px] leading-[30px]">
							<img
								src="/images/icon/legs-chip.svg"
								alt="icon"
							/>
							<span className="text-base font-proxima-nova">Legs</span>
						</span>
						<span className="px-[30px] py-[10px] border border-solid border-[#E7E7E7] text-[#787878] flex items-center gap-2 bg-[#FBFBFB] rounded-[5px] leading-[30px]">
							<img
								src="/images/icon/chart-icon.svg"
								alt="icon"
							/>
							<span className="text-base font-proxima-nova">Chart</span>
						</span>
						<span className="px-[30px] py-[10px] border border-solid border-[#E7E7E7] text-[#787878] flex items-center gap-2 bg-[#FBFBFB] rounded-[5px] leading-[30px]">
							<span className="text-base font-proxima-nova">2D Preview</span>
						</span>
						<span className="px-[30px] py-[10px] border border-solid border-[#E7E7E7] text-[#787878] flex items-center gap-2 bg-[#FBFBFB] rounded-[5px] leading-[30px]">
							<span className="text-base font-proxima-nova">3D Preview</span>
						</span>
						<span className="px-[30px] py-[10px] border border-solid border-[#E7E7E7] text-[#787878] flex items-center gap-2 bg-[#FBFBFB] rounded-[5px] leading-[30px]">
							<img
								src="/images/-e-pdf.png"
								alt="icon"
							/>
							<span className="text-base font-proxima-nova">Datasheet</span>
						</span>
					</div>
				</div>
				{!isPartComplete ? (
					<form
						onSubmit={handleSubmit(formSubmit)}
						id="hook-form-elec-add-part"
					>
						<div className="px-[30px] bg-white">
							<div className="flex items-center border-b pt-[12px]">
								<Label
									value="Add Details of the Part"
									className="leading-tight font-sans texl-lg 2xl:text-2xl font-bold text-primary mb-[10px] flex-1"
								/>
								<Label
									value="Upload Base Code"
									className="leading-tight font-sans texl-lg 2xl:text-2xl font-bold text-primary mb-[10px] flex-1"
								/>
							</div>
							<div className="grid lg:grid-cols-2 grid-cols-1 justify-between gap-[30px] bg-white pb-[40px]">
								<div className="w-full">
									{/* <hr /> */}
									<div className="bg-white border rounded-[6px] p-[30px] mt-[20px]">
										<div className="flex items-center mb-[20px]">
											<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
												Name
											</label>
											<input
												className="pl-[20px] py-[12px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
												value={partName}
												onChange={(e: any) =>
													onChangePartName(e.target.value)
												}
											/>
										</div>
										<div className="flex items-center mb-[20px]">
											<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
												Category
											</label>

											<div className="w-full relative focus:border focus:border-primary">
												{/* <CategorySelector
                    control={control}
                    categoryType={'ELECTRONIC'}
                  /> */}
												<CategoryMultipleSelector
													categoryType={'ELECTRONIC'}
													onSelect={(id) => setSelectedCategory(id)}
												/>
											</div>
										</div>

										<div className="flex items-center mb-[20px]">
											<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
												Type
											</label>
											<select
												{...register('type')}
												className="pl-[20px] py-[12px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova form-select"
											>
												<option value="">Select Type</option>
												<option value="public">Public</option>
												<option value="private">Private</option>
											</select>
										</div>

										<div className="flex items-center mb-[20px]">
											<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
												Description
											</label>

											<textarea
												value={description}
												onChange={(e: any) =>
													onChangeDescription(e.target.value)
												}
												className="pl-[20px] py-[10px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova resize-none"
												placeholder="Type the description here"
												rows={3}
											/>
										</div>

										{/* <div className="flex items-center mb-[20px]">
                <label className="text-gray-700 text-base 2xl:text-xl font-sans tracking-tight w-1/5">
                  Use icon
                </label>
                <div className="relative w-4/5">
                  <Button
                    value="Choose from the list"
                    classes={{ root: 'shadow-none' }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                    className="bg-primary transform-none text-white text-base 2xl:text-xl w-full"
                  />
                  {toggle && (
                    <div
                      className="absolute w-full bg-white p-4 shadow-lg flex flex-wrap gap-4 z-10"
                      ref={ref}
                    >
                      {[...Array(8).fill('')].map((_, i) => (
                        <img
                          key={i}
                          src="https://via.placeholder.com/80"
                          alt=""
                        />
                      ))}

                      <label className="p-4 w-full text-center cursor-pointer">
                        <input
                          {...register('icon')}
                          type="file"
                          accept="image/png, image/jpeg"
                          hidden
                        />
                        {icon && icon[0] ? (
                          <span>
                            {icon[0].name}{' '}
                            <span className="text-primary underline">
                              Change icon
                            </span>
                          </span>
                        ) : (
                          <span className="text-primary underline">
                            Upload your own icon
                          </span>
                        )}
                      </label>
                    </div>
                  )}
                </div>
              </div> */}
									</div>
								</div>
								<div className="border mt-[20px] p-[30px] rounded-[6px]">
									<CodeUploader method={codeUploadForm} />
								</div>
							</div>
						</div>

						<div className="flex justify-between mt-8">
							<Button
								value="Back"
								onClick={() => setStep.backStep()}
								classes={{ root: 'shadow-none' }}
								variant="contained"
								color="inherit"
								className="bg-[#FBFBFB] border-opacity-50 border border-solid border-[#E6E6E6] w-40 transform-none text-gray-600 text-base 2xl:text-[18px] font-proxima-nova min-h-0 py-[12px]"
							/>

							<Button
								value="Finish"
								// type="submit"
								classes={{ root: 'shadow-none' }}
								variant="contained"
								color="primary"
								className="bg-primary w-40 transform-none text-white text-base font-proxima-nova rounded-[5px] min-h-0 2xl:text-[18px]"
								loading={isSubmiting}
								// disabled={isSubmiting}
								onClick={() => setOpenAgreeModal(true)}
							/>
						</div>
						<Modal
							open={openAgreeModal}
							width="md"
							className={{ paper: ' rounded-[10px] p-[45px] 2xl:w-[800px]' }}
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
											form="hook-form-elec-add-part"
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
							value="Your Electric part is added."
							lableClass="text-[#333333] font-sans text-xl xl:text-3xl 2xl:text-4xl tracking-normal"
							lableClass2="text-[#333333] font-sans text-xl xl:text-3xl 2xl:text-4xl tracking-normal"
							btnValue="+ Add new part"
							btnClass="bg-primary rounded-[6px] px-[30px] mt-5 py-[15px] text-base 2xl:text-[18px] font-sans tracking-tight transform-none text-white"
							clickHandler={() => setStep.set(0)}
							mainClass="bg-white h-[400px] 2xl:h-[600px] justify-center rounded-md p-7 py-20 flex flex-col items-center"
						/>
					</div>
				)}
			</div>
			{/* {isPartComplete === 2 && <div>
				complete
				<Button
					value="Create Part Again"
					// type="submit"
					// classes={{ root: 'shadow-none' }}
					variant="contained"
					color="primary"
					className="bg-primary w-40 transform-none text-white text-base font-proxima-nova rounded-[5px] min-h-0 2xl:text-[18px]"
					loading={isSubmiting}
					// disabled={isSubmiting}
					onClick={() => (setStep.set(0))}
				/>
			</div>} */}

			<div
				style={{
					width: '640px',
					height: '360px',
					position: 'absolute',
					// top: 0,
					// left: 0,
					top: '-110%',
					left: '-150%',
					pointerEvents: 'none',
					// zIndex: 999999,
				}}
				className="fixed-canvas"
			>
				<ThreeJs
					{...{
						editorFile: 3,
						editorRef,
						setEditorLoaded,
						noStorage: true,
						noPopup: true,
					}}
				/>
			</div>
		</>
	);
};

export default General;
