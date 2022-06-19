import Button from '@atoms/button';
import Label from '@atoms/label';
import TaxResidenceFormTwo from '@organisms/tax-residence-form-two';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { updateUserDataAsync } from 'reducers/auth';
import { toast } from 'react-toastify';

function TaxInformation() {
	const dispatch = useAppDispatch();
	const { userData, loading } = useAppSelector(({ auth }) => auth);
	const methods = useForm();
	const { handleSubmit } = methods;
	const { tax_information: taxInfo } = userData || {};

	const handlerSubmit = async (formData: any) => {
		const reqBody = {
			tax_information: {
				us_person: formData.us_person === 'true' ? true : false,
				business_name: formData.business_name,
				federal_tax_classification: formData.federal_tax_classification,
				taxpayer_identification_type: formData.taxpayer_identification_type,
				taxpayer_identification_number: formData.taxpayer_identification_number,
			},
		};
		const payload = {
			id: userData?.id ?? 0,
			payload: reqBody,
		};
		dispatch(updateUserDataAsync(payload)).then((res) => {
			if (res.payload) {
				toast.dismiss();
				toast.success('Updated successfully!');
			} else {
				toast.dismiss();
				toast.warning('Please recheck your form once again!');
			}
		});
	};
	return (
		<div className="space-y-4 md:w-10/12 lg:w-7/12 2xl:w-6/12 w-full">
			<Label
				value="Tax information"
				classes={{
					root: 'text-primary text-xl xl:text-2xl 2xl:text-3xl tracking-normal font-semibold font-sans',
				}}
			/>
			<form onSubmit={handleSubmit(handlerSubmit)}>
				{/* <div className="bg-white rounded-lg shadow-md">
        <TaxResidenceTech main2Class="hidden" />
      </div> */}
				<div>
					<div className="bg-white rounded-lg shadow-md p-8 mb-6">
						<TaxResidenceFormTwo
							taxInfo={taxInfo}
							methods={methods}
						/>
					</div>
					<div className="flex items-center space-x-3">
						<Button
							type="submit"
							value="Save"
							className="text-white bg-primary border border-solid border-primary hover:text-primary text-base 2xl:text-xl shadow-none capitalize"
							loading={loading}
							disabled={loading}
						/>
						<Button
							value="Cancel"
							className="border border-solid  bg-white text-gray-300   text-base 2xl:text-xl shadow-none capitalize w-3/12"
						/>
					</div>
				</div>
			</form>
		</div>
	);
}

export default TaxInformation;
