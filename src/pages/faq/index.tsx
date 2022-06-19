import React from 'react';
import Faq from '@features/landing/faq';
import PublicLayout from '@layouts/public';
import FreelancerSignUpPopup from '@organisms/freelancer-signup-popup';
import ManufacturerSignUpPopup from '@organisms/manufacturer-signup';

const FAQ = () => {
	return (
		// <UserLayout title="IDEEZA | FAQ section">
		<PublicLayout
			isSupport="isSupport"
			title="IDEEZA | FAQ section"
		>
			<ManufacturerSignUpPopup />
			<FreelancerSignUpPopup />
			<div className="pt-[100px]">
				<Faq faqContainer="pt-[56px] pl-[50px] md:px-[100px] mb-[115px]" />
			</div>
		</PublicLayout>
		// </UserLayout>
	);
};

export default FAQ;
