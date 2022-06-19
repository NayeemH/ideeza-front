import { NextRouter } from 'next/router';

const routes = (history: NextRouter) => [
	{
		name: 'Dashboard',
		route: ['/service-provider/dashboard'],
		icon: '/images/siderbar-icons/dashboard.svg',
		img: true,
		click: () => history.push('/service-provider/dashboard/'),
	},
	{
		name: 'Orders',
		route: ['/service-provider/orders'],
		icon: '/images/siderbar-icons/management.svg',
		img: true,
		click: () => history.push('/service-provider/orders/'),
	},
	{
		name: 'Blog',
		route: ['/service-provider/blog'],
		icon: '/images/siderbar-icons/book-outline.svg',
		img: true,
		click: () => history.push('/service-provider/blog'),
	},

	{
		name: 'Message',
		route: ['/service-provider/messages'],
		icon: '/images/siderbar-icons/message.svg',
		img: true,
		click: () => history.push('/service-provider/messages'),
	},

	{
		name: 'My Notes',
		route: ['/service-provider/my-notes'],
		icon: '/images/siderbar-icons/list.svg',
		img: true,
		click: () => history.push('/service-provider/my-notes'),
	},

	{
		name: 'Profile Preview',
		route: ['/service-provider/profile-preview'],
		icon: '/images/siderbar-icons/person.svg',
		img: true,
		click: () => history.push('/service-provider/profile-preview'),
	},
	{
		name: 'Projects',
		route: ['/service-provider/projects'],
		icon: '/images/siderbar-icons/project.svg',
		img: true,
		click: () => history.push('/service-provider/projects'),
	},
	{
		name: 'Transactions',
		route: ['/service-provider/transactions'],
		icon: '/images/siderbar-icons/transaction.svg',
		img: true,
		click: () => history.push('/service-provider/transactions'),
	},
];

export { routes };
