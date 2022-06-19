import React, { useEffect } from 'react';
import { Drawer as Drawers } from '@mui/material';
import Menu from '../../molecules/menu-list';
import Button from '../../atoms/button';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'app/hooks';
// import { IoClose } from "react-icons/io5";
import { setBlock, setCurrentTabMenu } from '@layouts/private/sidebar/reducer';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

type drawerProps = {
	location?: any;
	list: [];
	hasSidebarTab?: boolean;
	children: React.ReactNode;
	open: boolean;
	openMobile: boolean;
	toggle?: () => void;
	toggleMobile?: () => void;
	hasBackBtn?: boolean;
};

function Drawer({
	location,
	list,
	hasSidebarTab,
	children,
	open,
	openMobile,
	toggleMobile,
	hasBackBtn,
	toggle,
}: drawerProps) {
	const dispatch = useAppDispatch();
	const menu = useAppSelector((state) => state?.sidebar?.currentTabMenu);
	const router = useRouter();
	const userRole = useAppSelector((state) => state?.auth?.userData?.role);
	const drawerWidth = 300;
	// const theme = useTheme();
	// console.log(list, "List")
	/**
	 * Clear all the selected blocks on route change
	 */
	useEffect(() => {
		const handleRouteChange = () => {
			dispatch(setBlock([]));
		};
		router.events.on('routeChangeStart', handleRouteChange);
	}, []);

	const openedMixin = (theme: Theme): CSSObject => {
		// console.log("caling OpenMixin");
		return {
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
			overflowX: 'hidden',
		};
	};

	const closedMixin = (theme: Theme): CSSObject => {
		// console.log("caling CloseMixin");
		return {
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: 'hidden',
			width: 100,
		};
	};

	const CustomDrawer = styled(MuiDrawer, {
		shouldForwardProp: (prop) => prop !== 'open',
	})(({ theme, open }) => {
		return {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap',
			boxSizing: 'border-box',
			...(open && {
				...openedMixin(theme),
				'& .MuiDrawer-paper': openedMixin(theme),
			}),
			...(!open && {
				...closedMixin(theme),
				'& .MuiDrawer-paper': closedMixin(theme),
			}),
		};
	});
	return (
		<div>
			<CustomDrawer
				open={open}
				variant="permanent"
				anchor="left"
				sx={{
					display: { xs: 'none', lg: 'block' },
					'& .MuiDrawer-paper': {
						// boxSizing: "border-box",
						// width: drawerWidth,
						// "@media screen and (max-width: 425px)": {
						//   width: "0",
						// },
						// boxShadow: "10px 30px 30px rgba(0, 0, 0, .16)",
						marginTop: '95px',
						paddingBottom: '85px',
					},
				}}
			>
				{hasBackBtn && (
					<div className="w-full px-5 flex justify-center gap-5 pt-5 xl:pt-[70px]">
						<Button
							value="Settings"
							className={
								'bg-primary text-sm md:text-base  font-proxima-nova text-white transform-none shadow-none  tracking-tight  px-[33px] pt-[9px] pb-[12px] rounded mr-2'
							}
							// iconStart={<FaArrowCircleLeft className="text-lg" />}
							// onClick={() =>
							//   userRole === "Technician"
							//     ? router.push("/technician/dashboard")
							//     : router.push("/user/dashboard")
							// }
							color="primary"
							variant="outlined"
						/>
						<Button
							value="General"
							className={
								'bg-white text-sm md:text-base  font-proxima-nova text-gray-400 transform-none shadow-none border border-gray-300  tracking-tight px-[39px]  pt-[9px] pb-[12px] rounded '
							}
							// iconStart={<FaArrowCircleLeft className="text-lg" />}
							onClick={() =>
								userRole === 'Technician'
									? router.push('/technician/dashboard')
									: router.push('/user/dashboard')
							}
							// color="primary"
							variant="outlined"
						/>
					</div>
				)}
				{hasSidebarTab ? (
					<div className="w-full grid grid-cols-2 items-center gap-3 px-5 pt-5">
						<Button
							value="Menu"
							onClick={() => dispatch(setCurrentTabMenu('Menu'))}
							variant={menu === 'Menu' ? 'contained' : 'outlined'}
							color="primary"
							className={`${menu === 'Menu' ? 'bg-primary text-white' : ''}`}
						/>
						<Button
							value="Customize"
							onClick={() => dispatch(setCurrentTabMenu('Customize'))}
							variant={menu === 'Customize' ? 'contained' : 'outlined'}
							color="primary"
							className={`${menu === 'Customize' ? 'bg-primary text-white' : ''}`}
						/>
					</div>
				) : null}
				<div className="">
					{hasSidebarTab ? (
						menu === 'Menu' ? (
							<Menu
								location={location}
								list={list}
								open={open}
							/>
						) : (
							children
						)
					) : (
						<Menu
							location={location}
							list={list}
							open={open}
						/>
					)}
				</div>
			</CustomDrawer>
			<Drawers
				variant="temporary"
				anchor="right"
				// hideBackdrop={true}
				BackdropProps={{
					style: { backgroundColor: 'transparent', opacity: 2 },
				}}
				sx={{
					display: { xs: 'block', lg: 'none' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
						'@media screen and (max-width: 425px)': {
							width: '300px',
						},
						boxShadow: 'none',
						marginTop: '95px',
						paddingBottom: '85px',
						paddingTop: '10px',
					},
				}}
				open={openMobile}
				onClose={toggleMobile}
			>
				{/* <IoClose
          // onClick={toggleOpen}
          className="text-red-500 font-semibold cursor-pointer flex ml-auto lg:hidden absolute top-[10px] right-[5px]"
          size="25"
          // open={open}
          onClick={toggleMobile}
        /> */}
				{hasBackBtn && (
					<Button
						value="Go back"
						className={
							'bg-primary text-base 2xl:text-xl font-semibold text-white transform-none shadow-none  tracking-tight  px-5 py-2 rounded mx-5 mt-[2rem] lg:mt-4'
						}
						iconStart={<FaArrowCircleLeft className="text-lg" />}
						onClick={() =>
							userRole === 'Technician'
								? router.push('/technician/dashboard')
								: router.push('/user/dashboard')
						}
						color="primary"
					/>
				)}
				{hasSidebarTab ? (
					<div className="w-full grid grid-cols-2 items-center gap-3 px-5 pt-5">
						<Button
							value="Menu"
							onClick={() => dispatch(setCurrentTabMenu('Menu'))}
							variant={menu === 'Menu' ? 'contained' : 'outlined'}
							color="primary"
							className={`${menu === 'Menu' ? 'bg-primary text-white' : ''}`}
						/>
						<Button
							value="Customize"
							onClick={() => dispatch(setCurrentTabMenu('Customize'))}
							variant={menu === 'Customize' ? 'contained' : 'outlined'}
							color="primary"
							className={`${menu === 'Customize' ? 'bg-primary text-white' : ''}`}
						/>
					</div>
				) : null}
				<div className="">
					{hasSidebarTab ? (
						menu === 'Menu' ? (
							<Menu
								location={location}
								list={list}
								open={openMobile}
							/>
						) : (
							children
						)
					) : (
						<>
							<Menu
								toggle={toggle}
								location={location}
								list={list}
								open={openMobile}
							/>
						</>
					)}
				</div>
			</Drawers>
		</div>
	);
}
export default Drawer;
