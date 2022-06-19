import React, { useEffect, useState } from 'react';
import PillButton from '@molecules/pill-buttons';
import Confirmation from '@organisms/confirmation';
import hljs from 'highlight.js/lib/common';
import Button from '@atoms/button';
import Steppers from '@molecules/steppers';
import AddedParts from './addedParts';
// import CustomBlockly from '@organisms/blockly';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import { useMutation } from 'react-query';
import Editor from 'react-simple-code-editor';
import { useForm } from 'react-hook-form';
import { createComponent } from '../request';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { resetState, setCustomizeMenu } from '@layouts/private/sidebar/reducer';
import { useRouter } from 'next/router';
import CategoryMultipleSelector from '@organisms/category-selector/CategoryMultipleSelector';
import CreateComponentWorkspace from '@features/blockly/Shared/createComponentWorkspace';
import Modal from '@atoms/modal';
import { IoClose } from 'react-icons/io5';
import Label from '@atoms/label';

// console.log()

interface IFormData {
	category?: string;
	name?: string;
	description?: string;
	type?: string;
}

const CodeAddComponent: React.FC = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		register,
		// control,
		setValue,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormData>();
	const [active, setActive] = useState<'blockly' | 'code' | '3D'>('blockly');
	const [visible] = useState();
	const [svgCode, setSVGCode] = useState();
	const [xmlCode, setXMLCode] = useState<any>('');
	const [jsCode, setJsCode] = useState();
	const [blockCode, setBlockCode] = useState<any>();
	const [editorScript, setEditorScript] = useState<any>();
	const [editedJsCode, setEditedJsCode] = useState<string>('');
	const [isSubmiting, setSubmiting] = useState(false);
	const [step, setStep] = useState(1);
	const [resetCode, setResetCode] = useState(false);
	const selected_block_data = useAppSelector((state) => state.sidebar.selected_block_data);
	const [removedBlocks, setRemovedBlocks] = useState<any[]>([]);
	const [openAgreeModal, setOpenAgreeModal] = useState(false);

	const addComponentMutation = useMutation(createComponent, {
		onSuccess: () => {
			setSubmiting(false);
			reset();
			setStep(3);
			dispatch(resetState());
			toast.success('Code Component Added successfully');
		},
		onError: (err: any) => {
			console.error(err);
			toast.error(err.response.data.message);
		},
	});

	const handleComponetCounter = () => {
		const xml = '<xml xmlns="https://developers.google.com/blockly/xml"></xml>';
		if (step === 1 && xmlCode !== xml) {
			setStep(2);
		}
	};

	const handleFormSubmit = (data: IFormData) => {
		if (!data.category || Number(data.category) === 0) {
			toast.error('Please select a category!');
			return;
		}

		const reqBody = {
			name: data.name,
			editor_script: editorScript,
			image_svg: svgCode + '',
			description: data.description,
			category: data.category,
			component_type: 'CODE',
			//is_visible: data.type === "public" ? true : false,
			is_visible: true,
		};
		addComponentMutation.mutate(reqBody);
		console.log('reqBody: ', reqBody);
	};
	const handleComponetBackCounter = () => {
		setStep((prev) => prev - 1);
	};

	const handleReset = () => {
		setXMLCode('');
		setEditorScript('');
		setStep(1);
		setResetCode(true);
	};

	useEffect(() => {
		setEditedJsCode(jsCode ?? '');
	}, [jsCode]);

	useEffect(() => {
		dispatch(resetState());
	}, []);

	useEffect(() => {
		if (step === 1) {
			dispatch(setCustomizeMenu('blockly'));
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

	useEffect(() => {}, [selected_block_data]);

	useEffect(() => {
		console.log('removedBlocks', removedBlocks);
	}, [removedBlocks]);

	const xmlll =
		'<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id=",ezPX=gP1cXqOpf-w(8B">ss</variable><variable id="#RTfb|r)%?{~{pbR]2Na">j</variable></variables><block type="codepart" id="2.^_D(di+9-/|JIhBv*e" x="270" y="210"><field name="NAME" id=",ezPX=gP1cXqOpf-w(8B">ss</field><field name="NAME" id=",ezPX=gP1cXqOpf-w(8B">ss</field></block></xml>';
	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xmlll, 'text/xml');

	return (
		<div className="w-full">
			<div className="flex justify-center">
				{/* <ComponentStepper currentStep={step - 1} /> */}
				<Steppers
					currentStep={step - 1}
					className="md:w-3/4 w-full md:text-xl"
					options={['Add Part', 'Add Description', 'Added Successfully']}
					icons={{
						1: <span>1</span>,
						2: <span>2</span>,
						3: <span>3</span>,
					}}
				/>
			</div>
			<div className="md:px-16 pt-4">
				{step === 1 && (
					<AddedParts
						onRemovePart={(item: any) => {
							const removed_blocks = [...removedBlocks];
							removed_blocks.push(item);

							setRemovedBlocks((prev) => removed_blocks);
						}}
					/>
				)}

				{step === 1 && (
					<>
						<PillButton
							setActive={setActive}
							active={active}
							pillValueFrist={'Block Preview'}
							pillValueSecond={'Code Preview'}
						/>
						<div className="w-full relative h-96 2xl:h-[600px] mb-6 mt-[10px]">
							<div
								className={`${
									active === 'blockly' ? 'opacity-100 z-10' : 'opacity-0'
								} w-full absolute top-0 left-0 h-full`}
							>
								<CreateComponentWorkspace
									xmlData={xmlCode}
									// editorScript={editorScript}
									onChangeXml={(xml: any, partBlocks: any[], blockCode: any) => {
										const editor_script = {
											type: 'componentCreate',
											xmlData: xml,
											blocks: [...partBlocks],
										};
										// console.log('xmlonclick: ', xml);
										// console.log("blockCodeCOmponent: ", blockCode);
										setBlockCode(blockCode);
										setXMLCode(xml);
										setEditorScript(JSON.stringify(editor_script));
										// alert(JSON.stringify(editor_script));
										// setBlockType(xml);
									}}
									onChangeSvgData={(svg) => setSVGCode(svg)}
									resetCode={resetCode}
									setResetCode={setResetCode}
								/>
							</div>
							<div
								className={`${
									active === 'code' ? 'opacity-100 z-10' : 'opacity-0'
								} w-full absolute top-0 left-0 h-full`}
							>
								<div>{blockCode}</div>
							</div>
							<div
								className={`${
									active === 'code' ? 'opacity-100 z-10' : 'opacity-0 '
								} w-full absolute top-0 left-0 h-full`}
							>
								<Editor
									value={editedJsCode ?? ''}
									onValueChange={(code: any) => setEditedJsCode(code)}
									highlight={(code: any) =>
										hljs.highlight(code, {
											language: 'js',
											ignoreIllegals: false,
										}).value
									}
									padding={10}
									style={{
										fontFamily: '"Fira code", "Fira Mono", monospace',
										fontSize: 16,
									}}
								/>
							</div>
						</div>
						<div className="flex justify-end">
							<Button
								onClick={handleComponetCounter}
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
					<div className="w-full">
						<form
							onSubmit={handleSubmit(handleFormSubmit)}
							id="hook-form-code-add-component"
						>
							<div className="w-full mb-6 bg-white px-[30px] pt-[20px] rounded-[10px]">
								<div className="mb-4">
									<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap font-bold mb-2">
										Component Name
									</label>
									<input
										{...register('name', { required: 'Enter name' })}
										type="text"
										placeholder="Component Name"
										maxLength={255}
										className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
									/>
									{errors?.name && (
										<p className="text-red-400 text-xs">
											{errors.name.message}
										</p>
									)}
								</div>

								<div className="flex gap-8 items-between mb-4">
									<div className="flex-1">
										<label className="text-gray-600 tracking-tight text-base 2xl:text-xl font-sans font-bold mr-4">
											Category
										</label>
										<div className="mt-2">
											{/*<CategorySelector {...{ control }} />*/}
											<CategoryMultipleSelector
												categoryType={'CODE'}
												onSelect={(id) => setValue('category', id)}
											/>
											{errors?.category && (
												<p className="text-red-400 text-xs absolute">
													{errors.category.message}
												</p>
											)}
										</div>
									</div>
									<div>
										<label className="text-gray-600 tracking-tight text-base 2xl:text-xl font-sans font-bold mr-3">
											Type
										</label>
										<CustomDropDownMenu
											selectOptions={[
												{
													name: 'Public',
													value: 'public',
												},
												{
													name: 'Private',
													value: 'private',
												},
											]}
											inputClasses="h-12 rounded-sm w-48 pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova mt-2"
											labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 text-sm font-medium focus:outline-none text-gray-600"
											labelClasses="capitalize text-gray-600 font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
											labelWrapperClass="flex cursor-pointer md:relative"
											dropDownClasses="origin-top-right z-20 mt-0 w-48 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
											placeholder="Select Type"
											change={(e: any) => setValue('type', e)}
											selectedValue={visible}
										/>
									</div>
								</div>
								<div className="mb-6 pb-4">
									<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap font-bold mb-2 ">
										Description
									</label>
									<textarea
										{...register('description')}
										placeholder="Type the description here..."
										maxLength={255}
										className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
										rows={10}
									/>
								</div>
							</div>
							<div className="w-full flex items-center justify-between mt-4 ">
								<Button
									type="button"
									onClick={handleComponetBackCounter}
									value="Back"
									classes={{ root: 'shadow-none' }}
									variant="contained"
									color="primary"
									className="bg-[#FBFBFB] border-opacity-50 border border-solid border-[#E6E6E6] w-40 transform-none text-gray-600 text-base 2xl:text-xl font-proxima-nova min-h-0 py-[12px]"
								/>
								<Button
									// type="submit"
									onClick={() => setOpenAgreeModal(true)}
									value="Next"
									classes={{ root: 'shadow-none' }}
									variant="contained"
									color="primary"
									className="bg-primary w-40 transform-none text-white text-base 2xl:text-[18px] font-proxima-nova py-[12px] min-h-0"
									loading={isSubmiting}
									disabled={isSubmiting}
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
												form="hook-form-code-add-component"
												className="bg-primary text-white font-normal font-proxima-nova rounded-[6px] py-[13px] px-[30px]"
												onClick={() => {
													handleComponetCounter();
													setOpenAgreeModal(false);
												}}
											>
												Agree
											</button>
										</div>
									</>
								}
								close={() => setOpenAgreeModal(false)}
							/>
						</form>
					</div>
				)}

				{step === 3 && (
					<Confirmation
						iconEnd=""
						src="/images/success-add.png"
						value="Your component is added."
						lableClass="text-[#333333] font-sans text-xl xl:text-3xl 2xl:text-4xl tracking-normal"
						lableClass2="text-[#333333] font-sans text-xl xl:text-3xl 2xl:text-4xl tracking-normal"
						btnValue="+Add new part"
						btnClass="bg-primary rounded-[6px] px-[30px] mt-5 py-[15px] text-base 2xl:text-[18px] font-sans tracking-tight transform-none text-white"
						clickHandler={() => handleReset()}
						mainClass="bg-white h-[400px] 2xl:h-[600px] justify-center rounded-md p-7 py-20 flex flex-col items-center"
					/>
				)}
			</div>
		</div>
	);
};

export default CodeAddComponent;
