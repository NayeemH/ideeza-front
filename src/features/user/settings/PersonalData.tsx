import AboutHeader from '@organisms/personal-data-about-header';
import PersonalTable from '@organisms/personal-data-table';
import { useAppSelector } from 'app/hooks';
import React, { useState, useEffect } from 'react';

function PersonalData() {
	const [user, setUser] = useState({});
	const state = useAppSelector(({ auth }) => auth?.userData);
	useEffect(() => {
		if (state) {
			setUser(state);
		}
	}, [state]);

	return (
		<div className="p-6 lg:pr-8">
			<AboutHeader user={user} />
			<PersonalTable user={user} />
		</div>
	);
}

export default PersonalData;
