import { useState } from 'react';
export interface IUseAddPart {
	step: number;
	nextStep: () => void;
	backStep: () => void;
	set: (n: number) => void;
}
export default function useAddPart(): IUseAddPart {
	const [step, setStep] = useState(0);

	const nextStep = () => {
		setStep((prev) => prev + 1);
	};
	const backStep = () => {
		setStep((prev) => (prev !== 0 ? prev - 1 : 0));
	};
	const set = (n: number) => {
		setStep(n);
	};

	return {
		step,
		nextStep,
		backStep,
		set,
	};
}
