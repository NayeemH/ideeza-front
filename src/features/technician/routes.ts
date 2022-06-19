import { NextRouter } from 'next/router';

const routes = (history: NextRouter) => [
	{
		name: 'Dashboard',
		route: ['/technician/dashboard'],
		icon: '/images/siderbar-icons/dashboard.svg',
		img: true,
		click: () => history.push('/technician/dashboard/'),
	},
	{
		name: 'Management',
		route: [
			'/technician/dashboard/management/user-service-technician',
			'/technician/dashboard/management/add-part',
			'/technician/dashboard/management/categories',
			'/technician/dashboard/management/blogs',
			'/technician/dashboard/management/executive',
			'/technician/dashboard/management/service-provider/process',
			'/technician/dashboard/management/service-provider/machines',
			'/technician/dashboard/management/service-provider/services',
			'/technician/dashboard/management/service-provider/certifications',
			'/technician/dashboard/management/service-provider/corporations',
			'/technician/dashboard/management/service-provider/additional-info',
			'/technician/dashboard/management/service-provider/task',
			'/technician/dashboard/management/service-provider/shipping-method',
			'/technician/dashboard/management/about-us/team',
			'/technician/dashboard/management/about-us/career',
			'/technician/dashboard/management/network',
			'/technician/dashboard/management/project/home',
			'/technician/dashboard/management/project/product-detail',
		],
		icon: '/images/siderbar-icons/management.svg',
		// img: true,
		click: () => history.push('/technician/dashboard/management/user-service-technician'),
		children: [
			{
				name: 'User & Service provider & Technician',
				route: ['/technician/dashboard/management/user-service-technician'],
				icon: '/images/siderbar-icons/people-outline.svg',
				img: true,
				click: () =>
					history.push('/technician/dashboard/management/user-service-technician'),
			},
			{
				name: 'Added Parts',
				route: ['/technician/dashboard/management/add-part'],
				icon: '/images/siderbar-icons/playlist.svg',
				img: true,
				click: () => history.push('/technician/dashboard/management/add-part'),
			},
			{
				name: 'Categories',
				route: ['/technician/dashboard/management/categories'],
				icon: '/images/siderbar-icons/category.svg',
				img: true,
				click: () => history.push('/technician/dashboard/management/categories'),
			},
			{
				name: 'Projects',
				route: [
					'/technician/dashboard/management/project/home',
					'/technician/dashboard/management/project/product-detail',
				],
				icon: '/images/siderbar-icons/project.svg',
				img: true,
				click: () => history.push('/technician/dashboard/management/project/home'),
				children: [
					{
						name: 'Add New Project',
						route: ['/technician/dashboard/management/project/home'],
						icon: '/images/siderbar-icons/addicon.svg',
						img: true,
						click: () => history.push('/technician/dashboard/management/project/home'),
					},
					{
						name: 'Automatic Task',
						route: ['/technician/dashboard/management/project/product-detail'],
						icon: '/images/siderbar-icons/task.svg',
						img: true,
						click: () =>
							history.push('/technician/dashboard/management/project/product-detail'),
					},
				],
			},
			{
				name: 'Blogs',
				route: ['/technician/dashboard/management/blogs'],
				icon: '/images/siderbar-icons/book-outline.svg',
				img: true,
				click: () => history.push('/technician/dashboard/management/blogs'),
			},
			{
				name: 'Add new tech',
				route: ['/technician/dashboard/management/executive'],
				icon: '/images/siderbar-icons/addicon.svg',
				img: true,
				click: () => history.push('/technician/dashboard/management/executive'),
			},
			{
				name: 'Service provider',
				route: [
					'/technician/dashboard/management/service-provider/process',
					'/technician/dashboard/management/service-provider/machines',
					'/technician/dashboard/management/service-provider/services',
					'/technician/dashboard/management/service-provider/certifications',
					'/technician/dashboard/management/service-provider/corporations',
					'/technician/dashboard/management/service-provider/additional-info',
					'/technician/dashboard/management/service-provider/task',
					'/technician/dashboard/management/service-provider/shipping-method',
				],
				icon: '/images/siderbar-icons/business-outline.svg',
				img: true,
				click: () =>
					history.push('/technician/dashboard/management/service-provider/process'),
				children: [
					{
						name: 'Process & sub process',
						route: ['/technician/dashboard/management/service-provider/process'],
						icon: '/images/siderbar-icons/process.svg',
						img: true,
						click: () =>
							history.push(
								'/technician/dashboard/management/service-provider/process'
							),
					},
					{
						name: 'Machines',
						route: ['/technician/dashboard/management/service-provider/machines'],
						icon: '/images/siderbar-icons/robot.svg',
						img: true,
						click: () =>
							history.push(
								'/technician/dashboard/management/service-provider/machines'
							),
					},
					{
						name: 'Services',
						route: ['/technician/dashboard/management/service-provider/services'],
						icon: '/images/siderbar-icons/services.svg',
						img: true,
						click: () =>
							history.push(
								'/technician/dashboard/management/service-provider/services'
							),
					},
					{
						name: 'Certifications',
						route: ['/technician/dashboard/management/service-provider/certifications'],
						icon: '/images/siderbar-icons/certificate.svg',
						img: true,
						click: () =>
							history.push(
								'/technician/dashboard/management/service-provider/certifications'
							),
					},
					{
						name: 'Corporations',
						route: ['/technician/dashboard/management/service-provider/corporations'],
						icon: '/images/siderbar-icons/corporate.svg',
						img: true,
						click: () =>
							history.push(
								'/technician/dashboard/management/service-provider/corporations'
							),
					},
					{
						name: 'Additional Info',
						route: [
							'/technician/dashboard/management/service-provider/additional-info',
						],
						icon: '/images/siderbar-icons/addinfo.svg',
						img: true,
						click: () =>
							history.push(
								'/technician/dashboard/management/service-provider/additional-info'
							),
					},
					{
						name: 'Task',
						route: ['/technician/dashboard/management/service-provider/task'],
						icon: '/images/siderbar-icons/task.svg',
						img: true,
						click: () =>
							history.push('/technician/dashboard/management/service-provider/task'),
					},
					{
						name: 'Shipping Method',
						route: [
							'/technician/dashboard/management/service-provider/shipping-method',
						],
						icon: '/images/siderbar-icons/shipping.svg',
						img: true,
						click: () =>
							history.push(
								'/technician/dashboard/management/service-provider/shipping-method'
							),
					},
				],
			},
			{
				name: 'About us',
				route: [
					'/technician/dashboard/management/about-us/team',
					'/technician/dashboard/management/about-us/career',
				],
				icon: '/images/siderbar-icons/about-us-tech.svg',
				img: true,
				click: () => history.push('/technician/dashboard/management/about-us/team'),
				children: [
					{
						name: 'Team',
						route: ['/technician/dashboard/management/about-us/team'],
						icon: '/images/siderbar-icons/about-team.svg',
						img: true,
						click: () => history.push('/technician/dashboard/management/about-us/team'),
					},
					{
						name: 'Career',
						route: ['/technician/dashboard/management/about-us/career'],
						icon: '/images/siderbar-icons/business-outline.svg',
						img: true,
						click: () =>
							history.push('/technician/dashboard/management/about-us/career'),
					},
				],
			},
			{
				name: 'Network',
				route: ['/technician/dashboard/management/network'],
				icon: '/images/siderbar-icons/network.svg',
				img: true,
				click: () => history.push('/technician/dashboard/management/network'),
			},
		],
	},
	{
		name: 'Electronics',
		route: [
			'/technician/dashboard/electronics/add-component',
			'/technician/dashboard/electronics/add-component/schematic',
			'/technician/dashboard/electronics/add-component/design',
			'/technician/dashboard/electronics/add-component/code',
			'/technician/dashboard/electronics/add-component/review',
			'/technician/dashboard/electronics/add-component/general',
			'/technician/dashboard/electronics/add-component/success',
			'/technician/dashboard/electronics/add-part',
		],
		icon: '/images/siderbar-icons/electron.svg',
		img: true,
		click: () => history.push('/technician/dashboard/electronics/add-part'),
		children: [
			{
				name: 'Add Part',
				route: ['/technician/dashboard/electronics/add-part'],
				icon: '/images/siderbar-icons/square-box.svg',
				img: true,
				click: () => history.push('/technician/dashboard/electronics/add-part'),
			},
			{
				name: 'Add Component',
				route: [
					'/technician/dashboard/electronics/add-component',
					'/technician/dashboard/electronics/add-component/schematic',
					'/technician/dashboard/electronics/add-component/design',
					'/technician/dashboard/electronics/add-component/code',
					'/technician/dashboard/electronics/add-component/review',
					'/technician/dashboard/electronics/add-component/general',
					'/technician/dashboard/electronics/add-component/success',
				],
				icon: '/images/siderbar-icons/square-box-outline.svg',
				img: true,
				click: () => history.push('/technician/dashboard/electronics/add-component'),
			},
		],
	},
	{
		name: 'Code',
		route: [
			'/technician/dashboard/code/',
			'/technician/dashboard/code/add-part',
			'/technician/dashboard/code/add-component',
			'/technician/dashboard/code/add-component/search',
		],
		icon: '/images/siderbar-icons/code.svg',
		img: true,
		click: () => history.push('/technician/dashboard/code/add-part'),
		children: [
			{
				name: 'Add Part',
				route: ['/technician/dashboard/code/add-part'],
				icon: '/images/siderbar-icons/square-box.svg',
				img: true,
				click: () => history.push('/technician/dashboard/code/add-part'),
			},
			{
				name: 'Add Component',
				route: [
					'/technician/dashboard/code/add-component',
					'/technician/dashboard/code/add-component/search',
				],
				icon: '/images/siderbar-icons/square-box-outline.svg',
				img: true,
				click: () => history.push('/technician/dashboard/code/add-component'),
			},
		],
	},
	{
		name: 'Cover',
		route: [
			'/technician/dashboard/cover/',
			'/technician/dashboard/cover/add-part',
			'/technician/dashboard/cover/add-component',
			'/technician/dashboard/cover/add-component/search',
		],
		icon: '/images/siderbar-icons/cover.svg',
		img: true,
		click: () => history.push('/technician/dashboard/cover/add-part'),
		children: [
			{
				name: 'Add Part',
				route: ['/technician/dashboard/cover/add-part'],
				icon: '/images/siderbar-icons/square-box.svg',
				img: true,
				click: () => history.push('/technician/dashboard/cover/add-part'),
			},
			{
				name: 'Add Component',
				route: [
					'/technician/dashboard/cover/add-component',
					'/technician/dashboard/cover/add-component/search',
				],
				icon: '/images/siderbar-icons/square-box-outline.svg',
				img: true,
				click: () => history.push('/technician/dashboard/cover/add-component'),
			},
		],
	},
	// {
	//   name: "Cover",
	//   route: ["/technician/dashboard/cover"],
	//   icon: "/images/siderbar-icons/cover.png",
	//   img: true,
	//   click: () => history.push("/technician/dashboard/cover"),
	// },
	{
		name: 'Message',
		route: ['/technician/dashboard/message'],
		icon: '/images/siderbar-icons/message.svg',
		img: true,
		click: () => history.push('/technician/dashboard/message'),
	},
	{
		name: 'Projects',
		route: [
			'/technician/dashboard/project/home',
			'/technician/dashboard/project/product-detail',
		],
		icon: '/images/siderbar-icons/project.svg',
		img: true,
		click: () => history.push('/technician/dashboard/project/home'),
		// children: [
		//   {
		//     name: "Add New Project",
		//     route: ["/technician/dashboard/project/home"],
		//     icon: "/images/siderbar-icons/addicon.svg",
		//     img: true,
		//     click: () => history.push("/technician/dashboard/project/home"),
		//   },
		//   {
		//     name: "Automatic Task",
		//     route: ["/technician/dashboard/project/product-detail"],
		//     icon: "/images/siderbar-icons/task.svg",
		//     img: true,
		//     click: () =>
		//       history.push("/technician/dashboard/project/product-detail"),
		//   },
		// ],
	},
	{
		name: 'Tracking',
		route: [
			'/technician/dashboard/tracking',
			'/technician/dashboard/tracking/production',
			'/technician/dashboard/tracking/review',
		],
		icon: '/images/siderbar-icons/tracking.svg',
		img: true,
		click: () => history.push('/technician/dashboard/tracking/production'),
		children: [
			{
				name: 'Production',
				route: ['/technician/dashboard/tracking/production'],
				icon: '/images/siderbar-icons/factory.svg',
				img: true,
				click: () => history.push('/technician/dashboard/tracking/production'),
			},
			{
				name: 'Review',
				route: ['/technician/dashboard/tracking/review'],
				icon: '/images/siderbar-icons/track-review.svg',
				img: true,
				click: () => history.push('/technician/dashboard/tracking/review'),
			},
		],
	},

	// {
	//   name: "Review",
	//   route: ["/technician/dashboard/tracking/review"],
	//   icon: "/images/siderbar-icons/my-notes.png",
	//   img: true,
	//   click: () => history.push("/technician/dashboard/tracking/review"),
	// },
	{
		name: 'Blog',
		route: ['/technician/dashboard/blog', '/technician/dashboard/blog/add-article'],
		icon: '/images/siderbar-icons/book-outline.svg',
		img: true,
		click: () => history.push('/technician/dashboard/blog'),
	},
	{
		name: 'My Notes',
		route: ['/technician/dashboard/my-note'],
		icon: '/images/siderbar-icons/list.svg',
		img: true,
		click: () => history.push('/technician/dashboard/my-note'),
	},
];

export { routes };
