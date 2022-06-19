const PillButton = ({
	active,
	setActive,
	electroBg,
	pillValueFrist,
	pillValueSecond,
	pillValueThird,
}: {
	active?: 'blockly' | 'code' | '3D';
	setActive: (arg: 'blockly' | 'code' | '3D') => void;
	electroBg?: boolean;
	pillValueFrist: string;
	pillValueSecond: string;
	pillValueThird?: string;
}) => {
	return (
		<div
			className={`${
				electroBg
					? 'flex bg-transparent'
					: 'md:w-96 grid grid-cols-1 md:grid-cols-2 bg-white'
			}  ml-auto my-0 items-center border overflow-hidden  border-solid border-grey-135 md:rounded-full`}
		>
			<span
				onClick={() => setActive('blockly')}
				className={`${
					active === 'blockly' ? 'bg-[#441184] text-white' : 'bg-white'
				} font-proxima-nova text-base 2xl:text-[18px] text-center transition-all  cursor-pointer select-none duration-700 ease-in rounded-full px-[30px] py-[12px] w-full`}
			>
				{pillValueFrist}
			</span>
			<span
				onClick={() => setActive('code')}
				className={`${
					active === 'code' ? 'bg-[#441184] text-white' : 'bg-white'
				} font-proxima-nova text-base 2xl:text-[18px] text-center transition-all  cursor-pointer select-none duration-700 ease-in rounded-full px-[30px] py-[12px] w-full`}
			>
				{/* Code Preview */}
				{pillValueSecond}
			</span>
			{electroBg ? (
				<span
					onClick={() => setActive('3D')}
					className={`${
						active === '3D' ? 'bg-[#441184] text-white' : ''
					} font-proxima-nova text-base 2xl:text-[18px] text-center transition-all  cursor-pointer select-none duration-700 ease-in rounded-full px-[30px] py-[12px] w-full`}
				>
					{pillValueThird}
				</span>
			) : (
				''
			)}
		</div>
	);
};

export default PillButton;
