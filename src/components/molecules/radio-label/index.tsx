import Label from '@atoms/label';
import RadioButton from '@atoms/radio';
import React from 'react';

interface RadioLabelProps {
	value: string;
	lableClass: string;
	mainClass: string;
	radioClass?: any;
	size: any;
	color: any;
	name?: string;
	id?: any;
	onClick?: (e?: any) => void;
}

function RadioLabel(props: RadioLabelProps) {
	const { value, lableClass, mainClass, radioClass, size, color, name, id, onClick } = props;
	return (
		<div className={mainClass}>
			<RadioButton
				onClick={onClick}
				id={id}
				size={size}
				color={color}
				name={name}
				classes={radioClass}
			/>
			<Label
				value={value}
				classes={{ root: `${lableClass}` }}
			/>
		</div>
	);
}
RadioLabel.defaultProps = {
	mainClass: 'flex items-center -ml-1',
	size: 'small',
	color: 'current',
};
export default RadioLabel;
