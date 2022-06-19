import React, { useState, memo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@atoms/button';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { getNotificationAsync, readNotificationAsync } from './reducer';
import { useAppSelector } from 'app/hooks';
import SingleNotification from '@molecules/single-notification';

function UserNotification(props: any) {
	const dispatch = useDispatch();

	const [params] = useState({});
	const [allNotification, setAllNotification] = useState([]);
	const [active, setActive] = useState(1);

	const notifications = useAppSelector(({ notification }) => notification?.data?.results);

	// const getAllNotifications = () => {
	// 	('');
	// };

	useEffect(() => {
		dispatch(getNotificationAsync(params));
	}, []);
	useEffect(() => {
		setAllNotification(notifications);
	}, [notifications]);

	const readNotification = (id: any) => {
		dispatch(readNotificationAsync({ ids: [id] }));
		dispatch(getNotificationAsync(params));
	};

	return (
		<Container
			maxWidth="xl"
			className="shadow-2xl bg-white rounded-2xl h-full"
		>
			<Box className="mt-5">
				<Box className="pt-16 pl-12">
					<h2 className="text-2xl font-bold">Notifications</h2>
					<div className="flex items-center mt-5 gap-[30px]">
						<Button
							value="All Notifications"
							variant="text"
							onClick={() => setActive(1)}
							//   color="primary"
							// loading={loader}
							classes={{
								root: ` ${
									active === 1
										? 'bg-primary text-white border border-solid border-primary '
										: 'bg-white text-primary border border-solid border-primary '
								} text-base lg:text-[19px] font-bold p-[21px] font-proxima-nova rounded-[15px] notification-header hover:text-white hover:bg-primary tracking-tight shadow-none transform-none`,
							}}
						/>
						<Button
							value="Unread Notifications"
							variant="text"
							onClick={() => setActive(2)}
							// loading={loader}
							classes={{
								root: ` ${
									active === 2
										? 'bg-primary text-white border border-solid border-primary '
										: 'bg-white text-primary border border-solid border-primary '
								} text-base lg:text-[19px] font-bold p-[21px] font-proxima-nova rounded-[15px] notification-header hover:text-white hover:bg-primary tracking-tight shadow-none transform-none`,
							}}
						/>
						{/* <Button
							value="Deleted Messages"
							variant="text"
							// loading={loader}
							onClick={() => setActive(3)}
							classes={{
								root: ` ${active === 3 ? 'text-white bg-primary ' : 'notification-header '
									} text-xl font-bold mt-2 p-8 font-sans rounded-md tracking-tight h-8 shadow-none transform-none`,
							}}
						/> */}
					</div>
					{active == 1 ? (
						<Box className="mt-5 pb-3">
							{allNotification?.length > 0 &&
								allNotification.map((notification: any) => (
									<SingleNotification
										onClick={() => readNotification(notification.id)}
										key={notification.id}
										notification={notification}
									/>
								))}
						</Box>
					) : (
						<Box className="mt-5 pb-3">
							{allNotification?.length > 0 &&
								allNotification.map(
									(notification: any) =>
										notification.is_read == false && (
											<SingleNotification
												key={notification.id}
												notification={notification}
											/>
										)
								)}
						</Box>
					)}
				</Box>
			</Box>
		</Container>
	);
}
export default UserNotification;
