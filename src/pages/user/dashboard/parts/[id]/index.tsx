import UserLayout from '@layouts/private/template/user';
// import { useRouter } from "next/router";
import React from 'react';
import { useRouter } from 'next/router';
import PartDetails from '@features/user/parts/part-details';

const PartsDetails = () => {
	const router = useRouter();
	const id: any = router?.query?.id;
	const type: any = router?.query?.type;

	return (
		<UserLayout title="Parts-details">
			<>
				<PartDetails
					id={id}
					type={type}
				/>
			</>
		</UserLayout>
	);
};

export default PartsDetails;
