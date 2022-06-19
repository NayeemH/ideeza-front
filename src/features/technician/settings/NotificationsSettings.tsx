import { useForm } from 'react-hook-form';
import Button from '@atoms/button';
import { updateUserDataAsync } from 'reducers/auth';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import SettingsNotification from '@organisms/settings-notification';
import { toast } from 'react-toastify';

const NotificationsSettings = () => {
	const dispatch = useAppDispatch();
	const methods = useForm({
		mode: 'onChange',
	});
	const { status } = useSession();
	const { userData, loading } = useAppSelector(({ auth }) => auth);
	const { handleSubmit } = methods;

	const handlerSubmit = async (formData: any) => {
		const reqBody = {
			profile_setting: {
				...formData,
			},
		};
		const payload = {
			id: userData?.id ?? 0,
			payload: reqBody,
		};
		dispatch(updateUserDataAsync(payload));
		toast.dismiss();
		toast.success('Saved successfully!');
	};

	useEffect(() => {
		if (status === 'authenticated') {
			methods.reset(userData?.profile_setting);
		}
	}, [userData, status]);

	return (
		<form onSubmit={handleSubmit(handlerSubmit)}>
			<div className="max-w-4xl mt-5">
				<SettingsNotification methods={methods} />
				<div className="text-center mt-8">
					<Button
						value="Save"
						type="submit"
						color="primary"
						className="shadow-none bg-primary capitalize px-12 py-2 text-sm"
						loading={loading}
						disabled={loading}
					/>
				</div>
			</div>
		</form>
	);
};

export default NotificationsSettings;
