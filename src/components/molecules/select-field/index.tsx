import React, { FC } from 'react';
import Label from '@atoms/label';
import ReactSelect from '@atoms/select';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface SelectFieldProps {
	//'SelectFieldProps': isControlled, inputValue, selectWrapperClass
	className?: any | ReactJSXElement;
	mainClasses?: any;
	labelClasses?: any;
	containerClass?: any;
	options?: any;
	placeholder?: string;
	isControlled?: boolean;
	name?: string;
	value?: string | React.ReactNode;
	control?: any;
	defaultValue?: string;
	change?: any;
	register?: any;
	error?: any;
	inputValue?: string;
	helperText?: any;
	selectWrapperClass?: string;
}
const SelectField: FC<SelectFieldProps> = (props) => {
	const {
		mainClasses,
		value,
		labelClasses,
		containerClass,
		options,
		className,
		placeholder,
		isControlled,
		name,
		control,
		defaultValue,
		change,
		register,
		error,
		inputValue,
		helperText,
		selectWrapperClass,
	} = props;

	return (
		<div className={mainClasses}>
			<Label
				value={value}
				classes={{ root: `${labelClasses}` }}
			/>
			<ReactSelect
				selectWrapperClass={selectWrapperClass}
				options={options}
				inputClass={className}
				placeholder={placeholder}
				containerClass={containerClass}
				name={name}
				defaultValue={defaultValue}
				control={control}
				onChange={change}
				isControlled={isControlled}
				value={inputValue}
				register={register}
				error={error}
				helperText={helperText}
			/>
		</div>
	);
};
SelectField.defaultProps = {
	mainClasses: 'flex items-center w-full overflow-visible',
	labelClasses: { root: 'text-md mb-0' },
	className: 'w-48 p-0',
	containerClass: { root: 'px-3 w-full h-2' },
	options: [{ value: 'Some', name: 'Some' }],
};

export default React.memo(SelectField);
