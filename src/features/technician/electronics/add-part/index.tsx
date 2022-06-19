import { IElectronicsPart } from '@models/electronics';
import Steppers from '@molecules/steppers';
import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Configure from './formStep/configure';
import ElectronicsStep from './formStep/electronics';
import General from './formStep/general';
import SearchPart from './formStep/searchPart';
import useAddPart from './useAddPart';
import { useRouter } from 'next/router';
import { apiService } from '../../../../utils/request';

export default function AddPartElectronics() {
	const router = useRouter();
	const methods = useForm<IFormValues, object>({
		defaultValues: {
			editData: {},
			leg_meaning: [
				{
					pin_no: 1,
					pin_name: '',
					pin_property_one: '',
					pin_property_two: '',
					min_value: undefined,
					max_value: undefined,
				},
			],
			chart: {
				values: [{ x: 0, y: 0 }],
			},
		},
		reValidateMode: 'onChange',
	});

	const { setValue } = methods;
	const id = router?.query?.id;

	const [selectPart, setSelectPart] = useState<IElectronicsPart>();
	const threeDData = useRef({});
	const editorRef = useRef(null);
	const [partName, setPartName] = useState('');
	const [description, setDescription] = useState('');

	const [searchedPart, setSearchedPart] = useState(null);

	const setStep = useAddPart();
	const { step, nextStep } = setStep;
	useEffect(() => {
		if (selectPart) {
			nextStep();
		}
	}, [selectPart]);

	const getComponentData = () => {
		apiService(
			{
				method: 'get',
				url: `/part/electronic-part/${id}/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					setValue('editData', res?.data);
				}
			}
		);
	};

	useEffect(() => {
		//setValue('')
		if (id) {
			nextStep();
			getComponentData();
		}
	}, [id]);

	return (
		<>
			<FormProvider {...methods}>
				<div className="flex justify-center w-full mb-6 mt-[40px]">
					<Steppers
						currentStep={step}
						className="md:w-2/4 w-full eina-font-sb03 md:text-xl"
						options={['Add Part', 'Configure', 'Electronics', 'General']}
						icons={{
							1: <span>1</span>,
							2: <span>2</span>,
							3: <span>3</span>,
							4: <span>4</span>,
						}}
					/>
				</div>
				<div className="">
					<>
						{step == 0 ? (
							<SearchPart
								selectedPart={(selectedPart: any) => {
									setSelectPart(selectedPart?.item?.mpn);
									setPartName(selectedPart?.item?.mpn);
									setDescription(selectedPart?.snippet);
								}}
								searchedPart={searchedPart}
								onChangeSearchPart={(part) => setSearchedPart(part)}
							/>
						) : step == 1 ? (
							<Configure {...{ setStep, threeDData, editorRef }} />
						) : step == 2 ? (
							<ElectronicsStep
								selectedPart={selectPart ?? {}}
								setStep={setStep}
								{...{ threeDData, editorRef }}
							/>
						) : (
							<General
								{...{
									selectPart,
									setStep,
									threeDData,
									editorRef,
								}}
								partName={partName}
								description={description}
								onChangePartName={(value) => setPartName(value)}
								onChangeDescription={(value) => setDescription(value)}
							/>
						)}
					</>
				</div>
			</FormProvider>
		</>
	);
}

export interface IFormValues {
	editData?: any;
	is_visible?: boolean;
	qfn_dimensions?: IQFNDimensions;
	dimensions?: IQFNDimensions;
	leg_meaning?: ILegMeaning[];
	component?: number;
	country?: number;
	package?: number;
	package_type?: string;
	body_type?: string;
	type?: string;
	pin1_location?: string;
	total_pins?: number;
	category?: number;
	three_d_script?: unknown;
	description?: string;
	name?: string;
	chart?: IChart;
	icon?: File;
	code?: ICode;
	package_id?: number;
	image_svg?: unknown;
	simulation_video?: unknown;
}
interface IChart {
	title: string;
	label_x: string;
	label_y: string;
	values: IValue[];
}
interface ICode {
	name: string;
	file: File;
}
interface IValue {
	x: number;
	y: number;
}
interface ILegMeaning {
	pin_no: number;
	pin_name: string;
	pin_property_one: string;
	pin_property_two: string;
	min_value: number;
	max_value: number;
}

interface IQFNDimensions {
	package_type?: string;
	body_type?: string;
	name?: string;
	total_pins?: number;
	pin1_location?: string;
	values?: IValues[];
}

type IValues = {
	name?: string;
	value?: number;
};
