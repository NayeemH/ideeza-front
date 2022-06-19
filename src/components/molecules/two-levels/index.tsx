import Label from '@atoms/label';
import React from 'react';

function TwoLabels(props: any) {
	const { value, value2, labelClass, labelClass2, mainClass } = props;
	return (
		<div className={`${mainClass}`}>
			<Label
				value={value}
				classes={{ root: `completed-work ${labelClass}` }}
			/>
			<Label
				value=":"
				classes={{ root: `completed-work  mr-[30px]` }}
			/>

			<Label
				value={value2}
				classes={{ root: `completed-work ${labelClass2}` }}
			/>
		</div>
	);
}

export default TwoLabels;
