import InputTech from '@atoms/input-tech';
import React from 'react';
import { BsSearch } from 'react-icons/bs';

const SearchInput: React.FC<any> = (props: any) => {
	const {
		className,
		inputClass,
		placeholder,
		position,
		iconClass,
		change,
		keyDown,
		containerClassInput,
		value,
	} = props;
	return (
		<div>
			<InputTech
				isIcon
				placeholder={placeholder}
				className={{
					root: `bg-white w-full text-gray-700 text-base  py-0 custom-tech-management-bg ${className}`,
				}}
				inputProps={`${inputClass}`}
				position={position}
				containerClass={`bg-white ${containerClassInput}`}
				onChange={change}
				value={value}
				onKeyDown={keyDown}
			>
				<BsSearch className={`mr-2 text-xl ${iconClass}`} />
			</InputTech>
		</div>
	);
};
SearchInput.defaultProps = {
	iconClass: 'text-[#787878] ',
	placeholder: 'Search',
	containerClassInput: 'rounded-[20]',
};
export default SearchInput;
