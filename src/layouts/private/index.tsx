import { useAppDispatch } from 'app/hooks';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { setDataAsync } from 'reducers/auth';
import PrivateHeader from './header';
import PrivateSidebar from './sidebar';
import { styled, useTheme } from '@mui/material/styles';

import CommonMeta from '@atoms/commonMeta';
import { useRouter } from 'next/router';
// import Loader from "@atoms/loader";

interface PrivateLayoutProps {
	children: JSX.Element | JSX.Element[];
	list: any;
	hasBackBtn?: boolean;
	title?: string;
	isMyNoteSection?: boolean;
}

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
	open?: boolean;
	theme: any;
	marginleft?: boolean;
}>(({ open, theme }) => ({
	flexGrow: 1,
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	// marginLeft: 100,

	'@media screen and (min-width: 1200px)': {
		marginLeft: 100,
	},
	paddingTop: '85px',
	'@media screen and (max-width: 991px)': {
		paddingTop: '0',
	},
	minHeight: '100vh',
	backgroundColor: '#F6F6F6',
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),

		// "@media screen and (min-width: 1024px)": {
		//   marginLeft: drawerWidth + "px",
		// },
		// "@media screen and (max-width: 1024px)": {
		//   marginLeft: 0 + "px",
		// },

		[theme.breakpoints.up('lg')]: {
			marginLeft: drawerWidth + 'px',
		},
		[theme.breakpoints.down('lg')]: {
			marginLeft: 0 + 'px',
		},
		// marginLeft: "0px",
	}),
}));

const PrivateLayout = ({
	children,
	list,
	hasBackBtn,
	title,
	isMyNoteSection = false,
}: PrivateLayoutProps) => {
	const theme = useTheme();
	const router = useRouter();
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/');
		},
	});
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(true);
	const [openMobile, setOpenMobile] = useState(false);

	/* TODO: remove the followling commented line after testing double loader issue  */
	// const loading = useAppSelector(({ auth }) => auth?.loading);

	useEffect(() => {
		if (status === 'authenticated') {
			dispatch(setDataAsync(Number(session?.user.id)));
		}
	}, [status]);

	return (
		<>
			<CommonMeta title={title} />
			<div>
				{/* TODO: remove the followling commented line after testing double loader issue  */}
				{/* {loading ? <Loader /> : null} */}
				<PrivateHeader
					open={open}
					toggle={() => setOpen(!open)}
					openMobile={openMobile}
					toggleMobile={() => setOpenMobile(!openMobile)}
				/>
				<PrivateSidebar
					hasBackBtn={hasBackBtn === undefined ? false : hasBackBtn}
					open={open}
					toggle={() => setOpen(!open)}
					list={list}
					openMobile={openMobile}
					toggleMobile={() => setOpenMobile(!openMobile)}
				/>
				<Main
					open={open}
					theme={theme}
				>
					{isMyNoteSection ? (
						<div className="pl-[12px] pr-1 mt-20 md:mt-14 lg:mt-0 py-[54px] md:pl-[30px] 2xl:pl-[56px] font-proxima-nova">
							{children}
						</div>
					) : (
						<div className="px-[12px] mt-20 md:mt-14 lg:mt-0 py-[54px] md:px-[30px] 2xl:px-[56px] font-proxima-nova">
							{children}
						</div>
					)}
				</Main>
			</div>
		</>
	);
};

export default PrivateLayout;
