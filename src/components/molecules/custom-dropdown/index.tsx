import Label from '@atoms/label';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';

export interface customDropDownProps {
	labelValue?: string;
	className?: any;
	selectOptions?: any;
	dropDownClasses?: string;
	labelWrapperClass?: string;
	labelClasses?: string;
	labelBtnClasses?: string;
	inputClasses?: string;
	extraBtn?: boolean;
	isCartDropDown?: boolean;
	contentOverFlow?: boolean;
	change?: (e?: any) => void;
	selectedValue?: string;
	placeholder?: string;
	onChange?(value: any): void;
	hideLabel?: boolean;
}

const CustomDropDownMenu: React.FC<customDropDownProps> = ({
	labelValue,
	// className,
	selectOptions,
	dropDownClasses,
	labelWrapperClass,
	labelClasses,
	labelBtnClasses,
	inputClasses,
	extraBtn,
	selectedValue,
	placeholder,
	// contentOverFlow,
	hideLabel,
	onChange,
	change,
}) => {
	const [value, setValue] = useState<any>();
	useEffect(() => {
		setValue(selectedValue);
	}, [selectedValue]);
	// console.log(value);

	const handleChange = (e: any, value: any = undefined) => {
		e.stopPropagation();
		if (change) {
			change(value);
		}

		setValue(e.target.childNodes[0].data);
	};

	return (
		<Menu
			as="div"
			className="text-left w-full"
		>
			<div>
				<Menu.Button className={labelBtnClasses}>
					{/* focusClasses: focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 */}
					<div className={labelWrapperClass}>
						{!hideLabel && (
							<Label
								className={labelClasses}
								value={labelValue}
							/>
						)}

						<div className="flex items-center ">
							<input
								// defaultValue={value}
								value={value}
								placeholder={placeholder}
								className={inputClasses}
							/>
							<FaChevronDown
								className="-ml-8"
								color="gray"
								fontSize="16"
							/>
						</div>
					</div>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className={dropDownClasses}>
					<div className="py-1">
						{selectOptions?.map((selectOption: any) => (
							<Menu.Item key={selectOption.name}>
								{({ active }) => (
									<span
										onClick={(e: any) => {
											handleChange(e, selectOption?.id);
											if (selectOption && selectOption.value && onChange) {
												onChange(selectOption.value);
											}
										}}
										className={
											active
												? 'text-gray-700 block px-4 py-2 text-lg cursor-pointer font-sans hover:text-primary tracking-wider'
												: 'text-gray-700 block px-4 py-2 text-lg font-sans hover:text-primary tracking-wider'
										}
									>
										{selectOption.name}
									</span>
								)}
							</Menu.Item>
						))}

						{extraBtn && (
							<Menu.Item>
								{({ active }) => (
									<span
										onClick={handleChange}
										className={
											active
												? 'block px-4 py-2 text-lg cursor-pointer font-sans text-primary tracking-wider'
												: 'block px-4 py-2 text-lg font-sans text-primary tracking-wider'
										}
									>
										<hr />
										<span className="flex items-center">
											Add new <BsPlus className="text-xl" />
										</span>
									</span>
								)}
							</Menu.Item>
						)}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

CustomDropDownMenu.defaultProps = {
	extraBtn: false,
	inputClasses:
		'h-8 rounded-sm sm:w-44 md:w-56 lg:w-48 xl:w-52 2xl:w-60 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-white',
	labelBtnClasses:
		'inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700',
	labelClasses:
		'capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans',
	labelWrapperClass: 'flex cursor-pointer md:relative gap-4 items-center',
	dropDownClasses:
		'origin-top-right z-20 mt-0 sm:w-44 md:w-56 lg:w-48 xl:w-52 2xl:w-60 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1',
};

export default CustomDropDownMenu;
