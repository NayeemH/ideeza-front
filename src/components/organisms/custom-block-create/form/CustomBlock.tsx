import Button from '@atoms/button';
import Label from '@atoms/label';
import { useFormContext } from 'react-hook-form';

type IProps = {
	setFormStep: () => void;
	setFormback: () => void;
	color?: any;
};

export default function CustomBlock({ setFormStep, setFormback }: IProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext();

	const submit = () => {
		setFormStep();
	};

	return (
		<div>
			<form
				className="bg-white rounded-2xl border p-5"
				onSubmit={handleSubmit(submit)}
			>
				<div className="flex flex-col items-center border-b py-2">
					<div className="flex items-center w-full border-b pb-[20px]">
						<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[42%]">
							Input Pin
						</label>
						<select
							{...register('type')}
							className="form-select pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-[100%] outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
						>
							<option value="">Select Type</option>
							<option value="type1">Type 1</option>
							<option value="type2">Type 2</option>
						</select>
					</div>
					<div className="flex items-center w-full border-b py-[20px]">
						<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
							Input Pin
						</label>
						<div className="w-full">
							<input
								type="number"
								className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-[100%] outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
								placeholder="Input Pin"
								{...register('input_pin', {
									required: 'Input Pin must be number at least 18 more than 99',
									maxLength: 20,
								})}
							/>
							{errors.input_pin && (
								<p className="text-red-400 text-xs">{errors.input_pin.message}</p>
							)}
						</div>
					</div>
					<div className="flex items-center w-full border-b py-[20px]">
						<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
							Input Variable Name
						</label>
						<div className="w-full">
							<input
								type="text"
								className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-[100%] outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
								placeholder="Input Variable Name"
								{...register('input_variable_name', {
									required: 'Enter input variable name',
									maxLength: 255,
								})}
							/>
							{errors.input_variable_name && (
								<p className="text-red-400 text-xs">
									{errors.input_variable_name.message}
								</p>
							)}
						</div>
					</div>

					<div className="flex items-center w-full border-b py-[20px]">
						<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]">
							Input Variable Value
						</label>
						<div className="w-full">
							<input
								type="number"
								className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-[100%] outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
								placeholder="Input Variable Name"
								{...register('input_variable_value', {
									required: 'Enter input variable value',
									maxLength: 255,
								})}
							/>
							{errors.input_variable_value && (
								<p className="text-red-400 text-xs">
									{errors.input_variable_value.message}
								</p>
							)}
						</div>
					</div>
					<div className="flex items-center w-full border-b py-[20px]">
						<Label
							value="Previous Connector"
							className="font-sans pr-6 text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]"
						/>
						<input
							type="checkbox"
							{...register('previous_connector', { required: false })}
							className="border border-gray-725 cursor-pointer w-6 h-6 rounded-sm order-1 border-gray-725"
							// onChange={(e: any) => {
							//   setValue("previous_connector", e?.target?.checked);
							//   formData({ previous_connector: e?.target?.checked });
							// }}

							// checked={initData.previous_connector}
						/>
					</div>
					<div className="flex items-center w-full border-b py-[20px]">
						<Label
							value="Next Connector"
							className="font-sans pr-6 text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]"
						/>
						<input
							type="checkbox"
							{...register('next_connector', { required: false })}
							className="border border-gray-725 cursor-pointer w-6 h-6 rounded-sm order-1 border-gray-725"
						/>
					</div>
					<div className="flex items-center w-full border-b py-[20px]">
						<Label
							value="is Output?"
							className="font-sans pr-6 text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]"
						/>
						<input
							type="checkbox"
							{...register('is_output', { required: false })}
							className="border border-gray-725 cursor-pointer w-6 h-6 rounded-sm order-1 border-gray-725"
						/>
					</div>

					<div className="flex items-center w-full border-b py-[20px]">
						<Label
							value="Input Inline?"
							className="font-sans pr-6 text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]"
						/>
						<input
							type="checkbox"
							{...register('input_inline', { required: false })}
							className="border border-gray-725 cursor-pointer w-6 h-6 rounded-sm order-1 border-gray-725"
						/>
					</div>
					<div className="flex justify-between items-center w-full border-b py-[20px]">
						<Label
							value="Statement Input (A notch for a stack of statement blocks.)"
							className="font-sans pr-6 text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]"
						/>
						<input
							type="checkbox"
							{...register('statement', { required: false })}
							className="border border-gray-725 cursor-pointer w-6 h-6 rounded-sm order-1 border-gray-725"
						/>
					</div>
					<div className="flex items-center w-full border-b py-[20px]">
						<Label
							value="Append Dummy Input (Not an connector just a row for fields.)"
							className="font-sans pr-2 text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-normal w-[150%]"
						/>
						<div className="w-full">
							<input
								type="text"
								{...register('append_dummy_input', {
									required: 'Enter Append dummy input',
								})}
								className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-[100%] outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
								placeholder="0"
							/>
							{errors.append_dummy_input && (
								<p className="text-red-400 text-xs">
									{errors.append_dummy_input.message}
								</p>
							)}
						</div>
					</div>
					<div className="flex justify-between items-center w-full border-b py-[20px]">
						<Label
							value="Append Value Input Type (A socket in which do plug a value black"
							className="font-sans pr-6 text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[40%]"
						/>
						<input
							type="checkbox"
							{...register('append_value_input_type', { required: false })}
							className="border border-gray-725 cursor-pointer w-6 h-6 rounded-sm order-1 border-gray-725"
						/>
					</div>
					<div className="flex items-center w-full border-b py-[20px]">
						<Label
							value="Append Value Input Name"
							className="font-sans pr-6 text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[150%]"
						/>
						<div className="w-full">
							<input
								type="text"
								{...register('append_value_input_name', {
									required: 'Enter append value input name',
								})}
								className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-[100%] outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
								placeholder="0"
							/>
							{errors.append_value_input_name && (
								<p className="text-red-400 text-xs">
									{errors.append_value_input_name.message}
								</p>
							)}
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between w-full pt-6 lg:px-3 md:px-0">
					<Button
						onClick={setFormback}
						value="Back"
						type="button"
						className="bg-[#FBFBFB] border-opacity-50 border border-solid border-[#E6E6E6] w-40 transform-none text-gray-600 text-base 2xl:text-xl font-proxima-nova min-h-0 py-[12px]"
					/>
					<Button
						type="submit"
						value="Next Step"
						className="bg-primary w-40 transform-none text-white text-base 2xl:text-[18px] font-proxima-nova py-[12px] min-h-0"
						color="primary"
					/>
				</div>
			</form>
		</div>
	);
}
