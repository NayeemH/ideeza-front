import Button from '@atoms/button';
import Label from '@atoms/label';
import TaxResidenceFormOne from '@organisms/tax-residence-form-one';
import TaxResidenceFormTwo from '@organisms/tax-residence-form-two';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useForm } from 'react-hook-form';
import { updateUserDataAsync } from 'reducers/auth';

function TaxInformation() {
	const dispatch = useAppDispatch();
	const { userData, loading } = useAppSelector(({ auth }) => auth);
	const methods = useForm();
	const { handleSubmit } = methods;
	const { tax_information: taxInfo } = userData || {};

	const handlerSubmit = async (formData: any) => {
		const reqBody = {
			tax_information: {
				country: formData.country,
				address: formData.address,
				city: formData.city,
				postal_code: formData.postal_code,
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
		dispatch(updateUserDataAsync(payload));
	};

	return (
		<div className="space-y-4 md:w-10/12 lg:w-7/12 2xl:w-6/12 w-full pb-4 font-proxima-nova">
			<Label
				value="Tax information"
				classes={{
					root: 'text-primary text-xl xl:text-2xl pb-3 border-b tracking-normal font-semibold ',
				}}
			/>
			<form onSubmit={handleSubmit(handlerSubmit)}>
				<div className="bg-white rounded-lg shadow-md px-[30px] pt-[22px] mb-6 mt-5 ">
					<div>
						<Label
							value="Tax Residence"
							classes={{
								root: ` font-semibold text-xl xl:text-2xl 2xl:text-3xl mb-[11.4px] `,
							}}
						/>
						<hr className="w-11 border-t border-primary" />
						<TaxResidenceFormOne
							taxInfo={taxInfo}
							methods={methods}
						/>
					</div>
				</div>
				<div className="bg-white rounded-lg shadow-md p-8 mb-6">
					<Label
						value="Tax Residence"
						classes={{
							root: ` font-semibold text-xl xl:text-2xl 2xl:text-3xl mb-[11.4px] `,
						}}
					/>
					<hr className="w-11 border-t border-primary" />
					<TaxResidenceFormTwo
						taxInfo={taxInfo}
						methods={methods}
					/>

					<div className="flex items-center space-x-3 mt-[30px]">
						<Button
							type="submit"
							value="Save"
							className="text-white bg-primary border border-solid border-primary hover:text-primary px-[48px] py-3 text-base 2xl:text-lg shadow-none capitalize"
							loading={loading}
							disabled={loading}
						/>
						<Button
							value="Cancel"
							className="border border-solid px-[43px] bg-white text-[#787878]   text-base 2xl:text-lg shadow-none capitalize py-3 w-3/12"
						/>
					</div>
				</div>
			</form>
		</div>
	);
}

export default TaxInformation;
