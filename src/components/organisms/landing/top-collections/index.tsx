import Label from '@atoms/label';
import CustomSelect from '@molecules/custom-select';
import React from 'react';
import Collections from '../collections';

const TopCollections = () => {
	// const [age, setAge] = useState("");

	// const handleLabel = (event: SelectChangeEvent) => {
	//   setAge(event.target.value as string);
	// };
	return (
		<div className="bg-white lg:mt-[50px] mr-[20px] ml-[20px] 2xl:mt-[150px] xl:mr-[50px] xl:ml-[50px] 2xl:ml-[197px] 2xl:mr-[197px]">
			<div className="flex justify-center items-center mb-10">
				<Label
					value="Top collection over"
					className="text-[12px] sm:text-xl lg:text-[30px] 2xl:text-[48px] leading-[22px] sm:leading-[72px] font-semibold mr-2"
				/>
				<CustomSelect
					options={[
						{ name: 'last month', value: 'last month' },
						{ name: 'last 7 days', value: 'last 7 days' },
						{ name: 'last year', value: 'last year' },
					]}
					inputClassName=" w-28 sm:w-[150px] lg:w-[200px] xl:w-[300px] focus:outline-none rounded p-4 pl-1 text-[12px] sm:text-xl lg:text-[30px] 2xl:text-[48px] placeholder-[#F301C3] text-[#F301C3] font-semibold font-semibold cursor-pointer"
					placeholder="last 7 days"
					unorderedList="absolute overflow-y-auto bg-white shadow-lg flex flex-wrap gap-4 z-10 mt-5 top-[55px] text-xl lg:text-[20px] w-28 sm:w-[150px] lg:w-[300px]"
					arrowColor=" text-primary ml-[-40px] lg:ml-[-30px] xl:-ml-6"
					arrowColorTop=" text-primary ml-[-40px] lg:ml-[-30px] xl:-ml-6"
				/>
			</div>
			<Collections />
		</div>
	);
};

export default TopCollections;
