import React, { useEffect, useState } from 'react';
import Input from '@atoms/input';
import Label from '@atoms/label';
import { EditableInputProps } from 'models/user-project';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

const EditableInput: React.FC<EditableInputProps> = (props) => {
	const {
		mainClass,
		childrenClass,
		editContanerClass,
		multiline,
		rows,
		headerMainClasses,
		headerClasses,
		editComponent,
		headerLabel,
		labelValue,
		onChangeLabelValue,
		handleChange,
		lableClass,
		edit,
		inputClasses,
		onSubmit,
		isEditIcon,
		placeholder,
		onCancel,
	} = props;

	const [value, setValue] = useState(labelValue);

	useEffect(() => {
		setValue(labelValue);
	}, [labelValue]);

	return (
		<div className={mainClass}>
			<div className={headerMainClasses}>
				<Label
					value={headerLabel}
					classes={headerClasses}
				/>
				{isEditIcon ? (
					''
				) : (
					<div
						className={editContanerClass}
						onClick={() => {
							handleChange !== undefined && handleChange();
							edit && onSubmit && onSubmit(value);
						}}
					>
						{editComponent}
					</div>
				)}
			</div>
			<div className={childrenClass + ' w-full'}>
				{edit ? (
					<>
						<Input
							onChange={(e: any) => {
								setValue(e.target.value);
								if (onChangeLabelValue) {
									onChangeLabelValue(e.target.value);
								}
							}}
							multiline={multiline}
							defaultValue={value}
							rows={rows}
							containerClass={inputClasses}
							position="start"
							value={value}
							onKeyDown={(e: React.KeyboardEvent) => {
								if (!multiline && e?.keyCode === 13 && onSubmit) {
									onSubmit(value);
								}
							}}
							placeholder={placeholder}
							style={{ border: '1px solid #ff09d0', borderRadius: 5 }}
						/>
						{multiline && (
							<div className={'mt-2 text-right'}>
								<Button
									className={'text-black'}
									onClick={() => {
										if (typeof onCancel === 'function') {
											onCancel();
										}
									}}
								>
									Cancel
								</Button>

								<Button
									className={'bg-primary text-white'}
									onClick={() => {
										if (onSubmit && typeof onSubmit === 'function') {
											onSubmit(value);
										}
									}}
								>
									Submit
								</Button>
							</div>
						)}
					</>
				) : isEditIcon ? (
					<div>
						<Label
							value={labelValue}
							classes={lableClass}
						/>
						<div
							className={editContanerClass}
							onClick={() => {
								handleChange !== undefined && handleChange();
							}}
						>
							{editComponent}
						</div>
					</div>
				) : (
					<Label
						value={
							<div
								style={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									maxWidth: 400,
								}}
							>
								<Typography
									style={{ fontSize: 30, fontWeight: 'bold' }}
									noWrap
								>
									{labelValue}
								</Typography>
							</div>
						}
						classes={lableClass}
					/>
				)}
				{props.children}
			</div>
		</div>
	);
};
EditableInput.defaultProps = {
	mainClass: 'flex items-center mr-3',
	editContanerClass:
		'bg-white flex tems-center justify-center border border-primary text-3xl rounded-full w-8 h-8',
	lableClass: { root: 'font-bold text-2xl font-rubik text-white' },
	headerMainClasses: 'flex items-center',
};
export default EditableInput;
