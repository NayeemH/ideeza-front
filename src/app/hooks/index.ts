import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, AppState } from '../store';
import { checkSelfUser } from '../../utils/utils';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useEffect, useState } from 'react';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useDetectSelfUser = (user_id: any) => {
	const authUserData = useAppSelector((state) => state.auth?.userData);
	return checkSelfUser(authUserData?.id, user_id);
};

export const getBearerToken = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { data: session } = useSession();
	const token = session?.user?.access;
	return token ?? null;
};

export const useInput = (initialValue = '') => {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return {
		value,
		setValue: (text: string) => setValue(text),
		reset: () => setValue(''),
		bind: {
			value,
			onChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
			) => {
				setValue(e.target.value);
			},
		},
	};
};
