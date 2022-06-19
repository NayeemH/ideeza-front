import Loader from '@atoms/loader';
import { routes } from 'features/technician/routes';
import PrivateLayout from 'layouts/private';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
// import { useEffect } from 'react';

export default function TechnicianLayout({
	children,
	title,
}: {
	children: JSX.Element;
	title?: string;
}) {
	const { status } = useSession();
	const router = useRouter();
	const menuList = routes(router);

	// useEffect(() => {
	// 	console.log('status', status);
	// }, [status]);

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
