import Label from '@atoms/label';
import { Menu, Transition } from '@headlessui/react';
// import { useRouter } from "next/router";
import React, { Fragment, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';

const CustomDropDownMenuSort = ({
	labelValue,
	selectOptions,
	dropDownClasses,
	labelWrapperClass,
	labelClasses,
	labelBtnClasses,
	inputClasses,
	extraBtn,
}: any) => {
	const [selectedValue, setSelectedValue] = useState(selectOptions[0].value);
	const handleSortValue = (e: any) => {
		setSelectedValue(e.target.childNodes[0].data);
	};
	//   const history = useRouter();
	return (
		<Menu
			as="div"
			className="block text-left z-10"
		>
			<div>
				<Menu.Button className={labelBtnClasses}>
					{/* focusClasses: focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 */}
					<div className={labelWrapperClass}>
						<Label
							className={labelClasses}
							value={labelValue}
						/>
						<div className="flex items-center w-full">
							<input
								value={selectedValue}
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
			{/*  const selectOptions = [
    // { value: "", name: "Select one" },
    { value: "-views", name: "Most viewed" },
    { value: "-likes", name: "Most liked" },
    { value: "-dislikes", name: "Most disliked" },
    { value: "-created_at", name: "Most recent" },
  ]; */}
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
						{selectOptions.map((selectOption: any) => (
							<Menu.Item key={selectOption.name}>
								{({ active }) => (
									<span
										onClick={handleSortValue}
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
										onClick={handleSortValue}
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

CustomDropDownMenuSort.defaultProps = {
	extraBtn: false,
};

export default CustomDropDownMenuSort;
