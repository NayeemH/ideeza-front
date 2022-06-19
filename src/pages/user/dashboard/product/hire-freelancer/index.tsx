import UserLayout from '@layouts/private/template/user';
// import { useRouter } from "next/router";
import React from 'react';

import CommonMeta from '@atoms/commonMeta';
import HireFreelancerHome from '@features/user/projects/project-details/product-details/hire-freelancer';

const HireFreelancer = () => {
	return (
		<UserLayout title="Hire Freelancer">
			<>
				<CommonMeta title="Hire Freelancer" />
				<HireFreelancerHome />
			</>
		</UserLayout>
	);
};

export default HireFreelancer;
