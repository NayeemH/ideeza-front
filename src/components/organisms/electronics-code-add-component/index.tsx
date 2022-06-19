import Button from '@atoms/button';
import Label from '@atoms/label';
// import CustomBlockCreate from '@organisms/custom-block-create';
import React, { useState } from 'react';
// import { useFormContext } from 'react-hook-form';
import CodePart from '@features/technician/code/add-part';

// interface IData {
// 	[k: string]: string | number;
// }
interface ElectronicsCodeAddComponentProps {
	setStep: React.Dispatch<React.SetStateAction<number>>;
	onAddPart: any;
}

const ElectronicsCodeAddComponent: React.FC<ElectronicsCodeAddComponentProps> = ({
	setStep,
	onAddPart,
}) => {
	// const { setValue } = useFormContext();
	const [addCodePage, setAddCodePage] = useState(false);
	// const [data, setData] = useState<IData>({});

	// useEffect(() => {
	// 	if (data.xmlCode) {
	// 		setValue('editor_script', data.xmlCode);
	// 	}
	// }, [data.xmlCode]);
	return (
		<div className="w-full">
			{/* <Label
				variant="h6"
				color="primary"
				value="Choice On Code"
				className="leading-tight font-proxima-nova texl-lg 2xl:text-2xl font-bold text-primary md:ml-4"
			/> */}
			<div className="w-full flex items-center border-gray-135 rounded-md p-4  mt-5">
				{addCodePage ? (
					<div className="mb-5 w-full">
						<CodePart onAddPart={onAddPart} />
						{/* <CustomBlockCreate data={setData} /> */}
					</div>
				) : (
					<div className="bg-white w-full">
						<Label
							variant="h6"
							color="primary"
							value="Choice On Code"
							className="leading-tight font-proxima-nova texl-lg 2xl:text-[24px] font-semibold text-primary ml-[30px] mt-[25px]"
						/>
						<div className="w-full flex flex-col sm:flex-row items-center gap-4 justify-center self-center bg-white min-h-[150px] lg:min-h-[600px]">
							<Button
								variant="contained"
								color="primary"
								className="bg-primary w-40 transform-none text-white text-base 2xl:text-xl font-proxima-nova "
								value="Add Code"
								onClick={() => setAddCodePage((prev) => !prev)}
							/>
							<Button
								variant="outlined"
								color="primary"
								className=" w-72 transform-none text-base 2xl:text-xl font-proxima-nova "
								value="Continue Without Code"
								onClick={() => setStep((prev) => prev + 1)}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ElectronicsCodeAddComponent;
