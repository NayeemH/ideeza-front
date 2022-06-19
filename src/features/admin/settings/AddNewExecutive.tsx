import Label from '@atoms/label';
import NewExecutiveForm from '@organisms/new-executive-form';
// import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useAppSelector } from 'app/hooks';
import { useForm } from 'react-hook-form';
// import { updateUserDataAsync } from 'reducers/auth';

function AddNewExecutive() {
	// const dispatch = useAppDispatch();
	const { userData, loading } = useAppSelector(({ auth }) => auth);
	const methods = useForm();
	const { handleSubmit } = methods;
	const { new_executive: addNewExecutiveData } = userData || {};

	const handlerSubmit = async (formData: any) => {
		const reqBody = {
			new_executive: {
				email: formData.email,
				firstname: formData.firstname,
				lastname: formData.lastname,
				password: formData.password,
				birthdate: {
					month: formData.month,
					day: formData.day,
					year: formData.year,
				},
			},
		};
		const payload = {
			id: userData?.id ?? 0,
			payload: reqBody,
		};

		console.log('payload: ', payload);

		// dispatch(updateUserDataAsync(payload));
	};

	return (
		<div className="space-y-4 md:w-10/12 lg:w-7/12 2xl:w-6/12 w-full pb-2 font-proxima-nova">
			<Label
				value="Add New Executive"
				classes={{
					root: 'text-primary text-xl xl:text-2xl pb-3 border-b tracking-normal font-semibold ',
				}}
			/>
			<form onSubmit={handleSubmit(handlerSubmit)}>
				<div className="bg-white rounded-lg shadow-md px-[30px] mt-3 ">
					<NewExecutiveForm
						addNewExecutiveData={addNewExecutiveData}
						methods={methods}
						loading={loading}
					/>
				</div>
			</form>
		</div>
	);
}

export default AddNewExecutive;
