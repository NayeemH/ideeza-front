import Button from '@atoms/button';
import Label from '@atoms/label';
import React from 'react';

function LabelButton(props: any) {
	const { mainClass, btnValue, value, btnClass, labelClass, iconStart, iconEnd, onClick } = props;
	return (
		<div className={`flex items-center ${mainClass}`}>
			<Label
				value={value}
				classes={{ root: `${labelClass}` }}
			/>
			<Button
				value={btnValue}
				iconStart={iconStart}
				iconEnd={iconEnd}
				onClick={onClick}
				className={`tracking-tight capitalize ${btnClass}`}
			/>
		</div>
	);
}
LabelButton.defaultProps = {
	mainClass: 'justify-between',
	value: 'Article preview',
	labelClass: 'text-primary text-base font-sans tracking-tight font-semibold',
	btnValue: 'Back Step',
	btnClass: 'bg-primary p-2 px-4 text-white',
};
export default LabelButton;
