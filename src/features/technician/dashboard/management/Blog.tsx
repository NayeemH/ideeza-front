import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import BlogsTableHeader from '@organisms/blogs-table-header';
import React, { useEffect, useState } from 'react';
import { blog_list } from '../../../../static/data/technician/blog';
import DataTable from '@organisms/data-table';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { apiService } from '../../../../utils/request';

const Blog = () => {
	const itemsPerPage = 8;
	//   const dispatch = useAppDispatch();
	//   const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');
	//   const [allBlogData, setAllBlogData] = useState([]);
	const [pager, setPager] = useState({});
	const [page, setPage] = useState(1);
	const [blogList, setBlogList] = useState(blog_list);
	// const Alldata = useSelector(({ BlogsReducer }) => BlogsReducer?.data);
	// const loader = useSelector(({ BlogsReducer }) => BlogsReducer?.loader);
	const [totalBlogCount, setTotalBlogCount] = useState(0);

	const handleSearch = (e: any) => setSearch(e.target.value);
	const handlePage = (e: any) => {
		setPage(e);
		//   return dispatch(onBlogsManagamentGet({ page: e, search, itemsPerPage }));
	};

	const getBlogs = () => {
		apiService(
			{
				method: 'get',
				url: `/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					// const { data } = res;
					setBlogList(blog_list);
					return;
				}
			}
		);
	};

	useEffect(() => {
		getBlogs();
	}, []);

	useEffect(() => {
		setPage(1);
		//   console.log("search ", search);
		//   dispatch(onBlogsManagamentGet({ search, itemsPerPage }));
	}, [search]);
	//   useEffect(() => {
	//     setLoading(loader);
	//   }, [loader]);
	//   useEffect(() => {
	//     if (Alldata) {
	//       if (Array.isArray(Alldata) && Alldata.length) {
	//         setTotalBlogCount(Alldata[0]?.count);
	//         setAllBlogData(Alldata[0]?.data);
	//       }
	//     }
	//   }, [Alldata]);
	useEffect(() => {
		setPager({
			...pager,
			count: Math.ceil(totalBlogCount / itemsPerPage),
		});
	}, [totalBlogCount]);
	useEffect(() => {
		setPager({
			...pager,
			page,
		});
	}, [page]);

	return (
		<div className="pt-4">
			<Label
				value="Blogs"
				classes={{
					root: 'text-primary tracking-tight font-sans font-bold pb-3 text-xl xl:text-2xl 2xl:text-3xl',
				}}
			/>
			<div className="w-full bg-white rounded-lg shadow-lg space-y-3">
				<BlogsTableHeader
					handleSearch={handleSearch}
					btnValue="Add New"
					// iconEnd={<BsPlus />}
					labelClass="hidden"
					containerClass=""
				/>
				{/* <BlogsTable data={allBlogData} column={[{}]} loading={loading} /> */}
				{/* <BlogsTable
          data={[1, 2, 3, 4, 5, 6, 7]}
          column={[{}]}
          loading={loading}
        /> */}

				<DataTable.Container>
					<DataTable.Header>
						<DataTable.Row>
							<DataTable.Head>Article Name</DataTable.Head>
							<DataTable.Head>Author Name</DataTable.Head>
							<DataTable.Head>Role</DataTable.Head>
							<DataTable.Head>Status</DataTable.Head>
							<DataTable.Head>Date</DataTable.Head>
							<DataTable.Head>Date Registered</DataTable.Head>
							<DataTable.Head />
						</DataTable.Row>
					</DataTable.Header>
					<DataTable.Body>
						{blogList.map((item: any, index: number) => (
							<DataTable.Row key={index}>
								<DataTable.Data>{item?.article_name}</DataTable.Data>
								<DataTable.Data>{item?.author_name}</DataTable.Data>
								<DataTable.Data>{item?.role}</DataTable.Data>
								<DataTable.Data>{item?.status}</DataTable.Data>
								<DataTable.Data>{item?.date}</DataTable.Data>
								<DataTable.Data>{item?.status}</DataTable.Data>
								<DataTable.Data>
									<MoreVertIcon />
								</DataTable.Data>
							</DataTable.Row>
						))}
					</DataTable.Body>
				</DataTable.Container>

				<Pagination
					pager={pager}
					handlePage={handlePage}
					mainClass="py-6"
				/>
			</div>
		</div>
	);
};

export default Blog;
