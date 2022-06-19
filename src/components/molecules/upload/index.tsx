import React, { useRef } from 'react';
import IconLabel from '@molecules/icon-label';
import { BsPaperclip } from 'react-icons/bs';
import { UploadProps } from 'models/user-project';

const Upload: React.FC<UploadProps> = ({
	change,
	icon,
	value,
	labelClass,
	mainClass,
	className,
}) => {
	const image = useRef<any>(null);
	const focus = () => image?.current?.click();
	return (
		<div className={className}>
			<input
				id="image"
				ref={image}
				onChange={change}
				type="file"
				className="hidden"
			/>
			<IconLabel
				onClick={focus}
				mainClass={mainClass}
				tooltipProps={{ open: false }}
				labelValue={value}
				iconContanerClass="text-2xl"
				lableClass={{ root: `tracking-tight font-sans ${labelClass}` }}
				iconComponent={icon}
			/>
		</div>
	);
};
Upload.defaultProps = {
	className: 'w-full',
	value: 'Select Image',
	mainClass: 'border py-1 rounded pl-2 pr-1 flex items-center flex-row-reverse justify-between',
	labelClass: 'text-gray-700 text-md py-1',
	icon: <BsPaperclip className="text-primary text-4xl" />,
	// className: "border mt-2 rounded w-32"
};
export default Upload;
