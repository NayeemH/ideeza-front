import AddComponentElectronics from '@features/technician/electronics/add-component';
import UserLayout from '@layouts/private/template/user';
import React from 'react';

const AddComponent = () => {
	return (
		<UserLayout>
			<AddComponentElectronics />
		</UserLayout>
	);
};

export default AddComponent;
