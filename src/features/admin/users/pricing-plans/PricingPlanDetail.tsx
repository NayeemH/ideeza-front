import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@atoms/button';
import Label from '@atoms/label';
import { apiService } from 'utils/request';
import Loader from '@atoms/loader';

const PricingPlanDetail = () => {
	interface FeatureInterface {
		active_project?: string;
		additional_teammate?: boolean;
		teammate_cost?: number;
		in_platform_purchase?: boolean;
		consult_support?: boolean;
		network?: boolean;
		electronics?: boolean;
		code?: boolean;
		cover?: boolean;
		general?: boolean;
		social?: boolean;
	}

	interface PricingDataProps {
		id?: any;
		features?: FeatureInterface;
		updated_at?: string;
		created_at?: string;
		is_visible?: boolean;
		name?: string;
		slogan?: string;
		image?: string;
		type?: any;
		plan_type?: string;
		price_monthly?: string;
		price_yearly?: string;
		trial_period?: number;
		is_popular?: boolean;
	}

	const router = useRouter();
	const [PricingDataDetail, setPricingDataDetail] = useState<PricingDataProps>();
	const [loading, setLoading] = useState(true);
	const { id } = router.query;

	useEffect(() => {
		setLoading(true);
		if (id) fetchPricingDataDetail();
	}, [id]);

	const fetchPricingDataDetail = async () => {
		await apiService(
			{
				method: 'get',
				url: `/subscription/pricing-plan/${id}`,
				token: true,
			},
			(res: any, error: any) => {
				if (res) {
					console.log('Pricing Plan: ', res?.data);
					setPricingDataDetail(res?.data);
				}
				if (error) {
					('');
				}
				setLoading(false);
			}
		);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="flex">
						<Button
							// type="submit"
							variant="outlined"
							color="secondary"
							className="capitalize px-6 text-base 2xl:text-xl1 py-2 font-sans"
							value="Go Back"
							onClick={() => router.push('/admin/users/marketing/success-story')}
						/>
						<Button
							// type="submit"
							variant="outlined"
							color="secondary"
							className="capitalize px-6 text-base 2xl:text-xl1 py-2 font-sans mx-2"
							value="Edit"
							onClick={() =>
								router.push(`/admin/users/marketing/pricing-plans/edit/${id}`)
							}
						/>
					</div>

					<Label
						value="Pricing Plan Detail"
						classes={{
							root: 'text-primary pt-4 md:text-md 2xl:text-xl tracking-tight font-sans font-bold',
						}}
					/>
				</>
			)}
		</>
	);
};

export default PricingPlanDetail;
