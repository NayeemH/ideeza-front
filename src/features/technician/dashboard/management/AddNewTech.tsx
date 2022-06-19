// import { useAppSelector } from "app/hooks";
import React, { useEffect, useState } from 'react';
import Label from '@atoms/label';
import Button from '@atoms/button';
// import CustomDropDownMenu from "@molecules/custom-dropdown";
// import CustomDropDownMenuSort from "@molecules/dropdown-items-custom";
import { useForm } from 'react-hook-form';
// import CustomDropDownMenuSort from '@molecules/dropdown-items-custom';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import { apiService } from '../../../../utils/request';
import { applied_freelancers } from '../../../../static/data/technician/about_career';
import { toast } from 'react-toastify';

interface AddNewTechFeatureProps {
	containerClass?: string;
	extraBtn?: boolean;
	classessort?: any;
}

const AddNewTechFeature: React.FC<AddNewTechFeatureProps> = (props) => {
	const { classessort } = props;
	const { register, handleSubmit, setValue } = useForm();
	// const [permissionType, setPermissionType] = useState("admin");
	// const [selectedYear, setSelectedYear] = useState("2021");
	// const [loading, setLoading] = useState<any>(false);
	// const isNewExecutiveAdded = useAppSelector(({ task }) => task); //those sections should be moderated
	// const loader = useAppSelector(({ task }) => task);
	// const dispatch = useAppDispatch();

	const [year, setYear] = useState('');
	const [permissionType, setPermissionType] = useState('');

	useEffect(() => {
		setValue('year', year);
		setValue('permission_type', permissionType);
	}, [year, permissionType]);

	const handlerSubmit = (data: any) => {
		if (data) {
			// const dateOfBirthStr = selectedYear + "-" + data.month + "-" + data.day;
			// const dateOfBirth = new Date(dateOfBirthStr).toISOString();
			// const formData = new FormData();
			// formData.append('email', data.email);
			// formData.append('username', data.username);
			// formData.append('first_name', data.first_name);
			// formData.append('last_name', data.last_name);
			// formData.append('password', data.password);
			// formData.append('user_type', 'Electrician');
			// formData.append('groups', '1');
			// formData.append("date_of_birth", dateOfBirth);
			// formData.append("user_type", permissionType);
			// dispatch(onPostExecutive(Object.fromEntries(formData.entries())));

			apiService(
				{
					method: 'post',
					url: `/`,
					data,
					token: true,
				},
				(res: any, error: any) => {
					if (res) {
						toast.success('Submitted successfully!');
						return;
					}

					if (error) {
						toast.success('Failed to submit!');
						return;
					}
				}
			);
		}
	};

	// useEffect(() => {
	//   if (isNewExecutiveAdded) {
	//     //Clear Form Data
	//   }
	// }, [isNewExecutiveAdded]);

	// useEffect(() => {
	//   setLoading(loader);
	// }, [loader]);

	return (
		<>
			<form onSubmit={handleSubmit(handlerSubmit)}>
				<div className="pt-4">
					<Label
						value="Add new executive"
						classes={{
							root: 'text-primary tracking-tight font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
						}}
					/>
					<div className="w-full bg-white rounded-lg shadow lg:w-3/5 md:w-4/5 space-y-5 p-6 px-11 pt-10">
						<input
							// error={errors}
							{...register('email', { required: 'Email Is Required' })}
							// control={control}
							placeholder="Email address"
							className="text-gray-700 w-full  text-base 2xl:text-xl font-sans p-2 pl-4 h-11 py-2 -ml-2 rounded border border-solid border-gray-160"
						/>
						{/*<input
							// error={errors}
							{...register('username', { required: 'Username Is Required' })}
							// control={control}
							placeholder="Username"
							className="text-gray-700 w-full text-base 2xl:text-xl font-sans p-2 pl-4 h-11 py-2 -ml-2 rounded border border-solid border-gray-160"
						/>*/}
						<input
							// error={errors}
							// {...register({ required:  })}
							// control={control}
							{...register('first_name', { required: 'Firstname Is Required' })}
							placeholder="First Name"
							className="w-full text-gray-700 text-base 2xl:text-xl font-sans p-2 pl-4 h-11 py-2 -ml-2 rounded border border-solid border-gray-160"
						/>
						<input
							// error={errors}
							// {...register({ required: "LastName Is Required" })}
							{...register('last_name', { required: 'lastname Is Required' })}
							// control={control}
							placeholder="Last Name"
							className="text-gray-700 w-full text-base 2xl:text-xl font-sans p-2 pl-4 h-11 py-2 -ml-2 rounded border border-solid border-gray-160"
						/>
						<input
							// error={errors}
							// {...register({ required:  })}
							{...register('password', { required: 'Password Is Required' })}
							// control={control}
							placeholder="Choose a password"
							name="password"
							className="w-full text-gray-700 text-base 2xl:text-xl font-sans p-2 pl-4 h-11 py-2 -ml-2 rounded border border-solid border-gray-160"
						/>
						<Label
							value="Other people won't see your birthday."
							className="text-base 2xl:text-xl pt-8 text-gray-900 tracking-normal font-sans"
						/>
						<div className="flex md:flex-row flex-col items-center justify-between md:space-x-2 space-y-2 md:space-y-0">
							<input
								// error={errors}
								// {...register({ required:  })}
								{...register('month', { required: 'Month Is Required' })}
								// control={control}
								placeholder="Month"
								className="w-full text-gray-700 text-base 2xl:text-xl font-sans p-2 pl-4 h-11 py-2 -ml-2 rounded border border-solid border-gray-160"
							/>
							<input
								// error={errors}
								// {...register({ required:  })}
								// control={control}
								{...register('day', { required: 'Day Is Required' })}
								placeholder="Day"
								className="w-full text-gray-700 text-base 2xl:text-xl font-sans p-2 pl-4 h-11 py-2 -ml-2 rounded border border-solid border-gray-160"
							/>
							<CustomDropDownMenu
								className={classessort}
								selectOptions={[
									{
										name: '2021',
										value: '2021',
									},
									{
										name: '2020',
										value: '2020',
									},
									{
										name: '2019',
										value: '2019',
									},
									{
										name: '2018',
										value: '2018',
									},
								]}
								inputClasses="p-2 pl-4 py-2.5 w-80 rounded border border-solid border-gray-160  font-sans tracking-wider text-base  cursor-pointer"
								labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
								labelWrapperClass="flex cursor-pointer md:relative "
								dropDownClasses="origin-top-right z-20 mt-0 w-80 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded -mt-1"
								placeholder="Year"
								onChange={(value) => setYear(value)}
							/>
							{/*<Select
                                placeholder="Year"
                                value={selectedYear}
                                containerClass="w-full text-gray-900 text-base 2xl:text-xl bordesansrder-gray-160"
                                inputClass="text-base tracking-tight p-2"
                                options={yearArray}
                                onChange={selectYear}
                            />*/}
						</div>
						<div className="w-full">
							<CustomDropDownMenu
								className={classessort}
								selectOptions={[
									{ value: 'admin', name: 'Admin' },
									{ value: 'ceo', name: 'CEO' },
									{ value: 'cto', name: 'CTO' },
									{ value: 'cfo', name: 'CFO' },
									{ value: 'cso', name: 'CSO' },
									{ value: 'super_technician', name: 'Super Technician' },
									{ value: 'project_manager', name: 'Project Manager' },
									{ value: 'customer_service', name: 'Customer Service' },
									{ value: 'electrical', name: 'Electrical' },
									{ value: 'coder', name: 'Coder' },
									{ value: 'tracker', name: 'Tracker' },
									{ value: 'mechanics', name: 'Mechanics' },
									{ value: 'bloger', name: 'Bloger' },
									{
										value: 'super_technician_management',
										name: 'Super Technician Management',
									},
									{ value: 'user', name: 'User' },
									{ value: 'service_provider', name: 'Service Provider' },
									{ value: 'investor', name: 'Investor' },
									{ value: 'freelancer', name: 'Freelancer' },
									{ value: 'manufacturer', name: 'Manufacturer' },
									{ value: 'software_developer', name: 'Software Developer' },
									{ value: 'other', name: 'Other' },
								]}
								inputClasses="p-2 pl-4 py-5 w-full rounded border border-solid border-gray-160  font-sans tracking-wider text-base  cursor-pointer"
								labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 pr-0 text-sm font-medium focus:outline-none text-gray-700"
								labelWrapperClass="flex cursor-pointer md:relative w-full"
								dropDownClasses="origin-top-right z-20 mt-0 w-96 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded -mt-1"
								placeholder="Search..."
								onChange={(value: any) => setPermissionType(value)}
							/>
						</div>

						<div className="flex justify-center py-8 pt-12">
							<Button
								type="submit"
								value="Sign up"
								className="bg-primary shadow-none text-white transform-none px-10 font-sans tracking-tight text-base 2xl:text-xl"
								color="primary"
							/>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};
AddNewTechFeature.defaultProps = {
	containerClass: 'grid md:grid-cols-8 grid-cols-2 gap-2 items-center justify-between px-2 pt-4',
	extraBtn: false,
	classessort: { root: 'font-bold' },
};

export default AddNewTechFeature;
