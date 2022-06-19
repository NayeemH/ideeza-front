import { ITimeFromNow, ITimeFromNowOptions, PaginateMetaType } from '@models/common';
import {
	endOfDay,
	endOfMonth,
	format,
	formatDistanceToNow,
	isValid,
	parseISO,
	startOfMonth,
} from 'date-fns';
import queryString from 'query-string';
import { useEffect, useRef, useState } from 'react';
import Web3Modal from 'web3modal';
// import { useSpring } from "react-spring";

export const filterQueryParams = (queryParams: { [k: string]: any }) => {
	return Object.entries(queryParams).reduce((acc: any, curr: any) => {
		if (curr[1] !== undefined) {
			acc[curr[0]] = curr[1];
			return acc;
		} else {
			return acc;
		}
	}, {});
};

export const parseQueryParameter = (queryParameter: string) => {
	return queryString.parse(queryParameter);
};
export const paginateArray = (array: any, page_size: number, page_number: number): any =>
	array.slice((page_number - 1) * page_size, page_number * page_size);
export const timeComp = (end: any) => {
	return endOfDay(new Date()).getTime() > endOfDay(new Date(end)).getTime();
};
export const greeting = (firstName: string) => {
	const first_Name = firstName && firstName[0].toUpperCase() + firstName.substring(1);

	const today = new Date();
	const curHr = today.getHours();

	if (curHr < 12) {
		return `Good Morning, ${first_Name ? first_Name : 'Stranger'}!`;
	} else if (curHr < 18) {
		return `Good Afternoon, ${first_Name ? first_Name : 'Stranger'}!`;
	} else {
		return `Good Evening, ${first_Name ? first_Name : 'Stranger'}!`;
	}
};

