import Button from '@atoms/button';
import CheckboxAtom from '@atoms/checkbox';
import Label from '@atoms/label';
import Steppers from '@molecules/steppers';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineUser } from 'react-icons/ai';
import { IoHappySharp } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import { FORMINPUT } from 'utils/styles';

const ShareModalPrivate = (props: any) => {
	const { onClose, open, partData, onSubmit } = props;
	const [shareStep, setShareStep] = useState<number>(0);
	// console.log('partData----------', partData)

	return (
		<Dialog
			onClose={() => {
				onClose();
				setShareStep(0);
			}}
			open={open}
		>
			<DialogTitle>
				<span className="hover:rotate-180">
					<MdCancel
						className="text-primary absolute right-5 top-5  hover:cursor-pointer"
						onClick={() => {
							onClose();
							setShareStep(0);
						}}
					/>
				</span>

				<div className="flex justify-center">
					<Steppers
						currentStep={shareStep}
						className="md:w-3/4 w-full eina-font-sb03 md:text-2xl"
						options={['step 1', 'step 2']}
						icons={{
							1: (
								<span>
									<AiOutlineUser />
								</span>
							),
							2: (
								<span>
									<AiOutlineEye />
								</span>
							),
						}}
					/>
				</div>
			</DialogTitle>
			<DialogContent style={{ width: 400, zIndex: 110 }}>
				{shareStep === 0 && (
					<div>
						<Label
							value="Name of project"
							className="my-2"
						/>
						<input
							type="text"
							value={partData?.name}
							className={FORMINPUT + ' bg-gray-100'}
						/>
						<Label
							value="Description"
							className="my-2"
						/>
						<textarea
							value={partData?.description}
							rows={12}
							className={FORMINPUT + ' bg-gray-100'}
						/>

						<div className="flex items-center w-full pr-1 justify-between mt-2">
							<IoHappySharp className="text-blue-150 text-4xl" />
							<Button
								value="Next"
								className="text-white bg-primary transform-none rounded-sm tracking-tight py-1 px-12"
								onClick={() => setShareStep(1)}
							/>
						</div>
					</div>
				)}
				{shareStep == 1 && (
					<div className="">
						<div className="w-full flex justify-center border-b pb-4">
							<Label
								value="Project Preview"
								className="text-xl "
							/>
						</div>
						<div className="mt-4 border-b pb-4">
							<Label
								value={partData?.name}
								className="text-base"
							/>
							<Label
								value={partData?.description}
								className="my-2 text-sm"
							/>
							<video
								width="320"
								height="240"
								controls
							>
								<source
									src={partData?.simulation_video}
									type="video/mp4"
								/>
							</video>
						</div>
						<div className="flex items-start mt-4">
							<CheckboxAtom />
							<Label
								value="I confirm that I'm the rightful owner of this idea virtually or physically and any part of it. I know I have all responsibility in all legal and/or intellectual property issues that will occur because my product."
								className="text-xs"
							/>
						</div>
						<div className="w-full flex justify-between mt-4">
							<Button
								value={'Back'}
								className="text-lg bg-primary text-white px-12 "
								onClick={() => setShareStep((prev) => prev - 1)}
							/>
							<Button
								value={'Submit'}
								className="text-lg bg-primary text-white px-12"
								onClick={onSubmit}
							/>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default ShareModalPrivate;
