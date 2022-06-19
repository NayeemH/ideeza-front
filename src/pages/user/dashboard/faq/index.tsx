import React from 'react';
import Faq from '@features/landing/faq';
import UserLayout from '@layouts/private/template/user';

const FAQ = () => {
	return (
		<UserLayout title="IDEEZA | FAQ section">
			<Faq faqContainer="pt-[56px]" />
		</UserLayout>
	);
};

export default FAQ;
