import PillButton from '@molecules/pill-buttons';
import CustomBlockly from '@organisms/blockly';
import CustomBlockForm from './form';
import Editor from 'react-simple-code-editor';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/color-brewer.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useFormContext } from 'react-hook-form';
import { blocklyConfigReducer } from '@features/technician/code/reducer';
interface IData {
	[k: string]: string | number;
}
export default function CustomBlockCreate({ data }: { data: (arg: IData) => void }) {
	const [active, setActive] = useState<'blockly' | 'code' | '3D'>('blockly');
	const [color, setColor] = useState('');
	const [svgCode, setSVGCode] = useState('');
	const [xmlCode, setXMLCode] = useState('');
	const [jsCode, setJsCode] = useState<string>('');
	const [editedJsCode, setEditedJsCode] = useState<string>('');
	const [formStep, setFormStep] = useState<number>(0);
	const dispatch = useAppDispatch();
	const { blocklyConfig } = useAppSelector(({ code }) => code);
	const { getValues } = useFormContext();
	useEffect(() => {
		data({
			svgCode,
			xmlCode,
			jsCode,
			formStep,
		});
	}, [svgCode, xmlCode, jsCode, formStep]);

	useEffect(() => {
		setEditedJsCode(jsCode ?? '');
	}, [jsCode]);

	const formData = getValues();
	useEffect(() => {
		dispatch(
			blocklyConfigReducer({
				...blocklyConfig,
				is_output: formData?.is_output,
				color: color,
				type: formData.type,
				input_pin: formData.input_pin,
				input_variable_name: formData.input_variable_name,
				input_variable_value: formData.input_variable_value,
				previous_connector: formData?.previous_connector,
				next_connector: formData?.next_connector,
				input_inline: formData?.input_inline,
				append_dummy_input: formData?.append_dummy_input,
				statement: formData?.statement,
				append_value_input_type: formData?.append_value_input_type,
				append_value_input_name: formData?.append_value_input_name,
			})
		);
	}, [
		formData.type,
		formData.input_pin,
		formData.input_variable_name,
		formData.input_variable_value,
		formData.is_output,
		formData?.previous_connector,
		formData?.next_connector,
		formData?.input_inline,
		formData?.append_dummy_input,
		formData?.statement,
		formData?.append_value_input_type,
		formData?.append_value_input_name,
		color,
	]);

	return (
		<div className="flex flex-col md:flex-row md:items-start space-x-3">
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
							handleColor={setColor}
						/>
					</div>

					<div className="md:flex-1 code-content">
						<div className="relative rounded-[10px] overflow-hidden bg-white">
							<div
								className={`code-section relative  ${
									active === 'blockly' ? 'z-20' : 'z-10'
								}`}
							>
								<CustomBlockly
									xmlCode={setXMLCode}
									jsCode={setJsCode}
									svgCode={setSVGCode}
									initialBlock="<xml xmlns='https://developers.google.com/blockly/xml'><variables><variable id='Bb5b=_8vgFhbXDT4/wo,'>item</variable><variable id='yzD#x#*Cy[IBZIUPpfG]'>j</variable></variables><block type='user_block' id='2.^_D(di+9-/|JIhBv*e' x='220' y='200'><field name='VALUE' id='Bb5b=_8vgFhbXDT4/wo,'>item</field></block></xml>"
								/>
							</div>
							<div
								className={`w-full h-full bg-white whitespace-pre-wrap absolute top-0 opacity-0  ${
									active === 'blockly' ? 'z-10' : 'z-20 opacity-100'
								}`}
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
					</div>
				</div>
			</div>
		</div>
	);
}
