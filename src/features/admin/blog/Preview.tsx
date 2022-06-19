import BlogArticlePreview from '@organisms/blog-article-preview';
import { useAppSelector } from 'app/hooks';

import React from 'react';

const AdminBlogPreview = ({ preview, setShowPreview, handlePublish, loading }: any) => {
	const user = useAppSelector((state) => state?.auth?.userData);

	return (
		<>
			<BlogArticlePreview
				blog={preview}
				handlePublish={handlePublish}
				user={user}
				loading={loading}
				setShowPreview={setShowPreview}
			/>
		</>
	);
};

export default AdminBlogPreview;
