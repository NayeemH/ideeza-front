import Button from '@atoms/button';
import PillButton from '@molecules/pill-buttons';
import Steppers from '@molecules/steppers';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { blocklyConfigReducer, reset } from '../reducer';
import CustomBlockForm from './form';
import FormSuccess from './formSuccess';
//import CustomBlockly from "@organisms/blockly";
import Editor from 'react-simple-code-editor';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/color-brewer.css';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { createCodePart } from 'request/code';
import { setCustomizeMenu } from '@layouts/private/sidebar/reducer';
import { useRouter } from 'next/router';
import CreateBlockWorkSpace from '@features/blockly/Shared/createBlockWorkspace';
import Modal from '@atoms/modal';
import { IoClose } from 'react-icons/io5';
import Label from '@atoms/label';
//import { apiService } from "utils/request";

interface CodePartProps {
	onAddPart?: any;
}

const CodePart: React.FC<CodePartProps> = ({ onAddPart }: CodePartProps) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [isSubmiting, setSubmiting] = useState(false);
	const [jsCode, setJsCode] = useState<string>();
	const [editedJsCode, setEditedJsCode] = useState<string>('');
	const [svgCode, setSVGCode] = useState();
	const [xmlCode, setXMLCode] = useState<any>('');
	// const [blockType, setBlockType] = useState<any>();
	const [blockCode, setBlockCode] = useState<any>();
	const [editorScript, setEditorScript] = useState<any>();
	const [color, setColor] = useState();
	const [active, setActive] = useState<'blockly' | 'code' | '3D'>('blockly');
	const [formStep, setFormStep] = useState<number>(0);
	const [step, setStep] = useState(0);
	const [resetCode, setResetCode] = useState(false);
	const [openAgreeModal, setOpenAgreeModal] = useState(false);
	const methods = useForm();
	const { watch, setValue } = methods;
	const formData = watch();
	// const selected_block_data = useAppSelector((state) => state.sidebar.selected_block_data);

	const { blocklyConfig } = useAppSelector(({ code }) => code);

	const addPartMutation = useMutation(createCodePart, {
		onSuccess: () => {
			setSubmiting(false);
			setStep(1);
			dispatch(reset);
			methods.reset();
			toast.success('Code Part Added successfully');
		},
		onError: (err: any) => {
			setSubmiting(false);
			console.error(err);
			toast.error('Faild to create Code Part');
		},
	});

	const handleSubmit = () => {
		if (!formData?.category || Number(formData?.category) === 0) {
			toast.error('Select a Category!');
			return;
		}

		// console.log('editorScript', editorScript);

		setSubmiting(true);
		const reqBody = {
			editor_script: editorScript,
			image_svg: svgCode + '',
			...formData,
			is_visible: true,
		};

		addPartMutation.mutate(reqBody);
		onAddPart && onAddPart(editorScript);
	};

	const handleReset = () => {
		setXMLCode('');
		setEditorScript('');
		setStep(0);
		setFormStep(0);
		dispatch(reset);
		methods.reset();
		setResetCode(true);
	};

	useEffect(() => {
		setEditedJsCode(jsCode ?? '');
	}, [jsCode]);

	useEffect(() => {
		console.log('XML CODE', xmlCode);
	}, [xmlCode]);

	/* useEffect(() => {
	dispatch(
	  blocklyConfigReducer({
		...blocklyConfig,
		is_output: formData?.is_output,
		name: formData.name,
		color: color,
		type: formData.type,
		input_pin: formData.input_pin,
		input_variable_name: formData.input_variable_name,
		input_variable_value: formData.input_variable_value,
		previous_connector: formData.previous_connector,
		next_connector: formData.next_connector,
		input_inline: formData.input_inline,
		append_dummy_input: formData.append_dummy_input,
		statement: formData.statement,
		append_value_input_type: formData.append_value_input_type,
		append_value_input_name: formData.append_value_input_name,
	  })
	);
  }, [
	formData.type,
	formData.name,
	formData.input_pin,
	formData.input_variable_name,
	formData.input_variable_value,
	formData.is_output,
	formData.previous_connector,
	formData.next_connector,
	formData.input_inline,
	formData.append_dummy_input,
	formData.statement,
	formData.append_value_input_type,
	formData.append_value_input_name,
	color,
  ]); */
	useEffect(() => {
		dispatch(
			blocklyConfigReducer({
				...blocklyConfig,
				type: formData.type,
				name: formData.name,
				firstname: formData.name,
				color: color,
				input_inline: formData.input_inline,
				is_output: formData?.is_output,
				previous_connector: formData.previous_connector,
				next_connector: formData.next_connector,
				statement: formData.statement,
				add_input_1: formData.add_input_1,
				input_variable_name: formData.input_variable_name,
				add_input_2: formData.add_input_1,
				input2_variable_name: formData.append_value_input_name,
				// input_pin: formData.input_pin,
				// input_variable_value: formData.input_variable_value,
				// append_dummy_input: formData.append_dummy_input,
				// append_value_input_type: formData.append_value_input_type,
				// append_value_input_name: formData.append_value_input_name,
				description: formData.description,
			})
		);
	}, [
		formData.type,
		formData.name,
		formData.firstname,
		color,
		formData.input_inline,
		formData.is_output,
		formData.previous_connector,
		formData.next_connector,
		formData.statement,
		formData.add_input_1,
		formData.input_variable_name,
		formData.add_input_2,
		formData.input2_variable_name,
		formData.description,
		// formData.input_pin,
		// formData.input_variable_value,
		// formData.append_dummy_input,
		// formData.append_value_input_type,
		// formData.append_value_input_name,
	]);

	useEffect(() => {
		if (step === 0) {
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

	const blocklyState = useAppSelector((state) => state.code.blocklyConfig);
	const firstname = blocklyState?.firstname ?? '';
	const blockColor = blocklyState?.color ?? '#ff24c7';
	const inputInline = blocklyState?.input_inline ?? false;
	const setOutput = blocklyState?.is_output ?? false;
	const prevConnector = blocklyState?.previous_connector ?? false;
	const nextConnector = blocklyState?.next_connector ?? false;
	const addstatementInput = blocklyState?.statement ?? false;
	const addInput1 = blocklyState?.add_input_1 ?? false;
	const addInput1Name = blocklyState?.input_variable_name ?? '';
	const addInput2 = blocklyState?.add_input_2 ?? false;
	const addInput2Name = blocklyState?.input2_variable_name ?? '';
	// const addAnotherInputValue = blocklyState?.input_variable_value ?? '';

	const blockParameters = {
		firstname,
		blockColor,
		inputInline,
		setOutput,
		prevConnector,
		nextConnector,
		addstatementInput,
		addInput1,
		addInput1Name,
		addInput2,
		addInput2Name,
		// addAnotherInputValue,
	};

	return (
		<div>
			{/* <button onClick={createDummyBlock}>Hello</button> */}
			<div className={`w-full flex items-center justify-center`}>
				<Steppers
					currentStep={step}
					className="md:w-2/4 w-full eina-font-sb03 md:text-2xl"
					options={['Add Part', 'Added Successfully']}
					icons={{
						1: <span>1</span>,
						2: <span>2</span>,
					}}
				/>
			</div>
			<div className="pt-4">
				{step === 0 && (
					<>
						<div className="flex flex-col md:flex-row  md:items-start space-x-3">
							<div className="code-content md:flex-1 bg-white px-[30px] rounded-[10px]">
								<div className="flex flex-col md:flex-row md:justify-between items-center my-[30px] pb-2">
									<div className="leading-tight font-proxima-nova text-lg 2xl:text-[24px] font-semibold text-primary">
										Block Parameters
									</div>
									<div className="text-[#999999] font-proxima-nova font-normal text-lg 2xl:text-2xl text-right 2xl:ml-[190px]">
										{formStep + 1} / 3
									</div>
									<div>
										<PillButton
											active={active}
											setActive={setActive}
											pillValueFrist={'Block Preview'}
											pillValueSecond={'Code Preview'}
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-[40px]">
									<div className="">
										<CustomBlockForm
											formStep={formStep}
											setFormStep={setFormStep}
											methods={methods}
											handleColor={setColor}
										/>
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
															onClick={() => {
																handleSubmit();
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
									</div>

									<div className="md:flex-1 code-content">
										<div className="relative rounded-[10px] overflow-hidden bg-white">
											{/* <div
												className={`${active === 'blockly' ? 'z-20' : 'opacity-0 w-full absolute top-0 left-0 h-full'} `}
											> */}
											<div
												className={`code-section relative  ${
													active === 'blockly'
														? 'z-20'
														: 'opacity-0 w-full absolute top-0 left-0 h-full'
												}`}
											>
												{/* <CustomBlockly
                          xmlCode={setXMLCode}
                          jsCode={setJsCode}
                          svgCode={setSVGCode}
                          initialBlock={'<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="Bb5b=_8vgFhbXDT4/wo,">item</variable><variable id="Q]eD^?s2(dpf0~tA1!H*">Test</variable><variable id="-Y(UAV7i-]#gb6Ue9!%h">i</variable></variables><block type="user_block" id="2.^_D(di+9-/|JIhBv*e" x="220" y="200"><field name="NAME" id="Bb5b=_8vgFhbXDT4/wo,">item</field><field name="NAME" id="Q]eD^?s2(dpf0~tA1!H*">Test</field></block></xml>'}
                          type={"part"}
                        /> */}
												<CreateBlockWorkSpace
													// editorScript={editorScript}
													xmlData={xmlCode}
													onChangeXml={(
														xml: any,
														partBlocks: any[],
														blockCode: any
													) => {
														const editor_script = {
															type: 'part',
															xmlData: xml,
															blocks: [...partBlocks],
														};
														// console.log("blockCodePart: ", blockCode);
														setBlockCode(blockCode);
														setXMLCode(xml);
														setEditorScript(
															JSON.stringify(editor_script)
														);
														// console.log(JSON.stringify(editor_script));
														// setBlockType(xml);
													}}
													onChangeSvgData={(svg) => setSVGCode(svg)}
													blockParameters={blockParameters}
													resetCode={resetCode}
													setResetCode={setResetCode}
												/>
											</div>
											<div
												className={`code-section relative  ${
													active === 'code'
														? 'z-50'
														: 'opacity-0 w-full absolute top-0 left-0 h-full'
												}`}
											>
												{/* <div
												className={`code-section relative  ${active === 'code' ? 'z-20' : 'opacity-0'
													}`}
											> */}
												<div>{blockCode}</div>
											</div>
											{/* break */}
											<div
												className={`w-full h-full bg-white whitespace-pre-wrap absolute top-0 opacity-0  ${
													active === 'blockly'
														? 'z-10'
														: 'z-50 opacity-100'
												}`}
											>
												{/* <Highlight className="language-javascript overflow-y-auto code-section p-4">
                          {jsCode}
                        </Highlight> */}
												<Editor
													value={editedJsCode ?? ''}
													onValueChange={(code: any) =>
														setEditedJsCode(code)
													}
													highlight={(code: any) =>
														hljs.highlight(code, {
															language: 'js',
															ignoreIllegals: false,
														}).value
													}
													padding={10}
													style={{
														fontFamily:
															'"Fira code", "Fira Mono", monospace',
														fontSize: 16,
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{formStep === 2 ? (
							<div className="w-full flex items-center justify-end mt-4 ">
								<Button
									onClick={() => setOpenAgreeModal(true)}
									value="Finish"
									className="bg-primary w-40 transform-none text-white text-base 2xl:text-[18px] py-[12px] font-proxima-nova tracking-tight"
									variant="contained"
									size="large"
									color="primary"
									loading={isSubmiting}
									disabled={isSubmiting}
								/>
							</div>
						) : null}
					</>
				)}
				{step === 1 && <FormSuccess goBack={() => handleReset()} />}
			</div>
		</div>
	);
};

export default CodePart;
