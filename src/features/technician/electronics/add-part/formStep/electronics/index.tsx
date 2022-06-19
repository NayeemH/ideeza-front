import Button from '@atoms/button';
import Label from '@atoms/label';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { IElectronicsPart } from '@models/electronics';
import AddChart from './AddChart';
import AddLegMenning from './AddLegMenning';
import { IUseAddPart } from '../../useAddPart';
import { useFormContext } from 'react-hook-form';

export default function ElectronicsStep({
	selectedPart,
	setStep,
	threeDData,
	editorRef,
}: {
	selectedPart: IElectronicsPart;
	setStep: IUseAddPart;
	threeDData: any;
	editorRef: any;
}) {
	const [show, setShow] = useState<'none' | 'leg' | 'chart'>('none');
	const [viewType, setViewType] = useState('3d');

	const [pinRowsHasError, setPinRowsHasError] = useState(false);

	const {
		handleSubmit,
		formState: { errors },
		getValues,
		setError,
	} = useFormContext();
	const submit = () => {
		setStep.nextStep();
	};

	const onSubmit = handleSubmit(submit);

	return (
		<div className="mt-[60px]">
			<form onSubmit={onSubmit}>
				<div className="flex justify-between items-center py-[25px] px-[30px] bg-white border border-solid border-[#E7E7E7] rounded-[6px] mb-4">
					<div className="flex items-center gap-4">
						<Avatar src="/images/layer_4.png" />
						<div className="text-gray-600">
							<p className="text-base font-proxima-nova">{selectedPart.name}</p>
							<p className="text-base">{selectedPart.description}</p>
						</div>
					</div>
					<div className="flex gap-[15px]">
						<span
							className="px-[30px] py-[14px] border border-solid border-[#E7E7E7] text-[#787878] flex items-center gap-2 bg-[#FBFBFB] rounded-[5px] leading-[30px]"
							onClick={() => {
								setViewType('2d');
							}}
						>
							<span className="text-base font-proxima-nova">2D Preview</span>
						</span>
						<span
							className="px-[30px] py-[14px] border border-solid border-[#E7E7E7] text-[#787878] flex items-center gap-2 bg-[#FBFBFB] rounded-[5px] leading-[30px]"
							onClick={() => {
								setViewType('3d');
							}}
						>
							<span className="text-base font-proxima-nova">3D Preview</span>
						</span>
						<span className="px-[30px] py-[14px] border border-solid border-[#E7E7E7] text-[#787878] flex items-center gap-2 bg-[#FBFBFB] rounded-[5px] leading-[30px]">
							<img
								src="/images/-e-pdf.png"
								alt="icon"
							/>
							<span className="text-base font-proxima-nova">Datasheet</span>
						</span>
					</div>
				</div>
				<div className="bg-white px-[30px] pb-[40px] border border-solid border-[#E6E6E6] rounded-[6px]">
					<Label
						value="Add Electronics Configuration"
						className="font-proxima-nova text-[16px] 2xl:text-[24px] font-semibold text-primary py-[12px] border-b border-solid border-[#E6E6E6] mb-[20px]"
					/>

					{show !== 'none' ? (
						<Tab
							tabsData={[
								{
									name: 'leg',
									title: (
										<div className="flex flex-col">
											{errors?.leg_meaning && (
												<p className="text-red-400 text-xs md:ml-2">
													{'Please Check Your Leg Meaning form'}
												</p>
											)}
											<div className="flex gap-4 justify-center">
												<img
													src="/images/icon/legs-chip.svg"
													alt=""
												/>{' '}
												Leg Meaning
											</div>
										</div>
									),
									component: (
										<AddLegMenning
											{...{ editorRef, viewType, threeDData, setViewType }}
											onPinRowsHasError={(error: boolean) => {
												setPinRowsHasError(error);
											}}
										/>
									),
								},
								{
									name: 'chart',
									title: (
										<div className="flex flex-col">
											{errors?.chart && (
												<p className="text-red-400 text-xs md:ml-2">
													{'Please Check Chart description.'}
												</p>
											)}

											<div className="flex gap-4 justify-center">
												<img
													src="/images/icon/chart-icon.svg"
													alt=""
												/>
												Chart
											</div>
										</div>
									),
									component: <AddChart />,
								},
							]}
							defaultActive={show}
						/>
					) : (
						<>
							<div className="grid lg:grid-cols-2 grid-cols-1 items-center justify-between gap-[30px] pt-2">
								<div
									className={`bg-white w-full rounded-[10px] border border-solid border-[#E6E6E6] p-5 h-96 flex flex-col items-center justify-center space-y-10 py-10`}
								>
									<img
										src="/images/leg-meaning.svg"
										className="w-22"
										alt=""
									/>
									<Button
										value="Leg Meaning"
										onClick={() => setShow('leg')}
										className="bg-[#FBFBFB] shadow-none border border-solid font-proxima-nova border-[#E6E6E6] w-60 leading-tight transform-none text-[#787878] text-base font-proxima-nova rounded-[5px] tracking-tight py-[14px] text-[18px]"
									/>
								</div>
								<div
									className={`rounded-[10px] border border-solid border-[#E6E6E6] bg-white w-full p-5 h-96 flex flex-col items-center justify-center space-y-10 py-10`}
								>
									<img
										src="/images/e-bar-chart.svg"
										className="w-22"
										alt=""
									/>
									<Button
										value="Chart"
										onClick={() => setShow('chart')}
										className="bg-[#FBFBFB] shadow-none border border-solid font-proxima-nova border-[#E6E6E6] w-60 leading-tight transform-none text-[#787878] text-base font-proxima-nova rounded-[5px] tracking-tight py-[14px] text-[18px]"
									/>
								</div>
							</div>
						</>
					)}
				</div>

				<div className="flex justify-between mt-8">
					<Button
						value="Back"
						onClick={() => setStep.backStep()}
						classes={{ root: 'shadow-none' }}
						variant="contained"
						color="inherit"
						className="bg-[#FBFBFB] border-opacity-50 border border-solid border-[#E6E6E6] w-40 transform-none text-gray-600 text-base 2xl:text-xl font-proxima-nova min-h-0 py-[10px]"
					/>
					{Object.keys(errors).length === 0 && show !== 'none' && !pinRowsHasError && (
						<Button
							value="Next"
							classes={{ root: 'shadow-none' }}
							variant="contained"
							color="primary"
							className="bg-primary w-40 transform-none text-white text-base font-proxima-nova rounded-[5px] min-h-0"
							onClick={() => {
								if (getValues().chart?.length === 0) {
									setError('chart', {
										message: 'Please check chart tab',
									});
									return;
								}
								onSubmit();
							}}
						/>
					)}
				</div>
			</form>
		</div>
	);
}

function Tab({
	tabsData,
	defaultActive,
}: {
	tabsData: { name: string; component: JSX.Element; title: JSX.Element }[];
	defaultActive: string;
}) {
	const [active, setActive] = useState<string>(defaultActive);

	return (
		<>
			<div className="flex gap-[65px] mb-4">
				{tabsData.map((tab) => (
					<button
						type="button"
						color={active === tab.name ? 'primary' : 'inherit'}
						key={tab.name}
						onClick={() => setActive(tab.name)}
						className={`${
							active === tab.name
								? 'text-primary border border-solid border-primary'
								: 'text-gray-600 bg-white'
						} flex-1 border block px-4 py-2 bg-[#FBFBFB]`}
					>
						{tab.title}
					</button>
				))}
			</div>
			<div>
				{tabsData.map((tab) => (
					<div
						key={tab.name}
						className={active === tab.name ? 'block' : 'hidden'}
					>
						{tab.component}
					</div>
				))}
			</div>
		</>
	);
}
