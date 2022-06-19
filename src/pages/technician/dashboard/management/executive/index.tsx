import AddNewTechFeature from '@features/technician/dashboard/management/AddNewTech';
import TechnicianLayout from '@layouts/private/template/technician';
import React from 'react';

const AddNewTech = () => {
	return (
		<TechnicianLayout>
			<AddNewTechFeature />

			{/* <h4>Add new tech</h4> */}
		</TechnicianLayout>
	);
};

export default AddNewTech;
