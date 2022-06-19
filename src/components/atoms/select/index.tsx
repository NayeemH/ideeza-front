import React, { useState } from 'react';
import { MenuItem, Select, ListSubheader } from '@mui/material';
import { Controller } from 'react-hook-form';

// interface SimpleProps {
//   label: string;
//   // value: string | number;
//   options: any;
//   defaultValue?: string;
//   name: string;
//   isDisable: boolean;
//   register: any;
//   className: string;
//   isGrouped: boolean;
//   error: any;
//   placeholder?: string;
//   helperText?: string;
//   selectWrapperClass?: string;
//   containerClass?: string;
//   change?:any;
//   onClick?:;
// }

function Simple(props: any) {
	const {
		label,
		options,
		defaultValue,
		register,
		error,
		name,
		isDisable,
		className,
		placeholder,
		containerclass,
		change,
		onClick,
		isGrouped,
		helperText,
		selectWrapperClass,
	} = props;
	const hasError = error && Object.keys(error).includes(name);
	return (
		<div className={selectWrapperClass}>
			<Select
				ref={register}
				innerref={register}
				labelId={label}
				label={label}
				id={label}
				variant="outlined"
				error={hasError}
				name={name}
				onClick={onClick}
				disabled={isDisable}
				defaultValue={defaultValue}
				classes={
					className && {
						root: `${className} text-xs py-3`,
					}
				}
				value={props.value}
				className={`${containerclass} ${hasError && 'border-red-300'}`}
				fullWidth
				onChange={change}
				inputProps={{
					shrink: 'true',
					className:
						'border bg-white flex items-center text-base 2xl:text-xl  text-gray-600 py-2',
				}}
				{...props}
			>
				<MenuItem value="placeholder">{placeholder}</MenuItem>
				{options &&
					Array.isArray(options) &&
					options?.map((v, k) =>
						isGrouped ? (
							<ListSubheader></ListSubheader>
						) : (
							<MenuItem
								key={'a' + k}
								value={v?.value}
							>
								{v.name}
							</MenuItem>
						)
					)}
			</Select>
			{helperText ? (
				<p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error">
					{helperText}
				</p>
			) : null}
		</div>
	);
}
function ReactSelect(props: any) {
	const { placeholder, isControlled, control, name, onClick } = props; //placeholder should be destructured from props
	const [value, setValue] = useState('placeholder');
	const setSelect = (e: any): void => setValue(e.target.value);

	return isControlled ? (
		<Controller
			rules={{ required: true }}
			control={control}
			name={name}
			//   placeholder={placeholder}
			defaultValue={props.defaultValue}
			render={(proper: any) => (
				<Simple
					{...props}
					name={name}
					value={proper.value}
					change={(e: any, v: any) => proper?.onChange(v?.props?.value)}
					placeholder={placeholder}
				/>
			)}
		/>
	) : (
		<Simple
			onClick={onClick}
			change={setSelect}
			value={value}
			{...props}
		/>
	);
}
// ReactSelect.prototype = {
//   label: Proptype.string,
//   value: Proptype.string || Proptype.number,
//   options: Proptype.array,
//   defaultValue: Proptype.string,
//   name: Proptype.string,
//   isDisable: Proptype.bool,
//   register: Proptype.any,
//   className: Proptype.string,
//   isGrouped: Proptype.bool,
// };
ReactSelect.defaultProps = {
	defaultValue: 'placeholder',
	iscontrolled: 'false',
	options: [],
	isgrouped: 'false',
	inputclass: 'border my-2 border-gray-135 px-1 py-1',
};
export default ReactSelect;
