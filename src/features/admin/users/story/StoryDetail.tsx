import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@atoms/button';
import Label from '@atoms/label';
import PreviewStory from './PreviewStory';
import StoryJsonData from './StoryJsonData.json';
import { apiService } from 'utils/request';
import Loader from '@atoms/loader';

const StoryDetail = () => {
	interface StoryDataProps {
		id: any;
		updated_at: any;
		created_at: any;
		category: any;
		status: any;
		title: any;
		description: any;
		cover_file: any;
	}

	const router = useRouter();
	const [StoryDetail, setStoryDetail] = useState<StoryDataProps>();
	const [loading, setLoading] = useState(true);
	const { id } = router.query;

	useEffect(() => {
		// const StoryData = StoryJsonData.find((data) => data.id === story_id);
		// if (StoryData !== undefined) {
		// 	setStoryDetail(StoryData);
		// } else {
		// 	alert('Story Data Not Found');
		// }
		setLoading(true);
		if (id) fetchStoryDetail();
	}, [id]);

	const fetchStoryDetail = async () => {
		await apiService(
			{
				method: 'get',
				url: `/core/success-story/${id}`,
				token: true,
			},
			(res: any, error: any) => {
				if (res) {
					console.log('data: ', res?.data);
					setStoryDetail(res?.data);
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
								router.push(
									`/admin/users/marketing/success-story/edit/${StoryDetail?.id}`
								)
							}
						/>
					</div>

					<Label
						value="Story Detail"
						classes={{
							root: 'text-primary pt-4 md:text-md 2xl:text-xl tracking-tight font-sans font-bold',
						}}
					/>
					<PreviewStory
						preview={{
							title: StoryDetail?.title,
							description: StoryDetail?.description,
						}}
					/>
				</>
			)}
		</>
	);
};

export default StoryDetail;
