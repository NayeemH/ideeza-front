import Label from '@atoms/label';
import React from 'react';

interface PersonalLabelProps {
	value?: string | React.ReactNode;
	value2?: string | React.ReactNode;
	mainClass?: string;
	valueClass?: string;
	value2Class?: string;
	click?: (e?: any) => void;
}

const PersonalLabel: React.FC<PersonalLabelProps> = (props) => {
	const {
		value,
		value2,
		mainClass = 'grid md:grid-cols-3 grid-cols-2 gap-4 border-t border-gray-400 py-3 px-1 ',
		valueClass,
		value2Class,
		click,
	} = props;

	return (
		<div className={`${mainClass}`}>
			<Label
				value={value}
				classes={{
					root: `font-sans tracking-tight text-base 2xl:text-xl text-gray-600 ${valueClass}`,
				}}
			/>
			<Label
				value={value2}
				classes={{
					root: `md:col-span-2 cursor-pointer font-sans tracking-tight text-base 2xl:text-xl ${value2Class}`,
				}}
				onClick={click}
			/>
		</div>
	);
};

export default PersonalLabel;
