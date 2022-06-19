import Label from '@atoms/label';
import Switch from '@atoms/switch';
import React from 'react';

function SwitchField(props: any) {
	const { mainClass, switchClass, labelClass, value } = props;
	return (
		<div className={`${mainClass}`}>
			<Switch className={`${switchClass}`} />
			<Label
				value={value}
				classes={{ root: `${labelClass}` }}
			/>
		</div>
	);
}
SwitchField.defaultProps = {
	mainClass: 'flex items-center -ml-3',
};
export default SwitchField;
