import { Radio } from '@mui/material';
import React from 'react';

interface RadioButtonProps {
	color: 'default' | 'primary' | 'secondary';
	checked?: boolean;
	disabled?: boolean;
	size: 'medium' | 'small';
	classes: any;
	onClick?: (e?: any) => void;
	id?: any;
	name?: string;
	RadioClasses?: any;
}

function RadioButton(props: RadioButtonProps) {
	return <Radio {...props} />;
}

export default RadioButton;
