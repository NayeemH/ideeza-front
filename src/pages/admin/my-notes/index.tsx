import AdminLayout from '@layouts/private/template/admin';
import React from 'react';
import MyNoteHome from '@features/user/my-note';

const AdminNotes = () => {
	return (
		<AdminLayout>
			<MyNoteHome />
		</AdminLayout>
	);
};

export default AdminNotes;
