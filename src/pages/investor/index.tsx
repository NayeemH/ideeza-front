import React from 'react';
import PublicLayout from '@layouts/public';
import InvestorHome from '@features/landing/investor';
import {
	getInvestorCategories,
	getInvestorNews,
	getInvestorTraction,
} from '@features/landing/investor/api';
import { getPaginateMeta } from 'utils/utils';
import FreelancerSignUpPopup from '@organisms/freelancer-signup-popup';
import ManufacturerSignUpPopup from '@organisms/manufacturer-signup';

const Investor = (props: any) => {
	return (
		<PublicLayout
			isSupport="support"
			title="IDEEZA | Investor"
		>
			<ManufacturerSignUpPopup />
			<FreelancerSignUpPopup />
			<InvestorHome
				categories={props.categories}
				newsData={props.newsData}
				initPaginateMeta={props.initPaginateMeta}
				tractionData={props.tractionData}
			/>
		</PublicLayout>
	);
};

export default Investor;

export const getServerSideProps = async () => {
	const categories = await getInvestorCategories('?page=1&page_size=4');
	const page = 1;
	const perPage = 5;
	const newsData =
		categories?.length > 0 ? await getInvestorNews(`?page=${page}&page_size=${perPage}`) : [];
	const initPaginateMeta = getPaginateMeta(newsData, page, perPage);
	const tractionData = await getInvestorTraction();
	return {
		props: {
			categories,
			newsData,
			initPaginateMeta,
			tractionData,
		},
	};
};
