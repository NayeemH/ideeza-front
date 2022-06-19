import AddComponentElectronics from '@features/technician/electronics/add-component';
import TechnicianLayout from '@layouts/private/template/technician';
import React from 'react';

const AddComponent = () => {
	return (
		<TechnicianLayout>
			<AddComponentElectronics />
		</TechnicianLayout>
	);
};

export default AddComponent;
