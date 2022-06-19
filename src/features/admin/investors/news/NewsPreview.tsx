import LabelButton from '@molecules/label-button';
import React, { useEffect, useState } from 'react';
import BlogArticlePreview from '@organisms/blog-article-preview';
import { useAppSelector } from 'app/hooks';
import { useRouter } from 'next/router';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { apiService } from 'utils/request';
import { toast } from 'react-toastify';

function NewsPreview() {
	const router = useRouter();
	//   const router = useRouter();
	const [loading, setLoading] = useState<any>(false);

	const previewData = useAppSelector(({ blog }) => blog?.perviewData);

	const handlePublish = async () => {
		setLoading(true);
		await apiService(
			{
				method: 'post',
				url: `/investor/news/`,
				token: true,
				data: { ...previewData, category: +previewData?.selectedCategory },
			},
			(res: any, error: any) => {
				if (res) {
					setLoading('working is finished');
					toast.dismiss();
					toast.success('posted successfully');
					return;
				}
				if (error) {
					alert('error');
				}
			}
		);
	};
	useEffect(() => {
		if (loading === 'working is finished') {
			router.replace('/admin/investors/news');
		}
	}, [loading]);

	return (
		<>
			<LabelButton
				mainClass="justify-between"
				value="Article preview"
				labelClass="text-primary 2xl:text-2xl md:text-md font-sans tracking-tight font-bold"
				btnValue="Back Step"
				// onClick={handlePush.bind(this, "Blog")}
				onClick={() => router.back()}
				iconStart={<IoArrowBackCircleSharp className="text-2xl" />}
				btnClass="bg-primary 2xl:text-2xl md:text-md shadow-none font-sans font-bold p-2 px-4 text-white"
			/>
			<div className="bg-white rounded-md mt-3">
				<BlogArticlePreview
					blog={previewData}
					loading={loading}
					handlePublish={handlePublish}
				/>
			</div>
		</>
	);
}

export default NewsPreview;
