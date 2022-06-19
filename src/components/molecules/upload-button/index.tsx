import IconLabel from '@molecules/icon-label';
import { UploadButtonProps } from 'models/user-project';
import React from 'react';
import Upload from '../upload';

const UploadButton: React.FC<UploadButtonProps> = (props) => {
	const {
		value,
		labelValue,
		mainClass,
		lableClass,
		iconMainClass,
		iconComponent,
		labelClass,
		iconContanerClass,
		fileClass,
		icon,
		btnClass,

		// btnValue,
	} = props;
	return (
		<>
			<div className={mainClass}>
				<Upload
					value={value}
					mainClass={btnClass}
					labelClass={`${labelClass} `}
					icon={icon}
				/>
				<div className={fileClass}>
					<IconLabel
						mainClass={`${iconMainClass}`}
						labelValue={labelValue}
						tooltipProps={{ open: false }}
						lableClass={{ root: `${lableClass}` }}
						iconComponent={iconComponent}
						iconContanerClass={iconContanerClass}
						onClick={() => {
							'goto';
						}}
					/>
				</div>
			</div>
		</>
	);
};
UploadButton.defaultProps = {
	mainClass: '',
	btnClass:
		'border border-current cursor-pointer rounded px-2 w-32 flex items-center justify-center',
	fileClass: 'grid grid-cols-2 w-2/5 pt-2',
	titleClass: 'pb-2 tracking-tight text-gray-700',
	labelClass: 'text-gray-700 p-1 text-base font-sans tracking-tight',
	iconMainClass: 'flex flex-row-reverse justify-between w-full items-center',
	lableClass: 'text-gray-700 text-base tracking-tight',
	iconContanerClass: 'text-primary',
};
export default UploadButton;
