import Loader from '@atoms/loader';
import Activity from '@molecules/activites';
import { useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkSelfUser } from '../../../../utils/utils';
import { apiService } from '../../../../utils/request';
import Label from '@atoms/label';

function TabActivities() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [activities, setActivities] = useState<any[]>([]);
	const authUserData = useAppSelector((state) => state.auth?.userData);
	const user_id: number = Number(router.query.id);

	const getActivities = async () => {
		let url = '';

		if (checkSelfUser(authUserData?.id, user_id)) {
			url = `account/user/${user_id}/recent-activities/`;
			console.log('MY ACTIVITIES');
		} else {
			url = ``; // TODO:: Change endpoint according to the variable {user_id}
			console.log('OPPONENT ACTIVITIES');
		}

		await apiService(
			{
				method: 'get',
				url,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;

					setActivities(data);
					setLoading(false);
					return;
				}

				setLoading(false);
			}
		);
	};

	useEffect(() => {
		getActivities();
	}, []);

	return (
		<div className="max-h-96 space-y-3 overflow-y-auto relative">
			{loading ? (
				<Loader type="relative" />
			) : Array.isArray(activities) && activities.length > 0 ? (
				activities?.map((v, i) => {
					return (
						<>
							<Activity
								key={i}
								date={v?.time}
								title={v?.title}
								description={v?.description}
								dateClass="text-gray-900"
								titleClass="text-gray-700"
								descriptionClass="text-gray-700"
							/>
						</>
					);
				})
			) : (
				<Label
					value="No activity was found !"
					className="text-lg text-zinc-500 font-semibold"
				/>
			)}
		</div>
	);
}

export default TabActivities;
