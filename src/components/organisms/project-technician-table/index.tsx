import React from 'react';
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import Label from "@atoms/label";
// import CheckboxAtom from "@atoms/checkbox";
// import BlogContentModifier from "@molecules/blog-content-modifier";
import Table from '@organisms/table';

function ProjectTechnicianTable() {
	return (
		<>
			<Table
				theader={[
					'checkbox',
					'Project',
					'Domain',
					'Assigned to',
					'Timeline',
					'Task status',
					'notifications ',
				]}
				tbody={[
					'checkbox',
					'Make iron from steal: first phase ',
					'domain',
					'avater',
					'timeline',
					'Completed',
					'notification',
					'dotIcon',
				]}
			/>
		</>
	);
}
export default ProjectTechnicianTable;
