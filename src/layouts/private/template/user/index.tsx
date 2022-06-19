import MyIdeeza from '@organisms/my-ideeza';
import { routes } from 'features/user/routes';
import PrivateLayout from 'layouts/private';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function UserLayout({
	children,
	title,
	hideMyIdeeza,
	isMyNoteSection = false,
}: {
	children: any;
	title?: string;
	hideMyIdeeza?: boolean;
	isMyNoteSection?: boolean;
}) {
	const router = useRouter();
	const menuList = routes(router);

	const { data: session, status } = useSession();

	const userRole = session?.user?.role;

	useEffect(() => {
		console.log('User Session-----------', session);
	}, [session]);

	useEffect(() => {
		if (status === 'authenticated' && userRole !== 'User') {
			router.push('/404');
		}
	}, [status]);

	return (
		<div className="min-h-screen">
			<PrivateLayout
				title={title}
				list={menuList}
				isMyNoteSection={isMyNoteSection}
			>
				{children}
				{!hideMyIdeeza && <MyIdeeza />}
			</PrivateLayout>
		</div>
	);
}
