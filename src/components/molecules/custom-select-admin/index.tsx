import { useState, useRef, useEffect } from 'react';
// import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { useOutsideClickHandler } from 'utils/utils';

interface IOptions {
	name: string;
	value: string;
	isArrowTrue?: string;
}

export default function AdminCustomSelect({
	customValue,
	onchangeSelect,
	options,
	inputClassName = 'form-select w-full',
	unorderedList = 'absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10',
	field,
	placeholder = 'Select',
	arrowColor = ' gray -ml-5',
	arrowColorTop = ' text-primary -ml-5',
	isArrowTrue,
}: {
	customValue?: any;
	onchangeSelect?: any;
	options: IOptions[];
	inputClassName?: string;
	unorderedList?: string;
	field?: any;
	placeholder?: string;
	arrowColor?: string;
	arrowColorTop?: string;
	isArrowTrue?: boolean;
}) {
	const [value, setValue] = useState('');
	const [toggle, setToggle] = useState(false);
	const ref = useRef(null);
	useOutsideClickHandler(ref, () => setToggle(!toggle));

	useEffect(() => {
		if (customValue) setValue(customValue);
		// console.log('CustomValue: ', customValue);
	}, [customValue]);

	return (
		<div
			className={`relative flex items-center ${isArrowTrue ? 'flex-col justify-center' : ''}`}
		>
			<input
				type="text"
				className={inputClassName}
				readOnly
				placeholder={placeholder}
				value={value}
				{...field}
				onClick={() => setToggle(!toggle)}
			/>
			{toggle ? (
				<MdOutlineKeyboardArrowUp
					onClick={() => setToggle(false)}
					className={arrowColorTop + ' cursor-pointer text-[30px] '}
				/>
			) : (
				<MdOutlineKeyboardArrowDown
					onClick={() => setToggle(true)}
					className={arrowColor + ' cursor-pointer text-[30px]'}
				/>
			)}

			{toggle && (
				<ul
					className={unorderedList}
					ref={ref}
				>
					{options.map((item: IOptions) => (
						<li
							key={item.value}
							onClick={() => {
								onchangeSelect(item.value);
								setValue(item.value);
								setToggle(!toggle);
							}}
							className={` cursor-pointer hover:bg-gray-100 w-full p-4 py-3 ${
								value === item.value ? 'text-primary' : ''
							}`}
						>
							{item.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
