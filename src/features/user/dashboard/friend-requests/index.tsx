import FriendRequestCard from '@organisms/friend-request-card';
import React, { useEffect, useState } from 'react';
import { apiService } from '../../../../utils/request';
import { toast } from 'react-toastify';
import Loader from '@molecules/loader';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setTotalNotifications } from '@features/user/dashboard/notifications/reducer';

const FriendRequests = () => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const [friendRequests, setFriendRequests] = useState<any[]>([]);

	const totalNotifications = useAppSelector(
		({ notification }) => notification?.totalNotifications
	);

	const removeFriendRequestNotification = () => {
		dispatch(setTotalNotifications(totalNotifications - 1));
	};

	const getFriendRequests = async () => {
		setLoading(true);

		apiService(
			{
				method: 'get',
				url: `/account/friend/pending-friend-request/`,
				token: true,
			},
			(res: any) => {
				setLoading(false);

				if (res) {
					const { data } = res;
					setFriendRequests(data?.results ?? []);
					return;
				}
			}
		);
	};

	const acceptFriendRequests = async (id: any) => {
		apiService(
			{
				method: 'get',
				url: `/account/friend/${id}/accept-request/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					toast.success('Friend request accepted!');
					getFriendRequests();
					removeFriendRequestNotification();
					return;
				}
			}
		);
	};

	const rejectFriendRequests = async (id: any) => {
		apiService(
			{
				method: 'delete',
				url: `/account/friend/${id}/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					toast.success('Friend request deleted!');
					getFriendRequests();
					removeFriendRequestNotification();
					return;
				}
			}
		);
	};

	useEffect(() => {
		getFriendRequests();
	}, []);

	return (
		<>
			{loading ? (
				<div style={{ padding: '15px 0' }}>
					<Loader />
				</div>
			) : (
				<>
					{friendRequests && friendRequests?.length > 0 ? (
						friendRequests.map((friendRequest, index) => (
							<FriendRequestCard
								key={index}
								data={friendRequest}
								onClickAccept={() => acceptFriendRequests(friendRequest?.id)}
								onClickReject={() => rejectFriendRequests(friendRequest?.id)}
							/>
						))
					) : (
						<div
							style={{
								padding: '15px',
								color: '#4d4d4d',
								textAlign: 'center',
							}}
						>
							No Friend Requests
						</div>
					)}
				</>
			)}
		</>
	);
};

export default FriendRequests;
