import FormBasic from './formBasic';
import FormCustomBlock from './formCustomBlock';
import FormDescription from './formDescription';

export default function CustomBlockForm({ formStep, setFormStep, methods, handleColor }: any) {
	return (
		<div className="h-[100%]">
			{formStep === 0 ? (
				<FormBasic
					setFormStep={() => setFormStep((prev: number) => prev + 1)}
					methods={methods}
					color={(e: any) => handleColor(e)}
				/>
			) : formStep === 1 ? (
				<FormCustomBlock
					setFormStep={() => setFormStep((prev: number) => prev + 1)}
					setFormback={() => setFormStep((prev: number) => prev - 1)}
					methods={methods}
				/>
			) : (
				<FormDescription
					methods={methods}
					setFormback={() => setFormStep((prev: number) => prev - 1)}
				/>
			)}
		</div>
	);
}
