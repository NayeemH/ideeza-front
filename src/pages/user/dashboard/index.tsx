import UserHome from '@features/user';
import UserLayout from '@layouts/private/template/user';

const UserDashboard = () => {
	return (
		<UserLayout title="User Dashboard - IDEEZA | AI Based SAAS">
			<>
				<UserHome />
			</>
		</UserLayout>
	);
};

export default UserDashboard;
