import { NextRouter } from 'next/router';
// import { AiOutlineSetting } from "react-icons/ai";
export const routes = (history: NextRouter) => [
	{
		name: 'General',
		route: ['/technician/settings/general'],
		icon: '/images/siderbar-icons/settings-outline.svg',
		img: true,
		click: () => history.push('/technician/settings/general'),
	},
	{
		name: 'Notification',
		route: ['/technician/settings/notifications'],
		icon: '/images/siderbar-icons/notification.svg',
		img: true,
		click: () => history.push('/technician/settings/notifications'),
	},
	{
		name: 'Privacy',
		route: ['/technician/settings/privacy'],
		icon: '/images/siderbar-icons/finger-print-outline.svg',
		img: true,
		click: () => history.push('/technician/settings/privacy'),
	},
	{
		name: 'Security',
		route: ['/technician/settings/security'],
		icon: '/images/siderbar-icons/shield-outline.svg',
		img: true,
		click: () => history.push('/technician/settings/security'),
	},
	{
		name: 'GetPaid',
		route: ['/technician/settings/get-paid'],
		icon: '/images/siderbar-icons/get-paid.svg',
		img: true,
		click: () => history.push('/technician/settings/get-paid'),
	},
	{
		name: 'Tax Information',
		route: ['/technician/settings/tax-information'],
		icon: '/images/siderbar-icons/tax-information.svg',
		img: true,
		click: () => history.push('/technician/settings/tax-information'),
	},
];
