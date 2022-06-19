import ChangePassword from '@organisms/change-password';
import LoginHistory from '@organisms/login-history';
import Verification from '@organisms/verification';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { changePasswordAsync } from 'reducers/auth';

export default function Security() {
	const dispatch = useAppDispatch();
	const methods = useForm({
		mode: 'onChange',
	});
	const { data: session } = useSession();
	// const [auth, setAuth] = useState(false);
	// const [loginHistoryData, setLoginHistoryData] = useState([]);
	const { loading } = useAppSelector((state) => state?.auth);
	const userData = useAppSelector((state) => state?.auth.userData);

	const handlePassword = (data: any) => {
		dispatch(changePasswordAsync({ id: session?.user.id ?? 0, payload: data }));
	};

	return (
		<div className="md:w-7/12 space-y-10 sm:m-auto xl:mr-auto xl:m-0">
			<form onSubmit={methods.handleSubmit(handlePassword)}>
				<ChangePassword
					methods={methods}
					loading={loading}
				/>
				<Verification settingData={userData} />
				<LoginHistory />
			</form>
		</div>
	);
}
