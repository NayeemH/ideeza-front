import React from 'react';
import { format } from 'date-fns';
import TabReviewsDataUpper from '@organisms/tab-review-data-upper';
import TabReviewsDataLower from '@organisms/tab-review-data-lower';

function TabReviewsData(props: any) {
	const {
		reviewerName,
		reviewerRole,
		reviewerImg,
		reviewerCompany,
		reviewerDept,
		title,
		detail,
		rating,
		valueInner1,
		valueInner2,
		created_at,
	} = props;

	// TODO:: reviewer information not in api just name available
	return (
		<div className="mt-5">
			<TabReviewsDataUpper
				labelInner1={reviewerName ?? ''}
				labelInner2={reviewerRole ?? 'Back-end developer'}
				valueInner1={reviewerCompany ? valueInner1 : valueInner1}
				valueInner2={reviewerDept ? valueInner2 : valueInner2}
				avatarSrc={reviewerImg ?? ''}
				rightValue="Report"
			/>
			<TabReviewsDataLower
				value1={title ?? ''}
				value2={rating ?? ''}
				value3={detail ?? ''}
				value4={format(new Date(created_at), 'MM.dd.yyyy') ?? '12.02.2021'}
			/>
		</div>
	);
}
export default TabReviewsData;
