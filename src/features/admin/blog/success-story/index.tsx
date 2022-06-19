import Label from '@atoms/label';
import Loader from '@atoms/loader';
import BlogList from '@features/technician/blog/blogList';
import Pagination from '@molecules/pagination';
import { TableContainer } from '@mui/material';
import BlogsTableHeader from '@organisms/blogs-table-header';
import { getBearerToken, useAppDispatch } from 'app/hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { apiService } from 'utils/request';

const SuccessStories = () => {
	const dispatch = useAppDispatch();
	const token = getBearerToken();
	const router = useRouter();
	const [pager] = useState(null);
	const [params] = useState({});
	const getAllBlogData = (payload: any) => console.warn(payload); //dispatch(onBlogGet(payload));
	//const { articleList, loading } = useAppSelector(({ blog }: any) => blog);
	const [loading, setLoading] = useState(true);
	const [articleList, setArticleList] = useState<any>(null);
	const blogList = articleList?.results;

	const getBlogList = async () => {
		await apiService(
			{
				method: 'get',
				url: `core/success-story/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					setArticleList(data);
					setLoading(false);
					return;
				}

				setLoading(false);
			}
		);
	};

	useEffect(() => {
		//diapatch(getBlogsAsync(params));
		getBlogList();
	}, []);

	const AddArticle = () => {
		router.push('/admin/blog/success-story/add-article');
	};

	return (
		<div>
			<div className="lg:w-4/5 pt-4 mx-auto">
				<Label
					value="Manage Articles"
					classes={{
						root: 'text-primary font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
					}}
				/>
				<div className="w-full bg-white rounded-lg shadow">
					<BlogsTableHeader
						btnValue="Add New"
						iconEnd={<BsPlus size="30" />}
						labelClass="hidden"
						containerClass=""
						onClick={AddArticle}
						// containerClass="p-4 md:p-0 md:pr-3"
						// handleSearch={handleSearch}
					/>
					<TableContainer>
						{loading ? <Loader /> : <BlogList data={blogList ?? []} />}
					</TableContainer>
					<Pagination
						handlePage={(e: any) => getAllBlogData({ page: e })}
						pager={pager}
						mainClass="py-6"
					/>
				</div>
			</div>
		</div>
	);
};
export default SuccessStories;
