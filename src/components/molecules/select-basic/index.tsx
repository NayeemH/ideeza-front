import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { FC } from 'react';
import { Fade } from '@mui/material';
import Label from '@atoms/label';

export interface ISelectBasicOption {
	name: string;
	value: string | number | boolean;
}

interface ISelectBasic {
	value: any;
	handleChange?: any;
	id?: string;
	placeholder?: string;
	options: ISelectBasicOption[];
	error?: boolean;
	helpText?: string;
	multiple?: boolean;
	native?: boolean;
	open?: boolean;
	onOpen?: (e: any) => void;
	onClose?: (e: any) => void;
	wrapperClasses?: string;
	selectClasses?: string;
	optionClasses?: string;
	placeholderClasses?: string;
	helpTextClasses?: string;
	label?: string;
	labelClasses?: string;
}

const SelectBasic: FC<ISelectBasic> = (props) => {
	const {
		value,
		handleChange,
		id,
		placeholder,
		options,
		error,
		helpText,
		multiple,
		native,
		open,
		onOpen,
		onClose,
		wrapperClasses,
		selectClasses,
		optionClasses,
		placeholderClasses,
		helpTextClasses,
		label,
		labelClasses,
		...rest
	} = props;
	return (
		<div className={wrapperClasses}>
			{label && (
				<Label
					value={label}
					classes={{ root: `${labelClasses}` }}
				/>
			)}
			<Select
				value={value}
				onChange={(e?: any) => {
					handleChange(e);
				}}
				displayEmpty
				inputProps={{ 'aria-label': 'Without label' }}
				id={id}
				multiple={multiple}
				native={native}
				className={`${selectClasses}${error ? ' border-red-600' : ''}`}
				classes={{ select: 'select-basic-style' }}
				onClose={onClose}
				onOpen={onOpen}
				open={open}
				MenuProps={{
					disableScrollLock: true,
				}}
				{...rest}
			>
				{placeholder && (
					<MenuItem
						value=""
						disabled
						className={placeholderClasses}
					>
						{placeholder}
					</MenuItem>
				)}
				{options.length > 0 &&
					options.map((item: ISelectBasicOption, index: number) => (
						<MenuItem
							className={optionClasses}
							key={index}
						>
							{item?.name}
						</MenuItem>
					))}
			</Select>
			{helpText && (
				<Fade in={helpText ? true : false}>
					<FormHelperText className={`${helpTextClasses}${error ? ' text-red-600' : ''}`}>
						{helpText}
					</FormHelperText>
				</Fade>
			)}
		</div>
	);
};

SelectBasic.defaultProps = {
	selectClasses: 'w-full text-lg 2xl:text-xl p-0 border border-gray-160',
	helpTextClasses: 'text-lg mt-1',
	labelClasses: 'font-medium text-gray-550 tracking-tight mb-2',
};

export default SelectBasic;
