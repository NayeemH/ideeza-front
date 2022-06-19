import React from 'react';
import { routes } from '@features/user/settings/routes';
import PrivateLayout from 'layouts/private';
import { useRouter } from 'next/router';

export default function UserSettingsLayout({
	children,
	title,
}: {
	children: JSX.Element;
	title?: string;
}) {
	const router = useRouter();
	const menuList = routes(router);
	return (
		<div className="min-h-screen">
			<PrivateLayout
				title={title}
				hasBackBtn={true}
				list={menuList}
			>
				{children}
			</PrivateLayout>
		</div>
	);
}
