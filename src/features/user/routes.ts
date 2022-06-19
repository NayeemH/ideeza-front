const routes = (history: any) => [
	{
		name: 'Dashboard',
		route: ['/user/dashboard', '/user/dashboard/see-all-projects'],
		icon: '/images/siderbar-icons/dashboard.svg',
		img: true,
		click: () => history.push('/user/dashboard'),
	},
	{
		name: 'My Project',
		route: [
			'/user/dashboard/projects',
			// "/dashboard/project/product-detail/",
			// "/dashboard/project/projectDetail",
		],
		icon: '/images/siderbar-icons/management.svg',
		img: true,
		click: () =>
			history.push(
				'/user/dashboard/projects'
				// "/user/dashboard/project/product-detail",
				// "/user/dashboard/project/projectDetail"
			),
	},
	{
		name: 'News Feed',
		route: ['/user/dashboard/news-feed'],
		icon: '/images/siderbar-icons/news-feed.svg',
		img: true,
		click: () => history.push('/user/dashboard/news-feed'),
	},
	/*{
    name: "Electronics",
    route: [
      "/user/dashboard/electronics/add-component",
      "/user/dashboard/electronics/add-component/schematic",
      "/user/dashboard/electronics/add-component/design",
      "/user/dashboard/electronics/add-component/code",
      "/user/dashboard/electronics/add-component/review",
      "/user/dashboard/electronics/add-component/general",
      "/user/dashboard/electronics/add-component/success",
      "/user/dashboard/electronics/add-part",
    ],
    icon: "/images/siderbar-icons/electron.svg",
    img: true,
    click: () => history.push("/user/dashboard/electronics/add-part"),
    children: [
      {
        name: "Add Part",
        route: ["/user/dashboard/electronics/add-part"],
        icon: "/images/siderbar-icons/square-box.svg",
        img: true,
        click: () => history.push("/user/dashboard/electronics/add-part"),
      },
      {
        name: "Add Component",
        route: [
          "/user/dashboard/electronics/add-component",
          "/user/dashboard/electronics/add-component/schematic",
          "/user/dashboard/electronics/add-component/design",
          "/user/dashboard/electronics/add-component/code",
          "/user/dashboard/electronics/add-component/review",
          "/user/dashboard/electronics/add-component/general",
          "/user/dashboard/electronics/add-component/success",
        ],
        icon: "/images/siderbar-icons/square-box-outline.svg",
        img: true,
        click: () =>
            history.push("/user/dashboard/electronics/add-component"),
      },
    ],
  },
  {
    name: "Code",
    route: [
      "/user/dashboard/code/",
      "/user/dashboard/code/add-part",
      "/user/dashboard/code/add-component",
      "/user/dashboard/code/add-component/search",
    ],
    icon: "/images/siderbar-icons/code.svg",
    img: true,
    click: () => history.push("/user/dashboard/code/add-part"),
    children: [
      {
        name: "Add Part",
        route: ["/user/dashboard/code/add-part"],
        icon: "/images/siderbar-icons/square-box.svg",
        img: true,
        click: () => history.push("/user/dashboard/code/add-part"),
      },
      {
        name: "Add Component",
        route: [
          "/user/dashboard/code/add-component",
          "/user/dashboard/code/add-component/search",
        ],
        icon: "/images/siderbar-icons/square-box-outline.svg",
        img: true,
        click: () => history.push("/user/dashboard/code/add-component"),
      },
    ],
  },
  {
    name: "Cover",
    route: [
      "/user/dashboard/cover/",
      "/user/dashboard/cover/add-part",
      "/user/dashboard/cover/add-component",
      "/user/dashboard/cover/add-component/search",
    ],
    icon: "/images/siderbar-icons/cover.svg",
    img: true,
    click: () => history.push("/user/dashboard/cover/add-part"),
    children: [
      {
        name: "Add Part",
        route: ["/user/dashboard/cover/add-part"],
        icon: "/images/siderbar-icons/square-box.svg",
        img: true,
        click: () => history.push("/user/dashboard/cover/add-part"),
      },
      {
        name: "Add Component",
        route: [
          "/user/dashboard/cover/add-component",
          "/user/dashboard/cover/add-component/search",
        ],
        icon: "/images/siderbar-icons/square-box-outline.svg",
        img: true,
        click: () => history.push("/user/dashboard/cover/add-component"),
      },
    ],
  },*/
	{
		name: 'My Notes',
		route: ['/user/dashboard/my-note'],
		icon: '/images/siderbar-icons/project.svg',
		img: true,
		click: () => history.push('/user/dashboard/my-note'),
	},

	{
		name: 'Messages',
		route: ['/user/dashboard/message'],
		icon: '/images/siderbar-icons/message.svg',
		img: true,
		click: () => history.push('/user/dashboard/message'),
	},

	{
		name: 'Blog',
		route: ['/user/dashboard/blog', '/user/dashboard/blog/add-article'],
		icon: '/images/siderbar-icons/book-outline.svg',
		img: true,
		click: () => history.push('/user/dashboard/blog'),
	},
];
export { routes };
