import Task from '@features/technician/dashboard/management/Task';
import TechnicianLayout from '@layouts/private/template/technician';
import React from 'react';

const TaskManagement = () => {
	return (
		<TechnicianLayout>
			<Task />
		</TechnicianLayout>
	);
};

export default TaskManagement;
