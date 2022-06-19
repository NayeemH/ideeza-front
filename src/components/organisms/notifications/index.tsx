import { useAppSelector } from 'app/hooks';
import Button from '@atoms/button';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NotificationCard from '@organisms/notificationCard';
import { useDispatch } from 'react-redux';
import { getNotificationAsync } from '@features/user/dashboard/notifications/reducer';
import Loader from '@molecules/loader';
import { useOutsideClickHandler } from 'utils/utils';
import FriendRequests from '@features/user/dashboard/friend-requests';
import Label from '@atoms/label';

const Notifications = React.forwardRef((props: any, ref: any) => {
	const user = useAppSelector((state) => state?.auth?.userData);
	const [params] = useState({});
	const dispatch = useDispatch();

	const [active, setActive] = useState(1);

	const notifications = useAppSelector(({ notification }) => notification?.data?.results);
	const loading = useAppSelector(({ notification }) => notification?.loading);
	const [allNotification, setAllNotification] = useState([]);

	const getUnreadNotifications = () => {
		const unreadNotifications: any[] = [];

		if (notifications && notifications.length > 0) {
			notifications.map((notification: any) => {
				if (!notification?.is_read) {
					unreadNotifications.push(notification);
				}
			});
		}

		return unreadNotifications;
	};

	const [selectedNotificationsType, setSelectedNotificationsType] = useState<'all' | 'unread'>(
		'all'
	);

	const unreadNotifications = getUnreadNotifications();

	useEffect(() => {
		dispatch(getNotificationAsync(params));
	}, [params, dispatch]);
	useEffect(() => {
		setAllNotification(notifications);
	}, [notifications]);
	useOutsideClickHandler(ref, () => props?.setActive(''));

	return (
		<div
			ref={ref}
			className="absolute notification-container bg-white rounded-[20px] custom-box-shadow w-[640px] px-[13px]"
		>
			<div className="arrow-right"></div>

			<div className="flex items-center justify-center py-[25px] gap-[45px] border-b border-[#D2D1D1]">
				<Button
					value="Notifications"
					variant="text"
					onClick={() => setActive(1)}
					classes={{
						root: `text-base lg:text-[19px] font-bold p-[21px] font-proxima-nova rounded-[15px] notification-header hover:text-white hover:bg-primary tracking-tight shadow-none transform-none 2xl:w-[177px] ${
							active === 1
								? 'bg-primary text-white border border-solid border-primary'
								: 'bg-white text-primary border border-solid border-primary'
						}`,
					}}
				/>

				{/* <Button
					value="All Messages"
					variant="text"
					onClick={() => setActive(1)}
					classes={{
						root: `text-md lg:text-md font-semibold mt-2 p-8 font-proxima-nova rounded-md notification-header hover:text-white hover:bg-primary tracking-tight h-8 shadow-none transform-none ${active === 1 ? 'bg-primary text-white' : ''
							}`,
					}}
				/>
				<Button
					value="New Messages"
					variant="text"
					onClick={() => setActive(2)}
					classes={{
						root: `text-md lg:text-md font-semibold mt-2 p-8 font-proxima-nova rounded-md notification-header hover:text-white hover:bg-primary tracking-tigh h-8 shadow-none transform-none ${active === 2 ? 'bg-primary text-white' : ''
							}`,
					}}
				/> */}

				<Button
					value="Friend Requests"
					variant="text"
					onClick={() => setActive(3)}
					classes={{
						root: `text-base lg:text-[19px] font-bold p-[21px] font-proxima-nova rounded-[15px] notification-header hover:text-white hover:bg-primary tracking-tight shadow-none transform-none 2xl:w-[177px] ${
							active === 3
								? 'bg-primary text-white border border-solid border-primary'
								: 'bg-white text-primary border border-solid border-primary'
						}`,
					}}
				/>
				{/* <Button
          value="Deleted Messages"
          variant="text"

          classes={{
            root: "text-xl font-semibold p-8 mt-2 font-proxima-nova rounded-md notification-header hover:text-white hover:bg-primary tracking-tight h-8 shadow-none transform-none",
          }}
        /> */}
			</div>

			{loading ? (
				<div className="py-2">
					<Loader />
				</div>
			) : (
				<div className="notification-height overflow-y-auto">
					{active == 1 ? (
						<>
							{notifications?.length !== 0 ? (
								<div className="text-center pt-[22px] pb-[34px]">
									<Button
										value={'All'}
										className={`${
											selectedNotificationsType === 'all'
												? 'bg-white text-primary  border-primary '
												: 'text-black bg-[#E1E1E1] border-[#D7D7D7]'
										} mr-[15px] py-[14px] px-[35px] font-proxima-nova rounded-[5px] border border-solid`}
										onClick={() => setSelectedNotificationsType('all')}
									/>
									<Button
										value={'Unread'}
										className={`${
											selectedNotificationsType === 'unread'
												? 'bg-white text-primary  border-primary '
												: 'text-black bg-[#E1E1E1] border-[#D7D7D7]'
										} mr-[15px] py-[14px] px-[35px] font-proxima-nova rounded-[5px] border border-solid`}
										onClick={() => setSelectedNotificationsType('unread')}
									/>
								</div>
							) : (
								<div className="w-full flex justify-center py-4">
									<Label
										value="No notifications available"
										className="text-primary"
									/>
								</div>
							)}

							{(selectedNotificationsType === 'all'
								? notifications ?? []
								: unreadNotifications
							).map((notification: any) => (
								<>
									<NotificationCard
										showDot={notification.is_read == false && true}
										key={notification.id}
										notification={notification}
									/>
								</>
							))}
						</>
					) : active === 2 ? (
						allNotification?.length > 0 &&
						allNotification.map(
							(notification: any) =>
								notification.is_read == false && (
									<>
										<NotificationCard
											showDot
											key={notification.id}
											notification={notification}
										/>
									</>
								)
						)
					) : active === 3 ? (
						<>
							<FriendRequests />
						</>
					) : null}

					{active !== 3 && allNotification?.length > 0 && (
						<>
							<div className="mx-auto h-[1px] w-full lg:w-[450px] px-2 mt-[30px] bg-[#D8D8D8]"></div>

							<Link
								href={
									user?.role == 'User'
										? '/user/dashboard/notifications'
										: '/technician/dashboard/notifications'
								}
							>
								<a className="text-primary  px-6 leading-5 text-base 2xl:text-xl font-proxima-nova shadow-none capitalize rounded my-[22px] block w-4/6 text-center m-auto">
									See all Notifications
								</a>
							</Link>
						</>
					)}
				</div>
			)}

			{/* <GoPrimitiveDot className="text-md text-ideeza" /> */}
			{/* <NotificationCard showDot />

      <NotificationCard />
      <NotificationCard /> */}
		</div>
	);
});

export default Notifications;
