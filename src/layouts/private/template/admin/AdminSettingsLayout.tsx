import React from 'react';
import { routes } from '@features/admin/settings/routes';
import PrivateLayout from 'layouts/private';
import { useRouter } from 'next/router';

export default function AdminSettingsLayout({
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
