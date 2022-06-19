import FormBasic from './Basic';
import FormCustomBlock from './CustomBlock';
import FormDescription from './Description';

export default function CustomBlockForm({ formStep, setFormStep, handleColor }: any) {
	return (
		<div className="h-[100%]">
			{formStep === 0 ? (
				<FormBasic
					setFormStep={() => setFormStep((prev: number) => prev + 1)}
					color={(e: any) => handleColor(e)}
				/>
			) : formStep === 1 ? (
				<FormCustomBlock
					setFormStep={() => setFormStep((prev: number) => prev + 1)}
					setFormback={() => setFormStep((prev: number) => prev - 1)}
				/>
			) : (
				<FormDescription setFormback={() => setFormStep((prev: number) => prev - 1)} />
			)}
		</div>
	);
}
