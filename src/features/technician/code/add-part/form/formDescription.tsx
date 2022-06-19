import Button from '@atoms/button';
import { UseFormReturn } from 'react-hook-form';

export default function FormDescription({
	setFormback,
	methods,
}: {
	setFormback: () => void;
	methods: UseFormReturn<any, object>;
}) {
	const { register } = methods;
	return (
		<div className="bg-white p-[30px] rounded-[10px] border ">
			<span className="text-[#333333] text-base 2xl:text-[20px] font-proxima-nova">
				Description
			</span>
			<div className="mt-[15px]">
				<textarea
					{...register('description')}
					className="text-[#333333] bg-[#FBFBFB] w-full mb-5 border-solid rounded-[10px] border focus:outline-none text-[18px] font-proxima-nova pl-[20px] pt-[15px] "
					id=""
					placeholder="Type the description here"
					cols={30}
					rows={10}
				></textarea>
			</div>

			<Button
				onClick={setFormback}
				value="Back"
				type="button"
				className="bg-[#FBFBFB] border-opacity-50 border border-solid border-[#E6E6E6] w-40 transform-none text-gray-600 text-base 2xl:text-xl font-proxima-nova min-h-0 py-[12px]"
			/>
		</div>
	);
}
