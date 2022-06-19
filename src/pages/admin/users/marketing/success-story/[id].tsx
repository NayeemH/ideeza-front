import StoryDetail from '@features/admin/users/story/StoryDetail';
import AdminLayout from '@layouts/private/template/admin';
import React from 'react';

const SingleStoryManage = () => {
	return (
		<AdminLayout>
			<StoryDetail />
		</AdminLayout>
	);
};

export default SingleStoryManage;
