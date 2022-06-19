import CommonMeta from '@atoms/commonMeta';
import Loader from '@atoms/loader';
import CookiePreference from '@organisms/cookie-preference';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { setDataAsync } from 'reducers/auth';
// import { useOutsideClickHandler } from "utils/utils";
import PublicFooter from './footer';
import PublicHeader from './header';

interface PublicLayoutProps {
	children: JSX.Element | JSX.Element[];
	isSupport?: string;
	title?: string;
}

const PublicLayout = ({ children, isSupport, title }: PublicLayoutProps) => {
	const { data: session, status } = useSession();
	const loading = useAppSelector(({ auth }) => auth?.loading);
	const [showMenuMobile, setShowMenuMobile] = useState(false);

	const dispatch = useAppDispatch();
	const isSelected = {
		isManufacturer: true,
		isAbout: false,
		isBlog: false,
		successStory: false,
		isSignup: false,
		isLogin: false,
	};
	const [openCookiePopup, setOpenCookiePopup] = useState(false);
	const [cookieCheckbox, setCookieCheckbox] = useState(false);
	// const ref= useRef();
	// useOutsideClickHandler(ref, () => setOpenCookiePopup(!openCookie))

	useEffect(() => {
		handleCookiePopupOpen();
	}, []);

	useEffect(() => {
		if (status === 'authenticated') {
			dispatch(setDataAsync(Number(session?.user.id)));
		}
	}, [status]);

	useEffect(() => {
		console.log('Public Session-----------', session);
	}, [session]);

	const handleCookiePopupOpen = () => {
		const cookiePref =
			typeof window !== 'undefined' && localStorage?.getItem('cookie_preferences')
				? JSON.parse(localStorage?.getItem('cookie_preferences') || '')
				: null;
		setOpenCookiePopup(!cookiePref?.approved);
	};
	const handleCookiePopupClose = () => setOpenCookiePopup(false);

	const handleCookieApprove = () => {
		typeof window !== 'undefined' &&
			localStorage.setItem(
				'cookie_preferences',
				JSON.stringify({ approved: true, strict: cookieCheckbox })
			);
		handleCookiePopupClose();
	};

	return (
		<>
			<CommonMeta title={title} />
			<div className="min-h-screen relative">
				{showMenuMobile && (
					<div
						className="absolute top-0 left-0 w-[100%] h-[100%] bg-black opacity-50 z-[500]"
						onClick={() => setShowMenuMobile(false)}
					></div>
				)}
				{loading ? <Loader /> : null}
				<CookiePreference
					openCookie={openCookiePopup}
					handleClose={handleCookiePopupClose}
					handleApprove={handleCookieApprove}
					checked={cookieCheckbox}
					onChangeCheckbox={(e: any) => setCookieCheckbox(e.target.checked)}
				/>
				<PublicHeader
					isSupport={isSupport}
					isSelected={isSelected}
					showMenuMobile={showMenuMobile}
					setShowMenuMobile={setShowMenuMobile}
				/>
				<main className="min-h-screen bg-white relative">{children}</main>
				<PublicFooter />
			</div>
		</>
	);
};

export default PublicLayout;
