import Button from '@atoms/button';
import Label from '@atoms/label';
import { ITaxInformation } from '@models/auth';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import { updateUserDataAsync } from 'reducers/auth';
import { FORMINPUT } from 'utils/styles';

function TaxResidenceFormTwo({
	methods,
	taxInfo,
}: {
	methods: UseFormReturn<any, object>;
	taxInfo: ITaxInformation | undefined;
}) {
	const {
		formState: { errors },
	} = methods;
	// TODO get address of technician

	const [address, setAddress] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const userData = useAppSelector((state) => state?.auth.userData);
	const dispatch = useAppDispatch();
	const [changeAddress, setChangeAddress] = useState(false);
	const handleAddressChange = () => {
		setChangeAddress((prev) => !prev);
	};
	const updateAddressOfUser = async () => {
		setChangeAddress(false);
		const formData = new FormData();
		formData.append('address', address);
		userData?.id &&
			dispatch(
				updateUserDataAsync({
					id: userData.id,
					payload: formData,
				})
			).then((res) => {
				if (res.payload) {
					toast.dismiss();
					toast.success('Address updated successfully!');
					setLoading(false);
				} else {
					toast.dismiss();
					toast.warning('Please recheck your form once again!');
					setLoading(false);
				}
			});
	};
	useEffect(() => {
		if (userData?.address) {
			setAddress(userData?.address);
		}
	}, []);

	return (
		<div className={` mt-5`}>
			<Label
				classes={{ root: `text-[#333333] text-lg mb-4` }}
				value={
					<>
						To collect the right information, indicate if you are a
						<span className="text-primary text-xl font-semibold "> U.S. person</span>:
					</>
				}
			/>
			<label className="mb-4 flex items-center mt-[25px]">
				<input
					type="radio"
					{...methods.register('us_person', {
						required: 'Select one',
					})}
					value="false"
					defaultChecked={taxInfo?.us_person}
				/>
				<span className="ml-2 text-gray-500">I'm not a U.S. person</span>
			</label>
			<label className="flex items-center mb-4">
				<input
					type="radio"
					{...methods.register('us_person', {
						required: 'Select one',
					})}
					value="true"
					defaultChecked={taxInfo?.us_person}
				/>
				<span className="ml-2 text-gray-500">I'm a U.S. person</span>
			</label>

			<Label
				value="Before withdrawing funds, all non-U.S. persons must provide W-8BEN tax information."
				classes={{
					root: `text-xl font-semibold text-[#333333] pb-7 pt-[22px]`,
				}}
			/>
			<label className="flex mb-4 items-center">
				<span className="pb-1 max-w-full	 text-gray-600 block text-base">
					Legal name of business
				</span>
				<input
					{...methods.register('business_name', {
						required: 'Enter your business name',
					})}
					className="bg-gray-100 rounded p-2 text-lg hover:bg-white border border-gray-100 hover:border-primary hover:shadow transition-all duration-500 ease-in-out w-full focus:border-primary focus-visible:outline-none"
					defaultValue={taxInfo?.business_name}
				/>
				{errors?.business_name && (
					<p className="text-sm text-red-400">{errors?.business_name.message}</p>
				)}
			</label>

			<Label
				value="Provide the same name as shown on your tax return."
				classes={{ root: `text-base text-[#646464] text-right` }}
			/>
			<div className="flex space-x-3 pt-5 pb-2">
				<Label
					value="Address"
					classes={{
						root: `font-semibold text-xl`,
					}}
				/>
				<div className="">
					<Label
						value="Change"
						classes={{
							root: `text-sm lg:text-base pt-1 cursor-pointer tracking-tight underline text-primary`,
						}}
						onClick={handleAddressChange}
					/>
					{changeAddress && (
						<div className="bg-white absolute p-4 shadow-xl">
							<br />
							<input
								type="text"
								placeholder="Enter your new address"
								onChange={(e: any) => setAddress(e?.target?.value)}
								className={FORMINPUT + ' w-full'}
							/>
							<Button
								value="update"
								className="bg-primary text-white p-2 mt-2"
								onClick={updateAddressOfUser}
								loading={loading}
								isloadingSmall={true}
							/>
						</div>
					)}
				</div>
			</div>
			<address className="text-md text-[#787878] not-italic mb-4">
				{address?.length ? (
					address
				) : (
					<>
						{' '}
						Nahal tavor 5, <br /> tel Aviv Region
						<br /> 9064500
						<br /> Israel
					</>
				)}
			</address>
			<div className="mb-6">
				<label className="pb-1 font-semibold text-lg block">
					Federal tax classification
				</label>
				<select
					className="border rounded border-solid border-gray-300 bg-white px-4 py-3 w-full"
					{...methods.register('federal_tax_classification', {
						required: 'Select federal tax classification',
					})}
				>
					<option
						value=""
						disabled
						selected
					>
						Please select...
					</option>
					<option value="type_one">Type 01</option>
				</select>
				{errors?.federal_tax_classification && (
					<p className="text-sm text-red-400">
						{errors?.federal_tax_classification.message}
					</p>
				)}
			</div>
			<Label
				classes={{
					root: `font-semibold text-lg mb-2`,
				}}
				value="Taxpayer identification number type"
			/>
			<label className="mb-4 flex items-center xl:mt-[24]">
				<input
					type="radio"
					value="SSN"
					{...methods.register('taxpayer_identification_type', {
						required: 'Select taxpayer identification number',
					})}
					defaultChecked={taxInfo?.taxpayer_identification_type === 'SSN' ? true : false}
				/>
				<span className="ml-2">Social security number (SSN)</span>
			</label>
			<label className="flex items-center mb-4">
				<input
					type="radio"
					{...methods.register('taxpayer_identification_type', {
						required: 'Select taxpayer identification type',
					})}
					value="EIN"
					defaultChecked={taxInfo?.taxpayer_identification_type === 'EIN' ? true : false}
				/>
				<span className="ml-2">Employer Identification Number (EIN)</span>
			</label>
			{errors?.taxpayer_identification_number && (
				<p className="text-sm text-red-400">
					{errors?.taxpayer_identification_number.message}
				</p>
			)}
			<label className="block mb-4">
				<span className="pb-1 font-sans text-gray-600 block font-light text-xl">
					SSN/EIN #
				</span>
				<input
					{...methods.register('taxpayer_identification_number', {
						required: 'Enter your taxpayer identification number',
					})}
					className="bg-gray-100 rounded p-2 text-lg hover:bg-white border border-gray-100 hover:border-primary hover:shadow transition-all duration-500 ease-in-out w-full focus:border-primary focus-visible:outline-none"
					defaultValue={taxInfo?.taxpayer_identification_number}
				/>
				{errors?.taxpayer_identification_number && (
					<p className="text-sm text-red-400">
						{errors?.taxpayer_identification_number.message}
					</p>
				)}
			</label>
			<label className="mt-[24px]">
				<input
					type="checkbox"
					{...methods.register('clarify')}
					className={`w-5 h-5 mr-2 text-primary ring-primary `}
					required
				/>
				<span className="text-[#999999]">
					I certify, under penalties of perjury, that the representations in this Tax
					Certificate are true and correct.
				</span>
			</label>
		</div>
	);
}
export default TaxResidenceFormTwo;
