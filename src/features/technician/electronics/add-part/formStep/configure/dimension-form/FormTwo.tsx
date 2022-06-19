import Button from '@atoms/button';
import Loader from '@atoms/loader';
import { ICPackage } from '@models/electronics';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getICPackageDetails } from 'request/electronics';

const FormTwo = ({ back }: { back: () => void }) => {
	const {
		register,
		getValues,
		// formState: { errors },
	} = useFormContext();
	const { package_id } = getValues();

	const { data, isSuccess, isLoading } = useQuery(
		[`ic-package-details`, package_id],
		() => getICPackageDetails(package_id),
		{
			keepPreviousData: false,
			// staleTime: Infinity,
			enabled: Boolean(package_id),
		}
	);
	const packageDetails: ICPackage = isSuccess ? data?.data : {};
	const properties = packageDetails.properties;

	return (
		<form
			// onSubmit={handleSubmit(submit)}
			className="bg-white rounded"
		>
			<div className="overflow-y-auto max-h-96 pr-4 -mr-4 relative min-h-[300px]">
				{isLoading && <Loader type="relative" />}
				{properties?.map((item, i) => (
					<div key={i}>
						<div className="flex items-center w-full mb-[20px]">
							<label className="text-[#666666] tracking-tight text-base 2xl:text-xl font-proxima-nova whitespace-nowrap mr-[20px] w-[400px]">
								<input
									{...register(`dimensions.values.${i}.name`)}
									value={item.name}
									hidden
								/>
								{item.name}
							</label>
							<div className="w-full">
								<input
									{...register(`dimensions.values.${i}.value`)}
									name={item.name}
									type="text"
									placeholder="0.1"
									className="pl-[20px] py-[15px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
									defaultValue={item.value}
								/>
							</div>

							{/* {errors?.clearance_ic_pcb && (
                <p className="text-sm text-red-400">
                  {errors?.clearance_ic_pcb.message}
                </p>
              )} */}
						</div>
					</div>
				))}
			</div>

			<div className="flex items-center justify-center space-x-20 w-full pt-6 lg:px-16 md:px-8">
				<Button
					value="Back"
					onClick={() => back()}
					// classes={{ root: 'shadow-none' }}
					variant="contained"
					color="inherit"
					className="bg-[#FBFBFB] border-opacity-50 border border-solid border-[#E6E6E6] w-40 transform-none text-gray-600 text-base 2xl:text-xl font-proxima-nova min-h-0 py-[13px]"
				/>
			</div>
		</form>
	);
};

export default FormTwo;
