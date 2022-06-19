import Label from '@atoms/label';
import Loader from '@atoms/loader';
import BlogList from '@features/technician/blog/blogList';
import Pagination from '@molecules/pagination';
import { TableContainer } from '@mui/material';
import BlogsTableHeader from '@organisms/blogs-table-header';
// import { getBearerToken, useAppDispatch } from 'app/hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { apiService } from 'utils/request';
import { useAppSelector } from 'app/hooks';
import Button from '@atoms/button';
import Modal from '@atoms/modal';
import { toast } from 'react-toastify';

const AdminTableBlog = () => {
	// const dispatch = useAppDispatch();
	// const token = getBearerToken();
	const router = useRouter();
	const [pager, setPager] = useState<any>({ page: 1, count: 1, totalBlogs: 0 });
	// const [params] = useState({});
	const [row, setRow] = useState<number>(0);
	const [loading, setLoading] = useState(true);
	const [searchedValue, setSearchValue] = useState<string>('');
	const [adminBlogsSettings, setAdminBlogsSettings] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [articleList, setArticleList] = useState<any>(null);
	const userId = useAppSelector((state) => state?.auth?.userData?.id);

	const blogList = articleList?.results;

	const handleSearch = (event: any) => {
		setSearchValue(event.target.value.toLowerCase());
		getBlogList(event.target.value.toLowerCase());
	};

	const getBlogList = async (value: string) => {
		if (userId) {
			await apiService(
				{
					method: 'get',
					url: `/blog/?user__id=${userId}&search=${value || ''}&page=${
						pager.page
					}&page_size=10`,
					token: true,
				},
				(res: any) => {
					if (res) {
						const { data } = res;
						setArticleList(data);
						setLoading(false);
						setPager({
							...pager,
							totalBlogs: data?.count,
							count: Math.ceil(data?.count / 10),
						});
						return;
					}
				}
			);
		}
	};

	const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
		setPager({ ...pager, page: value });
	};

	const showPagination = () => {
		if (blogList) {
			if (blogList?.length > 0 && pager.page !== 1) {
				return (
					<Pagination
						handlePage={handlePagination}
						pager={pager}
						mainClass="py-6"
					/>
				);
			} else if (pager.page == 1 && pager.count > 1) {
				return (
					<Pagination
						handlePage={handlePagination}
						pager={pager}
						mainClass="py-6"
					/>
				);
			} else {
				return '';
			}
		}
	};

	const showSearchField = () => {
		if (searchedValue) {
			return true;
		} else {
			if (blogList && blogList?.length > 1) {
				return true;
			} else {
				return false;
			}
		}
	};

	useEffect(() => {
		getBlogList('');
	}, [userId, pager?.page]);

	const AddArticle = () => {
		router.push('/admin/blog/add-article');
	};

	return (
		<div>
			<div className="lg:w-4/5 pt-4 mx-auto">
				{loading ? (
					<Loader />
				) : (
					<>
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
								searchValue={searchedValue}
								setSearchValue={(e?: any) => handleSearch(e)}
								onClick={AddArticle}
								showDropdown={false}
								searchFieldShows={showSearchField()}
								// blogheaderLabel={true}
								showGear={adminBlogsSettings}
							/>
							<TableContainer>
								<BlogList
									data={blogList}
									setUserBlogsSettings={setAdminBlogsSettings}
									setRow={setRow}
									dropDownOptions={[
										{
											name: 'Edit',
											value: 'View',
											func: () => router.push(`/admin/blog/${row}`),
										},
										{
											name: 'Delete',
											value: 'Delete',
											func: () => setOpenDeletePopup(true),
										},
									]}
								/>
							</TableContainer>
							{showPagination()}
						</div>
					</>
				)}
				<Modal
					width="xs"
					close={() => setOpenDeletePopup(false)}
					open={openDeletePopup}
					header={
						<Label
							value="Deleting Blog"
							className="text-xl text-gray-600 mb-5 font-semibold"
						/>
					}
					content={
						<>
							<Label
								value="Are you want to delete note? "
								className="text-md text-gray-400 mb-8"
							/>
							<div className="w-full grid grid-cols-2 gap-8">
								<Button
									value="Cancel"
									className="text-gray-400 text-lg bg-white"
									variant="outlined"
									onClick={() => setOpenDeletePopup(false)}
								/>
								<Button
									value="Yes"
									className="text-white bg-primary text-lg"
									variant="outlined"
									onClick={async () => {
										setOpenDeletePopup(false);
										await apiService(
											{
												method: 'delete',
												url: `blog/${row}/`,
												token: true,
											},
											(res: any) => {
												if (res) {
													toast.success('deleted successfully');
													getBlogList('');

													return;
												}

												setLoading(false);
											}
										);
									}}
								/>
							</div>
						</>
					}
				/>
			</div>
		</div>
	);
};
export default AdminTableBlog;
