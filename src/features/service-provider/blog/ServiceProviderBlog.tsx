import React, { useEffect, useState } from 'react';
import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import { BsPlus } from 'react-icons/bs';
import { getBearerToken, useAppDispatch, useAppSelector } from 'app/hooks';
import { useRouter } from 'next/router';
import { getBlogsAsync } from '@features/technician/blog/reducer';
import BlogTableHeader from '@organisms/technician-blog-table-header';
import GenericTable from '@organisms/generic-table';
import CheckboxAtom from '@atoms/checkbox';
import { AiOutlineMore } from 'react-icons/ai';
import { apiService } from '../../../utils/request';
import { getBlogCategories } from '@features/landing/blog/api';

const ServiceProviderBlog = () => {
	const router = useRouter();

	//

	// the following code get data from technician, but it should get data from service provider
	// const getAllblogData = (payload: any) => console.warn(payload);
	//const { articleList } = useAppSelector(({ blog }: any) => blog);
	const [articleList, setArticleList] = useState<any>(null);
	const blogList = articleList?.results;

	const getBlogList = async () => {
		await apiService(
			{
				method: 'get',
				url: `blog/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					setArticleList(data);
					return;
				}
			}
		);
	};

	useEffect(() => {
		//diapatch(getBlogsAsync(params));
		getBlogList();
	}, []);

	const AddArticle = () => {
		router.push('/service-provider/blog/add-article');
	};

	return (
		<div>
			<div className="lg:w-4/5 pt-4 mx-auto">
				<Label
					value="Manage Articles"
					classes={{
						root: 'text-primary font-sans font-bold pb-3 text-3xl',
					}}
				/>
				<div className="w-full bg-white rounded-lg shadow">
					<BlogTableHeader
						btnValue="Add New"
						iconEnd={<BsPlus size="30" />}
						labelClass="hidden"
						containerClass=""
						onClick={AddArticle}
						// containerClass="p-4 md:p-0 md:pr-3"
						// handleSearch={handleSearch}
					/>
					<GenericTable
						headers={['checkbox', 'Article_Name', 'Date', 'Status', '']}
						rowClicked="/service-provider/blog"
						rows={[
							{
								id: 1,
								checkbox: <CheckboxAtom />,
								Article_Name: 'Ideeza is Awesome',
								Date: '10 january 2022',
								Status: 'Approved',
								'': <AiOutlineMore className="text-2xl text-gray-500" />,
							},
							{
								id: 2,
								checkbox: <CheckboxAtom />,
								Article_Name: 'Ideeza is Awesome',
								Date: '10 january 2022',
								Status: 'Approved',
								'': <AiOutlineMore className="text-2xl text-gray-500" />,
							},
							{
								id: 3,
								checkbox: <CheckboxAtom />,
								Article_Name: 'Ideeza is Awesome',
								Date: '10 january 2022',
								Status: 'Approved',
								'': <AiOutlineMore className="text-2xl text-gray-500" />,
							},
						]}
					/>

					<Pagination
						// handlePage={(e: any) => getAllblogData({ page: e })}
						handlePage={() => {
							('');
						}}
						pager={10}
						mainClass="py-6"
					/>
				</div>
			</div>
		</div>
	);
};

export default ServiceProviderBlog;
