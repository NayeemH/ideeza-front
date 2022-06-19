import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateUserDataAsync } from 'reducers/auth';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useSession } from 'next-auth/react';
import PrivacySettingsForm from '@organisms/privacy-section';

function Privacy() {
	const dispatch = useAppDispatch();
	const { status } = useSession();
	const { userData, loading } = useAppSelector(({ auth }) => auth);

	const methods = useForm({
		mode: 'onChange',
	});

	const { handleSubmit, reset } = methods;

	const handlerSubmit = async (formData: any) => {
		const reqBody = {
			profile_setting: {
				...userData?.profile_setting,
				...formData,
			},
		};
		const payload = {
			id: userData?.id ?? 0,
			payload: reqBody,
		};
		dispatch(updateUserDataAsync(payload));
	};
	useEffect(() => {
		if (status === 'authenticated') {
			reset({
				social_connections: userData?.profile_setting?.social_connections,
				facebook_timeline: userData?.profile_setting?.facebook_timeline,
				search_engine: userData?.profile_setting?.search_engine,
			});
		}
	}, [userData, status]);

	return (
		<form onSubmit={handleSubmit(handlerSubmit)}>
			<PrivacySettingsForm
				loading={loading}
				methods={methods}
			/>
		</form>
	);
}

export default Privacy;
