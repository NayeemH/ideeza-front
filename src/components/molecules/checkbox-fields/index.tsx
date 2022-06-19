import React from 'react';
import { FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Checkbox } from '@mui/material';
import Label from '@atoms/label';

interface CheckboxFieldsProps {
	value?: string | React.ReactNode;
	labelClass?: string;
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';
	size?: 'small' | 'medium';
	mainClass?: string;
	checkboxClass?: string;
	checked?: boolean;
	control?: any;
	name: string;
	isControl?: boolean;
	rules?: any;
	defaultValue?: string | boolean;
}

function CheckboxFields(props: CheckboxFieldsProps) {
	const {
		value,
		labelClass,
		color,
		size,
		mainClass,
		checkboxClass,
		checked,
		control,
		name,
		isControl,
		rules,
		defaultValue,
	} = props;

	return (
		<div className={`flex ${mainClass}`}>
			{isControl ? (
				<FormControlLabel
					control={
						<Controller
							name={name}
							control={control}
							defaultValue={defaultValue}
							rules={rules}
							render={(props: any) => {
								return (
									<Checkbox
										{...props}
										checked={value ? true : false}
										color={color}
										size={size}
										className={`p-1 ${checkboxClass}`}
									/>
								);
							}}
						/>
					}
					label={
						<Label
							value={value}
							classes={{ root: `${labelClass}` }}
						/>
					}
				/>
			) : (
				<>
					<Checkbox
						checked={checked}
						color={color}
						size={size}
						className={`p-1 ${checkboxClass}`}
					/>
					<Label
						value={value}
						classes={{ root: `${labelClass}` }}
					/>
				</>
			)}
		</div>
	);
}
CheckboxFields.defaultProps = {
	mainClass: 'items-start -ml-1',
	isControl: false,
	color: 'primary',
};
export default CheckboxFields;
