import Label from '@atoms/label';
import React from 'react';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
import { Multiselect } from 'multiselect-react-dropdown';

// import SimplePopper from '@atoms/generic-popper';
// import MultipleSelect from '@molecules/multiple-select-language'; this should be removed

interface AddMoreInformationProps {
	value: any;
	labelClasses: string;
	mainClass: string;
	languagesList?: any;
	change: (e?: any) => void;
	personName?: any;
	names?: any;
}

const AddMoreInformation: React.FC<AddMoreInformationProps> = (props: any) => {
	const { value, labelClasses, mainClass, languagesList, change } = props;

	return (
		<>
			<div className={`items-center ${mainClass}`}>
				<Label
					value={'Language'}
					classes={{ root: `font-proxima-nova tracking-tighter ${labelClasses}` }}
				/>
				<div className="col-span-2">
					<Multiselect
						options={languagesList}
						displayValue="name"
						selectedValues={value}
						placeholder="+ add new"
						onSelect={change}
					/>
				</div>
			</div>
		</>
	);
};

export default AddMoreInformation;

// className="w-full h-11 rounded-md p-0 py-2 pl-2 md:text-base text-sm tracking-tight text-[#999999]  border border-[#E6E6E6] border-opacity-40"
