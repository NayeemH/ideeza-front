import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import Label from '../label';

interface TextInputProps {
	inputName: string;
	label?: string;
	placeholder?: string;
	wrapperClasses?: string;
	labelClasses?: string;
	inputClasses?: string;
	value?: string;
	register: UseFormRegister<any>;
	onChangeFunction?: (e?: any) => void;
	requiredText?: boolean;
	inputType: 'text' | 'email' | 'password';
}
const TextInput: React.FC<TextInputProps> = ({
	label,
	placeholder,
	wrapperClasses,
	inputClasses,
	value,
	register,
	inputName,
	onChangeFunction,
	requiredText,
	inputType,
}) => {
	return (
		<div className={wrapperClasses}>
			<Label value={label} />
			<input
				type={inputType}
				placeholder={placeholder}
				className={inputClasses}
				value={value}
				{...register(inputName, { required: requiredText })}
				onChange={onChangeFunction}
			/>
		</div>
	);
};
export default TextInput;
