import React from 'react';
import UserLayout from '@layouts/private/template/user';
import NewsFeedHome from '@features/user/news-feed';

const UserNewsFeed = () => {
	return (
		<UserLayout title="News Feed | User Dashboard | IDEEZA | AI Based SAAS">
			<>
				<NewsFeedHome />
			</>
		</UserLayout>
	);
};

export default UserNewsFeed;
