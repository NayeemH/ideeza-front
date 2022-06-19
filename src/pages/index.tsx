import type { NextPage } from 'next';
import Home from 'features/landing/home';
import { getProducts, getProjectList } from '@features/landing/home/api';

const HomePage: NextPage = (props: any) => {
	return (
		<Home
			projects={props.projects}
			topRatedProjects={props.topRatedProjects}
			topProducts={props.topProducts}
		/>
	);
};

export default HomePage;

export const getServerSideProps = async (_context: any) => {
	const projects = await getProjectList(`?ordering=-created_at&page=1&page_size=3`);
	const topRatedProjects = await getProjectList(`?ordering=-view&page=1&page_size=6`);
	const topProductsData = await getProducts(`?page=1&page_size=5`);
	const topProducts = topProductsData ? topProductsData?.results : [];

	return {
		props: {
			projects,
			topProducts,
			topRatedProjects,
		},
	};
};
