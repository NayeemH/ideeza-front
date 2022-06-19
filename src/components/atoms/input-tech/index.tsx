import React, { useState } from 'react';
import Proptype from 'prop-types';
import { TextField, InputAdornment } from '@mui/material';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const InputTech: React.FC<any> = (props) => {
	const [visible, setVisible] = useState(false);
	const toggleVisible = () => setVisible(!visible);
	const {
		id,
		variant,
		label,
		disable,
		defaultValue,
		type,
		className,
		value,
		helperText,
		placeholder,
		onChange,
		error,
		blur,
		register,
		hidden,
		name,
		rows,
		multiline,
		isIcon,
		containerClass,
		position,
		inputProps,
		iconStart,
		onKeyDown,
		onClick,
	} = props;
	const hasError = (inputName: any) => !!(error && error[inputName]);

	return (
		<TextField
			onKeyDown={onKeyDown}
			inputRef={register}
			name={name}
			rows={rows}
			fullWidth
			style={{ display: hidden ? 'none' : 'block' }}
			hidden={hidden}
			classes={{
				root: `my-0 ${containerClass}`,
			}}
			error={hasError(name)}
			defaultValue={defaultValue}
			disabled={disable}
			helperText={helperText}
			onClick={onClick}
			multiline={multiline}
			id={id}
			InputLabelProps={{
				shrink: true,
			}}
			InputProps={{
				[position === 'start' ? 'startAdornment' : 'endAdornment']:
					type === 'password' && !isIcon ? (
						<InputAdornment
							onClick={toggleVisible}
							className="cursor-pointer"
							position={position}
						>
							{visible ? (
								<FaRegEye className="text-2xl mr-2" />
							) : (
								<FaRegEyeSlash className="text-2xl mr-2" />
							)}
						</InputAdornment>
					) : isIcon ? (
						<InputAdornment
							className={hasError(name) ? 'text-red-500' : 'text-secondary'}
							position={position}
						>
							{props.children}
						</InputAdornment>
					) : (
						<></>
					),
				startAdornment: <InputAdornment position="start">{iconStart}</InputAdornment>,
				classes: {
					root: `${
						hasError(name)
							? 'transition-all duration-200 delay-75 ease-linear border-red-300 border border-solid'
							: null
					} ${className?.root}`,
				},
			}}
			inputProps={{
				className: inputProps,
			}}
			label={label}
			margin="normal"
			onChange={onChange}
			onBlur={blur}
			placeholder={placeholder}
			type={type === 'password' ? (visible === false ? 'password' : 'text') : type}
			variant={variant}
			value={value}
		/>
	);
};

InputTech.prototype = {
	id: Proptype.string,
	variant: Proptype.oneOf(['standard', 'outlined', 'filled']),
	label: Proptype.string,
	disable: Proptype.bool,
	defaultValue: Proptype.string,
	type: Proptype.oneOf(['number', 'text', 'password', 'textarea']),
	className: Proptype.object || Proptype.string,
	value: Proptype.string,
	helperText: Proptype.string,
	placeholder: Proptype.string,
	change: Proptype.func,
	error: Proptype.object,
	blur: Proptype.func,
	register: Proptype.any,
	name: Proptype.string,
	rows: Proptype.string,
	hidden: Proptype.bool,
	inputProps: Proptype.string,
};
InputTech.defaultProps = {
	variant: 'outlined',
	disable: false,
	error: false,
	//   change: () => {},
	//   blur: () => {},
	hidden: false,
	position: 'end',
	containerClass: 'rounded p-0',
	inputProps: 'text-base 2xl:text-xl py-2 font-lato rounded-3xl border-none pl-2 txt-c-color',
};
export default InputTech;
