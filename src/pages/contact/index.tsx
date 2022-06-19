import ContactPage from '@features/landing/contact';
import PublicLayout from '@layouts/public';
import React from 'react';
import FreelancerSignUpPopup from '@organisms/freelancer-signup-popup';
import ManufacturerSignUpPopup from '@organisms/manufacturer-signup';

const Contact = () => {
	return (
		<PublicLayout isSupport="isSupport">
			<ManufacturerSignUpPopup />
			<FreelancerSignUpPopup />
			<ContactPage />
		</PublicLayout>
	);
};

export default Contact;
