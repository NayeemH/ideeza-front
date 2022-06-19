import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
function AddLegMeaning(props: any) {
	const { mainClass, mainClass2, row, index, handleInput } = props;
	return (
		<div className={mainClass}>
			<div className={mainClass2}>
				<div className={`md:col-span-2 ${row}`}>
					<input
						className="xl:w-26 mr-2 p-0 h-8 text-base 2xl:text-xl tracking-tight rounded-none font-sans border border-solid border-gray-725 text-black-900"
						placeholder="Name"
						name="name"
						onChange={(e) => handleInput(index, e)}
					/>
					<input
						className="xl:w-26 mr-2 p-0 h-8 text-base 2xl:text-xl tracking-tight rounded-none font-sans border border-solid border-gray-725 text-black-900"
						placeholder="Min"
						name="min"
						onChange={(e) => handleInput(index, e)}
					/>
					<input
						className="xl:w-26 mr-2 p-0 h-8 text-base 2xl:text-xl tracking-tight rounded-none font-sans border border-solid border-gray-725 text-black-900"
						placeholder="Max"
						name="max"
						onChange={(e) => handleInput(index, e)}
					/>

					<div className="w-5">
						<AiOutlineClose className="text-xl text-gray-900 pl-1" />
					</div>
				</div>
			</div>
		</div>
	);
}
AddLegMeaning.defaultProps = {
	mainClass: '',
	mainClass2: 'flex space-y-2 border-b pb-2 justify-between px-2 md:px-4 md:pl-6 items-center',
	row: 'items-center flex space-x-1',
	class2: 'text-gray-900 text-sm font-sans py-0',
	class3: 'xl:w-40 mr-4 p-0 h-8 text-base 2xl:text-xl tracking-tight rounded-none font-sans border border-solid border-gray-725 text-black-900',
	class5: 'text-gray-900 text-sm py-0',
};
export default AddLegMeaning;
