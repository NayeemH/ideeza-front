import { useRouter } from 'next/router';
import Label from '@atoms/label';

import { apiService } from 'utils/request';
import React, { useState, useEffect } from 'react';

import Preview from '@features/user/blog/Preview';

const ViewBlog = () => {
	const router = useRouter();
	const { id } = router.query;
	const [singleNews, setSingleNews] = useState<any>({});
	const [loading, setLoading] = useState(true);

	const getSingleNews = async () => {
		await apiService(
			{
				method: 'get',
				url: `/blog/${id}/`,
				token: true,
			},
			(res: any, error: any) => {
				if (res) {
					setSingleNews(res?.data);
				}
				if (error) {
					('');
				}
				setLoading(false);
			}
		);
	};
	useEffect(() => {
		setLoading(true);
		if (id) getSingleNews();
	}, [id]);

	return (
		<div className="">
			{loading ? (
				<Label
					value="Loading..."
					className="text-xl text-gray-600"
				/>
			) : (
				<Preview
					setShowPreview={() => {
						router.back();
					}}
					preview={singleNews}
					loading={loading}
				/>
			)}
		</div>
	);
};

export default ViewBlog;
