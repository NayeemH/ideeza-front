import Pagination from '@molecules/pagination';
import { TableContainer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BlogList from './blogList';
import { apiService } from '../../../utils/request';
import { IResposeData } from '@features/user/blog/request';
import BlogsTableHeader from '@organisms/blogs-table-header';
import { useAppSelector } from 'app/hooks';
import { BsPlus } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Loader from '@atoms/loader';
import Modal from '@atoms/modal';
import Label from '@atoms/label';
import Button from '@atoms/button';

export default function UserBlog() {
	const router = useRouter();
	const [pager, setPager] = useState<any>({ page: 1, count: 1, totalBlogs: 0 });
	const [loading, setLoading] = useState(true);
	const [searchedValue, setSearchValue] = useState<string>('');
	const [row, setRow] = useState<number>(0);
	const [blogData, setBlogData] = useState<IResposeData | undefined>(undefined);
	const [userBlogsSettings, setUserBlogsSettings] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const userId = useAppSelector((state) => state?.auth?.userData?.id);

	const blogList = blogData?.results;

	const AddArticle = () => {
		router.push('/technician/dashboard/blog/add-new');
	};
	const handleSearch = (event: any) => {
		setSearchValue(event.target.value.toLowerCase());
		getBlogs(event.target.value.toLowerCase());
	};

	const getBlogs = async (value: string) => {
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
						setBlogData(data);
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
		getBlogs('');
	}, [userId, pager?.page]);

	return (
		<div className="w-full md:pb-0  mx-auto">
			{loading ? (
				<Loader />
			) : (
				<div className=" bg-white rounded-xl xl:px-[30px] pt-[23px] min-h-[75vh] md:p-4">
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
						blogheaderLabel={true}
						showGear={userBlogsSettings}
					/>

					<div className="w-full mt-[30px] font-proxima-nova">
						<TableContainer>
							<BlogList
								setUserBlogsSettings={setUserBlogsSettings}
								setRow={setRow}
								dropDownOptions={[
									{
										name: 'Edit',
										value: 'View',
										func: () =>
											router.push(`/technician/dashboard/blog/${row}`),
									},
									// {
									//   name: "Pause",
									//   value: "Pause",
									//   func: console.log("hola"),
									// },
									// {
									//   name: "Approve",
									//   value: "Approve",
									//   func: console.log("hola"),
									// },
									{
										name: 'Delete',
										value: 'Delete',
										func: () => setOpenDeletePopup(true),
									},
								]}
								data={blogList}
							/>
						</TableContainer>

						{showPagination()}
					</div>
				</div>
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
												getBlogs('');

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
	);
}
