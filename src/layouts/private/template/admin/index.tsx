import Loader from '@atoms/loader';
import { routes } from '@features/admin/routes';
import PrivateLayout from 'layouts/private';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function AdminLayout({
	children,
	title,
}: {
	children: JSX.Element;
	title?: string;
}) {
	const { status } = useSession();
	const router = useRouter();
	const menuList = routes(router);

	return (
		<div className="min-h-screen">
			{status === 'loading' ? (
				<Loader />
			) : (
				<PrivateLayout
					title={title}
					list={menuList}
				>
					{children}
				</PrivateLayout>
			)}
		</div>
	);
}
