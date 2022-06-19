import React from 'react';
import UserLayout from '@layouts/private/template/user';
import MyNoteHome from '@features/user/my-note';

const MyNote = () => {
	return (
		<UserLayout
			isMyNoteSection={true}
			title="My Notes | User Dashboard | IDEEZA | AI Based SAAS"
		>
			<>
				<MyNoteHome />
			</>
		</UserLayout>
	);
};

export default MyNote;
