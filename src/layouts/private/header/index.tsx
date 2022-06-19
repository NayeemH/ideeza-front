import { AppBar, Badge, IconButton, Toolbar } from '@mui/material';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosMenu, IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineQuestionCircle, AiOutlineShoppingCart } from 'react-icons/ai';
import DropDownMenu from '@organisms/header-dropdown-menu';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { IUserData } from 'models/auth';
import Notifications from '@organisms/notifications';
import { useRouter } from 'next/router';
import { apiService } from '../../../utils/request';
import { setTotalNotifications } from '@features/user/dashboard/notifications/reducer';

const PrivateHeader = ({
	toggle,
	// openMobile,
	toggleMobile,
	open,
}: // open,
{
	toggle: () => void;
	toggleMobile: () => void;
	open: boolean;
	openMobile: boolean;
}) => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector((state) => state?.auth?.userData);
	const ref = useRef<any>(null);

	const totalNotifications = useAppSelector(
		({ notification }) => notification?.totalNotifications
	);

	const [user, setUser] = useState<IUserData>();
	const [active, setActive] = useState<string>('');
	const router = useRouter();

	/* const [totalFriendRequests, setTotalFriendRequests] = useState<undefined | number>(
    undefined
  ); */

	const getFriendRequests = async () => {
		apiService(
			{
				method: 'get',
				url: `/account/friend/pending-friend-request/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					//setTotalFriendRequests(Number(data?.count) ?? 0);
					dispatch(
						setTotalNotifications(totalNotifications + Number(Number(data?.count) ?? 0))
					);

					return;
				}
			}
		);
	};

	useEffect(() => {
		getFriendRequests();
	}, []);

	useEffect(() => {
		if (userData) {
			setUser(userData);
		}
	}, [userData]);

	return (
		<AppBar
			position="fixed"
			className="pr-0"
		>
			<Toolbar className="bg-white header-bg flex justify-between py-[20px] transition-all">
				<div
					className={`lg:flex items-center ${
						open && 'justify-between'
					}  w-48 md:w-80 gap-[35px] hidden transition-all`}
				>
					<>
						<Link href="/">
							<a>
								{open ? (
									<Image
										src="/images/logo/logo.svg"
										alt="ula"
										width="112"
										height="48"
										// layout="responsive"
									/>
								) : (
									<img
										src="/favicon.ico"
										alt=""
									/>
								)}
							</a>
						</Link>
						<button onClick={toggle}>
							{open ? (
								<IoIosMenu className="private-sidebar-for-large-device border text-gray-400 rounded-full md:p-2 p-1 text-lg md:text-3xl md:h-[50px] md:w-[50px] hover:bg-gray-300 md:mr-[-20px]" />
							) : (
								<div className=" image-wrapper-closed-private-sidebar text-lg md:text-3xl md:h-[50px] md:w-[50px] hover:bg-gray-100 md:mr-[-20px] flex items-center justify-center">
									<img
										src="/images/icon/toggle-nav-icon.svg"
										alt=""
										className="private-sidebar-for-large-device"
									/>
								</div>
							)}
						</button>
					</>
				</div>

				<div className="flex items-center justify-between w-48 md:w-80 lg:hidden">
					<>
						<Link href="/">
							<a>
								<Image
									src="/images/logo/logo.svg"
									alt="ula"
									width="112"
									height="48"
									// layout="responsive"
								/>
							</a>
						</Link>
					</>
				</div>

				<div className="flex items-center justify-end">
					<IconButton
						className={
							(active === 'help' ? 'text-primary ' : 'text-white ') +
							'md:p-1 focus:outline-none'
						}
						onClick={() => {
							setActive((prev: any) => (prev === 'help' ? '' : 'help'));
							router.push('/user/dashboard/faq');
						}}
					>
						<AiOutlineQuestionCircle
							className={`${
								active === 'help' ? 'text-primary ' : 'text-white '
							} icon-small-device text-white text-[25px]`}
							// size="25"
						/>
					</IconButton>

					{/* {user?.role === "User" && ( */}
					<div className="hidden md:block">
						{userData?.role !== 'Technician' && (
							<Link href="/user/dashboard/cart">
								<button
									className={
										(active === 'cart' ? 'text-primary ' : 'text-white ') +
										'md:p-1 focus:outline-none'
									}
									onClick={() => {
										setActive((prev) => (prev === 'cart' ? 'none' : 'cart'));
									}}
								>
									<AiOutlineShoppingCart
										className="text-white"
										size="25"
									/>
								</button>
							</Link>
						)}
					</div>

					{/* )} */}
					<Badge
						badgeContent={totalNotifications}
						color="primary"
					>
						<button
							className={
								(active === 'notifications' ? 'text-primary ' : 'text-white ') +
								'md:p-1 pr-[10px] md:pr-0 focus:outline-none '
							}
							onClick={() => {
								setActive((prev) =>
									prev === 'notifications' ? 'none' : 'notifications'
								);
							}}
						>
							<IoMdNotificationsOutline
								className={
									active === 'notifications'
										? 'text-primary text-[30px]'
										: 'text-white text-[30px]'
								}
							/>
						</button>
					</Badge>
					{active === 'notifications' && (
						<Notifications
							setActive={setActive}
							ref={ref}
						/>
					)}

					{user && (
						<DropDownMenu
							// setActive={setActive}
							active={active}
							user={user}
							// logout={logout}
						/>
					)}
					<button
						onClick={() => {
							toggleMobile();
						}}
					>
						<IoIosMenu className="border text-white rounded-full text-xl md:text-3xl p-1 w-8 h-8 hover:bg-gray-300 ml-5 private-sidebar-for-medium-and-small-device" />
					</button>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default PrivateHeader;
