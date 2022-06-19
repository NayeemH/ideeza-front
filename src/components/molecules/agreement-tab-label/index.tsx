import IconLabel from '@molecules/icon-label';
import { FC } from 'react';

interface AgreementTabLabelType {
	label: string;
	icon: any;
	isActive: boolean;
}

const AgreementTabLabel: FC<AgreementTabLabelType> = (props) => {
	const { label, icon, isActive } = props;

	return (
		<IconLabel
			mainClass="cursor-pointer transition-all duration-500 ease-in-out flex items-center w-full"
			tooltipProps={{ open: false }}
			labelValue={label}
			iconContanerClass="w-10"
			lableClass={{
				root: `${
					isActive ? 'text-primary' : 'text-gray-600'
				} pl-1  text-xs lg:text-base tracking-tight`,
			}}
			iconComponent={icon}
		/>
	);
};

export default AgreementTabLabel;
