import AdminLayout from '@layouts/private/template/admin';
import React from 'react';
import ManageEditStory from '@features/admin/users/story/ManageEditStory';

const EditStory = () => {
	return (
		<AdminLayout>
			<ManageEditStory />
		</AdminLayout>
	);
};

export default EditStory;
