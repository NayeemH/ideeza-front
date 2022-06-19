import AdminLayout from '@layouts/private/template/admin';
import Message from '@features/message';
import React from 'react';

const AdminMessages = () => {
	return (
		<AdminLayout>
			<Message />
		</AdminLayout>
	);
};

export default AdminMessages;
