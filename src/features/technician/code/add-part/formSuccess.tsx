import Confirmation from '@organisms/confirmation';

export default function FormSuccess({ goBack }: { goBack: () => void }) {
	return (
		<div className="pt-4 w-full">
			<Confirmation
				iconEnd=""
				src="/images/success-add.png"
				value="Your part is added."
				lableClass="text-[#333333] font-sans text-xl xl:text-3xl 2xl:text-4xl tracking-normal"
				lableClass2="text-[#333333] font-sans text-xl xl:text-3xl 2xl:text-4xl tracking-normal"
				btnValue="+Add new part"
				btnClass="bg-primary rounded-[6px] px-[30px] mt-5 py-[15px] text-base 2xl:text-[18px] font-sans tracking-tight transform-none text-white"
				clickHandler={() => goBack()}
				mainClass="bg-white h-[400px] 2xl:h-[600px] justify-center rounded-md p-7 py-20 flex flex-col items-center"
			/>
		</div>
	);
}
