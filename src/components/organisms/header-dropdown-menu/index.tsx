import Label from '@atoms/label';
import { Menu, Transition } from '@headlessui/react';
import { Avatar } from '@mui/material';
import React, { Fragment, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { logout } from 'utils/auth';
import { IUserData } from 'models/auth';
import { signOut } from 'next-auth/react';
import ThreeJs from '@organisms/threejs';
import Modal from '@atoms/modal';

const DropDownMenu = ({
	active,
	user,
}: {
	active: boolean | string | undefined;
	user: IUserData | undefined;
}) => {
	const router = useRouter();

	const tempEditorRef = useRef<any>(null);
	const [tempEditorLoaded, setTempEditorLoaded] = useState(false);
	const [logoutLoader, setLogoutLoader] = useState(false);

	const handleLogout = async () => {
		setLogoutLoader(true);
		if (tempEditorRef?.current && tempEditorLoaded) {
			tempEditorRef?.current?.clear(true);
		}
		await signOut({ redirect: false, callbackUrl: '/' });
		logout();
		router.push('/');
	};

	const classes =
		(active === 'user' ? 'text-ideeza-300 ' : 'text-white ') +
		'capitalize text-base tracking-tight whitespace-nowrap md:w-16 w-0 truncate md:w-auto font-proxima-nova ml-1';
	return (
		<>
			<Menu
				as="div"
				className="relative inline-block text-left"
			>
				<div>
					<Menu.Button className="inline-flex justify-center rounded-md shadow-sm md:px-4 md:py-2 text-sm font-medium focus:outline-none ">
						{/* focusClasses: focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 */}
						<div
							className="flex items-center cursor-pointer"
							// onClick={() =>
							//   setActive((prev: any) => (prev === "user" ? "" : "user"))
							// }
						>
							{user?.profile_photo ? (
								<Avatar
									className="capitalize w-6 h-6 md:w-[35px] md:h-[35px] text-xl"
									// src={user?.first_name[0]}
									src={user?.profile_photo}
								/>
							) : (
								// <Avatar
								//   className="capitalize w-6 h-6 md:w-10 md:h-10 text-xl"
								//   // src={user?.first_name[0]}
								//   // src={user?.profile_photo}
								// />
								<Avatar variant="circular">
									{user ? user?.first_name?.charAt(0).toUpperCase() : 'O'}
								</Avatar>
							)}

							<Label
								classes={{
									root: classes,
								}}
								value={
									typeof user?.first_name !== 'undefined' &&
									typeof user?.last_name !== 'undefined'
										? `${user?.first_name} ${user?.last_name}`
										: `no name found `
								}
								className={!user?.last_name && !user?.first_name && 'text-red-900'}
							/>
							<FaChevronDown
								className="ml-2"
								color={active === 'user' ? 'pink ' : 'white '}
								fontSize="16"
							/>
						</div>
					</Menu.Button>
				</div>

				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="origin-top-right absolute right-0 mt-2 w-[130px] md:w-[260px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none px-[15px] pb-[20px] top-[125%]">
						<div className="my-1">
							<Menu.Item
								onClick={() =>
									router.push(
										user?.role === 'User'
											? `/user/profile/${user?.id}`
											: user?.role === 'Admin'
											? `/admin/profile/${user?.id}`
											: `/technician/profile/${user?.id}`
									)
								}
							>
								{({ active }) => (
									<div className="flex items-center gap-[12px] pt-[18px] pb-[10px] border-b">
										<div>
											{user?.profile_photo ? (
												<Avatar
													className="capitalize w-6 h-6 md:w-[55px] md:h-[55px]"
													// src={user?.first_name[0]}
													src={user?.profile_photo}
												/>
											) : (
												// <Avatar
												//   className="capitalize w-6 h-6 md:w-10 md:h-10 text-xl"
												//   // src={user?.first_name[0]}
												//   // src={user?.profile_photo}
												// />
												<Avatar variant="circular">
													<span>U</span>
												</Avatar>
											)}
										</div>

										<div
											className={
												active
													? 'transition-colors duration-150 text-gray-600 font-proxima-nova block text-base cursor-pointer md:text-[18px]'
													: 'transition-colors duration-150 text-gray-600 font-proxima-nova block text-base md:text-[18px]'
											}
										>
											<Label
												value={
													typeof user?.first_name !== 'undefined' &&
													typeof user?.last_name !== 'undefined'
														? `${user?.first_name} ${user?.last_name}`
														: `no name found `
												}
												className="text-[#333333] text-[18px] font-semibold font-proxima-nova leading-[20px]"
											/>
											<div className="text-[14px] leading-[20px] text-[#999999]">
												See my profile
											</div>
										</div>
									</div>
								)}
							</Menu.Item>
							<Menu.Item
								onClick={() =>
									router.push(
										user?.role === 'User'
											? '/user/settings/general'
											: user?.role === 'Admin'
											? '/admin/settings/general'
											: '/technician/settings/general'
									)
								}
							>
								{({ active }) => (
									<div className="flex items-center pt-[20px] justify-between w-full">
										<div className="flex items-center gap-[20px]">
											<img
												src="/images/icon/settings-outline-gray.svg"
												alt=""
											/>
											<div
												className={
													active
														? 'transition-colors duration-150 text-gray-600 font-proxima-nova block text-base cursor-pointer md:text-[18px] '
														: 'transition-colors duration-150 text-gray-600 font-proxima-nova block text-base md:text-[18px]'
												}
											>
												Settings
											</div>
										</div>
										<img
											src="/images/icon/Icon ionic-ios-arrow-right.svg"
											alt=""
										/>
									</div>
								)}
							</Menu.Item>
							<Menu.Item onClick={() => handleLogout()}>
								{({ active }) => (
									<div className="flex items-center pt-[20px] justify-between w-full">
										<div className="flex items-center gap-[20px]">
											<img
												src="/images/icon/logout-icon.svg"
												alt=""
											/>
											<div
												className={
													active
														? 'transition-colors duration-150 text-gray-600 font-proxima-nova block text-base cursor-pointer md:text-[18px] '
														: 'transition-colors duration-150 text-gray-600 font-proxima-nova block text-base md:text-[18px]'
												}
											>
												Log Out
											</div>
										</div>
										<img
											src="/images/icon/Icon ionic-ios-arrow-right.svg"
											alt=""
										/>
									</div>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
				<div
					style={{
						width: '20px',
						height: '20px',
						position: 'absolute',
						top: '-140%',
						left: '-150%',
						pointerEvents: 'none',
					}}
					className="fixed-canvas custom-resp-canvas"
				>
					<ThreeJs
						{...{
							editorFile: 999999,
							editorRef: tempEditorRef,
							setEditorLoaded: setTempEditorLoaded,
							toolbar: 'none',
							noPopup: true,
						}}
					/>
				</div>
			</Menu>
			<Modal
				disableEscapeKeyDown
				width="xs"
				open={logoutLoader}
				content={
					<div className="mt-4 flex flex-col justify-center items-center">
						<img
							className="w-24 h-24 mb-8"
							src="/images/logo/BubblePlay_fast.gif"
							alt="Loading"
						/>
						<Label
							value="Please Wait, logging you out..."
							className="text-gray-700 tracking-tight font-proxima-nova leading-6 text-md text-center font-bold"
						/>
					</div>
				}
			/>
		</>
	);
};
export default DropDownMenu;