export const useOutsideClickHandler = (ref: any, toggle: () => void) => {
	useEffect(() => {
		function handleClickOutside(event: any) {
			if (ref && ref.current && !ref.current.contains(event.target)) {
				toggle();
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, toggle]);
};

export const stringifyQueryParameter = (queryParameter: Record<string, any>) => {
	return queryString.stringify(queryParameter);
};

export const useThrottle = (value: string, limit: number) => {
	const [throttledValue, setThrottledValue] = useState(value);
	const lastRan = useRef(Date.now());

	useEffect(() => {
		const handler = setTimeout(function () {
			if (Date.now() - lastRan.current >= limit) {
				setThrottledValue(value);
				lastRan.current = Date.now();
			}
		}, limit - (Date.now() - lastRan.current));

		return () => {
			clearTimeout(handler);
		};
	}, [value, limit]);

	return throttledValue;
};

export const isDataInArray = (arr: any[]) => Array.isArray(arr) && arr.length > 0;
/* Shorten number value (e.g. 10000 to 10K, 1500000 to 1.5M)*/
export const numerify = (value: number): string | null => {
	if (!value) return '0';

	if (value < 1000) return value.toString();

	const numValue: string = value.toString().replace(/[^0-9.]/g, '');
	const num = Number(numValue);

	const si: any = [
		{ v: 1e3, s: 'K' },
		{ v: 1e6, s: 'M' },
		{ v: 1e9, s: 'B' },
		{ v: 1e12, s: 'T' },
		{ v: 1e15, s: 'P' },
		{ v: 1e18, s: 'E' },
	];

	let index;

	for (index = si.length - 1; index > 0; index--) {
		if (num >= si[index].v) {
			break;
		}
	}
	return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s;
};

export const timeFromNowFns = (dateTime: any, postfix = ' ago', prefix = ''): string => {
	try {
		if (!dateTime) return '';
		const date = new Date(dateTime);
		return `${prefix}${formatDistanceToNow(date)}${postfix}`;
	} catch (e) {
		return '';
	}
};

/*!
 * Get the amount of time from now for a date
 * @param  {String|Date} time The date to get the time from now for
 * @return {Object}           The time from now data
 * --------------------------------------------------------------------------------------
 */
const defaultTfnOptions: ITimeFromNowOptions = {
	labels: {
		now: 'few seconds ago',
		past: 'ago',
		future: 'after',
	},
};

export const timeFromNow = (
	date: string | Date,
	options: ITimeFromNowOptions = defaultTfnOptions
): string | null => {
	// Get timestamps
	const unixTime: number = new Date(date).getTime();
	if (!unixTime) return null;
	const now: number = new Date().getTime();

	// Calculate difference
	let difference: number = unixTime / 1000 - now / 1000;

	// Setup return object
	const tfn: ITimeFromNow = {
		when: '',
		unitOfTime: '',
		time: null,
	};

	// Check if time is in the past, present, or future
	tfn.when = 'now';
	if (difference > 0) {
		tfn.when = 'future';
	} else if (difference < -1) {
		tfn.when = 'past';
	}

	// Convert difference to absolute
	difference = Math.abs(difference);

	// Calculate time unit
	if (difference / (60 * 60 * 24 * 365) > 1) {
		// Years
		tfn.unitOfTime = 'years';
		tfn.time = Math.floor(difference / (60 * 60 * 24 * 365));
	} else if (difference / (60 * 60 * 24 * 45) > 1) {
		// Months
		tfn.unitOfTime = 'months';
		tfn.time = Math.floor(difference / (60 * 60 * 24 * 45));
	} else if (difference / (60 * 60 * 24) > 1) {
		// Days
		tfn.unitOfTime = 'days';
		tfn.time = Math.floor(difference / (60 * 60 * 24));
	} else if (difference / (60 * 60) > 1) {
		// Hours
		tfn.unitOfTime = 'hours';
		tfn.time = Math.floor(difference / (60 * 60));
	} else {
		// Seconds
		tfn.unitOfTime = 'seconds';
		tfn.time = Math.floor(difference);
	}

	// Return time from now data
	if (tfn.when === 'now') return `${options?.labels?.now}`;
	if (tfn.when === 'past') return `${tfn.time} ${tfn.unitOfTime} ${options?.labels?.past}`;
	if (tfn.when === 'future') return `${options?.labels?.future} ${tfn.time} ${tfn.unitOfTime}`;
	return null;
};
export const checkSelfUser = (
	loggedInUserId: string | number | undefined,
	queryParamUserId: string | number | undefined
) => {
	return Number(loggedInUserId) === Number(queryParamUserId);
};
export const landingPageSearchTimes = () => {
	return {
		set(value: any) {
			window.localStorage.setItem('landing_page_search_count', value);
			window.localStorage.setItem('landing_page_search_time', new Date().toString());
		},
		get(): number {
			const data = window.localStorage.getItem('landing_page_search_count');
			return data !== undefined && data !== null && data !== '' ? Number(data) : 0;
		},
		getLastSearchAgo(): any {
			const last_entry_date = window.localStorage.getItem('landing_page_search_time');

			if (
				last_entry_date !== undefined &&
				last_entry_date !== null &&
				last_entry_date !== ''
			) {
				const diff = new Date().getTime() - new Date(last_entry_date).getTime();
				return diff / 60000;
			}

			return 0;
		},
	};
};
/**
 * Get the excerpt of a blog post or any block of text/string
 * @param  {string} // The text to get excerpt | required: true
 * @param {number} // Length to excerpt | required: false | default: 140
 * @param {boolean} // should remove all html tags from text | required: false | default: false
 * @return {string}
 * --------------------------------------------------------------------------------------
 */
export const getTextExcerpt = (text: any, length = 140, removeTags = false): string => {
	let desc = '';

	if (!text) return desc;

	desc = removeTags ? removeHtmlTags(text) : text;

	if (desc.length > length) {
		return desc.substring(0, length) + '...';
	}
	return desc;
};
/**!
 * Remove all html tags from a blog post or any block of text/string with
 * @param  {string} // The text to remove html tags | required: true
 * @return {string}
 * --------------------------------------------------------------------------------------
 */
export const removeHtmlTags = (text: string): string => {
	let str = '';
	if (!text) return str;
	str = text.toString();
	return str.replace(/(<([^>]+)>)/gi, '');
};
/**
 * validate email
 * @param {*} email
 */
export const validateEmail = (email: string) => {
	const reg =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
	return reg.test(String(email).toLowerCase());
};
/**
 * validate Website Url
 * @param {*} web url
 */
export const validateWebUrl = (url: string) => {
	const reg = /^(ftp|http|https):\/\/[^ "]+$/;
	return reg.test(String(url));
};
/**
 * format Amount With Commas, fraction and currency
 * @param {number} num // number value to be formated | required: true
 * @param {number} minFractionDigits // return value will in fraction | required: false | default: 2
 * @param {boolean} hasCommaSeparator // return value will be comma separeted if true | required: false | default: false
 * @param {string} currencyCode // International currency code | required: false | default: 'USD'
 * @param {string} currency // currency symble to return with the value | required: false | default: '$'
 * @param {number} maximumSignificantDigits // format for the comma separeted value | required: false | default: 3
 * @return {string}
 */
export const formatAmount = (
	num: number,
	minFractionDigits = 2,
	hasCommaSeparator = false,
	currencyCode = 'USD',
	currency = '$',
	maximumSignificantDigits = 3
): string => {
	if (hasCommaSeparator) {
		return new Intl.NumberFormat('en-IN', {
			style: 'currency',
			currency: currencyCode,
			maximumSignificantDigits,
		}).format(num);
	}
	if (num) {
		return num < 0
			? '-' + currency + Math.abs(Number(num)).toFixed(minFractionDigits)
			: currency + Number(num).toFixed(minFractionDigits);
	}
	return currency + Number(0).toFixed(minFractionDigits);
};

export const getParamFromUrl = (url: string, key: string) => {
	if (!url || !key) return null;
	const newUrl = new URL(url);
	return newUrl.searchParams.get(key);
};

export const getPaginateMeta = (data: any, currentPage: number, perPage: number) => {
	const meta: PaginateMetaType = {
		pageCount: 1,
		next: null,
		previous: null,
		currentPage: currentPage,
		perPage: perPage,
	};

	if (!data || data == {}) return meta;
	meta.pageCount = data?.count > perPage ? Math.ceil(data?.count / perPage) : 1;
	meta.next = (data?.next && Number(getParamFromUrl(data?.next, 'page'))) || null;
	meta.previous = (data?.previous && Number(getParamFromUrl(data?.previous, 'page'))) || null;

	return meta;
};

export const timeSince = (date: any) => {
	const seconds = Math.floor(((new Date() as any) - date) / 1000);
	let interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) + ' years';
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + ' months';
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + ' days';
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + ' hours';
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + ' minutes';
	}
	return Math.floor(seconds) + ' seconds';
};

export const getLastMonths = (
	date: Date = new Date(),
	numberOfMonths = 12,
	isFormatted = true,
	dateFormat = 'yyyy-MM-dd'
) => {
	// const date = new Date()
	if (!isValid(date)) return [];
	console.log('isValid Date-------', isValid(date), date);
	const months = [];
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	for (let i = 0; i < numberOfMonths; i++) {
		try {
			const month = monthNames[date.getMonth()];
			const year = date.getFullYear();
			const monthNameWithYear = month + ' ' + year;
			const newDate = new Date(monthNameWithYear);

			months.push({
				name: monthNameWithYear,
				firstDay: isFormatted
					? format(startOfMonth(newDate), dateFormat)
					: startOfMonth(newDate),
				lastDay: isFormatted
					? format(endOfMonth(newDate), dateFormat)
					: endOfMonth(newDate),
			});
			date.setMonth(date.getMonth() - 1);
		} catch (error) {}
	}
	return months;
};

export const getExtensionFromFileName = (file_name: string) => {
	const last_dot = file_name.lastIndexOf('.');
	return file_name.slice(last_dot + 1);
};
export function getQueryParam(Param: string): any {
	try {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(Param);
	} catch (e) {
		return null;
	}
}
export async function base64ToFile(url: string): Promise<any> {
	const res = await fetch(url);
	const blob = await res.blob();
	console.log('blob', blob);

	return new File([blob], 'File name', { type: 'image/png' });
}
export function getTimeFormat(time: any) {
	return format(parseISO(time), 'h:mm a');
}

export function getExceptedArray(array: any[], arrayItemsToRemove: any[]) {
	const exceptedArray = [...array];

	if (arrayItemsToRemove && arrayItemsToRemove?.length > 0) {
		arrayItemsToRemove.forEach((item) => {
			const originIndex = exceptedArray.findIndex((x) => x === item);
			if (originIndex > -1) {
				exceptedArray.splice(originIndex, 1);
			}
		});
	}

	return exceptedArray;
}

export const capitalize = (string: any) => {
	if (!string) return '';
	const str = string.toString();
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const a11yProps = (index: number) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
};

export const connectToWallet = async () => {
	const web3Modal = new Web3Modal();
	try {
		const connection = await web3Modal.connect();
		return connection;
	} catch (error: any) {
		return error;
	}
};
