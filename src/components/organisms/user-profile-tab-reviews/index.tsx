import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import TabReviewsData from '@organisms/tab-reviews-data';
import Label from '@atoms/label';
import { ApiDataType, apiService } from '../../../utils/request';
import { useRouter } from 'next/router';
import Loader from '@molecules/loader';

function TabReviews() {
	const router = useRouter();
	const user_id = Number(router.query.id);
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(false);

	const getReviews = async () => {
		setLoading(true);
		const apiData: ApiDataType = {
			method: 'get',
			url: `/account/review/?user__id=${user_id}&ordering=created_at&page=1&page_size=10`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				setReviews(res?.data?.results);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		getReviews();
	}, []);

	return (
		<div className="max-h-96 p-3 pl-0 pr-5 overflow-y-auto">
			<div className="w-full gap-reviews mt-4">
				{loading && (
					<div className={'pt-20 pb-20'}>
						<Loader />
					</div>
				)}

				{!loading && reviews.length > 0 ? (
					reviews?.map((v: any, k: any) => {
						return (
							<div key={k}>
								<div>
									<TabReviewsData
										reviewerName={
											v?.reviewer?.first_name + v?.reviewer?.last_name
										}
										reviewerRole={v?.role} //TODO: not found
										reviewerImg={v?.reviewer?.profile_photo}
										reviewerCompany={v?.reviewer?.company} //not found
										reviewerDept={v?.reviewer?.dept} //not found
										title={v?.title}
										detail={v?.detail}
										rating={v?.rating}
										created_at={
											format(
												new Date(v?.created_at ?? '12.02.2021'),
												'MM.dd.yyyy'
											) ?? '12.02.2021'
										}
										valueInner1={'Epic coders LTD'}
										valueInner2={'Assembly'}
									/>
								</div>
							</div>
						);
					})
				) : !loading ? (
					<Label
						value="No Reviews Found !"
						className="text-lg font-semibold text-zinc-500"
					/>
				) : null}
			</div>
		</div>
	);
}
export default TabReviews;
