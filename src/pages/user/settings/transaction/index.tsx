import Transaction from '@features/user/settings/TransactionHistory';
import UserSettingsLayout from '@layouts/private/template/user/UserSettingsLayout';
import React from 'react';

const UserTransactionSettings = () => {
	return (
		<UserSettingsLayout title="User Settings - IDEEZA | AI Based SAAS">
			<>
				{/* <h1>user UserTransactionSettings</h1>- */}
				<Transaction />
			</>
		</UserSettingsLayout>
	);
};

export default UserTransactionSettings;
