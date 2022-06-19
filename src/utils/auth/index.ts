import store from 'app/store';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { setLogout } from 'reducers/auth';

export const decodeToken = (token: string): any => jwtDecode(token);

export const setRefreshToCookies = (token: string) => {
	Cookies.set('_r', token, { expires: 7 });
};
export const getTokenFromCookies = () => {
	return Cookies.get('next-auth.csrf-token');
};
export const getRefreshTokenFromCookies = () => {
	return Cookies.get('_r');
};
export const setTokenToCookies = (token: string) => {
	Cookies.set('_t', token, { expires: 7 });
};
export const isUserLoggedIn = () => {
	if (getTokenFromCookies()) {
		return true;
	}
	return false;
};

export const logout = () => {
	const cookiePref: any = localStorage.getItem('cookie_preferences');
	const joyRide: any = localStorage.getItem('joy_ride');
	localStorage.clear();
	localStorage.setItem('cookie_preferences', cookiePref);
	localStorage.setItem('joy_ride', joyRide);
	Cookies.remove('_r');
	Cookies.remove('_t');
	store.dispatch(setLogout());
};
