import React from 'react';
import UserLayout from '@layouts/private/template/user';
import { useAppDispatch } from '../../../../app/hooks';
import { setCurrentTabMenu, setCustomizeMenu } from '@layouts/private/sidebar/reducer';

const TestPage = () => {
	const dispatch = useAppDispatch();
	const openCustomizeOldMenu = () => dispatch(setCustomizeMenu('blockly'));

	const changeOldCurrentMenu = () => dispatch(setCurrentTabMenu('Customize'));

	return (
		<div>
			<UserLayout title="Project-details">
				<>
					<button
						style={{ border: '1px solid #eeeeee', background: '#ffffff', padding: 5 }}
						onClick={openCustomizeOldMenu}
					>
						Open Old Customize Menu
					</button>

					<button
						style={{ border: '1px solid #eeeeee', background: '#ffffff', padding: 5 }}
						onClick={changeOldCurrentMenu}
					>
						Change Old Current Menu
					</button>
				</>
			</UserLayout>
		</div>
	);
};

export default TestPage;
