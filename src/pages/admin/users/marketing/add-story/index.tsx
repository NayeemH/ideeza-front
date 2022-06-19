import AdminLayout from '@layouts/private/template/admin';
import React from 'react';
import ManageAddStory from '@features/admin/users/story/ManageAddStory';

const AddStory = () => {
	return (
		<AdminLayout>
			<ManageAddStory />
		</AdminLayout>
	);
};

export default AddStory;
